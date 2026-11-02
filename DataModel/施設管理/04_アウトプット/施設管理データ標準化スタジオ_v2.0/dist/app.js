(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (val) =>
    String(val ?? "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );

  const escBr = (val) => esc(val).replace(/\r?\n/g, "<br>");

  // Normalize full-width/half-width, case, and Katakana->Hiragana so Kana/Kanji queries match smoothly
  function normSearch(val) {
    return String(val ?? "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  // Bind live search input without destroying DOM during Japanese IME composition (compositionstart..compositionend)
  function bindLiveSearchInput(inputEl, getCurrentVal, applyValAndRender, resolveNextInput) {
    if (!inputEl) return;
    let composing = false;

    const commit = (el) => {
      const nextVal = el.value;
      if (nextVal === getCurrentVal()) return;
      const start = el.selectionStart ?? nextVal.length;
      const end = el.selectionEnd ?? start;
      applyValAndRender(nextVal);
      const nextEl = resolveNextInput();
      if (nextEl) {
        nextEl.focus();
        try {
          nextEl.setSelectionRange(start, end);
        } catch (_) {}
      }
    };

    inputEl.addEventListener("compositionstart", () => {
      composing = true;
    });
    inputEl.addEventListener("compositionend", (e) => {
      composing = false;
      commit(e.target);
    });
    inputEl.addEventListener("input", (e) => {
      if (composing || e.isComposing) return;
      commit(e.target);
    });
  }

  const state = {
    data: null,
    view: "overview",
    domainId: "facility",
    tableId: "m_facilities",
    expQuery: "",
    expReq: "req_rec",
    expSpecial: "all",
    expSection: "all",
    // Relations / Class Diagram Map state ("map" = Key-only visual map, "mermaid" = Mermaid source)
    relMode: "map",
    umlDiagramId: "overall",
    umlVariantIdx: 0,
    umlSelectedType: "class", // "class" | "rel"
    umlSelectedId: "Facility",
    mermaidShowRawCodes: false,
    // Overall Hub ER + Building map state
    erDomainFilter: "all",
    erShowExtended: false,
    erSelectedType: "table",
    erSelectedId: "m_facilities",
    // CSV Builder state
    builderTableId: "m_facilities",
    builderParentTableId: "m_facilities",
    headerMode: "en",
    sampleCount: 5,
    selectedCols: {},
    selectedExtCols: {},
    openExtClasses: {
      pd_address: true,
      pd_building: true,
      pd_contact_point: true,
    },
    // Code dictionary state
    codeQuery: "",
    codeFilter: "all",
    codeListId: "",
    codeItemQuery: "",
    // Drawers & Modals
    drawerPropId: null,
    drawerCodeFilter: "",
    modalCodeListId: null,
    modalCodeQuery: "",
    modalClassId: null,
    modalClassQuery: "",
  };

  const VIEW_TITLES = {
    overview: "全体ダッシュボード",
    relations: "全体関連図・クラス図",
    explorer: "領域・項目定義ブラウザ",
    builder: "CSVフォーマット作成・サンプル出力",
    codes: "統制語彙・コード辞書",
  };

  const domainById = new Map();
  const tableById = new Map(); // Primary 9 tables + Common 12 classes (unified sheet lookup)
  const commonById = new Map();
  const propById = new Map();
  const codeListById = new Map();
  const diagramById = new Map();

  function showToast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => el.classList.add("hidden"), 2200);
  }

  function copyText(text, label = "コピーしました") {
    const preview = text.length > 36 ? text.slice(0, 36).replace(/\s+/g, " ") + "…" : text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(`${label}: ${preview}`),
        () => fallbackCopy(text, label, preview)
      );
    } else {
      fallbackCopy(text, label, preview);
    }
  }

  function fallbackCopy(text, label, preview) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(`${label}: ${preview}`);
    } catch (_) {
      showToast(label);
    }
    ta.remove();
  }

  function csvCell(value) {
    let s = String(value ?? "");
    if (/^[\s]*[=+@\-|]/.test(s) && !/^-?\d+(\.\d+)?$/.test(s.trim())) {
      s = "'" + s;
    }
    return '"' + s.replace(/"/g, '""') + '"';
  }

  function toCsv(rows) {
    return rows.map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
  }

  function downloadFile(filename, content, mime = "text/csv;charset=utf-8") {
    const prefix = mime.startsWith("text/csv") ? "\ufeff" : "";
    const blob = new Blob([prefix, content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast(`ダウンロード開始: ${filename}`);
  }

  function explainPropMultiplicity(mult) {
    const m = String(mult || "").trim();
    if (m === "1" || m === "1..1") return "必須・単一値（1行につき必ず1つ記録）";
    if (m === "0..1") return "任意・単一値（空欄OK、記録する場合は1つ）";
    if (m === "0..*") return "任意・複数可（空欄OK、複数記録可）";
    if (m === "1..*") return "必須・複数可（最低1つ以上、複数記録可）";
    return "定義値に準拠";
  }

  function pageHeadHtml(viewKey, defaultEyebrow, defaultTitle, defaultDesc, rightActionsHtml = "") {
    const cfg = state.data?.ui?.pageHeaders?.[viewKey] || {};
    const eyebrow = cfg.eyebrow !== undefined ? cfg.eyebrow : defaultEyebrow;
    const title = cfg.title !== undefined ? cfg.title : defaultTitle;
    const desc = cfg.description !== undefined ? cfg.description : defaultDesc;
    return `
      <div class="page-header">
        <div>
          ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
          <h1>${escBr(title)}</h1>
          ${desc ? `<p>${escBr(desc)}</p>` : ""}
        </div>
        ${rightActionsHtml}
      </div>
    `;
  }

  // Deterministic Offline Sample Row Synthesizer (5 / 10 / 20 rows without external AI)
  const EXTRA_FACILITY_SEEDS = [
    { name: "青葉市立第二中学校", kana: "アオバシリツダイニチュウガッコウ", alias: "青葉二中", type: "学校教育系施設", op: "直営", dept: "教育部学校施設課", usage: "中学校", str: "RC", town: "若葉町二丁目", blk: "5-1", area: 9420.0, age: 34, year: "1992-04-01" },
    { name: "北部地区公民館", kana: "ホクブチクコウミンカン", alias: "きたコミ", type: "社会教育系施設", op: "指定管理者", dept: "市民生活部地域振興課", usage: "公民館", str: "RC", town: "北青葉一丁目", blk: "12-3", area: 1850.5, age: 29, year: "1997-05-10" },
    { name: "市立ひまわり保育園", kana: "シリツヒマワリホイクエン", alias: "ひまわり園", type: "子育て支援施設", op: "直営", dept: "こども家庭部保育課", usage: "保育所", str: "S", town: "花見台三丁目", blk: "3-8", area: 1120.0, age: 12, year: "2014-04-01" },
    { name: "青葉市役所本庁舎", kana: "アオバシヤクショホンチョウシャ", alias: "本庁舎", type: "行政系施設", op: "直営", dept: "総務部管財課", usage: "庁舎", str: "SRC", town: "中央一丁目", blk: "1-1", area: 18400.0, age: 19, year: "2007-10-01" },
    { name: "南部老人福祉センター", kana: "ナンブロウジンフクシセンター", alias: "くすのき荘", type: "保健・福祉施設", op: "指定管理者", dept: "健康福祉部高齢福祉課", usage: "老人福祉センター", str: "RC", town: "南台四丁目", blk: "7-2", area: 2340.0, age: 31, year: "1995-09-01" },
    { name: "青葉消防署東出張所", kana: "アオバショウボウショヒガシシュッチョウジョ", alias: "東消防出張所", type: "行政系施設", op: "直営", dept: "消防本部総務課", usage: "消防署", str: "RC", town: "東町二丁目", blk: "9-4", area: 980.0, age: 16, year: "2010-03-20" },
    { name: "市立郷土資料館", kana: "シリツキョウドシリョウカン", alias: "青葉歴史館", type: "社会教育系施設", op: "直営", dept: "教育部文化財課", usage: "博物館", str: "RC", town: "城山町一丁目", blk: "6-1", area: 2650.0, age: 37, year: "1989-11-03" },
    { name: "西部コミュニティプラザ", kana: "セイブコミュニティプラザ", alias: "ウエストプラザ", type: "市民文化系施設", op: "指定管理者", dept: "市民生活部地域振興課", usage: "集会場", str: "S", town: "西が丘一丁目", blk: "2-14", area: 3120.0, age: 15, year: "2011-06-01" },
    { name: "青葉市民球場・運動公園管理棟", kana: "アオバシミンキュウジョウウンドウコウエンカンリトウ", alias: "青葉スタジアム", type: "スポーツ・レクリエーション系施設", op: "指定管理者", dept: "市民生活部スポーツ振興課", usage: "観覧場", str: "RC", town: "緑ケ丘五丁目", blk: "1-1", area: 4280.0, age: 26, year: "2000-04-15" },
    { name: "市立あおぞら児童館", kana: "シリツアオゾラジドウカン", alias: "あおぞら館", type: "子育て支援施設", op: "直営", dept: "こども家庭部児童青少年課", usage: "児童厚生施設", str: "W", town: "桜ケ丘二丁目", blk: "11-6", area: 680.0, age: 9, year: "2017-04-01" },
  ];

  const BUILDER_COMMON_EXTS = {
    m_facilities: ["pd_address", "pd_building", "pd_contact_point"],
  };
  const BUILDER_ALLOWED_COMMON_IDS = new Set(["pd_address", "pd_building", "pd_contact_point"]);

  function enrichFacilitySampleRow(row, idx) {
    const n = idx + 1;
    const pad = String(n).padStart(3, "0");
    const town = row.streetAddress || "青葉町一丁目";
    const blk = row.cityBlock || "1-1";
    const blkParts = String(blk).split("-");
    const storeys = Number(row.storeysAboveGround || 2) || 2;
    const facIdLower = String(row.facilityId || `FAC-${pad}`).toLowerCase();
    const townKanaMap = {
      "青葉町一丁目": "アオバチョウイッチョウメ",
      "みどり台二丁目": "ミドリダイニチョウメ",
      "中央公園": "チュウオウコウエン",
      "桜木町三丁目": "サクラギチョウサンチョウメ",
    };
    const townEnMap = {
      "青葉町一丁目": "Aobacho 1-chome",
      "みどり台二丁目": "Midoridai 2-chome",
      "中央公園": "Chuo-koen",
      "桜木町三丁目": "Sakuragicho 3-chome",
    };
    const stKana = townKanaMap[town] || "アオバチョウ";
    const stEn = townEnMap[town] || `District-${n}`;
    return {
      // pd_address optional / standalone fields
      country: "JP",
      streetAddressId: row.streetAddressId || `000${100 + n}`,
      streetAddressAndCityBlock: `${town}${blk}`,
      prefectureKana: "トウキョウト",
      cityKana: "チヨダク",
      streetAddressKana: stKana,
      cityBlockKana: blk,
      fullAddressKana: `トウキョウトチヨダク${stKana}${blk}`,
      prefectureEn: "Tokyo",
      cityEn: "Chiyoda-ku",
      streetAddressEn: stEn,
      cityBlockEn: blk,
      fullAddressEn: `${blk} ${stEn}, Chiyoda-ku, Tokyo`,
      ward: "",
      largerSectionTown: town.replace(/[一二三四五六七八九十]+丁目$/, ""),
      smallAdministrativeUnit: "",
      residenceStatus: "1",
      areaCode: blkParts[0] || "1",
      residenceNumber: blkParts[1] || "1",
      landNumber: `${((n * 17) % 90) + 10}-1`,
      buildingName: `${row.name || "公共施設"} 本館`,
      floorName: `1階〜${storeys}階`,
      // pd_building optional / standalone fields
      buildingId: `BLD-${pad}`,
      abstract: `${row.name || "対象施設"}の主要建築物（${row.structure || "RC"}造・地上${storeys}階）`,
      status: "供用中",
      performanceDescription: `バリアフリー対応・省エネ基準適合（${row.seismicStandardCategory || "新耐震基準"}）`,
      maximumHeight: (storeys * 4.2 + 1.8).toFixed(1),
      dateOfCompletion: row.constructionDate || "1998-03-15",
      // pd_contact_point optional / standalone fields
      contactPointName: `${row.responsibleDepartment || "施設管理担当課"}（代表窓口）`,
      contactPointPurpose: "施設利用案内・予約・維持管理に関する問い合わせ",
      contactPointPhoneNumber: row.phoneNumber || `03-0000-0${pad}`,
      contactPointEmailAddress: `${facIdLower}@example.lg.jp`,
      contactPointUrl: `${row.url || `https://example.lg.jp/facilities/FAC-${pad}`}/contact`,
      contactSnsUrl: "",
      contactPointRemark: `休館日・夜間は担当部署（${row.responsibleDepartment || "総務課"}）へ連絡`,
      // keep all original row fields authoritative
      ...row,
    };
  }

  function getSampleRows(tableId, targetCount) {
    if (BUILDER_ALLOWED_COMMON_IDS.has(tableId)) {
      const facRows = getSampleRows("m_facilities", targetCount);
      return facRows.map((r, idx) => enrichFacilitySampleRow(r, idx));
    }

    const base = state.data.samples[tableId] || [];
    if (base.length >= targetCount) {
      const sliced = base.slice(0, targetCount);
      return tableId === "m_facilities" ? sliced.map((r, idx) => enrichFacilitySampleRow(r, idx)) : sliced;
    }

    const rows = [...base];
    for (let i = base.length; i < targetCount; i++) {
      const n = i + 1;
      const pad = String(n).padStart(3, "0");
      const seed = EXTRA_FACILITY_SEEDS[(i - base.length) % EXTRA_FACILITY_SEEDS.length];
      const facRef = `FAC-${String((i % 5) + 1).padStart(3, "0")}`;
      const eqpRef = `EQP-${String((i % 6) + 1).padStart(3, "0")}`;
      const disRef = `DIS-${String((i % 5) + 1).padStart(3, "0")}`;

      if (tableId === "m_facilities") {
        rows.push({
          ...base[i % base.length],
          facilityId: `FAC-${pad}`,
          relatedFacilityId: "",
          realEstateId: `RE-13101-01${String(n).padStart(2, "0")}`,
          name: n > 15 ? `${seed.name}（第${n - 14}分館）` : seed.name,
          nameKana: seed.kana,
          alternateName: seed.alias,
          streetAddress: seed.town,
          cityBlock: seed.blk,
          fullAddress: `東京都千代田区${seed.town}${seed.blk}`,
          phoneNumber: `03-0000-1${pad}`,
          latitude: (35.675 + n * 0.0018).toFixed(6),
          longitude: (139.742 + n * 0.0015).toFixed(6),
          description: `${seed.town}地区における${seed.type}（地域住民サービスおよび施設保全対象拠点）`,
          facilityType: seed.type,
          operatorCategory: seed.op,
          responsibleDepartment: seed.dept,
          constructionDate: seed.year,
          buildingAgeCount: String(seed.age),
          usage: seed.usage,
          totalFloorArea: String(seed.area),
          structure: seed.str,
          url: `https://example.lg.jp/facilities/FAC-${pad}`,
        });
      } else if (tableId === "m_facility_equipments") {
        const eqTypes = ["照明設備", "消防用設備", "給排水衛生設備", "太陽光発電設備", "空気調和設備"];
        const eqCats = ["建築電気設備", "防災設備", "建築機械設備", "再生可能エネルギー設備", "建築機械設備"];
        const idx = i % eqTypes.length;
        rows.push({
          equipmentId: `EQP-${pad}`,
          facilityId: facRef,
          equipmentType: eqTypes[idx],
          equipmentCategory: eqCats[idx],
          equipmentQuantityCount: String((i % 4) + 1),
          installationLocationDescription: `${(i % 3) + 1}階 機械室・共用部エリア`,
          remark: `定期保守契約対象（系統番号 S-${pad}）`,
        });
      } else if (tableId === "m_facility_equipment_units") {
        rows.push({
          equipmentUnitId: `EQU-${pad}`,
          equipmentId: eqpRef,
          componentType: `主要構成ユニット ${(i % 4) + 1}号機（盤・機器管理番号 U-${pad}）`,
          installationDate: `20${12 + (i % 12)}-0${(i % 9) + 1}-15`,
        });
      } else if (tableId === "t_financial_results") {
        const fy = 2024 - Math.floor((i - 5) / 5);
        const rev = (i % 4) * 3200000 + 800000;
        const util = 9500000 + (i % 5) * 4200000;
        const mgmt = 16000000 + (i % 5) * 5100000;
        const rep = 2400000 + (i % 3) * 3100000;
        const pers = 22000000 + (i % 4) * 6500000;
        const oth = 1800000;
        const cash = util + mgmt + rep + pers + oth;
        const dep = 15000000 + (i % 5) * 4800000;
        const tot = cash + dep;
        rows.push({
          financialResultId: `FIN-${fy}-${pad}`,
          facilityId: facRef,
          fiscalYear: String(fy),
          revenueUsageFeeAmount: String(rev - 200000),
          revenueOtherAmount: "200000",
          revenueTotalAmount: String(rev),
          expenditureRepairAmount: String(rep),
          expenditureUtilityAmount: String(util),
          expenditureManagementAmount: String(mgmt),
          expenditurePersonnelAmount: String(pers),
          expenditureOtherAmount: String(oth),
          cashExpenditureTotalAmount: String(cash),
          nonCashDepreciationAmount: String(dep),
          totalCostAmount: String(tot),
          fiscalBalanceAmount: String(rev - tot),
        });
      } else if (tableId === "t_asset_cost_records") {
        const cats = ["修繕費", "改修・更新費", "新設・取得費", "除却費"];
        const stages = ["計画", "見積", "実績"];
        rows.push({
          assetCostRecordId: `ACR-2026-${pad}`,
          facilityId: facRef,
          costCategory: cats[i % cats.length],
          costStage: stages[i % stages.length],
          amount: String(((i % 7) + 2) * 5400000),
        });
      } else if (tableId === "t_maintenance_histories") {
        const parts = ["外壁", "屋上・屋根", "電気設備", "空調換気設備", "給排水衛生設備"];
        const acts = ["点検", "診断", "修繕", "更新"];
        const scores = ["A", "B", "B", "C"];
        const conds = ["良好", "予防保全段階", "予防保全段階", "要改修検討"];
        const k = i % 4;
        rows.push({
          maintenanceId: `MNT-2026-${pad}`,
          facilityId: facRef,
          maintenanceEventDate: `2026-0${(i % 9) + 1}-18`,
          maintenanceDataCategory: i % 2 === 0 ? "実績" : "計画",
          maintenanceActivityType: acts[k],
          maintenanceTargetPart: parts[i % parts.length],
          deteriorationScore: scores[k],
          overallConditionStatus: conds[k],
          maintenanceActionDescription: `${parts[i % parts.length]}の定期${acts[k]}および経年劣化箇所の措置記録`,
          maintenanceCostAmount: String(((i % 6) + 1) * 2800000),
        });
      } else if (tableId === "t_usage_histories") {
        const fy = 2024 - Math.floor((i - 5) / 5);
        const days = 285 + (i % 25);
        const users = 45000 + (i % 6) * 28000;
        rows.push({
          usageHistoryId: `USG-${fy}-${pad}`,
          facilityId: facRef,
          aggregationPeriod: `${fy}年度`,
          aggregationPeriodType: "年度",
          openDayCount: String(days),
          totalUserCount: String(users),
          usageCaseCount: String(1200 + (i % 5) * 950),
          costPerDayAmount: String(Math.round(92000000 / days)),
          costPerUserAmount: String(Math.round(92000000 / users)),
          costPerTotalFloorAreaAmount: String(18500 + (i % 5) * 2200),
        });
      } else if (tableId === "m_disaster_bases") {
        rows.push({
          ...base[i % base.length],
          disasterBaseId: `DIS-${pad}`,
          facilityId: `FAC-${pad}`,
          estimatedCapacityCount: String(150 + (i % 6) * 110),
          remark: `地区防災計画に基づく補助避難拠点（拠点番号 DIS-${pad}）`,
        });
      } else if (tableId === "t_disaster_status_histories") {
        const hour = String(8 + (i % 12)).padStart(2, "0");
        const total = 45 + (i % 7) * 32;
        const male = Math.floor(total * 0.47);
        rows.push({
          ...base[i % base.length],
          disasterStatusId: `DST-2026-${pad}`,
          disasterBaseId: disRef,
          statusUpdateDateTime: `2026-09-13T${hour}:00:00+09:00`,
          currentEvacueeTotalCount: String(total),
          currentEvacueeMaleCount: String(male),
          currentEvacueeFemaleCount: String(total - male),
          currentEvacueeVulnerableCount: String(Math.max(2, Math.floor(total * 0.12))),
          currentEvacueeHouseholdCount: String(Math.max(1, Math.floor(total * 0.48))),
        });
      } else {
        const tbl = tableById.get(tableId);
        const obj = {};
        tbl?.columns.forEach((c) => {
          obj[c.en] = c.key === "PK" ? `ID-${pad}` : c.required === "必須" ? `SAMPLE-${pad}` : "";
        });
        rows.push(obj);
      }
    }
    return tableId === "m_facilities" ? rows.map((r, idx) => enrichFacilitySampleRow(r, idx)) : rows;
  }

  function applyBranding() {
    const b = state.data?.ui?.branding || {};
    const totalCols = state.data.tables.reduce((n, t) => n + t.columns.length, 0);
    const commonCount = state.data.commonClasses?.length || 0;
    if (b.appName) document.title = `${b.appName} v${b.version || "2.0"}`;
    const bt = $("#brand-title");
    if (bt && b.sidebarTitle) bt.innerHTML = escBr(b.sidebarTitle);
    const bs = $("#brand-subtitle");
    if (bs && b.sidebarSubtitle !== undefined) bs.textContent = b.sidebarSubtitle;
    const dh = $("#sidebar-domain-heading");
    if (dh && b.sidebarDomainHeading !== undefined) dh.textContent = b.sidebarDomainHeading;
    const verEl = $("#sidebar-version");
    if (verEl) verEl.textContent = b.version || state.data.version;
    const fl = $("#footer-left");
    if (fl && b.footerLeft !== undefined) fl.textContent = b.footerLeft;
    const fr = $("#footer-right");
    if (fr && b.footerRight !== undefined) fr.textContent = b.footerRight;
    const pill = $("#topbar-spec-pill");
    if (pill) {
      pill.textContent = `${state.data.domains.length}領域 · ${state.data.tables.length}表(${totalCols}) ＋ 共通${commonCount}クラス`;
    }
  }

  function updateChrome() {
    $$("#main-nav .nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === state.view);
    });
    $$("#domain-nav .domain-nav-btn").forEach((btn) => {
      const isAct = state.view === "explorer" && btn.dataset.domain === state.domainId;
      btn.classList.toggle("active-domain", isAct);
    });

    const bc = $("#breadcrumb");
    if (bc) {
      let extra = "";
      if (state.view === "explorer") {
        const dom = domainById.get(state.domainId);
        const tbl = tableById.get(state.tableId);
        if (dom && tbl) {
          extra = `<span class="sep">/</span><span>${esc(dom.code)} ${esc(dom.name)}</span><span class="sep">/</span><strong>${esc(tbl.name)}</strong>`;
        }
      } else if (state.view === "relations") {
        const dg = diagramById.get(state.umlDiagramId);
        if (dg) {
          extra = `<span class="sep">/</span><strong>${esc(dg.shortName)}</strong>`;
        }
      }
      bc.innerHTML = extra
        ? `<span>標準化スタジオ</span><span class="sep">/</span><span>${esc(VIEW_TITLES[state.view])}</span>${extra}`
        : `<span>標準化スタジオ</span><span class="sep">/</span><strong>${esc(VIEW_TITLES[state.view])}</strong>`;
    }
  }

  function getDomainMapVariant(dg) {
    if (!dg || !dg.variants?.length) return null;
    return dg.variants[dg.variants.length - 1];
  }

  function navigate(view, opts = {}) {
    state.view = view;
    if (opts.domainId && domainById.has(opts.domainId)) {
      state.domainId = opts.domainId;
      const dom = domainById.get(opts.domainId);
      if (dom && (!opts.tableId || !dom.tables.includes(opts.tableId))) {
        state.tableId = dom.tables[0];
      }
    }
    if (opts.tableId && tableById.has(opts.tableId)) {
      const tbl = tableById.get(opts.tableId);
      state.tableId = tbl.id;
      state.domainId = tbl.domainId;
    }
    if (
      opts.builderTableId &&
      tableById.has(opts.builderTableId) &&
      (!tableById.get(opts.builderTableId).isCommonClass || BUILDER_ALLOWED_COMMON_IDS.has(opts.builderTableId))
    ) {
      state.builderTableId = opts.builderTableId;
    }
    if (opts.relMode) {
      state.relMode = opts.relMode === "mermaid" ? "mermaid" : "map";
      if (opts.relMode === "er" && !opts.umlDiagramId) {
        state.umlDiagramId = "overall";
      }
    }
    if (opts.umlDiagramId && diagramById.has(opts.umlDiagramId)) {
      state.umlDiagramId = opts.umlDiagramId;
      const dg = diagramById.get(state.umlDiagramId);
      state.umlVariantIdx = opts.umlVariantIdx ?? Math.max(0, (dg?.variants?.length || 1) - 1);
      const mapVar = getDomainMapVariant(dg);
      if (state.umlDiagramId === "overall" && opts.umlSelectClass) {
        const matched = [...state.data.tables, ...(state.data.commonClasses || [])].find(
          (t) => t.classEn === opts.umlSelectClass
        );
        if (matched && (matched.id === "pd_building" || !matched.isCommonClass)) {
          state.erSelectedType = "table";
          state.erSelectedId = matched.id;
        }
      } else if (opts.umlSelectClass && mapVar?.classes.some((c) => c.id === opts.umlSelectClass)) {
        state.umlSelectedType = "class";
        state.umlSelectedId = opts.umlSelectClass;
      } else if (mapVar?.classes[0]) {
        state.umlSelectedType = "class";
        state.umlSelectedId = mapVar.classes[0].id;
      }
    }
    if (opts.erSelectTable && tableById.has(opts.erSelectTable)) {
      const target = tableById.get(opts.erSelectTable);
      state.relMode = "map";
      if (target.isCommonClass && target.id !== "pd_building") {
        const domDg = target.usedInDiagrams?.find((d) => d.diagramId !== "overall") || target.usedInDiagrams?.[0];
        if (domDg && diagramById.has(domDg.diagramId)) {
          state.umlDiagramId = domDg.diagramId;
          const dg = diagramById.get(state.umlDiagramId);
          state.umlVariantIdx = Math.max(0, (dg?.variants?.length || 1) - 1);
          state.umlSelectedType = "class";
          state.umlSelectedId = target.classEn;
        } else {
          state.umlDiagramId = "facility";
          state.umlSelectedType = "class";
          state.umlSelectedId = "Facility";
        }
      } else {
        state.umlDiagramId = "overall";
        state.erDomainFilter = "all";
        state.erSelectedType = "table";
        state.erSelectedId = opts.erSelectTable;
      }
    }
    if (opts.erSelectRel) {
      state.relMode = "map";
      state.umlDiagramId = "overall";
      state.erDomainFilter = "all";
      if (String(opts.erSelectRel).startsWith("EXT_")) {
        state.erShowExtended = true;
      }
      state.erSelectedType = "rel";
      state.erSelectedId = opts.erSelectRel;
    }
    if (opts.codeListId && codeListById.has(opts.codeListId)) {
      state.codeListId = opts.codeListId;
      state.codeFilter = "all";
      state.codeQuery = "";
    }
    updateChrome();
    renderMain();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function renderSidebarDomains() {
    const wrap = $("#domain-nav");
    if (!wrap) return;
    const allNavDomains = [...state.data.domains];
    const commonDom = domainById.get("common");
    if (commonDom && commonDom.tables.length) {
      allNavDomains.push(commonDom);
    }

    wrap.innerHTML = allNavDomains
      .map((d) => {
        const count = d.tables.reduce((acc, tid) => acc + (tableById.get(tid)?.columns.length || 0), 0);
        return `<button type="button" class="domain-nav-btn" data-domain="${esc(d.id)}">
          <span class="domain-nav-left">
            <span class="domain-dot" style="background:${esc(d.color)}"></span>
            <span>${esc(d.code)} ${esc(d.shortName)}</span>
          </span>
          <span class="domain-count-pill">${d.isCommonDomain ? `${d.tables.length}種` : count}</span>
        </button>`;
      })
      .join("");

    $$(".domain-nav-btn", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.expSection = "all";
        state.expReq = "req_rec";
        navigate("explorer", { domainId: btn.dataset.domain });
      });
    });
  }

  function renderReqBadge(req) {
    if (req === "必須") return `<span class="badge req">必須</span>`;
    if (req === "推奨") return `<span class="badge rec">推奨</span>`;
    return `<span class="badge opt">${esc(req || "任意")}</span>`;
  }

  function renderKeyBadge(col) {
    if (!col.key) return "";
    if (col.key === "PK") return `<span class="badge pk">PK 主キー</span>`;
    if (col.key === "FK") return `<span class="badge fk">FK 外部キー</span>`;
    return `<span class="badge">${esc(col.key)}</span>`;
  }

  // =========================================================================
  // CODE LIST QUICK POPUP MODAL
  // =========================================================================
  function openCodeModal(listId) {
    if (!codeListById.has(listId)) return;
    closeClassModal();
    state.modalCodeListId = listId;
    state.modalCodeQuery = "";
    $("#code-modal-backdrop")?.classList.remove("hidden");
    $("#code-modal")?.classList.remove("hidden");
    renderCodeModalContent();
    $("#modal-code-search")?.focus();
  }

  function closeCodeModal() {
    state.modalCodeListId = null;
    $("#code-modal-backdrop")?.classList.add("hidden");
    $("#code-modal")?.classList.add("hidden");
  }

  function renderCodeModalContent() {
    const host = $("#code-modal-content");
    if (!host || !state.modalCodeListId) return;
    const cl = codeListById.get(state.modalCodeListId);
    if (!cl) return;

    const q = normSearch(state.modalCodeQuery.trim());
    const matchedItems = cl.items.filter((it) =>
      !q ? true : normSearch([it.code, it.altCode, it.ja, it.altJa, it.en, it.major, it.desc].join(" ")).includes(q)
    );
    const items = matchedItems.slice(0, 200);

    host.innerHTML = `
      <header class="code-modal-head">
        <div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:4px">
            <span class="badge code-link" style="cursor:default">⌗ ${esc(cl.category)}</span>
            <span class="badge req">全 ${cl.count} 件</span>
            <span class="mono" style="font-size:11.5px;color:var(--text-muted)">リストID: ${esc(cl.id)}</span>
          </div>
          <h2 style="margin:2px 0;font-size:19px;color:var(--navy-900)">
            ${esc(cl.name)}
            ${cl.enName ? `<span class="mono" style="font-size:13.5px;color:var(--text-muted)">(${esc(cl.enName)})</span>` : ""}
          </h2>
          ${cl.sourceSpec ? `<div style="font-size:12px;color:var(--text-muted)">参照規格・出典：${esc(cl.sourceSpec)}</div>` : ""}
        </div>
        <button type="button" class="btn sm" id="modal-code-close" aria-label="ポップアップを閉じる">✕ 閉じる</button>
      </header>

      <div class="code-modal-body">
        ${
          cl.usedBy.length
            ? `<div style="margin-bottom:12px;font-size:12px;color:var(--text-body)">
                <strong>このリストを参照している項目：</strong>
                ${cl.usedBy
                  .map(
                    (u) =>
                      `<button type="button" class="btn sm" style="margin:2px 4px 2px 0;padding:2px 8px;min-height:24px" data-modal-prop="${esc(
                        u.propId
                      )}">${esc(u.tableName || u.tableId)}.${esc(u.ja)}</button>`
                  )
                  .join("")}
              </div>`
            : ""
        }
        ${
          cl.isMunicipalityList && matchedItems.length > items.length
            ? `<div class="callout warn" style="margin-bottom:10px">全国地方公共団体コード（該当 ${matchedItems.length} 団体）のうち先頭 ${items.length} 件を表示しています。下の検索欄で都道府県名・市区町村名・かな・コードで絞り込めます。</div>`
            : ""
        }
        <div class="filter-bar" style="margin-bottom:10px">
          <input type="search" id="modal-code-search" class="filter-input"
            placeholder="符号・日本語ラベル・かな・英語ラベル・説明で絞り込み…"
            value="${esc(state.modalCodeQuery)}" aria-label="ポップアップ内コード検索">
          <span style="font-size:12px;color:var(--text-muted);font-weight:700">${
            matchedItems.length > items.length ? `${items.length} / ${matchedItems.length}` : matchedItems.length
          } 件表示</span>
        </div>

        <div class="data-table-wrap" style="max-height:46vh;overflow-y:auto">
          <table class="data-table" style="min-width:560px">
            <thead>
              <tr>
                <th style="width:120px">符号（コード）</th>
                <th style="width:180px">日本語ラベル</th>
                <th style="width:150px">英語ラベル</th>
                <th style="width:120px">分類</th>
                <th>説明・備考</th>
              </tr>
            </thead>
            <tbody>
              ${
                items.length
                  ? items
                      .map(
                        (it) => `<tr>
                      <td class="mono"><strong>${esc(it.code || "—")}</strong></td>
                      <td><strong>${esc(it.ja)}</strong>${
                          it.altJa ? `<div class="prop-alias">${esc(it.altJa)}</div>` : ""
                        }</td>
                      <td class="mono">${esc(it.en || "—")}</td>
                      <td>${esc([it.major, it.middle].filter(Boolean).join(" / ") || "—")}</td>
                      <td>
                        <div>${esc(it.desc || "—")}</div>
                        ${it.note ? `<div style="font-size:11px;color:var(--text-muted)">※ ${esc(it.note)}</div>` : ""}
                      </td>
                    </tr>`
                      )
                      .join("")
                  : `<tr><td colspan="5" class="empty-box">一致するコード値がありません</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>

      <footer class="code-modal-foot">
        <div style="font-size:11.5px;color:var(--text-muted)">Escキーまたは枠外クリックでも閉じられます</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${
            !cl.isMunicipalityList
              ? `<button type="button" class="btn sm" id="modal-code-dl">⇩ このリストをCSV出力</button>`
              : ""
          }
          <button type="button" class="btn sm primary" id="modal-code-goto-page">統制語彙・コード辞書ページで開く →</button>
        </div>
      </footer>
    `;

    $("#modal-code-close", host)?.addEventListener("click", closeCodeModal);
    bindLiveSearchInput(
      $("#modal-code-search", host),
      () => state.modalCodeQuery,
      (val) => {
        state.modalCodeQuery = val;
        renderCodeModalContent();
      },
      () => $("#modal-code-search", $("#code-modal-content"))
    );

    $$("[data-modal-prop]", host).forEach((b) =>
      b.addEventListener("click", () => {
        const pid = b.dataset.modalProp;
        closeCodeModal();
        openDrawer(pid);
      })
    );

    $("#modal-code-dl", host)?.addEventListener("click", () => {
      const cols = state.data.rawCodeColumns;
      const rows = state.data.rawCodes.filter((r) => r["コードリストID"] === cl.id);
      downloadFile(`codelist_${cl.name}.csv`, toCsv([cols, ...rows.map((r) => cols.map((c) => r[c]))]));
    });

    $("#modal-code-goto-page", host)?.addEventListener("click", () => {
      const id = cl.id;
      closeCodeModal();
      navigate("codes", { codeListId: id });
    });
  }

  // =========================================================================
  // COMMON CLASS QUICK POPUP MODAL (関連クラス ポップアップ)
  // =========================================================================
  function openClassModal(sheetId) {
    if (!tableById.has(sheetId)) return;
    closeCodeModal();
    state.modalClassId = sheetId;
    state.modalClassQuery = "";
    $("#class-modal-backdrop")?.classList.remove("hidden");
    $("#class-modal")?.classList.remove("hidden");
    renderClassModalContent();
    $("#modal-class-search")?.focus();
  }

  function closeClassModal() {
    state.modalClassId = null;
    $("#class-modal-backdrop")?.classList.add("hidden");
    $("#class-modal")?.classList.add("hidden");
  }

  function renderClassModalContent() {
    const host = $("#class-modal-content");
    if (!host || !state.modalClassId) return;
    const cls = tableById.get(state.modalClassId);
    if (!cls) return;

    const q = normSearch(state.modalClassQuery.trim());
    const cols = cls.columns.filter((c) =>
      !q ? true : normSearch([c.id, c.ja, c.altJa, c.en, c.dataType, c.desc, c.listName, c.relatedClass].join(" ")).includes(q)
    );
    const refBy = cls.referencedBy || [];
    const usedDgs = cls.usedInDiagrams || [];

    host.innerHTML = `
      <header class="class-modal-head">
        <div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:4px">
            <span class="badge rel-class-link" style="cursor:default">◇ ${esc(cls.nature || "共通クラス")}</span>
            <span class="badge req">全 ${cls.columns.length} 項目</span>
            <span class="mono" style="font-size:11.5px;color:var(--text-muted)">シート名: ${esc(cls.id)}</span>
          </div>
          <h2 style="margin:2px 0;font-size:19px;color:var(--navy-900)">
            ${esc(cls.name)}
            <span class="mono" style="font-size:14px;color:var(--text-muted)">(${esc(cls.classEn)})</span>
          </h2>
          ${cls.description ? `<div style="font-size:12.5px;color:var(--text-body);margin-top:3px;line-height:1.6">${escBr(cls.description)}</div>` : ""}
        </div>
        <button type="button" class="btn sm" id="modal-class-close" aria-label="ポップアップを閉じる">✕ 閉じる</button>
      </header>

      <div class="code-modal-body">
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:12px;font-size:12px;color:var(--text-body)">
          ${
            refBy.length
              ? `<div>
                  <strong>参照元のデータ項目（${refBy.length}件）：</strong>
                  ${refBy
                    .slice(0, 12)
                    .map(
                      (u) =>
                        `<button type="button" class="btn sm" style="margin:2px 4px 2px 0;padding:2px 8px;min-height:24px" data-cmodal-prop="${esc(
                          u.propId
                        )}">${esc(u.tableName)}.${esc(u.ja)}</button>`
                    )
                    .join("")}
                  ${refBy.length > 12 ? `<span style="color:var(--text-muted)">＋他 ${refBy.length - 12} 件</span>` : ""}
                </div>`
              : `<div style="color:var(--text-muted)">※ 基本データセットからは文字列属性として簡略表現され、詳細クラス図等で構造展開されるクラスです。</div>`
          }
          ${
            usedDgs.length
              ? `<div>
                  <strong>登場するクラス図：</strong>
                  ${usedDgs
                    .map(
                      (d) =>
                        `<button type="button" class="btn sm" style="margin:2px 4px 2px 0;padding:2px 8px;min-height:24px" data-cmodal-dg="${esc(
                          d.diagramId
                        )}" data-cmodal-v="${d.variantIndex}">◈ ${esc(d.label)}</button>`
                    )
                    .join("")}
                </div>`
              : ""
          }
        </div>

        <div class="filter-bar" style="margin-bottom:10px">
          <input type="search" id="modal-class-search" class="filter-input"
            placeholder="この共通クラス内の項目名・英語名・型・説明で絞り込み…"
            value="${esc(state.modalClassQuery)}" aria-label="共通クラス内検索">
          <span style="font-size:12px;color:var(--text-muted);font-weight:700">${cols.length} 件表示</span>
        </div>

        <div class="data-table-wrap" style="max-height:45vh;overflow-y:auto">
          <table class="data-table" style="min-width:620px">
            <thead>
              <tr>
                <th style="width:105px">内部管理ID</th>
                <th style="width:175px">日本語名</th>
                <th style="width:155px">英語名</th>
                <th style="width:70px">区分</th>
                <th style="width:125px">型 / 多重度</th>
                <th>説明・コード/関連クラス</th>
              </tr>
            </thead>
            <tbody>
              ${
                cols.length
                  ? cols
                      .map((c) => {
                        const codeTag = c.listId
                          ? `<button type="button" class="badge code-link" style="margin-top:4px" data-cmodal-code="${esc(c.listId)}">⌗ ${esc(c.listName)}</button>`
                          : c.listName
                          ? `<span class="badge ext-code" style="margin-top:4px">外部体系: ${esc(c.listName)}</span>`
                          : "";
                        const relTag = c.relatedClassId
                          ? `<button type="button" class="badge rel-class-link" style="margin-top:4px" data-cmodal-subcls="${esc(c.relatedClassId)}">◇ 関連クラス: ${esc(c.relatedClass)}</button>`
                          : "";
                        return `<tr class="clickable-row" data-cmodal-openprop="${esc(c.id)}">
                          <td class="mono" style="font-size:11px;color:var(--text-muted)">
                            <div>${esc(c.id)}</div>
                            ${c.key ? `<div style="margin-top:3px">${renderKeyBadge(c)}</div>` : ""}
                          </td>
                          <td><strong>${esc(c.ja)}</strong></td>
                          <td class="mono" style="font-weight:700">${esc(c.en)}</td>
                          <td>${renderReqBadge(c.required)}</td>
                          <td>
                            <strong>${esc(c.dataType)}</strong>
                            <div class="mono" style="font-size:11px;color:var(--text-muted)">[${esc(c.multiplicity || "—")}]</div>
                          </td>
                          <td>
                            <div>${esc(c.desc || "—")}</div>
                            <div style="display:flex;gap:5px;flex-wrap:wrap">${codeTag}${relTag}</div>
                          </td>
                        </tr>`;
                      })
                      .join("")
                  : `<tr><td colspan="6" class="empty-box">一致する属性がありません</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>

      <footer class="code-modal-foot">
        <div style="font-size:11.5px;color:var(--text-muted)">行をクリックすると項目詳細ドロワーが開きます</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn sm primary" id="modal-class-goto-exp">領域・項目定義ブラウザ（共通クラス）で開く →</button>
        </div>
      </footer>
    `;

    $("#modal-class-close", host)?.addEventListener("click", closeClassModal);
    bindLiveSearchInput(
      $("#modal-class-search", host),
      () => state.modalClassQuery,
      (val) => {
        state.modalClassQuery = val;
        renderClassModalContent();
      },
      () => $("#modal-class-search", $("#class-modal-content"))
    );

    $$("[data-cmodal-prop]", host).forEach((b) =>
      b.addEventListener("click", () => {
        const pid = b.dataset.cmodalProp;
        closeClassModal();
        openDrawer(pid);
      })
    );

    $$("[data-cmodal-dg]", host).forEach((b) =>
      b.addEventListener("click", () => {
        const dgId = b.dataset.cmodalDg;
        const vIdx = Number(b.dataset.cmodalV) || 0;
        const clsEn = cls.classEn;
        closeClassModal();
        navigate("relations", { relMode: "map", umlDiagramId: dgId, umlVariantIdx: vIdx, umlSelectClass: clsEn });
      })
    );

    $$("[data-cmodal-openprop]", host).forEach((tr) =>
      tr.addEventListener("click", (e) => {
        const codeBtn = e.target.closest("[data-cmodal-code]");
        if (codeBtn) {
          e.stopPropagation();
          openCodeModal(codeBtn.dataset.cmodalCode);
          return;
        }
        const subBtn = e.target.closest("[data-cmodal-subcls]");
        if (subBtn) {
          e.stopPropagation();
          openClassModal(subBtn.dataset.cmodalSubcls);
          return;
        }
        const pid = tr.dataset.cmodalOpenprop;
        closeClassModal();
        openDrawer(pid);
      })
    );

    $("#modal-class-goto-exp", host)?.addEventListener("click", () => {
      const id = cls.id;
      closeClassModal();
      navigate("explorer", { tableId: id });
    });
  }

  // =========================================================================
  // 1. OVERVIEW VIEW (Driven by ui_texts.json + live CSV counts + Common Classes)
  // =========================================================================
  function renderOverview(container) {
    const hero = state.data.ui?.overviewHero || {};
    const sec = state.data.ui?.overviewSection || {};
    const cSec = state.data.ui?.commonSection || {};

    const totalCols = state.data.tables.reduce((n, t) => n + t.columns.length, 0);
    const reqCols = state.data.tables.reduce((n, t) => n + t.requiredCount, 0);
    const commonClasses = state.data.commonClasses || [];
    const commonColTotal = commonClasses.reduce((n, c) => n + c.columns.length, 0);
    const staticCount = state.data.tables.filter((t) => t.nature.includes("静的")).length;
    const dynamicCount = state.data.tables.length - staticCount;
    const diagramTotal = (state.data.classDiagrams || []).reduce((n, g) => n + g.variants.length, 0);
    const usedLists = state.data.codeLists.filter((c) => c.usedBy.length > 0).length;

    container.innerHTML = `
      <section class="overview-banner">
        <div>
          ${hero.eyebrow ? `<p class="eyebrow" style="color:#93c5fd">${esc(hero.eyebrow)}</p>` : ""}
          <h1>${escBr(hero.title || "自治体施設管理データモデル")}</h1>
          ${hero.description ? `<p>${escBr(hero.description)}</p>` : ""}
          <div class="banner-actions">
            <button type="button" class="btn light-hero" data-act="go-relations">◈ 全体関連図・クラス図を見る</button>
            <button type="button" class="btn ghost-hero" data-act="go-explorer">▤ 領域・項目定義を詳しく見る</button>
            <button type="button" class="btn ghost-hero" data-act="go-builder">⇩ CSVテンプレート・サンプル出力</button>
          </div>
        </div>
      </section>

      <section class="kpi-grid" aria-label="データモデル統計">
        <div class="kpi-card">
          <div class="kpi-label">対象業務領域</div>
          <div class="kpi-value">${state.data.domains.length}<span style="font-size:14px;font-weight:700;margin-left:4px">領域</span></div>
          <div class="kpi-sub">平常時ファシマネ＋災害時避難運営</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">基本データセット構成</div>
          <div class="kpi-value">${state.data.tables.length}<span style="font-size:14px;font-weight:700;margin-left:4px">テーブル</span></div>
          <div class="kpi-sub">静的${staticCount}表＋動的${dynamicCount}表（${totalCols}項目・必須${reqCols}）</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">共通クラス（部品構造）</div>
          <div class="kpi-value">${commonClasses.length}<span style="font-size:14px;font-weight:700;margin-left:4px">クラス</span></div>
          <div class="kpi-sub">建物・住所・連絡先など計 ${commonColTotal} 項目</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Mermaid クラス図</div>
          <div class="kpi-value">${diagramTotal}<span style="font-size:14px;font-weight:700;margin-left:4px">図</span></div>
          <div class="kpi-sub">全体関連図＋領域別（簡易・詳細）</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">統制語彙・コードリスト</div>
          <div class="kpi-value">${state.data.codeLists.length}<span style="font-size:14px;font-weight:700;margin-left:4px">種</span></div>
          <div class="kpi-sub">モデル参照中 ${usedLists} 種 ＋ 候補プール</div>
        </div>
      </section>

      <div class="section-heading">
        <div>
          <h2>${escBr(sec.title || "業務領域と収録テーブル")}</h2>
          ${sec.subtitle ? `<small>${escBr(sec.subtitle)}</small>` : ""}
        </div>
      </div>

      <section class="domain-cards-grid">
        ${state.data.domains
          .map((dom) => {
            const domTables = dom.tables.map((tid) => tableById.get(tid)).filter(Boolean);
            const domColCount = domTables.reduce((n, t) => n + t.columns.length, 0);
            return `
              <article class="domain-card" style="--domain-color:${esc(dom.color)}">
                <div>
                  <div class="domain-card-head">
                    <span class="domain-code-badge" style="background:${esc(dom.bg)};color:${esc(dom.color)};border:1px solid ${esc(dom.border)}">
                      領域 ${esc(dom.code)}
                    </span>
                    <span style="font-size:12px;color:var(--text-muted);font-weight:700">${domTables.length}表 · 計${domColCount}項目</span>
                  </div>
                  <h3>${esc(dom.name)}</h3>
                </div>
                ${dom.summary ? `<p>${escBr(dom.summary)}</p>` : ""}
                <div class="domain-table-chips">
                  ${domTables
                    .map(
                      (t) => `
                    <button type="button" class="table-mini-btn" data-open-table="${esc(t.id)}">
                      <div>
                        <strong>${esc(t.name)}</strong>
                        ${t.roleNote ? `<small>${esc(t.roleNote)}</small>` : ""}
                      </div>
                      <div style="text-align:right;flex:none">
                        <span class="badge req">必須 ${t.requiredCount}</span>
                        <small style="margin-top:3px">全 ${t.columns.length} 項目 →</small>
                      </div>
                    </button>
                  `
                    )
                    .join("")}
                </div>
                <div class="domain-card-foot">
                  <button type="button" class="btn sm" data-uml-domain="${esc(dom.id)}">◈ クラス図で確認</button>
                  <button type="button" class="btn sm primary" data-open-table="${esc(domTables[0].id)}">項目一覧を開く</button>
                </div>
              </article>
            `;
          })
          .join("")}
      </section>

      ${
        commonClasses.length
          ? `
        <div class="section-heading" style="margin-top:30px">
          <div>
            <h2>${escBr(cSec.title || "共通クラス・複合データ構造（クラス図対応）")}</h2>
            ${cSec.subtitle ? `<small>${escBr(cSec.subtitle)}</small>` : ""}
          </div>
          <button type="button" class="btn sm" id="ov-open-common-all">共通クラス一覧を開く →</button>
        </div>

        <section class="common-overview-panel">
          ${cSec.summary ? `<p style="margin:0;font-size:12.5px;color:var(--text-body);line-height:1.7">${escBr(cSec.summary)}</p>` : ""}
          <div class="common-chips-grid">
            ${commonClasses
              .map(
                (c) => `
              <button type="button" class="common-class-chip" data-open-table="${esc(c.id)}">
                <div>
                  <strong>◇ ${esc(c.name)} <span class="mono" style="font-weight:600;font-size:11.5px;color:var(--text-muted)">(${esc(c.classEn)})</span></strong>
                  <small>${esc(c.roleNote || "")}</small>
                </div>
                <span class="badge opt" style="flex:none">${c.columns.length}項目</span>
              </button>`
              )
              .join("")}
          </div>
        </section>`
          : ""
      }
    `;

    $('[data-act="go-relations"]', container)?.addEventListener("click", () =>
      navigate("relations", { relMode: "map", umlDiagramId: "overall", umlVariantIdx: 0 })
    );
    $('[data-act="go-explorer"]', container)?.addEventListener("click", () => navigate("explorer"));
    $('[data-act="go-builder"]', container)?.addEventListener("click", () => navigate("builder"));
    $("#ov-open-common-all", container)?.addEventListener("click", () =>
      navigate("explorer", { domainId: "common" })
    );

    $$("[data-open-table]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.expSection = "all";
        state.expReq = "req_rec";
        navigate("explorer", { tableId: btn.dataset.openTable });
      });
    });

    $$("[data-uml-domain]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        const domId = btn.dataset.umlDomain;
        const dgId = diagramById.has(domId) ? domId : "overall";
        navigate("relations", { relMode: "map", umlDiagramId: dgId });
      });
    });
  }

  // =========================================================================
  // 2. OVERALL HUB MAP & KEY-ONLY DOMAIN CLASS MAP + MERMAID SOURCE STUDIO
  // =========================================================================
  function getClassTheme(cls) {
    if (cls.namespace === "共通クラス" || cls.domainId === "common" || cls.sheetKind === "common") {
      return { color: "#0284c7", bg: "#f0f9ff", tag: "共通クラス" };
    }
    const dom = domainById.get(cls.domainId);
    if (dom) {
      return { color: dom.color, bg: dom.bg, tag: `${dom.code} ${dom.shortName}` };
    }
    return { color: "#334155", bg: "#f8fafc", tag: "クラス" };
  }

  const DOMAIN_COLUMN_ORDER = {
    facility: [["Facility"], ["Address", "ContactPoint", "Schedule", "RelatedOrganization", "Building", "Image"]],
    equipment: [
      ["Facility", "Building"],
      ["Equipment", "EquipmentUnit"],
      ["ContactPoint", "RelatedOrganization", "CommonLocation", "MaintenanceHistory"],
    ],
    finance: [
      ["Facility", "Building", "Equipment", "MaintenanceHistory"],
      ["FinancialResult", "AssetCostRecord"],
    ],
    maintenance: [["Facility", "Building", "Equipment", "EquipmentUnit"], ["MaintenanceHistory"], ["AssetCostRecord"]],
    usage: [["Facility"], ["UsageHistory", "FinancialResult", "Building"]],
    disaster: [["Facility"], ["DisasterBase"], ["DisasterStatusHistory"]],
  };

  function describeUmlRelationPlain(rel, leftCls, rightCls) {
    const pName = leftCls?.jpName || rel.left;
    const cName = rightCls?.jpName || rel.right;
    const isSelf = rel.left === rel.right;
    const isComp = rel.kind === "composition";
    const lm = rel.leftMult || "1";
    const rm = rel.rightMult || "0..*";
    const cardStr = isSelf ? (rel.op === "-->" ? `${rm} : ${lm}` : `${lm} : ${rm}`) : `${lm} : ${rm}`;
    const isOptionalParent = !isComp && !isSelf && lm === "0..1";

    let shortRole = String(rel.label || "")
      .replace(/\s*\([A-Za-z0-9_]+\)\s*/g, "")
      .replace(/（候補）|（追加案）/g, "")
      .trim();
    if (shortRole.length > 12) shortRole = shortRole.slice(0, 11) + "…";

    let plainText = "";
    if (isSelf) {
      plainText = `${pName} どうしの親子・併設関係を同一クラス内で参照（${rel.label || "自己参照FK"}）`;
    } else if (isComp) {
      if (rm === "1") {
        plainText = `${pName} 1件 に対し、構成要素の「${cName}」が必ず1件（内包・所有）`;
      } else if (rm === "0..1") {
        plainText = `${pName} 1件 に対し、構成要素の「${cName}」が0件または最大1件`;
      } else {
        plainText = `${pName} 1件 に対し、構成要素の「${cName}」が${rm === "1..*" ? "1件以上" : "0件以上（複数件を所有可）"}`;
      }
    } else if (lm === "0..1") {
      plainText = `${pName} 0〜1件 に対し、「${cName}」が${rm === "0..1" ? "最大1件" : "0件以上"}（任意FKで紐づけ可能）`;
    } else if (rm === "0..1") {
      plainText = `${pName} 1件 に対し、「${cName}」は0件（非該当）または最大1件`;
    } else {
      plainText = `${pName} 1件 に対し、「${cName}」が0件以上（複数件の紐づけ可）`;
    }

    return {
      cardStr,
      badgeMult: isComp ? `◆ ${cardStr}` : cardStr,
      shortRole,
      plainText,
      isComposition: isComp,
      isOptionalParent,
    };
  }

  function wrapKeyTokens(tokens, maxChars = 28, maxLines = 2) {
    if (!tokens.length) return [];
    const lines = [];
    let cur = "";
    for (const tk of tokens) {
      const next = cur ? `${cur}, ${tk}` : tk;
      if (cur && next.length > maxChars && lines.length < maxLines - 1) {
        lines.push(cur + ",");
        cur = tk;
      } else {
        cur = next;
      }
    }
    if (cur) {
      lines.push(cur.length > maxChars + 4 ? cur.slice(0, maxChars + 3) + "…" : cur);
    }
    return lines;
  }

  // Approximate rendered text width (CJK glyphs are wider than ASCII) for pill badge sizing
  function approxTextW(s, cjkW = 10.6, asciiW = 6.3) {
    let w = 0;
    for (const ch of String(s || "")) w += /[\u0000-\u00ff]/.test(ch) ? asciiW : cjkW;
    return w;
  }

  function keyMapPillSize(meta) {
    const multW = Math.round(Math.max(52, approxTextW(meta.badgeMult, 10.6, 6.6) + 16));
    const roleW = meta.shortRole ? Math.round(Math.max(48, approxTextW(meta.shortRole) + 16)) : 0;
    return { multW, roleW, totalW: multW + roleW };
  }

  function computeDomainKeyMapLayout(dgId, variant) {
    const classes = variant.classes || [];
    const rels = variant.relations || [];
    const clsMap = new Map(classes.map((c) => [c.id, c]));
    const boxW = 276;
    const laneGap = 300;

    // Determine columns using deterministic preset per domain + automatic fallback
    const preset = DOMAIN_COLUMN_ORDER[dgId] || [];
    const placed = new Set();
    const cols = preset
      .map((idList) => {
        const arr = idList.filter((id) => clsMap.has(id)).map((id) => clsMap.get(id));
        arr.forEach((c) => placed.add(c.id));
        return arr;
      })
      .filter((arr) => arr.length > 0);

    if (!cols.length) cols.push([]);
    for (const c of classes) {
      if (placed.has(c.id)) continue;
      if (c.namespace === "共通クラス") {
        cols[cols.length - 1].push(c);
      } else {
        cols[0].push(c);
      }
      placed.add(c.id);
    }

    const colOf = new Map();
    const rowOf = new Map();
    cols.forEach((colArr, ci) => {
      colArr.forEach((c, ri) => {
        colOf.set(c.id, ci);
        rowOf.set(c.id, ri);
      });
    });

    // Count left-incoming, right-outgoing, and self-loop edges per class
    const inLeftCount = new Map(classes.map((c) => [c.id, 0]));
    const outRightCount = new Map(classes.map((c) => [c.id, 0]));
    const hasSelfLoop = new Set();
    const directVerticalPair = new Set();

    for (const r of rels) {
      if (!colOf.has(r.left) || !colOf.has(r.right)) continue;
      if (r.left === r.right) {
        hasSelfLoop.add(r.left);
        continue;
      }
      const cL = colOf.get(r.left);
      const cR = colOf.get(r.right);
      if (cL === cR) {
        const rA = Math.min(rowOf.get(r.left), rowOf.get(r.right));
        const rB = Math.max(rowOf.get(r.left), rowOf.get(r.right));
        directVerticalPair.add(`${cL}:${rA}-${rB}`);
      } else if (cL < cR) {
        outRightCount.set(r.left, (outRightCount.get(r.left) || 0) + 1);
        inLeftCount.set(r.right, (inLeftCount.get(r.right) || 0) + 1);
      } else {
        outRightCount.set(r.right, (outRightCount.get(r.right) || 0) + 1);
        inLeftCount.set(r.left, (inLeftCount.get(r.left) || 0) + 1);
      }
    }

    // Compute compact Key-only box specs
    const nodeSpecs = {};
    for (const c of classes) {
      const mappedSheet = c.sheetId ? tableById.get(c.sheetId) : null;
      const totalAttrs = mappedSheet ? mappedSheet.columns.length : c.attributes.length;
      const pkTokens = c.attributes.filter((a) => a.key && a.key.includes("PK")).map((a) => a.en || a.ja);
      const fkTokens = c.attributes
        .filter((a) => a.key && a.key.includes("FK") && !a.key.includes("PK"))
        .map((a) => a.en || a.ja);
      const fkLines = wrapKeyTokens(fkTokens, 28, 2);
      const hasKeys = pkTokens.length > 0 || fkLines.length > 0;
      const baseH = hasKeys ? 86 + Math.max(1, fkLines.length) * 16 : 102;
      const portNeedH =
        inLeftCount.get(c.id) >= 2 || (outRightCount.get(c.id) >= 2 && cols[colOf.get(c.id)].length > 1)
          ? 52 + Math.max(inLeftCount.get(c.id), Math.min(outRightCount.get(c.id), 3)) * 28
          : 0;
      const h = Math.max(baseH, portNeedH);

      const jpTitle = c.jpName || c.label;
      const subCode = mappedSheet ? `${c.id} · ${mappedSheet.id}` : c.id;
      const roleNote = mappedSheet?.roleNote || "親クラスに内包される構成要素";

      nodeSpecs[c.id] = {
        w: boxW,
        h,
        totalAttrs,
        hasKeys,
        pkLine: pkTokens.length ? pkTokens.join(", ") : "—",
        fkLines,
        jpTitle: jpTitle.length > 18 ? jpTitle.slice(0, 17) + "…" : jpTitle,
        subCode: subCode.length > 34 ? subCode.slice(0, 33) + "…" : subCode,
        roleNote: roleNote.length > 22 ? roleNote.slice(0, 21) + "…" : roleNote,
      };
    }

    // Compute column heights so shorter columns center cleanly against the tallest column
    const colMetrics = cols.map((colArr, ci) => {
      let span = 0;
      colArr.forEach((c, ri) => {
        if (ri > 0) {
          const prev = colArr[ri - 1];
          let gap = 22;
          if (directVerticalPair.has(`${ci}:${ri - 1}-${ri}`)) gap = 64;
          else if (hasSelfLoop.has(c.id)) gap = 66;
          else if (prev.namespace !== c.namespace) gap = 42;
          span += gap;
        }
        span += nodeSpecs[c.id].h;
      });
      const topSelfExtra = colArr[0] && hasSelfLoop.has(colArr[0].id) ? 34 : 0;
      return { span, topSelfExtra };
    });

    const maxSpan = Math.max(...colMetrics.map((m) => m.span + m.topSelfExtra));
    const baseTop = 50;
    const pos = {};

    cols.forEach((colArr, ci) => {
      const colX = 44 + ci * (boxW + laneGap);
      const { span, topSelfExtra } = colMetrics[ci];
      let curY = baseTop + topSelfExtra + Math.max(0, Math.round((maxSpan - (span + topSelfExtra)) / 2));
      colArr.forEach((c, ri) => {
        if (ri > 0) {
          const prev = colArr[ri - 1];
          let gap = 22;
          if (directVerticalPair.has(`${ci}:${ri - 1}-${ri}`)) gap = 64;
          else if (hasSelfLoop.has(c.id)) gap = 66;
          else if (prev.namespace !== c.namespace) gap = 42;
          curY += gap;
        }
        const sp = nodeSpecs[c.id];
        pos[c.id] = { ...sp, x: colX, y: curY, cx: colX + sp.w / 2, cy: curY + sp.h / 2 };
        curY += sp.h;
      });
    });

    // Namespace frames (grouped per contiguous namespace block)
    const nsFrames = [];
    const byNs = new Map();
    for (const c of classes) {
      if (c.namespace) {
        if (!byNs.has(c.namespace)) byNs.set(c.namespace, []);
        byNs.get(c.namespace).push(pos[c.id]);
      }
    }
    for (const [nsName, boxes] of byNs.entries()) {
      const minX = Math.min(...boxes.map((b) => b.x)) - 16;
      const minY = Math.min(...boxes.map((b) => b.y)) - 28;
      const maxX = Math.max(...boxes.map((b) => b.x + b.w)) + 16;
      const maxY = Math.max(...boxes.map((b) => b.y + b.h)) + 14;
      nsFrames.push({ name: nsName, x: minX, y: minY, w: maxX - minX, h: maxY - minY });
    }

    // Build inter-column port assignments sorted strictly by opposite endpoint Y
    const outRightList = new Map(classes.map((c) => [c.id, []]));
    const inLeftList = new Map(classes.map((c) => [c.id, []]));
    const laneEdges = new Map();

    rels.forEach((r, idx) => {
      if (!pos[r.left] || !pos[r.right] || r.left === r.right) return;
      const cA = colOf.get(r.left);
      const cB = colOf.get(r.right);
      if (cA === cB) return;
      const srcId = cA < cB ? r.left : r.right;
      const dstId = cA < cB ? r.right : r.left;
      outRightList.get(srcId).push({ rel: r, idx, otherId: dstId });
      inLeftList.get(dstId).push({ rel: r, idx, otherId: srcId });
      const lk = `${Math.min(cA, cB)}->${Math.max(cA, cB)}`;
      if (!laneEdges.has(lk)) laneEdges.set(lk, []);
      laneEdges.get(lk).push({ rel: r, idx, srcId, dstId });
    });

    for (const list of outRightList.values()) {
      list.sort((a, b) => pos[a.otherId].cy - pos[b.otherId].cy || a.idx - b.idx);
    }
    for (const list of inLeftList.values()) {
      list.sort((a, b) => pos[a.otherId].cy - pos[b.otherId].cy || a.idx - b.idx);
    }

    function portY(nodeId, list, relId) {
      const box = pos[nodeId];
      const n = list.length;
      if (n <= 1) return Math.round(box.y + box.h * 0.54);
      const i = Math.max(0, list.findIndex((e) => e.rel.id === relId));
      const topY = box.y + 34;
      const botY = box.y + box.h - 14;
      return Math.round(topY + ((botY - topY) * (i + 0.5)) / n);
    }

    // Compute nested non-crossing trackX and badge coordinates per lane
    const lanePlanByRelId = new Map();
    for (const [, list] of laneEdges.entries()) {
      const uniqSrc = new Set(list.map((e) => e.srcId));
      const uniqDst = new Set(list.map((e) => e.dstId));
      const fanOut = uniqSrc.size <= uniqDst.size;

      const enriched = list.map((e) => {
        const sBox = pos[e.srcId];
        const dBox = pos[e.dstId];
        const x1 = sBox.x + sBox.w;
        const y1 = portY(e.srcId, outRightList.get(e.srcId), e.rel.id);
        const x2 = dBox.x;
        const y2 = portY(e.dstId, inLeftList.get(e.dstId), e.rel.id);
        return { ...e, x1, y1, x2, y2 };
      });

      if (fanOut) {
        const up = enriched.filter((e) => e.y2 < e.y1).sort((a, b) => a.y2 - b.y2 || a.y1 - b.y1);
        const down = enriched.filter((e) => e.y2 >= e.y1).sort((a, b) => b.y2 - a.y2 || b.y1 - a.y1);
        up.forEach((e, i) => {
          e.trackX = e.x1 + 22 + i * 13;
        });
        down.forEach((e, i) => {
          e.trackX = e.x1 + 22 + i * 13;
        });
        const maxTrack = Math.max(...enriched.map((e) => e.trackX), enriched[0].x1 + 48);
        for (const e of enriched) {
          const inSlots = inLeftList.get(e.dstId);
          const slotIdx = inSlots.findIndex((s) => s.rel.id === e.rel.id);
          const stagger = inSlots.length >= 2 ? (slotIdx % 2 === 0 ? -12 : 12) : 0;
          const lx = Math.round((Math.max(maxTrack + 8, e.x1 + 66) + (e.x2 - 10)) / 2) + stagger;
          lanePlanByRelId.set(e.rel.id, { ...e, lx, ly: e.y2, lo: maxTrack + 8, hi: e.x2 - 8 });
        }
      } else {
        const down = enriched.filter((e) => e.y1 <= e.y2).sort((a, b) => a.y1 - b.y1 || a.y2 - b.y2);
        const up = enriched.filter((e) => e.y1 > e.y2).sort((a, b) => b.y1 - a.y1 || b.y2 - a.y2);
        down.forEach((e, i) => {
          e.trackX = e.x2 - 22 - i * 13;
        });
        up.forEach((e, i) => {
          e.trackX = e.x2 - 22 - i * 13;
        });
        const minTrack = Math.min(...enriched.map((e) => e.trackX), enriched[0].x2 - 48);
        for (const e of enriched) {
          const outSlots = outRightList.get(e.srcId);
          const slotIdx = outSlots.findIndex((s) => s.rel.id === e.rel.id);
          const stagger = outSlots.length >= 2 ? (slotIdx % 2 === 0 ? -12 : 12) : 0;
          const lx = Math.round((e.x1 + 10 + Math.min(minTrack - 8, e.x2 - 66)) / 2) + stagger;
          lanePlanByRelId.set(e.rel.id, { ...e, lx, ly: e.y1, lo: e.x1 + 8, hi: minTrack - 8 });
        }
      }
    }

    function orthoRoundedPath(x1, y1, tx, y2, x2) {
      if (Math.abs(y2 - y1) <= 3) return `M ${x1} ${y1} L ${x2} ${y2}`;
      const cr = Math.min(7, Math.floor(Math.abs(y2 - y1) / 2), Math.floor(Math.abs(tx - x1) / 2), Math.floor(Math.abs(x2 - tx) / 2));
      const sy = y2 > y1 ? 1 : -1;
      return `M ${x1} ${y1} H ${tx - cr} Q ${tx} ${y1} ${tx} ${y1 + sy * cr} V ${y2 - sy * cr} Q ${tx} ${y2} ${tx + cr} ${y2} H ${x2}`;
    }

    const edges = rels.map((r) => {
      const leftCls = clsMap.get(r.left);
      const rightCls = clsMap.get(r.right);
      const meta = describeUmlRelationPlain(r, leftCls, rightCls);
      const pill = keyMapPillSize(meta);
      const a = pos[r.left];
      const b = pos[r.right];
      if (!a || !b) return { rel: r, meta, pill, d: "", lx: 0, ly: 0 };

      if (r.left === r.right) {
        // Self-loop drawn above the box center so its badge never reaches the right-hand routing lane
        const cx = Math.round(a.x + a.w / 2);
        const x1 = cx - 38;
        const x2 = cx + 38;
        const y = a.y;
        const d = `M ${x1} ${y} C ${x1 - 8} ${y - 46}, ${x2 + 8} ${y - 46}, ${x2} ${y}`;
        return { rel: r, meta, pill, d, lx: cx, ly: y - 36 };
      }

      const cA = colOf.get(r.left);
      const cB = colOf.get(r.right);
      if (cA === cB) {
        const topBox = a.y < b.y ? a : b;
        const botBox = a.y < b.y ? b : a;
        const cx = Math.round(topBox.x + topBox.w / 2);
        const y1 = topBox.y + topBox.h;
        const y2 = botBox.y;
        return {
          rel: r,
          meta,
          pill,
          d: `M ${cx} ${y1} L ${cx} ${y2}`,
          lx: cx,
          ly: Math.round((y1 + y2) / 2),
        };
      }

      const plan = lanePlanByRelId.get(r.id);
      if (!plan) return { rel: r, meta, pill, d: "", lx: 0, ly: 0 };
      const d = orthoRoundedPath(plan.x1, plan.y1, plan.trackX, plan.y2, plan.x2);
      // Clamp the badge inside the free horizontal stretch so it never covers a class box or a vertical track
      const half = pill.totalW / 2;
      let lx = plan.lx;
      if (plan.hi - plan.lo >= pill.totalW) {
        lx = Math.min(Math.max(lx, plan.lo + half), plan.hi - half);
      } else {
        lx = (plan.lo + plan.hi) / 2;
      }
      return { rel: r, meta, pill, d, lx: Math.round(lx), ly: plan.ly };
    });

    const allBoxes = Object.values(pos);
    const width = Math.max(880, ...allBoxes.map((b) => b.x + b.w + 44), ...nsFrames.map((f) => f.x + f.w + 32));
    const height = Math.max(360, ...allBoxes.map((b) => b.y + b.h + 38), ...nsFrames.map((f) => f.y + f.h + 28));

    return { pos, nsFrames, edges, width, height };
  }

  // Overall Hub ER + Building Layout Helpers (9 primary tables + pd_building in center column)
  const BASE_ER_POS = {
    m_facilities: { x: 406, y: 210, w: 252, h: 136 },
    pd_building: { x: 406, y: 428, w: 252, h: 108 },
    m_facility_equipments: { x: 56, y: 52, w: 246, h: 112 },
    m_facility_equipment_units: { x: 56, y: 212, w: 246, h: 104 },
    t_financial_results: { x: 56, y: 388, w: 246, h: 108 },
    t_asset_cost_records: { x: 56, y: 544, w: 246, h: 108 },
    t_maintenance_histories: { x: 762, y: 52, w: 248, h: 112 },
    t_usage_histories: { x: 762, y: 212, w: 248, h: 108 },
    m_disaster_bases: { x: 762, y: 388, w: 248, h: 108 },
    t_disaster_status_histories: { x: 762, y: 544, w: 248, h: 108 },
  };

  function getOverallHubNodes() {
    const list = [...state.data.tables];
    const bld = tableById.get("pd_building");
    if (bld) list.push(bld);
    return list;
  }

  function getErLayout() {
    const pos = { ...BASE_ER_POS };
    let extraIdx = 0;
    for (const t of getOverallHubNodes()) {
      if (!pos[t.id]) {
        const col = extraIdx % 3;
        const row = Math.floor(extraIdx / 3);
        pos[t.id] = { x: 60 + col * 330, y: 690 + row * 135, w: 248, h: 108 };
        extraIdx++;
      }
    }
    const maxBottom = Math.max(680, ...Object.values(pos).map((p) => p.y + p.h + 28));
    return { pos, height: maxBottom };
  }

  function buildEdgeGeometry(rel, erPos) {
    const parent = erPos[rel.toTable];
    const child = erPos[rel.fromTable];
    if (!parent || !child) return { d: "", lx: 0, ly: 0 };

    if (rel.id === "REL_FAC_SELF") {
      const cx = parent.x + parent.w / 2;
      const top = parent.y;
      return {
        d: `M ${cx - 42} ${top} C ${cx - 64} ${top - 58}, ${cx + 64} ${top - 58}, ${cx + 42} ${top}`,
        lx: cx,
        ly: top - 46,
      };
    }
    if (rel.id === "REL_FAC_BLD") {
      const x = parent.x + parent.w / 2;
      const y1 = parent.y + parent.h;
      const y2 = child.y;
      return {
        d: `M ${x} ${y1} L ${x} ${y2}`,
        lx: x,
        ly: Math.round((y1 + y2) / 2),
      };
    }
    if (rel.id === "REL_EQP_EQU" || rel.id === "REL_DIS_DST") {
      const x = parent.x + parent.w / 2;
      const y1 = parent.y + parent.h;
      const y2 = child.y;
      return {
        d: `M ${x} ${y1} L ${x} ${y2}`,
        lx: x + 48,
        ly: Math.round((y1 + y2) / 2),
      };
    }
    if (rel.kind === "extended") {
      if (rel.id === "EXT_EQP_MNT") {
        const x1 = parent.x + parent.w / 2;
        const y1 = parent.y;
        const x2 = child.x + child.w / 2;
        const y2 = child.y;
        return { d: `M ${x1} ${y1} C ${x1} 10, ${x2} 10, ${x2} ${y2}`, lx: 532, ly: 20 };
      }
      if (rel.id === "EXT_EQU_MNT") {
        const x1 = parent.x + parent.w;
        const y1 = parent.y + 24;
        const x2 = child.x;
        const y2 = child.y + 26;
        return { d: `M ${x1} ${y1} C 390 104, 670 104, ${x2} ${y2}`, lx: 532, ly: 118 };
      }
      if (rel.id === "EXT_BLD_EQP") {
        const x1 = parent.x;
        const y1 = parent.y + 28;
        const x2 = child.x + child.w;
        const y2 = child.y + 88;
        return { d: `M ${x1} ${y1} C 344 ${y1}, 350 ${y2}, ${x2} ${y2}`, lx: 354, ly: 268 };
      }
      if (rel.id === "EXT_BLD_MNT") {
        const x1 = parent.x + parent.w;
        const y1 = parent.y + 28;
        const x2 = child.x;
        const y2 = child.y + 92;
        return { d: `M ${x1} ${y1} C 718 ${y1}, 712 ${y2}, ${x2} ${y2}`, lx: 710, ly: 324 };
      }
      if (rel.id === "EXT_BLD_ACR") {
        const x1 = parent.x;
        const y1 = parent.y + 78;
        const x2 = child.x + child.w;
        const y2 = child.y + 28;
        return { d: `M ${x1} ${y1} C 356 ${y1}, 346 ${y2}, ${x2} ${y2}`, lx: 354, ly: 544 };
      }
      if (rel.id === "EXT_MNT_ACR") {
        const x1 = parent.x;
        const y1 = parent.y + 102;
        const x2 = child.x + child.w;
        const y2 = child.y + 82;
        return {
          d: `M ${x1} ${y1} C 742 ${y1}, 744 596, 660 596 L 404 596 C 344 596, 336 ${y2}, ${x2} ${y2}`,
          lx: 532,
          ly: 596,
        };
      }
      if (rel.id === "EXT_EQP_ACR") {
        const x1 = parent.x;
        const y1 = parent.y + parent.h / 2;
        const x2 = child.x;
        const y2 = child.y + child.h / 2;
        return { d: `M ${x1} ${y1} C 10 ${y1}, 10 ${y2}, ${x2} ${y2}`, lx: 34, ly: 352 };
      }
    }

    const isLeft = child.x < parent.x;
    const x1 = isLeft ? parent.x : parent.x + parent.w;
    const x2 = isLeft ? child.x + child.w : child.x;
    const y2 = child.y + child.h / 2;

    let yOffset = 0;
    if (rel.id === "REL_FAC_EQP" || rel.id === "REL_FAC_MNT") yOffset = -34;
    if (rel.id === "REL_FAC_USG") yOffset = -4;
    if (rel.id === "REL_FAC_FIN" || rel.id === "REL_FAC_DIS") yOffset = 20;
    if (rel.id === "REL_FAC_ACR") yOffset = 46;
    const y1 = parent.y + parent.h / 2 + yOffset;

    const cpx1 = x1 + (isLeft ? -52 : 52);
    const cpx2 = x2 + (isLeft ? 52 : -52);
    return {
      d: `M ${x1} ${y1} C ${cpx1} ${y1}, ${cpx2} ${y2}, ${x2} ${y2}`,
      lx: Math.round((x1 + x2) / 2),
      ly: Math.round((y1 + y2) / 2 - 4),
    };
  }

  function renderMultiplicityGuideHtml(includeComposition = true) {
    return `
      <div class="mult-guide-box" aria-label="多重度と関係記号の読み方ガイド">
        <div class="mult-guide-title">
          <span>図中の数字（多重度：1 / 0..1 / 0..*）の読み方ガイド</span>
          <small style="font-weight:500;color:var(--text-muted)">「親データ1件に対して、子データ・共通クラスが何件紐づくか」を表します</small>
        </div>
        <div class="mult-guide-grid">
          <div class="mult-guide-item">
            <span class="mult-symbol">1</span><strong>必ず1件</strong><br>
            欠けることなく必ず1つ存在します。<br>
            <span style="color:var(--text-muted)">例：施設の「住所」や、各履歴の設置先「施設」は必ず1件です。</span>
          </div>
          <div class="mult-guide-item">
            <span class="mult-symbol">0..1</span><strong>0件 または 1件</strong><br>
            無い場合（0件）もあれば、最大1件だけ持つ場合もあります。<br>
            <span style="color:var(--text-muted)">例：避難所に指定された施設だけ「防災拠点マスタ」を1件持ちます（1 : 0..1）。</span>
          </div>
          <div class="mult-guide-item">
            <span class="mult-symbol">0..*</span><strong>0件以上（複数件OK）</strong><br>
            「*」は上限なしの意味です。0件でも、何十件でも登録できます。<br>
            <span style="color:var(--text-muted)">例：1つの施設に複数の「建物」「設備」や毎年の「収支履歴」が紐づきます（1 : 0..*）。</span>
          </div>
          <div class="mult-guide-item">
            <span class="mult-symbol">${includeComposition ? "PK / FK / ◆" : "PK / FK"}</span><strong>キーと所有記号</strong><br>
            <strong>PK</strong>は主キー、<strong>FK</strong>は親を指す外部キー${
              includeComposition ? "、<strong>◆</strong>は親の一部として所有される構成クラス（コンポジション）" : ""
            }です。
          </div>
        </div>
      </div>
    `;
  }

  function renderRelations(container) {
    const isMermaid = state.relMode === "mermaid";
    const diagrams = state.data.classDiagrams || [];
    const dg = diagramById.get(state.umlDiagramId) || diagrams[0];

    const modeTabsHtml = `
      <div class="seg-tabs" role="tablist" aria-label="関連図表示モード切替">
        <button type="button" class="seg-btn ${!isMermaid ? "active" : ""}" data-rel-mode="map">◈ 関連図マップ（Keyのみ）</button>
        <button type="button" class="seg-btn ${isMermaid ? "active" : ""}" data-rel-mode="mermaid">&lt;&gt; Mermaidソース出力</button>
      </div>
    `;

    const diagramSelectorHtml = `
      <div class="diagram-top-bar">
        <div class="pill-filters" role="group" aria-label="全体・領域別マップ切替">
          ${diagrams
            .map((g) => {
              const dom = domainById.get(g.domainId);
              const dotHtml = dom
                ? `<span class="domain-dot" style="background:${esc(dom.color)}"></span>`
                : `<span class="domain-dot" style="background:#0f172a"></span>`;
              const label = g.id === "overall" ? "全体関連図（全領域）" : g.shortName;
              return `<button type="button" class="filter-pill ${g.id === dg?.id ? "active" : ""}" data-uml-dg="${esc(g.id)}">
                ${dotHtml}${esc(label)}
              </button>`;
            })
            .join("")}
        </div>
        ${modeTabsHtml}
      </div>
    `;

    if (!dg) {
      renderOverallHubMap(container, diagramSelectorHtml);
      return;
    }

    if (isMermaid) {
      const vIdx = Math.min(state.umlVariantIdx, dg.variants.length - 1);
      const variant = dg.variants[vIdx];
      const mmdText = state.mermaidShowRawCodes ? variant.rawMermaid : variant.cleanMermaid;

      container.innerHTML = `
        ${pageHeadHtml(
          "relations",
          "ENTITY RELATIONSHIP & CLASS ARCHITECTURE",
          "全体関連図・クラス図",
          "Key項目に絞った見やすい関連図マップ（全体／01〜06領域別）と、全属性・コード定義を含むMermaidクラス図ソースを切り替えて確認できます。"
        )}
        ${diagramSelectorHtml}
        <div class="uml-subbar">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            ${
              dg.variants.length > 1
                ? `<div class="seg-tabs">
                    ${dg.variants
                      .map(
                        (v, idx) =>
                          `<button type="button" class="seg-btn ${idx === vIdx ? "active" : ""}" data-uml-var="${idx}">${esc(v.shortLabel)}</button>`
                      )
                      .join("")}
                  </div>`
                : `<span class="badge req">${esc(variant.shortLabel)}</span>`
            }
            <span class="mono" style="font-size:11.5px;color:var(--text-muted)">原典: ${esc(dg.sourceFile)}</span>
            ${
              variant.droppedCodeClassCount > 0
                ? `<label class="toggle-label" style="padding:4px 10px">
                    <input type="checkbox" id="toggle-raw-mmd" ${state.mermaidShowRawCodes ? "checked" : ""}>
                    <span>除外されたコード定義クラス（${variant.droppedCodeClassCount}個）も含める</span>
                  </label>`
                : ""
            }
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn sm" id="btn-dl-mmd">⇩ .mmd ファイル保存</button>
            <button type="button" class="btn sm primary" id="btn-copy-mmd">⧉ Mermaidソースをコピー</button>
          </div>
        </div>
        <div class="card" style="padding:14px">
          <pre class="mermaid-code-panel">${esc(mmdText)}</pre>
        </div>
      `;

      bindDiagramCommonToolbar(container, dg);
      $("#toggle-raw-mmd", container)?.addEventListener("change", (e) => {
        state.mermaidShowRawCodes = e.target.checked;
        renderRelations(container);
      });
      $("#btn-copy-mmd", container)?.addEventListener("click", () =>
        copyText(mmdText, "Mermaidクラス図ソースをコピーしました")
      );
      $("#btn-dl-mmd", container)?.addEventListener("click", () =>
        downloadFile(`${dg.id}_v${vIdx + 1}.mmd`, mmdText, "text/plain;charset=utf-8")
      );
      return;
    }

    if (dg.id === "overall") {
      renderOverallHubMap(container, diagramSelectorHtml);
    } else {
      renderDomainKeyMapMode(container, dg, diagramSelectorHtml);
    }
  }

  function renderDomainKeyMapMode(container, dg, diagramSelectorHtml) {
    const variant = getDomainMapVariant(dg);
    if (
      state.umlSelectedType === "class" &&
      !variant.classes.some((c) => c.id === state.umlSelectedId) &&
      variant.classes[0]
    ) {
      state.umlSelectedId = variant.classes[0].id;
    }

    const layout = computeDomainKeyMapLayout(dg.id, variant);
    const connectedClassIds = new Set();
    const connectedRelIds = new Set();

    if (state.umlSelectedType === "class" && state.umlSelectedId) {
      connectedClassIds.add(state.umlSelectedId);
      variant.relations.forEach((r) => {
        if (r.left === state.umlSelectedId || r.right === state.umlSelectedId) {
          connectedRelIds.add(r.id);
          connectedClassIds.add(r.left);
          connectedClassIds.add(r.right);
        }
      });
    } else if (state.umlSelectedType === "rel" && state.umlSelectedId) {
      const sr = variant.relations.find((r) => r.id === state.umlSelectedId);
      if (sr) {
        connectedRelIds.add(sr.id);
        connectedClassIds.add(sr.left);
        connectedClassIds.add(sr.right);
      }
    }

    // Auxiliary CSV-only common classes for 01 施設基本 (not drawn as boxes in 01_施設基本_クラス図.md)
    const diagramSheetIds = new Set(variant.classes.map((c) => c.sheetId).filter(Boolean));
    const auxCommonClasses =
      dg.id === "facility"
        ? (state.data.commonClasses || []).filter(
            (c) =>
              !diagramSheetIds.has(c.id) &&
              (c.referencedBy || []).some((ref) => ref.tableId === "m_facilities" || ref.tableId === "pd_building")
          )
        : [];

    container.innerHTML = `
      ${pageHeadHtml(
        "relations",
        "ENTITY RELATIONSHIP & CLASS ARCHITECTURE",
        "全体関連図・クラス図",
        "Key項目に絞った見やすい関連図マップ（全体／01〜06領域別）と、全属性・コード定義を含むMermaidクラス図ソースを切り替えて確認できます。"
      )}
      ${diagramSelectorHtml}

      <div class="uml-subbar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span class="badge req">${esc(dg.name)}（Key・関連構成マップ）</span>
          <span style="font-size:12px;color:var(--text-muted)">
            一般プロパティを省略し、主キー・外部キーと共通クラスの構成関係（多重度）のみを直交配線で表示しています
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="mono" style="font-size:11.5px;color:var(--text-muted)">${esc(dg.sourceFile)}</span>
          <button type="button" class="btn sm" id="btn-jump-mmd-src">&lt;&gt; 全属性付きMermaidソースを見る</button>
        </div>
      </div>

      <div class="er-workspace">
        <div class="er-canvas-card">
          <svg class="uml-key-svg" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="${esc(dg.name)}">
            <defs>
              <marker id="km-arrow-std" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#475569"></path>
              </marker>
              <marker id="km-arrow-comp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#0f172a"></path>
              </marker>
              <marker id="km-arrow-opt" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#7c3aed"></path>
              </marker>
              <marker id="km-arrow-sel" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#1d4ed8"></path>
              </marker>
              <marker id="km-comp-start" markerWidth="13" markerHeight="10" refX="1" refY="5" orient="auto">
                <polygon points="1,5 6.5,1.2 12,5 6.5,8.8" fill="#0f172a" stroke="#0f172a" stroke-width="1"></polygon>
              </marker>
              <marker id="km-comp-start-sel" markerWidth="13" markerHeight="10" refX="1" refY="5" orient="auto">
                <polygon points="1,5 6.5,1.2 12,5 6.5,8.8" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="1"></polygon>
              </marker>
            </defs>

            ${layout.nsFrames
              .map(
                (f) => `
              <g>
                <rect class="uml-ns-rect" x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" rx="12"></rect>
                <text x="${f.x + 14}" y="${f.y + 19}" fill="#0369a1" font-size="12" font-weight="800">共通クラス群（${esc(f.name)}）</text>
              </g>`
              )
              .join("")}

            ${layout.edges
              .map(({ rel, meta, pill, d, lx, ly }) => {
                const isSel = connectedRelIds.has(rel.id);
                const dimmed = connectedClassIds.size > 0 && !isSel;
                const mStart = meta.isComposition ? (isSel ? "url(#km-comp-start-sel)" : "url(#km-comp-start)") : "";
                const mEnd = isSel
                  ? "url(#km-arrow-sel)"
                  : meta.isComposition
                  ? "url(#km-arrow-comp)"
                  : meta.isOptionalParent
                  ? "url(#km-arrow-opt)"
                  : "url(#km-arrow-std)";

                const { multW, roleW, totalW } = pill || keyMapPillSize(meta);
                const x0 = Math.round(lx - totalW / 2);
                const strokeCol = isSel ? "#2563eb" : meta.isOptionalParent ? "#c4b5fd" : "#cbd5e1";
                const multBg = isSel ? "#dbeafe" : meta.isComposition ? "#e0f2fe" : meta.isOptionalParent ? "#f3e8ff" : "#f1f5f9";
                const multFg = isSel ? "#1d4ed8" : meta.isComposition ? "#0369a1" : meta.isOptionalParent ? "#6d28d9" : "#0f172a";

                return `
                  <g class="uml-edge-group ${isSel ? "selected" : ""} ${dimmed ? "dimmed" : ""}" data-uml-rel="${esc(rel.id)}">
                    <title>${esc(meta.cardStr)} ｜ ${esc(meta.plainText)}</title>
                    <path class="uml-edge-hit" d="${d}"></path>
                    <path class="er-edge ${meta.isOptionalParent ? "extended" : ""}" d="${d}"
                      ${mStart ? `marker-start="${mStart}"` : ""} marker-end="${mEnd}"
                      ${meta.isComposition && !isSel ? 'style="stroke:#0f172a;stroke-width:2.3"' : ""}></path>
                    <rect x="${x0}" y="${ly - 10}" width="${totalW}" height="20" rx="10" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.2"></rect>
                    <rect x="${x0 + 1}" y="${ly - 9}" width="${multW - (roleW ? 1 : 2)}" height="18" rx="9" fill="${multBg}"></rect>
                    <text x="${Math.round(x0 + multW / 2)}" y="${ly + 3.5}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${multFg}">${esc(
                      meta.badgeMult
                    )}</text>
                    ${
                      roleW
                        ? `<text x="${Math.round(x0 + multW + roleW / 2 - 2)}" y="${ly + 3.5}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${esc(
                            meta.shortRole
                          )}</text>`
                        : ""
                    }
                  </g>
                `;
              })
              .join("")}

            ${variant.classes
              .map((cls) => {
                const box = layout.pos[cls.id];
                const theme = getClassTheme(cls);
                const isSel = state.umlSelectedType === "class" && state.umlSelectedId === cls.id;
                const dimmed = connectedClassIds.size > 0 && !connectedClassIds.has(cls.id);

                return `
                  <g class="er-node-group ${isSel ? "selected" : ""} ${dimmed ? "dimmed" : ""}" data-uml-cls="${esc(cls.id)}" transform="translate(${box.x}, ${box.y})">
                    <rect class="er-node-box" x="0" y="0" width="${box.w}" height="${box.h}" rx="12"></rect>
                    <path d="M 1 12 Q 1 1 12 1 L ${box.w - 12} 1 Q ${box.w - 1} 1 ${box.w - 1} 12 L ${box.w - 1} 27 L 1 27 Z" fill="${esc(theme.color)}"></path>
                    <text x="12" y="18.5" fill="#ffffff" font-size="11" font-weight="700">${esc(theme.tag)}</text>
                    <text x="${box.w - 10}" y="18.5" text-anchor="end" fill="#ffffff" font-size="10.5" font-weight="700">全${box.totalAttrs}項目</text>

                    <text x="12" y="47" fill="#0f172a" font-size="13.5" font-weight="800">${esc(box.jpTitle)}</text>
                    <text x="12" y="63" fill="#64748b" font-size="11" font-family="Consolas, monospace">${esc(box.subCode)}</text>

                    ${
                      box.hasKeys
                        ? `<text x="12" y="82" fill="#1e293b" font-size="11" font-weight="700">PK: ${esc(box.pkLine)}</text>
                           ${
                             box.fkLines.length
                               ? box.fkLines
                                   .map(
                                     (fl, idx) =>
                                       `<text x="12" y="${98 + idx * 15}" fill="#5b21b6" font-size="11" font-weight="600">${
                                         idx === 0 ? `FK: ${esc(fl)}` : `    ${esc(fl)}`
                                       }</text>`
                                   )
                                   .join("")
                               : `<text x="12" y="98" fill="#64748b" font-size="11" font-weight="600">FK: —（親クラス）</text>`
                           }`
                        : `<text x="12" y="82" fill="#0369a1" font-size="11" font-weight="700">Keyなし（親に内包される構成型）</text>
                           <text x="12" y="97" fill="#64748b" font-size="10.5">${esc(box.roleNote)}</text>`
                    }
                  </g>
                `;
              })
              .join("")}
          </svg>

          ${
            auxCommonClasses.length
              ? `<div class="common-strip-bar">
                  <span><strong>CSV項目から参照される補助共通型（クリックで定義ポップアップ）：</strong></span>
                  <div class="common-strip-chips">
                    ${auxCommonClasses
                      .map(
                        (c) =>
                          `<button type="button" class="badge rel-class-link" data-aux-cls="${esc(c.id)}">◇ ${esc(
                            c.name
                          )}（${c.columns.length}項目）</button>`
                      )
                      .join("")}
                  </div>
                </div>`
              : ""
          }

          <div class="er-legend">
            <span class="legend-item"><span class="legend-diamond">◆</span><span class="legend-line" style="border-top-color:#0f172a"></span> コンポジション（親クラスの一部として構成要素・共通クラスを所有）</span>
            <span class="legend-item"><span class="legend-line"></span> 必須PK→FK参照（実線：親1件から子への紐づけ）</span>
            <span class="legend-item"><span class="legend-line dashed"></span> 任意FK参照（破線：0..1 の任意紐づけ）</span>
          </div>

          ${renderMultiplicityGuideHtml(true)}
        </div>

        <aside class="card er-inspector" id="uml-inspector-panel">
          ${renderUmlInspector(dg, variant)}
        </aside>
      </div>

      <div class="section-heading" style="margin-top:28px">
        <div>
          <h2>${esc(dg.shortName)} クラス間リレーション定義一覧（全${variant.relations.length}件）</h2>
          <small>行をクリックすると上の関連図で該当する線がハイライトされます</small>
        </div>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>種別</th>
              <th>親・所有元クラス</th>
              <th>多重度と意味</th>
              <th>子・構成クラス</th>
              <th>役割・参照キー</th>
            </tr>
          </thead>
          <tbody>
            ${variant.relations
              .map((r) => {
                const lCls = variant.classes.find((c) => c.id === r.left);
                const rCls = variant.classes.find((c) => c.id === r.right);
                const meta = describeUmlRelationPlain(r, lCls, rCls);
                return `
                  <tr class="clickable-row" data-uml-matrix-rel="${esc(r.id)}">
                    <td>${
                      meta.isComposition
                        ? `<span class="badge pk">◆ 構成所有</span>`
                        : meta.isOptionalParent
                        ? `<span class="badge fk">任意FK</span>`
                        : `<span class="badge req">必須FK</span>`
                    }</td>
                    <td>
                      <strong>${esc(lCls?.jpName || r.left)}</strong><br>
                      <span class="mono" style="font-size:11.5px;color:var(--text-muted)">${esc(r.left)}</span>
                    </td>
                    <td>
                      <span class="mult-symbol">${esc(meta.cardStr)}</span>
                      <div style="font-size:11.5px;color:var(--text-body);margin-top:4px">${esc(meta.plainText)}</div>
                    </td>
                    <td>
                      <strong>${esc(rCls?.jpName || r.right)}</strong><br>
                      <span class="mono" style="font-size:11.5px;color:#0369a1">${esc(r.right)}</span>
                    </td>
                    <td>
                      <strong>${esc(r.label || "関連")}</strong><br>
                      <span class="mono" style="color:var(--text-muted);font-size:11.5px">${esc(r.raw)}</span>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    bindDiagramCommonToolbar(container, dg);

    $("#btn-jump-mmd-src", container)?.addEventListener("click", () => {
      state.relMode = "mermaid";
      state.umlVariantIdx = Math.max(0, dg.variants.length - 1);
      updateChrome();
      renderRelations(container);
    });

    $$("[data-aux-cls]", container).forEach((btn) =>
      btn.addEventListener("click", () => openClassModal(btn.dataset.auxCls))
    );

    $$("[data-uml-cls]", container).forEach((node) => {
      node.addEventListener("click", () => {
        state.umlSelectedType = "class";
        state.umlSelectedId = node.dataset.umlCls;
        renderRelations(container);
      });
    });

    $$("[data-uml-rel]", container).forEach((edge) => {
      edge.addEventListener("click", () => {
        state.umlSelectedType = "rel";
        state.umlSelectedId = edge.dataset.umlRel;
        renderRelations(container);
      });
    });

    $$("[data-uml-matrix-rel]", container).forEach((row) => {
      row.addEventListener("click", () => {
        state.umlSelectedType = "rel";
        state.umlSelectedId = row.dataset.umlMatrixRel;
        renderRelations(container);
        $(".er-workspace", container)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    bindUmlInspectorEvents(container, variant);
  }

  function bindDiagramCommonToolbar(container, dg) {
    $$("[data-rel-mode]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.relMode = btn.dataset.relMode;
        updateChrome();
        renderRelations(container);
      });
    });

    $$("[data-uml-dg]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.umlDiagramId = btn.dataset.umlDg;
        const nextDg = diagramById.get(state.umlDiagramId);
        state.umlVariantIdx = Math.max(0, (nextDg?.variants?.length || 1) - 1);
        if (state.umlDiagramId === "overall") {
          state.erDomainFilter = "all";
          state.erSelectedType = "table";
          state.erSelectedId = "m_facilities";
        } else {
          const mapVar = getDomainMapVariant(nextDg);
          if (mapVar?.classes[0]) {
            state.umlSelectedType = "class";
            state.umlSelectedId = mapVar.classes[0].id;
          }
        }
        updateChrome();
        renderRelations(container);
      });
    });

    $$("[data-uml-var]", container).forEach((btn) => {
      btn.addEventListener("click", () => {
        state.umlVariantIdx = Number(btn.dataset.umlVar) || 0;
        renderRelations(container);
      });
    });
  }

  function renderUmlInspector(dg, variant) {
    if (state.umlSelectedType === "rel") {
      const rel = variant.relations.find((r) => r.id === state.umlSelectedId);
      if (!rel) return "";
      const leftCls = variant.classes.find((c) => c.id === rel.left);
      const rightCls = variant.classes.find((c) => c.id === rel.right);
      const meta = describeUmlRelationPlain(rel, leftCls, rightCls);
      return `
        <span class="badge ${meta.isComposition ? "pk" : meta.isOptionalParent ? "fk" : "req"}">${
          meta.isComposition ? "◆ コンポジション（構成・所有）" : meta.isOptionalParent ? "任意FK参照" : "必須PK/FK参照"
        }</span>
        <h3 style="margin:10px 0 6px;font-size:17px">${esc(rel.label || `${rel.left} → ${rel.right}`)}</h3>
        <div class="callout" style="margin-bottom:12px">
          <strong>多重度：<span class="mono">${esc(meta.cardStr)}</span></strong><br>
          ${esc(meta.plainText)}
        </div>
        <div class="spec-grid">
          <div class="spec-box">
            <span>親・所有元 (${esc(rel.leftMult || "1")})</span>
            <strong>${esc(leftCls?.jpName || rel.left)}</strong>
            <small class="mono">${esc(rel.left)}</small>
          </div>
          <div class="spec-box">
            <span>子・構成先 (${esc(rel.rightMult || "0..*")})</span>
            <strong>${esc(rightCls?.jpName || rel.right)}</strong>
            <small class="mono">${esc(rel.right)}</small>
          </div>
        </div>
        <div style="font-size:11.5px;color:var(--text-muted);margin-bottom:10px">
          Mermaid定義：<code class="mono">${esc(rel.raw)}</code>
        </div>
        <div style="display:grid;gap:8px;margin-top:10px">
          ${leftCls ? `<button type="button" class="btn sm" data-focus-uml-cls="${esc(leftCls.id)}">${esc(leftCls.jpName)} を選択</button>` : ""}
          ${rightCls && rightCls.id !== leftCls?.id ? `<button type="button" class="btn sm primary" data-focus-uml-cls="${esc(rightCls.id)}">${esc(rightCls.jpName)} を選択</button>` : ""}
        </div>
      `;
    }

    const cls = variant.classes.find((c) => c.id === state.umlSelectedId) || variant.classes[0];
    if (!cls) return "";
    const theme = getClassTheme(cls);
    const mappedSheet = cls.sheetId ? tableById.get(cls.sheetId) : null;
    const parentRels = variant.relations.filter((r) => r.right === cls.id && r.left !== cls.id);
    const childRels = variant.relations.filter((r) => r.left === cls.id);
    const previewCols = mappedSheet
      ? [
          ...mappedSheet.columns.filter((c) => c.key),
          ...mappedSheet.columns.filter((c) => !c.key).slice(0, 5),
        ].slice(0, 6)
      : [];

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <span class="domain-code-badge" style="background:${esc(theme.bg)};color:${esc(theme.color)};border:1px solid ${esc(theme.color)}40">
          ${esc(theme.tag)}
        </span>
        <span class="badge ${mappedSheet?.isCommonClass ? "opt" : "req"}">${
          mappedSheet ? (mappedSheet.isCommonClass ? "共通クラス定義あり" : "基本データセット表") : "クラス図要素"
        }</span>
      </div>
      <h3 style="margin:10px 0 2px;font-size:18px">${esc(cls.label)}</h3>
      <div class="mono" style="font-size:11.5px;color:var(--text-muted);margin-bottom:10px">
        ${mappedSheet ? `対応シート: ${esc(mappedSheet.id)}（CSV全 ${mappedSheet.columns.length} 項目）` : `クラス識別子: ${esc(cls.id)}`}
      </div>
      ${mappedSheet?.description ? `<p style="margin:0 0 12px;font-size:12.5px;color:var(--text-body);line-height:1.65">${escBr(mappedSheet.description)}</p>` : ""}
      ${
        mappedSheet?.rowUnit
          ? `<div class="callout" style="margin-bottom:12px"><strong>1行の単位：</strong>${esc(mappedSheet.rowUnit)}</div>`
          : ""
      }

      ${
        mappedSheet
          ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
              <button type="button" class="btn primary sm" data-uml-open-sheet="${esc(mappedSheet.id)}">
                ▤ 項目定義（${mappedSheet.columns.length}件）
              </button>
              ${
                mappedSheet.isCommonClass
                  ? `<button type="button" class="btn sm" data-uml-popup-cls="${esc(mappedSheet.id)}">◇ ポップアップ表示</button>`
                  : `<button type="button" class="btn sm" data-uml-go-builder="${esc(mappedSheet.id)}">⇩ CSVテンプレ作成</button>`
              }
            </div>`
          : ""
      }

      <strong style="font-size:12px;color:var(--navy-800)">親・所有元クラスへの参照（${parentRels.length}件）</strong>
      <div class="inspector-rel-list">
        ${
          parentRels.length
            ? parentRels
                .map((r) => {
                  const pCls = variant.classes.find((c) => c.id === r.left);
                  const meta = describeUmlRelationPlain(r, pCls, cls);
                  return `<button type="button" class="inspector-rel-item" data-focus-uml-cls="${esc(r.left)}">
                    <strong>→ ${esc(pCls?.jpName || r.left)}</strong>
                    <span class="mult-symbol" style="margin-left:4px">${esc(meta.cardStr)}</span><br>
                    <span style="color:var(--text-body)">${esc(meta.plainText)}</span>
                  </button>`;
                })
                .join("")
            : `<div style="font-size:12px;color:var(--text-muted);padding:4px 2px">上位親クラスなし（この図の起点クラス）</div>`
        }
      </div>

      <strong style="font-size:12px;color:var(--navy-800)">構成要素・子クラス（${childRels.length}件）</strong>
      <div class="inspector-rel-list">
        ${
          childRels.length
            ? childRels
                .map((r) => {
                  const cCls = variant.classes.find((c) => c.id === r.right);
                  const meta = describeUmlRelationPlain(r, cls, cCls);
                  return `<button type="button" class="inspector-rel-item" data-focus-uml-cls="${esc(r.right)}">
                    <strong>${meta.isComposition ? "◆" : "←"} ${esc(cCls?.jpName || r.right)}</strong>
                    <span class="mult-symbol" style="margin-left:4px">${esc(meta.cardStr)}</span><br>
                    <span style="color:var(--text-body)">${esc(meta.plainText)}</span>
                  </button>`;
                })
                .join("")
            : `<div style="font-size:12px;color:var(--text-muted);padding:4px 2px">下位の構成要素・子クラスなし</div>`
        }
      </div>

      ${
        previewCols.length
          ? `<strong style="font-size:12px;color:var(--navy-800)">Key・主要項目プレビュー（クリックで詳細ドロワー）</strong>
             <div class="inspector-rel-list">
               ${previewCols
                 .map(
                   (c) => `
                 <button type="button" class="inspector-rel-item" data-uml-open-prop="${esc(c.id)}">
                   <div style="display:flex;justify-content:space-between;gap:6px">
                     <strong>${esc(c.ja)}</strong>
                     <span>${c.key ? `<span class="badge ${c.key === "PK" ? "pk" : "fk"}">${esc(c.key)}</span> ` : ""}${renderReqBadge(c.required)}</span>
                   </div>
                   <span class="mono" style="font-size:11px;color:var(--text-muted)">${esc(c.en)} · ${esc(c.dataType)}</span>
                 </button>`
                 )
                 .join("")}
             </div>`
          : ""
      }
    `;
  }

  function bindUmlInspectorEvents(container, variant) {
    const panel = $("#uml-inspector-panel", container);
    if (!panel) return;
    $$("[data-focus-uml-cls]", panel).forEach((b) =>
      b.addEventListener("click", () => {
        const cid = b.dataset.focusUmlCls;
        if (variant.classes.some((c) => c.id === cid)) {
          state.umlSelectedType = "class";
          state.umlSelectedId = cid;
          renderRelations(container);
        }
      })
    );
    $$("[data-uml-open-sheet]", panel).forEach((b) =>
      b.addEventListener("click", () => navigate("explorer", { tableId: b.dataset.umlOpenSheet }))
    );
    $$("[data-uml-popup-cls]", panel).forEach((b) =>
      b.addEventListener("click", () => openClassModal(b.dataset.umlPopupCls))
    );
    $$("[data-uml-go-builder]", panel).forEach((b) =>
      b.addEventListener("click", () => navigate("builder", { builderTableId: b.dataset.umlGoBuilder }))
    );
    $$("[data-uml-open-prop]", panel).forEach((b) =>
      b.addEventListener("click", () => openDrawer(b.dataset.umlOpenProp))
    );
  }

  function renderOverallHubMap(container, diagramSelectorHtml) {
    const { pos: erPos, height: svgHeight } = getErLayout();
    const hubNodes = getOverallHubNodes();
    const visibleRels = state.data.relations.filter((r) => r.kind === "standard" || state.erShowExtended);

    const activeTables = new Set();
    if (state.erDomainFilter === "all") {
      hubNodes.forEach((t) => activeTables.add(t.id));
    } else {
      activeTables.add("m_facilities");
      if (state.erDomainFilter === "facility") activeTables.add("pd_building");
      const dom = domainById.get(state.erDomainFilter);
      dom?.tables.forEach((tid) => activeTables.add(tid));
    }

    const connectedEdges = new Set();
    const connectedNodes = new Set();
    if (state.erSelectedType === "table") {
      connectedNodes.add(state.erSelectedId);
      visibleRels.forEach((r) => {
        if (r.fromTable === state.erSelectedId || r.toTable === state.erSelectedId) {
          connectedEdges.add(r.id);
          connectedNodes.add(r.fromTable);
          connectedNodes.add(r.toTable);
        }
      });
    } else if (state.erSelectedType === "rel") {
      const selRel = visibleRels.find((r) => r.id === state.erSelectedId);
      if (selRel) {
        connectedEdges.add(selRel.id);
        connectedNodes.add(selRel.fromTable);
        connectedNodes.add(selRel.toTable);
      }
    }

    container.innerHTML = `
      ${pageHeadHtml(
        "relations",
        "ENTITY RELATIONSHIP & CLASS ARCHITECTURE",
        "全体関連図・クラス図",
        "Key項目に絞った見やすい関連図マップ（全体／01〜06領域別）と、全属性・コード定義を含むMermaidクラス図ソースを切り替えて確認できます。"
      )}
      ${diagramSelectorHtml}

      <div class="uml-subbar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <label class="toggle-label" style="padding:4px 10px">
            <input type="checkbox" id="toggle-ext-rels" ${state.erShowExtended ? "checked" : ""}>
            <span>クラス図の拡張関連（建物・設備×点検・修繕×費用）も表示</span>
          </label>
          <span style="font-size:12px;color:var(--text-muted)">
            中心の「施設基本マスタ」から各業務マスタ・履歴および「建物」へのPK/FK・多重度を表示しています
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <button type="button" class="btn sm" data-jump-dg="facility">◈ 01 施設基本（共通クラス展開）→</button>
          <button type="button" class="btn sm" data-jump-dg="equipment">◈ 02 設備・機器（共通クラス展開）→</button>
        </div>
      </div>

      <div class="er-workspace">
        <div class="er-canvas-card">
          <svg class="er-svg" viewBox="0 0 1060 ${svgHeight}" role="img" aria-label="施設管理データモデル全体関連図">
            <defs>
              <marker id="arrow-std" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#475569"></path>
              </marker>
              <marker id="arrow-comp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#0f172a"></path>
              </marker>
              <marker id="arrow-sel" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#1d4ed8"></path>
              </marker>
              <marker id="arrow-ext" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0.5 L8.5,4.5 L0,8.5 Z" fill="#7c3aed"></path>
              </marker>
              <marker id="comp-std" markerWidth="13" markerHeight="10" refX="1" refY="5" orient="auto">
                <polygon points="1,5 6.5,1.2 12,5 6.5,8.8" fill="#0f172a" stroke="#0f172a" stroke-width="1"></polygon>
              </marker>
              <marker id="comp-sel" markerWidth="13" markerHeight="10" refX="1" refY="5" orient="auto">
                <polygon points="1,5 6.5,1.2 12,5 6.5,8.8" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="1"></polygon>
              </marker>
            </defs>

            ${visibleRels
              .map((rel) => {
                const geom = buildEdgeGeometry(rel, erPos);
                const isSel =
                  (state.erSelectedType === "rel" && state.erSelectedId === rel.id) ||
                  (state.erSelectedType === "table" && connectedEdges.has(rel.id));
                const inFilter = activeTables.has(rel.fromTable) && activeTables.has(rel.toTable);
                const dimmed = !inFilter || (connectedNodes.size > 0 && !connectedEdges.has(rel.id));
                const isComp = Boolean(rel.isComposition);
                const mStart = isComp ? (isSel ? "url(#comp-sel)" : "url(#comp-std)") : "";
                const marker = isSel
                  ? "url(#arrow-sel)"
                  : isComp
                  ? "url(#arrow-comp)"
                  : rel.kind === "extended"
                  ? "url(#arrow-ext)"
                  : "url(#arrow-std)";
                const badgeTxt = isComp ? `◆ ${rel.cardinality}` : rel.cardinality;
                const pillW = Math.max(66, badgeTxt.length * 7.2 + 16);

                return `
                  <g class="er-edge-group ${isSel ? "selected" : ""} ${dimmed ? "dimmed" : ""}" data-rel-id="${esc(rel.id)}">
                    <title>${esc(rel.cardinality)} ｜ ${esc(rel.plainCardinality || rel.label)}</title>
                    <path class="er-edge-hit" d="${geom.d}"></path>
                    <path class="er-edge ${rel.kind === "extended" ? "extended" : ""}" d="${geom.d}"
                      ${mStart ? `marker-start="${mStart}"` : ""} marker-end="${marker}"
                      ${isComp && !isSel ? 'style="stroke:#0f172a;stroke-width:2.4"' : ""}></path>
                    <rect x="${Math.round(geom.lx - pillW / 2)}" y="${geom.ly - 10}" width="${pillW}" height="20" rx="10"
                      fill="${isComp ? "#f0f9ff" : "#ffffff"}"
                      stroke="${isSel ? "#2563eb" : rel.kind === "extended" ? "#c4b5fd" : isComp ? "#7dd3fc" : "#cbd5e1"}"></rect>
                    <text x="${geom.lx}" y="${geom.ly + 3.5}" text-anchor="middle" font-size="10.5" font-weight="800"
                      fill="${isSel ? "#1d4ed8" : rel.kind === "extended" ? "#6d28d9" : isComp ? "#0369a1" : "#334155"}">${esc(badgeTxt)}</text>
                  </g>
                `;
              })
              .join("")}

            ${hubNodes
              .map((tbl) => {
                const pos = erPos[tbl.id];
                const dom = domainById.get(tbl.domainId);
                const pkCol = tbl.columns.find((c) => c.key === "PK");
                const fkCols = tbl.columns.filter((c) => c.key === "FK");
                const isSelected = state.erSelectedType === "table" && state.erSelectedId === tbl.id;
                const dimmed = !activeTables.has(tbl.id);
                const hdrText = tbl.isCommonClass
                  ? "共通クラス ｜ 構成要素（棟情報）"
                  : `${dom.code} ${dom.shortName} ｜ ${tbl.nature.replace(/（.*）/, "")}`;
                const titleTxt = tbl.isCommonClass ? `◇ ${tbl.name}（Building）` : tbl.name;

                return `
                  <g class="er-node-group ${isSelected ? "selected" : ""} ${dimmed ? "dimmed" : ""}" data-node-id="${esc(tbl.id)}" transform="translate(${pos.x}, ${pos.y})">
                    <rect class="er-node-box" x="0" y="0" width="${pos.w}" height="${pos.h}" rx="12"
                      ${tbl.isCommonClass && !isSelected ? 'style="stroke:#7dd3fc;fill:#f8fdff"' : ""}></rect>
                    <path d="M 1 12 Q 1 1 12 1 L ${pos.w - 12} 1 Q ${pos.w - 1} 1 ${pos.w - 1} 12 L ${pos.w - 1} 28 L 1 28 Z" fill="${esc(dom.color)}"></path>
                    <text x="12" y="19" fill="#ffffff" font-size="11" font-weight="700">${esc(hdrText)}</text>
                    <text x="${pos.w - 10}" y="19" text-anchor="end" fill="#ffffff" font-size="10.5" font-weight="700">${tbl.columns.length}項目</text>
                    <text x="12" y="50" fill="#0f172a" font-size="14" font-weight="800">${esc(titleTxt)}</text>
                    <text x="12" y="66" fill="#64748b" font-size="11" font-family="Consolas, monospace">${esc(tbl.id)}</text>
                    <text x="12" y="85" fill="#1e293b" font-size="11" font-weight="700">PK: ${esc(pkCol ? pkCol.en : "—")}</text>
                    <text x="12" y="101" fill="#5b21b6" font-size="11" font-weight="600">FK: ${esc(
                      fkCols.length ? fkCols.map((f) => f.en).join(", ") : "—（ルート親テーブル）"
                    )}</text>
                    ${
                      tbl.id === "m_facilities"
                        ? `<rect x="10" y="111" width="${pos.w - 20}" height="18" rx="6" fill="#f0f9ff" stroke="#bae6fd"></rect>
                           <text x="${pos.w / 2}" y="123.5" text-anchor="middle" fill="#0369a1" font-size="10" font-weight="700">◇内包共通型: 住所・連絡先・組織・スケジュール・画像</text>`
                        : ""
                    }
                  </g>
                `;
              })
              .join("")}
          </svg>

          <div class="common-strip-bar">
            <span><strong>共通クラスとの詳細な結びつき：</strong>上の領域ピルを切り替えると、各領域にぶら下がる共通クラス（住所・連絡先・位置情報など）の構成図をKeyのみで確認できます。</span>
            <div class="common-strip-chips">
              <button type="button" class="badge rel-class-link" data-jump-dg="facility">◈ 01 施設基本の共通クラス構成を見る</button>
              <button type="button" class="badge rel-class-link" data-jump-dg="equipment">◈ 02 設備・機器の共通クラス構成を見る</button>
            </div>
          </div>

          <div class="er-legend">
            <span class="legend-item"><span class="legend-line"></span> 標準CSVのPK→FK参照（実線：親テーブルから子テーブルへの紐づけ）</span>
            <span class="legend-item"><span class="legend-diamond">◆</span><span class="legend-line" style="border-top-color:#0f172a"></span> 構成クラスの所有（施設→建物）</span>
            <span class="legend-item"><span class="legend-line dashed"></span> 02_クラス図で定義された任意拡張FK（破線：棟単位・設備単位の保全や費用連動）</span>
          </div>

          ${renderMultiplicityGuideHtml(true)}
        </div>

        <aside class="card er-inspector" id="er-inspector-panel">
          ${renderErInspector()}
        </aside>
      </div>

      <div class="section-heading" style="margin-top:28px">
        <div>
          <h2>テーブル・クラス間リレーション定義マトリクス（全${visibleRels.length}件）</h2>
          <small>行をクリックすると上の関連図で該当箇所がハイライトされます</small>
        </div>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>種別</th>
              <th>参照元（親 PK側）</th>
              <th>多重度と意味</th>
              <th>参照先（子 FK保持側）</th>
              <th>関係の意味・業務上の役割</th>
            </tr>
          </thead>
          <tbody>
            ${visibleRels
              .map((r) => {
                const parentTbl = tableById.get(r.toTable);
                const childTbl = tableById.get(r.fromTable);
                return `
                  <tr class="clickable-row" data-matrix-rel="${esc(r.id)}">
                    <td>${
                      r.isComposition
                        ? `<span class="badge pk">◆ 構成所有</span>`
                        : r.kind === "standard"
                        ? `<span class="badge req">標準CSV</span>`
                        : `<span class="badge fk">クラス図拡張</span>`
                    }</td>
                    <td>
                      <strong>${esc(parentTbl?.name)}</strong><br>
                      <span class="mono" style="font-size:11.5px;color:var(--text-muted)">${esc(r.toTable)}.${esc(r.toCol)}</span>
                    </td>
                    <td>
                      <span class="mult-symbol">${esc(r.cardinality)}</span>
                      <div style="font-size:11.5px;color:var(--text-body);margin-top:4px">${esc(r.plainCardinality || "")}</div>
                    </td>
                    <td>
                      <strong>${esc(childTbl?.name)}</strong><br>
                      <span class="mono" style="font-size:11.5px;color:#5b21b6">${esc(r.fromTable)}.${esc(r.fromCol)}</span>
                    </td>
                    <td>
                      <strong>${esc(r.label)}</strong><br>
                      <span style="color:var(--text-body);font-size:12px">${esc(r.description)}</span>
                    </td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    bindDiagramCommonToolbar(container, diagramById.get("overall"));

    $$("[data-jump-dg]", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        navigate("relations", { relMode: "map", umlDiagramId: btn.dataset.jumpDg });
      })
    );

    $("#toggle-ext-rels", container)?.addEventListener("change", (e) => {
      state.erShowExtended = e.target.checked;
      renderRelations(container);
    });

    $$("[data-node-id]", container).forEach((node) => {
      node.addEventListener("click", () => {
        state.erSelectedType = "table";
        state.erSelectedId = node.dataset.nodeId;
        renderRelations(container);
      });
    });

    $$("[data-rel-id]", container).forEach((edge) => {
      edge.addEventListener("click", () => {
        state.erSelectedType = "rel";
        state.erSelectedId = edge.dataset.relId;
        renderRelations(container);
      });
    });

    $$("[data-matrix-rel]", container).forEach((row) => {
      row.addEventListener("click", () => {
        state.erSelectedType = "rel";
        state.erSelectedId = row.dataset.matrixRel;
        renderRelations(container);
        $(".er-workspace", container)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    bindInspectorEvents(container);
  }

  function renderErInspector() {
    if (state.erSelectedType === "rel") {
      const rel = state.data.relations.find((r) => r.id === state.erSelectedId);
      if (!rel) return "";
      const pTbl = tableById.get(rel.toTable);
      const cTbl = tableById.get(rel.fromTable);
      return `
        <span class="badge ${rel.isComposition ? "pk" : rel.kind === "standard" ? "req" : "fk"}">${
        rel.isComposition
          ? "◆ コンポジション（構成クラス所有）"
          : rel.kind === "standard"
          ? "標準PK/FKリレーション"
          : "クラス図 拡張リレーション"
      }</span>
        <h3 style="margin:10px 0 6px;font-size:17px">${esc(rel.label)}</h3>
        <p style="margin:0 0 14px;font-size:12.5px;color:var(--text-body)">${esc(rel.description)}</p>
        <div class="spec-grid">
          <div class="spec-box">
            <span>親テーブル（PK側）</span>
            <strong>${esc(pTbl?.name)}</strong>
            <small class="mono">${esc(rel.toTable)}.${esc(rel.toCol)}</small>
          </div>
          <div class="spec-box">
            <span>子・構成側（FK保持）</span>
            <strong>${esc(cTbl?.name)}</strong>
            <small class="mono">${esc(rel.fromTable)}.${esc(rel.fromCol)}</small>
          </div>
        </div>
        <div class="callout">
          <strong>多重度：<span class="mono">${esc(rel.cardinality)}</span></strong><br>
          ${esc(rel.plainCardinality || "")}
        </div>
        <div style="display:grid;gap:8px;margin-top:12px">
          ${rel.fromProp ? `<button type="button" class="btn" data-open-prop="${esc(rel.fromProp)}">FK項目（${esc(rel.fromCol)}）の詳細を開く</button>` : ""}
          <button type="button" class="btn primary" data-go-table="${esc(rel.fromTable)}">${esc(cTbl?.name)} の全項目を見る →</button>
        </div>
      `;
    }

    const tbl = tableById.get(state.erSelectedId) || tableById.get("m_facilities") || state.data.tables[0];
    const dom = domainById.get(tbl.domainId);
    const domDiagramId = tbl.id === "pd_building" ? "facility" : diagramById.has(tbl.domainId) ? tbl.domainId : "";
    const parentRels = state.data.relations.filter(
      (r) => r.fromTable === tbl.id && (r.kind === "standard" || state.erShowExtended)
    );
    const childRels = state.data.relations.filter(
      (r) => r.toTable === tbl.id && r.id !== "REL_FAC_SELF" && (r.kind === "standard" || state.erShowExtended)
    );

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <span class="domain-code-badge" style="background:${esc(dom.bg)};color:${esc(dom.color)};border:1px solid ${esc(dom.border)}">
          ${esc(dom.code)} ${esc(dom.name)}
        </span>
        <span class="badge ${tbl.isCommonClass ? "opt" : tbl.nature.includes("静的") ? "nature-static" : "nature-dynamic"}">${esc(tbl.nature)}</span>
      </div>
      <h3 style="margin:10px 0 2px;font-size:18px">${esc(tbl.name)}</h3>
      <div class="mono" style="font-size:12px;color:var(--text-muted);margin-bottom:10px">${esc(tbl.id)}（クラス名: ${esc(tbl.classEn)}）</div>
      ${tbl.description ? `<p style="margin:0 0 12px;font-size:12.5px;color:var(--text-body);line-height:1.7">${escBr(tbl.description)}</p>` : ""}
      ${
        tbl.rowUnit
          ? `<div class="callout" style="margin-bottom:14px">
              <strong>1行の単位：</strong>${esc(tbl.rowUnit)}
            </div>`
          : ""
      }

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <button type="button" class="btn primary sm" data-go-table="${esc(tbl.id)}">▤ 項目定義（${tbl.columns.length}件）</button>
        <button type="button" class="btn sm" data-go-builder="${esc(tbl.id)}">⇩ CSVテンプレ作成</button>
      </div>
      ${
        domDiagramId
          ? `<button type="button" class="btn sm" style="width:100%;margin-bottom:14px" data-open-dom-dg="${esc(
              domDiagramId
            )}" data-open-dom-cls="${esc(tbl.classEn)}">◈ この領域のクラス図（共通クラス展開）を開く →</button>`
          : ""
      }

      <strong style="font-size:12px;color:var(--navy-800)">親テーブルへの参照（この表が持つFK：${parentRels.length}件）</strong>
      <div class="inspector-rel-list">
        ${
          parentRels.length
            ? parentRels
                .map((r) => {
                  const p = tableById.get(r.toTable);
                  return `<button type="button" class="inspector-rel-item" data-focus-table="${esc(r.toTable)}">
                    <strong>→ ${esc(p?.name)}</strong> <span class="mult-symbol" style="margin-left:4px">${esc(r.cardinality)}</span><br>
                    <span style="color:var(--text-body)">${esc(r.plainCardinality || r.label)}</span>
                  </button>`;
                })
                .join("")
            : `<div style="font-size:12px;color:var(--text-muted);padding:4px 2px">外部テーブルへの必須FKなし（全データの中心となる親マスタ）</div>`
        }
      </div>

      <strong style="font-size:12px;color:var(--navy-800)">子テーブル・構成クラスからの参照（${childRels.length}件）</strong>
      <div class="inspector-rel-list">
        ${
          childRels.length
            ? childRels
                .map((r) => {
                  const c = tableById.get(r.fromTable);
                  return `<button type="button" class="inspector-rel-item" data-focus-table="${esc(r.fromTable)}">
                    <strong>${r.isComposition ? "◆" : "←"} ${esc(c?.name)}</strong> <span class="mult-symbol" style="margin-left:4px">${esc(
                      r.cardinality
                    )}</span><br>
                    <span style="color:var(--text-body)">${esc(r.plainCardinality || r.label)}</span>
                  </button>`;
                })
                .join("")
            : `<div style="font-size:12px;color:var(--text-muted);padding:4px 2px">さらに下位の子テーブルはありません</div>`
        }
      </div>

      <strong style="font-size:12px;color:var(--navy-800)">主要項目プレビュー（クリックで詳細ドロワー）</strong>
      <div class="inspector-rel-list">
        ${tbl.columns
          .slice(0, 6)
          .map(
            (c) => `
          <button type="button" class="inspector-rel-item" data-open-prop="${esc(c.id)}">
            <div style="display:flex;justify-content:space-between;gap:6px">
              <strong>${esc(c.ja)}</strong>
              <span>${c.key ? `<span class="badge ${c.key === "PK" ? "pk" : "fk"}">${esc(c.key)}</span> ` : ""}${renderReqBadge(c.required)}</span>
            </div>
            <span class="mono" style="font-size:11px;color:var(--text-muted)">${esc(c.en)} · ${esc(c.dataType)}</span>
          </button>`
          )
          .join("")}
      </div>
    `;
  }

  function bindInspectorEvents(container) {
    const panel = $("#er-inspector-panel", container);
    if (!panel) return;
    $$("[data-go-table]", panel).forEach((b) =>
      b.addEventListener("click", () => navigate("explorer", { tableId: b.dataset.goTable }))
    );
    $$("[data-go-builder]", panel).forEach((b) =>
      b.addEventListener("click", () => navigate("builder", { builderTableId: b.dataset.goBuilder }))
    );
    $$("[data-open-dom-dg]", panel).forEach((b) =>
      b.addEventListener("click", () =>
        navigate("relations", {
          relMode: "map",
          umlDiagramId: b.dataset.openDomDg,
          umlSelectClass: b.dataset.openDomCls,
        })
      )
    );
    $$("[data-focus-table]", panel).forEach((b) =>
      b.addEventListener("click", () => {
        state.erSelectedType = "table";
        state.erSelectedId = b.dataset.focusTable;
        renderRelations(container);
      })
    );
    $$("[data-open-prop]", panel).forEach((b) =>
      b.addEventListener("click", () => openDrawer(b.dataset.openProp))
    );
  }
  // =========================================================================
  // 3. DOMAIN, TABLE & COMMON CLASS EXPLORER VIEW
  // =========================================================================
  const FACILITY_SECTION_ORDER = [
    "識別・名称・概要",
    "所在地・連絡先・位置座標",
    "分類・運営体制・開館スケジュール",
    "建築・敷地・構造・耐震スペック",
    "付帯設備・画像・管理メタ情報",
  ];

  function getExplorerOrderedColumns(tbl) {
    if (!tbl || tbl.id !== "m_facilities") return tbl ? tbl.columns : [];
    const rank = new Map(FACILITY_SECTION_ORDER.map((s, idx) => [s, idx]));
    return [...tbl.columns].sort((a, b) => {
      const ra = rank.has(a.section) ? rank.get(a.section) : 99;
      const rb = rank.has(b.section) ? rank.get(b.section) : 99;
      return ra - rb;
    });
  }

  function renderExplorer(container) {
    const allTabs = [...state.data.domains];
    const commonDom = domainById.get("common");
    if (commonDom && commonDom.tables.length) {
      allTabs.push(commonDom);
    }

    const dom = domainById.get(state.domainId) || allTabs[0];
    const domTables = dom.tables.map((tid) => tableById.get(tid)).filter(Boolean);
    const tbl = tableById.get(state.tableId) || domTables[0];
    const orderedCols = getExplorerOrderedColumns(tbl);
    const reqRecCount = tbl.requiredCount + tbl.recommendedCount;

    const sections =
      tbl.id === "m_facilities" ? [...new Set(orderedCols.map((c) => c.section).filter(Boolean))] : [];

    const q = normSearch(state.expQuery.trim());
    const filteredCols = orderedCols.filter((c) => {
      if (state.expReq === "req_rec" && c.required !== "必須" && c.required !== "推奨") return false;
      if (state.expReq === "req" && c.required !== "必須") return false;
      if (state.expReq === "rec" && c.required !== "推奨") return false;
      if (state.expReq === "opt" && (c.required === "必須" || c.required === "推奨")) return false;
      if (state.expSpecial === "key" && !c.key) return false;
      if (state.expSpecial === "code" && !c.listId) return false;
      if (state.expSpecial === "relclass" && !c.relatedClassId) return false;
      if (sections.length && state.expSection !== "all" && c.section !== state.expSection) return false;
      if (!q) return true;
      const hay = normSearch(
        [
          c.id,
          c.ja,
          c.altJa,
          c.en,
          c.altEn,
          c.desc,
          c.note,
          c.listName,
          c.relatedClass,
          c.synSummaryJa,
          c.synSummaryEn,
          ...c.synonyms.map((s) => s.term),
        ].join(" ")
      );
      return hay.includes(q);
    });

    const refBy = tbl.referencedBy || [];
    const usedDgs = tbl.usedInDiagrams || [];

    container.innerHTML = `
      ${pageHeadHtml(
        "explorer",
        "DOMAIN, TABLE & COMMON CLASS EXPLORER",
        "領域・項目定義ブラウザ",
        "業務領域テーブルと共通クラスの全項目を閲覧できます。コードバッジや関連クラスバッジを押すと定義がポップアップ表示されます。",
        `<div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn" id="exp-to-er">◈ クラス図でこの要素を見る</button>
          ${
            !tbl.isCommonClass || BUILDER_ALLOWED_COMMON_IDS.has(tbl.id)
              ? `<button type="button" class="btn primary" id="exp-to-builder">⇩ この${tbl.isCommonClass ? "共通クラス" : "表"}のCSVを作成</button>`
              : ""
          }
        </div>`
      )}

      <div class="domain-tabs-bar" role="tablist" aria-label="業務領域・共通クラス切替">
        ${allTabs
          .map((d) => {
            const cnt = d.tables.reduce((n, tid) => n + (tableById.get(tid)?.columns.length || 0), 0);
            const subLabel = d.isCommonDomain
              ? `部品構造 · ${d.tables.length}種 (${cnt})`
              : `領域 ${esc(d.code)} · ${d.tables.length}表 (${cnt})`;
            return `
              <button type="button" class="domain-tab ${d.id === dom.id ? "active" : ""}"
                style="--dom-color:${esc(d.color)};--dom-bg:${esc(d.bg)}"
                data-exp-dom="${esc(d.id)}">
                <small>${subLabel}</small>
                <strong>${esc(d.name)}</strong>
              </button>
            `;
          })
          .join("")}
      </div>

      ${
        dom.isCommonDomain
          ? `<div class="common-chips-grid" style="margin-top:0;margin-bottom:16px">
              ${domTables
                .map(
                  (t) => `
                <button type="button" class="common-class-chip ${t.id === tbl.id ? "active" : ""}" data-exp-tbl="${esc(t.id)}">
                  <div>
                    <strong>◇ ${esc(t.name)} <span class="mono" style="font-size:11px;font-weight:600;color:var(--text-muted)">(${esc(t.classEn)})</span></strong>
                    <small>${esc(t.roleNote || "")}</small>
                  </div>
                  <span class="badge ${t.id === tbl.id ? "req" : "opt"}">${t.columns.length}項目</span>
                </button>`
                )
                .join("")}
            </div>`
          : domTables.length > 1
          ? `<div class="table-selector-row">
              ${domTables
                .map(
                  (t) => `
                <button type="button" class="table-switch-card ${t.id === tbl.id ? "active" : ""}" data-exp-tbl="${esc(t.id)}">
                  <div class="table-switch-head">
                    <strong>${esc(t.name)} <span class="mono" style="font-size:12px;font-weight:600;color:var(--text-muted)">(${esc(t.id)})</span></strong>
                    <span class="badge ${t.nature.includes("静的") ? "nature-static" : "nature-dynamic"}">${esc(t.nature)}</span>
                  </div>
                  <p>${t.roleNote ? `${esc(t.roleNote)} ` : ""}（全 ${t.columns.length} 項目：必須 ${t.requiredCount} / 推奨 ${t.recommendedCount}）</p>
                </button>`
                )
                .join("")}
            </div>`
          : ""
      }

      <div class="table-context-banner" style="--dom-color:${esc(dom.color)}">
        <div style="width:100%">
          <h2>
            <span>${esc(tbl.name)}</span>
            <span class="mono" style="font-size:13.5px;color:var(--text-muted)">${esc(tbl.id)}（クラス名: ${esc(tbl.classEn)}）</span>
            <span class="badge ${
              tbl.isCommonClass ? "rel-class-link" : tbl.nature.includes("静的") ? "nature-static" : "nature-dynamic"
            }" style="cursor:default">${esc(tbl.nature)}</span>
          </h2>
          ${tbl.description ? `<p style="line-height:1.75">${escBr(tbl.description)}</p>` : ""}
          <div class="table-meta-chips">
            ${tbl.rowUnit ? `<span class="meta-chip"><strong>1行の単位：</strong>${esc(tbl.rowUnit)}</span>` : ""}
            <span class="meta-chip"><strong>全 ${tbl.columns.length} 項目</strong>（必須 ${tbl.requiredCount} / 推奨 ${tbl.recommendedCount}${
              tbl.optionalCount ? ` / 任意 ${tbl.optionalCount}` : ""
            }）</span>
            <span class="meta-chip"><strong>コード参照：</strong>${tbl.codeRefCount} 項目</span>
            ${tbl.relClassRefCount ? `<span class="meta-chip"><strong>関連クラス参照：</strong>${tbl.relClassRefCount} 項目</span>` : ""}
          </div>

          ${
            tbl.isCommonClass
              ? `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border-light);font-size:12px;display:flex;gap:14px;flex-wrap:wrap">
                  <div>
                    <strong>この共通クラスを参照している項目（${refBy.length}件）：</strong>
                    ${
                      refBy.length
                        ? refBy
                            .map(
                              (u) =>
                                `<button type="button" class="btn sm" style="margin:2px 4px 2px 0;padding:2px 8px;min-height:24px" data-banner-prop="${esc(
                                  u.propId
                                )}">${esc(u.tableName)}.${esc(u.ja)}</button>`
                            )
                            .join("")
                        : `<span style="color:var(--text-muted)">基本データセットでは文字列属性で簡略表現（詳細クラス図で本クラスを使用）</span>`
                    }
                  </div>
                  ${
                    usedDgs.length
                      ? `<div>
                          <strong>登場するクラス図：</strong>
                          ${usedDgs
                            .map(
                              (d) =>
                                `<button type="button" class="btn sm" style="margin:2px 4px 2px 0;padding:2px 8px;min-height:24px" data-banner-dg="${esc(
                                  d.diagramId
                                )}" data-banner-v="${d.variantIndex}">◈ ${esc(d.label)}</button>`
                            )
                            .join("")}
                        </div>`
                      : ""
                  }
                </div>`
              : ""
          }
        </div>
      </div>

      <div class="filter-bar">
        <input type="search" id="exp-search-input" class="filter-input"
          placeholder="この定義内を検索（項目名・英語名・別名・同義語・関連クラス・説明）"
          value="${esc(state.expQuery)}" aria-label="項目検索">
        <select id="exp-req-select" class="filter-select" aria-label="必須・推奨・任意フィルタ">
          <option value="req_rec" ${state.expReq === "req_rec" ? "selected" : ""}>収集区分：必須、推奨（${reqRecCount}）</option>
          <option value="all" ${state.expReq === "all" ? "selected" : ""}>収集区分：すべて（${tbl.columns.length}）</option>
          <option value="req" ${state.expReq === "req" ? "selected" : ""}>必須のみ（${tbl.requiredCount}）</option>
          <option value="rec" ${state.expReq === "rec" ? "selected" : ""}>推奨のみ（${tbl.recommendedCount}）</option>
          ${tbl.optionalCount ? `<option value="opt" ${state.expReq === "opt" ? "selected" : ""}>任意のみ（${tbl.optionalCount}）</option>` : ""}
        </select>
        <select id="exp-special-select" class="filter-select" aria-label="キー・コード・関連クラス参照フィルタ">
          <option value="all" ${state.expSpecial === "all" ? "selected" : ""}>属性種別：すべて</option>
          <option value="key" ${state.expSpecial === "key" ? "selected" : ""}>PK / FK キー項目のみ</option>
          <option value="code" ${state.expSpecial === "code" ? "selected" : ""}>コード・統制語彙参照あり（${tbl.codeRefCount}）</option>
          ${
            tbl.relClassRefCount
              ? `<option value="relclass" ${state.expSpecial === "relclass" ? "selected" : ""}>関連クラス参照あり（${tbl.relClassRefCount}）</option>`
              : ""
          }
        </select>
        ${
          sections.length
            ? `<select id="exp-sec-select" class="filter-select" aria-label="意味グループ絞込">
                <option value="all" ${state.expSection === "all" ? "selected" : ""}>項目グループ：すべて</option>
                ${sections
                  .map((s) => `<option value="${esc(s)}" ${state.expSection === s ? "selected" : ""}>${esc(s)}</option>`)
                  .join("")}
              </select>`
            : ""
        }
        <span style="font-size:12.5px;color:var(--text-muted);font-weight:700">${filteredCols.length} 件表示</span>
      </div>

      <div class="data-table-wrap">
        <table class="data-table" id="explorer-cols-table">
          <thead>
            <tr>
              <th style="width:118px">ID / キー</th>
              <th style="width:190px">日本語項目名</th>
              <th style="width:180px">英語カラム名</th>
              <th style="width:72px">区分</th>
              <th style="width:130px">データ型 / 多重度</th>
              <th style="width:190px">コード / 関連クラス</th>
              <th>定義・説明（行クリックで詳細ドロワー表示）</th>
            </tr>
          </thead>
          <tbody>
            ${renderExplorerRows(filteredCols, sections.length > 0 && state.expSection === "all" && !q, tbl)}
          </tbody>
        </table>
      </div>
    `;

    $("#exp-to-er", container)?.addEventListener("click", () =>
      navigate("relations", { erSelectTable: tbl.id })
    );
    $("#exp-to-builder", container)?.addEventListener("click", () =>
      navigate("builder", { builderTableId: tbl.id })
    );

    $$("[data-exp-dom]", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        state.expSection = "all";
        state.expReq = "req_rec";
        state.expSpecial = "all";
        navigate("explorer", { domainId: btn.dataset.expDom });
      })
    );
    $$("[data-exp-tbl]", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        state.expSection = "all";
        state.expReq = "req_rec";
        state.expSpecial = "all";
        navigate("explorer", { tableId: btn.dataset.expTbl });
      })
    );

    $$("[data-banner-prop]", container).forEach((b) =>
      b.addEventListener("click", () => openDrawer(b.dataset.bannerProp))
    );
    $$("[data-banner-dg]", container).forEach((b) =>
      b.addEventListener("click", () =>
        navigate("relations", {
          relMode: "map",
          umlDiagramId: b.dataset.bannerDg,
          umlVariantIdx: Number(b.dataset.bannerV) || 0,
          umlSelectClass: tbl.classEn,
        })
      )
    );

    bindLiveSearchInput(
      $("#exp-search-input", container),
      () => state.expQuery,
      (val) => {
        state.expQuery = val;
        renderExplorer(container);
      },
      () => $("#exp-search-input", container)
    );

    $("#exp-req-select", container)?.addEventListener("change", (e) => {
      state.expReq = e.target.value;
      renderExplorer(container);
    });
    $("#exp-special-select", container)?.addEventListener("change", (e) => {
      state.expSpecial = e.target.value;
      renderExplorer(container);
    });
    $("#exp-sec-select", container)?.addEventListener("change", (e) => {
      state.expSection = e.target.value;
      renderExplorer(container);
    });
    $("#exp-show-all-opt", container)?.addEventListener("click", () => {
      state.expReq = "all";
      renderExplorer(container);
    });

    $$("[data-row-prop]", container).forEach((tr) => {
      tr.addEventListener("click", (e) => {
        const codeBtn = e.target.closest("[data-popup-code]");
        if (codeBtn) {
          e.stopPropagation();
          openCodeModal(codeBtn.dataset.popupCode);
          return;
        }
        const clsBtn = e.target.closest("[data-popup-class]");
        if (clsBtn) {
          e.stopPropagation();
          openClassModal(clsBtn.dataset.popupClass);
          return;
        }
        const fkBtn = e.target.closest("[data-jump-fk-table]");
        if (fkBtn) {
          e.stopPropagation();
          navigate("explorer", { tableId: fkBtn.dataset.jumpFkTable });
          return;
        }
        openDrawer(tr.dataset.rowProp);
      });
    });
  }

  function renderExplorerRows(cols, showSectionHeaders, tbl) {
    if (!cols.length) {
      if (state.expReq === "req_rec" && tbl && tbl.optionalCount > 0 && !state.expQuery.trim() && state.expSpecial === "all") {
        return `<tr><td colspan="7" class="empty-box">
          標準表示（「必須、推奨」）に該当する項目はありません（任意項目が ${tbl.optionalCount} 件定義されています）。
          <div style="margin-top:8px">
            <button type="button" class="btn sm" id="exp-show-all-opt">すべて（任意含む ${tbl.columns.length} 件）を表示</button>
          </div>
        </td></tr>`;
      }
      return `<tr><td colspan="7" class="empty-box">条件に一致する項目がありません。フィルタ条件を緩めて再度お試しください。</td></tr>`;
    }
    let html = "";
    let lastSec = "";
    for (const c of cols) {
      if (showSectionHeaders && c.section && c.section !== lastSec) {
        lastSec = c.section;
        html += `<tr class="group-divider"><td colspan="7">▸ ${esc(c.section)}</td></tr>`;
      }
      const fkInfo = c.fkTarget
        ? `<button type="button" class="badge fk" style="margin-top:4px;cursor:pointer" data-jump-fk-table="${esc(
            c.fkTarget.toTable
          )}" title="参照先テーブルを開く">→ ${esc(c.fkTarget.toTable)}</button>`
        : "";
      const codeBadge = c.listId
        ? `<button type="button" class="badge code-link" data-popup-code="${esc(c.listId)}" title="クリックしてコードリストをポップアップ表示">⌗ ${esc(
            c.listName || "コード参照"
          )}</button>`
        : c.listName
        ? `<span class="badge ext-code" title="外部標準コード体系">外部体系: ${esc(c.listName)}</span>`
        : "";
      const relClassBadge = c.relatedClassId
        ? `<button type="button" class="badge rel-class-link" data-popup-class="${esc(c.relatedClassId)}" title="クリックして共通クラス定義をポップアップ表示">◇ 関連クラス: ${esc(
            c.relatedClass
          )}</button>`
        : "";
      const unitBadge = c.unit ? `<span class="meta-chip" style="padding:1px 6px">単位: ${esc(c.unit)}</span>` : "";

      html += `
        <tr class="clickable-row" data-row-prop="${esc(c.id)}">
          <td>
            <div class="mono" style="font-size:11.5px;font-weight:700;color:var(--text-muted)">${esc(c.id)}</div>
            <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">${renderKeyBadge(c)}${fkInfo}</div>
          </td>
          <td>
            <div class="prop-title">${esc(c.ja)}</div>
          </td>
          <td class="mono" style="font-weight:700;color:var(--navy-800)">${esc(c.en)}</td>
          <td>${renderReqBadge(c.required)}</td>
          <td>
            <strong>${esc(c.dataType)}</strong>
            <div class="mono" style="font-size:11px;color:var(--text-muted)" title="${esc(explainPropMultiplicity(c.multiplicity))}">多重度 [${esc(c.multiplicity || "—")}]</div>
          </td>
          <td>
            <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px">
              ${codeBadge}
              ${relClassBadge}
              ${unitBadge}
              ${!codeBadge && !relClassBadge && !unitBadge ? `<span style="color:#94a3b8;font-size:11.5px">—</span>` : ""}
            </div>
          </td>
          <td>
            <div>${esc(c.desc)}</div>
          </td>
        </tr>
      `;
    }
    return html;
  }

  // =========================================================================
  // 4. CSV FORMAT BUILDER & SAMPLE PREVIEW VIEW
  // =========================================================================
  function getExtensionGroups(tableId) {
    const parentTbl = tableById.get(tableId);
    const clsIds = BUILDER_COMMON_EXTS[tableId] || [];
    if (!parentTbl || !clsIds.length) return [];

    const parentByEn = new Map();
    const parentByAltEn = new Map();
    for (const pc of parentTbl.columns) {
      if (pc.en) parentByEn.set(pc.en, pc);
      if (pc.altEn) {
        for (const token of pc.altEn.split(",")) {
          const t = token.trim();
          if (t && !parentByAltEn.has(t)) parentByAltEn.set(t, pc);
        }
      }
    }

    return clsIds
      .map((cid) => {
        const cls = tableById.get(cid);
        if (!cls) return null;
        const items = cls.columns.map((col) => {
          const linkedParentCol = parentByEn.get(col.en) || parentByAltEn.get(col.en) || null;
          return { col, linkedParentCol };
        });
        const extCols = items.filter((it) => !it.linkedParentCol).map((it) => it.col);
        return { cls, items, extCols };
      })
      .filter(Boolean);
  }

  function getBaseChosenColumns(tableId) {
    const tbl = tableById.get(tableId);
    if (!tbl) return [];
    const sel = state.selectedCols[tableId] || new Set();
    return tbl.columns.filter((c) => c.required === "必須" || sel.has(c.id));
  }

  function getExtChosenColumns(tableId) {
    const extSel = state.selectedExtCols[tableId];
    if (!extSel || !extSel.size) return [];
    const out = [];
    for (const g of getExtensionGroups(tableId)) {
      for (const it of g.items) {
        // Overlapping items (it.linkedParentCol) are NEVER duplicated; only pure extension items are appended
        if (!it.linkedParentCol && extSel.has(it.col.id)) {
          out.push(it.col);
        }
      }
    }
    return out;
  }

  function isExtItemChecked(tableId, item) {
    if (item.linkedParentCol) {
      const pCol = item.linkedParentCol;
      if (pCol.required === "必須") return true;
      return !!(state.selectedCols[tableId] && state.selectedCols[tableId].has(pCol.id));
    }
    return !!(state.selectedExtCols[tableId] && state.selectedExtCols[tableId].has(item.col.id));
  }

  function getChosenColumns(tableId) {
    return [...getBaseChosenColumns(tableId), ...getExtChosenColumns(tableId)];
  }

  function buildHeaderRows(cols) {
    if (state.headerMode === "ja") return [cols.map((c) => c.ja)];
    if (state.headerMode === "both") return [cols.map((c) => c.en), cols.map((c) => c.ja)];
    return [cols.map((c) => c.en)];
  }

  function renderBuilder(container) {
    const tbl = tableById.get(state.builderTableId) || state.data.tables[0];
    const dom = domainById.get(tbl.domainId);
    const baseChosen = getBaseChosenColumns(tbl.id);
    const extChosen = getExtChosenColumns(tbl.id);
    const chosen = [...baseChosen, ...extChosen];
    const extGroups = getExtensionGroups(tbl.id);
    const extSelSet = state.selectedExtCols[tbl.id] || new Set();
    const sampleData = getSampleRows(tbl.id, state.sampleCount);
    const parentTbl = tableById.get(state.builderParentTableId || "m_facilities") || state.data.tables[0];

    container.innerHTML = `
      ${pageHeadHtml(
        "builder",
        "CSV TEMPLATE & SAMPLE GENERATOR",
        "CSVフォーマット作成・サンプル出力",
        "基本データセットの各テーブルについて、必須項目を保持したまま推奨項目や関連共通クラス（住所・建物・連絡先）の任意項目を選択し、CSVを出力できます。",
        `<div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn" id="dl-all-dict">全${state.data.tables.length}テーブル統合・列定義CSV出力</button>
        </div>`
      )}

      <div class="builder-grid">
        <aside class="card" style="padding:14px">
          <h3 style="margin:0 0 10px;font-size:13.5px">1. 対象テーブルを選択</h3>
          <div class="builder-table-list">
            ${state.data.domains
              .map((d) => {
                return `
                  <div style="font-size:11px;font-weight:800;color:${esc(d.color)};margin:8px 4px 3px">${esc(d.code)} ${esc(d.name)}</div>
                  ${d.tables
                    .map((tid) => {
                      const t = tableById.get(tid);
                      const baseLen = getBaseChosenColumns(tid).length;
                      const extLen = getExtChosenColumns(tid).length;
                      const subGroups = getExtensionGroups(tid);
                      const subSelSet = state.selectedExtCols[tid] || new Set();
                      return `
                        <button type="button" class="builder-table-btn ${tid === tbl.id ? "active" : ""}" data-bld-tbl="${esc(tid)}">
                          <div>
                            <strong style="font-size:12.5px;display:block">${esc(t.name)}</strong>
                            <small class="mono" style="font-size:10.5px;color:var(--text-muted)">${esc(t.id)}</small>
                          </div>
                          <span class="badge ${tid === tbl.id ? "req" : ""}">${baseLen}/${t.columns.length}${
                        extLen > 0 ? `+${extLen}` : ""
                      }列</span>
                        </button>
                        ${
                          subGroups.length
                            ? `<div class="builder-sub-tree">
                                ${subGroups
                                  .map(({ cls, items, extCols }) => {
                                    const activeCnt = items.filter((it) => isExtItemChecked(tid, it)).length;
                                    const addedCnt = extCols.filter((c) => subSelSet.has(c.id)).length;
                                    const isSubStandalone = tbl.id === cls.id;
                                    return `
                                      <button type="button"
                                        class="builder-sub-btn ${isSubStandalone ? "active" : addedCnt > 0 ? "has-sel" : ""}"
                                        data-bld-ext-jump="${esc(cls.id)}"
                                        data-bld-parent="${esc(tid)}"
                                        title="${esc(t.name)}下の「${esc(cls.name)}」項目セクションへ移動します">
                                        <div style="min-width:0">
                                          <strong style="font-size:12px;color:var(--navy-900)">└ ◇ ${esc(cls.name)}</strong>
                                          <small class="mono" style="display:block;font-size:10px;color:var(--text-muted)">${esc(cls.id)}</small>
                                        </div>
                                        <span class="badge ${isSubStandalone ? "req" : addedCnt > 0 ? "rec" : "opt"}">${
                                      isSubStandalone
                                        ? `単体 ${getBaseChosenColumns(cls.id).length}/${cls.columns.length}`
                                        : `${activeCnt}/${items.length}${addedCnt > 0 ? `(+${addedCnt})` : ""}列`
                                    }</span>
                                      </button>
                                    `;
                                  })
                                  .join("")}
                              </div>`
                            : ""
                        }
                      `;
                    })
                    .join("")}
                `;
              })
              .join("")}
          </div>
        </aside>

        <section class="card">
          ${
            tbl.isCommonClass
              ? `<div class="fk-jump-box" style="background:#f0f9ff;border-color:#bae6fd;margin-bottom:12px">
                  <div>
                    <strong style="color:#0369a1;display:block">◇ 共通クラス単体CSV出力モード：${esc(tbl.name)}（${esc(tbl.classEn)}）</strong>
                    <span style="font-size:12px;color:var(--text-body)">${esc(parentTbl.name)}から切り離し、この共通クラス単独のCSVテンプレート・サンプルを出力します。</span>
                  </div>
                  <button type="button" class="btn sm primary" id="bld-back-parent">← ${esc(parentTbl.name)}（列追加モード）に戻る</button>
                </div>`
              : ""
          }

          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px">
            <div>
              <span class="domain-code-badge" style="background:${esc(dom.bg)};color:${esc(dom.color)};border:1px solid ${esc(dom.border)}">${esc(dom.code)} ${esc(dom.name)}</span>
              <h2 style="margin:6px 0 2px;font-size:18px">${esc(tbl.name)} <span class="mono" style="font-size:13px;color:var(--text-muted)">(${esc(tbl.id)})</span></h2>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${
                tbl.isCommonClass
                  ? `
                    ${tbl.recommendedCount > 0 ? `<button type="button" class="btn sm" id="bld-sel-rec-only">推奨を選択</button>` : ""}
                    <button type="button" class="btn sm" id="bld-sel-all">任意もすべて選択</button>
                    <button type="button" class="btn sm" id="bld-clear-rec">初期状態に戻す</button>
                  `
                  : `
                    <button type="button" class="btn sm" id="bld-sel-all">推奨をすべて選択</button>
                    <button type="button" class="btn sm" id="bld-clear-rec">必須のみに戻す${extChosen.length ? "（追加列も解除）" : ""}</button>
                  `
              }
            </div>
          </div>

          <div class="field-check-grid">
            ${tbl.columns
              .map((c) => {
                const isReq = c.required === "必須";
                const checked = isReq || (state.selectedCols[tbl.id] && state.selectedCols[tbl.id].has(c.id));
                return `
                  <div class="field-check-card ${isReq ? "is-req" : ""}">
                    <input type="checkbox" id="chk-${esc(c.id)}" data-chk-col="${esc(c.id)}" ${checked ? "checked" : ""} ${isReq ? "disabled" : ""}>
                    <label for="chk-${esc(c.id)}">
                      <strong>${esc(c.ja)} ${renderReqBadge(c.required)}</strong>
                      <small class="mono">${esc(c.en)} · ${esc(c.dataType)}${c.unit ? ` (${esc(c.unit)})` : ""}</small>
                    </label>
                    <button type="button" class="btn sm" style="padding:2px 7px;min-height:24px" data-info-prop="${esc(c.id)}" title="項目詳細を見る">詳細</button>
                  </div>
                `;
              })
              .join("")}
          </div>

          ${
            extGroups.length
              ? `
            <div class="builder-ext-section">
              <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
                <div>
                  <strong style="font-size:14px;color:var(--navy-900)">◇ 関連する共通クラスの項目（住所・建物・連絡先：必須 / 推奨 / 任意）</strong>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:2px">
                    「本体連動」の項目は <code>${esc(tbl.name)}</code> 側の選択状態（✓）と連動し、出力時は <code>${esc(tbl.name)}</code> の分のみ1回出力されます（重複出力なし）。共通クラス固有の項目にチェックを入れると末尾列に追加されます。
                  </div>
                </div>
                ${
                  extChosen.length > 0
                    ? `<button type="button" class="btn sm" id="bld-clear-all-ext">共通クラス固有の追加列（${extChosen.length}列）を解除</button>`
                    : ""
                }
              </div>

              ${extGroups
                .map(({ cls, items, extCols }) => {
                  const isOpen = !!state.openExtClasses[cls.id];
                  const activeCnt = items.filter((it) => isExtItemChecked(tbl.id, it)).length;
                  const clsAddedCnt = extCols.filter((c) => extSelSet.has(c.id)).length;
                  const linkedCnt = items.length - extCols.length;
                  return `
                    <div class="builder-ext-card ${isOpen ? "open" : ""}" id="bld-ext-card-${esc(cls.id)}">
                      <div class="builder-ext-head">
                        <button type="button" class="builder-ext-toggle" data-ext-toggle="${esc(cls.id)}" aria-expanded="${isOpen}">
                          <span style="font-size:12px;color:#0284c7">${isOpen ? "▾" : "▸"}</span>
                          <strong>◇ ${esc(cls.name)}</strong>
                          <span class="mono" style="font-size:11.5px;color:var(--text-muted)">(${esc(cls.id)})</span>
                          <span class="badge ${clsAddedCnt > 0 ? "rec" : "opt"}">✓ ${activeCnt}/${items.length}（本体連動${linkedCnt} · 追加${clsAddedCnt}/${extCols.length}）</span>
                        </button>
                        <div style="display:flex;gap:6px;flex-wrap:wrap">
                          <button type="button" class="btn sm" style="padding:3px 9px;min-height:26px" data-ext-sel-rec="${esc(cls.id)}">必須・推奨を選択</button>
                          <button type="button" class="btn sm" style="padding:3px 9px;min-height:26px" data-ext-sel-all="${esc(cls.id)}">すべて選択</button>
                          ${
                            clsAddedCnt > 0
                              ? `<button type="button" class="btn sm" style="padding:3px 9px;min-height:26px" data-ext-clear="${esc(cls.id)}">追加分を解除</button>`
                              : ""
                          }
                          <button type="button" class="btn sm" style="padding:3px 9px;min-height:26px;border-color:#7dd3fc;color:#0369a1;background:#ffffff"
                            data-bld-standalone="${esc(cls.id)}" title="${esc(cls.name)}（全${cls.columns.length}項目）単体のCSVテンプレート・サンプルを作成">
                            ⇩ 単体CSVモード →
                          </button>
                        </div>
                      </div>
                      ${
                        isOpen
                          ? `<div class="builder-ext-body">
                              <div class="field-check-grid" style="max-height:300px">
                                ${items
                                  .map((it) => {
                                    const c = it.col;
                                    const pCol = it.linkedParentCol;
                                    const checked = isExtItemChecked(tbl.id, it);
                                    if (pCol) {
                                      const pIsReq = pCol.required === "必須";
                                      const sameEnNote =
                                        pCol.en !== c.en ? ` → 本体: ${pCol.en}` : pCol.ja !== c.ja ? ` → 本体: ${pCol.ja}` : "";
                                      return `
                                        <div class="field-check-card ${pIsReq ? "is-req" : "is-linked"}">
                                          <input type="checkbox" id="chk-link-${esc(c.id)}"
                                            data-chk-linked-parent="${esc(pCol.id)}"
                                            ${checked ? "checked" : ""} ${pIsReq ? "disabled" : ""}>
                                          <label for="chk-link-${esc(c.id)}">
                                            <strong>
                                              ${esc(c.ja)}
                                              ${renderReqBadge(c.required)}
                                              <span class="badge" style="background:#e0e7ff;color:#3730a3;font-size:10px;padding:1px 6px"
                                                title="${esc(tbl.name)}の「${esc(pCol.ja)} (${esc(pCol.en)})」と連動します。CSV出力時は${esc(tbl.name)}側のみ出力され重複しません。">本体連動</span>
                                            </strong>
                                            <small class="mono">${esc(c.en)}${esc(sameEnNote)} · ${esc(c.dataType)}${c.unit ? ` (${esc(c.unit)})` : ""}</small>
                                          </label>
                                          <button type="button" class="btn sm" style="padding:2px 7px;min-height:24px" data-info-prop="${esc(c.id)}" title="項目詳細を見る">詳細</button>
                                        </div>
                                      `;
                                    }
                                    return `
                                      <div class="field-check-card">
                                        <input type="checkbox" id="chk-ext-${esc(c.id)}" data-chk-ext="${esc(c.id)}" ${checked ? "checked" : ""}>
                                        <label for="chk-ext-${esc(c.id)}">
                                          <strong>${esc(c.ja)} ${renderReqBadge(c.required)}</strong>
                                          <small class="mono">${esc(c.en)} · ${esc(c.dataType)}${c.unit ? ` (${esc(c.unit)})` : ""}</small>
                                        </label>
                                        <button type="button" class="btn sm" style="padding:2px 7px;min-height:24px" data-info-prop="${esc(c.id)}" title="項目詳細を見る">詳細</button>
                                      </div>
                                    `;
                                  })
                                  .join("")}
                              </div>
                            </div>`
                          : ""
                      }
                    </div>
                  `;
                })
                .join("")}
            </div>`
              : ""
          }

          <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border-light)">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px">
              <strong style="font-size:13.5px">架空サンプルデータ・プレビュー（${sampleData.length} 行 × 選択中 ${chosen.length} 列）</strong>
              <small style="color:var(--text-muted)"><code>FAC-001</code>〜<code>FAC-005</code> 等でテーブル間の主キー・外部キーが整合しています</small>
            </div>
            ${
              chosen.length > 0
                ? `<div class="data-table-wrap" style="max-height:360px;overflow-y:auto">
                    <table class="data-table" style="min-width:600px">
                      <thead>
                        <tr>
                          ${chosen
                            .map(
                              (c) => `<th>
                                <div>${esc(state.headerMode === "ja" ? c.ja : c.en)}</div>
                                ${state.headerMode !== "ja" ? `<div style="font-weight:400;color:#64748b;font-size:10.5px">${esc(c.ja)}</div>` : ""}
                              </th>`
                            )
                            .join("")}
                        </tr>
                      </thead>
                      <tbody>
                        ${sampleData
                          .map(
                            (row) => `<tr>${chosen.map((c) => `<td class="mono">${esc(row[c.en] ?? "")}</td>`).join("")}</tr>`
                          )
                          .join("")}
                      </tbody>
                    </table>
                  </div>`
                : `<div class="empty-box">出力する列を1つ以上チェックしてください。</div>`
            }
          </div>
        </section>

        <aside class="card" style="position:sticky;top:84px">
          <h3 style="margin:0 0 12px;font-size:15px">2. 出力オプション・ダウンロード</h3>

          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:6px;color:var(--navy-800)" for="hdr-mode-select">
            CSVヘッダー行の形式
          </label>
          <select id="hdr-mode-select" class="filter-select" style="width:100%;margin-bottom:12px">
            <option value="en" ${state.headerMode === "en" ? "selected" : ""}>英語カラム名（facilityId 等）推奨</option>
            <option value="ja" ${state.headerMode === "ja" ? "selected" : ""}>日本語項目名（施設ID 等）</option>
            <option value="both" ${state.headerMode === "both" ? "selected" : ""}>2段ヘッダー（1行目:英語 + 2行目:日本語）</option>
          </select>

          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:6px;color:var(--navy-800)" for="sample-cnt-select">
            架空サンプルの出力件数（ローカル生成）
          </label>
          <select id="sample-cnt-select" class="filter-select" style="width:100%;margin-bottom:14px">
            <option value="5" ${state.sampleCount === 5 ? "selected" : ""}>5件（標準シナリオ・全表PK/FK整合）</option>
            <option value="10" ${state.sampleCount === 10 ? "selected" : ""}>10件（標準5件＋ローカル自動拡張5件）</option>
            <option value="20" ${state.sampleCount === 20 ? "selected" : ""}>20件（標準5件＋ローカル自動拡張15件）</option>
          </select>

          <div class="spec-box" style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span>必須列（固定）</span><strong>${tbl.requiredCount} 列</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span>${tbl.isCommonClass ? "追加選択した推奨・任意列" : "追加選択した推奨列"}</span><strong>${baseChosen.length - tbl.requiredCount} 列</strong>
            </div>
            ${
              extGroups.length
                ? `<div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span>追加した共通クラス固有列</span><strong style="color:#0369a1">${extChosen.length} 列</strong>
                  </div>`
                : ""
            }
            <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border-light);padding-top:6px">
              <span>出力合計列数</span><strong style="color:var(--brand-primary);font-size:16px">${chosen.length} 列</strong>
            </div>
          </div>

          <div style="display:grid;gap:9px">
            <button type="button" class="btn primary" id="dl-empty-tpl" ${chosen.length === 0 ? "disabled" : ""}>⇩ 空のCSVテンプレートを出力</button>
            <button type="button" class="btn" id="dl-sample-csv" ${chosen.length === 0 ? "disabled" : ""}>⇩ 架空サンプルCSV（${sampleData.length}件）を出力</button>
            <button type="button" class="btn" id="dl-col-spec" ${chosen.length === 0 ? "disabled" : ""}>⇩ 選択列の項目定義書CSVを出力</button>
          </div>

          <p style="font-size:11.5px;color:var(--text-muted);margin:14px 0 0;line-height:1.6">
            外部AI通信を使わずブラウザ内のルールデータだけで出力します。UTF-8（BOM付き）のためExcelでそのまま開けます。
          </p>
        </aside>
      </div>
    `;

    $$("[data-bld-tbl]", container).forEach((b) =>
      b.addEventListener("click", () => {
        state.builderTableId = b.dataset.bldTbl;
        state.builderParentTableId = b.dataset.bldTbl;
        renderBuilder(container);
      })
    );

    $$("[data-bld-ext-jump]", container).forEach((b) =>
      b.addEventListener("click", () => {
        const clsId = b.dataset.bldExtJump;
        const pId = b.dataset.bldParent || "m_facilities";
        state.builderTableId = pId;
        state.builderParentTableId = pId;
        state.openExtClasses[clsId] = true;
        renderBuilder(container);
        const card = $(`#bld-ext-card-${clsId}`, container);
        card?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      })
    );

    $$("[data-bld-standalone]", container).forEach((b) =>
      b.addEventListener("click", () => {
        state.builderParentTableId = tbl.id;
        state.builderTableId = b.dataset.bldStandalone;
        renderBuilder(container);
      })
    );

    $("#bld-back-parent", container)?.addEventListener("click", () => {
      state.builderTableId = state.builderParentTableId || "m_facilities";
      renderBuilder(container);
    });

    $("#bld-sel-rec-only", container)?.addEventListener("click", () => {
      state.selectedCols[tbl.id].clear();
      tbl.columns.forEach((c) => {
        if (c.required === "推奨") state.selectedCols[tbl.id].add(c.id);
      });
      renderBuilder(container);
    });

    $("#bld-sel-all", container)?.addEventListener("click", () => {
      tbl.columns.forEach((c) => {
        if (c.required !== "必須") state.selectedCols[tbl.id].add(c.id);
      });
      renderBuilder(container);
    });

    $("#bld-clear-rec", container)?.addEventListener("click", () => {
      state.selectedCols[tbl.id].clear();
      if (tbl.isCommonClass && tbl.requiredCount === 0) {
        tbl.columns.forEach((c) => {
          if (c.required === "推奨") state.selectedCols[tbl.id].add(c.id);
        });
      }
      if (state.selectedExtCols[tbl.id]) {
        state.selectedExtCols[tbl.id].clear();
      }
      renderBuilder(container);
    });

    $("#bld-clear-all-ext", container)?.addEventListener("click", () => {
      state.selectedExtCols[tbl.id]?.clear();
      renderBuilder(container);
    });

    $$("[data-ext-toggle]", container).forEach((b) =>
      b.addEventListener("click", () => {
        const cid = b.dataset.extToggle;
        state.openExtClasses[cid] = !state.openExtClasses[cid];
        renderBuilder(container);
      })
    );

    $$("[data-ext-sel-rec]", container).forEach((b) =>
      b.addEventListener("click", () => {
        const cid = b.dataset.extSelRec;
        const grp = extGroups.find((g) => g.cls.id === cid);
        if (grp) {
          if (!state.selectedExtCols[tbl.id]) state.selectedExtCols[tbl.id] = new Set();
          grp.items.forEach((it) => {
            if (it.col.required === "必須" || it.col.required === "推奨") {
              if (it.linkedParentCol) {
                if (it.linkedParentCol.required !== "必須") {
                  state.selectedCols[tbl.id].add(it.linkedParentCol.id);
                }
              } else {
                state.selectedExtCols[tbl.id].add(it.col.id);
              }
            }
          });
          state.openExtClasses[cid] = true;
          renderBuilder(container);
        }
      })
    );

    $$("[data-ext-sel-all]", container).forEach((b) =>
      b.addEventListener("click", () => {
        const cid = b.dataset.extSelAll;
        const grp = extGroups.find((g) => g.cls.id === cid);
        if (grp) {
          if (!state.selectedExtCols[tbl.id]) state.selectedExtCols[tbl.id] = new Set();
          grp.items.forEach((it) => {
            if (it.linkedParentCol) {
              if (it.linkedParentCol.required !== "必須") {
                state.selectedCols[tbl.id].add(it.linkedParentCol.id);
              }
            } else {
              state.selectedExtCols[tbl.id].add(it.col.id);
            }
          });
          state.openExtClasses[cid] = true;
          renderBuilder(container);
        }
      })
    );

    $$("[data-ext-clear]", container).forEach((b) =>
      b.addEventListener("click", () => {
        const cid = b.dataset.extClear;
        const grp = extGroups.find((g) => g.cls.id === cid);
        if (grp && state.selectedExtCols[tbl.id]) {
          grp.extCols.forEach((c) => state.selectedExtCols[tbl.id].delete(c.id));
          renderBuilder(container);
        }
      })
    );

    $$("[data-chk-col]", container).forEach((chk) =>
      chk.addEventListener("change", (e) => {
        const pid = e.target.dataset.chkCol;
        if (e.target.checked) state.selectedCols[tbl.id].add(pid);
        else state.selectedCols[tbl.id].delete(pid);
        renderBuilder(container);
      })
    );

    $$("[data-chk-linked-parent]", container).forEach((chk) =>
      chk.addEventListener("change", (e) => {
        const pid = e.target.dataset.chkLinkedParent;
        if (e.target.checked) state.selectedCols[tbl.id].add(pid);
        else state.selectedCols[tbl.id].delete(pid);
        renderBuilder(container);
      })
    );

    $$("[data-chk-ext]", container).forEach((chk) =>
      chk.addEventListener("change", (e) => {
        const pid = e.target.dataset.chkExt;
        if (!state.selectedExtCols[tbl.id]) state.selectedExtCols[tbl.id] = new Set();
        if (e.target.checked) state.selectedExtCols[tbl.id].add(pid);
        else state.selectedExtCols[tbl.id].delete(pid);
        renderBuilder(container);
      })
    );

    $$("[data-info-prop]", container).forEach((b) =>
      b.addEventListener("click", () => openDrawer(b.dataset.infoProp))
    );

    $("#hdr-mode-select", container)?.addEventListener("change", (e) => {
      state.headerMode = e.target.value;
      renderBuilder(container);
    });

    $("#sample-cnt-select", container)?.addEventListener("change", (e) => {
      state.sampleCount = Number(e.target.value) || 5;
      renderBuilder(container);
    });

    $("#dl-empty-tpl", container)?.addEventListener("click", () => {
      if (!chosen.length) return;
      downloadFile(`${tbl.id}_template.csv`, toCsv(buildHeaderRows(chosen)));
    });

    $("#dl-sample-csv", container)?.addEventListener("click", () => {
      if (!chosen.length) return;
      const dataRows = sampleData.map((r) => chosen.map((c) => r[c.en] ?? ""));
      downloadFile(`${tbl.id}_sample_${sampleData.length}rows.csv`, toCsv([...buildHeaderRows(chosen), ...dataRows]));
    });

    $("#dl-col-spec", container)?.addEventListener("click", () => {
      if (!chosen.length) return;
      const specHeader = ["テーブル名", "内部管理ID", "日本語名", "英語名", "必須区分", "KEY", "データ型", "多重度", "単位", "関連クラス", "コードリスト名", "リストID", "説明", "特記"];
      const rows = chosen.map((c) => {
        const srcClsName = c.tableId !== tbl.id ? tableById.get(c.tableId)?.name || "" : "";
        return [
          tbl.id,
          c.id,
          c.ja,
          c.en,
          c.required,
          c.key,
          c.dataType,
          c.multiplicity,
          c.unit,
          c.relatedClass || srcClsName,
          c.listName,
          c.listId,
          c.desc,
          c.note,
        ];
      });
      downloadFile(`${tbl.id}_column_spec.csv`, toCsv([specHeader, ...rows]));
    });

    $("#dl-all-dict", container)?.addEventListener("click", () => {
      const specHeader = ["領域名", "テーブル和名", "物理テーブル名", "内部管理ID", "日本語名", "英語名", "必須区分", "KEY", "データ型", "多重度", "単位", "関連クラス", "コードリスト名", "リストID", "説明", "特記"];
      const allRows = [];
      for (const t of state.data.tables) {
        const d = domainById.get(t.domainId);
        for (const c of getChosenColumns(t.id)) {
          const srcClsName = c.tableId !== t.id ? tableById.get(c.tableId)?.name || "" : "";
          allRows.push([
            d?.name || "",
            t.name,
            t.id,
            c.id,
            c.ja,
            c.en,
            c.required,
            c.key,
            c.dataType,
            c.multiplicity,
            c.unit,
            c.relatedClass || srcClsName,
            c.listName,
            c.listId,
            c.desc,
            c.note,
          ]);
        }
      }
      downloadFile("facility_model_selected_all_tables_spec.csv", toCsv([specHeader, ...allRows]));
    });
  }

  // =========================================================================
  // 5. CODE LISTS & CONTROLLED VOCABULARY VIEW
  // =========================================================================
  function renderCodes(container) {
    const q = normSearch(state.codeQuery.trim());
    const filteredLists = state.data.codeLists.filter((cl) => {
      if (state.codeFilter === "used" && cl.usedBy.length === 0) return false;
      if (state.codeFilter === "コードリスト" && cl.category !== "コードリスト") return false;
      if (state.codeFilter === "統制語彙リスト" && cl.category !== "統制語彙リスト") return false;
      if (!q) return true;
      const inMeta = normSearch([cl.name, cl.enName, cl.id, cl.category].join(" ")).includes(q);
      if (inMeta) return true;
      return cl.items.some((it) => normSearch([it.code, it.ja, it.altJa, it.en, it.desc].join(" ")).includes(q));
    });

    if (!state.codeListId || !filteredLists.some((l) => l.id === state.codeListId)) {
      state.codeListId = filteredLists[0]?.id || state.data.codeLists[0]?.id || "";
    }
    const activeList = codeListById.get(state.codeListId);
    const iq = normSearch(state.codeItemQuery.trim());
    const matchedItems = activeList
      ? activeList.items.filter((it) =>
          !iq ? true : normSearch([it.code, it.altCode, it.ja, it.altJa, it.en, it.major, it.desc].join(" ")).includes(iq)
        )
      : [];
    const visibleItems = matchedItems.slice(0, 200);

    container.innerHTML = `
      ${pageHeadHtml(
        "codes",
        "CONTROLLED VOCABULARY & CODE DICTIONARY",
        "統制語彙・コード辞書",
        "基本データセットおよび共通クラスで用いるコードリスト・統制語彙の許容値と参照元項目を確認・CSV出力できます。",
        `<button type="button" class="btn" id="dl-all-raw-codes">⇩ 全コード定義CSVを一括出力</button>`
      )}

      <div class="codes-layout">
        <aside class="card" style="padding:14px">
          <input type="search" id="code-list-search" class="filter-input" style="width:100%;margin-bottom:8px"
            placeholder="リスト名・コード値・ラベルで検索" value="${esc(state.codeQuery)}" aria-label="コードリスト検索">
          <select id="code-list-filter" class="filter-select" style="width:100%">
            <option value="all" ${state.codeFilter === "all" ? "selected" : ""}>すべて表示（${state.data.codeLists.length}種）</option>
            <option value="used" ${state.codeFilter === "used" ? "selected" : ""}>データモデルで採用・参照中のみ</option>
            <option value="コードリスト" ${state.codeFilter === "コードリスト" ? "selected" : ""}>区分：コードリスト</option>
            <option value="統制語彙リスト" ${state.codeFilter === "統制語彙リスト" ? "selected" : ""}>区分：統制語彙リスト</option>
          </select>

          <div class="code-sidebar-list">
            ${
              filteredLists.length
                ? filteredLists
                    .map(
                      (cl) => `
                  <button type="button" class="code-list-btn ${cl.id === state.codeListId ? "active" : ""}" data-sel-clist="${esc(cl.id)}">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px">
                      <strong>${esc(cl.name)}</strong>
                      <span class="badge ${cl.usedBy.length ? "req" : ""}">${cl.count}件</span>
                    </div>
                    <small>${esc(cl.category)} · ${
                        cl.usedBy.length ? `参照項目 ${cl.usedBy.length}件` : "未参照（候補プール）"
                      }</small>
                  </button>`
                    )
                    .join("")
                : `<div class="empty-box">該当するリストがありません</div>`
            }
          </div>
        </aside>

        <section class="card">
          ${
            activeList
              ? `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;margin-bottom:14px">
              <div>
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
                  <span class="badge ${activeList.usedBy.length ? "req" : "rec"}">${esc(activeList.category)}</span>
                  <span class="mono" style="font-size:12px;color:var(--text-muted)">ID: ${esc(activeList.id)}</span>
                </div>
                <h2 style="margin:0;font-size:20px">${esc(activeList.name)} ${
                  activeList.enName ? `<span class="mono" style="font-size:14px;color:var(--text-muted)">(${esc(activeList.enName)})</span>` : ""
                }</h2>
                ${activeList.sourceSpec ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">参照規格・出典：${esc(activeList.sourceSpec)}</div>` : ""}
              </div>
              ${
                !activeList.isMunicipalityList
                  ? `<button type="button" class="btn primary" id="dl-this-clist">⇩ このリストをCSV出力</button>`
                  : ""
              }
            </div>

            <div class="callout" style="margin-bottom:16px">
              <strong>このリストを参照している項目（${activeList.usedBy.length}件）：</strong>
              ${
                activeList.usedBy.length
                  ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
                      ${activeList.usedBy
                        .map(
                          (u) =>
                            `<button type="button" class="btn sm" data-open-prop="${esc(u.propId)}">${
                              u.isCommon ? "◇ " : ""
                            }${esc(u.tableName || u.tableId)}.<strong>${esc(
                              u.ja
                            )}</strong> <span class="mono">(${esc(u.en)})</span></button>`
                        )
                        .join("")}
                    </div>`
                  : `<span style="color:var(--text-muted)">現在データモデルからの直接参照はありません（将来の拡張・候補語彙プール）。</span>`
              }
            </div>

            ${
              activeList.isMunicipalityList && matchedItems.length > visibleItems.length
                ? `<div class="callout warn">全国地方公共団体コード（該当 ${matchedItems.length} 団体）のうち先頭 ${visibleItems.length} 件を表示しています。下の検索欄で都道府県名・市区町村名・かな・コードで絞り込めます。</div>`
                : ""
            }

            <div class="filter-bar">
              <input type="search" id="code-item-filter" class="filter-input"
                placeholder="このリスト内の符号・日本語ラベル・かな・英語ラベル・説明で絞り込み"
                value="${esc(state.codeItemQuery)}" aria-label="コード値検索">
              <span style="font-size:12px;color:var(--text-muted);font-weight:700">${
                matchedItems.length > visibleItems.length ? `${visibleItems.length} / ${matchedItems.length}` : matchedItems.length
              } 件表示</span>
            </div>

            <div class="data-table-wrap">
              <table class="data-table" style="min-width:640px">
                <thead>
                  <tr>
                    <th style="width:130px">符号（コード値）</th>
                    <th style="width:190px">日本語ラベル</th>
                    <th style="width:170px">英語ラベル / 区分</th>
                    <th style="width:130px">分類</th>
                    <th>説明・備考</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    visibleItems.length
                      ? visibleItems
                          .map(
                            (it) => `
                        <tr>
                          <td class="mono"><strong>${esc(it.code || "—")}</strong>${
                              it.altCode ? `<div style="font-size:11px;color:var(--text-muted)">別案: ${esc(it.altCode)}</div>` : ""
                            }</td>
                          <td><strong>${esc(it.ja)}</strong>${
                              it.altJa ? `<div class="prop-alias">${esc(it.altJa)}</div>` : ""
                            }</td>
                          <td class="mono">${esc(it.en || "—")}</td>
                          <td>${esc([it.major, it.middle].filter(Boolean).join(" / ") || "—")}</td>
                          <td>
                            <div>${esc(it.desc || "—")}</div>
                            ${it.note ? `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">※ ${esc(it.note)}</div>` : ""}
                          </td>
                        </tr>`
                          )
                          .join("")
                      : `<tr><td colspan="5" class="empty-box">一致するコード値がありません</td></tr>`
                  }
                </tbody>
              </table>
            </div>
          `
              : `<div class="empty-box">左の一覧からコードリストを選択してください</div>`
          }
        </section>
      </div>
    `;

    bindLiveSearchInput(
      $("#code-list-search", container),
      () => state.codeQuery,
      (val) => {
        state.codeQuery = val;
        renderCodes(container);
      },
      () => $("#code-list-search", container)
    );

    $("#code-list-filter", container)?.addEventListener("change", (e) => {
      state.codeFilter = e.target.value;
      renderCodes(container);
    });

    $$("[data-sel-clist]", container).forEach((b) =>
      b.addEventListener("click", () => {
        state.codeListId = b.dataset.selClist;
        state.codeItemQuery = "";
        renderCodes(container);
      })
    );

    bindLiveSearchInput(
      $("#code-item-filter", container),
      () => state.codeItemQuery,
      (val) => {
        state.codeItemQuery = val;
        renderCodes(container);
      },
      () => $("#code-item-filter", container)
    );

    $$("[data-open-prop]", container).forEach((b) =>
      b.addEventListener("click", () => openDrawer(b.dataset.openProp))
    );

    $("#dl-this-clist", container)?.addEventListener("click", () => {
      if (!activeList) return;
      const cols = state.data.rawCodeColumns;
      const rows = state.data.rawCodes.filter((r) => r["コードリストID"] === activeList.id);
      downloadFile(`codelist_${activeList.name}.csv`, toCsv([cols, ...rows.map((r) => cols.map((c) => r[c]))]));
    });

    $("#dl-all-raw-codes", container)?.addEventListener("click", () => {
      const cols = state.data.rawCodeColumns;
      downloadFile("施設管理コード定義_全件.csv", toCsv([cols, ...state.data.rawCodes.map((r) => cols.map((c) => r[c]))]));
    });
  }

  // =========================================================================
  // SLIDE-OVER ITEM DETAIL DRAWER
  // =========================================================================
  const REL_TYPE_LABELS = {
    exact: { cls: "rel-exact", text: "完全一致 (exact)" },
    close: { cls: "rel-close", text: "近似一致 (close)" },
    narrow: { cls: "rel-narrow", text: "狭義語 (narrow)" },
    broad: { cls: "rel-broad", text: "広義語 (broad)" },
    related: { cls: "rel-related", text: "関連語 (related)" },
  };

  function openDrawer(propId) {
    if (!propById.has(propId)) return;
    state.drawerPropId = propId;
    state.drawerCodeFilter = "";
    $("#drawer-backdrop")?.classList.remove("hidden");
    $("#detail-drawer")?.classList.remove("hidden");
    renderDrawerContent();
  }

  function closeDrawer() {
    state.drawerPropId = null;
    $("#drawer-backdrop")?.classList.add("hidden");
    $("#detail-drawer")?.classList.add("hidden");
  }

  function renderDrawerContent() {
    const host = $("#drawer-content");
    if (!host || !state.drawerPropId) return;
    const col = propById.get(state.drawerPropId);
    const tbl = tableById.get(col.tableId);
    const dom = domainById.get(tbl.domainId);
    const drawerCols = getExplorerOrderedColumns(tbl);
    const idx = drawerCols.findIndex((c) => c.id === col.id);
    const prevCol = idx > 0 ? drawerCols[idx - 1] : null;
    const nextCol = idx < drawerCols.length - 1 ? drawerCols[idx + 1] : null;

    const clist = col.listId ? codeListById.get(col.listId) : null;
    const relClassObj = col.relatedClassId ? tableById.get(col.relatedClassId) : null;
    const dq = normSearch(state.drawerCodeFilter.trim());
    const previewCodes = clist
      ? clist.items.filter((it) =>
          !dq ? true : normSearch([it.code, it.ja, it.altJa, it.en, it.desc].join(" ")).includes(dq)
        )
      : [];

    const aliases = [
      ...(col.altJa ? col.altJa.split(",").map((s) => s.trim()).filter(Boolean) : []),
      ...(col.altEn ? col.altEn.split(",").map((s) => s.trim()).filter(Boolean) : []),
    ];

    host.innerHTML = `
      <header class="drawer-header" style="--dom-color:${esc(dom.color)}">
        <div class="drawer-top-actions">
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
            <span class="domain-code-badge" style="background:${esc(dom.bg)};color:${esc(dom.color)};border:1px solid ${esc(dom.border)}">
              ${esc(dom.code)} ${esc(dom.name)}
            </span>
            <button type="button" class="btn sm" id="drw-open-table">${esc(tbl.name)} (${idx + 1}/${tbl.columns.length})</button>
          </div>
          <div style="display:flex;gap:5px">
            <button type="button" class="btn sm" id="drw-prev" ${prevCol ? "" : "disabled"} title="前の項目">◀ 前</button>
            <button type="button" class="btn sm" id="drw-next" ${nextCol ? "" : "disabled"} title="次の項目">次 ▶</button>
            <button type="button" class="btn sm" id="drw-close" aria-label="閉じる">✕ 閉じる</button>
          </div>
        </div>
        <div style="display:flex;gap:7px;align-items:center;margin-top:6px;flex-wrap:wrap">
          <span class="mono" style="font-weight:800;color:var(--text-muted)">${esc(col.id)}</span>
          ${renderReqBadge(col.required)}
          ${renderKeyBadge(col)}
          ${col.section ? `<span class="meta-chip">${esc(col.section)}</span>` : ""}
        </div>
        <h2>${esc(col.ja)}</h2>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap">
          <code class="mono" style="font-size:14px;font-weight:700;color:var(--brand-primary)">${esc(col.en)}</code>
          <button type="button" class="btn sm" style="padding:2px 8px;min-height:24px" id="drw-copy-en">英語名をコピー</button>
          <button type="button" class="btn sm" style="padding:2px 8px;min-height:24px" id="drw-copy-id">IDをコピー</button>
        </div>
      </header>

      <div class="drawer-body">
        ${
          col.fkTarget
            ? `<div class="fk-jump-box">
                <div>
                  <strong style="color:#5b21b6;display:block">外部キー参照（${esc(col.fkTarget.cardinality)}）：${esc(col.fkTarget.label)}</strong>
                  <span style="font-size:12px;color:var(--text-body)">${esc(col.fkTarget.plainCardinality || "")}</span><br>
                  <span class="mono" style="font-size:11.5px;color:var(--text-muted)">参照先: ${esc(col.fkTarget.toTable)}.${esc(col.fkTarget.toCol)}</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button type="button" class="btn sm" id="drw-jump-parent-prop">親PK項目を見る</button>
                  <button type="button" class="btn sm primary" id="drw-jump-er">ER関連図で確認</button>
                </div>
              </div>`
            : ""
        }

        ${
          relClassObj
            ? `<div class="fk-jump-box" style="background:#f0f9ff;border-color:#bae6fd">
                <div>
                  <strong style="color:#0369a1;display:block">◇ 対応する共通クラス：${esc(relClassObj.name)}（${esc(relClassObj.classEn)}）</strong>
                  <span style="font-size:12px;color:var(--text-body)">${esc(relClassObj.roleNote || "")}（全 ${relClassObj.columns.length} 属性）</span>
                </div>
                <div style="display:flex;gap:6px">
                  <button type="button" class="btn sm" id="drw-popup-relclass">ポップアップ表示</button>
                  <button type="button" class="btn sm primary" id="drw-jump-relclass">共通クラス定義を開く →</button>
                </div>
              </div>`
            : ""
        }

        <div class="spec-grid">
          <div class="spec-box">
            <span>データ型</span>
            <strong>${esc(col.dataType)}</strong>
          </div>
          <div class="spec-box">
            <span>多重度（値の入り方）</span>
            <strong><span class="mono">[${esc(col.multiplicity || "—")}]</span></strong>
            <small style="color:var(--text-muted);font-size:11px">${esc(explainPropMultiplicity(col.multiplicity))}</small>
          </div>
          <div class="spec-box">
            <span>単位</span>
            <strong>${esc(col.unit || "—（単位指定なし）")}</strong>
          </div>
          <div class="spec-box">
            <span>正規表現パターン</span>
            <strong class="mono">${esc(col.pattern || "—")}</strong>
          </div>
        </div>

        <div class="callout">
          <strong>定義・説明：</strong><br>${esc(col.desc || "—")}
        </div>
        ${
          col.note
            ? `<div class="callout warn">
                <strong>実装・運用上の特記：</strong><br>${esc(col.note)}
              </div>`
            : ""
        }
        ${
          col.refUrl || col.refUrl2
            ? `<div style="font-size:12px;color:var(--text-muted);margin-top:6px">
                参考URI：<span class="mono">${esc([col.refUrl, col.refUrl2].filter(Boolean).join(" , "))}</span>
              </div>`
            : ""
        }

        <section class="drawer-section">
          <h3>
            <span>同義語・別名・表記ゆれ辞書</span>
            <span class="badge">${col.synonyms.length} 件登録</span>
          </h3>
          ${
            aliases.length
              ? `<div class="syn-tag-list">${aliases.map((a) => `<span class="syn-chip">${esc(a)}</span>`).join("")}</div>`
              : ""
          }
          ${
            col.synonyms.length
              ? `<div class="data-table-wrap">
                  <table class="data-table" style="min-width:460px">
                    <thead>
                      <tr>
                        <th>同義語・表記例</th>
                        <th>対応関係</th>
                        <th>適用範囲・出典</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${col.synonyms
                        .map((s) => {
                          const rt = REL_TYPE_LABELS[s.relation] || { cls: "rel-related", text: s.relation || "—" };
                          return `<tr>
                            <td><strong>${esc(s.term)}</strong> <small style="color:var(--text-muted)">(${esc(s.lang)})</small></td>
                            <td><span class="rel-type-badge ${rt.cls}">${esc(rt.text)}</span></td>
                            <td style="font-size:11.5px">
                              <div>${esc(s.scope || "—")}</div>
                              ${s.source ? `<div style="color:var(--text-muted)">出典: ${esc(s.source)}</div>` : ""}
                            </td>
                          </tr>`;
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>`
              : `<div style="font-size:12.5px;color:var(--text-muted)">詳細同義語辞書の個別エントリはありません。</div>`
          }
        </section>

        <section class="drawer-section">
          <h3>
            <span>参照コードリスト・統制語彙</span>
            ${
              clist
                ? `<button type="button" class="btn sm" id="drw-popup-codelist">大きくポップアップ表示</button>`
                : ""
            }
          </h3>
          ${
            clist
              ? `
                <div style="margin-bottom:10px;font-size:12.5px">
                  リスト名：<strong>${esc(clist.name)}</strong>（${esc(clist.category)} · 全 ${clist.count} 件）<br>
                  <span class="mono" style="font-size:11px;color:var(--text-muted)">リストID: ${esc(clist.id)}</span>
                </div>
                ${
                  clist.items.length > 8
                    ? `<input type="search" id="drw-code-filter" class="filter-input" style="width:100%;margin-bottom:8px"
                        placeholder="コード値・ラベルで絞り込み" value="${esc(state.drawerCodeFilter)}">`
                    : ""
                }
                <div class="data-table-wrap" style="max-height:280px;overflow-y:auto">
                  <table class="data-table" style="min-width:440px">
                    <thead>
                      <tr>
                        <th>符号</th>
                        <th>日本語ラベル</th>
                        <th>英語ラベル</th>
                        <th>説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${previewCodes
                        .slice(0, 60)
                        .map(
                          (it) => `<tr>
                            <td class="mono"><strong>${esc(it.code || "—")}</strong></td>
                            <td><strong>${esc(it.ja)}</strong></td>
                            <td class="mono">${esc(it.en || "—")}</td>
                            <td style="font-size:11.5px">${esc(it.desc || "—")}</td>
                          </tr>`
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `
              : col.listName
              ? `<div style="font-size:12.5px;color:var(--text-body)">外部標準コード体系（<strong>${esc(col.listName)}</strong>）を参照します。</div>`
              : `<div style="font-size:12.5px;color:var(--text-muted)">この項目に紐づくコードリスト・統制語彙指定はありません（自由記述または数値・日付型）。</div>`
          }
        </section>
      </div>
    `;

    $("#drw-close", host)?.addEventListener("click", closeDrawer);
    $("#drw-prev", host)?.addEventListener("click", () => prevCol && openDrawer(prevCol.id));
    $("#drw-next", host)?.addEventListener("click", () => nextCol && openDrawer(nextCol.id));
    $("#drw-copy-en", host)?.addEventListener("click", () => copyText(col.en, "英語カラム名をコピー"));
    $("#drw-copy-id", host)?.addEventListener("click", () => copyText(col.id, "内部管理IDをコピー"));
    $("#drw-open-table", host)?.addEventListener("click", () => {
      closeDrawer();
      navigate("explorer", { tableId: tbl.id });
    });
    $("#drw-jump-parent-prop", host)?.addEventListener("click", () => {
      if (col.fkTarget?.toProp) openDrawer(col.fkTarget.toProp);
    });
    $("#drw-jump-er", host)?.addEventListener("click", () => {
      const relId = col.fkTarget?.relationId;
      closeDrawer();
      navigate("relations", { erSelectRel: relId });
    });
    $("#drw-popup-relclass", host)?.addEventListener("click", () => {
      if (relClassObj) openClassModal(relClassObj.id);
    });
    $("#drw-jump-relclass", host)?.addEventListener("click", () => {
      if (relClassObj) {
        closeDrawer();
        navigate("explorer", { tableId: relClassObj.id });
      }
    });
    $("#drw-popup-codelist", host)?.addEventListener("click", () => {
      openCodeModal(clist.id);
    });
    bindLiveSearchInput(
      $("#drw-code-filter", host),
      () => state.drawerCodeFilter,
      (val) => {
        state.drawerCodeFilter = val;
        renderDrawerContent();
      },
      () => $("#drw-code-filter", $("#drawer-content"))
    );
  }

  // =========================================================================
  // GLOBAL SEARCH DROPDOWN (Includes Tables, Common Classes, Properties & Codes)
  // =========================================================================
  function setupGlobalSearch() {
    const input = $("#global-search-input");
    const box = $("#global-search-results");
    if (!input || !box) return;

    function closeSearch() {
      box.classList.add("hidden");
    }

    input.addEventListener("input", () => {
      const q = normSearch(input.value.trim());
      if (!q) {
        closeSearch();
        return;
      }

      const allSheets = [...state.data.tables, ...(state.data.commonClasses || [])];
      const tableHits = allSheets
        .filter((t) =>
          normSearch([t.name, t.id, t.classEn, t.classSynonymsJa, t.description, t.roleNote].join(" ")).includes(q)
        )
        .slice(0, 6);

      const propHits = [];
      for (const t of allSheets) {
        for (const c of t.columns) {
          const direct = normSearch([c.id, c.ja, c.en, c.altJa, c.altEn, c.desc, c.relatedClass].join(" ")).includes(q);
          const matchedSyn = c.synonyms.find((s) => normSearch(s.term).includes(q));
          if (direct || matchedSyn) {
            propHits.push({ col: c, tbl: t, synTerm: matchedSyn?.term || "" });
            if (propHits.length >= 10) break;
          }
        }
        if (propHits.length >= 10) break;
      }

      const codeHits = [];
      for (const cl of state.data.codeLists) {
        const nameMatch = normSearch([cl.name, cl.enName].join(" ")).includes(q);
        const itemMatch = cl.items.find((it) => normSearch([it.code, it.ja, it.altJa, it.en].join(" ")).includes(q));
        if (nameMatch || itemMatch) {
          codeHits.push({ cl, itemLabel: itemMatch ? `${itemMatch.code ? itemMatch.code + ": " : ""}${itemMatch.ja}` : "" });
          if (codeHits.length >= 5) break;
        }
      }

      if (!tableHits.length && !propHits.length && !codeHits.length) {
        box.innerHTML = `<div class="empty-box" style="padding:18px">「${esc(input.value)}」に一致する項目・テーブル・共通クラス・コードが見つかりません</div>`;
        box.classList.remove("hidden");
        return;
      }

      let html = "";
      if (propHits.length) {
        html += `<div class="search-cat-label">項目定義（クリックで詳細ドロワー表示）</div>`;
        html += propHits
          .map(({ col, tbl, synTerm }) => {
            const dom = domainById.get(tbl.domainId);
            return `<button type="button" class="search-hit" data-gs-prop="${esc(col.id)}">
              <div class="search-hit-main">
                <strong>${esc(col.ja)} <span class="mono" style="font-weight:600;color:var(--text-muted)">(${esc(col.en)})</span></strong>
                <small>${esc(dom?.code || "")} ${esc(tbl.name)} · ${esc(col.id)}${
              synTerm ? ` · <span style="color:#1d4ed8">同義語一致: ${esc(synTerm)}</span>` : ""
            }</small>
              </div>
              ${renderReqBadge(col.required)}
            </button>`;
          })
          .join("");
      }
      if (tableHits.length) {
        html += `<div class="search-cat-label">テーブル・共通クラス定義</div>`;
        html += tableHits
          .map(
            (t) => `<button type="button" class="search-hit" data-gs-tbl="${esc(t.id)}">
              <div class="search-hit-main">
                <strong>${t.isCommonClass ? "◇ " : ""}${esc(t.name)} <span class="mono">(${esc(t.classEn)})</span></strong>
                <small>${esc(t.roleNote)}</small>
              </div>
              <span class="badge ${t.isCommonClass ? "opt" : ""}">${t.columns.length}項目</span>
            </button>`
          )
          .join("");
      }
      if (codeHits.length) {
        html += `<div class="search-cat-label">統制語彙・コードリスト（クリックでポップアップ表示）</div>`;
        html += codeHits
          .map(
            ({ cl, itemLabel }) => `<button type="button" class="search-hit" data-gs-code="${esc(cl.id)}">
              <div class="search-hit-main">
                <strong>⌗ ${esc(cl.name)}</strong>
                <small>${esc(cl.category)}${itemLabel ? ` · 値一致: ${esc(itemLabel)}` : ""}</small>
              </div>
              <span class="badge">${cl.count}件</span>
            </button>`
          )
          .join("");
      }

      box.innerHTML = html;
      box.classList.remove("hidden");

      $$("[data-gs-prop]", box).forEach((b) =>
        b.addEventListener("click", () => {
          closeSearch();
          openDrawer(b.dataset.gsProp);
        })
      );
      $$("[data-gs-tbl]", box).forEach((b) =>
        b.addEventListener("click", () => {
          closeSearch();
          navigate("explorer", { tableId: b.dataset.gsTbl });
        })
      );
      $$("[data-gs-code]", box).forEach((b) =>
        b.addEventListener("click", () => {
          closeSearch();
          openCodeModal(b.dataset.gsCode);
        })
      );
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#global-search-wrap")) closeSearch();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        input.focus();
      } else if (e.key === "Escape") {
        if (!box.classList.contains("hidden")) closeSearch();
        else if (state.modalCodeListId) closeCodeModal();
        else if (state.modalClassId) closeClassModal();
        else if (state.drawerPropId) closeDrawer();
      }
    });
  }

  // =========================================================================
  // MAIN RENDER & BOOTSTRAP
  // =========================================================================
  function renderMain() {
    const main = $("#app-main");
    if (!main || !state.data) return;
    if (state.view === "overview") renderOverview(main);
    else if (state.view === "relations") renderRelations(main);
    else if (state.view === "explorer") renderExplorer(main);
    else if (state.view === "builder") renderBuilder(main);
    else if (state.view === "codes") renderCodes(main);
  }

  function initData(payload) {
    state.data = payload;
    payload.domains.forEach((d) => domainById.set(d.id, d));

    const commonClasses = payload.commonClasses || [];
    const cSec = payload.ui?.commonSection || {};
    if (commonClasses.length) {
      domainById.set("common", {
        id: "common",
        code: "共通",
        name: cSec.name || "共通クラス",
        shortName: cSec.shortName || "共通クラス",
        color: "#0284c7",
        bg: "#f0f9ff",
        border: "#bae6fd",
        summary: cSec.summary || "",
        tables: commonClasses.map((c) => c.id),
        isCommonDomain: true,
      });
    }

    payload.tables.forEach((t) => {
      tableById.set(t.id, t);
      state.selectedCols[t.id] = new Set();
      if (BUILDER_COMMON_EXTS[t.id]) {
        state.selectedExtCols[t.id] = new Set();
      }
      t.columns.forEach((c) => propById.set(c.id, c));
    });
    commonClasses.forEach((c) => {
      commonById.set(c.id, c);
      tableById.set(c.id, c);
      state.selectedCols[c.id] = new Set(
        c.requiredCount === 0 ? c.columns.filter((col) => col.required === "推奨").map((col) => col.id) : []
      );
      c.columns.forEach((col) => propById.set(col.id, col));
    });

    (payload.classDiagrams || []).forEach((g) => diagramById.set(g.id, g));
    payload.codeLists.forEach((cl) => codeListById.set(cl.id, cl));

    state.codeListId = payload.codeLists[0]?.id || "";
    if (payload.domains[0]) {
      state.domainId = payload.domains[0].id;
      state.tableId = payload.domains[0].tables[0];
      state.builderTableId = state.tableId;
      state.erSelectedId = state.tableId;
    }

    applyBranding();
    renderSidebarDomains();
    setupGlobalSearch();

    $$("#main-nav .nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.dataset.view));
    });
    $("#drawer-backdrop")?.addEventListener("click", closeDrawer);
    $("#code-modal-backdrop")?.addEventListener("click", closeCodeModal);
    $("#class-modal-backdrop")?.addEventListener("click", closeClassModal);

    updateChrome();
    renderMain();
  }

  try {
    if (globalThis.STUDIO_MODEL && Array.isArray(globalThis.STUDIO_MODEL.tables)) {
      initData(globalThis.STUDIO_MODEL);
    } else {
      fetch("./data/model.json")
        .then((r) => r.json())
        .then(initData)
        .catch((err) => {
          $("#app-main").innerHTML = `<div class="card"><strong style="color:#be123c">データ読込エラー：</strong>${esc(
            err.message
          )}<p>直接開く場合は <code>dist/standalone.html</code> をご利用ください。</p></div>`;
        });
    }
  } catch (err) {
    const m = $("#app-main");
    if (m) m.innerHTML = `<div class="card">初期化エラー: ${esc(err.message)}</div>`;
  }
})();
