"""Build the static data bundle and standalone HTML for 施設管理データ標準化スタジオ v2.0."""

import base64
import csv
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCES = ROOT / "06_データモデルCSV"
CLASS_DOCS_DIR_NAME = "07_論理クラス図" if (ROOT / "07_論理クラス図").exists() else "02_クラス図"
CLASS_DOCS_DIR = ROOT / CLASS_DOCS_DIR_NAME
APP_DIR = Path(__file__).resolve().parent
UI_TEXTS_PATH = APP_DIR / "ui_texts.json"
DIST = APP_DIR / "dist"
DATA_DIR = DIST / "data"


def sha256_source(source: str) -> str:
    digest = hashlib.sha256(source.encode("utf-8")).digest()
    return "'sha256-" + base64.b64encode(digest).decode("ascii") + "'"


def read_csv(name: str) -> list[dict]:
    with (SOURCES / name).open("r", encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def load_ui_texts() -> dict:
    if UI_TEXTS_PATH.exists():
        return json.loads(UI_TEXTS_PATH.read_text(encoding="utf-8"))
    return {}


def classify_facility_group(prop_id: str) -> str:
    """Group the columns of m_facilities into clear semantic sections for readability."""
    num_str = "".join(ch for ch in prop_id.split("_")[-1] if ch.isdigit())
    n = int(num_str) if num_str else 0
    if n <= 6 or n in (17, 18, 19):
        return "識別・名称・概要"
    if 7 <= n <= 16:
        return "所在地・連絡先・位置座標"
    if 20 <= n <= 29:
        return "分類・運営体制・開館スケジュール"
    if 30 <= n <= 46:
        return "建築・敷地・構造・耐震スペック"
    return "付帯設備・画像・管理メタ情報"


BASE_DOMAINS = [
    {
        "id": "facility",
        "code": "01",
        "name": "施設基本",
        "shortName": "施設基本",
        "color": "#1d4ed8",
        "bg": "#eff6ff",
        "border": "#bfdbfe",
        "summary": "全データの起点となる施設台帳。名称、所在地、運営方式、建築・耐震情報などを管理します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/01_施設基本_クラス図.md",
        "tables": ["m_facilities"],
    },
    {
        "id": "equipment",
        "code": "02",
        "name": "設備・機器",
        "shortName": "設備・機器",
        "color": "#0f766e",
        "bg": "#f0fdfa",
        "border": "#99f6e4",
        "summary": "空調・昇降機・発電機などの保有台数（設備マスタ）と、機器1台ごとの個体情報を管理します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/02_設備_クラス図.md",
        "tables": ["m_facility_equipments", "m_facility_equipment_units"],
    },
    {
        "id": "finance",
        "code": "03",
        "name": "収支・コスト履歴",
        "shortName": "収支・コスト",
        "color": "#4338ca",
        "bg": "#eef2ff",
        "border": "#c7d2fe",
        "summary": "年度ごとの運営収支（収入・維持管理費・減価償却費）と、改修・更新などの投資費用を管理します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/03_収支・コスト履歴_クラス図.md",
        "tables": ["t_financial_results", "t_asset_cost_records"],
    },
    {
        "id": "maintenance",
        "code": "04",
        "name": "点検・修繕履歴",
        "shortName": "点検・修繕",
        "color": "#b45309",
        "bg": "#fffbeb",
        "border": "#fde68a",
        "summary": "部位ごとの点検・診断・修繕の計画と実績、および劣化度・健全度評価を記録します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/04_点検・修繕履歴_クラス図.md",
        "tables": ["t_maintenance_histories"],
    },
    {
        "id": "usage",
        "code": "05",
        "name": "利用状況・稼働履歴",
        "shortName": "利用状況・稼働",
        "color": "#15803d",
        "bg": "#f0fdf4",
        "border": "#bbf7d0",
        "summary": "開館日数・利用者数などの稼働実績と、利用者1人あたり・面積あたりのコスト指標を記録します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/05_利用状況・稼働履歴_クラス図.md",
        "tables": ["t_usage_histories"],
    },
    {
        "id": "disaster",
        "code": "06",
        "name": "防災拠点・避難状況",
        "shortName": "防災拠点",
        "color": "#be123c",
        "bg": "#fff1f2",
        "border": "#fecdd3",
        "summary": "平常時の避難所スペック・非常用設備と、災害時の開設状況・避難者数・備蓄残量を管理します。",
        "classDoc": f"{CLASS_DOCS_DIR_NAME}/06_防災拠点_クラス図.md",
        "tables": ["m_disaster_bases", "t_disaster_status_histories"],
    },
]

BASE_TABLE_META = {
    "m_facilities": {
        "name": "施設基本マスタ",
        "classEn": "Facility",
        "domainId": "facility",
        "classId": "CLASS_FAC",
        "nature": "静的マスタ",
        "rowUnit": "1施設につき1行（併設施設は「関連施設ID」で紐づけ）",
        "roleNote": "全データから参照される中心台帳",
        "description": "自治体が保有・管理する公共施設の基本台帳です。名称・所在地・緯度経度、所管部署・指定管理者などの運営体制、建築年・構造・延床面積・耐震状況などを1施設1行で保持します。",
    },
    "m_facility_equipments": {
        "name": "設備マスタ",
        "classEn": "Equipment",
        "domainId": "equipment",
        "classId": "CLASS_EQP",
        "nature": "静的マスタ",
        "rowUnit": "1施設 × 設備種別（設置エリア）ごとに1行",
        "roleNote": "設備の種類・設置場所・保有台数を管理",
        "description": "施設に備わる空調・昇降機・受変電・発電設備などを、種類・設置場所単位で数量管理するマスタです。",
    },
    "m_facility_equipment_units": {
        "name": "設備個体マスタ",
        "classEn": "EquipmentUnit",
        "domainId": "equipment",
        "classId": "CLASS_EQU",
        "nature": "静的マスタ",
        "rowUnit": "個別管理する機器1台につき1行",
        "roleNote": "1台ごとの機器構成・設置日を個別管理",
        "description": "設備マスタの内訳として、1号機・2号機など1台ずつ設置日や更新時期を追跡したい主要機器を登録します。",
    },
    "t_financial_results": {
        "name": "収支履歴",
        "classEn": "FinancialResult",
        "domainId": "finance",
        "classId": "CLASS_FIN",
        "nature": "動的履歴（年度実績）",
        "rowUnit": "1施設 × 1会計年度につき1行",
        "roleNote": "年度ごとの運営収支・減価償却費を記録",
        "description": "施設ごとの年間収入、光熱水費・維持管理費・修繕費・人件費などの現金支出、減価償却費を含めた総コストを年度単位で記録します。",
    },
    "t_asset_cost_records": {
        "name": "資産費用記録",
        "classEn": "AssetCostRecord",
        "domainId": "finance",
        "classId": "CLASS_ACR",
        "nature": "動的履歴（計画/見積/実績）",
        "rowUnit": "投資・改修などの費用計上1件につき1行",
        "roleNote": "新築・改修・除却費を計画〜実績で管理",
        "description": "新築取得・大規模改修・設備更新・除却などの費用を「計画・見積・実績」の段階別に記録し、中長期保全やLCC算定に活用します。",
    },
    "t_maintenance_histories": {
        "name": "点検・修繕履歴",
        "classEn": "MaintenanceHistory",
        "domainId": "maintenance",
        "classId": "CLASS_MNT",
        "nature": "動的履歴（計画/実績）",
        "rowUnit": "1回の点検・診断・修繕（予定または実施）につき1行",
        "roleNote": "部位別の点検・修繕の予定と結果・健全度を記録",
        "description": "屋根・外壁・空調・電気などの部位ごとに、点検や修繕の計画・実績、劣化度スコア、総合健全度ステータスを記録します。",
    },
    "t_usage_histories": {
        "name": "利用状況・稼働履歴",
        "classEn": "UsageHistory",
        "domainId": "usage",
        "classId": "CLASS_USG",
        "nature": "動的履歴（期間集計）",
        "rowUnit": "1施設 × 集計期間（年度・月次等）につき1行",
        "roleNote": "開館日数・利用者数・単位あたりコストを記録",
        "description": "期間ごとの開館日数・総利用者数・利用件数と、1日あたり・利用者1人あたり・延床面積1㎡あたりのコスト指標を集計します。",
    },
    "m_disaster_bases": {
        "name": "防災拠点マスタ",
        "classEn": "DisasterBase",
        "domainId": "disaster",
        "classId": "CLASS_DIS",
        "nature": "静的マスタ",
        "rowUnit": "防災拠点に指定された1施設につき1行",
        "roleNote": "平常時の避難所区分・収容人数・防災設備を管理",
        "description": "指定避難所や福祉避難所などの役割を持つ施設について、想定収容人数や非常用電源・受水槽・備蓄倉庫・トイレ設備の有無を管理します。",
    },
    "t_disaster_status_histories": {
        "name": "防災・避難状況履歴",
        "classEn": "DisasterStatusHistory",
        "domainId": "disaster",
        "classId": "CLASS_DST",
        "nature": "動的履歴（時系列報告）",
        "rowUnit": "1防災拠点 × 1時点の状況報告につき1行",
        "roleNote": "災害時の開設状況・避難者数・備蓄・ライフラインを記録",
        "description": "発災時の開設状況・受入可否、避難者数内訳、食料・水・毛布の残量、電気・水道・ガス・通信の稼働状況を時系列で記録します。",
    },
}

BASE_COMMON_META = {
    "pd_building": {
        "name": "建物",
        "classEn": "Building",
        "nature": "構成要素クラス（棟情報）",
        "rowUnit": "施設を構成する建物（棟）1棟につき1行（施設IDで親施設に紐づけ）",
        "roleNote": "棟単位の建築構造・面積・階数・耐震スペック",
        "description": "1つの施設に複数棟が存在する場合や、棟ごとに構造・建築年・延床面積・耐震状況を管理するためのクラスです。",
    },
    "pd_land": {
        "name": "土地",
        "classEn": "Land",
        "nature": "構成要素クラス（敷地情報）",
        "roleNote": "敷地面積・用途地域・土地利用分類を管理",
        "description": "施設が立地する敷地の面積、都市計画上の用途地域、土地利用分類および境界空間情報を表すクラスです。",
    },
    "pd_address": {
        "name": "住所",
        "classEn": "Address",
        "nature": "共通クラス（GIF準拠）",
        "roleNote": "GIF準拠の所在地・町字・地番・郵便番号構造",
        "description": "全国地方公共団体コード、都道府県・市区町村・町名・番地・建物名、郵便番号などを構造化して表現する共通クラスです。",
    },
    "pd_contact_point": {
        "name": "連絡先",
        "classEn": "ContactPoint",
        "nature": "共通クラス（GIF準拠）",
        "roleNote": "電話番号・メール・Web・窓口対応時間",
        "description": "施設の代表電話・FAX・メールアドレス・WebサイトURLおよび連絡可能スケジュールを保持する共通クラスです。",
    },
    "schedule": {
        "name": "スケジュール",
        "classEn": "Schedule",
        "nature": "共通クラス（GIF準拠）",
        "roleNote": "開館曜日・利用可能時間・休館日条件",
        "description": "開館曜日、開始・終了時刻、休館日や期間条件などの営業・利用スケジュールを表現する共通クラスです。",
    },
    "related_organization": {
        "name": "関連組織情報型",
        "classEn": "RelatedOrganization",
        "nature": "共通クラス（組織・役割履歴）",
        "roleNote": "所管部署・指定管理者・保守事業者の役割と期間",
        "description": "施設の所管部署・運営団体・保守点検事業者などの組織名称、法人番号、役割区分、関与期間を履歴管理する構造型です（基本データセットでは文字列項目として簡略表現し、詳細クラス図で本クラスへ展開します）。",
    },
    "parking_facility": {
        "name": "駐車場",
        "classEn": "ParkingFacility",
        "nature": "付帯設備クラス",
        "roleNote": "駐車場種別・収容台数・利用条件",
        "description": "施設付帯の駐車場名称、種別、普通車等の収容台数、利用料金や制限事項を表現する共通クラスです。",
    },
    "accessibility": {
        "name": "アクセシビリティ",
        "classEn": "Accessibility",
        "nature": "付帯設備クラス",
        "roleNote": "バリアフリー・多目的トイレ・設備対応状況",
        "description": "エレベーター、スロープ、多目的トイレ、オストメイト等のバリアフリー対応種別と補足説明を保持する共通クラスです。",
    },
    "image": {
        "name": "画像",
        "classEn": "Image",
        "nature": "共通クラス（メディア）",
        "roleNote": "施設外観・内観写真ファイルとライセンス情報",
        "description": "施設等の画像URL、キャプション、ファイル形式、撮影・更新日、利用ライセンス条件を管理する共通クラスです。",
    },
    "common_location": {
        "name": "位置情報型",
        "classEn": "CommonLocation",
        "nature": "共通クラス（設置場所）",
        "roleNote": "設備等の設置フロア・部屋・場所の記述と座標",
        "description": "施設内のどの建物・何階・どの部屋（機械室等）に設備が設置されているかを表す共通位置クラスです。",
    },
    "geo_geometry": {
        "name": "空間スキーマ",
        "classEn": "Geometry",
        "nature": "共通クラス（GIS空間属性）",
        "roleNote": "緯度・経度・標高・WKT形状・座標参照系",
        "description": "GIS連携に用いる代表点（緯度・経度）、標高、幾何形状（WKT）、EPSG座標系コードを保持する空間属性クラスです。",
    },
    "multilingual": {
        "name": "多言語表記型",
        "classEn": "Multilingual",
        "nature": "共通クラス（多言語）",
        "roleNote": "言語コードと表記テキストのペア",
        "description": "施設名称や案内表記を英語・中国語・韓国語など複数言語で保持する際の共通データ型です。",
    },
}

CLASS_DIAGRAM_SPECS = [
    {
        "id": "overall",
        "code": "全体",
        "name": "全体関連図",
        "shortName": "全体関連図",
        "domainId": "all",
        "file": "施設管理_全体関連図.md",
    },
    {
        "id": "facility",
        "code": "01",
        "name": "施設基本 クラス図",
        "shortName": "01 施設基本",
        "domainId": "facility",
        "file": "01_施設基本_クラス図.md",
    },
    {
        "id": "equipment",
        "code": "02",
        "name": "設備・機器 クラス図",
        "shortName": "02 設備・機器",
        "domainId": "equipment",
        "file": "02_設備_クラス図.md",
    },
    {
        "id": "finance",
        "code": "03",
        "name": "収支・コスト履歴 クラス図",
        "shortName": "03 収支・コスト",
        "domainId": "finance",
        "file": "03_収支・コスト履歴_クラス図.md",
    },
    {
        "id": "maintenance",
        "code": "04",
        "name": "点検・修繕履歴 クラス図",
        "shortName": "04 点検・修繕",
        "domainId": "maintenance",
        "file": "04_点検・修繕履歴_クラス図.md",
    },
    {
        "id": "usage",
        "code": "05",
        "name": "利用状況・稼働履歴 クラス図",
        "shortName": "05 利用状況・稼働",
        "domainId": "usage",
        "file": "05_利用状況・稼働履歴_クラス図.md",
    },
    {
        "id": "disaster",
        "code": "06",
        "name": "防災拠点・避難状況 クラス図",
        "shortName": "06 防災拠点",
        "domainId": "disaster",
        "file": "06_防災拠点_クラス図.md",
    },
]

ATTR_RE = re.compile(
    r"^\+\s*(?:(PK\s*,\s*FK|PK|FK)\s+)?([^:]+?)\s*:\s*([^\[\【]+?)(?:\s*\[([^\]]+)\])?(?:\s*【([^】]+)】)?\s*$"
)
REL_RE = re.compile(
    r'^([A-Za-z0-9_]+)\s*(?:"([^"]*)")?\s*(<\|--|--\|>|\*-->|<--\*|o-->|<--o|<--|-->|--)\s*(?:"([^"]*)")?\s*([A-Za-z0-9_]+)(?:\s*:\s*(.+))?$'
)


def parse_mermaid_class_block(
    code: str,
    class_en_to_sheet: dict[str, dict],
) -> dict:
    """Parse a Mermaid classDiagram block, stripping namespace コード定義 and its relations."""
    direction = "TB"
    brace_depth = 0
    ns_at_depth: dict[int, str] = {}
    in_class: dict | None = None
    pending_unit = ""

    all_classes: list[dict] = []
    all_rels: list[dict] = []

    for raw_line in code.splitlines():
        s = raw_line.strip()
        if not s or s == "classDiagram":
            continue
        if s.startswith("direction "):
            direction = s.split(None, 1)[1].strip()
            continue
        if s.startswith("%%"):
            if "単位:" in s or "単位：" in s:
                pending_unit = s.lstrip("%").strip()
            continue

        m_ns = re.match(r"^namespace\s+([^\s{]+)\s*\{$", s)
        if m_ns and in_class is None:
            brace_depth += 1
            ns_at_depth[brace_depth] = m_ns.group(1).strip()
            continue

        m_cls = re.match(r'^class\s+([A-Za-z0-9_]+)(?:\["([^"]+)"\])?\s*\{$', s)
        if m_cls and in_class is None:
            cid = m_cls.group(1)
            clabel = m_cls.group(2) or cid
            cur_ns = ns_at_depth.get(brace_depth, "")
            jp_name = clabel.split("(")[0].strip() if "(" in clabel else clabel
            in_class = {
                "id": cid,
                "label": clabel,
                "jpName": jp_name,
                "namespace": cur_ns,
                "stereotype": "",
                "attributes": [],
            }
            pending_unit = ""
            brace_depth += 1
            continue

        m_cls_empty = re.match(r'^class\s+([A-Za-z0-9_]+)(?:\["([^"]+)"\])?$', s)
        if m_cls_empty and in_class is None:
            cid = m_cls_empty.group(1)
            clabel = m_cls_empty.group(2) or cid
            cur_ns = ns_at_depth.get(brace_depth, "")
            jp_name = clabel.split("(")[0].strip() if "(" in clabel else clabel
            all_classes.append(
                {
                    "id": cid,
                    "label": clabel,
                    "jpName": jp_name,
                    "namespace": cur_ns,
                    "stereotype": "",
                    "attributes": [],
                }
            )
            continue

        if s == "}":
            if in_class is not None:
                all_classes.append(in_class)
                in_class = None
                pending_unit = ""
            elif brace_depth in ns_at_depth:
                del ns_at_depth[brace_depth]
            brace_depth = max(0, brace_depth - 1)
            continue

        if in_class is not None:
            if s.startswith("<<") and s.endswith(">>"):
                in_class["stereotype"] = s.strip("<>").strip()
                continue
            m_attr = ATTR_RE.match(s)
            if m_attr:
                key_flag, name_part, dtype, mult, req = m_attr.groups()
                if "/" in name_part:
                    jp_part, en_part = [p.strip() for p in name_part.split("/", 1)]
                else:
                    jp_part, en_part = name_part.strip(), ""
                in_class["attributes"].append(
                    {
                        "key": (key_flag or "").replace(" ", ""),
                        "ja": jp_part,
                        "en": en_part,
                        "dataType": (dtype or "").strip(),
                        "multiplicity": (mult or "").strip(),
                        "required": (req or "").strip(),
                        "unit": pending_unit,
                    }
                )
            else:
                in_class["attributes"].append(
                    {
                        "key": "",
                        "ja": s.lstrip("+").strip(),
                        "en": "",
                        "dataType": "",
                        "multiplicity": "",
                        "required": "",
                        "unit": pending_unit,
                    }
                )
            pending_unit = ""
            continue

        m_rel = REL_RE.match(s)
        if m_rel:
            left_id, left_mult, op, right_mult, right_id, rel_label = m_rel.groups()
            all_rels.append(
                {
                    "left": left_id,
                    "leftMult": (left_mult or "").strip(),
                    "op": op,
                    "rightMult": (right_mult or "").strip(),
                    "right": right_id,
                    "label": (rel_label or "").strip(),
                    "raw": s,
                }
            )

    dropped_code_classes = [c for c in all_classes if c["namespace"] == "コード定義"]
    dropped_ids = {c["id"] for c in dropped_code_classes}
    kept_classes = [c for c in all_classes if c["namespace"] != "コード定義"]

    enriched_classes = []
    for c in kept_classes:
        mapped = class_en_to_sheet.get(c["id"], {})
        enriched_classes.append(
            {
                **c,
                "sheetId": mapped.get("sheetId", ""),
                "sheetKind": mapped.get("kind", ""),
                "domainId": mapped.get("domainId", "common" if c["namespace"] == "共通クラス" else ""),
            }
        )

    kept_rels = []
    for idx, r in enumerate(all_rels):
        if r["left"] in dropped_ids or r["right"] in dropped_ids:
            continue
        op = r["op"]
        if "*" in op:
            rel_kind = "composition"
        elif "o" in op:
            rel_kind = "aggregation"
        elif "|" in op:
            rel_kind = "inheritance"
        else:
            rel_kind = "association"

        kept_rels.append(
            {
                "id": f"MREL_{idx + 1}",
                "left": r["left"],
                "leftMult": r["leftMult"],
                "op": op,
                "rightMult": r["rightMult"],
                "right": r["right"],
                "kind": rel_kind,
                "label": r["label"],
                "raw": r["raw"],
            }
        )

    # Reconstruct clean Mermaid source without namespace コード定義 and its relations
    clean_lines = ["classDiagram", f"    direction {direction}", ""]
    plain_classes = [c for c in enriched_classes if not c["namespace"]]
    ns_groups: dict[str, list[dict]] = defaultdict(list)
    for c in enriched_classes:
        if c["namespace"]:
            ns_groups[c["namespace"]].append(c)

    def format_class_lines(cls_obj: dict, indent: str = "    ") -> list[str]:
        hdr = f'{indent}class {cls_obj["id"]}["{cls_obj["label"]}"] {{'
        out = [hdr]
        if cls_obj["stereotype"]:
            out.append(f'{indent}    <<{cls_obj["stereotype"]}>>')
        for a in cls_obj["attributes"]:
            key_p = f'{a["key"]} ' if a["key"] else ""
            name_p = f'{a["ja"]} / {a["en"]}' if a["en"] else a["ja"]
            type_p = f' : {a["dataType"]}' if a["dataType"] else ""
            mult_p = f' [{a["multiplicity"]}]' if a["multiplicity"] else ""
            req_p = f' 【{a["required"]}】' if a["required"] else ""
            out.append(f"{indent}    + {key_p}{name_p}{type_p}{mult_p}{req_p}")
        out.append(f"{indent}}}")
        return out

    for c in plain_classes:
        clean_lines.extend(format_class_lines(c, "    "))
        clean_lines.append("")

    for ns_name, grp in ns_groups.items():
        clean_lines.append(f"    namespace {ns_name} {{")
        for c in grp:
            clean_lines.extend(format_class_lines(c, "        "))
        clean_lines.append("    }")
        clean_lines.append("")

    for r in kept_rels:
        clean_lines.append(f"    {r['raw']}")

    return {
        "direction": direction,
        "classes": enriched_classes,
        "relations": kept_rels,
        "droppedCodeClassCount": len(dropped_code_classes),
        "cleanMermaid": "\n".join(clean_lines).strip() + "\n",
        "rawMermaid": code.strip() + "\n",
    }


def load_class_diagrams(class_en_to_sheet: dict[str, dict]) -> list[dict]:
    groups = []
    for spec in CLASS_DIAGRAM_SPECS:
        md_path = CLASS_DOCS_DIR / spec["file"]
        if not md_path.exists():
            continue
        text = md_path.read_text(encoding="utf-8")
        variants = []
        matches = list(re.finditer(r"```mermaid\s*\n(.*?)```", text, flags=re.S))
        for idx, m in enumerate(matches):
            before = text[: m.start()]
            headings = re.findall(r"^#{2,4}\s+(.+)$", before, flags=re.M)
            raw_heading = headings[-1].strip() if headings else f"クラス図 {idx + 1}"
            short_label = raw_heading
            if "簡易" in raw_heading:
                short_label = "簡易クラス図（構造概要）"
            elif "全体構造" in raw_heading:
                short_label = "全体構造（簡易）"
            elif "詳細" in raw_heading:
                short_label = "詳細クラス図（全属性・共通クラス展開）"
            elif len(matches) == 1:
                short_label = "全体クラス図"

            parsed = parse_mermaid_class_block(m.group(1), class_en_to_sheet)
            variants.append(
                {
                    "id": f"{spec['id']}_v{idx + 1}",
                    "index": idx,
                    "heading": raw_heading,
                    "shortLabel": short_label,
                    **parsed,
                }
            )
        if variants:
            groups.append(
                {
                    "id": spec["id"],
                    "code": spec["code"],
                    "name": spec["name"],
                    "shortName": spec["shortName"],
                    "domainId": spec["domainId"],
                    "sourceFile": f"{CLASS_DOCS_DIR_NAME}/{spec['file']}",
                    "variants": variants,
                }
            )
    return groups


RELATIONS = [
    {
        "id": "REL_FAC_SELF",
        "kind": "standard",
        "fromTable": "m_facilities",
        "fromCol": "relatedFacilityId",
        "fromProp": "PROP_FAC_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "親施設1件 に対し、分館・併設施設が0件以上（無い場合も複数ある場合も可）",
        "label": "複合施設・本館/分館の関連参照",
        "description": "複合施設内の個別施設や本館・分館など、施設どうしの親子・併設関係を同じテーブル内で紐づけます。",
    },
    {
        "id": "REL_FAC_EQP",
        "kind": "standard",
        "fromTable": "m_facility_equipments",
        "fromCol": "facilityId",
        "fromProp": "PROP_EQP_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、設備マスタが0件以上（複数種類の設備を登録可）",
        "label": "保有設備群の帰属",
        "description": "1つの施設に設置されている複数の設備種別（空調・昇降機・受変電・発電設備等）を紐づけます。",
    },
    {
        "id": "REL_EQP_EQU",
        "kind": "standard",
        "fromTable": "m_facility_equipment_units",
        "fromCol": "equipmentId",
        "fromProp": "PROP_EQU_002",
        "toTable": "m_facility_equipments",
        "toCol": "equipmentId",
        "toProp": "PROP_EQP_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "設備マスタ1件 に対し、個別機器（1号機・2号機等）が0件以上",
        "label": "設備群から個別機器への展開",
        "description": "設備マスタの1レコード（例：空調チラー2台）を、個別の設置日を持つ機器個体（1号機・2号機）へ展開します。",
    },
    {
        "id": "REL_FAC_FIN",
        "kind": "standard",
        "fromTable": "t_financial_results",
        "fromCol": "facilityId",
        "fromProp": "PROP_FIN_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、年度ごとの収支履歴が0件以上（毎年1行ずつ蓄積）",
        "label": "年度別の収支・コスト実績",
        "description": "施設ごとの各会計年度における利用料収入・維持管理費・光熱水費・人件費・減価償却費等の推移を紐づけます。",
    },
    {
        "id": "REL_FAC_ACR",
        "kind": "standard",
        "fromTable": "t_asset_cost_records",
        "fromCol": "facilityId",
        "fromProp": "PROP_ACR_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、取得・改修・除却などの費用記録が0件以上",
        "label": "資産ライフサイクル費用記録",
        "description": "施設の新設取得・大規模改修・設備更新・除却に関する計画額・見積額・実績額を案件単位で紐づけます。",
    },
    {
        "id": "REL_FAC_MNT",
        "kind": "standard",
        "fromTable": "t_maintenance_histories",
        "fromCol": "facilityId",
        "fromProp": "PROP_MNT_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、点検・診断・修繕の予定や実績が0件以上",
        "label": "点検・診断・修繕履歴",
        "description": "施設に対する法定点検・劣化診断・修繕工事の予定および実施記録を時系列で紐づけます。",
    },
    {
        "id": "REL_FAC_USG",
        "kind": "standard",
        "fromTable": "t_usage_histories",
        "fromCol": "facilityId",
        "fromProp": "PROP_USG_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、期間ごとの利用状況集計が0件以上（年度・月次ごとに蓄積）",
        "label": "利用状況・稼働パフォーマンス",
        "description": "期間ごとの開館日数・利用者数・利用件数および効率性指標（単位あたりコスト）を紐づけます。",
    },
    {
        "id": "REL_FAC_DIS",
        "kind": "standard",
        "fromTable": "m_disaster_bases",
        "fromCol": "facilityId",
        "fromProp": "PROP_DIS_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..1",
        "plainCardinality": "施設1件 に対し、防災拠点マスタは0件（非該当施設）または最大1件（指定施設）",
        "label": "防災拠点・指定避難所属性",
        "description": "公共施設が指定避難所等の防災拠点である場合に限り、平常時の防災スペック情報を1対1（未指定なら0）で付与します。",
    },
    {
        "id": "REL_DIS_DST",
        "kind": "standard",
        "fromTable": "t_disaster_status_histories",
        "fromCol": "disasterBaseId",
        "fromProp": "PROP_DST_002",
        "toTable": "m_disaster_bases",
        "toCol": "disasterBaseId",
        "toProp": "PROP_DIS_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "防災拠点1か所 に対し、災害時の状況報告履歴が0件以上（報告のたびに追加）",
        "label": "災害時の避難・備蓄・ライフライン時系列状況",
        "description": "防災拠点マスタのIDを起点に、発災後の開設状況・避難者数・物資残量・インフラ稼働状況を時系列で記録します。",
    },
    {
        "id": "REL_FAC_BLD",
        "kind": "standard",
        "isComposition": True,
        "fromTable": "pd_building",
        "fromCol": "facilityId",
        "fromProp": "PROP_BUI_002",
        "toTable": "m_facilities",
        "toCol": "facilityId",
        "toProp": "PROP_FAC_001",
        "cardinality": "1 : 0..*",
        "plainCardinality": "施設1件 に対し、構成要素の建物（棟）が0棟以上（複数棟の個別管理に対応）",
        "label": "施設を構成する建物・棟の所有（コンポジション）",
        "description": "01_施設基本・全体関連図で定義された構成要素（◆コンポジション）。1施設が複数棟を持つ場合に棟単位のスペックを紐づけます。",
    },
    {
        "id": "EXT_BLD_EQP",
        "kind": "extended",
        "fromTable": "m_facility_equipments",
        "fromCol": "buildingId (クラス図拡張)",
        "fromProp": "",
        "toTable": "pd_building",
        "toCol": "buildingId",
        "toProp": "PROP_BUI_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "建物1棟 に対し、設置されている設備マスタを任意で紐づけ可能（屋外設備等は空欄）",
        "label": "棟単位の設備設置先指定（クラス図拡張）",
        "description": "02_設備_クラス図で定義された任意FK。複数棟ある施設において、設備がどの棟に設置されているかを紐づけます。",
    },
    {
        "id": "EXT_BLD_MNT",
        "kind": "extended",
        "fromTable": "t_maintenance_histories",
        "fromCol": "buildingId (クラス図拡張)",
        "fromProp": "",
        "toTable": "pd_building",
        "toCol": "buildingId",
        "toProp": "PROP_BUI_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "建物1棟 に対し、棟単位の点検・診断・修繕履歴を任意で紐づけ可能",
        "label": "棟単位の点検・修繕対象指定（クラス図拡張）",
        "description": "全体関連図・04_点検・修繕履歴_クラス図で定義された任意FK。特定の棟に対する屋根・外壁等の保全履歴を直接紐づけます。",
    },
    {
        "id": "EXT_BLD_ACR",
        "kind": "extended",
        "fromTable": "t_asset_cost_records",
        "fromCol": "buildingId (クラス図拡張)",
        "fromProp": "",
        "toTable": "pd_building",
        "toCol": "buildingId",
        "toProp": "PROP_BUI_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "建物1棟 に対し、棟単位の改修・除却などの費用記録を任意で紐づけ可能",
        "label": "棟単位の改修・取得コスト帰属（クラス図拡張）",
        "description": "全体関連図・03_収支・コスト履歴_クラス図で定義された任意FK。特定の棟に帰属する資本的支出や改修費を紐づけます。",
    },
    {
        "id": "EXT_EQP_MNT",
        "kind": "extended",
        "fromTable": "t_maintenance_histories",
        "fromCol": "equipmentId (クラス図拡張)",
        "fromProp": "",
        "toTable": "m_facility_equipments",
        "toCol": "equipmentId",
        "toProp": "PROP_EQP_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "点検・修繕履歴から、対象の設備マスタ（0または1件）を任意指定可能",
        "label": "設備単位の点検・修繕対象指定（クラス図拡張）",
        "description": "04_点検・修繕履歴_クラス図で定義された任意FK。特定設備（空調機・昇降機等）を対象とする保全履歴を直接紐づけます。",
    },
    {
        "id": "EXT_EQU_MNT",
        "kind": "extended",
        "fromTable": "t_maintenance_histories",
        "fromCol": "equipmentUnitId (クラス図拡張)",
        "fromProp": "",
        "toTable": "m_facility_equipment_units",
        "toCol": "equipmentUnitId",
        "toProp": "PROP_EQU_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "点検・修繕履歴から、特定の個別機器（1号機等）を任意指定可能",
        "label": "個別機器単位の点検・交換記録（クラス図拡張）",
        "description": "04_点検・修繕履歴_クラス図で定義された任意FK。特定号機・シリアル個体に対する点検・部品交換を紐づけます。",
    },
    {
        "id": "EXT_MNT_ACR",
        "kind": "extended",
        "fromTable": "t_asset_cost_records",
        "fromCol": "maintenanceId (クラス図拡張)",
        "fromProp": "",
        "toTable": "t_maintenance_histories",
        "toCol": "maintenanceId",
        "toProp": "PROP_MNT_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "点検・修繕1案件に対し、見積・実績などの費用記録を紐づけ可能",
        "label": "修繕案件と資産費用記録の連動（クラス図拡張）",
        "description": "03_収支・コスト履歴_クラス図で定義された任意FK。点検・修繕イベントに由来する見積額・実績額を直接トレースします。",
    },
    {
        "id": "EXT_EQP_ACR",
        "kind": "extended",
        "fromTable": "t_asset_cost_records",
        "fromCol": "equipmentId (クラス図拡張)",
        "fromProp": "",
        "toTable": "m_facility_equipments",
        "toCol": "equipmentId",
        "toProp": "PROP_EQP_001",
        "cardinality": "0..1 : 0..*",
        "plainCardinality": "設備マスタ1件に対し、新設・更新などの費用記録を任意で紐づけ可能",
        "label": "設備更新・取得コストの帰属（クラス図拡張）",
        "description": "03_収支・コスト履歴_クラス図で定義された任意FK。設備群の新設・更新にかかる投資コストを紐づけます。",
    },
]

SAMPLES = {
    "m_facilities": [
        {
            "facilityId": "FAC-001",
            "relatedFacilityId": "",
            "realEstateId": "RE-13101-0001",
            "name": "青葉市民文化センター",
            "nameKana": "アオバシミンブンカセンター",
            "alternateName": "あおばれっくホール",
            "localGovernmentCode": "131016",
            "prefecture": "東京都",
            "city": "千代田区",
            "streetAddress": "青葉町一丁目",
            "cityBlock": "2-1",
            "fullAddress": "東京都千代田区青葉町一丁目2-1",
            "postalCode": "1000001",
            "phoneNumber": "03-0000-0101",
            "latitude": "35.685175",
            "longitude": "139.752800",
            "description": "大ホール・多目的会議室・市民活動室を備える地域の複合文化・防災拠点施設",
            "facilityType": "市民文化系施設",
            "operatorCategory": "指定管理者",
            "responsibleDepartment": "総務部資産経営課",
            "managementOrganization": "公益財団法人青葉文化振興財団",
            "startDate": "2024-04-01",
            "endDate": "2029-03-31",
            "availableDay": "火,水,木,金,土,日",
            "startTime": "09:00",
            "endTime": "21:30",
            "closedDay": "毎週月曜日、年末年始（12/29〜1/3）",
            "constructionDate": "1998-03-15",
            "buildingAgeCount": "28",
            "landArea": "4520.5",
            "landUseDistrict": "近隣商業地域",
            "usage": "集会場",
            "buildingFootprintArea": "2150.0",
            "totalFloorArea": "6480.2",
            "structure": "SRC",
            "storeysAboveGround": "4",
            "storeysBelowGround": "1",
            "seismicStandardCategory": "新耐震基準",
            "seismicMeasureStatus": "耐震改修済",
            "buildingCount": "1",
            "parkingCapacityCount": "45",
            "accessibilityType": "エレベーター,多目的トイレ,スロープ",
            "url": "https://example.lg.jp/facilities/FAC-001",
            "updateDate": "2026-10-01",
        },
        {
            "facilityId": "FAC-002",
            "relatedFacilityId": "FAC-001",
            "realEstateId": "RE-13101-0001",
            "name": "青葉市立中央図書館",
            "nameKana": "アオバシリツチュウオウトショカン",
            "alternateName": "青葉ライブラリー",
            "localGovernmentCode": "131016",
            "prefecture": "東京都",
            "city": "千代田区",
            "streetAddress": "青葉町一丁目",
            "cityBlock": "2-1",
            "fullAddress": "東京都千代田区青葉町一丁目2-1",
            "postalCode": "1000001",
            "phoneNumber": "03-0000-0102",
            "latitude": "35.685210",
            "longitude": "139.752910",
            "description": "青葉市民文化センター敷地内に併設された市立中央図書館（一般開架・児童書コーナー・学習席）",
            "facilityType": "社会教育系施設",
            "operatorCategory": "直営",
            "responsibleDepartment": "教育部生涯学習課",
            "availableDay": "火,水,木,金,土,日",
            "startTime": "09:30",
            "endTime": "20:00",
            "closedDay": "毎週月曜日、第3木曜日",
            "constructionDate": "1998-03-15",
            "buildingAgeCount": "28",
            "totalFloorArea": "2180.0",
            "structure": "SRC",
            "storeysAboveGround": "2",
            "storeysBelowGround": "0",
            "seismicStandardCategory": "新耐震基準",
            "seismicMeasureStatus": "基準適合",
            "parkingCapacityCount": "0",
            "accessibilityType": "エレベーター,点字ブロック,多目的トイレ",
            "url": "https://example.lg.jp/facilities/FAC-002",
            "updateDate": "2026-10-01",
        },
        {
            "facilityId": "FAC-003",
            "relatedFacilityId": "",
            "realEstateId": "RE-13101-0015",
            "name": "青葉市立第一小学校",
            "nameKana": "アオバシリツダイイチショウガッコウ",
            "alternateName": "青葉一小",
            "localGovernmentCode": "131016",
            "prefecture": "東京都",
            "city": "千代田区",
            "streetAddress": "みどり台二丁目",
            "cityBlock": "8-1",
            "fullAddress": "東京都千代田区みどり台二丁目8-1",
            "postalCode": "1000002",
            "phoneNumber": "03-0000-0201",
            "latitude": "35.691420",
            "longitude": "139.758100",
            "description": "普通教室24クラス・屋内運動場・プールを備える公立小学校。災害時は地区の基幹避難所として機能",
            "facilityType": "学校教育系施設",
            "operatorCategory": "直営",
            "responsibleDepartment": "教育部学校施設課",
            "availableDay": "月,火,水,木,金",
            "startTime": "08:00",
            "endTime": "18:00",
            "closedDay": "土曜・日曜・祝日（学校開放利用時を除く）",
            "constructionDate": "1986-04-01",
            "buildingAgeCount": "40",
            "landArea": "12400.0",
            "landUseDistrict": "第一種中高層住居専用地域",
            "usage": "小学校",
            "buildingFootprintArea": "3420.0",
            "totalFloorArea": "8950.5",
            "structure": "RC",
            "storeysAboveGround": "4",
            "storeysBelowGround": "0",
            "seismicStandardCategory": "新耐震基準",
            "seismicMeasureStatus": "耐震改修済",
            "buildingCount": "3",
            "parkingCapacityCount": "12",
            "accessibilityType": "スロープ,多目的トイレ,エレベーター",
            "url": "https://example.lg.jp/facilities/FAC-003",
            "updateDate": "2026-10-01",
        },
        {
            "facilityId": "FAC-004",
            "relatedFacilityId": "",
            "realEstateId": "RE-13101-0028",
            "name": "青葉総合体育館・温水プール",
            "nameKana": "アオバソウゴウタイイクカンオンスイプール",
            "alternateName": "青葉スポーツアリーナ",
            "localGovernmentCode": "131016",
            "prefecture": "東京都",
            "city": "千代田区",
            "streetAddress": "けやき公園町",
            "cityBlock": "1-5",
            "fullAddress": "東京都千代田区けやき公園町1-5",
            "postalCode": "1000003",
            "phoneNumber": "03-0000-0301",
            "latitude": "35.679800",
            "longitude": "139.746300",
            "description": "メインアリーナ・サブアリーナ・25m公認温水プール・トレーニング室を備えた総合スポーツ施設",
            "facilityType": "スポーツ・レクリエーション系施設",
            "operatorCategory": "指定管理者",
            "responsibleDepartment": "市民生活部スポーツ振興課",
            "managementOrganization": "青葉スポーツパートナーズ共同事業体",
            "startDate": "2023-04-01",
            "endDate": "2028-03-31",
            "availableDay": "月,水,木,金,土,日",
            "startTime": "09:00",
            "endTime": "22:00",
            "closedDay": "毎週火曜日、年末年始",
            "constructionDate": "2005-07-01",
            "buildingAgeCount": "21",
            "landArea": "15800.0",
            "landUseDistrict": "準工業地域",
            "usage": "体育館",
            "buildingFootprintArea": "5200.0",
            "totalFloorArea": "9840.0",
            "structure": "S",
            "storeysAboveGround": "3",
            "storeysBelowGround": "1",
            "seismicStandardCategory": "新耐震基準",
            "seismicMeasureStatus": "基準適合",
            "buildingCount": "1",
            "parkingCapacityCount": "120",
            "accessibilityType": "エレベーター,多目的トイレ,車椅子観覧席,スロープ",
            "url": "https://example.lg.jp/facilities/FAC-004",
            "updateDate": "2026-10-01",
        },
        {
            "facilityId": "FAC-005",
            "relatedFacilityId": "",
            "realEstateId": "RE-13101-0042",
            "name": "青葉市保健福祉センター",
            "nameKana": "アオバシホケンフクシセンター",
            "alternateName": "すこやか館",
            "localGovernmentCode": "131016",
            "prefecture": "東京都",
            "city": "千代田区",
            "streetAddress": "さくら町三丁目",
            "cityBlock": "4-10",
            "fullAddress": "東京都千代田区さくら町三丁目4-10",
            "postalCode": "1000004",
            "phoneNumber": "03-0000-0401",
            "latitude": "35.688950",
            "longitude": "139.761200",
            "description": "乳幼児健診・地域包括支援センター・デイサービス・休日急病診療所を複合した保健福祉拠点。災害時は福祉避難所",
            "facilityType": "保健・福祉施設",
            "operatorCategory": "直営",
            "responsibleDepartment": "健康福祉部地域福祉課",
            "availableDay": "月,火,水,木,金,土",
            "startTime": "08:30",
            "endTime": "17:30",
            "closedDay": "日曜日・祝日（休日診療所を除く）",
            "constructionDate": "2012-04-01",
            "buildingAgeCount": "14",
            "landArea": "3600.0",
            "landUseDistrict": "商業地域",
            "usage": "児童福祉施設等",
            "buildingFootprintArea": "1680.0",
            "totalFloorArea": "5120.0",
            "structure": "RC",
            "storeysAboveGround": "4",
            "storeysBelowGround": "0",
            "seismicStandardCategory": "新耐震基準",
            "seismicMeasureStatus": "基準適合",
            "buildingCount": "1",
            "parkingCapacityCount": "35",
            "accessibilityType": "エレベーター,多目的トイレ,オストメイト,点字ブロック,スロープ",
            "url": "https://example.lg.jp/facilities/FAC-005",
            "updateDate": "2026-10-01",
        },
    ],
    "m_facility_equipments": [
        {
            "equipmentId": "EQP-001",
            "facilityId": "FAC-001",
            "equipmentType": "空気調和設備",
            "equipmentCategory": "建築機械設備",
            "equipmentQuantityCount": "2",
            "installationLocationDescription": "地下1階中央熱源機械室",
            "remark": "空冷ヒートポンプチラー系統（大ホール・会議室系統）",
        },
        {
            "equipmentId": "EQP-002",
            "facilityId": "FAC-001",
            "equipmentType": "昇降機設備",
            "equipmentCategory": "建築電気・搬送設備",
            "equipmentQuantityCount": "2",
            "installationLocationDescription": "中央エントランスホール（乗用1・人荷用1）",
            "remark": "地震時管制運転・停電時自動着床装置付",
        },
        {
            "equipmentId": "EQP-003",
            "facilityId": "FAC-003",
            "equipmentType": "受変電設備",
            "equipmentCategory": "建築電気設備",
            "equipmentQuantityCount": "1",
            "installationLocationDescription": "北校舎東側 屋外キュービクル置場",
            "remark": "高圧受電盤一式（浸水対策かさ上げ施工済）",
        },
        {
            "equipmentId": "EQP-004",
            "facilityId": "FAC-003",
            "equipmentType": "空気調和設備",
            "equipmentCategory": "建築機械設備",
            "equipmentQuantityCount": "4",
            "installationLocationDescription": "屋内運動場（体育館）周囲屋外置場",
            "remark": "避難所環境改善用のLPガスヒートポンプエアコン",
        },
        {
            "equipmentId": "EQP-005",
            "facilityId": "FAC-004",
            "equipmentType": "給排水衛生設備",
            "equipmentCategory": "建築機械設備",
            "equipmentQuantityCount": "2",
            "installationLocationDescription": "地下1階 プール機械室",
            "remark": "25m温水プール循環ろ過装置および熱交換ボイラー",
        },
        {
            "equipmentId": "EQP-006",
            "facilityId": "FAC-005",
            "equipmentType": "発電設備",
            "equipmentCategory": "建築電気設備",
            "equipmentQuantityCount": "1",
            "installationLocationDescription": "屋上 非常用発電機室",
            "remark": "福祉避難所・休日診療所バックアップ用（72時間連続稼働対応）",
        },
    ],
    "m_facility_equipment_units": [
        {
            "equipmentUnitId": "EQU-001",
            "equipmentId": "EQP-001",
            "componentType": "空冷ヒートポンプチラー 1号機（大ホール系）",
            "installationDate": "2016-09-20",
        },
        {
            "equipmentUnitId": "EQU-002",
            "equipmentId": "EQP-001",
            "componentType": "空冷ヒートポンプチラー 2号機（会議室・共用系）",
            "installationDate": "2016-09-20",
        },
        {
            "equipmentUnitId": "EQU-003",
            "equipmentId": "EQP-002",
            "componentType": "乗用15人乗りロープ式エレベーター 1号機",
            "installationDate": "1998-03-15",
        },
        {
            "equipmentUnitId": "EQU-004",
            "equipmentId": "EQP-004",
            "componentType": "体育館GHP空調室外機 A系統（アリーナ北側）",
            "installationDate": "2021-07-10",
        },
        {
            "equipmentUnitId": "EQU-005",
            "equipmentId": "EQP-005",
            "componentType": "温水プール珪藻土循環ろ過ポンプユニット 1号機",
            "installationDate": "2018-02-25",
        },
    ],
    "t_financial_results": [
        {
            "financialResultId": "FIN-2025-001",
            "facilityId": "FAC-001",
            "fiscalYear": "2025",
            "revenueUsageFeeAmount": "19200000",
            "revenueOtherAmount": "1300000",
            "revenueTotalAmount": "20500000",
            "expenditureRepairAmount": "14200000",
            "expenditureUtilityAmount": "21100000",
            "expenditureManagementAmount": "34800000",
            "expenditurePersonnelAmount": "42600000",
            "expenditureOtherAmount": "2900000",
            "cashExpenditureTotalAmount": "115600000",
            "nonCashDepreciationAmount": "31500000",
            "totalCostAmount": "147100000",
            "fiscalBalanceAmount": "-126600000",
        },
        {
            "financialResultId": "FIN-2025-002",
            "facilityId": "FAC-002",
            "fiscalYear": "2025",
            "revenueUsageFeeAmount": "180000",
            "revenueOtherAmount": "420000",
            "revenueTotalAmount": "600000",
            "expenditureRepairAmount": "2100000",
            "expenditureUtilityAmount": "6800000",
            "expenditureManagementAmount": "14500000",
            "expenditurePersonnelAmount": "31200000",
            "expenditureOtherAmount": "8800000",
            "cashExpenditureTotalAmount": "63400000",
            "nonCashDepreciationAmount": "10400000",
            "totalCostAmount": "73800000",
            "fiscalBalanceAmount": "-73200000",
        },
        {
            "financialResultId": "FIN-2025-003",
            "facilityId": "FAC-003",
            "fiscalYear": "2025",
            "revenueUsageFeeAmount": "350000",
            "revenueOtherAmount": "150000",
            "revenueTotalAmount": "500000",
            "expenditureRepairAmount": "9800000",
            "expenditureUtilityAmount": "16400000",
            "expenditureManagementAmount": "19200000",
            "expenditurePersonnelAmount": "18500000",
            "expenditureOtherAmount": "2400000",
            "cashExpenditureTotalAmount": "66300000",
            "nonCashDepreciationAmount": "28900000",
            "totalCostAmount": "95200000",
            "fiscalBalanceAmount": "-94700000",
        },
        {
            "financialResultId": "FIN-2025-004",
            "facilityId": "FAC-004",
            "fiscalYear": "2025",
            "revenueUsageFeeAmount": "38600000",
            "revenueOtherAmount": "4100000",
            "revenueTotalAmount": "42700000",
            "expenditureRepairAmount": "7600000",
            "expenditureUtilityAmount": "54200000",
            "expenditureManagementAmount": "62000000",
            "expenditurePersonnelAmount": "29400000",
            "expenditureOtherAmount": "3500000",
            "cashExpenditureTotalAmount": "156700000",
            "nonCashDepreciationAmount": "48200000",
            "totalCostAmount": "204900000",
            "fiscalBalanceAmount": "-162200000",
        },
        {
            "financialResultId": "FIN-2025-005",
            "facilityId": "FAC-005",
            "fiscalYear": "2025",
            "revenueUsageFeeAmount": "6200000",
            "revenueOtherAmount": "850000",
            "revenueTotalAmount": "7050000",
            "expenditureRepairAmount": "3200000",
            "expenditureUtilityAmount": "13900000",
            "expenditureManagementAmount": "24600000",
            "expenditurePersonnelAmount": "51800000",
            "expenditureOtherAmount": "4100000",
            "cashExpenditureTotalAmount": "97600000",
            "nonCashDepreciationAmount": "26400000",
            "totalCostAmount": "124000000",
            "fiscalBalanceAmount": "-116950000",
        },
    ],
    "t_asset_cost_records": [
        {
            "assetCostRecordId": "ACR-2025-001",
            "facilityId": "FAC-001",
            "costCategory": "改修・更新費",
            "costStage": "実績",
            "amount": "14200000",
        },
        {
            "assetCostRecordId": "ACR-2027-001",
            "facilityId": "FAC-001",
            "costCategory": "改修・更新費",
            "costStage": "計画",
            "amount": "68000000",
        },
        {
            "assetCostRecordId": "ACR-2025-002",
            "facilityId": "FAC-003",
            "costCategory": "修繕費",
            "costStage": "実績",
            "amount": "9800000",
        },
        {
            "assetCostRecordId": "ACR-2026-001",
            "facilityId": "FAC-004",
            "costCategory": "改修・更新費",
            "costStage": "見積",
            "amount": "45500000",
        },
        {
            "assetCostRecordId": "ACR-2025-003",
            "facilityId": "FAC-005",
            "costCategory": "修繕費",
            "costStage": "実績",
            "amount": "3200000",
        },
    ],
    "t_maintenance_histories": [
        {
            "maintenanceId": "MNT-2025-001",
            "facilityId": "FAC-001",
            "maintenanceEventDate": "2025-11-12",
            "maintenanceDataCategory": "実績",
            "maintenanceActivityType": "修繕",
            "maintenanceTargetPart": "屋上・屋根",
            "deteriorationScore": "B",
            "overallConditionStatus": "予防保全段階",
            "maintenanceActionDescription": "屋上アスファルト防水層の部分補修およびドレン周りシーリング打替えを実施",
            "maintenanceCostAmount": "14200000",
        },
        {
            "maintenanceId": "MNT-2027-001",
            "facilityId": "FAC-001",
            "maintenanceEventDate": "2027-10-01",
            "maintenanceDataCategory": "計画",
            "maintenanceActivityType": "更新",
            "maintenanceTargetPart": "空調換気設備",
            "deteriorationScore": "C",
            "overallConditionStatus": "要改修検討",
            "maintenanceActionDescription": "中央熱源チラー1・2号機の更新工事（個別施設計画に基づく中長期計上）",
            "maintenanceCostAmount": "68000000",
        },
        {
            "maintenanceId": "MNT-2025-002",
            "facilityId": "FAC-003",
            "maintenanceEventDate": "2025-08-20",
            "maintenanceDataCategory": "実績",
            "maintenanceActivityType": "修繕",
            "maintenanceTargetPart": "外壁",
            "deteriorationScore": "B",
            "overallConditionStatus": "予防保全段階",
            "maintenanceActionDescription": "南校舎外壁モルタル浮き部のピンニング注入補修および塗装改修（夏季休業中施工）",
            "maintenanceCostAmount": "9800000",
        },
        {
            "maintenanceId": "MNT-2026-001",
            "facilityId": "FAC-004",
            "maintenanceEventDate": "2026-12-01",
            "maintenanceDataCategory": "計画",
            "maintenanceActivityType": "更新",
            "maintenanceTargetPart": "給排水衛生設備",
            "deteriorationScore": "C",
            "overallConditionStatus": "要改修検討",
            "maintenanceActionDescription": "温水プール循環ろ過装置・熱交換ボイラー一式の更新（設計見積取得済）",
            "maintenanceCostAmount": "45500000",
        },
        {
            "maintenanceId": "MNT-2025-003",
            "facilityId": "FAC-005",
            "maintenanceEventDate": "2025-06-15",
            "maintenanceDataCategory": "実績",
            "maintenanceActivityType": "点検",
            "maintenanceTargetPart": "電気設備",
            "deteriorationScore": "A",
            "overallConditionStatus": "良好",
            "maintenanceActionDescription": "非常用自家発電設備の負荷運転点検およびスターター蓄電池予防交換を実施",
            "maintenanceCostAmount": "3200000",
        },
    ],
    "t_usage_histories": [
        {
            "usageHistoryId": "USG-2025-001",
            "facilityId": "FAC-001",
            "aggregationPeriod": "2025年度",
            "aggregationPeriodType": "年度",
            "openDayCount": "308",
            "totalUserCount": "142500",
            "usageCaseCount": "3840",
            "costPerDayAmount": "477597",
            "costPerUserAmount": "1032",
            "costPerTotalFloorAreaAmount": "22700",
        },
        {
            "usageHistoryId": "USG-2025-002",
            "facilityId": "FAC-002",
            "aggregationPeriod": "2025年度",
            "aggregationPeriodType": "年度",
            "openDayCount": "295",
            "totalUserCount": "198400",
            "usageCaseCount": "96200",
            "costPerDayAmount": "250169",
            "costPerUserAmount": "372",
            "costPerTotalFloorAreaAmount": "33853",
        },
        {
            "usageHistoryId": "USG-2025-003",
            "facilityId": "FAC-003",
            "aggregationPeriod": "2025年度",
            "aggregationPeriodType": "年度",
            "openDayCount": "205",
            "totalUserCount": "138600",
            "usageCaseCount": "420",
            "costPerDayAmount": "464390",
            "costPerUserAmount": "687",
            "costPerTotalFloorAreaAmount": "10636",
        },
        {
            "usageHistoryId": "USG-2025-004",
            "facilityId": "FAC-004",
            "aggregationPeriod": "2025年度",
            "aggregationPeriodType": "年度",
            "openDayCount": "310",
            "totalUserCount": "264000",
            "usageCaseCount": "12500",
            "costPerDayAmount": "660968",
            "costPerUserAmount": "776",
            "costPerTotalFloorAreaAmount": "20823",
        },
        {
            "usageHistoryId": "USG-2025-005",
            "facilityId": "FAC-005",
            "aggregationPeriod": "2025年度",
            "aggregationPeriodType": "年度",
            "openDayCount": "298",
            "totalUserCount": "89500",
            "usageCaseCount": "24600",
            "costPerDayAmount": "416107",
            "costPerUserAmount": "1385",
            "costPerTotalFloorAreaAmount": "24219",
        },
    ],
    "m_disaster_bases": [
        {
            "disasterBaseId": "DIS-001",
            "facilityId": "FAC-001",
            "shelterDesignationCategory": "指定避難所",
            "estimatedCapacityCount": "450",
            "hasPrivatePowerGenerator": "true",
            "hasSolarPowerGenerator": "true",
            "hasStorageBattery": "true",
            "hasWaterTank": "true",
            "hasSeismicWaterTank": "false",
            "hasEmergencyStorage": "true",
            "hasEmergencyToilet": "true",
            "hasManholeToilet": "true",
            "remark": "風水害・地震対応の地区基幹避難所。2階和室・小会議室を要配慮者スペースとして運用。",
        },
        {
            "disasterBaseId": "DIS-002",
            "facilityId": "FAC-003",
            "shelterDesignationCategory": "指定緊急避難場所・指定避難所",
            "estimatedCapacityCount": "800",
            "hasPrivatePowerGenerator": "true",
            "hasSolarPowerGenerator": "true",
            "hasStorageBattery": "true",
            "hasWaterTank": "true",
            "hasSeismicWaterTank": "true",
            "hasEmergencyStorage": "true",
            "hasEmergencyToilet": "true",
            "hasManholeToilet": "true",
            "remark": "校庭は一時集合場所、体育館（空調完備）は長期避難所。校庭地下に耐震性貯水槽100t設置。",
        },
        {
            "disasterBaseId": "DIS-003",
            "facilityId": "FAC-004",
            "shelterDesignationCategory": "指定避難所",
            "estimatedCapacityCount": "650",
            "hasPrivatePowerGenerator": "true",
            "hasSolarPowerGenerator": "false",
            "hasStorageBattery": "false",
            "hasWaterTank": "true",
            "hasSeismicWaterTank": "false",
            "hasEmergencyStorage": "true",
            "hasEmergencyToilet": "true",
            "hasManholeToilet": "true",
            "remark": "大型車両進入可能な駐車場を有し、災害時は広域救援物資集積拠点を兼ねる。",
        },
        {
            "disasterBaseId": "DIS-004",
            "facilityId": "FAC-005",
            "shelterDesignationCategory": "福祉避難所",
            "estimatedCapacityCount": "120",
            "hasPrivatePowerGenerator": "true",
            "hasSolarPowerGenerator": "true",
            "hasStorageBattery": "true",
            "hasWaterTank": "true",
            "hasSeismicWaterTank": "false",
            "hasEmergencyStorage": "true",
            "hasEmergencyToilet": "true",
            "hasManholeToilet": "false",
            "remark": "高齢者・障がい者・妊産婦等の二次避難先。医療用電源確保のため72時間非常用発電機を整備。",
        },
        {
            "disasterBaseId": "DIS-005",
            "facilityId": "FAC-002",
            "shelterDesignationCategory": "一時滞在施設",
            "estimatedCapacityCount": "90",
            "hasPrivatePowerGenerator": "false",
            "hasSolarPowerGenerator": "false",
            "hasStorageBattery": "true",
            "hasWaterTank": "true",
            "hasSeismicWaterTank": "false",
            "hasEmergencyStorage": "true",
            "hasEmergencyToilet": "true",
            "hasManholeToilet": "false",
            "remark": "公共交通機関停止時の帰宅困難者向け一時受入スペース（1階ブラウジングラウンジ開放）。",
        },
    ],
    "t_disaster_status_histories": [
        {
            "disasterStatusId": "DST-2026-001",
            "disasterBaseId": "DIS-001",
            "statusUpdateDateTime": "2026-09-12T18:30:00+09:00",
            "shelterOpeningStatus": "開設中",
            "shelterAcceptanceStatus": "受入可能",
            "currentEvacueeTotalCount": "128",
            "currentEvacueeMaleCount": "58",
            "currentEvacueeFemaleCount": "70",
            "currentEvacueeVulnerableCount": "14",
            "currentEvacueeHouseholdCount": "62",
            "stockFoodRemainingQuantity": "1200",
            "stockWaterRemainingQuantity": "2400",
            "stockBlanketCount": "380",
            "lifelineElectricityStatus": "稼働中",
            "lifelineWaterStatus": "稼働中",
            "lifelineSewerageStatus": "稼働中",
            "lifelineGasStatus": "停止中",
            "lifelineTelecommunicationStatus": "通常利用可",
            "recoveryProgressStatus": "被害なし",
            "vacancyLevel": "大ホール・第1会議室に十分な空きあり（残り約320名受入可）",
            "siteSituationNote": "乳児用液体ミルクおよび携帯トイレの追加配送を災害対策本部へ要請済",
        },
        {
            "disasterStatusId": "DST-2026-002",
            "disasterBaseId": "DIS-002",
            "statusUpdateDateTime": "2026-09-12T18:45:00+09:00",
            "shelterOpeningStatus": "開設中",
            "shelterAcceptanceStatus": "混雑",
            "currentEvacueeTotalCount": "685",
            "currentEvacueeMaleCount": "320",
            "currentEvacueeFemaleCount": "365",
            "currentEvacueeVulnerableCount": "48",
            "currentEvacueeHouseholdCount": "290",
            "stockFoodRemainingQuantity": "950",
            "stockWaterRemainingQuantity": "1800",
            "stockBlanketCount": "140",
            "lifelineElectricityStatus": "稼働中",
            "lifelineWaterStatus": "制限あり",
            "lifelineSewerageStatus": "稼働中",
            "lifelineGasStatus": "稼働中",
            "lifelineTelecommunicationStatus": "通常利用可",
            "recoveryProgressStatus": "軽微被害・使用可",
            "vacancyLevel": "体育館フロアは8割埋まり混雑。特別教室2室を追加開放中",
            "siteSituationNote": "毛布残数が少ないため広域物資拠点（DIS-003）から200枚転送手配中",
        },
        {
            "disasterStatusId": "DST-2026-003",
            "disasterBaseId": "DIS-003",
            "statusUpdateDateTime": "2026-09-12T19:00:00+09:00",
            "shelterOpeningStatus": "開設中",
            "shelterAcceptanceStatus": "受入可能",
            "currentEvacueeTotalCount": "210",
            "currentEvacueeMaleCount": "102",
            "currentEvacueeFemaleCount": "108",
            "currentEvacueeVulnerableCount": "9",
            "currentEvacueeHouseholdCount": "95",
            "stockFoodRemainingQuantity": "4500",
            "stockWaterRemainingQuantity": "9000",
            "stockBlanketCount": "1200",
            "lifelineElectricityStatus": "稼働中",
            "lifelineWaterStatus": "稼働中",
            "lifelineSewerageStatus": "稼働中",
            "lifelineGasStatus": "稼働中",
            "lifelineTelecommunicationStatus": "通常利用可",
            "recoveryProgressStatus": "被害なし",
            "vacancyLevel": "メインアリーナ余裕あり（残り400名以上受入可能）",
            "siteSituationNote": "青葉一小（DIS-002）からの誘導避難者を受入中。救援物資第1便到着済",
        },
        {
            "disasterStatusId": "DST-2026-004",
            "disasterBaseId": "DIS-004",
            "statusUpdateDateTime": "2026-09-12T19:10:00+09:00",
            "shelterOpeningStatus": "開設中",
            "shelterAcceptanceStatus": "受入終了",
            "currentEvacueeTotalCount": "115",
            "currentEvacueeMaleCount": "45",
            "currentEvacueeFemaleCount": "70",
            "currentEvacueeVulnerableCount": "82",
            "currentEvacueeHouseholdCount": "68",
            "stockFoodRemainingQuantity": "600",
            "stockWaterRemainingQuantity": "1500",
            "stockBlanketCount": "210",
            "lifelineElectricityStatus": "非常用電源稼働",
            "lifelineWaterStatus": "稼働中",
            "lifelineSewerageStatus": "稼働中",
            "lifelineGasStatus": "停止中",
            "lifelineTelecommunicationStatus": "一部制限",
            "recoveryProgressStatus": "応急復旧中",
            "vacancyLevel": "福祉避難スペース満床につき新規受入停止（事前登録・トリアージ対象のみ）",
            "siteSituationNote": "商用電源停電のため屋上非常用発電機にて医療機器用電源を供給中（燃料残62時間分）",
        },
        {
            "disasterStatusId": "DST-2026-005",
            "disasterBaseId": "DIS-005",
            "statusUpdateDateTime": "2026-09-12T19:15:00+09:00",
            "shelterOpeningStatus": "開設準備中",
            "shelterAcceptanceStatus": "受入一時中断",
            "currentEvacueeTotalCount": "0",
            "currentEvacueeMaleCount": "0",
            "currentEvacueeFemaleCount": "0",
            "currentEvacueeVulnerableCount": "0",
            "currentEvacueeHouseholdCount": "0",
            "stockFoodRemainingQuantity": "300",
            "stockWaterRemainingQuantity": "600",
            "stockBlanketCount": "100",
            "lifelineElectricityStatus": "稼働中",
            "lifelineWaterStatus": "稼働中",
            "lifelineSewerageStatus": "稼働中",
            "lifelineGasStatus": "稼働中",
            "lifelineTelecommunicationStatus": "通常利用可",
            "recoveryProgressStatus": "調査中",
            "vacancyLevel": "書架転倒防止の安全点検完了後に帰宅困難者90名分の開放予定",
            "siteSituationNote": "職員2名で館内安全確認を実施中（20時00分開設予定）",
        },
    ],
}


def main() -> None:
    ui_cfg = load_ui_texts()
    domain_overrides = ui_cfg.get("domains", {})
    table_overrides = ui_cfg.get("tables", {})
    common_overrides = ui_cfg.get("commonClasses", {})

    domains = []
    for d in BASE_DOMAINS:
        ov = domain_overrides.get(d["id"], {})
        merged = {**d}
        for key in ("name", "shortName", "summary"):
            if key in ov:
                merged[key] = ov[key]
        domains.append(merged)

    table_meta = {}
    for tid, meta in BASE_TABLE_META.items():
        ov = table_overrides.get(tid, {})
        merged = {**meta}
        for key in ("name", "roleNote", "rowUnit", "description"):
            if key in ov:
                merged[key] = ov[key]
        table_meta[tid] = merged

    common_meta = {}
    for cid, meta in BASE_COMMON_META.items():
        ov = common_overrides.get(cid, {})
        merged = {**meta}
        for key in ("name", "roleNote", "description"):
            if key in ov:
                merged[key] = ov[key]
        common_meta[cid] = merged

    model_csv_name = "施設管理データモデル.csv"
    model_rows = read_csv(model_csv_name)
    code_rows = read_csv("施設管理コード定義.csv")
    syn_summary_rows = read_csv("施設管理同義語一覧.csv")
    syn_detail_rows = read_csv("施設管理同義語詳細辞書.csv")
    muni_rows = read_csv("全国地方公共団体コード.csv")

    seen_sheets = []
    for r in model_rows:
        sh = r["シート名"].strip()
        if sh and sh not in seen_sheets:
            seen_sheets.append(sh)

    def is_primary_dataset_sheet(sheet_name: str) -> bool:
        return sheet_name in BASE_TABLE_META or sheet_name.startswith(("m_", "t_"))

    primary_sheets = [s for s in seen_sheets if is_primary_dataset_sheet(s)]
    raw_common_sheets = [s for s in seen_sheets if not is_primary_dataset_sheet(s)]

    # Order common classes in a logical architectural order while keeping any newly added sheets
    preferred_common_order = list(BASE_COMMON_META.keys())
    common_sheets = [s for s in preferred_common_order if s in raw_common_sheets] + [
        s for s in raw_common_sheets if s not in preferred_common_order
    ]

    # Auto-detect any newly added m_* / t_* primary dataset table
    extra_primary = [s for s in primary_sheets if s not in table_meta]
    if extra_primary:
        extra_dom_id = "extended_extra"
        domains.append(
            {
                "id": extra_dom_id,
                "code": f"{len(domains) + 1:02d}",
                "name": "追加拡張領域",
                "shortName": "追加領域",
                "color": "#475569",
                "bg": "#f8fafc",
                "border": "#cbd5e1",
                "summary": "CSVに追加された新規テーブル群です。",
                "classDoc": "",
                "tables": extra_primary,
            }
        )
        for sh in extra_primary:
            first_row = next(r for r in model_rows if r["シート名"].strip() == sh)
            ov = table_overrides.get(sh, {})
            table_meta[sh] = {
                "name": ov.get("name", first_row.get("クラス名") or sh),
                "classEn": first_row.get("クラス英語名") or sh,
                "domainId": extra_dom_id,
                "classId": "",
                "nature": "静的マスタ" if sh.startswith("m_") else "動的履歴",
                "rowUnit": ov.get("rowUnit", "1レコードにつき1行"),
                "roleNote": ov.get("roleNote", "CSVから自動検出されたテーブル"),
                "description": ov.get("description", f"{first_row.get('クラス名') or sh} のデータ項目定義です。"),
            }

    # Auto-detect any newly added common class sheet
    for sh in common_sheets:
        if sh not in common_meta:
            first_row = next(r for r in model_rows if r["シート名"].strip() == sh)
            ov = common_overrides.get(sh, {})
            common_meta[sh] = {
                "name": ov.get("name", first_row.get("クラス名") or sh),
                "classEn": first_row.get("クラス英語名") or sh,
                "nature": "共通クラス",
                "roleNote": ov.get("roleNote", "複数クラスで共用するデータ構造"),
                "description": ov.get("description", f"{first_row.get('クラス名') or sh} の共通クラス定義です。"),
            }

    active_primary_set = set(primary_sheets)
    for d in domains:
        d["tables"] = [t for t in d["tables"] if t in active_primary_set]
    domains = [d for d in domains if d["tables"]]

    # Build lookup maps for resolving 関連クラス and Mermaid class names -> sheet IDs
    rel_class_lookup: dict[str, str] = {}
    class_en_to_sheet: dict[str, dict] = {}
    sheet_display_name: dict[str, str] = {}

    for sh in primary_sheets:
        meta = table_meta[sh]
        sheet_display_name[sh] = meta["name"]
        rel_class_lookup[sh] = sh
        rel_class_lookup[meta["name"]] = sh
        rel_class_lookup[meta["classEn"]] = sh
        class_en_to_sheet[meta["classEn"]] = {
            "sheetId": sh,
            "kind": "table",
            "domainId": meta["domainId"],
        }

    for sh in common_sheets:
        meta = common_meta[sh]
        first_row = next(r for r in model_rows if r["シート名"].strip() == sh)
        csv_cls_ja = first_row.get("クラス名", "").strip()
        csv_cls_en = first_row.get("クラス英語名", "").strip() or meta["classEn"]
        meta["classEn"] = csv_cls_en
        sheet_display_name[sh] = meta["name"]
        for alias in (sh, meta["name"], csv_cls_ja, csv_cls_en):
            if alias:
                rel_class_lookup[alias] = sh
        class_en_to_sheet[csv_cls_en] = {
            "sheetId": sh,
            "kind": "common",
            "domainId": "common",
        }

    syn_summary_by_id = {r["対象内部管理ID"]: r for r in syn_summary_rows}
    syn_details_by_id = defaultdict(list)
    for r in syn_detail_rows:
        syn_details_by_id[r["対象内部管理ID"]].append(
            {
                "lang": r["対象言語"],
                "term": r["同義語名"],
                "relation": r["対応関係の種類"],
                "scope": r["定義・適用範囲"],
                "source": r["出典"],
                "status": r["確認状態"],
                "note": r["備考"],
            }
        )

    list_used_by = defaultdict(list)
    common_ref_by = defaultdict(list)

    for r in model_rows:
        sh = r["シート名"].strip()
        lid = r["リストID"].strip()
        if lid:
            list_used_by[lid].append(
                {
                    "propId": r["内部管理ID"],
                    "tableId": sh,
                    "tableName": sheet_display_name.get(sh, sh),
                    "isCommon": sh not in active_primary_set,
                    "ja": r["日本語名"],
                    "en": r["英語名"],
                }
            )
        rel_cls = r.get("関連クラス", "").strip()
        if rel_cls:
            target_sh = rel_class_lookup.get(rel_cls, "")
            if target_sh:
                common_ref_by[target_sh].append(
                    {
                        "propId": r["内部管理ID"],
                        "tableId": sh,
                        "tableName": sheet_display_name.get(sh, sh),
                        "isCommon": sh not in active_primary_set,
                        "ja": r["日本語名"],
                        "en": r["英語名"],
                    }
                )

    grouped_codes = defaultdict(list)
    for r in code_rows:
        if r["コードリストID"].strip():
            grouped_codes[r["コードリストID"].strip()].append(r)

    code_lists = []
    for lid, items in grouped_codes.items():
        first = items[0]
        code_lists.append(
            {
                "id": lid,
                "name": first["リスト名"],
                "enName": first["英語リスト名"],
                "category": first["区分"],
                "sourceSpec": first["参照規格・体系名"],
                "sourceUrl": first["参照URL"],
                "count": len(items),
                "usedBy": list_used_by.get(lid, []),
                "items": [
                    {
                        "code": x["符号"],
                        "altCode": x["符号別案"],
                        "ja": x["日本語ラベル"],
                        "altJa": x["日本語ラベル別名"],
                        "en": x["英語ラベル"],
                        "major": x["大分類"],
                        "middle": x["中分類"],
                        "desc": x["説明"],
                        "note": x["備考"],
                    }
                    for x in items
                ],
            }
        )

    muni_list_id = muni_rows[0]["コードリストID"].strip() if muni_rows else ""
    if muni_list_id:
        pref_counts = defaultdict(int)
        for mr in muni_rows:
            pref_counts[mr["都道府県名"]] += 1
        code_lists.append(
            {
                "id": muni_list_id,
                "name": "全国地方公共団体コード",
                "enName": "LocalGovernmentCode",
                "category": "公的標準コード（総務省）",
                "sourceSpec": muni_rows[0].get("参照元規格", "JIS X 0401 / JIS X 0402（総務省 全国地方公共団体コード）"),
                "sourceUrl": "",
                "count": len(muni_rows),
                "isMunicipalityList": True,
                "usedBy": list_used_by.get(muni_list_id, []),
                "items": [
                    {
                        "code": mr["全国地方公共団体コード"],
                        "altCode": mr["市区町村コード"],
                        "ja": mr["団体名"].strip() or f"{mr['都道府県名']}{mr['市区町村名']}{mr['行政区名']}".strip(),
                        "altJa": mr["団体名カナ"],
                        "en": mr["団体区分"],
                        "major": mr["都道府県名"],
                        "middle": mr["団体区分"],
                        "desc": f"都道府県コード: {mr['都道府県コード']} / 団体区分: {mr['団体区分']}",
                        "note": mr["備考"],
                    }
                    for mr in muni_rows
                ],
                "prefSummary": [{"pref": k, "count": v} for k, v in pref_counts.items()],
            }
        )

    code_lists.sort(key=lambda x: (0 if x["usedBy"] else 1, x["name"]))
    valid_code_list_ids = {cl["id"] for cl in code_lists}

    fk_map = {}
    for rel in RELATIONS:
        if rel["kind"] == "standard" and rel["fromProp"]:
            fk_map[rel["fromProp"]] = {
                "relationId": rel["id"],
                "toTable": rel["toTable"],
                "toCol": rel["toCol"],
                "toProp": rel["toProp"],
                "cardinality": rel["cardinality"],
                "plainCardinality": rel["plainCardinality"],
                "label": rel["label"],
            }

    # Parse 02_クラス図 Mermaid diagrams and collect diagram appearances per sheet
    class_diagrams = load_class_diagrams(class_en_to_sheet)
    diagrams_by_sheet = defaultdict(list)
    for grp in class_diagrams:
        seen_sheets_in_grp = set()
        for var in grp["variants"]:
            for c in var["classes"]:
                sh = c.get("sheetId")
                if sh and sh not in seen_sheets_in_grp:
                    seen_sheets_in_grp.add(sh)
                    diagrams_by_sheet[sh].append(
                        {
                            "diagramId": grp["id"],
                            "variantIndex": var["index"],
                            "label": grp["shortName"],
                        }
                    )

    def build_columns_for_sheet(sheet_id: str) -> list[dict]:
        rows = [r for r in model_rows if r["シート名"].strip() == sheet_id]
        cols = []
        for r in rows:
            pid = r["内部管理ID"].strip()
            sum_syn = syn_summary_by_id.get(pid, {})
            req_val = r["必須"].strip() or "任意"
            raw_lid = r["リストID"].strip()
            rel_cls_raw = r.get("関連クラス", "").strip()
            rel_cls_id = rel_class_lookup.get(rel_cls_raw, "") if rel_cls_raw else ""

            fk_target = fk_map.get(pid)
            if not fk_target and r["KEY"].strip() == "FK" and r["英語名"].strip() == "facilityId":
                fk_target = {
                    "relationId": "REL_FAC_SELF",
                    "toTable": "m_facilities",
                    "toCol": "facilityId",
                    "toProp": "PROP_FAC_001",
                    "cardinality": "1 : 0..*",
                    "plainCardinality": "施設基本マスタ（facilityId）を参照",
                    "label": "施設基本マスタへの外部キー参照",
                }

            cols.append(
                {
                    "id": pid,
                    "tableId": sheet_id,
                    "ja": r["日本語名"],
                    "altJa": r["日本語別名"],
                    "en": r["英語名"],
                    "altEn": r["英語別名"],
                    "required": req_val,
                    "key": r["KEY"].strip(),
                    "multiplicity": r["多重度"].strip(),
                    "dataType": r["データ型"].strip(),
                    "pattern": r["正規パターン"].strip(),
                    "unit": r["単位"].strip(),
                    "listName": r["リスト"].strip(),
                    "listId": raw_lid if raw_lid in valid_code_list_ids else "",
                    "relatedClass": rel_cls_raw,
                    "relatedClassId": rel_cls_id,
                    "parentClass": r.get("親クラス", "").strip(),
                    "desc": r["説明"],
                    "note": r["特記"],
                    "refUrl": r["参考URL"],
                    "refUrl2": r["参考URL2"],
                    "section": classify_facility_group(pid) if sheet_id == "m_facilities" else "",
                    "fkTarget": fk_target,
                    "synSummaryJa": sum_syn.get("日本語同義語名", ""),
                    "synSummaryEn": sum_syn.get("英語同義語名", ""),
                    "synScope": sum_syn.get("定義・適用範囲", ""),
                    "synonyms": syn_details_by_id.get(pid, []),
                }
            )
        return cols

    tables = []
    for table_id in primary_sheets:
        meta = table_meta[table_id]
        class_syn = syn_summary_by_id.get(meta["classId"], {})
        columns = build_columns_for_sheet(table_id)
        tables.append(
            {
                "id": table_id,
                "isCommonClass": False,
                "name": meta["name"],
                "classEn": meta["classEn"],
                "domainId": meta["domainId"],
                "classId": meta["classId"],
                "nature": meta["nature"],
                "rowUnit": meta["rowUnit"],
                "roleNote": meta["roleNote"],
                "description": meta["description"],
                "classSynonymsJa": class_syn.get("日本語同義語名", ""),
                "classSynonymsEn": class_syn.get("英語同義語名", ""),
                "requiredCount": sum(1 for c in columns if c["required"] == "必須"),
                "recommendedCount": sum(1 for c in columns if c["required"] == "推奨"),
                "optionalCount": sum(1 for c in columns if c["required"] not in ("必須", "推奨")),
                "codeRefCount": sum(1 for c in columns if c["listId"]),
                "relClassRefCount": sum(1 for c in columns if c["relatedClassId"]),
                "usedInDiagrams": diagrams_by_sheet.get(table_id, []),
                "columns": columns,
            }
        )

    common_classes = []
    for cid in common_sheets:
        meta = common_meta[cid]
        columns = build_columns_for_sheet(cid)
        common_classes.append(
            {
                "id": cid,
                "isCommonClass": True,
                "name": meta["name"],
                "classEn": meta["classEn"],
                "domainId": "common",
                "classId": "",
                "nature": meta["nature"],
                "rowUnit": meta.get("rowUnit", ""),
                "roleNote": meta["roleNote"],
                "description": meta["description"],
                "classSynonymsJa": "",
                "classSynonymsEn": "",
                "requiredCount": sum(1 for c in columns if c["required"] == "必須"),
                "recommendedCount": sum(1 for c in columns if c["required"] == "推奨"),
                "optionalCount": sum(1 for c in columns if c["required"] not in ("必須", "推奨")),
                "codeRefCount": sum(1 for c in columns if c["listId"]),
                "relClassRefCount": sum(1 for c in columns if c["relatedClassId"]),
                "referencedBy": common_ref_by.get(cid, []),
                "usedInDiagrams": diagrams_by_sheet.get(cid, []),
                "columns": columns,
            }
        )

    branding = ui_cfg.get("branding", {})
    common_sec = ui_cfg.get("commonSection", {})
    ui_bundle = {
        "branding": {
            "appName": branding.get("appName", "施設管理データ標準化スタジオ"),
            "version": branding.get("version", "2.0"),
            "sidebarTitle": branding.get("sidebarTitle", "施設管理データ\n標準化スタジオ"),
            "sidebarSubtitle": branding.get("sidebarSubtitle", "DATA STANDARD STUDIO"),
            "sidebarDomainHeading": branding.get("sidebarDomainHeading", "業務領域・共通クラス"),
            "footerLeft": branding.get("footerLeft", "施設管理データ標準化スタジオ v2.0"),
            "footerRight": branding.get("footerRight", "ブラウザ内完結・外部送信なし"),
        },
        "overviewHero": ui_cfg.get(
            "overviewHero",
            {
                "eyebrow": "MUNICIPAL FACILITY MANAGEMENT DATA MODEL",
                "title": "自治体施設管理データモデル",
                "description": "施設基本マスタを起点に、各業務領域のデータセット定義・共通クラス構造・統制語彙・Mermaidクラス図を統合しています。",
            },
        ),
        "overviewSection": ui_cfg.get(
            "overviewSection",
            {
                "title": "業務領域と収録テーブル",
                "subtitle": "基本データセットを構成する業務領域です。テーブルを押すと項目定義一覧が開きます",
            },
        ),
        "commonSection": {
            "name": common_sec.get("name", "共通クラス"),
            "shortName": common_sec.get("shortName", "共通クラス"),
            "title": common_sec.get("title", "共通クラス・複合データ構造（クラス図対応）"),
            "subtitle": common_sec.get(
                "subtitle",
                "基本データセットの各項目やMermaidクラス図から参照される部品クラス（建物・住所・連絡先・スケジュール等）の定義です",
            ),
            "summary": common_sec.get(
                "summary",
                "GIF（政府相互運用性フレームワーク）およびクラス図に準拠した共通データ構造です。",
            ),
        },
        "pageHeaders": ui_cfg.get("pageHeaders", {}),
    }

    primary_col_count = sum(len(t["columns"]) for t in tables)
    common_col_count = sum(len(c["columns"]) for c in common_classes)

    payload = {
        "appName": ui_bundle["branding"]["appName"],
        "version": ui_bundle["branding"]["version"],
        "ui": ui_bundle,
        "sources": [
            f"{model_csv_name}（基本{len(tables)}テーブル {primary_col_count}項目 ＋ 共通{len(common_classes)}クラス {common_col_count}項目）",
            f"施設管理コード定義.csv（{len(grouped_codes)}リスト・{len(code_rows)}定義）",
            f"{CLASS_DOCS_DIR_NAME}/*.md（{len(class_diagrams)}ファイル・Mermaidクラス図 {sum(len(g['variants']) for g in class_diagrams)}図）",
            f"施設管理同義語一覧.csv（{len(syn_summary_rows)}件） / 詳細辞書（{len(syn_detail_rows)}件）",
            f"全国地方公共団体コード.csv（{len(muni_rows)}団体）",
            "ui_texts.json（画面テキスト・説明文設定）",
        ],
        "domains": domains,
        "tables": tables,
        "commonClasses": common_classes,
        "classDiagrams": class_diagrams,
        "relations": [
            r for r in RELATIONS if r["fromTable"] in active_primary_set and r["toTable"] in active_primary_set
        ],
        "codeLists": code_lists,
        "rawCodeColumns": list(code_rows[0].keys()) if code_rows else [],
        "rawCodes": code_rows,
        "samples": SAMPLES,
    }

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    pretty_json = json.dumps(payload, ensure_ascii=False, indent=2)
    (DATA_DIR / "model.json").write_text(pretty_json + "\n", encoding="utf-8", newline="\n")

    compact_json = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    model_script = (
        "globalThis.STUDIO_MODEL="
        + compact_json.replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
        + ";"
    )
    (DATA_DIR / "model-data.js").write_text(model_script, encoding="utf-8", newline="\n")

    index_path = DIST / "index.html"
    css_path = DIST / "style.css"
    js_path = DIST / "app.js"
    if index_path.exists() and css_path.exists() and js_path.exists():
        html = index_path.read_text(encoding="utf-8")
        css = css_path.read_text(encoding="utf-8")
        app_script = js_path.read_text(encoding="utf-8")
        policy = (
            "default-src 'none'; "
            f"script-src {sha256_source(model_script)} {sha256_source(app_script)}; "
            "style-src 'unsafe-inline'; connect-src 'none'; img-src data:; "
            "object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'"
        )
        html = html.replace(
            "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'none'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'",
            policy,
        )
        html = html.replace('<link rel="stylesheet" href="./style.css">', f"<style>{css}</style>")
        html = html.replace('<script defer src="./data/model-data.js"></script>', "")
        html = html.replace('<script defer src="./app.js"></script>', "")
        html = html.replace(
            "</body>",
            f"<script>{model_script}</script>\n<script>{app_script}</script>\n</body>",
        )
        standalone_path = DIST / "standalone.html"
        standalone_path.write_text(html, encoding="utf-8", newline="\n")
        print(
            f"Built {len(tables)} primary tables ({primary_col_count} cols), "
            f"{len(common_classes)} common classes ({common_col_count} cols), "
            f"{len(code_lists)} code lists, "
            f"{sum(len(g['variants']) for g in class_diagrams)} Mermaid diagrams."
        )
        print(f"Wrote {DATA_DIR / 'model.json'} ({(DATA_DIR / 'model.json').stat().st_size:,} bytes)")
        print(f"Wrote {standalone_path} ({standalone_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
