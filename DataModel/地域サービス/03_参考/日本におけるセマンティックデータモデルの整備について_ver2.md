# 日本における分野横断セマンティックデータモデル基盤の整備について

## ～ AI時代におけるデータ流通と意味の相互運用性の実現を目指して ～

---

# 目次

---

## [第1章 はじめに](#第1章-はじめに)

<details>
<summary>第1章 はじめに の詳細項目（節・細章）を開く</summary>

[1.1 背景](#11-背景)

[1.2 本書の目的](#12-本書の目的)

[1.3 本書の基本的な立場](#13-本書の基本的な立場)

[1.4 本書の対象読者](#14-本書の対象読者)

</details>

## [第2章 AI・データ流通時代が求めるデータ標準](#第2章-ai・データ流通時代が求めるデータ標準)

<details>
<summary>第2章 AI・データ流通時代が求めるデータ標準 の詳細項目（節・細章）を開く</summary>

[2.1 AI時代におけるデータ活用の変化](#21-ai時代におけるデータ活用の変化)

[2.2 データ流通の重要性](#22-データ流通の重要性)

&nbsp;&nbsp;&nbsp;&nbsp;[2.2.1 データを再利用できることの価値](#221-データを再利用できることの価値)

&nbsp;&nbsp;&nbsp;&nbsp;[2.2.2 データの意味を再利用可能な資産にする](#222-データの意味を再利用可能な資産にする)

&nbsp;&nbsp;&nbsp;&nbsp;[2.2.3 大規模なデータ利用と意味モデル](#223-大規模なデータ利用と意味モデル)

[2.3 データスペースとセマンティックなデータ基盤](#23-データスペースとセマンティックなデータ基盤)

[2.4 従来の標準化とその限界](#24-従来の標準化とその限界)

&nbsp;&nbsp;&nbsp;&nbsp;[2.4.1 構文（Syntax）の標準化](#241-構文syntaxの標準化)

&nbsp;&nbsp;&nbsp;&nbsp;[2.4.2 意味（Semantics）の標準化](#242-意味semanticsの標準化)

[2.5 日本における「意味」の標準化を考える際の注意点](#25-日本における意味の標準化を考える際の注意点)

[2.6 AIが利用・確認できるデータとは何か](#26-aiが利用・確認できるデータとは何か)

&nbsp;&nbsp;&nbsp;&nbsp;[2.6.1 データ項目・語彙を説明するセマンティック情報](#261-データ項目・語彙を説明するセマンティック情報)

&nbsp;&nbsp;&nbsp;&nbsp;[2.6.2 データセットを説明するメタデータ](#262-データセットを説明するメタデータ)

&nbsp;&nbsp;&nbsp;&nbsp;[2.6.3 Semantic InformationとMetadataを組み合わせる](#263-semantic-informationとmetadataを組み合わせる)

[2.7 本書が目指すデータ標準](#27-本書が目指すデータ標準)

[2.8 データ標準化の目指す姿](#28-データ標準化の目指す姿)

</details>

## [第3章 日本のデータ標準化の現状と新たな課題](#第3章-日本のデータ標準化の現状と新たな課題)

<details>
<summary>第3章 日本のデータ標準化の現状と新たな課題 の詳細項目（節・細章）を開く</summary>

[3.1 日本におけるデータ標準化の現状](#31-日本におけるデータ標準化の現状)

[3.2 日本における主な標準化の取り組み](#32-日本における主な標準化の取り組み)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.1 JISによる標準化](#321-jisによる標準化)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.2 日本標準産業分類](#322-日本標準産業分類)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.3 日本標準職業分類](#323-日本標準職業分類)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.4 ベース・レジストリ](#324-ベース・レジストリ)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.5 IMI](#325-imi)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.6 政府相互運用性フレームワーク（GIF）](#326-政府相互運用性フレームワークgif)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2.7 地方公共団体情報システムの標準化](#327-地方公共団体情報システムの標準化)

[3.3 日本のデータ標準化における構造的な特徴](#33-日本のデータ標準化における構造的な特徴)

&nbsp;&nbsp;&nbsp;&nbsp;[3.3.1 分野別の標準資産が豊富である](#331-分野別の標準資産が豊富である)

&nbsp;&nbsp;&nbsp;&nbsp;[3.3.2 標準化の目的が異なる](#332-標準化の目的が異なる)

&nbsp;&nbsp;&nbsp;&nbsp;[3.3.3 同じ対象でも異なるモデルが存在する](#333-同じ対象でも異なるモデルが存在する)

&nbsp;&nbsp;&nbsp;&nbsp;[3.3.4 「標準間」が新しい標準化対象となる](#334-標準間が新しい標準化対象となる)

[3.4 現状の課題](#34-現状の課題)

&nbsp;&nbsp;&nbsp;&nbsp;[3.4.1 項目名称だけでは意味を共有できない](#341-項目名称だけでは意味を共有できない)

&nbsp;&nbsp;&nbsp;&nbsp;[3.4.2 データ整備・連携における重複と変換負担](#342-データ整備・連携における重複と変換負担)

&nbsp;&nbsp;&nbsp;&nbsp;[3.4.3 データ辞書・定義情報が分散している](#343-データ辞書・定義情報が分散している)

&nbsp;&nbsp;&nbsp;&nbsp;[3.4.4 概念を名称から独立して識別する必要がある](#344-概念を名称から独立して識別する必要がある)

&nbsp;&nbsp;&nbsp;&nbsp;[3.4.5 標準間のMappingを管理する必要がある](#345-標準間のmappingを管理する必要がある)

[3.5 IMI・GIFから得られる示唆](#35-imi・gifから得られる示唆)

[3.6 本提言が対象とするセマンティックデータモデル基盤](#36-本提言が対象とするセマンティックデータモデル基盤)

[3.7 分野横断セマンティック基盤の実現方法](#37-分野横断セマンティック基盤の実現方法)

[3.8 本章のまとめ](#38-本章のまとめ)

</details>

## [第4章 データモデルとは何か](#第4章-データモデルとは何か)

<details>
<summary>第4章 データモデルとは何か の詳細項目（節・細章）を開く</summary>

[4.1 データモデルの定義](#41-データモデルの定義)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1.1 データモデルとは](#411-データモデルとは)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1.2 データモデルが表現するもの](#412-データモデルが表現するもの)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1.3 データモデルは目的に依存する](#413-データモデルは目的に依存する)

[4.2 データモデルの役割](#42-データモデルの役割)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.1 対象と構造を明確にする](#421-対象と構造を明確にする)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.2 業務上の意味を共有する](#422-業務上の意味を共有する)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.3 データ品質を確保する](#423-データ品質を確保する)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.4 データ交換と再利用を支える](#424-データ交換と再利用を支える)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.5 コミュニケーションの基盤となる](#425-コミュニケーションの基盤となる)

[4.3 概念データモデル・論理データモデル・物理データモデル](#43-概念データモデル・論理データモデル・物理データモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.1 概念データモデル](#431-概念データモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.2 論理データモデル](#432-論理データモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.3 物理データモデル](#433-物理データモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.4 モデルと実装表現を分離する](#434-モデルと実装表現を分離する)

[4.4 組織・システムを越えたデータモデルの課題](#44-組織・システムを越えたデータモデルの課題)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.1 同じ名称でも意味が異なる](#441-同じ名称でも意味が異なる)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.2 異なる名称でも同じ概念の場合がある](#442-異なる名称でも同じ概念の場合がある)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.3 意味がシステム内部に閉じている](#443-意味がシステム内部に閉じている)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.4 個別Mappingが増加する](#444-個別mappingが増加する)

[4.5 セマンティックデータモデルへの発展](#45-セマンティックデータモデルへの発展)

&nbsp;&nbsp;&nbsp;&nbsp;[4.5.1 「意味を追加する」より「意味を外部化する」](#451-意味を追加するより意味を外部化する)

&nbsp;&nbsp;&nbsp;&nbsp;[4.5.2 セマンティックデータモデルが扱う要素](#452-セマンティックデータモデルが扱う要素)

&nbsp;&nbsp;&nbsp;&nbsp;[4.5.3 UMLクラス図と機械可読成果物](#453-umlクラス図と機械可読成果物)

[4.6 本章のまとめ](#46-本章のまとめ)

</details>

## [第5章 セマンティックデータモデル](#第5章-セマンティックデータモデル)

<details>
<summary>第5章 セマンティックデータモデル の詳細項目（節・細章）を開く</summary>

[5.1 セマンティックデータモデルとは](#51-セマンティックデータモデルとは)

&nbsp;&nbsp;&nbsp;&nbsp;[5.1.1 セマンティックデータモデルの考え方](#511-セマンティックデータモデルの考え方)

&nbsp;&nbsp;&nbsp;&nbsp;[5.1.2 意味をデータとして管理する](#512-意味をデータとして管理する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.1.3 既存データを作り直す必要はない](#513-既存データを作り直す必要はない)

[5.2 意味を共有するとは何か](#52-意味を共有するとは何か)

&nbsp;&nbsp;&nbsp;&nbsp;[5.2.1 文字列の一致と意味の一致は異なる](#521-文字列の一致と意味の一致は異なる)

&nbsp;&nbsp;&nbsp;&nbsp;[5.2.2 意味を共有するために必要な情報](#522-意味を共有するために必要な情報)

&nbsp;&nbsp;&nbsp;&nbsp;[5.2.3 同じ言葉に複数のConceptが存在する](#523-同じ言葉に複数のconceptが存在する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.2.4 Concept間の関係を管理する](#524-concept間の関係を管理する)

[5.3 データモデル・共通語彙・データ辞書の関係](#53-データモデル・共通語彙・データ辞書の関係)

&nbsp;&nbsp;&nbsp;&nbsp;[5.3.1 データモデル](#531-データモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[5.3.2 共通語彙](#532-共通語彙)

&nbsp;&nbsp;&nbsp;&nbsp;[5.3.3 データ辞書](#533-データ辞書)

&nbsp;&nbsp;&nbsp;&nbsp;[5.3.4 DMD相当のモデル記述を中心に接続する](#534-dmd相当のモデル記述を中心に接続する)

[5.4 オントロジーとの関係](#54-オントロジーとの関係)

&nbsp;&nbsp;&nbsp;&nbsp;[5.4.1 オントロジーとは](#541-オントロジーとは)

&nbsp;&nbsp;&nbsp;&nbsp;[5.4.2 Semantic、Ontology、Semantic Data Modelの関係](#542-semanticontologysemantic-data-modelの関係)

&nbsp;&nbsp;&nbsp;&nbsp;[5.4.3 巨大なオントロジーを作る必要はない](#543-巨大なオントロジーを作る必要はない)

[5.5 語彙・分類・オントロジーと表現力](#55-語彙・分類・オントロジーと表現力)

&nbsp;&nbsp;&nbsp;&nbsp;[5.5.1 主な概念と表現対象](#551-主な概念と表現対象)

&nbsp;&nbsp;&nbsp;&nbsp;[5.5.2 技術表現との関係](#552-技術表現との関係)

[5.6 セマンティックデータモデルがもたらす効果](#56-セマンティックデータモデルがもたらす効果)

&nbsp;&nbsp;&nbsp;&nbsp;[5.6.1 相互運用性の向上](#561-相互運用性の向上)

&nbsp;&nbsp;&nbsp;&nbsp;[5.6.2 発見性の向上](#562-発見性の向上)

&nbsp;&nbsp;&nbsp;&nbsp;[5.6.3 再利用性の向上](#563-再利用性の向上)

&nbsp;&nbsp;&nbsp;&nbsp;[5.6.4 データ統合負担の軽減](#564-データ統合負担の軽減)

&nbsp;&nbsp;&nbsp;&nbsp;[5.6.5 AIによる利用](#565-aiによる利用)

[5.7 セマンティックデータモデル整備の基本原則](#57-セマンティックデータモデル整備の基本原則)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.1 既存標準を再利用する](#571-既存標準を再利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.2 ConceptとData Elementを分離する](#572-conceptとdata-elementを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.3 安定したIdentifierとNamespaceを利用する](#573-安定したidentifierとnamespaceを利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.4 モデルと表現形式を分離する](#574-モデルと表現形式を分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.5 人間向けと機械向けを同じ情報源から管理する](#575-人間向けと機械向けを同じ情報源から管理する)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.6 利用者にSemantic Web技術を強制しない](#576-利用者にsemantic-web技術を強制しない)

&nbsp;&nbsp;&nbsp;&nbsp;[5.7.7 小さく始める](#577-小さく始める)

[5.8 本章のまとめ](#58-本章のまとめ)

</details>

## [第6章 セマンティックWeb技術](#第6章-セマンティックweb技術)

<details>
<summary>第6章 セマンティックWeb技術 の詳細項目（節・細章）を開く</summary>

[6.1 セマンティックWebの概要](#61-セマンティックwebの概要)

&nbsp;&nbsp;&nbsp;&nbsp;[6.1.1 セマンティックWebとは](#611-セマンティックwebとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.1.2 URI・IRIとNamespace](#612-uri・iriとnamespace)

[6.2 RDF](#62-rdf)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.1 RDFとは](#621-rdfとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.2 RDFはグラフとして関係を表現する](#622-rdfはグラフとして関係を表現する)

&nbsp;&nbsp;&nbsp;&nbsp;[6.2.3 RDFは特定の保存方式ではない](#623-rdfは特定の保存方式ではない)

[6.3 RDFS](#63-rdfs)

&nbsp;&nbsp;&nbsp;&nbsp;[6.3.1 RDFSとは](#631-rdfsとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.3.2 ClassとProperty](#632-classとproperty)

&nbsp;&nbsp;&nbsp;&nbsp;[6.3.3 本書におけるRDFSの位置付け](#633-本書におけるrdfsの位置付け)

&nbsp;&nbsp;&nbsp;&nbsp;[6.3.4 RDFSはValidation Schemaではない](#634-rdfsはvalidation-schemaではない)

[6.4 OWL](#64-owl)

&nbsp;&nbsp;&nbsp;&nbsp;[6.4.1 OWLとは](#641-owlとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.4.2 本書におけるOWLの位置付け](#642-本書におけるowlの位置付け)

[6.5 SKOS](#65-skos)

&nbsp;&nbsp;&nbsp;&nbsp;[6.5.1 SKOSとは](#651-skosとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.5.2 LabelとConceptを分離する](#652-labelとconceptを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[6.5.3 Concept間の関係](#653-concept間の関係)

&nbsp;&nbsp;&nbsp;&nbsp;[6.5.4 国内分類・コード体系への利用](#654-国内分類・コード体系への利用)

[6.6 JSON-LD](#66-json-ld)

&nbsp;&nbsp;&nbsp;&nbsp;[6.6.1 JSON-LDとは](#661-json-ldとは)

&nbsp;&nbsp;&nbsp;&nbsp;[6.6.2 JSON-LD Context](#662-json-ld-context)

&nbsp;&nbsp;&nbsp;&nbsp;[6.6.3 JSON-LD ContextとRDFSの役割](#663-json-ld-contextとrdfsの役割)

&nbsp;&nbsp;&nbsp;&nbsp;[6.6.4 Namespaceを参照可能にする](#664-namespaceを参照可能にする)

&nbsp;&nbsp;&nbsp;&nbsp;[6.6.5 一般開発者にRDFを意識させない](#665-一般開発者にrdfを意識させない)

[6.7 SPARQL](#67-sparql)

[6.8 Linked Data](#68-linked-data)

[6.9 セマンティックWeb技術の関係と役割分担](#69-セマンティックweb技術の関係と役割分担)

[6.10 分野横断データ基盤における技術の使い分け](#610-分野横断データ基盤における技術の使い分け)

&nbsp;&nbsp;&nbsp;&nbsp;[6.10.1 当面の標準パッケージ](#6101-当面の標準パッケージ)

&nbsp;&nbsp;&nbsp;&nbsp;[6.10.2 Classification・Thesaurus・Code](#6102-classification・thesaurus・code)

&nbsp;&nbsp;&nbsp;&nbsp;[6.10.3 高度なOntology](#6103-高度なontology)

&nbsp;&nbsp;&nbsp;&nbsp;[6.10.4 Graph利用](#6104-graph利用)

&nbsp;&nbsp;&nbsp;&nbsp;[6.10.5 技術を利用者から隠蔽する](#6105-技術を利用者から隠蔽する)

[6.11 本章のまとめ](#611-本章のまとめ)

</details>

## [第7章 海外における標準化動向](#第7章-海外における標準化動向)

<details>
<summary>第7章 海外における標準化動向 の詳細項目（節・細章）を開く</summary>

[7.1 W3Cの取り組み](#71-w3cの取り組み)

&nbsp;&nbsp;&nbsp;&nbsp;[7.1.1 セマンティックなデータ利用を支える技術標準](#711-セマンティックなデータ利用を支える技術標準)

&nbsp;&nbsp;&nbsp;&nbsp;[7.1.2 意味の設計と技術表現を分離する](#712-意味の設計と技術表現を分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.1.3 W3Cから得られる示唆](#713-w3cから得られる示唆)

[7.2 SEMIC Core Vocabularies](#72-semic-core-vocabularies)

&nbsp;&nbsp;&nbsp;&nbsp;[7.2.1 Core Vocabularyの考え方](#721-core-vocabularyの考え方)

&nbsp;&nbsp;&nbsp;&nbsp;[7.2.2 Existing ModelとのMapping](#722-existing-modelとのmapping)

&nbsp;&nbsp;&nbsp;&nbsp;[7.2.3 大規模化と実装可能性](#723-大規模化と実装可能性)

[7.3 Schema.org](#73-schemaorg)

&nbsp;&nbsp;&nbsp;&nbsp;[7.3.1 Schema.orgの特徴](#731-schemaorgの特徴)

&nbsp;&nbsp;&nbsp;&nbsp;[7.3.2 既存Vocabularyとして利用する](#732-既存vocabularyとして利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.3.3 JSON-LDによる利用](#733-json-ldによる利用)

[7.4 NIEM](#74-niem)

&nbsp;&nbsp;&nbsp;&nbsp;[7.4.1 Core + Domainの考え方](#741-core-domainの考え方)

&nbsp;&nbsp;&nbsp;&nbsp;[7.4.2 既存データ資産を出発点とする](#742-既存データ資産を出発点とする)

&nbsp;&nbsp;&nbsp;&nbsp;[7.4.3 ModelとImplementationを分離する](#743-modelとimplementationを分離する)

[7.5 CityGML](#75-citygml)

&nbsp;&nbsp;&nbsp;&nbsp;[7.5.1 Domain固有のSemantic Data Model](#751-domain固有のsemantic-data-model)

&nbsp;&nbsp;&nbsp;&nbsp;[7.5.2 既存Domain Modelを維持しながら参照・Mappingする](#752-既存domain-modelを維持しながら参照・mappingする)

&nbsp;&nbsp;&nbsp;&nbsp;[7.5.3 Schema.orgとCityGMLの使い分け](#753-schemaorgとcitygmlの使い分け)

[7.6 海外事例から得られる示唆](#76-海外事例から得られる示唆)

&nbsp;&nbsp;&nbsp;&nbsp;[7.6.1 Small CoreとDomainを分離する](#761-small-coreとdomainを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.6.2 Existing Standardを再利用する](#762-existing-standardを再利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.6.3 ModelとImplementationを分離する](#763-modelとimplementationを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.6.4 Namespaceを持つ既存Vocabularyを活用する](#764-namespaceを持つ既存vocabularyを活用する)

&nbsp;&nbsp;&nbsp;&nbsp;[7.6.5 標準を実装可能な単位で整備する](#765-標準を実装可能な単位で整備する)

[7.7 日本への示唆](#77-日本への示唆)

[7.8 本章のまとめ](#78-本章のまとめ)

</details>

## [第8章 日本で整備すべき分野横断セマンティックデータモデル基盤](#第8章-日本で整備すべき分野横断セマンティックデータモデル基盤)

<details>
<summary>第8章 日本で整備すべき分野横断セマンティックデータモデル基盤 の詳細項目（節・細章）を開く</summary>

[8.1 全体アーキテクチャ](#81-全体アーキテクチャ)

&nbsp;&nbsp;&nbsp;&nbsp;[8.1.1 基本的な考え方](#811-基本的な考え方)

&nbsp;&nbsp;&nbsp;&nbsp;[8.1.2 Data Spaceとの関係](#812-data-spaceとの関係)

&nbsp;&nbsp;&nbsp;&nbsp;[8.1.3 基盤のレイヤー](#813-基盤のレイヤー)

[8.2 Common Core Model](#82-common-core-model)

&nbsp;&nbsp;&nbsp;&nbsp;[8.2.1 Common Coreの役割](#821-common-coreの役割)

&nbsp;&nbsp;&nbsp;&nbsp;[8.2.2 Small Coreを基本とする](#822-small-coreを基本とする)

&nbsp;&nbsp;&nbsp;&nbsp;[8.2.3 PilotからCoreを抽出する](#823-pilotからcoreを抽出する)

[8.3 Domain Modelと既存標準との関係](#83-domain-modelと既存標準との関係)

[8.4 共通語彙](#84-共通語彙)

&nbsp;&nbsp;&nbsp;&nbsp;[8.4.1 Vocabularyの役割](#841-vocabularyの役割)

&nbsp;&nbsp;&nbsp;&nbsp;[8.4.2 ConceptとLabelを分離する](#842-conceptとlabelを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.4.3 Existing Vocabularyを再利用する](#843-existing-vocabularyを再利用する)

[8.5 データ辞書・Metadata Registry](#85-データ辞書・metadata-registry)

&nbsp;&nbsp;&nbsp;&nbsp;[8.5.1 VocabularyとData Dictionaryの定義](#851-vocabularyとdata-dictionaryの定義)

&nbsp;&nbsp;&nbsp;&nbsp;[8.5.2 両者を分離しつつ接続する](#852-両者を分離しつつ接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.5.3 Data Dictionaryで管理する項目](#853-data-dictionaryで管理する項目)

&nbsp;&nbsp;&nbsp;&nbsp;[8.5.4 ISO/IEC 11179の考え方を参照する](#854-isoiec-11179の考え方を参照する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.5.5 JSON SchemaとJSON-LDへの接続](#855-json-schemaとjson-ldへの接続)

[8.6 コード体系](#86-コード体系)

&nbsp;&nbsp;&nbsp;&nbsp;[8.6.1 CodeとConceptを分離する](#861-codeとconceptを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.6.2 Code Schemeを明示する](#862-code-schemeを明示する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.6.3 Existing Codeを優先する](#863-existing-codeを優先する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.6.4 SKOSの利用](#864-skosの利用)

[8.7 NamespaceとURI / IRI](#87-namespaceとuri-iri)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.1 Namespaceがない場合](#871-namespaceがない場合)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.2 Namespaceがある場合](#872-namespaceがある場合)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.3 Namespaceのメリット](#873-namespaceのメリット)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.4 NamespaceはGovernanceでもある](#874-namespaceはgovernanceでもある)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.5 DomainごとのNamespace](#875-domainごとのnamespace)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.6 Concept IdentifierとResource Identifier](#876-concept-identifierとresource-identifier)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.7 URIを参照可能な資産とする](#877-uriを参照可能な資産とする)

&nbsp;&nbsp;&nbsp;&nbsp;[8.7.8 利用者がNamespaceを意識しない状態](#878-利用者がnamespaceを意識しない状態)

[8.8 Metadata](#88-metadata)

&nbsp;&nbsp;&nbsp;&nbsp;[8.8.1 Semantic / Data Element MetadataとDataset Metadata](#881-semantic-data-element-metadataとdataset-metadata)

&nbsp;&nbsp;&nbsp;&nbsp;[8.8.2 DCATとDublin Core](#882-dcatとdublin-core)

&nbsp;&nbsp;&nbsp;&nbsp;[8.8.3 DatasetからConceptまで辿れるようにする](#883-datasetからconceptまで辿れるようにする)

[8.9 バージョン管理とGovernance](#89-バージョン管理とgovernance)

&nbsp;&nbsp;&nbsp;&nbsp;[8.9.1 Standardは変化する](#891-standardは変化する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.9.2 IdentifierとVersionを分離する](#892-identifierとversionを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[8.9.3 分散型Governance](#893-分散型governance)

&nbsp;&nbsp;&nbsp;&nbsp;[8.9.4 Change Management](#894-change-management)

[8.10 共通基盤の全体像](#810-共通基盤の全体像)

[8.11 本章のまとめ](#811-本章のまとめ)

</details>

## [第9章 標準データモデルの実装](#第9章-標準データモデルの実装)

<details>
<summary>第9章 標準データモデルの実装 の詳細項目（節・細章）を開く</summary>

[9.1 データモデルと実装仕様の分離](#91-データモデルと実装仕様の分離)

&nbsp;&nbsp;&nbsp;&nbsp;[9.1.1 Data Model Definitionを中心とする](#911-data-model-definitionを中心とする)

&nbsp;&nbsp;&nbsp;&nbsp;[9.1.2 UMLとData Dictionary](#912-umlとdata-dictionary)

&nbsp;&nbsp;&nbsp;&nbsp;[9.1.3 RDFSによるVocabulary公開](#913-rdfsによるvocabulary公開)

&nbsp;&nbsp;&nbsp;&nbsp;[9.1.4 同じDefinitionから複数の成果物を提供する](#914-同じdefinitionから複数の成果物を提供する)

[9.2 JSON Schema](#92-json-schema)

&nbsp;&nbsp;&nbsp;&nbsp;[9.2.1 StructureとValidation](#921-structureとvalidation)

&nbsp;&nbsp;&nbsp;&nbsp;[9.2.2 Data DictionaryからJSON Schemaへ](#922-data-dictionaryからjson-schemaへ)

&nbsp;&nbsp;&nbsp;&nbsp;[9.2.3 JSON SchemaはMeaningを定義しない](#923-json-schemaはmeaningを定義しない)

[9.3 JSON Sample](#93-json-sample)

[9.4 JSON-LD Context](#94-json-ld-context)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.1 JSON PropertyとVocabularyを接続する](#941-json-propertyとvocabularyを接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.2 Existing Vocabularyと自Domain Vocabularyを共存させる](#942-existing-vocabularyと自domain-vocabularyを共存させる)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.3 Data Dictionaryとの接続](#943-data-dictionaryとの接続)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.4 RDFSとの接続](#944-rdfsとの接続)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.5 Contextは標準側で管理する](#945-contextは標準側で管理する)

&nbsp;&nbsp;&nbsp;&nbsp;[9.4.6 ContextのVersion Management](#946-contextのversion-management)

[9.5 JSON-LD Sample](#95-json-ld-sample)

[9.6 RDFへの展開](#96-rdfへの展開)

&nbsp;&nbsp;&nbsp;&nbsp;[9.6.1 RDFは必須の最終工程ではない](#961-rdfは必須の最終工程ではない)

&nbsp;&nbsp;&nbsp;&nbsp;[9.6.2 RDFが有効なUse Case](#962-rdfが有効なuse-case)

&nbsp;&nbsp;&nbsp;&nbsp;[9.6.3 Existing Systemを維持する](#963-existing-systemを維持する)

[9.7 APIとの連携](#97-apiとの連携)

&nbsp;&nbsp;&nbsp;&nbsp;[9.7.1 APIとSemantic Data Modelを分離する](#971-apiとsemantic-data-modelを分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[9.7.2 StructureとMeaningを組み合わせる](#972-structureとmeaningを組み合わせる)

&nbsp;&nbsp;&nbsp;&nbsp;[9.7.3 Semantic技術を利用条件にしない](#973-semantic技術を利用条件にしない)

[9.8 オープンデータ・Data Catalogとの連携](#98-オープンデータ・data-catalogとの連携)

&nbsp;&nbsp;&nbsp;&nbsp;[9.8.1 Dataset Metadata](#981-dataset-metadata)

&nbsp;&nbsp;&nbsp;&nbsp;[9.8.2 DatasetからSemantic Definitionへ](#982-datasetからsemantic-definitionへ)

&nbsp;&nbsp;&nbsp;&nbsp;[9.8.3 Existing Domain Standardとも接続する](#983-existing-domain-standardとも接続する)

[9.9 標準データモデル・パッケージ](#99-標準データモデル・パッケージ)

&nbsp;&nbsp;&nbsp;&nbsp;[9.9.1 基本成果物](#991-基本成果物)

&nbsp;&nbsp;&nbsp;&nbsp;[9.9.2 当面の基本成果物](#992-当面の基本成果物)

&nbsp;&nbsp;&nbsp;&nbsp;[9.9.3 一般Developerから見た姿](#993-一般developerから見た姿)

[9.10 本章のまとめ](#910-本章のまとめ)

</details>

## [第10章 AI時代におけるデータ標準](#第10章-ai時代におけるデータ標準)

<details>
<summary>第10章 AI時代におけるデータ標準 の詳細項目（節・細章）を開く</summary>

[10.1 AIがデータを利用する時代](#101-aiがデータを利用する時代)

&nbsp;&nbsp;&nbsp;&nbsp;[10.1.1 データ利用主体の変化](#1011-データ利用主体の変化)

&nbsp;&nbsp;&nbsp;&nbsp;[10.1.2 AIはMeaningを推測できる](#1012-aiはmeaningを推測できる)

[10.2 AIとセマンティックデータモデル](#102-aiとセマンティックデータモデル)

&nbsp;&nbsp;&nbsp;&nbsp;[10.2.1 AIのためだけのSemantic Data Modelではない](#1021-aiのためだけのsemantic-data-modelではない)

&nbsp;&nbsp;&nbsp;&nbsp;[10.2.2 AIがMeaningを確認するための基準点](#1022-aiがmeaningを確認するための基準点)

&nbsp;&nbsp;&nbsp;&nbsp;[10.2.3 Semantic Data Modelが存在しない場合](#1023-semantic-data-modelが存在しない場合)

&nbsp;&nbsp;&nbsp;&nbsp;[10.2.4 Semantic Data Modelだけでは正しさを保証できない](#1024-semantic-data-modelだけでは正しさを保証できない)

[10.3 機械可読性の重要性](#103-機械可読性の重要性)

&nbsp;&nbsp;&nbsp;&nbsp;[10.3.1 Machine-readableだけでは十分ではない](#1031-machine-readableだけでは十分ではない)

&nbsp;&nbsp;&nbsp;&nbsp;[10.3.2 Human-readableとMachine-readableを同じDefinitionから管理する](#1032-human-readableとmachine-readableを同じdefinitionから管理する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.3.3 VocabularyとData Dictionaryも機械から参照可能にする](#1033-vocabularyとdata-dictionaryも機械から参照可能にする)

[10.4 AIが「推測するData」から「確認できるData」へ](#104-aiが推測するdataから確認できるdataへ)

&nbsp;&nbsp;&nbsp;&nbsp;[10.4.1 文字列からMeaningを推測する世界](#1041-文字列からmeaningを推測する世界)

&nbsp;&nbsp;&nbsp;&nbsp;[10.4.2 Definitionへ辿れる世界](#1042-definitionへ辿れる世界)

&nbsp;&nbsp;&nbsp;&nbsp;[10.4.3 「確認できる」は「絶対に正しい」ではない](#1043-確認できるは絶対に正しいではない)

[10.5 AI Agent時代のデータ流通](#105-ai-agent時代のデータ流通)

&nbsp;&nbsp;&nbsp;&nbsp;[10.5.1 AI AgentによるData利用](#1051-ai-agentによるdata利用)

&nbsp;&nbsp;&nbsp;&nbsp;[10.5.2 APIにStructureだけでなくMeaningを接続する](#1052-apiにstructureだけでなくmeaningを接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.5.3 AI専用Standardを新しく作らない](#1053-ai専用standardを新しく作らない)

[10.6 Knowledge Graphと分野横断データ利用](#106-knowledge-graphと分野横断データ利用)

&nbsp;&nbsp;&nbsp;&nbsp;[10.6.1 Knowledge Graphは利用形態の一つ](#1061-knowledge-graphは利用形態の一つ)

&nbsp;&nbsp;&nbsp;&nbsp;[10.6.2 Knowledge Graphを最初から必須としない](#1062-knowledge-graphを最初から必須としない)

&nbsp;&nbsp;&nbsp;&nbsp;[10.6.3 分野横断利用への可能性](#1063-分野横断利用への可能性)

[10.7 AI時代に求められるデータ標準の原則](#107-ai時代に求められるデータ標準の原則)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.1 Meaningを明示する](#1071-meaningを明示する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.2 安定したIdentifierを持つ](#1072-安定したidentifierを持つ)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.3 人間と機械の双方から利用可能にする](#1073-人間と機械の双方から利用可能にする)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.4 VocabularyとData Dictionaryを接続する](#1074-vocabularyとdata-dictionaryを接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.5 ProvenanceとQualityも管理する](#1075-provenanceとqualityも管理する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.6 Existing Standardを再利用する](#1076-existing-standardを再利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[10.7.7 Technologyを利用者へ強制しない](#1077-technologyを利用者へ強制しない)

[10.8 本章のまとめ](#108-本章のまとめ)

</details>

## [第11章 標準化の進め方と参考ロードマップ](#第11章-標準化の進め方と参考ロードマップ)

<details>
<summary>第11章 標準化の進め方と参考ロードマップ の詳細項目（節・細章）を開く</summary>

[11.1 基本方針](#111-基本方針)

&nbsp;&nbsp;&nbsp;&nbsp;[11.1.1 全国・全分野を一度にモデル化しない](#1111-全国・全分野を一度にモデル化しない)

&nbsp;&nbsp;&nbsp;&nbsp;[11.1.2 「横に広げる前に、縦に通す」](#1112-横に広げる前に縦に通す)

&nbsp;&nbsp;&nbsp;&nbsp;[11.1.3 Model・Vocabulary・Data Dictionaryは反復的に整備する](#1113-model・vocabulary・data-dictionaryは反復的に整備する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.1.4 Implementation Formを最初から固定しない](#1114-implementation-formを最初から固定しない)

[11.2 実装アプローチの一例](#112-実装アプローチの一例)

[11.3 Step 1 対象領域と既存資産の整理](#113-step-1-対象領域と既存資産の整理)

&nbsp;&nbsp;&nbsp;&nbsp;[11.3.1 Use Caseから対象を選定する](#1131-use-caseから対象を選定する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.3.2 Existing Assetを調査する](#1132-existing-assetを調査する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.3.3 Step 1の成果物例](#1133-step-1の成果物例)

[11.4 Step 2 Pilot Semantic Data Modelの構築](#114-step-2-pilot-semantic-data-modelの構築)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.1 Conceptを整理する](#1141-conceptを整理する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.2 UMLクラス図を作成する](#1142-umlクラス図を作成する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.3 Vocabularyを整備する](#1143-vocabularyを整備する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.4 Data Dictionaryを整備する](#1144-data-dictionaryを整備する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.5 Code Schemeを整理する](#1145-code-schemeを整理する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.4.6 Step 2の成果物例](#1146-step-2の成果物例)

[11.5 Step 3 Namespace・URIの整備](#115-step-3-namespace・uriの整備)

&nbsp;&nbsp;&nbsp;&nbsp;[11.5.1 Domain Namespaceを設計する](#1151-domain-namespaceを設計する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.5.2 Existing Namespaceを再利用する](#1152-existing-namespaceを再利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.5.3 URIを参照可能にする](#1153-uriを参照可能にする)

[11.6 Step 4 Machine-readable Specificationの整備](#116-step-4-machine-readable-specificationの整備)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.1 RDFS](#1161-rdfs)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.2 JSON Schema](#1162-json-schema)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.3 JSON Sample](#1163-json-sample)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.4 JSON-LD Context](#1164-json-ld-context)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.5 JSON-LD Sample](#1165-json-ld-sample)

&nbsp;&nbsp;&nbsp;&nbsp;[11.6.6 Standard Packageの一例](#1166-standard-packageの一例)

[11.7 Step 5 Pilot実装・検証](#117-step-5-pilot実装・検証)

&nbsp;&nbsp;&nbsp;&nbsp;[11.7.1 実Dataへ適用する](#1171-実dataへ適用する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.7.2 Technical Validation](#1172-technical-validation)

&nbsp;&nbsp;&nbsp;&nbsp;[11.7.3 Operational Validation](#1173-operational-validation)

[11.8 Step 6 Domain展開とSmall Coreの成長](#118-step-6-domain展開とsmall-coreの成長)

&nbsp;&nbsp;&nbsp;&nbsp;[11.8.1 PilotからCommon Patternを抽出する](#1181-pilotからcommon-patternを抽出する)

&nbsp;&nbsp;&nbsp;&nbsp;[11.8.2 Small Coreを育てる](#1182-small-coreを育てる)

&nbsp;&nbsp;&nbsp;&nbsp;[11.8.3 Coreを巨大化させない](#1183-coreを巨大化させない)

[11.9 必要に応じたRDF・Linked Data等への発展](#119-必要に応じたrdf・linked-data等への発展)

[11.10 参考Roadmap全体像](#1110-参考roadmap全体像)

[11.11 Roadmapを支えるGovernance](#1111-roadmapを支えるgovernance)

&nbsp;&nbsp;&nbsp;&nbsp;[11.11.1 Standardは作成後からが運用である](#11111-standardは作成後からが運用である)

&nbsp;&nbsp;&nbsp;&nbsp;[11.11.2 CoreとDomainで責任を分ける](#11112-coreとdomainで責任を分ける)

&nbsp;&nbsp;&nbsp;&nbsp;[11.11.3 Standard自体をDigital Assetとして管理する](#11113-standard自体をdigital-assetとして管理する)

[11.12 本章のまとめ](#1112-本章のまとめ)

</details>

## [第12章 おわりに](#第12章-おわりに)

<details>
<summary>第12章 おわりに の詳細項目（節・細章）を開く</summary>

[12.1 本書のまとめ](#121-本書のまとめ)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.1 構造の互換性からMeaningのInteroperabilityへ](#1211-構造の互換性からmeaningのinteroperabilityへ)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.2 Semantic Data Modelは従来Modelを否定しない](#1212-semantic-data-modelは従来modelを否定しない)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.3 MeaningのStandardizationは一つに統一することではない](#1213-meaningのstandardizationは一つに統一することではない)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.4 Existing Assetを活用する](#1214-existing-assetを活用する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.5 VocabularyとData Dictionaryを接続する](#1215-vocabularyとdata-dictionaryを接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.6 NamespaceがSemantic Foundationを支える](#1216-namespaceがsemantic-foundationを支える)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.7 Standardを「利用できるPackage」にする](#1217-standardを利用できるpackageにする)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.8 AI時代にSemantic Standardが持つMeaning](#1218-ai時代にsemantic-standardが持つmeaning)

&nbsp;&nbsp;&nbsp;&nbsp;[12.1.9 Small Coreを実利用から育てる](#1219-small-coreを実利用から育てる)

[12.2 Semantic Data Foundationによって期待される将来像](#122-semantic-data-foundationによって期待される将来像)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.1 MeaningやMappingを再利用できる社会](#1221-meaningやmappingを再利用できる社会)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.2 Data Discoveryから利用までの時間を短縮する](#1222-data-discoveryから利用までの時間を短縮する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.3 組織・System間連携の負担を軽減する](#1223-組織・system間連携の負担を軽減する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.4 Domainの専門性を残したままDataを接続する](#1224-domainの専門性を残したままdataを接続する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.5 StandardそのものがSystem Developmentの部品になる](#1225-standardそのものがsystem-developmentの部品になる)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.6 AIがMeaningを確認できるData環境](#1226-aiがmeaningを確認できるdata環境)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.7 新しいData Serviceで共通資産を再利用する](#1227-新しいdata-serviceで共通資産を再利用する)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.8 Data Standardizationによって期待される社会的効果](#1228-data-standardizationによって期待される社会的効果)

&nbsp;&nbsp;&nbsp;&nbsp;[12.2.9 最終的に目指す社会像](#1229-最終的に目指す社会像)

</details>

## [付録A 用語集](#付録a-用語集)

<details>
<summary>付録A 用語集 の詳細項目（節・細章）を開く</summary>

[A.1 Data Model（データモデル）](#a1-data-modelデータモデル)

[A.2 Semantic Data Model（セマンティックデータモデル）](#a2-semantic-data-modelセマンティックデータモデル)

[A.3 Concept（概念）](#a3-concept概念)

[A.4 Class（クラス）](#a4-classクラス)

[A.5 Property（プロパティ）](#a5-propertyプロパティ)

[A.6 Identifier（識別子）](#a6-identifier識別子)

[A.7 Core Model（コアモデル） / Common Core（共通コア）](#a7-core-modelコアモデル-common-core共通コア)

[A.8 Domain Model（ドメインモデル）](#a8-domain-modelドメインモデル)

[A.9 Vocabulary（語彙）](#a9-vocabulary語彙)

[A.10 Data Dictionary（データ辞書）](#a10-data-dictionaryデータ辞書)

[A.11 Data Element（データ項目）](#a11-data-elementデータ項目)

[A.12 Data Element Concept（データ項目概念）](#a12-data-element-conceptデータ項目概念)

[A.13 Value Domain（値領域）](#a13-value-domain値領域)

[A.14 Code Scheme（コード体系）](#a14-code-schemeコード体系)

[A.15 Mapping（対応付け）](#a15-mapping対応付け)

[A.16 Ontology（オントロジー）](#a16-ontologyオントロジー)

[A.17 Taxonomy（タクソノミー）](#a17-taxonomyタクソノミー)

[A.18 Thesaurus（シソーラス）](#a18-thesaurusシソーラス)

[A.19 RDF（Resource Description Framework）](#a19-rdfresource-description-framework)

[A.20 RDFS（RDF Schema）](#a20-rdfsrdf-schema)

[A.21 OWL（Web Ontology Language）](#a21-owlweb-ontology-language)

[A.22 SKOS（Simple Knowledge Organization System）](#a22-skossimple-knowledge-organization-system)

[A.23 JSON Schema（JSONスキーマ）](#a23-json-schemajsonスキーマ)

[A.24 JSON-LD](#a24-json-ld)

[A.25 JSON-LD Context（JSON-LDコンテキスト）](#a25-json-ld-contextjson-ldコンテキスト)

[A.26 URI / IRI（識別子）](#a26-uri-iri識別子)

[A.27 Namespace（名前空間）](#a27-namespace名前空間)

[A.28 Linked Data（リンクトデータ）](#a28-linked-dataリンクトデータ)

[A.29 Metadata Registry（メタデータレジストリ）](#a29-metadata-registryメタデータレジストリ)

[A.30 Data Space（データスペース）](#a30-data-spaceデータスペース)

</details>

## [付録B 国内・海外の主要標準・取り組み](#付録b-国内・海外の主要標準・取り組み)

<details>
<summary>付録B 国内・海外の主要標準・取り組み の詳細項目（節・細章）を開く</summary>

[B.1 本付録の位置付け](#b1-本付録の位置付け)

[B.2 国内の主要Standard（標準）・取り組み](#b2-国内の主要standard標準・取り組み)

[B.3 日本標準産業分類・日本標準職業分類](#b3-日本標準産業分類・日本標準職業分類)

[B.4 ベース・レジストリ](#b4-ベース・レジストリ)

[B.5 IMI](#b5-imi)

[B.6 政府相互運用性フレームワーク（GIF）](#b6-政府相互運用性フレームワークgif)

[B.7 海外・国際的な主要Standard（標準）・取り組み](#b7-海外・国際的な主要standard標準・取り組み)

[B.8 W3C](#b8-w3c)

[B.9 SEMIC Core Vocabularies](#b9-semic-core-vocabularies)

[B.10 Schema.org](#b10-schemaorg)

[B.11 NIEM](#b11-niem)

[B.12 CityGML](#b12-citygml)

[B.13 ISO/IEC 11179](#b13-isoiec-11179)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.1 本書で主に参照するPart](#b131-本書で主に参照するpart)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.2 ISO/IEC 11179-3](#b132-isoiec-11179-3)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.3 ISO/IEC 11179-4](#b133-isoiec-11179-4)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.4 ISO/IEC 11179-5](#b134-isoiec-11179-5)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.5 ISO/IEC 11179-6](#b135-isoiec-11179-6)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.6 ISO/IEC 11179-31](#b136-isoiec-11179-31)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.7 ISO/IEC 11179-32](#b137-isoiec-11179-32)

&nbsp;&nbsp;&nbsp;&nbsp;[B.13.8 ISO/IEC 11179-33](#b138-isoiec-11179-33)

[B.14 DCAT / Dublin Core](#b14-dcat-dublin-core)

[B.15 各Standard（標準）の役割分担](#b15-各standard標準の役割分担)

</details>

## [付録C 名前空間・URI設計ガイド](#付録c-名前空間・uri設計ガイド)

<details>
<summary>付録C 名前空間・URI設計ガイド の詳細項目（節・細章）を開く</summary>

[C.1 本付録の目的](#c1-本付録の目的)

[C.2 Namespace（名前空間）の基本的な役割](#c2-namespace名前空間の基本的な役割)

[C.3 Namespace（名前空間）設計の基本原則](#c3-namespace名前空間設計の基本原則)

&nbsp;&nbsp;&nbsp;&nbsp;[C.3.1 管理主体を明確にする](#c31-管理主体を明確にする)

&nbsp;&nbsp;&nbsp;&nbsp;[C.3.2 長期的な安定性を優先する](#c32-長期的な安定性を優先する)

&nbsp;&nbsp;&nbsp;&nbsp;[C.3.3 Domain（分野）ごとに責任を分離する](#c33-domain分野ごとに責任を分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[C.3.4 Existing Namespace（既存名前空間）をReuseする](#c34-existing-namespace既存名前空間をreuseする)

[C.4 URI / IRIの役割](#c4-uri-iriの役割)

[C.5 Concept URI（概念URI）とResource URI（リソースURI）を区別する](#c5-concept-uri概念uriとresource-uriリソースuriを区別する)

[C.6 URI Pattern（URIパターン）の概念例](#c6-uri-patternuriパターンの概念例)

[C.7 URIを解決可能にする](#c7-uriを解決可能にする)

[C.8 Human-readable（人間可読）とMachine-readable（機械可読）を両立する](#c8-human-readable人間可読とmachine-readable機械可読を両立する)

[C.9 Version（版）管理](#c9-version版管理)

&nbsp;&nbsp;&nbsp;&nbsp;[C.9.1 Identifier（識別子）とVersion（版）を分離する](#c91-identifier識別子とversion版を分離する)

&nbsp;&nbsp;&nbsp;&nbsp;[C.9.2 Meaning（意味）が変わる場合](#c92-meaning意味が変わる場合)

&nbsp;&nbsp;&nbsp;&nbsp;[C.9.3 JSON Schema / JSON-LD ContextのVersion](#c93-json-schema-json-ld-contextのversion)

[C.10 Persistence（永続性）](#c10-persistence永続性)

[C.11 Deprecated Concept（非推奨概念）の扱い](#c11-deprecated-concept非推奨概念の扱い)

[C.12 URIとLabel（名称）を分離する](#c12-uriとlabel名称を分離する)

[C.13 URI Local Name（URIローカル名）とLogical Name（論理名）](#c13-uri-local-nameuriローカル名とlogical-name論理名)

[C.14 Naming Rule（命名規則）](#c14-naming-rule命名規則)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.1 基本方針](#c141-基本方針)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.2 Concept（概念）・Class（クラス）](#c142-concept概念・classクラス)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.3 Property（プロパティ）・Attribute（属性）](#c143-propertyプロパティ・attribute属性)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.4 Relationship Property（関係プロパティ）](#c144-relationship-property関係プロパティ)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.5 JSON Property（JSONプロパティ）](#c145-json-propertyjsonプロパティ)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.6 日本語論理名と英語論理名](#c146-日本語論理名と英語論理名)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.7 略語・短縮語](#c147-略語・短縮語)

&nbsp;&nbsp;&nbsp;&nbsp;[C.14.8 Logical Name（論理名）とIdentifier（識別子）](#c148-logical-name論理名とidentifier識別子)

[C.15 Code Scheme（コード体系）のURI](#c15-code-schemeコード体系のuri)

[C.16 External Vocabulary（外部語彙）との共存](#c16-external-vocabulary外部語彙との共存)

[C.17 Mapping（対応付け）の管理](#c17-mapping対応付けの管理)

[C.18 Namespace（名前空間）管理情報](#c18-namespace名前空間管理情報)

[C.19 Namespace（名前空間）設計で避けたい状態](#c19-namespace名前空間設計で避けたい状態)

&nbsp;&nbsp;&nbsp;&nbsp;[C.19.1 一時的なSystem名への依存](#c191-一時的なsystem名への依存)

&nbsp;&nbsp;&nbsp;&nbsp;[C.19.2 DefinitionなしでURIだけ作成する](#c192-definitionなしでuriだけ作成する)

&nbsp;&nbsp;&nbsp;&nbsp;[C.19.3 同じConcept（概念）に複数URIを無秩序に発行する](#c193-同じconcept概念に複数uriを無秩序に発行する)

&nbsp;&nbsp;&nbsp;&nbsp;[C.19.4 URI変更を安易に行う](#c194-uri変更を安易に行う)

[C.20 本付録のまとめ](#c20-本付録のまとめ)

</details>

---

# 第1章 はじめに

<a id="11-背景"></a>
<a id="11背景"></a>
## 1.1 背景

社会全体のデジタル化が進展し、行政、民間企業、研究機関など、さまざまな主体が保有するデータを相互に利用することが重要になっている。

行政手続のオンライン化、オープンデータ、IoT、デジタルツイン、データスペース、生成AI、AIエージェントなどの発展によって、データは個々のシステム内部で利用されるだけではなく、組織や分野を越えて流通・再利用されることが求められている。

一方、これまでの情報システムは、それぞれの業務や制度の目的に合わせて設計され、その内部でデータを正確かつ効率的に処理することを重視して発展してきた。

日本においても、

* JIS
* 日本標準産業分類
* 日本標準職業分類
* 地方公共団体情報システム標準化
* ベース・レジストリ
* 地理空間情報に関する標準
* 医療分野の標準
* 各種業界標準

など、多くの標準が整備されている。

また、データの意味や構造を共有するための取り組みとして、IMI（情報共有基盤）や政府相互運用性フレームワーク（GIF）なども整備されてきた。

IMIでは、人間が理解するデータ項目や説明と、コンピュータが処理するデータ構造、それらの対応関係、制約、サンプル等を一体的に扱うDMD（Data Model Description）の考え方も提示されている。

したがって、日本にデータ標準や意味共有のための取り組みが存在しないわけではない。

今後の課題は、

> **既に存在する異なる標準やデータモデルを、分野や組織を越えてどのように接続し、再利用可能にするか**

という点にある。

例えば、「法人」「企業」「事業者」「事業所」は、日常的には近い言葉として扱われることがある。

しかし、それぞれの制度や統計では意味や対象範囲が異なる。

```text
法人　────────┐
企業　────────┼── 意味・関係を明示
事業者 ───────┤
事業所 ───────┘
```

これらを一つの名称やデータ項目へ統一することが重要なのではない。

重要なのは、

* 何が同じなのか
* 何が異なるのか
* どのような関係にあるのか
* 他の標準のどの概念と対応するのか

を明示できることである。

さらに、生成AIやAIエージェントの登場によって、データを利用する主体も変化しつつある。

従来は、人間が仕様書やデータ辞書を読み、データの意味を理解した上でシステムを構築していた。

今後は、AIがデータやAPIを探索し、複数のデータを組み合わせて利用することも想定される。

このような環境では、

> **データを機械が読めることだけではなく、そのデータが何を意味するのかを機械が確認できること**

が重要となる。

本書では、このような環境変化を踏まえ、既存の標準や先行的な取り組みを活用しながら、分野横断でデータの意味を共有するためのセマンティックデータモデル基盤について検討する。

<a id="12-本書の目的"></a>
<a id="12本書の目的"></a>
## 1.2 本書の目的

本書の目的は、日本に存在する既存の標準、データモデル、語彙、コード体系等を活用しながら、行政・民間・研究等の分野を横断してデータの意味を共有するためのセマンティックデータモデル基盤の方向性を提示することである。

具体的には、以下を目的とする。

* 日本におけるデータ標準化の現状と課題を整理する。
* データモデルとセマンティックデータモデルの関係を整理する。
* 共通語彙、データ辞書、分類、オントロジー等の位置付けを整理する。
* IMI、GIF等の国内における先行的な取り組みを整理する。
* RDF、RDFS、SKOS、OWL、JSON-LD、Linked Data等の技術の役割を整理する。
* 海外におけるデータモデル・語彙・相互運用性に関する取り組みを整理する。
* 日本で整備すべき分野横断セマンティックデータモデル基盤の要件を整理する。
* JSON Schema、JSON-LD Context、JSON-LD Sample、RDFS等による機械可読な標準モデルの実装方法を提示する。
* AI時代におけるデータ標準の役割を整理する。
* 小規模な領域からセマンティックデータモデルを実装・検証するための参考アプローチを提示する。

本書が目指すものは、既存の国内標準を廃止し、一つの巨大なデータ標準へ統合することではない。

目指すのは、

> **異なる目的で作られた標準やデータモデルを、それぞれ維持しながら、相互に参照・対応付け・再利用できる共通の意味基盤を整備すること**

である。

<a id="13-本書の基本的な立場"></a>
<a id="13本書の基本的な立場"></a>
## 1.3 本書の基本的な立場

本書では、既存の国内外の標準やデータモデルを可能な限り活用する。

また、すべての分野のデータを一つの巨大なモデルへ統一することは目的としない。

各分野が持つ専門性や既存モデルを尊重しながら、

> **分野を越えて共有すべき概念と、それぞれのモデル間の対応関係を整理する**

ことを基本的な立場とする。

その実現方法についても、既存の仕組みを拡張する方法と、新たな共通基盤を整備する方法のいずれかをあらかじめ前提とはしない。

必要となる機能と要件を明らかにし、その実現に適した方法を選択する。

<a id="14-本書の対象読者"></a>
<a id="14本書の対象読者"></a>
## 1.4 本書の対象読者

本書の主な対象読者は、一般的なアプリケーション利用者ではなく、データを組織横断・分野横断で利用可能にするための仕組みを設計・管理する専門家である。

主として、

* データアーキテクト
* データモデラー
* データマネジメント担当者
* メタデータ管理担当者
* データガバナンス担当者
* データ標準化担当者
* システムアーキテクト
* データ連携・データ流通基盤の設計者
* データカタログ・マスターデータ管理担当者
* 公共・民間のデータ基盤を企画する担当者
* AI・データ分析基盤のアーキテクト

などを想定する。

対象とする専門領域は、DAMA-DMBOKにおけるData Architecture、Metadata Management、Data Integration & Interoperability、Data Governance等と重なる部分が大きい。

一方、本書が最終的に目指すデータ基盤では、一般的なアプリケーション開発者がRDF、RDFS、JSON-LD等のセマンティックWeb技術を詳細に理解していることを前提としない。

標準を設計・管理する側では、DMDのようなデータモデル記述を起点として、

```text
データモデル記述
      │
      ├── 概念
      ├── 属性
      ├── 関係
      ├── 定義
      ├── 制約
      └── コード
             │
             ▼
       Domain Namespace
             │
      ┌──────┼────────┬─────────┐
      ▼      ▼        ▼         ▼
   RDFS   JSON-LD   JSON-LD   JSON Schema
          Context   Sample
```

のような機械可読な成果物を整備する。

各ドメインではNamespaceを定義し、概念、属性、関係等を安定したURIによって識別できるようにする。

RDFSではその語彙や概念間の基本的な関係を記述し、JSON-LD Contextによって通常のJSON項目とそれらのURIを対応付ける。

JSON Schemaではデータ構造や制約を定義し、JSON-LD Sampleによって実際の利用例を提供する。

一方、それを利用する一般的な開発者は、

```text
JSON
API
JSON Schema
ライブラリ
開発ツール
```

等を通じて標準を利用できるようにする。

理想的には、NamespaceやURIによって必要な定義が参照可能となり、開発ツール、ライブラリ、API、AI等がその情報を利用することで、一般的な開発者がRDFやRDFSの詳細を意識する必要を減らす。

つまり、

> **セマンティック技術を理解しなければ利用できない標準ではなく、セマンティック技術を理解しなくても標準の恩恵を受けられる基盤**

を目指す。

これは、本書における重要な実装原則の一つである。

---

<a id="第2章-ai・データ流通時代が求めるデータ標準"></a>
<a id="第2章AI・データ流通時代が求めるデータ標準"></a>
# 第2章 AI・データ流通時代が求めるデータ標準

<a id="21-ai時代におけるデータ活用の変化"></a>
<a id="21AI時代におけるデータ活用の変化"></a>
## 2.1 AI時代におけるデータ活用の変化

生成AIやAIエージェントの普及によって、データ利用の形態は変化しつつある。

従来の情報システムでは、システム開発者があらかじめ、

* データ構造
* データ項目
* コード体系
* API仕様
* 項目の意味

を理解し、それに基づいてプログラムを設計することが一般的であった。

```text
仕様書
   ↓
人間が理解
   ↓
プログラムを実装
   ↓
データ利用
```

これに対して、AIエージェント等では、

```text
ユーザー
   ↓
AI
   ↓
データを探索
   ↓
APIを選択
   ↓
データを取得
   ↓
意味を解釈
   ↓
複数データを統合
   ↓
分析・利用
```

といった利用形態も考えられる。

この場合、データがJSONやCSVとして読み取れるだけでは十分ではない。

例えば、

```text
address
```

という項目だけでは、

* 居住地
* 法人所在地
* 施設所在地
* 郵送先
* 住所文字列
* 地理的位置

のどれを意味するのか特定できない場合がある。

したがって、AI時代には、

> **「機械が読めるデータ」から「機械が意味を確認できるデータ」へ**

データ標準の対象を広げる必要がある。

<a id="22-データ流通の重要性"></a>
<a id="22データ流通の重要性"></a>
## 2.2 データ流通の重要性

<a id="221-データを再利用できることの価値"></a>
<a id="221データを再利用できることの価値"></a>
### 2.2.1 データを再利用できることの価値

データの価値は、単独で保有することだけではなく、一度整備されたデータを複数の主体や用途で継続的に再利用できることによって高まる。

例えば、

```text
人口
 ＋
施設
 ＋
交通
 ＋
地理空間
 ＋
災害
```

のように異なるデータを組み合わせることで、単一のデータだけでは実現できない分析やサービスが可能となる。

今後は、

* 行政機関間
* 行政と民間
* 民間企業間
* 研究機関
* 分野間
* 国際間
* AI・AIエージェントによる横断利用

など、多様な主体によってデータが利用される。

ここで重要なのは、単にファイルやデータを送受信できることではない。

異なる主体が、

> 「このデータは何を表しているのか」

> 「この項目は他のデータのどの概念に対応するのか」

> 「このコードは何を意味しているのか」

を共通して理解できる必要がある。

<a id="222-データの意味を再利用可能な資産にする"></a>
<a id="222データの意味を再利用可能な資産にする"></a>
### 2.2.2 データの意味を再利用可能な資産にする

意味、コード、表記、識別方法等が共有されていない場合、それぞれの利用者が個別に、

```text
取得
 ↓
仕様確認
 ↓
意味の解釈
 ↓
クレンジング
 ↓
項目Mapping
 ↓
コード変換
 ↓
統合
```

という作業を繰り返すことになる。

また、複数のシステムを接続する際には、

```text
System A
   │
   └── 個別Mapping ── System B

System A
   │
   └── 個別Mapping ── System C

System B
   │
   └── 個別Mapping ── System C
```

のように、システムやデータセットの組み合わせごとに対応関係を作成することも多い。

対象となるデータやシステムが増えるほど、この方式では対応関係の管理が複雑となる。

これに対して、

```text
System A ──┐
           │
System B ──┼── 共通の意味・識別・Mapping基盤
           │
System C ──┤
           │
System D ──┘
```

のように、共通して参照可能な概念、語彙、識別子、Mappingを整備すれば、それぞれの利用者が同じ意味の解釈を繰り返す必要を減らすことができる。

これは単なるシステム開発コストの削減だけではない。

データを発見し、意味を確認し、他のデータと組み合わせ、新しいサービスや分析へ利用するまでの時間を短縮することにもつながる。

セマンティックデータモデルは、

```text
データそのものの再利用
        ↓
データ構造の再利用
        ↓
データ定義の再利用
        ↓
概念・語彙の再利用
        ↓
標準間Mappingの再利用
```

へと、データの再利用範囲を広げるための基盤として捉えることができる。

つまり、

> **データ利用のたびに意味を人間が読み解き直すのではなく、データの意味そのものを再利用可能な共通資産にする**

ことが、分野横断データ流通における重要な価値となる。

<a id="223-大規模なデータ利用と意味モデル"></a>
<a id="223大規模なデータ利用と意味モデル"></a>
### 2.2.3 大規模なデータ利用と意味モデル

データの規模や利用範囲が拡大すると、個別のシステム間でMappingを作り続ける方法には限界が生じる。

そのため、大規模なデータ利用を行うサービスや企業においても、実世界の対象や関係を共通的に表現する仕組みが利用されている。

例えばPalantirでは、Ontologyによって実世界のObject、Property、Relation等を共通的に表現し、データ、アプリケーション、分析、AI等から利用する考え方が採られている。

Google Knowledge Graphにおいても、文字列だけではなく実世界のEntityやその関係を扱う考え方が用いられている。

これらは、国全体のデータ標準と直接同一視できるものではない。

しかし、

> **利用するデータやサービスが増えるほど、個別のデータ構造だけではなく、共通して参照できる意味モデルの価値が高くなる**

ことを示す事例として参考になる。

<a id="23-データスペースとセマンティックなデータ基盤"></a>
<a id="23データスペースとセマンティックなデータ基盤"></a>
## 2.3 データスペースとセマンティックなデータ基盤

データスペース（Data Space）は、異なる組織がそれぞれのデータ管理主体性を維持しながら、一定のルールの下でデータを共有・利用するための環境として考えることができる。

本書では、データスペースとセマンティックデータモデルを同じ階層の仕組みとは考えない。

説明上、次のように整理する。

```text
┌──────────────────────────────┐
│          Data Space          │
│                              │
│ Governance                   │
│ Trust                        │
│ Contract / Policy            │
│ Identity / Access            │
│ Catalog / Discovery          │
│ Data Exchange                │
└──────────────┬───────────────┘
               │ 利用
               ▼
┌──────────────────────────────┐
│  Semantic Interoperability   │
│                              │
│ Data Model                   │
│ Vocabulary                   │
│ Data Dictionary              │
│ Metadata                     │
│ Identifier / URI             │
│ Mapping                      │
└──────────────┬───────────────┘
               │
               ▼
       API / JSON / RDF
               │
               ▼
             Data
```

つまり、

> **Data Spaceがデータを流通・利用するための社会的・制度的・技術的な環境であり、セマンティックデータモデルはその中で意味の相互運用性を担う基盤**

として位置付ける。

ただし、両者は完全な一方向の上下関係ではない。

```text
Data Space
     ⇅
Semantic Model
```

Data Space側のユースケースや利用ルールによって、

* どの概念が必要か
* どのデータを共有するか
* どのメタデータが必要か
* どの識別子を利用するか

が決まる。

一方、Semantic Model側からは、

* データの意味
* 概念間の関係
* 共通語彙
* Mapping
* データ項目定義

などがData Spaceへ提供される。

このような相互作用によって、意味を保持したデータ流通が実現される。

<a id="24-従来の標準化とその限界"></a>
<a id="24従来の標準化とその限界"></a>
## 2.4 従来の標準化とその限界

データ標準化は新しい取り組みではない。

これまでにも、

* 文字コード
* ファイル形式
* 通信プロトコル
* データ型
* コード体系
* API
* データ交換仕様

など、多くの標準が整備されてきた。

これらはデータ交換を行う上で不可欠である。

一方、分野を越えたデータ利用では、構文や形式だけでは解決できない問題が存在する。

<a id="241-構文syntaxの標準化"></a>
<a id="241構文Syntaxの標準化"></a>
### 2.4.1 構文（Syntax）の標準化

例えば、JSONによって次のデータを表現できる。

```json
{
  "name": "山田太郎",
  "address": "静岡県静岡市"
}
```

JSONを利用することで、

* オブジェクト
* プロパティ
* 値

という構造を機械的に読み取ることができる。

しかし、

* `name`は人物名か組織名か
* `address`は居住地か所在地か
* 「静岡市」は自治体を識別しているのか単なる文字列なのか

まではJSONそのものから判断できない。

したがって、

> **構文が同じであることと、意味が同じであることは別の問題**

である。

<a id="242-意味semanticsの標準化"></a>
<a id="242意味Semanticsの標準化"></a>
### 2.4.2 意味（Semantics）の標準化

意味を共有するためには、

```text
Person
   │
   └── hasAddress
             │
             ▼
          Address
```

のように、

* 何を概念として扱うのか
* その概念は何を意味するのか
* 概念同士にどのような関係があるのか

を明示する必要がある。

さらに、各概念を安定した識別子によって参照できれば、異なるシステムが同じ概念を参照していることを機械的に表現できる。

したがって、今後の標準化では構文の標準化を否定するのではなく、

> **構文・構造の標準化に、意味の相互運用性を加える**

ことが重要となる。

<a id="25-日本における意味の標準化を考える際の注意点"></a>
<a id="25日本における意味の標準化を考える際の注意点"></a>
## 2.5 日本における「意味」の標準化を考える際の注意点

ここで、

> 「日本では意味が標準化されていない」

と単純化すべきではない。

日本には、

* 統計分類
* 行政標準
* 業界標準
* 地理空間標準
* 医療標準
* IMI
* GIF

など、概念、分類、語彙、項目、データモデルを定義する多くの資産が存在する。

したがって問題は、

> **意味に関する標準が存在しないこと**

ではない。

むしろ、

> **異なる目的・管理主体・分野で作成された標準やデータモデルを横断し、それぞれの意味と対応関係を共通して参照できる仕組みをどう構築するか**

にある。

本書で検討するセマンティックな基盤は、既存標準を一つの標準へ統合するものではない。

異なる標準間の意味を接続する役割を担う。

<a id="26-aiが利用・確認できるデータとは何か"></a>
<a id="26AIが利用・確認できるデータとは何か"></a>
## 2.6 AIが利用・確認できるデータとは何か

AIは自然言語からデータの意味を推測する能力を持つ。

例えば、

```text
population
```

という項目から「人口」であることは推測できる。

しかし、

* 総人口
* 国勢調査人口
* 住民基本台帳人口
* 推計人口
* 昼間人口
* 夜間人口

のどれであるかは項目名だけでは特定できない。

したがってAI時代に重要なのは、

> **AIが意味を推測できることではなく、意味を確認するための根拠を参照できること**

である。

<a id="261-データ項目・語彙を説明するセマンティック情報"></a>
<a id="261データ項目・語彙を説明するセマンティック情報"></a>
### 2.6.1 データ項目・語彙を説明するセマンティック情報

データの意味を確認するためには、

* Concept
* Definition
* Relation
* Identifier
* Unit
* Code
* Value Domain
* Mapping

などが必要となる。

この領域では、ISO/IEC 11179シリーズの考え方が重要な参考となる。

ISO/IEC 11179では、Metadata Registryを構成するデータ要素、概念、値領域等の管理について体系的に整理されている。

本書では特に、

* 概念をどのように定義するか
* データ要素をどのように命名するか
* 名称と概念をどのように区別するか
* 定義をどのような原則で記述するか
* 値やコードの意味をどのように管理するか

という観点で、その考え方を参照する。

```text
Concept
   ↓
Definition
   ↓
Data Element
   ↓
Value Domain
   ↓
Naming / Identification
```

これにより、単なる物理項目名ではなく、その背後にある概念を基準としてデータ項目を管理できる。

<a id="262-データセットを説明するメタデータ"></a>
<a id="262データセットを説明するメタデータ"></a>
### 2.6.2 データセットを説明するメタデータ

一方、データ項目そのものだけでなく、データセット全体を利用するためには、

* タイトル
* 説明
* 提供者
* 作成者
* 更新日時
* ライセンス
* 公開形式
* 配布方法
* データサービス
* 対象期間
* 対象地域

などの情報も必要となる。

この領域では、Dublin CoreやDCAT等のメタデータ標準を利用できる。

Dublin Coreは、さまざまな情報資源を説明するための汎用的なメタデータ語彙を提供する。

DCATは、Dataset、Distribution、Data Service、Catalog等の概念を用いて、データセットを発見し、取得・利用するための情報を記述する。

したがって、

```text
Dataset
   │
   ├── Title
   ├── Description
   ├── Publisher
   ├── Theme
   ├── Temporal
   ├── Spatial
   ├── Distribution
   └── Data Service
```

といったデータセットレベルのメタデータを、データモデル・データ辞書とは別の役割として管理する。

<a id="263-semantic-informationとmetadataを組み合わせる"></a>
<a id="263SemanticInformationとMetadataを組み合わせる"></a>
### 2.6.3 Semantic InformationとMetadataを組み合わせる

本書では、AIやシステムがデータを利用する際に必要となる情報を、大きく次の二つに整理する。

```text
AI・システムが必要とする情報
│
├── Semantic Information
│   │
│   ├── Concept
│   ├── Definition
│   ├── Relation
│   ├── Identifier
│   ├── Value Domain
│   └── Mapping
│
└── Dataset Metadata
    │
    ├── Title
    ├── Publisher
    ├── Creator
    ├── Updated
    ├── License
    ├── Distribution
    └── Data Service
```

概念、語彙、データ項目についてはISO/IEC 11179等の考え方を参照し、データセットや配布・サービス情報についてはDCATやDublin Core等を利用する。

これによって、

> **「そのデータが何を意味するか」と「そのデータがどこから来て、どのように利用できるか」**

の双方を機械から確認できるようにする。

<a id="27-本書が目指すデータ標準"></a>
<a id="27本書が目指すデータ標準"></a>
## 2.7 本書が目指すデータ標準

本書では、これからのデータ標準を、

> **データの構造、意味、識別、関係、メタデータおよび他標準との対応を一体として管理・参照できる仕組み**

として捉える。

中心となるのはセマンティックデータモデルである。

```text
                 Semantic Model
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    Vocabulary    Data Dictionary    Mapping
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                Namespace / URI
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
         RDFS       JSON-LD      Metadata
                       │
              ┌────────┴────────┐
              ▼                 ▼
       JSON-LD Context     JSON-LD Sample

                 Data Structure
                       │
                       ▼
                  JSON Schema
```

ここで、モデルや語彙についてはDomainごとのNamespaceを定義し、概念、属性、関係等を安定したURIによって識別できるようにする。

また、データモデル記述から、

* RDFS
* JSON-LD Context
* JSON-LD Sample
* JSON Schema

などの機械可読な成果物を整備する。

これらは必ずしも直列に変換されるものではなく、同じデータモデルを異なる目的から表現する成果物として位置付ける。

理想的には、利用する開発者やAIがNamespaceやURIを通じて必要な定義を参照でき、詳細なセマンティック技術を意識することなく標準モデルを利用できる状態を目指す。

<a id="28-データ標準化の目指す姿"></a>
<a id="28データ標準化の目指す姿"></a>
## 2.8 データ標準化の目指す姿

本書が目指すのは、すべてのデータを一つのモデルや一つのデータベースに統合することではない。

```text
行政標準       統計標準       地理標準
    │              │              │
    ├──────────────┼──────────────┤
    │              │              │
 医療標準        産業標準       その他
    │              │              │
    └──────────────┼──────────────┘
                   │
                   ▼
           Semantic Model
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Concept       URI        Mapping
       │           │           │
       └───────────┼───────────┘
                   ▼
           Machine-readable
              Standards
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
       API     Data Space     AI
```

各分野の標準は、その専門性を維持する。

共通基盤は、それらの違いを消すのではなく、違いと関係を記述する。

その結果、

> **「同じモデルに統一する相互運用性」から、「異なるモデルであっても意味を対応付けられる相互運用性」へ**

発展することを目指す。

そして、

> **「データを交換できること」から、「意味を保持したデータを継続的に発見・接続・再利用できること」へ**

進むことが、本書で目指すデータ標準化の姿である。

---

<a id="第3章-日本のデータ標準化の現状と新たな課題"></a>
<a id="第3章日本のデータ標準化の現状と新たな課題"></a>
# 第3章 日本のデータ標準化の現状と新たな課題

<a id="31-日本におけるデータ標準化の現状"></a>
<a id="31日本におけるデータ標準化の現状"></a>
## 3.1 日本におけるデータ標準化の現状

日本では、長年にわたり多くの分野でデータに関する標準化が行われてきた。

対象は、

```text
文字
形式
データ型
項目
コード
分類
データモデル
識別子
メタデータ
データ交換
```

など多層にわたる。

したがって、日本の課題を、

> 「データ標準化が行われていない」

と整理することは適切ではない。

むしろ、

> **異なる目的で整備された多数の標準が存在していること**

そのものを出発点とする必要がある。

個々の標準がそれぞれの目的に対して適切であっても、複数分野のデータを横断利用するときには別の問題が生じる。

```text
Standard A
    │
    └── Concept A

Standard B
    │
    └── Concept B

Standard C
    │
    └── Concept C
```

これらについて、

* Concept AとConcept Bは同じなのか
* Concept BはConcept Aの一部なのか
* Concept CとConcept Aは変換可能なのか
* どのコード同士が対応するのか

といった関係を説明する必要がある。

今後重要になるのは、それぞれの標準を個別に改善することだけではなく、

> **標準と標準の間をどのように接続するか**

である。

<a id="32-日本における主な標準化の取り組み"></a>
<a id="32日本における主な標準化の取り組み"></a>
## 3.2 日本における主な標準化の取り組み

<a id="321-jisによる標準化"></a>
<a id="321JISによる標準化"></a>
### 3.2.1 JISによる標準化

日本産業規格（JIS）は、工業製品だけではなく、情報処理、文字、用語、データ交換等を含む広い領域を対象とする重要な国内標準である。

国際規格との整合が図られているものもあり、日本における標準化基盤を構成する重要な資産となっている。

一方、JISはそれぞれの規格目的に基づいて定められるため、複数分野に存在する概念やデータモデルを一つのセマンティックモデルとして接続すること自体を主目的とするものではない。

したがって、既存資産として活用し、必要に応じてセマンティックデータモデルから参照する。

<a id="322-日本標準産業分類"></a>
<a id="322日本標準産業分類"></a>
### 3.2.2 日本標準産業分類

日本標準産業分類は、産業を一定の基準に基づいて体系的に分類する重要な標準である。

このような分類体系は、

```text
産業
 │
 ├── Definition
 ├── Identifier
 ├── Broader
 └── Narrower
```

のような概念体系として機械可読化することで、企業情報、統計、地域経済等の複数データから共通して参照できる。

重要なのは、分類表を新しいデータモデルへ置き換えることではない。

> **既存の分類体系を、共通して参照可能な概念資産として利用できるようにすること**

である。

<a id="323-日本標準職業分類"></a>
<a id="323日本標準職業分類"></a>
### 3.2.3 日本標準職業分類

日本標準職業分類も、職業を体系的に分類する既存資産である。

分野横断利用では、

* 分類概念
* 定義
* 階層
* コード
* 他分類との対応

を明示することで、労働、人口、求人、雇用等のデータを接続しやすくなる。

このような既存の分類体系は、セマンティックデータモデルにおける共通語彙やConcept Schemeとして再利用可能な重要な資産となる。

<a id="324-ベース・レジストリ"></a>
<a id="324ベース・レジストリ"></a>
### 3.2.4 ベース・レジストリ

ベース・レジストリは、法人、住所、不動産等、社会活動の基礎となる情報を信頼できる形で整備・提供する重要なデータ基盤である。

公的基礎情報データベース整備改善計画では、公的基礎情報データベースを、制度横断で多数の手続から参照され、国民の利便性向上や行政運営の効率化に資するデータベースとして位置付けている。

また、実際のユースケースやニーズ、実現可能性、費用対効果を確認しながら整備を進める方針が示されている。

現在の計画では、主な対象として、

* 法人ベース・レジストリ
* 不動産ベース・レジストリ
* アドレス・ベース・レジストリ

などが位置付けられている。

ベース・レジストリが重要なのは、単にデータを一か所に集めることではない。

```text
Authoritative Source
        │
        ▼
 Base Registry
        │
        ├── Identifier
        ├── Standardized Data
        ├── Quality
        └── Update
        │
        ▼
 複数システムから再利用
```

という形で、信頼できる基本情報を複数の利用者から共通して参照できるようにする点にある。

実際、同計画では、法人情報の再利用による添付書面の省略、申請項目の入力省略、変更届出の省略、登記情報確認等について政策効果が算定されている。

商業・法人登記関係データベースでは2030年度までの累計政策効果として447.8億円が示されている。

また、不動産登記関係データベースについては2032年度までに408.7億円、住所・所在地関係データベースでは2030年度までに39.0億円の政策効果目標が示されている。

これらはセマンティックデータモデルそのものの効果ではない。

しかし、

> **信頼できる共通データを整備し、多数のシステムや業務から継続的に再利用できるようにすることには、大きな社会的効果があり得る**

ことを示す重要な国内事例である。

一方、

> **Authoritativeなデータを整備することと、異なる分野のデータモデル間の意味を接続することは同じではない。**

ベース・レジストリは、「正しい基本データを共通して参照する」ための重要なデータ基盤である。

セマンティックデータモデルは、そのデータが他の分野のどの概念と関係するのかを扱う。

したがって、両者は競合するものではなく、

```text
Base Registry
     │
     │ 識別・信頼できるデータ
     ▼
Semantic Model
     │
     │ 意味・関係・Mapping
     ▼
分野横断データ利用
```

という補完関係として捉えることができる。

<a id="325-imi"></a>
<a id="325IMI"></a>
### 3.2.5 IMI

IMIは、本書が扱うデータモデル、語彙、意味共有の考え方に近い重要な先行資産である。

特にDMDでは、

* データモデル
* データ構造
* データ項目一覧
* 制約
* Mapping
* 説明文書
* Sample

等をまとめて扱う考え方が示されている。

これは、

> **人間が読むデータモデル定義と、コンピュータが直接利用するモデル表現を接続する**

という点で、本書が目指す方向と共通する部分が多い。

本書では、この考え方を参考としながら、

```text
Data Model Definition
        │
        ├── JSON Schema
        ├── JSON-LD Context
        ├── JSON-LD Sample
        └── RDFS
```

のような機械可読成果物を整備する方向を検討する。

したがって、IMIで蓄積された考え方や既存資産を無視するのではなく、利用可能なものを評価し、再利用することが重要である。

<a id="326-政府相互運用性フレームワークgif"></a>
<a id="326政府相互運用性フレームワークGIF"></a>
### 3.2.6 政府相互運用性フレームワーク（GIF）

政府相互運用性フレームワーク（GIF）は、日本におけるデータ相互運用性やデータ標準化を考える上で重要な既存の取り組みである。

公的基礎情報データベース整備改善計画においても、IPAがデジタル庁と連携し、データ標準化の参照モデルであるGIFの利活用・普及に向けた取り組みを行い、その実績やノウハウを基に技術的助言等を行うことが示されている。

したがって、GIFは既存の重要な参照資産として位置付ける必要がある。

一方、

> **GIFという参照モデルが存在することと、行政、統計、地理、医療、産業、民間等を含めた社会全体で、意味の相互運用性が実現していることは同じではない。**

また、標準や参照モデルが整備されていることと、実際のシステム開発やデータ整備の現場で広く利用されることも別の問題である。

本書では、GIFを否定することも、GIFをそのまま社会全体のセマンティック基盤とみなすこともしない。

既存資産の一つとして評価しながら、本書で必要とする分野横断的なセマンティック相互運用性の要件を検討する。

<a id="327-地方公共団体情報システムの標準化"></a>
<a id="327地方公共団体情報システムの標準化"></a>
### 3.2.7 地方公共団体情報システムの標準化

地方公共団体情報システムの標準化は、自治体業務システムの共通化・標準化を進める重要な取り組みである。

ただし、

> **業務システムを標準化すること**

と、

> **異なる分野で利用される概念を意味レベルで接続すること**

は目的が異なる。

業務システムでは、制度に沿って処理を正確に行うための機能、データ項目、帳票、連携仕様等を整備する必要がある。

セマンティックなデータ基盤では、それらのシステムで利用される概念が、他のシステムや分野のどの概念と対応するのかを扱う。

したがって、地方公共団体情報システムの標準仕様も、分野横断利用では参照・Mapping対象の一つとして考える。

<a id="33-日本のデータ標準化における構造的な特徴"></a>
<a id="33日本のデータ標準化における構造的な特徴"></a>
## 3.3 日本のデータ標準化における構造的な特徴

<a id="331-分野別の標準資産が豊富である"></a>
<a id="331分野別の標準資産が豊富である"></a>
### 3.3.1 分野別の標準資産が豊富である

日本には、行政、統計、地理、産業、医療、土地、法人等、多くの領域に標準が存在する。

これは問題ではなく、重要な資産である。

<a id="332-標準化の目的が異なる"></a>
<a id="332標準化の目的が異なる"></a>
### 3.3.2 標準化の目的が異なる

同じ「標準化」であっても、

* 統計の比較可能性
* 業務処理の共通化
* データ交換
* 分類
* コード統一
* 識別
* 品質確保
* 検索・発見

など、目的は異なる。

したがって、一つの標準ですべてを解決することを前提としてはならない。

<a id="333-同じ対象でも異なるモデルが存在する"></a>
<a id="333同じ対象でも異なるモデルが存在する"></a>
### 3.3.3 同じ対象でも異なるモデルが存在する

例えば「組織」という現実世界の対象についても、

```text
行政
 └── 行政機関

統計
 └── 企業・事業所

法人制度
 └── 法人

施設管理
 └── 管理組織
```

のように、目的によって異なるモデル化が行われる。

これは標準化の失敗ではない。

> **目的が異なれば、同じ現実世界から異なるモデルが作られることは自然である。**

重要なのは、それらを無理に一つへ統合することではなく、それぞれの意味と関係を記述できることである。

<a id="334-標準間が新しい標準化対象となる"></a>
<a id="334標準間が新しい標準化対象となる"></a>
### 3.3.4 「標準間」が新しい標準化対象となる

今後は、

```text
Standard A ──┐
             │
Standard B ──┼── Semantic Mapping
             │
Standard C ──┘
```

という、標準と標準の間を扱う仕組みが重要となる。

つまり、標準化の対象は、

```text
各標準の内部
      ↓
標準と標準の間
```

へも広がる必要がある。

<a id="34-現状の課題"></a>
<a id="34現状の課題"></a>
## 3.4 現状の課題

<a id="341-項目名称だけでは意味を共有できない"></a>
<a id="341項目名称だけでは意味を共有できない"></a>
### 3.4.1 項目名称だけでは意味を共有できない

例えば、

```text
population
```

という項目名を統一しても、

* どの人口か
* 基準日はいつか
* 対象地域は何か
* 推計か実績か
* どの統計制度によるものか

が分からなければ意味は特定できない。

したがって、

> **命名規則は意味の標準化に必要であるが、命名規則だけでは意味の標準化にはならない。**

このため、名称だけではなく、

* Concept
* Definition
* Identifier
* Value Domain
* Unit
* Code
* Relation

等を併せて管理する必要がある。

<a id="342-データ整備・連携における重複と変換負担"></a>
<a id="342データ整備・連携における重複と変換負担"></a>
### 3.4.2 データ整備・連携における重複と変換負担

異なる組織が同じ対象についてそれぞれデータを整備すると、

* 重複したデータ整備
* 表記変換
* クレンジング
* コード変換
* 突合
* 目視確認
* 個別Mapping

などが繰り返される。

この問題は特定の行政システムだけに存在するものではなく、異なるデータを接続する際に広く発生する問題である。

国内における具体的な一例として、公的基礎情報データベース整備改善計画でも、住所・所在地情報について複数主体が同一情報を個別に整備することによる社会全体での重複コストや、表記揺れによるデータ互換性の欠如が課題として整理されている。

また、文字規格の違い、表記揺れ、データ欠落等もデータ品質上の課題として挙げられている。

これらはGIFの有効性や普及状況を直接評価するものではない。

むしろ、

> **データを実際に接続・再利用するためには、標準の存在だけではなく、データ品質、識別、意味、Mapping、運用までを含めた仕組みが必要である**

ことを示す具体例として捉える。

<a id="343-データ辞書・定義情報が分散している"></a>
<a id="343データ辞書・定義情報が分散している"></a>
### 3.4.3 データ辞書・定義情報が分散している

データの定義は、

* データ辞書
* DB定義書
* API仕様
* コード表
* 業務仕様書
* PDF
* Webページ

などに分散して管理されている場合がある。

これらは人間が仕様を確認するためには有効であっても、システムやAIが横断的に参照することは容易ではない。

今後は、

```text
Concept
Definition
Datatype
Unit
Value Domain
Code
Source
Scope
Identifier
Mapping
Version
```

等を共通して参照可能な形で管理する必要がある。

<a id="344-概念を名称から独立して識別する必要がある"></a>
<a id="344概念を名称から独立して識別する必要がある"></a>
### 3.4.4 概念を名称から独立して識別する必要がある

文字列だけでは、異なる標準が同じ概念を参照していることを機械的に確認することが難しい。

例えば、

```text
{namespace}:Person
{namespace}:Organization
{namespace}:Facility
```

のような安定した識別子を概念へ付与する。

これによって、

```text
「組織」
"Organization"
"法人等"
```

といった異なる名称が利用されていても、その背後にあるConceptを識別することが可能となる。

重要なのは特定のURI形式ではなく、

> **概念を項目名称や自然言語表記から独立して識別できること**

である。

<a id="345-標準間のmappingを管理する必要がある"></a>
<a id="345標準間のMappingを管理する必要がある"></a>
### 3.4.5 標準間のMappingを管理する必要がある

異なる標準の概念については、単純に「同じ」「違う」だけでは表現できない場合がある。

例えば、

```text
Concept A
    │
    ├── equivalent
    ├── close
    ├── broader
    ├── narrower
    └── related
         │
         ▼
     Concept B
```

のような関係が存在する。

したがって、単純な名称変換表だけではなく、意味的な対応関係としてMappingを管理する必要がある。

これにより、異なる標準をそのまま維持しながら、相互利用可能な関係を構築できる。

<a id="35-imi・gifから得られる示唆"></a>
<a id="35IMI・GIFから得られる示唆"></a>
## 3.5 IMI・GIFから得られる示唆

IMIとGIFは、本書の問題意識に近い重要な先行資産である。

IMIからは、

* 共通語彙
* DMD
* 人間向けと機械向け仕様の対応
* Mapping

という考え方を学ぶことができる。

GIFからは、

* 参照データモデル
* 再利用可能なデータパーツ
* 実装を意識した標準化
* 相互運用性

という考え方を参照できる。

したがって、

> **既存成果を捨てて一から作るのではなく、何が利用可能で、何が不足しているのかを評価する**

ことが重要となる。

また、過去の取り組みについては、その設計思想だけではなく、

* 実際に利用しやすかったか
* 開発者が容易に実装できたか
* 継続的に管理されたか
* 他分野へ展開できたか
* 機械可読な成果物が十分だったか

といった実装・運用の観点から評価する必要がある。

<a id="36-本提言が対象とするセマンティックデータモデル基盤"></a>
<a id="36本提言が対象とするセマンティックデータモデル基盤"></a>
## 3.6 本提言が対象とするセマンティックデータモデル基盤

本書で対象とする基盤では、特に次の機能を重視する。

* 分野横断で共通利用可能なConcept
* Domainごとのデータモデル
* Conceptの安定したIdentifier
* Namespace
* 語彙とDefinition
* Data Dictionary
* Value Domain・Code
* 異なる標準間のMapping
* RDFS等による語彙・概念定義
* JSON Schemaによるデータ構造・制約定義
* JSON-LD Context
* JSON-LD Sample
* Dataset Metadata
* Version Management
* Governance

概念的には、

```text
             Data Model Definition
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      Vocabulary   Dictionary  Mapping
          │          │          │
          └──────────┼──────────┘
                     ▼
              Namespace / URI
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
     RDFS       JSON-LD Context  JSON Schema
                     │             │
                     ▼             │
               JSON-LD Sample     │
                     │             │
                     └──────┬──────┘
                            ▼
                      実装・利用
```

という構造を想定する。

また、標準の利用者がセマンティック技術を深く理解しなくても利用できることを重要な要件とする。

```text
標準設計者
    │
    ▼
Semantic Model
Namespace / URI
RDFS
JSON-LD Context
JSON Schema
    │
    ▼
Tool / API / Library
    │
    ▼
一般の開発者・AI
```

つまり、

> **意味の複雑性は標準基盤側で管理し、利用者側には可能な限り単純なインターフェースを提供する**

という考え方である。

<a id="37-分野横断セマンティック基盤の実現方法"></a>
<a id="37分野横断セマンティック基盤の実現方法"></a>
## 3.7 分野横断セマンティック基盤の実現方法

本提言では、必要な機能を実現する方法として、

> **新しい基盤を作ること**

自体を目的とはしない。

まず、必要となる要件を定義する。

```text
必要要件
 │
 ├── Semantic Model
 ├── Namespace / URI
 ├── Mapping
 ├── Machine-readable Definition
 ├── JSON Schema
 ├── JSON-LD
 ├── RDFS
 ├── Metadata
 └── Governance
```

その上で、

```text
                 必要要件
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   既存基盤を利用・拡張      新規基盤
     IMI / GIF 等               │
          │                    │
          └─────────┬──────────┘
                    ▼
        Semantic Interoperability
```

という選択を行う。

既存のIMI、GIF等を拡張することで必要な機能を実現できるのであれば、それを利用することが合理的である。

一方、

* 対象分野
* ガバナンス
* Namespace
* 技術構造
* Mapping
* 運用主体
* 利用者層

等の違いによって既存体系への組み込みが困難な場合には、別の基盤を整備し、既存標準とMappingする方法も考えられる。

したがって、

> **「新規か既存拡張か」を先に決めるのではなく、必要なセマンティック相互運用性の要件を先に定める**

ことが重要である。

<a id="38-本章のまとめ"></a>
<a id="38本章のまとめ"></a>
## 3.8 本章のまとめ

日本には、既に多くのデータ標準、分類体系、コード体系、データモデルが存在する。

IMIやGIFのように、データの意味や構造、相互運用性を意識した先行的な取り組みも存在する。

したがって、

> **「日本には標準がないため、新しく作る」**

という問題設定は適切ではない。

今後重要となるのは、

> **既に存在する標準やデータモデルを分野横断で発見・参照・対応付け・再利用できる状態を作ること**

である。

そのためには、

```text
Existing Standards
       │
       ▼
Concept / Definition
       │
       ▼
Identifier / Namespace
       │
       ▼
Semantic Mapping
       │
       ▼
Machine-readable Specification
       │
       ▼
Data / API / Data Space / AI
```

という基盤が必要となる。

その実現方法は、既存基盤の拡張であっても、新しい基盤の整備であってもよい。

重要なのは、

> **利用者が実際に使えること、機械が直接利用できること、そして異なる標準間で意味を共有できること**

である。

次章では、この基盤の中心となる「データモデル」について、その役割と、セマンティックデータモデルとの関係を整理する。

---

<a id="第4章-データモデルとは何か"></a>
<a id="第4章データモデルとは何か"></a>
# 第4章 データモデルとは何か

<a id="41-データモデルの定義"></a>
<a id="41データモデルの定義"></a>
## 4.1 データモデルの定義

<a id="411-データモデルとは"></a>
<a id="411データモデルとは"></a>
### 4.1.1 データモデルとは

データモデルとは、現実世界に存在する対象や概念を抽象化し、情報システムで取り扱うための構造として表現したモデルである。

現実世界には、

* 人
* 組織
* 企業
* 施設
* 地域
* 商品
* 契約
* 取引
* イベント
* 時間

など、さまざまな対象が存在する。

これらをデータとして扱うためには、

* 何を対象として扱うのか
* どのような属性を持つのか
* 対象同士がどのような関係を持つのか
* どのように識別するのか
* どのような制約を持つのか

を定義する必要がある。

概念的には、次のように整理できる。

```text
現実世界
   │
   │ 抽象化
   ▼
概念
   │
   │ モデル化
   ▼
データモデル
   │
   │ 実装
   ▼
データ構造
   │
   ▼
Database / API / File
```

したがって、データモデルは単なるデータベースのテーブル定義ではない。

> **「現実世界の何をデータとして捉え、どのような構造と関係で表現するか」を定義するもの**

である。

<a id="412-データモデルが表現するもの"></a>
<a id="412データモデルが表現するもの"></a>
### 4.1.2 データモデルが表現するもの

一般的なデータモデルでは、主に次の要素を扱う。

| 要素               | 内容           |
| ---------------- | ------------ |
| Entity           | データとして管理する対象 |
| Attribute        | 対象が持つ性質      |
| Relationship     | 対象間の関係       |
| Identifier       | 対象を識別する情報    |
| Constraint       | データが満たすべき条件  |
| Datatype   | 値の型（データ型）       |
| Cardinality | 対象間の数的関係（多重度）     |

例えば、

```text
Person
 ├── person_id
 ├── name
 └── birth_date

Organization
 ├── organization_id
 └── name

Membership
 ├── person
 ├── organization
 └── start_date
```

というモデルでは、

* Personという対象
* Organizationという対象
* PersonがOrganizationに所属する関係

をデータとして表現している。

<a id="413-データモデルは目的に依存する"></a>
<a id="413データモデルは目的に依存する"></a>
### 4.1.3 データモデルは目的に依存する

データモデルは、現実世界そのものではない。

現実世界から、利用目的に必要な部分を選択し、抽象化したものである。

例えば「人」という対象には、

* 氏名
* 生年月日
* 住所
* 職業
* 所属組織
* 資格
* 家族関係

など多くの情報が存在する。

しかし、人口統計で必要となる「人」のモデルと、雇用管理で必要となる「人」のモデルは同一とは限らない。

したがって、

> **目的が異なれば、同じ現実世界の対象について複数の異なるデータモデルが存在し得る。**

この点は、分野横断データモデルを考える上で重要である。

<a id="42-データモデルの役割"></a>
<a id="42データモデルの役割"></a>
## 4.2 データモデルの役割

<a id="421-対象と構造を明確にする"></a>
<a id="421対象と構造を明確にする"></a>
### 4.2.1 対象と構造を明確にする

データモデルの基本的な役割は、

> **何をデータとして扱い、それをどのような構造で表現するのか**

を明確にすることである。

これにより、業務担当者、データモデラー、システム設計者、開発者等が共通の構造について議論できる。

<a id="422-業務上の意味を共有する"></a>
<a id="422業務上の意味を共有する"></a>
### 4.2.2 業務上の意味を共有する

データモデルは、単なる技術的な構造ではない。

概念データモデルや論理データモデルでは、従来から業務上の意味や概念間の関係を扱ってきた。

例えば、

```text
Person ── memberOf ──> Organization
```

というモデルは、単なるテーブル間の結合ではなく、

> 「人が組織に所属する」

という現実世界上・業務上の意味を表現している。

したがって、

> **従来のデータモデルに意味が存在しなかったわけではない。**

本書で問題とするのは、その意味が特定のシステム、組織、モデル図、仕様書等の文脈に依存し、組織や分野を越えて機械的に参照できない場合があることである。

<a id="423-データ品質を確保する"></a>
<a id="423データ品質を確保する"></a>
### 4.2.3 データ品質を確保する

データモデルでは、

* データ型
* 必須項目
* 値の範囲
* 多重度
* コード
* 関係
* 制約

等を明確にできる。

例えば、

```text
birth_date
  → データ型：date

person_id
  → 必須
  → 一意

membership
  → Person 1..*
  → Organization 1
```

のような条件をモデルとして表現できる。

これによって、不正なデータの入力や構造上の不整合を防ぎ、データ品質を維持しやすくなる。

<a id="424-データ交換と再利用を支える"></a>
<a id="424データ交換と再利用を支える"></a>
### 4.2.4 データ交換と再利用を支える

共通のデータモデルを参照できれば、異なるシステム間でデータを交換しやすくなる。

```text
System A
    │
    ▼
Data Model
    ▲
    │
System B
```

また、一度定義されたモデルを、

* API
* JSON
* Database
* Data Catalog
* BI
* AI

など複数の用途で再利用できる。

データモデルは、

> **データを個別システムの内部仕様から、再利用可能な資産へ変えるための基盤**

として機能する。

<a id="425-コミュニケーションの基盤となる"></a>
<a id="425コミュニケーションの基盤となる"></a>
### 4.2.5 コミュニケーションの基盤となる

データモデルは、技術者だけの成果物ではない。

例えば「住所」という言葉についても、

* 住民票上の住所
* 現住所
* 郵送先住所
* 法人所在地
* 施設所在地

など、異なる意味が存在する。

モデル上で対象や概念を明示することで、業務担当者、データ管理者、システム担当者等が同じ対象について議論できる。

したがって、データモデルは、

> **システムの設計図であると同時に、データについて議論するための共通言語**

としての役割を持つ。

<a id="43-概念データモデル・論理データモデル・物理データモデル"></a>
<a id="43概念データモデル・論理データモデル・物理データモデル"></a>
## 4.3 概念データモデル・論理データモデル・物理データモデル

データモデルは、抽象度に応じて、

* 概念データモデル
* 論理データモデル
* 物理データモデル

に分けて整理することができる。

<a id="431-概念データモデル"></a>
<a id="431概念データモデル"></a>
### 4.3.1 概念データモデル

概念データモデルでは、対象となる主要な概念とその関係を整理する。

```text
Person ── memberOf ──> Organization
   │
   └── livesIn ──────> Location
```

この段階では、具体的なデータ型やデータベース構造よりも、

> **「この領域では何を概念として扱うのか」**

を明確にすることが重要となる。

<a id="432-論理データモデル"></a>
<a id="432論理データモデル"></a>
### 4.3.2 論理データモデル

論理データモデルでは、概念モデルをさらに具体化し、

* Entity
* Attribute
* Relationship
* Identifier
* データ型
* 多重度
* Constraint

などを定義する。

```text
PERSON
 ├── person_id
 ├── name
 └── birth_date

ORGANIZATION
 ├── organization_id
 └── name
```

論理データモデルは、原則として特定のデータベース製品や実装技術から独立して設計する。

本書で標準データモデルを整備する際には、概念データモデルと論理データモデルを主な対象とする。

<a id="433-物理データモデル"></a>
<a id="433物理データモデル"></a>
### 4.3.3 物理データモデル

物理データモデルでは、実際に使用するデータベースやシステム環境に合わせて、

* Table
* Column
* データ型
* Index
* Partition
* Primary Key
* Foreign Key

等を具体的に定義する。

例えば、

```text
person_id     VARCHAR(50)
name          VARCHAR(200)
birth_date    DATE
```

のような実装となる。

ただし、本書では物理データモデルを共通標準の中心的な対象とはしない。

> **物理データモデルは、利用するデータベース、サービス、システム構成等に応じて、各サービス構築者・実装主体が設計するものとする。**

したがって、本書では概念・論理レベルのモデルと、それを実装へ接続するための標準成果物を中心に扱う。

<a id="434-モデルと実装表現を分離する"></a>
<a id="434モデルと実装表現を分離する"></a>
### 4.3.4 モデルと実装表現を分離する

本書では、

> **データモデルそのものと、そのデータモデルを実装・交換するための表現形式を分離する**

ことを重要な原則とする。

標準データモデル自体は、UMLクラス図等によって概念・論理構造を表現する。

```text
Conceptual / Logical Model
          │
          ▼
      UML Class Diagram
          │
          ├── JSON Schema
          ├── RDFS
          ├── JSON-LD Context
          ├── JSON-LD Sample
          └── その他の実装形式
```

JSON Schema、RDFS、JSON-LD Context等は、概念データモデルや論理データモデルそのものではない。

> **同じモデルを、異なる用途から機械が利用できるようにした標準成果物**

として位置付ける。

<a id="44-組織・システムを越えたデータモデルの課題"></a>
<a id="44組織・システムを越えたデータモデルの課題"></a>
## 4.4 組織・システムを越えたデータモデルの課題

<a id="441-同じ名称でも意味が異なる"></a>
<a id="441同じ名称でも意味が異なる"></a>
### 4.4.1 同じ名称でも意味が異なる

例えば、二つのシステムに、

```text
population
```

という同じ項目が存在していても、

* 国勢調査人口
* 住民基本台帳人口
* 推計人口
* 昼間人口
* 夜間人口

など、意味が異なる可能性がある。

したがって、

> **構造の互換性と意味の互換性は同じではない。**

<a id="442-異なる名称でも同じ概念の場合がある"></a>
<a id="442異なる名称でも同じ概念の場合がある"></a>
### 4.4.2 異なる名称でも同じ概念の場合がある

逆に、

```text
organization_name
corporate_name
company_name
```

など異なる項目名であっても、特定の利用文脈では同じ概念を表している場合がある。

項目名称だけを基準としたデータ連携には限界がある。

<a id="443-意味がシステム内部に閉じている"></a>
<a id="443意味がシステム内部に閉じている"></a>
### 4.4.3 意味がシステム内部に閉じている

従来のデータモデルでも意味は定義されている。

しかし、その意味が、

* UMLクラス図
* Excelデータ辞書
* PDF仕様書
* 業務マニュアル
* 開発者の知識

等に閉じている場合、別のシステムから直接参照することが難しい。

```text
System A

Data Element
     │
     ▼
Specification
     │
     ▼
Human Interpretation
```

この状態では、データを連携するたびに人間が仕様を読み、意味を確認する必要がある。

<a id="444-個別mappingが増加する"></a>
<a id="444個別Mappingが増加する"></a>
### 4.4.4 個別Mappingが増加する

異なるモデルを個別に接続すると、

```text
Model A ───── Model B
   │             │
   ├──────── Model C
   │             │
   └──────── Model D
```

のようにMappingが増加する。

そこで、

```text
Model A ──┐
Model B ──┼── Common Concept / Vocabulary
Model C ──┤
Model D ──┘
```

のように、共通して参照できるConceptとMappingを管理する基盤が重要となる。

<a id="45-セマンティックデータモデルへの発展"></a>
<a id="45セマンティックデータモデルへの発展"></a>
## 4.5 セマンティックデータモデルへの発展

<a id="451-意味を追加するより意味を外部化する"></a>
<a id="451意味を追加するより意味を外部化する"></a>
### 4.5.1 「意味を追加する」より「意味を外部化する」

セマンティックデータモデルへの発展を、

```text
構造
 ↓
意味
```

という単純な進化として捉えるのは適切ではない。

従来のデータモデルにも意味は存在する。

変化するのは、

```text
システム内部で理解される意味
           │
           ▼
明示的に定義され
識別子を持ち
外部から参照可能な意味
```

への発展である。

したがって、本書では、

> **暗黙的・局所的な意味を、明示的・共有可能・機械参照可能な意味へ発展させること**

をセマンティックデータモデルの重要な特徴として捉える。

<a id="452-セマンティックデータモデルが扱う要素"></a>
<a id="452セマンティックデータモデルが扱う要素"></a>
### 4.5.2 セマンティックデータモデルが扱う要素

分野横断利用のためには、通常のデータモデルに加えて、

* Concept
* Definition
* Identifier
* Namespace
* Concept Relationship
* Vocabulary
* Value Domain
* External Mapping
* Version
* Provenance

等を明示する。

例えば、

```text
Data Element
population
     │
     ▼
Concept
{namespace}:CensusPopulation
     │
     ├── Definition
     ├── Unit
     ├── Value Domain
     ├── Related Concept
     └── External Mapping
```

のように、データ項目とその背後のConceptを分離して管理する。

<a id="453-umlクラス図と機械可読成果物"></a>
<a id="453UMLクラス図と機械可読成果物"></a>
### 4.5.3 UMLクラス図と機械可読成果物

標準データモデルの人間向け表現としては、UMLクラス図を基本的な成果物の一つとする。

例えば、

```text
┌──────────────────┐
│      Person      │
├──────────────────┤
│ identifier       │
│ name             │
└──────────────────┘
          │
          │ memberOf
          ▼
┌──────────────────┐
│   Organization   │
├──────────────────┤
│ identifier       │
│ name             │
└──────────────────┘
```

といった構造によって、Class、Attribute、Relationship、多重度等を表現する。

一方、UMLクラス図だけでは機械が直接利用することは難しい。

そのため、

```text
UML Class Diagram
        +
Data Dictionary
        │
        ▼
Data Model Definition
        │
        ├── RDFS
        ├── JSON Schema
        ├── JSON-LD Context
        └── JSON-LD Sample
```

のように、人間向けモデルと機械可読成果物を対応付けて管理する。

<a id="46-本章のまとめ"></a>
<a id="46本章のまとめ"></a>
## 4.6 本章のまとめ

データモデルとは、現実世界の対象を目的に応じて抽象化し、データとして扱うための構造と関係を定義するものである。

従来のデータモデルも、単なる構造だけではなく、業務上の概念や意味を表現してきた。

しかし、組織や分野を越えてデータを利用するためには、

> **モデルの中に存在する意味を、外部から識別・参照・Mapping可能な形で明示する**

必要がある。

本書では、標準モデルとして主に概念データモデルおよび論理データモデルを扱い、UMLクラス図等によって表現する。

物理データモデルについては、実際のサービスやシステムを構築する各実装主体が設計する。

また、Concept、Definition、Identifier、Namespace、Vocabulary、Mapping等をモデルと関連付け、

* RDFS
* JSON Schema
* JSON-LD Context
* JSON-LD Sample

等の機械可読成果物へ展開する。

次章では、このような意味を明示的に共有するデータモデルであるセマンティックデータモデルについて整理する。

---

<a id="第5章-セマンティックデータモデル"></a>
<a id="第5章セマンティックデータモデル"></a>
# 第5章 セマンティックデータモデル

<a id="51-セマンティックデータモデルとは"></a>
<a id="51セマンティックデータモデルとは"></a>
## 5.1 セマンティックデータモデルとは

<a id="511-セマンティックデータモデルの考え方"></a>
<a id="511セマンティックデータモデルの考え方"></a>
### 5.1.1 セマンティックデータモデルの考え方

本書では、セマンティックデータモデルを、

> **データの構造だけではなく、データが表すConcept、Definition、Identifier、Concept間のRelation、他のモデルとのMapping等を明示的に扱うデータモデル**

である。

ここで重要なのは、セマンティックデータモデルを従来型データモデルの代替と考えないことである。

```text
Data Model
 │
 ├── Entity
 ├── Attribute
 ├── Relationship
 ├── データ型
 ├── 多重度
 └── Constraint

       ＋

Semantic Information
 │
 ├── Concept
 ├── Definition
 ├── Identifier
 ├── Namespace
 ├── Semantic Relation
 └── Mapping
```

という形で、既存のモデリングに「外部から意味を参照する仕組み」を加えるものとして考える。

<a id="512-意味をデータとして管理する"></a>
<a id="512意味をデータとして管理する"></a>
### 5.1.2 意味をデータとして管理する

通常、データの意味は人間が仕様書を読んで理解する。

例えば、

```text
population
```

という項目があった場合、仕様書に、

> 基準日時点における国勢調査による当該地域の人口

と記述されていれば、人間は意味を理解できる。

セマンティックデータモデルでは、この意味情報自体を管理対象とする。

```text
population
     │
     ▼
Concept
     │
     ├── Definition
     ├── Identifier
     ├── Unit
     ├── Reference Date
     ├── Method
     └── Related Concept
```

これにより、データの意味を人間の解釈だけに依存させず、機械からも参照可能にする。

<a id="513-既存データを作り直す必要はない"></a>
<a id="513既存データを作り直す必要はない"></a>
### 5.1.3 既存データを作り直す必要はない

セマンティックデータモデルを導入するために、既存データをすべて作り直す必要はない。

例えば、

```json
{
  "population": 100000
}
```

という既存データについて、

```text
population
     │
     ▼
{namespace}:CensusPopulation
```

というMappingを定義することもできる。

つまり、

> **既存データに共通の意味を参照できる仕組みを追加する**

という段階的なアプローチを取ることができる。

<a id="52-意味を共有するとは何か"></a>
<a id="52意味を共有するとは何か"></a>
## 5.2 意味を共有するとは何か

<a id="521-文字列の一致と意味の一致は異なる"></a>
<a id="521文字列の一致と意味の一致は異なる"></a>
### 5.2.1 文字列の一致と意味の一致は異なる

```text
System A: population
System B: population
```

という二つの項目があっても、それだけでは同じ意味とは限らない。

一方、

```text
System A: organization_name
System B: corporate_name
```

のように項目名が異なっていても、同じConceptへMappingできる可能性がある。

したがって、

> **名称ではなくConceptを基準として意味を共有する**

ことが重要となる。

<a id="522-意味を共有するために必要な情報"></a>
<a id="522意味を共有するために必要な情報"></a>
### 5.2.2 意味を共有するために必要な情報

Conceptを共有するためには、例えば次の情報を管理する。

| 要素           | 内容              |
| ------------ | --------------- |
| Concept      | 何を表しているか        |
| Definition   | どのように定義するか      |
| Identifier   | Conceptをどう識別するか |
| Label        | 人間向けの名称         |
| Relation     | 他Conceptとの関係    |
| Scope        | 適用する分野・制度       |
| Value Domain | 取り得る値           |
| Source       | 定義の根拠           |
| Version      | 定義の版            |
| Mapping      | 外部標準との関係        |

これによって、単なるデータ項目ではなく、その背後の意味を共有できる。

<a id="523-同じ言葉に複数のconceptが存在する"></a>
<a id="523同じ言葉に複数のConceptが存在する"></a>
### 5.2.3 同じ言葉に複数のConceptが存在する

例えば「住所」という言葉には、

```text
Address
 ├── Residential Address
 ├── Mailing Address
 ├── Corporate Address
 └── Facility Location
```

のように、利用目的によって異なるConceptが存在する。

重要なのは、すべてを一つのConceptへ統合することではない。

> **異なるConceptが存在することを認めた上で、それぞれを識別できること**

が必要となる。

<a id="524-concept間の関係を管理する"></a>
<a id="524Concept間の関係を管理する"></a>
### 5.2.4 Concept間の関係を管理する

異なるConceptの間には、

* 上位・下位
* 関連
* 同義・近似
* 他体系との対応

等の関係が存在する。

例えば、分類体系やThesaurusとして管理する場合には、後述するSKOS等を利用してConcept間の関係を表現することができる。

本書では、この段階で意味を一つに統一することよりも、

> **Conceptの違いと関係を機械的に参照できること**

を重視する。

<a id="53-データモデル・共通語彙・データ辞書の関係"></a>
<a id="53データモデル・共通語彙・データ辞書の関係"></a>
## 5.3 データモデル・共通語彙・データ辞書の関係

セマンティックデータモデルを整備する際には、データモデル、語彙、データ辞書を別々に管理するのではなく、相互に関連付ける必要がある。

<a id="531-データモデル"></a>
<a id="531データモデル"></a>
### 5.3.1 データモデル

データモデルは、

> **どのConceptをデータとして扱い、それらがどのような構造・関係を持つか**

を定義する。

<a id="532-共通語彙"></a>
<a id="532共通語彙"></a>
### 5.3.2 共通語彙

共通語彙は、

* Concept
* Property
* Identifier
* Label
* Definition

等を、複数のモデルから再利用可能なVocabularyとして定義する。

```text
Concept
{namespace}:Organization

Label
組織 / Organization

Definition
...

Property
{namespace}:name
```

<a id="533-データ辞書"></a>
<a id="533データ辞書"></a>
### 5.3.3 データ辞書

データ辞書は、具体的なData Elementについて、

* Logical Name
* Physical Name
* Definition
* データ型
* Length
* Required
* Unit
* Value Domain
* Code
* Related Concept

等を管理する。

概念的には、

```text
Concept
    │
    ▼
Data Element Concept
    │
    ▼
Data Element
    │
    ├── データ型
    ├── Value Domain
    └── Constraint
```

という関係として整理できる。

この考え方は、ISO/IEC 11179におけるMetadata Registryの考え方とも親和性が高い。

<a id="534-dmd相当のモデル記述を中心に接続する"></a>
<a id="534DMD相当のモデル記述を中心に接続する"></a>
### 5.3.4 DMD相当のモデル記述を中心に接続する

本書では、これらを一体的に管理するため、

```text
              Data Model Definition
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
     Model         Vocabulary     Data Dictionary
       │              │              │
       └──────────────┼──────────────┘
                      ▼
               Namespace / URI
```

という構造を想定する。

DMDのようなモデル記述を中心に、人間向けの定義と機械可読成果物を対応付けることが理想となる。

<a id="54-オントロジーとの関係"></a>
<a id="54オントロジーとの関係"></a>
## 5.4 オントロジーとの関係

<a id="541-オントロジーとは"></a>
<a id="541オントロジーとは"></a>
### 5.4.1 オントロジーとは

オントロジーは、ある領域に存在するConceptと、それらのRelationや制約等を体系的に表現するための知識モデルである。

例えば、

```text
Person
   │
   ├── memberOf ──> Organization
   └── livesIn ───> Location
```

のように、Concept単体ではなく、Concept間の意味的なRelationを表現する。

<a id="542-semanticontologysemantic-data-modelの関係"></a>
<a id="542SemanticOntologySemanticDataModelの関係"></a>
### 5.4.2 Semantic、Ontology、Semantic Data Modelの関係

OntologyとSemantic Data Modelは、いずれもConceptや意味、Relationを扱うため、近いものとして見える。

本書では説明上、これらをより広い**Semanticな情報表現の領域**に含まれるものとして整理する。

```text
                    Semantic
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    Ontology        Vocabulary    Semantic
                                Data Model
        │              │              │
        └──────────────┼──────────────┘
                       ▼
             Concept / Relation
             Identifier / Mapping
```

ここでいうSemanticは、特定の標準における形式的な上位Classを意味するものではない。

> **意味を明示的に定義・共有・機械処理するための考え方や技術をまとめて捉えるための概念的な領域**

として使用する。

OntologyとSemantic Data Modelには、重なる部分が多いが、主な目的には違いがある。

| 観点     | Ontology                         | Semantic Data Model                                   |
| ------ | -------------------------------- | ----------------------------------------------------- |
| 主な目的   | 領域に存在するConceptとRelationを体系的に表現する | データが表すConceptと意味を明示し、交換・統合・再利用可能にする                   |
| 主な対象   | Concept、Relation、Rule等           | Entity、Attribute、Relation、Concept、Identifier、Mapping等 |
| データ構造  | 特定のデータ構造を必ずしも前提としない              | 実際に利用するデータ構造を扱う                                       |
| 実装との距離 | Knowledge Representation寄り       | Data Exchange、API、Dataset寄り                           |
| 論理・推論  | 必要に応じて重視する                       | 必須ではない                                                |

したがって、

```text
Ontology
    ↓
Semantic Data Model
```

という単純な上下関係として捉えるのではない。

Ontologyで整理されたConceptやRelationをSemantic Data Modelから参照する場合もあれば、Semantic Data Modelの整備過程で整理されたConcept体系をOntologyとして表現する場合もある。

本書では、

> **Ontology、Vocabulary、Classification等のSemanticな意味資産を利用しながら、実際のデータ交換・統合・再利用に利用可能なSemantic Data Modelを整備する**

ことを中心とする。

<a id="543-巨大なオントロジーを作る必要はない"></a>
<a id="543巨大なオントロジーを作る必要はない"></a>
### 5.4.3 巨大なオントロジーを作る必要はない

セマンティックデータモデルを整備することは、必ずしも高度で巨大なOntologyを構築することを意味しない。

当面必要となるのは、

* Concept
* Definition
* Identifier
* 基本的なRelation
* Classification
* Mapping

等である。

必要性に応じて、より高度な論理表現や推論へ発展させればよい。

<a id="55-語彙・分類・オントロジーと表現力"></a>
<a id="55語彙・分類・オントロジーと表現力"></a>
## 5.5 語彙・分類・オントロジーと表現力

Glossary、Taxonomy、Thesaurus、Ontology等は、それぞれ異なる学問分野や実務領域を背景として発展してきた概念である。

例えば、

* Taxonomyは分類や階層化
* Thesaurusは情報検索や語彙統制
* OntologyはKnowledge Representation

といった異なる背景を持つ。

そのため、これらを単純に、

```text
Taxonomy
   ↓
Thesaurus
   ↓
Ontology
```

という成熟度や進化段階として整理することは適切ではない。

実際の利用では、扱う機能が重なる場合もある。

例えば、TaxonomyもThesaurusも階層関係を扱うことができる。

ThesaurusとOntologyはいずれもConcept間のRelationを表現することができる。

したがって本書では、

> **「どの体系が上位か」ではなく、「どの程度の意味関係を表現する必要があるか」**

という観点から整理する。

概念的には、

```text
名称・定義
   │
   ▼
階層・語彙関係
   │
   ▼
Class / Property
   │
   ▼
論理的関係・制約
```

という表現力の違いとして考えることができる。

<a id="551-主な概念と表現対象"></a>
<a id="551主な概念と表現対象"></a>
### 5.5.1 主な概念と表現対象

| 種類                  | 主に扱うもの                              | 代表的な利用                    |
| ------------------- | ----------------------------------- | ------------------------- |
| Glossary            | 用語・名称・定義                            | Business Glossary         |
| Taxonomy            | 分類・階層                               | 分類体系                      |
| Thesaurus           | 優先語・同義語・関連語・階層                      | 情報検索・語彙統制                 |
| Ontology            | Concept・Relation・Rule・Constraint    | Knowledge Representation  |
| Semantic Data Model | Data StructureとSemantic Information | Data Exchange・Integration |

これらは排他的ではなく、一つの基盤の中で組み合わせて利用することができる。

<a id="552-技術表現との関係"></a>
<a id="552技術表現との関係"></a>
### 5.5.2 技術表現との関係

TaxonomyやThesaurusなどのConcept Schemeを機械可読化する場合には、SKOSを利用できる。

ClassやProperty、基本的な階層・意味関係を定義する場合にはRDFSを利用できる。

より高度な論理関係や制約を表現する必要がある場合にはOWLを利用できる。

```text
Classification / Thesaurus
          │
          ▼
         SKOS

Basic Class / Property
          │
          ▼
         RDFS

Advanced Logical Semantics
          │
          ▼
         OWL
```

ただし、SKOS、RDFS、OWLについても、単純な成熟度の段階として捉えるべきではない。

それぞれ目的が異なるため、必要な表現に応じて選択する。

<a id="56-セマンティックデータモデルがもたらす効果"></a>
<a id="56セマンティックデータモデルがもたらす効果"></a>
## 5.6 セマンティックデータモデルがもたらす効果

<a id="561-相互運用性の向上"></a>
<a id="561相互運用性の向上"></a>
### 5.6.1 相互運用性の向上

異なる項目名称やデータ構造を持つシステムでも、共通ConceptとのMappingによって意味レベルで接続できる。

```text
System A
population
    │
    ▼
Common Concept
    ▲
    │
System B
total_population
```

<a id="562-発見性の向上"></a>
<a id="562発見性の向上"></a>
### 5.6.2 発見性の向上

データカタログ等と組み合わせることで、ファイル名や項目名だけではなくConceptを基準としてデータを検索できる。

例えば、「人口」に関連するConceptが明示されていれば、

* population
* total_population
* resident_count

等の異なる名称を持つデータを横断的に発見しやすくなる。

<a id="563-再利用性の向上"></a>
<a id="563再利用性の向上"></a>
### 5.6.3 再利用性の向上

再利用の対象を、データそのものだけではなく、

* Definition
* Vocabulary
* Code
* Mapping
* Data Model
* Identifier

まで広げることができる。

<a id="564-データ統合負担の軽減"></a>
<a id="564データ統合負担の軽減"></a>
### 5.6.4 データ統合負担の軽減

データ連携のたびに、

* 仕様書を読む
* 項目の意味を確認する
* コードを調査する
* Mappingを作成する
* 変換処理を設計する

といった作業を繰り返す負担を減らすことができる。

<a id="565-aiによる利用"></a>
<a id="565AIによる利用"></a>
### 5.6.5 AIによる利用

AIが、

* Concept
* Definition
* Identifier
* Relation
* Mapping
* Metadata

等を参照できれば、項目名だけから意味を推測することへの依存を減らすことができる。

これは、AIによるデータ探索、API利用、データ統合等を考える上でも重要となる。

<a id="57-セマンティックデータモデル整備の基本原則"></a>
<a id="57セマンティックデータモデル整備の基本原則"></a>
## 5.7 セマンティックデータモデル整備の基本原則

<a id="571-既存標準を再利用する"></a>
<a id="571既存標準を再利用する"></a>
### 5.7.1 既存標準を再利用する

新しい標準を作る前に、既存の国内外標準、分類、語彙、コードを調査する。

利用可能なものは再利用し、必要に応じてMappingを定義する。

<a id="572-conceptとdata-elementを分離する"></a>
<a id="572ConceptとDataElementを分離する"></a>
### 5.7.2 ConceptとData Elementを分離する

```text
Concept
     │
     ├── Data Element A
     ├── Data Element B
     └── Data Element C
```

という関係を管理し、項目名称の違いとConceptの違いを分離する。

<a id="573-安定したidentifierとnamespaceを利用する"></a>
<a id="573安定したIdentifierとNamespaceを利用する"></a>
### 5.7.3 安定したIdentifierとNamespaceを利用する

ConceptやPropertyには安定したIdentifierを付与し、Domainごとに責任を持ってNamespaceを管理する。

<a id="574-モデルと表現形式を分離する"></a>
<a id="574モデルと表現形式を分離する"></a>
### 5.7.4 モデルと表現形式を分離する

Semantic Data ModelそのものをJSON、RDF等の特定技術へ依存させない。

同じモデルから用途に応じた複数の表現を提供する。

<a id="575-人間向けと機械向けを同じ情報源から管理する"></a>
<a id="575人間向けと機械向けを同じ情報源から管理する"></a>
### 5.7.5 人間向けと機械向けを同じ情報源から管理する

理想的には、

```text
Data Model Definition
      │
      ├── UML Class Diagram
      ├── Documentation
      ├── Data Dictionary
      ├── JSON Schema
      ├── RDFS
      ├── JSON-LD Context
      └── JSON-LD Sample
```

を同じモデル定義から管理する。

<a id="576-利用者にsemantic-web技術を強制しない"></a>
<a id="576利用者にSemanticWeb技術を強制しない"></a>
### 5.7.6 利用者にSemantic Web技術を強制しない

一般の開発者がRDF、RDFS、JSON-LDの詳細を知らなくても、

* JSON
* API
* JSON Schema
* Library
* Development Tool

等を通じて標準を利用できるようにする。

<a id="577-小さく始める"></a>
<a id="577小さく始める"></a>
### 5.7.7 小さく始める

社会全体を最初からモデル化しない。

対象領域を限定し、実装・検証した上で徐々に拡張する。

<a id="58-本章のまとめ"></a>
<a id="58本章のまとめ"></a>
## 5.8 本章のまとめ

セマンティックデータモデルとは、従来のデータモデルを置き換えるものではない。

データモデルが持つ構造と業務上の意味を、

> **Identifier、Namespace、Vocabulary、Definition、Relation、Mapping等によって外部から参照可能にする**

ことが重要である。

また、本書ではSemanticを広い意味表現の領域として捉え、その中に、

* Ontology
* Vocabulary
* Classification
* Semantic Data Model

等が存在すると整理する。

これらは同一ではないが、ConceptやRelation等を介して相互に利用できる。

本書では、初期段階から高度なOntologyを構築することを目的とせず、実際のデータ交換・統合・再利用に必要なSemantic Data Modelを整備する。

また、機械可読な意味表現として、

* RDFS
* SKOS
* 必要に応じたOWL

を使い分ける。

さらに、その意味を実データへ適用するため、

* JSON Schema
* JSON-LD Context
* JSON-LD Sample

等へ展開する。

次章では、これらの機械可読な意味表現を支えるセマンティックWeb技術について整理する。

---

<a id="第6章-セマンティックweb技術"></a>
<a id="第6章セマンティックWeb技術"></a>
# 第6章 セマンティックWeb技術

<a id="61-セマンティックwebの概要"></a>
<a id="61セマンティックWebの概要"></a>
## 6.1 セマンティックWebの概要

<a id="611-セマンティックwebとは"></a>
<a id="611セマンティックWebとは"></a>
### 6.1.1 セマンティックWebとは

セマンティックWebは、Web上のリソースについて、単なる文字列や文書としてだけではなく、その意味や関係を機械的に扱えるようにするための考え方と技術体系である。

本書では、セマンティックWeb技術そのものを目的とはしない。

> **第5章までに整理したConcept、Vocabulary、Identifier、Relation等を機械可読な形で表現するための技術**

として利用する。

<a id="612-uri・iriとnamespace"></a>
<a id="612URI・IRIとNamespace"></a>
### 6.1.2 URI・IRIとNamespace

セマンティックなデータ基盤では、ConceptやPropertyを文字列だけで識別するのではなく、URIまたはIRIによって識別する。

例えば、

```text
{namespace}:Person
{namespace}:Organization
{namespace}:memberOf
```

のようなIdentifierを利用する。

Namespaceは、

> **ある組織またはDomainが管理する識別子の名前空間**

として位置付ける。

本書では、各Domainが責任を持ってNamespaceを管理し、そこで定義されるConceptやPropertyを継続的に参照可能にすることを想定する。

<a id="62-rdf"></a>
<a id="62RDF"></a>
## 6.2 RDF

<a id="621-rdfとは"></a>
<a id="621RDFとは"></a>
### 6.2.1 RDFとは

RDF（Resource Description Framework）は、リソースとその関係を表現するためのデータモデルである。

RDFの基本単位はTriple（トリプル）と呼ばれ、

```text
Subject（主語）
   ── Predicate（述語） ──>
Object（目的語）
```

という3つの要素によって構成される。

例えば、

```text
Person A
   ── memberOf ──>
Organization B
```

というTripleでは、

* **Subject（主語）**：Person A
* **Predicate（述語）**：memberOf
* **Object（目的語）**：Organization B

となる。

この形式によって、

> **「何が」「どのような関係で」「何と結び付いているか」**

を機械可読な形で表現できる。

<a id="622-rdfはグラフとして関係を表現する"></a>
<a id="622RDFはグラフとして関係を表現する"></a>
### 6.2.2 RDFはグラフとして関係を表現する

複数のTripleを組み合わせることで、

```text
Person A
    │
    └── memberOf ──> Organization B
                           │
                           └── locatedIn ──> Location C
```

というGraphを構成できる。

異なるデータセットで同じIRIを参照すれば、データ間を接続することが可能になる。

<a id="623-rdfは特定の保存方式ではない"></a>
<a id="623RDFは特定の保存方式ではない"></a>
### 6.2.3 RDFは特定の保存方式ではない

RDFはデータモデルであり、特定のデータベース製品やファイル形式ではない。

RDFデータは、

* Turtle
* RDF/XML
* JSON-LD

等、複数の形式で表現できる。

また、すべての業務データをRDF Storeへ格納する必要もない。

既存のRDB、JSON、API等を維持しながら、必要な部分だけをRDFとして利用することもできる。

<a id="63-rdfs"></a>
<a id="63RDFS"></a>
## 6.3 RDFS

<a id="631-rdfsとは"></a>
<a id="631RDFSとは"></a>
### 6.3.1 RDFSとは

RDFS（RDF Schema）は、RDFで利用するClassやPropertyについて、基本的な意味や関係を定義するためのVocabularyである。

例えば、

```text
{namespace}:Person
    type Class

{namespace}:Organization
    type Class

{namespace}:memberOf
    type Property
```

といった定義を行うことができる。

<a id="632-classとproperty"></a>
<a id="632ClassとProperty"></a>
### 6.3.2 ClassとProperty

RDFSでは、主に、

* Class
* Property
* subClassOf
* subPropertyOf
* domain
* range
* label
* comment

等を利用できる。

例えば、

```text
Employee
    subClassOf
        Person
```

と定義すれば、

> EmployeeはPersonの一種である

という関係を機械可読に表現できる。

<a id="633-本書におけるrdfsの位置付け"></a>
<a id="633本書におけるRDFSの位置付け"></a>
### 6.3.3 本書におけるRDFSの位置付け

本書ではRDFSを、

> **共通Vocabulary、Class、Property、基本的なConcept Relationshipを機械可読に公開するための基本的な表現**

として位置付ける。

例えば、

```text
Domain Namespace
       │
       ├── Person
       ├── Organization
       ├── Facility
       ├── memberOf
       └── locatedIn
              │
              ▼
             RDFS
```

という形でVocabularyを公開する。

初期段階では、RDFSによって、

* Class
* Property
* Label
* Definition
* 基本的な階層
* domain
* range

等を表現できれば、共通Vocabularyとして多くの用途に利用できる。

<a id="634-rdfsはvalidation-schemaではない"></a>
<a id="634RDFSはValidationSchemaではない"></a>
### 6.3.4 RDFSはValidation Schemaではない

RDFSの`domain`や`range`は、JSON Schemaのように、

> 「このデータ型でなければエラー」

というValidationを行うための制約とは性格が異なる。

RDFSでは、それらは主として意味の記述や推論に利用される。

したがって、本書では、

```text
RDFS
  → 意味・Vocabulary・Concept Relation

JSON Schema
  → JSON構造・データ型・Validation
```

と役割を分ける。

<a id="64-owl"></a>
<a id="64OWL"></a>
## 6.4 OWL

<a id="641-owlとは"></a>
<a id="641OWLとは"></a>
### 6.4.1 OWLとは

OWL（Web Ontology Language）は、RDFSよりも高度な意味関係や論理的制約を表現するためのOntology Languageである。

例えば、

* Classの同値
* Classの排他性
* Propertyの逆関係
* Propertyの特性
* Cardinality Constraint
* Logical Restriction

等を表現できる。

<a id="642-本書におけるowlの位置付け"></a>
<a id="642本書におけるOWLの位置付け"></a>
### 6.4.2 本書におけるOWLの位置付け

OWLは強力な表現力を持つ一方、すべてのデータ連携や標準モデルに必要なものではない。

本書で当面整備を想定する標準パッケージでは、OWLを必須成果物とはしない。

```text
Basic Vocabulary
      │
      ▼
     RDFS

Classification / Thesaurus
      │
      ▼
     SKOS

Advanced Logical Semantics
      │
      ▼
     OWL
```

のように位置付ける。

> **高度なOntologyや論理推論が必要となるDomainについて、将来的または選択的に利用する技術**

として扱う。

<a id="65-skos"></a>
<a id="65SKOS"></a>
## 6.5 SKOS

<a id="651-skosとは"></a>
<a id="651SKOSとは"></a>
### 6.5.1 SKOSとは

SKOS（Simple Knowledge Organization System）は、

* Classification
* Taxonomy
* Thesaurus
* Code List
* Concept Scheme

等を機械可読なConcept体系として表現するためのW3C標準である。

<a id="652-labelとconceptを分離する"></a>
<a id="652LabelとConceptを分離する"></a>
### 6.5.2 LabelとConceptを分離する

例えば、「人口」というConceptについて、

```text
Concept
   │
   ├── prefLabel
   │      └── 人口
   │
   ├── altLabel
   │      └── 人口数
   │
   └── notation
          └── POP
```

のように、

> **Conceptそのものと、そのConceptを表す名称やコードを分離**

して管理できる。

<a id="653-concept間の関係"></a>
<a id="653Concept間の関係"></a>
### 6.5.3 Concept間の関係

SKOSでは、

* broader
* narrower
* related

等を利用して、Concept間の関係を表現できる。

例えば、

```text
Population
    │
    └── narrower
          │
          ▼
Census Population
```

のような体系を作ることができる。

Thesaurusや分類体系を機械可読に管理する場合に有効である。

<a id="654-国内分類・コード体系への利用"></a>
<a id="654国内分類・コード体系への利用"></a>
### 6.5.4 国内分類・コード体系への利用

日本標準産業分類、日本標準職業分類等の既存分類体系についても、必要に応じてSKOSとして表現することで、

* URIによるConcept識別
* Label管理
* 階層関係
* コード
* 他分類とのMapping

等を機械から参照可能にできる。

<a id="66-json-ld"></a>
<a id="66JSONLD"></a>
## 6.6 JSON-LD

<a id="661-json-ldとは"></a>
<a id="661JSONLDとは"></a>
### 6.6.1 JSON-LDとは

JSON-LDは、JSON形式のデータを、IRIで識別されたVocabularyやRDFデータモデルへ対応付けるためのJSONベースの表現形式である。

通常のJSONに近い形を維持しながら、データ項目がどのConceptやPropertyを表しているかを明示できる。

<a id="662-json-ld-context"></a>
<a id="662JSONLDContext"></a>
### 6.6.2 JSON-LD Context

JSON-LD Contextでは、JSONのPropertyとVocabulary URIの対応を定義する。

例えば、概念的には、

```json
{
  "@context": {
    "name": "{namespace}:name",
    "memberOf": {
      "@id": "{namespace}:memberOf",
      "@type": "@id"
    }
  }
}
```

のように記述する。

これによって、

```json
{
  "name": "山田太郎",
  "memberOf": "ORG001"
}
```

というJSON Propertyを、共通Vocabularyと対応付けることができる。

<a id="663-json-ld-contextとrdfsの役割"></a>
<a id="663JSONLDContextとRDFSの役割"></a>
### 6.6.3 JSON-LD ContextとRDFSの役割

JSON-LD ContextとRDFSは同じものではない。

```text
JSON-LD Context
       │
       └── JSON Property
                │
                ▼
              IRIへ対応

RDFS
       │
       └── そのIRIが表す
           Class / Property / Relation
           を定義
```

という関係になる。

JSON-LD Contextは、主としてJSON表現とSemantic Vocabularyを接続する。

RDFSは、Vocabularyそのものの基本的な意味や関係を定義する。

<a id="664-namespaceを参照可能にする"></a>
<a id="664Namespaceを参照可能にする"></a>
### 6.6.4 Namespaceを参照可能にする

本書が理想とする基盤では、

```text
JSON-LD
   │
   ▼
Vocabulary URI
   │
   ▼
Domain Namespace
   │
   ├── Definition
   ├── RDFS
   ├── Human-readable Documentation
   └── Related Information
```

という構造を整備する。

ただし、JSON-LD Contextを指定しただけで、RDFS定義等が自動的にすべて読み込まれるわけではない。

そのため、

* URIを安定して解決可能にする
* Vocabulary Registryを提供する
* RDFSやDocumentationを取得可能にする
* ToolやLibraryから利用可能にする
* Versionを管理する

といった運用基盤が必要となる。

<a id="665-一般開発者にrdfを意識させない"></a>
<a id="665一般開発者にRDFを意識させない"></a>
### 6.6.5 一般開発者にRDFを意識させない

JSON-LDの重要な利点の一つは、通常のJSON利用者に近い開発体験を維持できることである。

```text
Semantic Infrastructure
  ├── Namespace / URI
  ├── RDFS
  ├── JSON-LD Context
  └── Vocabulary
          │
          ▼
        JSON
          │
          ▼
Application Developer
```

一般開発者は、RDF TripleやRDFSの詳細を理解しなくても、提供された、

* JSON Schema
* JSON-LD Context
* Sample
* Library
* API

等を利用して標準データを作成できる。

これは、本書が目指す重要な設計思想である。

<a id="67-sparql"></a>
<a id="67SPARQL"></a>
## 6.7 SPARQL

SPARQLは、RDF Graphを検索・問い合わせするためのQuery Languageである。

例えば、

> 特定地域に所在するすべてのOrganizationを取得する

といったGraph Queryを実行できる。

SPARQLは、Knowledge GraphやRDF Graphを利用する際には重要な技術となる。

一方、本書の初期段階では、

> **すべてのデータ提供者にSPARQL Endpointを要求することは想定しない。**

RDF Graphを構築し、Graph Queryが必要となるDomainで選択的に利用する技術として位置付ける。

<a id="68-linked-data"></a>
<a id="68LinkedData"></a>
## 6.8 Linked Data

Linked Dataは、Web上でリソースを識別し、異なるデータを相互にリンクして利用するための考え方である。

基本となるのは、

* リソースをURI/IRIで識別する
* URIを通じて情報を参照可能にする
* 標準的なデータ表現を利用する
* 他のリソースへのLinkを持つ

ことである。

```text
Resource A
    │
    └── Link
          │
          ▼
      Resource B
          │
          └── Link
                │
                ▼
            Resource C
```

これによって、組織やデータセットを越えたGraphを構築できる。

一方、すべての業務データをLinked Dataとして公開する必要はない。

本書では、必要性と効果が高い領域から段階的に利用するものとする。

<a id="69-セマンティックweb技術の関係と役割分担"></a>
<a id="69セマンティックWeb技術の関係と役割分担"></a>
## 6.9 セマンティックWeb技術の関係と役割分担

これまで整理した技術は、一つの直線的な導入順序として理解するのではなく、それぞれ異なる役割を持つ技術として整理する必要がある。

特に、

- RDFはResourceとRelationを表現するためのData Model
- RDFS、SKOS、OWLはMeaningやConcept、Relation等を表現するためのVocabulary / Language
- JSON-LD、Turtle、RDF/XMLはRDF Dataを具体的に記述・交換するための表現形式
- SPARQLはRDF GraphをQueryするための言語
- Linked DataはURI / IRI等を利用してWeb上のDataを識別・公開・接続する考え方

という役割の違いがある。

概念的には、次のように整理できる。

```text
                    Semantic Model
                          │
                   Namespace / URI
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
        RDFS             SKOS             OWL
   Class / Property   Concept Scheme   Advanced Ontology
   Basic Semantics    Classification   Logical Semantics
          │               │               │
          └───────────────┼───────────────┘
                          │
                    RDFで表現
                          │
                          ▼
                 ┌─────────────────┐
                 │ RDF Data Model  │
                 │   / RDF Graph   │
                 └────────┬────────┘
                          │
           ┌──────────────┼──────────────┐
           │              │              │
           ▼              ▼              ▼
        JSON-LD         Turtle         RDF/XML
           │
           ▼
 JSON-LD Context / Sample


                 RDF Graph
                     │
                     ▼
                   SPARQL


       URI / IRIによる識別・公開・リンク
                     │
                     ▼
                Linked Data
```

ここで、RDFS、SKOS、OWLはRDFとは別のData Modelへ変換されるものではない。

これらは、RDF Data Modelを利用しながら、

- ClassやProperty
- Concept Scheme
- Concept間のRelation
- Ontology

等を表現するためのVocabularyやLanguageである。

また、JSON-LD、Turtle、RDF/XMLは、それぞれRDF Data Modelを具体的に記述・交換するための表現方法である。

したがって、

```text
RDFS
 ↓
RDF
 ↓
JSON-LD
```

という一方向の処理手順として理解するのではなく、

```text
Semantic Definition
       │
       ▼
    RDF Data Model
       │
       ├── JSON-LD
       ├── Turtle
       └── RDF/XML
```

という関係として理解する方が適切である。

それぞれの役割は、次のように整理できる。

| 技術 | 主な役割 |
|---|---|
| RDF | ResourceとRelationを表現するGraph Data Model |
| RDFS | Class、Property、subClassOf、domain、range等の基本的なSemantic Definitionを表現 |
| SKOS | Classification、Taxonomy、Thesaurus等のConcept Schemeを表現 |
| OWL | より高度なOntologyや論理的なRelation・Constraintを表現 |
| JSON-LD | JSONをIRIと対応付け、RDF Data Modelとして表現・解釈可能にする |
| Turtle | RDF Dataを簡潔なText形式で記述する |
| RDF/XML | RDF DataをXML形式で記述する |
| SPARQL | RDF GraphをQueryする |
| Linked Data | URI / IRI等を利用してWeb上のResourceやDataを識別・公開・相互接続する考え方 |

JSON-LDについては、JSON形式のDataとSemantic Definitionを接続する点で、本書において特に重要な役割を持つ。

例えば、

```text
Application JSON
       │
       ▼
JSON-LD Context
       │
       ▼
Vocabulary URI / IRI
       │
       ▼
RDFS等によるDefinition
```

という関係を構築することで、一般のDeveloperは通常のJSONに近い形式を利用しながら、その背後ではPropertyをSemanticなIdentifierへ対応付けることができる。

また、JSON-LDで表現されたDataはRDF Data Modelとして解釈可能であるが、

> **すべての利用者がRDF GraphやTripleを直接扱う必要があることを意味しない。**

本書では、技術ごとの役割を分離し、利用目的に応じて必要なものを組み合わせる。

特に重要なのは、

> **これらの技術をすべて導入しなければSemantic Data Modelにならないわけではない**

ということである。

例えば、本書で想定する当面の標準Data Modelでは、

```text
Semantic Data Model
       │
       ├── Namespace / URI
       ├── Vocabulary
       ├── RDFS
       ├── JSON Schema
       ├── JSON-LD Context
       └── JSON-LD Sample
```

を中心として整備し、

- SKOS
- OWL
- RDF Dataset
- SPARQL
- Linked Data

については、Classification、Knowledge Graph、Linked Data公開、Graph Query等の具体的なUse Caseが存在する場合に選択的に利用する。

したがって、本書ではセマンティックWeb技術を、

> **高度な技術へ順番に進むための成熟度モデルではなく、同じSemantic Data Modelを異なる目的から表現・利用するための技術群**

として位置付ける。

<a id="610-分野横断データ基盤における技術の使い分け"></a>
<a id="610分野横断データ基盤における技術の使い分け"></a>
## 6.10 分野横断データ基盤における技術の使い分け

<a id="6101-当面の標準パッケージ"></a>
<a id="6101当面の標準パッケージ"></a>
### 6.10.1 当面の標準パッケージ

本書で当面想定する基本的な標準パッケージは、

```text
UML Class Diagram
        +
Data Dictionary
        +
Domain Namespace / URI
        +
RDFS
        +
JSON Schema
        +
JSON-LD Context
        +
JSON-LD Sample
```

である。

これらを一つのData Model Definitionから対応付けて管理する。

```text
            Data Model Definition
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
UML Class       Data Dictionary   Vocabulary
 Diagram                              │
                                     ▼
                              Namespace / URI
                                     │
           ┌─────────────────────────┼───────────────────────┐
           ▼                         ▼                       ▼
         RDFS                   JSON Schema          JSON-LD Context
                                                            │
                                                            ▼
                                                     JSON-LD Sample
```

この範囲を、初期段階の実装可能な標準パッケージとして位置付ける。

<a id="6102-classification・thesaurus・code"></a>
<a id="6102Classification・Thesaurus・Code"></a>
### 6.10.2 Classification・Thesaurus・Code

分類体系、Thesaurus、コード体系等では、必要に応じて、

```text
SKOS
 +
URI
 +
notation
 +
prefLabel / altLabel
 +
broader / narrower / related
```

を利用する。

既存の分類体系を作り直すことではなく、既存Conceptを機械可読・参照可能にすることが目的となる。

<a id="6103-高度なontology"></a>
<a id="6103高度なOntology"></a>
### 6.10.3 高度なOntology

複雑な論理関係や推論が必要となるDomainではOWLを追加することができる。

ただし、OWLは当初から必須とはしない。

```text
Initial Standard
    RDFS
      │
      │ 必要性が生じた場合
      ▼
     OWL
```

という選択的な発展とする。

<a id="6104-graph利用"></a>
<a id="6104Graph利用"></a>
### 6.10.4 Graph利用

複数のDatasetやDomainをGraphとして統合する必要がある場合には、

* RDF
* Linked Data
* SPARQL
* Knowledge Graph

等へ発展させることができる。

これもすべての用途で必須とはしない。

<a id="6105-技術を利用者から隠蔽する"></a>
<a id="6105技術を利用者から隠蔽する"></a>
### 6.10.5 技術を利用者から隠蔽する

最終的には、

```text
標準設計者
   │
   ├── UML Class Diagram
   ├── Data Dictionary
   ├── Namespace / URI
   ├── RDFS
   ├── SKOS / OWL
   ├── JSON-LD Context
   └── JSON Schema
          │
          ▼
       Platform
          │
          ▼
一般開発者
   │
   ├── JSON
   ├── API
   ├── JSON Schema
   ├── Sample
   └── Library
```

という構造を目指す。

一般の開発者は、

> 「このPropertyはRDFSのどのTripleで定義されているか」

を意識する必要はない。

通常のJSON、API、Schema等を利用することで、背後にあるSemantic Definitionの恩恵を受けられる状態が望ましい。

> **Semantic Web技術は基盤側で正しく利用し、利用者には可能な限り通常の開発体験として提供する。**

この考え方が、標準を実際に普及・利用させる上で重要となる。

<a id="611-本章のまとめ"></a>
<a id="611本章のまとめ"></a>
## 6.11 本章のまとめ

セマンティックWeb技術は、セマンティックデータモデルそのものではない。

Concept、Vocabulary、Identifier、Relation等を機械可読に表現し、実データへ接続するための技術基盤である。

本書では、

* URI / IRIとNamespaceによる識別
* RDFSによる基本Vocabulary
* SKOSによる分類・Thesaurus・Concept Scheme
* 必要に応じたOWL
* JSON-LDによるJSONとSemantic Vocabularyの接続
* JSON Schemaによる構造Validation
* 必要に応じたRDF / SPARQL / Linked Data

という役割分担を想定する。

特に当面の標準実装では、

> **UMLクラス図 ＋ データ辞書 ＋ Domain Namespace / URI ＋ RDFS ＋ JSON Schema ＋ JSON-LD Context ＋ JSON-LD Sample**

を基本的な成果物として整備する。

OWL、SPARQL、Linked Data等については、将来的な発展や特定Domainにおいて必要になった場合に選択的に導入する。

そして重要なのは、これらの技術を一般開発者へ直接要求することではない。

> **基盤側で意味を正しく定義し、一般の開発者、システム、AIが必要な定義を自然に参照できる状態を作ること**

である。

次章では、W3C、SEMIC、Schema.org、NIEM、CityGML等の事例を通じて、このような考え方が実際にどのように実装・運用されているかを整理する。

---

<a id="第7章-海外における標準化動向"></a>
<a id="第7章海外における標準化動向"></a>
# 第7章 海外における標準化動向

<a id="71-w3cの取り組み"></a>
<a id="71W3Cの取り組み"></a>
## 7.1 W3Cの取り組み

<a id="711-セマンティックなデータ利用を支える技術標準"></a>
<a id="711セマンティックなデータ利用を支える技術標準"></a>
### 7.1.1 セマンティックなデータ利用を支える技術標準

W3Cでは、Web上でデータの意味や関係を機械可読に表現・共有するため、さまざまな標準が整備されている。

本書に特に関係するものとして、

- RDF
- RDFS
- OWL
- SKOS
- JSON-LD
- SPARQL
- DCAT

等がある。

これらは一つの巨大な仕様を構成するものではなく、それぞれ異なる役割を持つ。

```text
Identifier / URI / IRI
        │
        ├── RDF
        │    └── Graph Data Model
        │
        ├── RDFS
        │    └── Class / Property / 基本的意味関係
        │
        ├── SKOS
        │    └── Concept Scheme / Classification / Thesaurus
        │
        ├── OWL
        │    └── 高度なOntology
        │
        ├── JSON-LD
        │    └── JSONとIRI / RDFの接続
        │
        ├── SPARQL
        │    └── RDF Graph Query
        │
        └── DCAT
             └── Dataset / Data Service Metadata
```

したがって、セマンティックなデータ基盤を構築する際には、

> **一つの技術ですべてを実現するのではなく、役割の異なる標準を組み合わせる**

ことが基本となる。

<a id="712-意味の設計と技術表現を分離する"></a>
<a id="712意味の設計と技術表現を分離する"></a>
### 7.1.2 意味の設計と技術表現を分離する

W3Cの各技術は、Person、Organization、Facility等の社会全体の共通データモデルそのものを定義するものではない。

例えば、RDFはResourceとRelationをGraphとして表現するためのData Modelであり、RDFSやOWLはその上でClass、Property、Relation等を表現するために利用できる。

SKOSは、ClassificationやThesaurus等のConcept Schemeを表現するために利用できる。

したがって、

```text
何をConceptとして扱うか
          │
          ▼
 Semantic Data Model
          │
          ▼
どの技術で機械可読化するか
          │
    ┌─────┼─────┐
    ▼     ▼     ▼
   RDFS  SKOS   OWL
          │
          ▼
       RDF / JSON-LD
```

というように、

> **意味・モデルの設計と、それを表現する技術を分離する**

ことが重要である。

<a id="713-w3cから得られる示唆"></a>
<a id="713W3Cから得られる示唆"></a>
### 7.1.3 W3Cから得られる示唆

W3Cの標準群から得られる重要な示唆は、意味の相互運用性を一つの形式だけで解決しようとしない点にある。

本書でも、

- Concept
- Vocabulary
- Identifier
- Dataset Metadata
- Data Structure
- Graph Representation

等について、役割に応じて標準を組み合わせる。

また、すべての利用者にすべての技術を要求するのではなく、必要な機能だけを選択して利用できる構造とする。

---

<a id="72-semic-core-vocabularies"></a>
<a id="72SEMICCoreVocabularies"></a>
## 7.2 SEMIC Core Vocabularies

<a id="721-core-vocabularyの考え方"></a>
<a id="721CoreVocabularyの考え方"></a>
### 7.2.1 Core Vocabularyの考え方

欧州では、複数の行政分野から再利用可能な基本ConceptをCore Vocabularyとして整備する取り組みが行われている。

この考え方では、個別業務をすべて一つの巨大なモデルへ統合するのではなく、

```text
                Core Vocabulary
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
    Domain A       Domain B       Domain C
```

のように、複数Domainで利用可能な基本Conceptを共有する。

<a id="722-existing-modelとのmapping"></a>
<a id="722ExistingModelとのMapping"></a>
### 7.2.2 Existing ModelとのMapping

重要なのは、既存システムや既存モデルをすべてCore Vocabularyへ作り直すことを前提としないことである。

```text
Existing Model A ──┐
                   │
Existing Model B ──┼── Core Vocabulary
                   │
Existing Model C ──┘
```

のように、既存モデルとのMappingを行うことで相互運用性を高める。

この考え方は、本書が想定する、

> **Small Core + Domain Model + Mapping**

と共通する。

<a id="723-大規模化と実装可能性"></a>
<a id="723大規模化と実装可能性"></a>
### 7.2.3 大規模化と実装可能性

共通化の対象を広げるほど、

- 対象Conceptの増加
- Domain間の調整
- Definitionの合意
- Version Management
- Governance
- Implementation

等の負担も増加する。

したがって、日本で同様の考え方を採用する場合にも、最初から大規模な共通体系を構築することを目標とはしない。

本書では、

> **小さな対象領域で実装可能なところまでモデルを整備し、実際に利用・検証しながらCoreを成長させる**

方針を重視する。

海外の大規模な取り組みは重要な参考事例であるが、その規模や構造をそのまま日本へ移植するのではなく、実装可能性と運用可能性を重視して取り入れる必要がある。

---

<a id="73-schemaorg"></a>
<a id="73Schemaorg"></a>
## 7.3 Schema.org

<a id="731-schemaorgの特徴"></a>
<a id="731Schemaorgの特徴"></a>
### 7.3.1 Schema.orgの特徴

Schema.orgは、Web上で広く利用される共有Vocabularyであり、

- Person
- Organization
- Place
- Event
- Product
- Service

等の一般的なConceptやPropertyを提供している。

本書にとって重要なのは、単に多くのVocabularyが存在することだけではない。

> **安定したNamespaceの下でVocabularyを公開し、WebやJSON-LDから実際に利用できる状態になっている**

点にある。

<a id="732-既存vocabularyとして利用する"></a>
<a id="732既存Vocabularyとして利用する"></a>
### 7.3.2 既存Vocabularyとして利用する

本書では、Schema.orgに存在するConceptを日本側で再定義することを原則とはしない。

利用目的が一致する場合には、

```text
自Domain Model
      │
      ├── reuse / reference
      ▼
 schema:Person
 schema:Organization
 schema:Event
 schema:Place
```

のように既存Vocabularyを利用することを検討する。

一方、日本固有の制度や行政概念など、Schema.orgだけでは十分に表現できないものについては、自Domain Namespaceで定義する。

```text
Schema.org
     │
     ├── General Concepts
     │
     ▼
自Domain Namespace
     │
     └── Japanese / Domain-specific Concepts
```

この二つをJSON-LD Contextの中で組み合わせることが可能である。

<a id="733-json-ldによる利用"></a>
<a id="733JSONLDによる利用"></a>
### 7.3.3 JSON-LDによる利用

概念的には、

```json
{
  "@context": {
    "schema": "https://schema.org/",
    "name": "schema:name"
  },
  "@type": "schema:Place",
  "name": "中央公園"
}
```

のように、通常のJSONに近い形式でVocabularyを利用できる。

このとき、利用者がRDF TripleやRDFSの詳細を意識する必要はない。

この点は、本書が目指す、

> **Semanticな仕組みを基盤側に持ちながら、一般の開発者には通常の開発体験として提供する**

という考え方の重要な参考となる。

---

<a id="74-niem"></a>
<a id="74NIEM"></a>
## 7.4 NIEM

<a id="741-core-domainの考え方"></a>
<a id="741CoreDomainの考え方"></a>
### 7.4.1 Core + Domainの考え方

NIEMは、複数の政府機関や組織間で情報交換を行うため、再利用可能なData DefinitionやData Modelを整備する取り組みである。

概念的には、

```text
                 Core
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
    Domain A   Domain B   Domain C
```

というCore + Domain型の構造を持つ。

<a id="742-既存データ資産を出発点とする"></a>
<a id="742既存データ資産を出発点とする"></a>
### 7.4.2 既存データ資産を出発点とする

共通モデルの整備では、

- Existing Data Dictionary
- Database Definition
- Existing Schema
- Existing Standard

等を調査し、

- Name
- Definition
- Structure
- Mapping

を整理しながら共通部分を抽出する方法が重要となる。

これは、

> **白紙から理想モデルを作るのではなく、実際に存在するデータから共通モデルを構築する**

という実務的なアプローチである。

<a id="743-modelとimplementationを分離する"></a>
<a id="743ModelとImplementationを分離する"></a>
### 7.4.3 ModelとImplementationを分離する

Core / Domain Modelそのものと、個別のSerializationやSchemaを分離して管理することで、

```text
Data Model
    │
    ├── JSON
    ├── XML
    └── その他
```

のような複数の実装へ展開できる。

この考え方も、本書が目指すData Model Definitionと機械可読成果物の分離と整合する。

---

<a id="75-citygml"></a>
<a id="75CityGML"></a>
## 7.5 CityGML

<a id="751-domain固有のsemantic-data-model"></a>
<a id="751Domain固有のSemanticDataModel"></a>
### 7.5.1 Domain固有のSemantic Data Model

CityGMLは、都市を構成する対象を、

- Building
- Road
- Bridge
- Tunnel
- LandUse

等の意味を持つObjectとして表現するDomain Modelである。

単なる三次元形状だけでなく、

> **「そのObjectが何であるか」**

をモデルとして扱う点に特徴がある。

<a id="752-既存domain-modelを維持しながら参照・mappingする"></a>
<a id="752既存DomainModelを維持しながら参照・Mappingする"></a>
### 7.5.2 既存Domain Modelを維持しながら参照・Mappingする

CityGMLのように、特定Domainで既に確立されたモデルが存在する場合、その内容をCommon Coreへコピーして再定義する必要はない。

```text
Common / Smart City Model
           │
           │ reference / mapping
           ▼
        CityGML
      Building
      Road
      LandUse
```

という形で既存Domain Modelを維持しながら接続することが望ましい。

<a id="753-schemaorgとcitygmlの使い分け"></a>
<a id="753SchemaorgとCityGMLの使い分け"></a>
### 7.5.3 Schema.orgとCityGMLの使い分け

Schema.orgは、Person、Organization、Place、Event等の比較的一般的なConceptを共有するVocabularyとして利用しやすい。

一方、CityGMLは都市空間・建物・道路等の専門的なDomain Modelとして利用できる。

本書では、

```text
                   自Domain Model
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     Schema.org       CityGML       独自Concept
     一般Concept     都市Domain      日本固有等
```

のように、既存Semantic Assetを目的に応じて使い分けることを想定する。

必ずしもすべてを自Domain Vocabularyとして再定義する必要はない。

なお、Schema.orgのVocabularyはJSON-LDから直接利用しやすい一方、CityGMLについては、利用するVersionや機械可読なVocabulary表現に応じて、直接参照するか、自Domain VocabularyからMappingするかを選択する必要がある。

---

<a id="76-海外事例から得られる示唆"></a>
<a id="76海外事例から得られる示唆"></a>
## 7.6 海外事例から得られる示唆

海外の取り組みは、それぞれ目的も対象範囲も異なる。

したがって、一つの仕組みをそのまま日本の標準モデルとすることは適切ではない。

一方、共通して参考となる原則がある。

<a id="761-small-coreとdomainを分離する"></a>
<a id="761SmallCoreとDomainを分離する"></a>
### 7.6.1 Small CoreとDomainを分離する

```text
                 Small Core
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    Domain A      Domain B      Domain C
```

とし、共通化するConceptを限定する。

<a id="762-existing-standardを再利用する"></a>
<a id="762ExistingStandardを再利用する"></a>
### 7.6.2 Existing Standardを再利用する

既存の標準やVocabularyをすべて作り直さず、

- Reference
- Reuse
- Mapping

によって利用する。

<a id="763-modelとimplementationを分離する"></a>
<a id="763ModelとImplementationを分離する"></a>
### 7.6.3 ModelとImplementationを分離する

Conceptual / Logical Modelを特定技術へ固定せず、

- JSON Schema
- JSON-LD
- RDF
- Domain-specific Format

等へ展開できるようにする。

<a id="764-namespaceを持つ既存vocabularyを活用する"></a>
<a id="764Namespaceを持つ既存Vocabularyを活用する"></a>
### 7.6.4 Namespaceを持つ既存Vocabularyを活用する

Schema.org等のように、安定したNamespaceで管理され、実際に利用可能なVocabularyが存在する場合には、それを積極的に参照する。

新しいVocabularyを作ること自体を成果とはしない。

<a id="765-標準を実装可能な単位で整備する"></a>
<a id="765標準を実装可能な単位で整備する"></a>
### 7.6.5 標準を実装可能な単位で整備する

ConceptやOntologyを大規模に整理するだけではなく、

- Data Dictionary
- Schema
- Context
- Sample
- Mapping
- Code

まで提供する。

> **「正しいモデル」だけではなく、「実際に使えるモデル」であること**

を重視する。

---

<a id="77-日本への示唆"></a>
<a id="77日本への示唆"></a>
## 7.7 日本への示唆

日本では既に、

- GIF / IMI
- JIS
- 統計分類
- 地理空間標準
- 医療標準
- 教育標準
- ベース・レジストリ
- 各種Code Scheme

等が存在している。

また、国際的にはSchema.orgやCityGML等、実際に利用可能なSemantic Assetも存在する。

したがって、

```text
Existing Domestic Standards
             │
             ├──────────────┐
             ▼              ▼
      Domestic Mapping   Existing Global
                             Vocabulary /
                             Domain Model
                             │
                         Schema.org
                         CityGML等
             │              │
             └──────┬───────┘
                    ▼
             Domain Model
                    │
                    ▼
             Common Concept
```

という構造を考える。

重要なのは、

> **既存資産を取り込んで巨大な日本独自モデルへ作り直すことではなく、必要なConceptを参照・Mappingできること**

である。

さらに、日本では実装可能性を重視し、

> **小さなDomainからUML、Data Dictionary、Code、Namespace、Schema、JSON-LDまで一度通して実装する**

ことを優先する。

---

<a id="78-本章のまとめ"></a>
<a id="78本章のまとめ"></a>
## 7.8 本章のまとめ

海外の事例は、一つの巨大なSemantic Modelへ収束しているわけではない。

本書では、その中から、

- Small Core + Domain
- Existing StandardのReuse / Mapping
- Stable Namespace
- ModelとImplementationの分離
- Machine-readable Specification
- Developer Usability

という原則を採用する。

特にSchema.orgやCityGML等、既に利用可能なVocabulary・Domain Modelについては、必要に応じて参照し、自Domainで不足する部分だけを定義する。

次章では、この考え方を日本における分野横断Semantic Data Model基盤として具体化する。

---

<a id="第8章-日本で整備すべき分野横断セマンティックデータモデル基盤"></a>
<a id="第8章日本で整備すべき分野横断セマンティックデータモデル基盤"></a>
# 第8章 日本で整備すべき分野横断セマンティックデータモデル基盤

<a id="81-全体アーキテクチャ"></a>
<a id="81全体アーキテクチャ"></a>
## 8.1 全体アーキテクチャ

<a id="811-基本的な考え方"></a>
<a id="811基本的な考え方"></a>
### 8.1.1 基本的な考え方

本書で目指すのは、日本に存在するすべてのデータを一つの巨大なモデルへ統合することではない。

必要なのは、

> **分野間で共有するConceptと、それぞれのModel・Standard間のMappingを共通して参照できるSemanticな基盤**

である。

基本構造は、

```text
Small Common Core
       +
Domain Models
       +
Existing Standards
       +
Mappings
```

である。

<a id="812-data-spaceとの関係"></a>
<a id="812DataSpaceとの関係"></a>
### 8.1.2 Data Spaceとの関係

Data Spaceは、異なる組織が一定のルールの下でデータを流通・利用する環境である。

Semantic Data Modelは、その中で意味の相互運用性を支える。

```text
┌──────────────────────────────────┐
│            Data Space            │
│                                  │
│ Governance / Trust / Contract    │
│ Identity / Access                │
│ Catalog / Discovery              │
│ Data Exchange                    │
└───────────────┬──────────────────┘
                ⇅
┌───────────────┴──────────────────┐
│ Semantic Interoperability        │
│                                  │
│ Common Core                      │
│ Domain Models                    │
│ Vocabulary                       │
│ Data Dictionary                  │
│ Identifier / Mapping             │
└───────────────┬──────────────────┘
                │
                ▼
         Data / API / Service
```

Data Spaceが、

> **誰が、どのデータを、どの条件で利用するか**

を扱うのに対し、Semantic Layerは、

> **そのデータが何を意味するか**

を支える。

<a id="813-基盤のレイヤー"></a>
<a id="813基盤のレイヤー"></a>
### 8.1.3 基盤のレイヤー

```text
Layer 5  利用・流通
         ├── Data Space
         ├── Data Catalog
         ├── Open Data
         ├── API
         └── AI

Layer 4  表現・交換
         ├── JSON
         ├── JSON Schema
         ├── JSON-LD
         ├── RDF
         └── Domain Format

Layer 3  仕様・Metadata
         ├── UML Class Diagram
         ├── Data Dictionary
         ├── Metadata Registry
         ├── Code List
         └── Dataset Metadata

Layer 2  識別・Governance
         ├── Namespace
         ├── URI / IRI
         ├── Version
         ├── Ownership
         └── Change Management

Layer 1  Semantic
         ├── Common Core
         ├── Domain Model
         ├── Vocabulary
         ├── Ontology
         └── Mapping
```

各Layerは一方向ではなく、利用側からの要求を受けてModelも継続的に更新する。

---

<a id="82-common-core-model"></a>
<a id="82CommonCoreModel"></a>
## 8.2 Common Core Model

<a id="821-common-coreの役割"></a>
<a id="821CommonCoreの役割"></a>
### 8.2.1 Common Coreの役割

Common Coreは、複数のDomainで実際に共通利用される基本Conceptを扱う。

候補として、

- Person
- Organization
- Location
- Address
- Facility
- Event
- Identifier
- Time

等が考えられる。

ただし、これらを最初からすべてCoreへ含めることを意味しない。

<a id="822-small-coreを基本とする"></a>
<a id="822SmallCoreを基本とする"></a>
### 8.2.2 Small Coreを基本とする

Common Coreは、

> **必要最小限で、安定し、複数Domainから実際に再利用されるConcept**

を中心に構成する。

```text
                  Small Core
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      行政          統計         Smart City
```

Domain固有のAttributeやRelationはDomain Model側で管理する。

<a id="823-pilotからcoreを抽出する"></a>
<a id="823PilotからCoreを抽出する"></a>
### 8.2.3 PilotからCoreを抽出する

最初から日本全体のCoreを完成させない。

```text
Pilot Domain A ──┐
                 │
Pilot Domain B ──┼── 共通して必要なConcept
                 │             │
Pilot Domain C ──┘             ▼
                           Common Core
```

という形で、実装経験からCoreを成長させる。

---

<a id="83-domain-modelと既存標準との関係"></a>
<a id="83DomainModelと既存標準との関係"></a>
## 8.3 Domain Modelと既存標準との関係

Domain Modelは、各専門領域に必要なConcept、Attribute、Relationを扱う。

```text
                 Common Core
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Smart City     統計          医療
        │            │            │
   CityGML等      統計標準      医療標準
```

ここで、Existing Standardを必ず自Domain Modelへ取り込む必要はない。

```text
Domain Concept
      │
      ├── reuse
      ├── reference
      └── mapping
               │
               ▼
       Existing Standard
```

例えばSmart City Domainでは、一般ConceptについてSchema.orgを参照し、都市・建物等についてCityGMLを参照またはMappingし、日本固有・サービス固有のConceptについて自Domain Namespaceを利用することが考えられる。

重要なのは、

> **Coreへの統合、Domain Modelとしての定義、Existing StandardのReuse / Reference / Mappingを目的に応じて使い分けること**

である。

---

<a id="84-共通語彙"></a>
<a id="84共通語彙"></a>
## 8.4 共通語彙

<a id="841-vocabularyの役割"></a>
<a id="841Vocabularyの役割"></a>
### 8.4.1 Vocabularyの役割

Vocabularyは、ConceptやPropertyについて、

- Identifier
- Label
- Definition
- Relation
- Source
- Version

等を定義し、複数のModelやDatasetから共通参照可能にするSemantic Assetである。

例えば、

```text
Concept
  Facility

Identifier
  {namespace}:Facility

Preferred Label
  施設

English Label
  Facility

Definition
  ...
```

<a id="842-conceptとlabelを分離する"></a>
<a id="842ConceptとLabelを分離する"></a>
### 8.4.2 ConceptとLabelを分離する

Conceptそのものと、その名称は分離する。

```text
                 Concept
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    prefLabel    altLabel    notation
```

これによって、日本語名称、英語名称、同義語、Code等をConceptそのものから分離できる。

<a id="843-existing-vocabularyを再利用する"></a>
<a id="843ExistingVocabularyを再利用する"></a>
### 8.4.3 Existing Vocabularyを再利用する

Vocabularyをすべて新しく作る必要はない。

例えば、

```text
自Domain Vocabulary
        │
        ├── reuse / reference → Schema.org
        │
        ├── mapping → CityGML
        │
        └── mapping → 国内標準
```

のようにExisting Vocabularyを利用する。

既存Conceptと意味が一致する場合には再利用し、異なる場合には自DomainでConceptを定義してMappingする。

---

<a id="85-データ辞書・metadata-registry"></a>
<a id="85データ辞書・MetadataRegistry"></a>
## 8.5 データ辞書・Metadata Registry

<a id="851-vocabularyとdata-dictionaryの定義"></a>
<a id="851VocabularyとDataDictionaryの定義"></a>
### 8.5.1 VocabularyとData Dictionaryの定義

本書では、VocabularyとData Dictionaryを明確に区別する。

**Vocabulary（語彙）**とは、データが表すConceptやPropertyについて、名称、Definition、Identifier、Relation等を定義し、複数のData ModelやDatasetから共通して参照可能にするSemanticな資産である。

例えば、

```text
Concept
  Facility

Identifier
  {namespace}:Facility

Label
  施設 / Facility

Definition
  ...

Relation
  ...
```

のように表現する。

Vocabularyが扱う中心は、

> **「そのConcept・Propertyは何を意味するか」**

である。

一方、**Data Dictionary（データ辞書）**とは、特定のData ModelやDatasetで利用されるData Elementについて、その名称、データ型、多重度、制約、単位、Value Domain等を定義する資産である。

例えば、

```text
Data Element
  facility_type

日本語論理名
  施設種別

英語論理名
  facilityType

データ型
  Code

多重度
  0..1

Value Domain
  Facility Type Code

Related Concept / Property
  {namespace}:facilityType
```

のように表現する。

Data Dictionaryが扱う中心は、

> **「そのData Elementをデータとしてどのように表現するか」**

である。

両者は次のように整理できる。

| 観点 | Vocabulary | Data Dictionary |
|---|---|---|
| 主な対象 | Concept / Property | Data Element |
| 主な役割 | 意味を定義する | データ項目を定義する |
| 主な内容 | Identifier、Label、Definition、Relation | Logical Name、Datatype、多重度、Unit、Value Domain、Constraint |
| 再利用範囲 | 複数Model / Domainから参照 | 特定Model / Datasetで利用 |
| 主な機械表現 | RDFS、SKOS等 | JSON Schema等と接続 |
| 接続点 | Concept / Property URI | Related Concept / Property URI |

簡潔に表現すると、

> **Vocabularyは「意味の辞書」、Data Dictionaryは「データ項目の辞書」**

である。

<a id="852-両者を分離しつつ接続する"></a>
<a id="852両者を分離しつつ接続する"></a>
### 8.5.2 両者を分離しつつ接続する

VocabularyとData Dictionaryは別の役割を持つが、孤立して管理してはならない。

```text
Vocabulary
    │
    │ Concept / Property URI
    ▼
Data Dictionary
    │
    │ Data Element
    ▼
実データ
```

Data Dictionaryの各Data Elementが、どのConceptまたはPropertyを表しているのかをURIによって参照できるようにする。

これにより、Data Elementの名称や実装表現が変わっても、その背後にある意味との関係を維持できる。

<a id="853-data-dictionaryで管理する項目"></a>
<a id="853DataDictionaryで管理する項目"></a>
### 8.5.3 Data Dictionaryで管理する項目

Data Dictionaryでは、少なくとも、

- 日本語論理名
- 英語論理名
- Definition
- データ型
- 多重度
- Unit
- Value Domain
- Code Scheme
- Constraint
- Concept / Property URI
- Source
- Version

等を管理する。

これらは、後続のJSON SchemaやJSON-LD Contextを作成する際の基礎情報となる。

<a id="854-isoiec-11179の考え方を参照する"></a>
<a id="854ISOIEC11179の考え方を参照する"></a>
### 8.5.4 ISO/IEC 11179の考え方を参照する

Data ElementおよびそのDefinitionやNamingを管理する上では、ISO/IEC 11179シリーズのMetadata Registryの考え方を参照する。

特に、

```text
Concept
   │
   ▼
Data Element Concept
   │
   ▼
Data Element
   │
   ├── Representation
   └── Value Domain
```

のように、

> **Conceptと、それをData Elementとしてどのように表現するかを分離する**

ことを重視する。

また、

- Naming
- Definition
- Identifier
- Value Domain
- Version

等についても参照する。

<a id="855-json-schemaとjson-ldへの接続"></a>
<a id="855JSONSchemaとJSONLDへの接続"></a>
### 8.5.5 JSON SchemaとJSON-LDへの接続

Data Dictionaryに、

```text
logical_name
datatype
cardinality
value_domain
concept_uri
property_uri
```

等を持たせることで、

```text
Data Dictionary
       │
       ├── Structure情報
       │       ↓
       │   JSON Schema
       │
       └── Semantic情報
               ↓
        JSON-LD Context
               ↓
        Vocabulary / RDFS
```

へ展開できる。

したがって、Data Dictionaryは第8章と第9章をつなぐ重要な中間成果物となる。

---

<a id="86-コード体系"></a>
<a id="86コード体系"></a>
## 8.6 コード体系

<a id="861-codeとconceptを分離する"></a>
<a id="861CodeとConceptを分離する"></a>
### 8.6.1 CodeとConceptを分離する

CodeはConceptそのものではなく、特定SchemeにおけるNotationとして扱う。

```text
Concept
   │
   ├── Identifier
   ├── Label
   └── notation
         └── "01"
```

<a id="862-code-schemeを明示する"></a>
<a id="862CodeSchemeを明示する"></a>
### 8.6.2 Code Schemeを明示する

同じCode値でもSchemeが異なれば意味が異なる。

```text
"01"
  │
  ├── Prefecture Scheme → 北海道
  └── Status Scheme     → 別の意味
```

したがって、

- Scheme
- Code
- Label
- Definition
- Identifier
- Version

を一体として管理する。

<a id="863-existing-codeを優先する"></a>
<a id="863ExistingCodeを優先する"></a>
### 8.6.3 Existing Codeを優先する

既に公的・業界的なCode Schemeが存在する場合には、それを優先的に利用する。

新たなCodeを作る場合には、Existing SchemeとのRelationやMappingも管理する。

<a id="864-skosの利用"></a>
<a id="864SKOSの利用"></a>
### 8.6.4 SKOSの利用

Classification、Taxonomy、Thesaurusとして扱う場合には、

- Concept Scheme
- notation
- prefLabel
- altLabel
- broader
- narrower
- related

等をSKOSで表現することができる。

---

<a id="87-namespaceとuri-iri"></a>
<a id="87NamespaceとURIIRI"></a>
## 8.7 NamespaceとURI / IRI

<a id="871-namespaceがない場合"></a>
<a id="871Namespaceがない場合"></a>
### 8.7.1 Namespaceがない場合

例えば複数のシステムで、

```text
name
type
status
facility
```

というPropertyを利用しているとする。

Namespaceがない場合、

```text
System A
  status
     │
     └── Specification A

System B
  status
     │
     └── Specification B

System C
  status
     │
     └── Specification C
```

となり、それぞれの`status`が同じ意味かどうかを文字列だけから判断することはできない。

利用者はその都度、

- Specificationを探す
- Definitionを読む
- Code Listを確認する
- 他DataとのMappingを調査する

必要がある。

<a id="872-namespaceがある場合"></a>
<a id="872Namespaceがある場合"></a>
### 8.7.2 Namespaceがある場合

NamespaceによってConceptやPropertyを識別すると、

```text
{namespace-a}:status
{namespace-b}:status
```

のように、同じLocal Nameであっても異なるConcept・Propertyとして識別できる。

逆に、

```text
status
state
condition
```

という異なる名称でも、同じまたは関連するConceptへMappingできる。

```text
Local Property
    status
      │
      ▼
JSON-LD Context
      │
      ▼
{namespace}:status
      │
      ▼
Definition / RDFS
```

これによって、

> **名称と意味を分離できる。**

<a id="873-namespaceのメリット"></a>
<a id="873Namespaceのメリット"></a>
### 8.7.3 Namespaceのメリット

Namespaceを整備することで、次の効果を得られる。

**名前の衝突を防止できる。**

`name`、`type`、`status`等の一般的な名称を複数Domainで利用しても、どのVocabularyに属するかを識別できる。

**Definitionの管理主体を明確にできる。**

どの組織・DomainがそのConceptについて責任を持つかを識別できる。

**Label変更からConceptを分離できる。**

日本語名や英語論理名が変更されても、Concept Identifierを維持できる。

**Existing Vocabularyを共存させることができる。**

```text
schema:Person
schema:Organization

{smart-city-namespace}:AdministrativeService

{domain-namespace}:SpecificConcept
```

のように、一つのData Modelの中で複数のVocabularyを利用できる。

**Mappingを共有資産として管理できる。**

```text
{local-domain}:Facility
        │
        ├── mapping → Schema.org
        └── mapping → CityGML
```

というRelationを一度整備すれば、各Systemが個別Mappingを繰り返す必要を減らすことができる。

**機械がDefinitionまで辿れるようになる。**

```text
URI
 │
 ├── Definition
 ├── RDFS
 ├── Mapping
 ├── Version
 └── Related Vocabulary
```

という構造を作ることで、ToolやAIが意味を参照する基盤となる。

<a id="874-namespaceはgovernanceでもある"></a>
<a id="874NamespaceはGovernanceでもある"></a>
### 8.7.4 NamespaceはGovernanceでもある

Namespaceは、本来、識別子や名称を区別するための名前空間である。

本書ではこれに加えて、DomainごとのVocabularyやSemantic Resourceの管理責任を明確にするため、

> **NamespaceをGovernanceの単位としても扱う。**

ことを基本方針とする。

したがって、

- Owner
- Domain
- Persistence
- Version
- Migration
- Deprecation

等を併せて設計する。

<a id="875-domainごとのnamespace"></a>
<a id="875DomainごとのNamespace"></a>
### 8.7.5 DomainごとのNamespace

すべてのVocabularyを一つのNamespaceへ集約する必要はない。

```text
Common Namespace
     └── Common Concept

Smart City Namespace
     └── Smart City固有Concept

Statistics Namespace
     └── Statistics Concept

External Namespace
     ├── Schema.org
     └── CityGML等
```

のように、Domain単位で責任を分散させる。

<a id="876-concept-identifierとresource-identifier"></a>
<a id="876ConceptIdentifierとResourceIdentifier"></a>
### 8.7.6 Concept IdentifierとResource Identifier

Conceptそのものを示すIdentifierと、実世界の特定Resourceを示すIdentifierは区別する。

```text
Concept URI
    ↓
「FacilityというConcept」

Resource URI
    ↓
「ある特定のFacility」
```

本書でまず重視するのは、Class、Property、Vocabulary等を識別するConcept側のIdentifierである。

<a id="877-uriを参照可能な資産とする"></a>
<a id="877URIを参照可能な資産とする"></a>
### 8.7.7 URIを参照可能な資産とする

理想的には、Vocabulary URIを解決したときに、

- Definition
- Human-readable Documentation
- RDFS
- Mapping
- Version
- Related Vocabulary

等へ到達できるようにする。

```text
Vocabulary URI
      │
      ▼
Domain Namespace
      │
      ├── HTML / Documentation
      ├── RDFS
      ├── Mapping
      ├── Version
      └── Related Vocabulary
```

これにより、URIは単なる識別文字列ではなく、

> **意味情報へ到達するための入口**

として利用できる。

<a id="878-利用者がnamespaceを意識しない状態"></a>
<a id="878利用者がNamespaceを意識しない状態"></a>
### 8.7.8 利用者がNamespaceを意識しない状態

Namespaceの最終的な目的は、一般開発者に長いURIを書かせることではない。

例えば一般開発者は、

```json
{
  "name": "中央公園",
  "status": "open"
}
```

という通常のJSONを利用する。

標準側では、

```text
name
  │
  ▼
{namespace}:name

status
  │
  ▼
{namespace}:status
```

とJSON-LD Contextで対応付ける。

さらに、

```text
一般開発者
     │
     ▼
普通のJSON
     │
     ▼
JSON Schema / Tool
     │
     ▼
JSON-LD Context
     │
     ▼
Namespace / URI
     │
     ▼
RDFS / Definition / Mapping
```

という構造を基盤側で提供する。

一般開発者から見れば、

> **普通のJSONを利用しているだけである。**

しかし、その背後では、

- Propertyの意味
- Definition
- Vocabulary
- Mapping
- Version

等を機械が参照できる。

これが、本書がNamespaceに期待する重要な効果である。

ただし、Namespaceだけでこの状態が自動的に成立するわけではない。

```text
Namespace
    +
Stable URI / IRI
    +
Resolvable Definition
    +
RDFS
    +
JSON-LD Context
    +
Tool / Library
```

を一体として整備する必要がある。

---

<a id="88-metadata"></a>
<a id="88Metadata"></a>
## 8.8 Metadata

<a id="881-semantic-data-element-metadataとdataset-metadata"></a>
<a id="881SemanticDataElementMetadataとDatasetMetadata"></a>
### 8.8.1 Semantic / Data Element MetadataとDataset Metadata

本書ではMetadataを大きく二つに分ける。

```text
Semantic / Data Element Metadata
    ├── Concept
    ├── Definition
    ├── Datatype
    ├── Value Domain
    ├── Identifier
    └── Mapping

Dataset Metadata
    ├── Title
    ├── Description
    ├── Publisher
    ├── License
    ├── Temporal
    ├── Spatial
    ├── Distribution
    └── Data Service
```

前者はVocabulary、Data Dictionary、ISO/IEC 11179等と関係する。

後者はDCATやDublin Core等と関係する。

<a id="882-dcatとdublin-core"></a>
<a id="882DCATとDublinCore"></a>
### 8.8.2 DCATとDublin Core

DatasetやData Serviceを発見・利用するためのMetadataには、DCATやDublin Core等を利用する。

```text
Catalog
   │
   ▼
Dataset
   │
   ├── Metadata
   ├── Distribution
   └── Data Service
```

<a id="883-datasetからconceptまで辿れるようにする"></a>
<a id="883DatasetからConceptまで辿れるようにする"></a>
### 8.8.3 DatasetからConceptまで辿れるようにする

```text
Dataset Metadata
       │
       ▼
    Dataset
       │
       ▼
Data Dictionary
       │
       ▼
 Concept URI
       │
       ▼
Semantic Definition
```

という関係を作る。

これによって、

> **「データがどこにあるか」から「そのData Elementが何を意味しているか」まで辿れる**

状態を目指す。

---

<a id="89-バージョン管理とgovernance"></a>
<a id="89バージョン管理とGovernance"></a>
## 8.9 バージョン管理とGovernance

<a id="891-standardは変化する"></a>
<a id="891Standardは変化する"></a>
### 8.9.1 Standardは変化する

Semantic Model、Vocabulary、Code Scheme等は継続的に変化する。

- Concept追加
- Property追加
- Definition修正
- Deprecated
- Code変更
- Mapping変更

等を管理する必要がある。

<a id="892-identifierとversionを分離する"></a>
<a id="892IdentifierとVersionを分離する"></a>
### 8.9.2 IdentifierとVersionを分離する

Identifierの永続性とVersionを分けて管理する。

Definitionの軽微な修正と、Conceptそのものの意味変更を同じものとして扱わない。

<a id="893-分散型governance"></a>
<a id="893分散型Governance"></a>
### 8.9.3 分散型Governance

```text
                 Common Core
                     │
               Core Governance
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
 Smart City       Statistics      Health
 Steward           Steward         Steward
```

のように、Common部分とDomain部分で管理責任を分担する。

<a id="894-change-management"></a>
<a id="894ChangeManagement"></a>
### 8.9.4 Change Management

最低限、

```text
Change Proposal
       │
       ▼
     Review
       │
       ▼
    Approval
       │
       ▼
    Release
       │
       ▼
Deprecation / Migration
```

というLifecycleを設ける。

---

<a id="810-共通基盤の全体像"></a>
<a id="810共通基盤の全体像"></a>
## 8.10 共通基盤の全体像

```text
┌─────────────────────────────────────────────┐
│                利用・流通                    │
│ Data Space / Catalog / API / Open Data / AI │
└────────────────────┬────────────────────────┘
                     ⇅
┌────────────────────┴────────────────────────┐
│       Semantic Data Model Foundation        │
│                                             │
│ Small Common Core                           │
│          │                                  │
│   ┌──────┼──────────────┐                   │
│   ▼      ▼              ▼                   │
│ Domain  Domain    Existing Standards        │
│ Model   Model       / Vocabulary            │
│                   Schema.org / CityGML等    │
│   └──────────┬────────────┘                  │
│              ▼                              │
│            Mapping                          │
│                                             │
│ Vocabulary                                  │
│ Data Dictionary / ISO/IEC 11179             │
│ Code Scheme                                 │
│ Namespace / URI / IRI                       │
│ Version / Governance                        │
└────────────────────┬────────────────────────┘
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
       RDFS     JSON Schema   JSON-LD Context
                                   │
                                   ▼
                             JSON-LD Sample

              Dataset Metadata
              DCAT / Dublin Core
                     │
                     ▼
                Data Catalog
```

OWL、SPARQL、RDF Dataset、Linked Data等は、必要なUse Caseで選択的に利用する。

---

<a id="811-本章のまとめ"></a>
<a id="811本章のまとめ"></a>
## 8.11 本章のまとめ

日本で整備すべきものは、一つの巨大な全国Data Modelではない。

必要なのは、

> **Small Common Core、Domain Model、Existing StandardとのReuse / Mappingを中心として、Vocabulary、Data Dictionary、Code Scheme、Namespace、Metadata、Governanceを接続したSemantic Data Model基盤**

である。

特に、

> **Vocabularyは意味を定義し、Data Dictionaryは具体的なData Elementを定義し、URIによって両者を接続する**

という関係が重要となる。

また、Namespaceを整備することで、ConceptやPropertyを名称から独立して識別し、Schema.org、CityGML、自Domain Vocabulary等を同じデータ環境で共存させることができる。

さらに、そのNamespaceとURIをRDFS、JSON-LD Context、Tool等へ接続することで、一般の開発者がSemantic Web技術を直接意識しなくても意味情報を利用できる環境へ発展させることができる。

次章では、これらをRDFS、JSON Schema、JSON-LD Context等の実装可能な成果物へ展開する方法を整理する。

---

<a id="第9章-標準データモデルの実装"></a>
<a id="第9章標準データモデルの実装"></a>
# 第9章 標準データモデルの実装

<a id="91-データモデルと実装仕様の分離"></a>
<a id="91データモデルと実装仕様の分離"></a>
## 9.1 データモデルと実装仕様の分離

<a id="911-data-model-definitionを中心とする"></a>
<a id="911DataModelDefinitionを中心とする"></a>
### 9.1.1 Data Model Definitionを中心とする

Semantic Data Modelそのものと、個別のSerializationやImplementation Specificationを分離する。

中心となる情報を、

> **Data Model Definition**

として管理する。

そこには、

- Concept
- Class
- Attribute / Property
- Relationship
- 多重度
- データ型
- Definition
- Identifier
- Value Domain
- Code Scheme
- Mapping

等を保持する。

<a id="912-umlとdata-dictionary"></a>
<a id="912UMLとDataDictionary"></a>
### 9.1.2 UMLとData Dictionary

人間がModelを設計・確認する際には、

```text
UML Class Diagram
       +
Data Dictionary
```

を基本とする。

UML Class Diagramでは、

- Class
- Attribute
- Relationship
- Generalization
- Composition
- 多重度

等を表現する。

Data Dictionaryでは、

- Logical Name
- Definition
- Datatype
- Value Domain
- Unit
- Code Scheme
- Concept / Property URI

等を管理する。

<a id="913-rdfsによるvocabulary公開"></a>
<a id="913RDFSによるVocabulary公開"></a>
### 9.1.3 RDFSによるVocabulary公開

Data Model Definitionで定義された自Domain Vocabularyについて、

- Class
- Property
- Label
- Definition
- subClassOf
- domain
- range

等をRDFSとして提供する。

```text
Data Model Definition
       │
       ▼
   Vocabulary
       │
       ▼
Namespace / URI
       │
       ▼
      RDFS
```

RDFSはJSONのStructureをValidationするものではなく、

> **そのURIで識別されるClassやPropertyが何を意味するかを機械可読にする**

役割を持つ。

Existing Vocabularyを利用する場合には、自Domainで同じDefinitionを再作成するのではなく、既存URIのReuse / ReferenceまたはMappingを行う。

<a id="914-同じdefinitionから複数の成果物を提供する"></a>
<a id="914同じDefinitionから複数の成果物を提供する"></a>
### 9.1.4 同じDefinitionから複数の成果物を提供する

```text
             Data Model Definition
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
UML Class        Data Dictionary  Vocabulary
 Diagram                             │
                                    ▼
                             Namespace / URI
                                    │
       ┌──────────────┬─────────────┼────────────┐
       ▼              ▼             ▼            ▼
     RDFS        JSON Schema    JSON-LD      Documentation
                                Context
```

理想的には、これらを別々に手作業で維持するのではなく、共通Definitionから生成・同期する。

---

<a id="92-json-schema"></a>
<a id="92JSONSchema"></a>
## 9.2 JSON Schema

<a id="921-structureとvalidation"></a>
<a id="921StructureとValidation"></a>
### 9.2.1 StructureとValidation

JSON Schemaは、JSONについて、

- Object Structure
- Property
- データ型
- Required
- Pattern
- Format
- Array
- Constraint

等を定義する。

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "id"
  ]
}
```

<a id="922-data-dictionaryからjson-schemaへ"></a>
<a id="922DataDictionaryからJSONSchemaへ"></a>
### 9.2.2 Data DictionaryからJSON Schemaへ

Data Dictionaryに、

```text
Logical Name
Datatype
Cardinality
Required
Pattern
Value Domain
```

等を持たせることで、JSON Schemaの作成に利用できる。

```text
Data Dictionary
       │
       ▼
 JSON Schema
       │
       ▼
Validation
```

<a id="923-json-schemaはmeaningを定義しない"></a>
<a id="923JSONSchemaはMeaningを定義しない"></a>
### 9.2.3 JSON SchemaはMeaningを定義しない

JSON SchemaはStructureとValidationを担当する。

```text
JSON Schema
  → Structure / Validation

Vocabulary / RDFS
  → Meaning / Semantic Definition
```

という役割分担を維持する。

例えば`population`がintegerであることはJSON Schemaで検証できるが、それが国勢調査人口なのか推計人口なのかはVocabulary側のDefinitionを参照する必要がある。

---

<a id="93-json-sample"></a>
<a id="93JSONSample"></a>
## 9.3 JSON Sample

JSON Schemaだけでなく、通常のJSON Sampleも標準成果物として提供する。

```json
{
  "id": "F001",
  "name": "中央公園",
  "facilityType": "park"
}
```

Sampleは、

- DeveloperがStructureを理解する
- Validationを確認する
- Test Dataとして利用する
- API実装例として利用する

ための実装資産である。

複雑なData Modelについては、

- Minimum Sample
- Typical Sample
- Full Sample

等、複数の利用例を提供することも考えられる。

---

<a id="94-json-ld-context"></a>
<a id="94JSONLDContext"></a>
## 9.4 JSON-LD Context

<a id="941-json-propertyとvocabularyを接続する"></a>
<a id="941JSONPropertyとVocabularyを接続する"></a>
### 9.4.1 JSON PropertyとVocabularyを接続する

JSON-LD Contextは、

> **JSON文書上のキーをIRIへ対応付け、必要に応じて値のIRI解釈や型情報を定義することで、JSONをRDF Data Modelとして解釈可能にする**

ために利用する。

例えば、

```json
{
  "@context": {
    "schema": "https://schema.org/",
    "name": "schema:name",
    "facilityType": "https://{authority-domain}/vocab/facilityType"
  }
}
```

とする。

この例では、

- `name`はSchema.orgのExisting Vocabularyを利用する
- `facilityType`は自Domain Vocabularyを利用する

という使い分けを行っている。

<a id="942-existing-vocabularyと自domain-vocabularyを共存させる"></a>
<a id="942ExistingVocabularyと自DomainVocabularyを共存させる"></a>
### 9.4.2 Existing Vocabularyと自Domain Vocabularyを共存させる

JSON-LD Contextでは、複数のNamespaceを組み合わせることができる。

```text
Schema.org
     │
     ├── General Concepts
     └── General Properties

Existing Domain Model
     │
     └── CityGML等

自Domain Namespace
     │
     ├── Japanese-specific Concept
     └── Service-specific Property
```

Schema.orgのようにJSON-LDから直接参照しやすいVocabularyについては、そのURIを利用する。

CityGML等については、利用するVersionや公開されている機械可読なVocabularyの形態に応じて、

- Existing Identifierを直接参照する
- 自Domain VocabularyからMappingする

等を選択する。

> **既存モデルを再定義することではなく、意味の対応関係を維持すること**

が重要である。

<a id="943-data-dictionaryとの接続"></a>
<a id="943DataDictionaryとの接続"></a>
### 9.4.3 Data Dictionaryとの接続

Data DictionaryにProperty URIを保持することで、

```text
Data Element
   facility_type
        │
        ▼
Property URI
        │
        ▼
JSON-LD Context
```

という形でContextを構築しやすくなる。

これにより、

```text
同じData Model Definition
       │
       ├── JSON Schema
       │
       └── JSON-LD Context
```

という一貫性を保つことができる。

<a id="944-rdfsとの接続"></a>
<a id="944RDFSとの接続"></a>
### 9.4.4 RDFSとの接続

JSON-LD ContextはPropertyとIRIを対応付ける。

そのIRIの意味はRDFS等で定義する。

```text
JSON Property
      │
      ▼
JSON-LD Context
      │
      ▼
Vocabulary URI
      │
      ▼
RDFS Definition
```

つまり、

> **Contextは「どのURIか」を示し、RDFSは「そのURIが何を意味するか」を示す。**

<a id="945-contextは標準側で管理する"></a>
<a id="945Contextは標準側で管理する"></a>
### 9.4.5 Contextは標準側で管理する

一般Developerが個別にSemantic Mappingを作るのではなく、標準Package側でContextを提供する。

```text
Standard
   │
   ▼
JSON-LD Context
   │
   ▼
Application
```

<a id="946-contextのversion-management"></a>
<a id="946ContextのVersionManagement"></a>
### 9.4.6 ContextのVersion Management

Remote Contextを公開する場合には、

- Version
- Compatibility
- Availability
- Cache
- Change Management

等を管理する。

Context変更によってExisting Dataの意味が意図せず変わることを防ぐ必要がある。

---

<a id="95-json-ld-sample"></a>
<a id="95JSONLDSample"></a>
## 9.5 JSON-LD Sample

JSON-LD Sampleは、Semantic Mappingを適用した具体的なImplementation Exampleである。

```json
{
  "@context": "https://{authority-domain}/context/facility",
  "@id": "https://{authority-domain}/resource/facility/F001",
  "@type": "https://schema.org/Place",
  "name": "中央公園",
  "facilityType": "https://{authority-domain}/code/facility-type/park"
}
```

このSampleによって、

- `@context`
- `@id`
- `@type`
- Existing Vocabulary
- 自Domain Vocabulary
- Resource Reference

等の利用方法を確認できる。

一般DeveloperにJSON-LD Specificationを最初から理解させるのではなく、

> **動作する具体的なSampleを標準成果物として提供する**

ことが重要である。

---

<a id="96-rdfへの展開"></a>
<a id="96RDFへの展開"></a>
## 9.6 RDFへの展開

<a id="961-rdfは必須の最終工程ではない"></a>
<a id="961RDFは必須の最終工程ではない"></a>
### 9.6.1 RDFは必須の最終工程ではない

本書では、

```text
JSON
 ↓
JSON-LD
 ↓
RDF
 ↓
Linked Data
```

を成熟度の階段とは考えない。

RDFS、JSON Schema、JSON-LD Context等は、同じData Modelから作られる異なる役割の成果物である。

<a id="962-rdfが有効なuse-case"></a>
<a id="962RDFが有効なUseCase"></a>
### 9.6.2 RDFが有効なUse Case

RDFは、

- 複数Datasetの横断
- Knowledge Graph
- Linked Data
- Relationを中心とした検索
- Graph Query

等が必要な場合に利用する。

<a id="963-existing-systemを維持する"></a>
<a id="963ExistingSystemを維持する"></a>
### 9.6.3 Existing Systemを維持する

```text
RDB / JSON / CSV / API
           │
           │ 必要な場合
           ▼
      Semantic Mapping
           │
           ▼
          RDF
```

とし、RDF利用のためにExisting Business Systemを作り直すことを前提としない。

---

<a id="97-apiとの連携"></a>
<a id="97APIとの連携"></a>
## 9.7 APIとの連携

<a id="971-apiとsemantic-data-modelを分離する"></a>
<a id="971APIとSemanticDataModelを分離する"></a>
### 9.7.1 APIとSemantic Data Modelを分離する

APIはデータを提供・交換するInterfaceであり、Semantic Data Modelそのものではない。

```text
Semantic Data Model
         │
         ▼
     API Data Model
         │
         ▼
    OpenAPI等
         │
         ▼
        API
```

API方式が変更されても、上位のConceptやVocabularyを維持できる構造が望ましい。

<a id="972-structureとmeaningを組み合わせる"></a>
<a id="972StructureとMeaningを組み合わせる"></a>
### 9.7.2 StructureとMeaningを組み合わせる

APIで利用するJSONについて、

```text
API JSON
   │
   ├── JSON Schema
   │      └── Structure / Validation
   │
   └── JSON-LD Context
          └── Semantic Mapping
```

を提供できる。

一般利用者は通常のJSON APIとして利用し、必要な利用者やToolだけがContextやSemantic Definitionを利用することができる。

<a id="973-semantic技術を利用条件にしない"></a>
<a id="973Semantic技術を利用条件にしない"></a>
### 9.7.3 Semantic技術を利用条件にしない

```text
一般利用
  └── JSON / API

Structure Validation
  └── JSON Schema

Semantic利用
  └── JSON-LD Context

Graph利用
  └── RDF
```

といった複数の利用方法を許容する。

これらは成熟度の序列ではなく、

> **同じData Modelを異なるUse Caseから利用するためのProfile**

である。

---

<a id="98-オープンデータ・data-catalogとの連携"></a>
<a id="98オープンデータ・DataCatalogとの連携"></a>
## 9.8 オープンデータ・Data Catalogとの連携

<a id="981-dataset-metadata"></a>
<a id="981DatasetMetadata"></a>
### 9.8.1 Dataset Metadata

Datasetには、

- Title
- Description
- Publisher
- License
- Temporal
- Spatial
- Distribution
- Data Service

等をMetadataとして付与する。

DCATやDublin Core等を利用し、Data Catalogから発見可能にする。

<a id="982-datasetからsemantic-definitionへ"></a>
<a id="982DatasetからSemanticDefinitionへ"></a>
### 9.8.2 DatasetからSemantic Definitionへ

```text
Data Catalog
      │
      ▼
   Dataset
      │
      ▼
Data Dictionary
      │
      ▼
Concept / Property URI
      │
      ▼
Vocabulary / RDFS
```

という経路を提供する。

これによって、

> **Datasetを発見した後、その中のData Elementが何を意味しているかまで機械的に確認できる**

状態を目指す。

<a id="983-existing-domain-standardとも接続する"></a>
<a id="983ExistingDomainStandardとも接続する"></a>
### 9.8.3 Existing Domain Standardとも接続する

統計標準、CityGML、行政標準等のExisting Domain Standardについては、無理に共通形式へ変換するのではなく、

- Dataset Metadata
- Identifier
- Vocabulary
- Mapping

等を通じて接続する。

これにより、各Domainの専門性を維持したまま横断利用できる。

---

<a id="99-標準データモデル・パッケージ"></a>
<a id="99標準データモデル・パッケージ"></a>
## 9.9 標準データモデル・パッケージ

<a id="991-基本成果物"></a>
<a id="991基本成果物"></a>
### 9.9.1 基本成果物

本書で当面想定する標準Packageは次のとおりである。

| 成果物 | 主な役割 |
|---|---|
| UMLクラス図 | Class、Attribute、Relation、多重度を表現 |
| Data Dictionary | Data Element、データ型、Value Domain、Definition等を管理 |
| Vocabulary | Concept、Property、Label、Definitionを管理 |
| Code List / Concept Scheme | Classification、Code、Label、Relationを管理 |
| Namespace / URI仕様 | Vocabularyを安定して識別 |
| RDFS | Vocabularyを機械可読に公開 |
| JSON Schema | JSON StructureとValidation |
| JSON Sample | 通常JSONの実装例 |
| JSON-LD Context | JSON PropertyとIRIをMapping |
| JSON-LD Sample | Semantic Dataの実装例 |
| Dataset Metadata Profile | DCAT / Dublin Core等によるDataset説明 |
| Mapping | Existing Standardとの対応 |
| Version Information | Release / Compatibility / Deprecated等を管理 |

これを、

> **実装可能な標準Data Model Package**

として公開する。

<a id="992-当面の基本成果物"></a>
<a id="992当面の基本成果物"></a>
### 9.9.2 当面の基本成果物

当面の中心となる成果物は、

```text
UML Class Diagram
        +
Data Dictionary
        +
Vocabulary
        +
Code List
        +
Domain Namespace / URI
        +
RDFS
        +
JSON Schema
        +
JSON Sample
        +
JSON-LD Context
        +
JSON-LD Sample
```

とする。

OWL、SPARQL、RDF Dataset、Linked Data等は、必要なUse Caseで選択的に追加する。

<a id="993-一般developerから見た姿"></a>
<a id="993一般Developerから見た姿"></a>
### 9.9.3 一般Developerから見た姿

標準設計者は、

```text
Model
Dictionary
Vocabulary
Namespace
RDFS
Schema
Context
```

を管理する。

一般Developerは、

```text
JSON
+
JSON Schema
+
Sample
+
API
```

を中心に利用する。

```text
Semantic Infrastructure
          │
          ▼
   Platform / Tool
          │
          ▼
普通の開発体験
```

とする。

> **Semantic Web技術を理解していることを標準利用の条件にしない。**

標準の内部にSemanticなDefinitionが存在し、ToolやPlatformが必要に応じてそれを利用することで、Developerは通常の開発方法のままSemanticな標準の恩恵を受けられる状態を目指す。

---

<a id="910-本章のまとめ"></a>
<a id="910本章のまとめ"></a>
## 9.10 本章のまとめ

Semantic Data Modelを実際に利用可能にするためには、UMLクラス図やData Dictionaryを作成するだけでは不十分である。

その次に、

- Vocabulary
- Namespace / URI
- RDFS
- JSON Schema
- JSON-LD Context
- JSON / JSON-LD Sample

等へ展開する必要がある。

ただし、これらは一方向の成熟度モデルではない。

```text
             Data Model Definition
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      RDFS      JSON Schema   JSON-LD Context
                      │            │
                      ▼            ▼
                JSON Sample   JSON-LD Sample
```

という、同じData Modelを異なる目的から表現する並列的な標準成果物である。

また、Schema.orgやCityGML等のExisting Semantic Assetについては、必要なConceptを一律に再定義するのではなく、Reuse、Reference、Mappingによって利用する。

特に、

> **Vocabularyによって意味を定義し、Data DictionaryによってData Elementを定義し、Namespace / URIによって両者を安定して接続する**

ことが重要である。

最終的に目指すのは、

> **標準利用者がSemantic Webの専門家になることではなく、通常のJSONやAPIを利用しているだけで、その背後にある共通の意味体系を自然に利用できる状態**

である。

次章では、このようなMachine-readableな標準基盤が、生成AIやAI Agentによるデータ利用にどのような意味を持つかを整理する。

---
<a id="第10章-ai時代におけるデータ標準"></a>
<a id="第10章AI時代におけるデータ標準"></a>
# 第10章 AI時代におけるデータ標準

第2章では、AI時代に必要となるデータ標準の変化を概観した。
本章では、AIがデータ利用主体となることによって、なぜSemantic Data Modelの必要性が高まるのかをさらに掘り下げる。

<a id="101-aiがデータを利用する時代"></a>
<a id="101AIがデータを利用する時代"></a>
## 10.1 AIがデータを利用する時代

<a id="1011-データ利用主体の変化"></a>
<a id="1011データ利用主体の変化"></a>
### 10.1.1 データ利用主体の変化

これまで、データを利用する主体は主として人間、または人間があらかじめ設計したApplicationであった。

```text
Data
  │
  ▼
Application
  │
  ▼
Human
```

DatabaseやAPIの仕様はSystem Developerが事前に理解し、その仕様に基づいてProgramを実装する。

Data Elementの意味についても、仕様書やData Dictionaryを人間が確認し、必要な変換処理や業務Logicへ反映することで利用してきた。

しかし、生成AIやAI Agentの発展によって、Dataを利用する主体そのものが変化し始めている。

AIが、

- Datasetを探索する
- APIの仕様を確認する
- Data Elementを解釈する
- 複数のData Sourceを組み合わせる
- 分析する
- 結果を説明する
- Toolや外部Systemを利用する

といった構成は、将来の構想だけではなく、実際のSystem Architectureの一部として現れ始めている。

```text
             Human
               │
               ▼
              AI
               │
       ┌───────┼───────┐
       ▼       ▼       ▼
      API   Dataset   Catalog
       │       │       │
       └───────┼───────┘
               ▼
         Data Integration
               │
               ▼
       Analysis / Generation
```

この変化によって、Data Standardに求められる役割も変化する。

従来は、

```text
Specification
      │
      ▼
HumanがMeaningを理解
      │
      ▼
Programへ実装
      │
      ▼
Data利用
```

という形で、人間がDataとSystemの間に入り、Meaningを補完してきた。

一方、AIがDataやAPIを動的に選択・利用する場合、

> **人間があらかじめすべてのData ElementのMeaningを読み解き、Programへ実装しておく**

という前提だけでは対応しにくくなる。

そのため、

> **Data Structureだけでなく、Dataが表すMeaningそのものを機械から確認できる仕組み**

が必要となる。

ここに、AI時代にSemantic Data Modelを整備する重要な理由がある。


<a id="1012-aiはmeaningを推測できる"></a>
<a id="1012AIはMeaningを推測できる"></a>
### 10.1.2 AIはMeaningを推測できる

生成AIは自然言語を扱うことができるため、

```text
population
population_count
resident_count
人口
```

といった異なる表現について、文脈からMeaningを推測できる場合がある。

これは従来のRule-basedなProgramとは異なる大きな特徴である。

しかし、

> **Meaningを推測できることと、そのMeaningが正しいことを確認できることは異なる。**

例えば、

```text
population = 100000
```

というData Elementについて、

- Census Population
- Resident Register Population
- Estimated Population
- Daytime Population
- Nighttime Population

のいずれを表しているかは、Property名だけでは判断できない場合がある。

また、

```text
rate = 10.5
```

という値についても、

- 10.5%
- 0.105
- 1,000人当たり10.5人
- 前年比10.5%

など複数のMeaningが考えられる。

AIの推論能力が向上したとしても、元DataのDefinitionが曖昧であれば、誤った解釈の可能性は残る。

したがって、

> **AIにMeaningを推測させることだけに依存せず、AIがMeaningを確認するための根拠を参照できること**

が重要となる。


<a id="102-aiとセマンティックデータモデル"></a>
<a id="102AIとセマンティックデータモデル"></a>
## 10.2 AIとセマンティックデータモデル

<a id="1021-aiのためだけのsemantic-data-modelではない"></a>
<a id="1021AIのためだけのSemanticDataModelではない"></a>
### 10.2.1 AIのためだけのSemantic Data Modelではない

Semantic Data Modelでは、

- Concept
- Definition
- Identifier
- Namespace
- Relation
- Vocabulary
- Data Dictionary
- Mapping

等を明示的に扱う。

これらはAI専用の情報ではない。

従来から、

- Data Integration
- Metadata Management
- Data Governance
- API Development
- Data Catalog
- System Integration

等でも必要とされてきた情報である。

したがって、

> **AIの登場によって新しいData Standardが必要になったというより、人間が読んで利用してきたMeaningを、機械からも直接参照可能にする必要性が高まった**

と捉える方が適切である。


<a id="1022-aiがmeaningを確認するための基準点"></a>
<a id="1022AIがMeaningを確認するための基準点"></a>
### 10.2.2 AIがMeaningを確認するための基準点

例えば、

```text
population
       │
       ▼
Property URI
       │
       ▼
Vocabulary
       │
       ├── Definition
       ├── Unit
       ├── Related Concept
       ├── Source
       └── Mapping
```

という構造が存在すれば、AIはProperty名だけからMeaningを推測するのではなく、Standardとして定義された情報を参照することができる。

Semantic Data Modelの役割は、

> **AIに答えを与えることではなく、AIが推論・判断を行う際に参照できるMeaningの基準点を提供すること**

である。


<a id="1023-semantic-data-modelが存在しない場合"></a>
<a id="1023SemanticDataModelが存在しない場合"></a>
### 10.2.3 Semantic Data Modelが存在しない場合

AIが多様なDataを利用する一方、Meaningを共通して参照できる基盤が存在しない場合、AIはData Elementの名称、Description、周辺文脈、Specification等からMeaningを推測することになる。

```text
Dataset A
  population
       │
       │
Dataset B
  resident_count
       │
       ├────> AIによるMeaningの推測
       │
Dataset C
  total_population
```

AIの推論能力によって、一定程度の対応は可能である。

しかし、Data Sourceが増えるほど、

- 同じ名称だがMeaningが異なる
- 異なる名称だが同じMeaningである
- Unitが異なる
- Code Schemeが異なる
- Reference Dateが異なる
- Definitionが似ているがScopeが異なる
- 対象となるPopulationやOrganization等の境界が異なる

といった問題が増加する。

例えば、

```text
population
```

というPropertyが100のDatasetに存在していたとしても、それらすべてが同じPopulation Conceptを表しているとは限らない。

Semanticな基準が存在しない場合、

```text
Data Source
    │
    ▼
Name / Description
    │
    ▼
AIがMeaningを推測
    │
    ▼
その都度Mapping
```

という処理が繰り返される可能性がある。

これは、人間が従来行ってきた、

```text
Specificationを読む
       ↓
Meaningを確認する
       ↓
Mappingする
```

という作業を、AIへ移しただけともいえる。

AIによって処理速度が向上したとしても、

> **Meaningの基準そのものが存在しなければ、同じ解釈作業を繰り返す構造は残る。**

また、AI、利用時点、Prompt、Context等によって異なるMappingが生成されれば、解釈の一貫性や再現性にも課題が生じ得る。

これに対して、

```text
Dataset A ──┐
Dataset B ──┼── Vocabulary / Concept URI
Dataset C ──┘             │
                           ▼
                    Semantic Model
```

という共有可能なMeaningの基準が存在すれば、AIはMeaningを毎回推測するのではなく、既に定義されたConcept、Definition、Mapping等を参照できる。

したがって、

> **Semantic Data Modelの価値は、AIの推論能力そのものを高めることではなく、AIが毎回Meaningを推測し直す必要を減らし、共通して参照できるMeaningの基準を提供すること**

にある。


<a id="1024-semantic-data-modelだけでは正しさを保証できない"></a>
<a id="1024SemanticDataModelだけでは正しさを保証できない"></a>
### 10.2.4 Semantic Data Modelだけでは正しさを保証できない

Semantic Data Modelが存在しても、

- Data Valueが正しいか
- Dataが最新か
- Sourceが信頼できるか
- Data Qualityが十分か
- 利用権限があるか
- Privacy上利用可能か

まで自動的に保証されるわけではない。

```text
Semantic Definition
        │
        ├── Meaning
        └── Relation

Data Governance
        │
        ├── Provenance
        ├── Quality
        ├── Freshness
        ├── Access Policy
        └── Trust
```

というように、Meaningの定義とData Governanceを組み合わせる必要がある。

したがって、

> **Semantic Data ModelはData QualityやTrustの代替ではなく、それらを正しく解釈・利用するための基盤の一つ**

として位置付ける。


<a id="103-機械可読性の重要性"></a>
<a id="103機械可読性の重要性"></a>
## 10.3 機械可読性の重要性

<a id="1031-machine-readableだけでは十分ではない"></a>
<a id="1031Machinereadableだけでは十分ではない"></a>
### 10.3.1 Machine-readableだけでは十分ではない

本書では説明上、機械による利用可能性を次のように整理する。

| 段階 | 内容 | 例 |
|---|---|---|
| Machine-readable | 機械がStructureとして読み取れる | CSV、JSON |
| Machine-interpretable | 機械がMeaningやRelationを参照できる | URI、RDFS、JSON-LD |
| Machine-actionable | DefinitionやSpecificationを処理へ利用できる | JSON Schema、API Specification、Policy等 |

例えば、

```json
{
  "status": "1"
}
```

というJSONはMachine-readableである。

しかし、`status`や`1`が何を意味するかまでJSONだけから判断できるとは限らない。

そこで、

```text
JSON
  │
  ├── JSON Schema
  │      └── Structure / Validation
  │
  ├── JSON-LD Context
  │      └── Property URI
  │
  └── Vocabulary / RDFS
         └── Meaning
```

を組み合わせる。


<a id="1032-human-readableとmachine-readableを同じdefinitionから管理する"></a>
<a id="1032HumanreadableとMachinereadableを同じDefinitionから管理する"></a>
### 10.3.2 Human-readableとMachine-readableを同じDefinitionから管理する

人間向けSpecificationと機械向けSpecificationを別々に管理すると、変更時に不整合が発生しやすい。

そのため、

```text
              Data Model Definition
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
UML Class Diagram  Data Dictionary  Vocabulary
                       │               │
                       └───────┬───────┘
                               ▼
                         Namespace / URI
                               │
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
         RDFS              JSON Schema       JSON-LD Context
                                                   │
                                                   ▼
                                            JSON-LD Sample
```

のように、一つのDefinitionを基礎として複数成果物を管理することが望ましい。

> **人間用と機械用の別々のStandardを作るのではなく、同じStandardを複数の表現として提供する**

ことが重要である。


<a id="1033-vocabularyとdata-dictionaryも機械から参照可能にする"></a>
<a id="1033VocabularyとDataDictionaryも機械から参照可能にする"></a>
### 10.3.3 VocabularyとData Dictionaryも機械から参照可能にする

AIやToolがData ElementのMeaningを確認するためには、Data DictionaryやVocabulary自体も機械から取得可能であることが望ましい。

例えばData Dictionaryでは、

```text
japanese_name
logical_name
definition
datatype
cardinality
unit
value_domain
code_scheme
property_uri
source
version
```

等を参照可能にする。

これによって、

- このPropertyは何を意味するか
- どのCode Schemeを利用するか
- どのUnitを利用するか
- どのVocabularyのPropertyと対応するか
- どのVersionのDefinitionか

といった情報をSystemやAIが確認できる。


<a id="104-aiが推測するdataから確認できるdataへ"></a>
<a id="104AIが推測するDataから確認できるDataへ"></a>
## 10.4 AIが「推測するData」から「確認できるData」へ

<a id="1041-文字列からmeaningを推測する世界"></a>
<a id="1041文字列からMeaningを推測する世界"></a>
### 10.4.1 文字列からMeaningを推測する世界

NamespaceやVocabularyが存在しないDataでは、

```text
population
status
type
code
```

等の文字列からMeaningを推測する必要がある。

```text
Data Element
     │
     ▼
Name / Context
     │
     ▼
Human / AIによる推測
```

この方式は柔軟である一方、Definitionが曖昧な場合には解釈が安定しない。


<a id="1042-definitionへ辿れる世界"></a>
<a id="1042Definitionへ辿れる世界"></a>
### 10.4.2 Definitionへ辿れる世界

NamespaceとURIを利用すると、

```text
Data Element
     │
     ▼
JSON-LD Context
     │
     ▼
Property URI
     │
     ▼
Vocabulary
     │
     ├── Definition
     ├── Relation
     ├── Code Scheme
     ├── Mapping
     ├── Source
     └── Version
```

という経路を構築できる。

AIやToolは、Property名だけではなくDefinitionを参照して判断することが可能になる。

したがって、

```text
推測
  ↓
確認
```

への変化は、AIの能力だけによって実現するものではない。

> **Meaningへ到達するためのIdentifier、Vocabulary、Data Dictionary、Namespace等をData Standard側で整備する**

必要がある。


<a id="1043-確認できるは絶対に正しいではない"></a>
<a id="1043確認できるは絶対に正しいではない"></a>
### 10.4.3 「確認できる」は「絶対に正しい」ではない

ここでいう「確認できる」とは、

> **定義された根拠へ到達できる**

ことを意味する。

そのDefinitionやSource自体が正しいことを無条件に保証するものではない。

したがって、

```text
Meaning
  +
Source
  +
Version
  +
Provenance
  +
Quality
  +
Access Policy
```

を総合的に扱う必要がある。


<a id="105-ai-agent時代のデータ流通"></a>
<a id="105AIAgent時代のデータ流通"></a>
## 10.5 AI Agent時代のデータ流通

<a id="1051-ai-agentによるdata利用"></a>
<a id="1051AIAgentによるData利用"></a>
### 10.5.1 AI AgentによるData利用

AI AgentがUserから与えられた目的に応じて、複数のData SourceやToolを利用する場面が増えることが考えられる。

例えば、

> 「人口減少が大きい地域で、公共施設再編の検討対象となり得る地域を整理する」

という要求に対して、

```text
AI Agent
   │
   ├── Population Data
   ├── Population Projection
   ├── Facility Data
   ├── Geographic Data
   └── Financial Data
```

等を利用する可能性がある。

ただし、AI Agentが常に自律的かつ正確にData SourceやAPIを発見・選択できることを前提とはしない。

そのため、

- Data Catalog
- Dataset Metadata
- API Specification
- Data Model
- Vocabulary
- Data Dictionary
- Access Policy

等が必要となる。


<a id="1052-apiにstructureだけでなくmeaningを接続する"></a>
<a id="1052APIにStructureだけでなくMeaningを接続する"></a>
### 10.5.2 APIにStructureだけでなくMeaningを接続する

APIには通常、

- Endpoint
- Parameter
- Request
- Response
- Authentication

等が定義される。

さらにSemantic Data Modelと接続すれば、

```text
API
 │
 ├── OpenAPI等
 │     └── Interface
 │
 ├── JSON Schema
 │     └── Structure
 │
 └── Semantic Definition
       ├── Vocabulary
       ├── Property URI
       ├── Code Scheme
       └── Dataset Metadata
```

のように、APIが扱うDataのMeaningへ到達できる。

これはAIだけでなく、通常のSystem Integrationにも有効である。


<a id="1053-ai専用standardを新しく作らない"></a>
<a id="1053AI専用Standardを新しく作らない"></a>
### 10.5.3 AI専用Standardを新しく作らない

AI Agentのためだけに独自VocabularyやData Formatを大量に作ることは望ましくない。

必要となる多くの情報は、

- Definition
- Identifier
- Namespace
- Datatype
- Unit
- Code Scheme
- Source
- Version

等、従来のData Managementでも重要であった。

したがって、

> **AI用の別体系を作るのではなく、人間・System・AIが共通して利用できるStandardを整備する**

ことを基本とする。


<a id="106-knowledge-graphと分野横断データ利用"></a>
<a id="106KnowledgeGraphと分野横断データ利用"></a>
## 10.6 Knowledge Graphと分野横断データ利用

<a id="1061-knowledge-graphは利用形態の一つ"></a>
<a id="1061KnowledgeGraphは利用形態の一つ"></a>
### 10.6.1 Knowledge Graphは利用形態の一つ

Semantic Data ModelによってConcept、Identifier、Relation等が整理されると、それらをKnowledge Graphとして利用することも可能になる。

例えば、

```text
Municipality
     │
     ├── hasPopulation ──> Statistics
     │
     ├── hasFacility ────> Facility
     │
     └── locatedIn ──────> Region
```

というように、複数DatasetをRelationによって接続できる。


<a id="1062-knowledge-graphを最初から必須としない"></a>
<a id="1062KnowledgeGraphを最初から必須としない"></a>
### 10.6.2 Knowledge Graphを最初から必須としない

Knowledge Graphは有用な利用形態であるが、すべてのData Standardで最初から構築する必要はない。

```text
Semantic Data Model
        │
        ├── JSON / API
        ├── Data Catalog
        ├── BI / Analysis
        └── Knowledge Graph
```

のように、同じSemantic Foundationから用途に応じて利用する。

Knowledge Graphを構築すること自体をStandardizationのGoalとはしない。


<a id="1063-分野横断利用への可能性"></a>
<a id="1063分野横断利用への可能性"></a>
### 10.6.3 分野横断利用への可能性

共通IdentifierやMappingが整備されれば、

```text
                     Region
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
 Population         Facility       Disaster
       │               │               │
       └───────────────┼───────────────┘
                       ▼
             Cross-domain Analysis
```

のような分野横断利用を行いやすくなる。

AIは、このようなSemantic Relationを利用するConsumerの一つとして位置付ける。


<a id="107-ai時代に求められるデータ標準の原則"></a>
<a id="107AI時代に求められるデータ標準の原則"></a>
## 10.7 AI時代に求められるデータ標準の原則

<a id="1071-meaningを明示する"></a>
<a id="1071Meaningを明示する"></a>
### 10.7.1 Meaningを明示する

Data Elementの名称だけでなく、Concept、Definition、Relation、Scope等を明示する。


<a id="1072-安定したidentifierを持つ"></a>
<a id="1072安定したIdentifierを持つ"></a>
### 10.7.2 安定したIdentifierを持つ

名称だけに依存せず、ConceptやPropertyをNamespace / URIによって識別可能にする。


<a id="1073-人間と機械の双方から利用可能にする"></a>
<a id="1073人間と機械の双方から利用可能にする"></a>
### 10.7.3 人間と機械の双方から利用可能にする

```text
Human-readable
       +
Machine-readable
       +
Machine-interpretable
```


<a id="1074-vocabularyとdata-dictionaryを接続する"></a>
<a id="1074VocabularyとDataDictionaryを接続する"></a>
### 10.7.4 VocabularyとData Dictionaryを接続する

```text
Vocabulary
    │
    │ Property URI
    ▼
Data Dictionary
    │
    ▼
Data
```


<a id="1075-provenanceとqualityも管理する"></a>
<a id="1075ProvenanceとQualityも管理する"></a>
### 10.7.5 ProvenanceとQualityも管理する

Definitionだけでなく、

- Source
- Version
- Update Date
- Quality
- License
- Access Policy

等を併せて管理する。


<a id="1076-existing-standardを再利用する"></a>
<a id="1076ExistingStandardを再利用する"></a>
### 10.7.6 Existing Standardを再利用する

Schema.org、CityGML、国内Standard、Domain Standard等、利用可能なExisting Assetを優先してReuse、Reference、Mappingする。


<a id="1077-technologyを利用者へ強制しない"></a>
<a id="1077Technologyを利用者へ強制しない"></a>
### 10.7.7 Technologyを利用者へ強制しない

一般DeveloperがRDFやRDFSの内部構造を理解しなくても、

- JSON
- JSON Schema
- Sample
- API

等からStandardを利用できるようにする。


<a id="108-本章のまとめ"></a>
<a id="108本章のまとめ"></a>
## 10.8 本章のまとめ

AIがDataやAPIを利用する環境が現実化し始めたことで、Data Standardに求められる役割も変化しつつある。

これまで人間が仕様書を読み、Meaningを理解してSystemへ実装することで補ってきた部分についても、今後は機械から直接参照可能にする必要性が高まる。

Semantic Data Modelが存在しなければ、AIがDataを大量に処理できるようになったとしても、

```text
Dataを取得
   ↓
Meaningを推測
   ↓
Mapping
   ↓
別のDataでも再び推測
```

という構造が残る。

これに対して、

- Concept
- Definition
- Vocabulary
- Data Dictionary
- Namespace / URI
- Mapping

を共有可能な基盤として整備することで、

```text
Meaningを推測する
        │
        ▼
Meaningの根拠を確認する
```

という利用へ発展させることができる。

したがって、

> **AI時代にSemantic Data Modelが重要になる理由は、AIがSemantic技術を必要とするからではなく、AIを含む多様な利用者が、同じDataのMeaningへ共通して到達できる基準が必要になるからである。**

ただしSemantic Data Modelだけで、Data Quality、Freshness、Trust、Access等を保証できるわけではない。

Semantic DefinitionとMetadata、Provenance、Governanceを組み合わせることが重要である。


---

<a id="第11章-標準化の進め方と参考ロードマップ"></a>
<a id="第11章標準化の進め方と参考ロードマップ"></a>
# 第11章 標準化の進め方と参考ロードマップ

<a id="111-基本方針"></a>
<a id="111基本方針"></a>
## 11.1 基本方針

<a id="1111-全国・全分野を一度にモデル化しない"></a>
<a id="1111全国・全分野を一度にモデル化しない"></a>
### 11.1.1 全国・全分野を一度にモデル化しない

日本には既に、行政、統計、地理空間、医療、産業、防災等のDomainごとに、

- Existing Standard
- Data Model
- Classification
- Code Scheme
- Data Dictionary

等が存在する。

これらを全国・全分野について一度に共通Modelへ統合することは現実的ではない。

したがって、

> **対象Domainを限定して実装可能なところまで整備し、実利用によって検証された成果から共通部分を育てる**

ことを基本的な考え方とする。


<a id="1112-横に広げる前に縦に通す"></a>
<a id="1112横に広げる前に縦に通す"></a>
### 11.1.2 「横に広げる前に、縦に通す」

初期段階では、多くのDomainについてConceptだけを広く整理する方法だけでなく、一つまたは少数のDomainについて実装まで一通り確認する方法が有効である。

```text
Use Case / Domain選定
        │
        ▼
Existing Asset調査
        │
        ▼
Concept整理
        │
        ▼
UML Class Diagram
        │
        ▼
Vocabulary / Data Dictionary / Code
        │
        ▼
Namespace / URI
        │
        ▼
Machine-readable Specification
        │
        ▼
実DataによるValidation
```

つまり、

> **横に広げる前に、まず縦に通す。**

小さなDomainでModelからImplementationまで確認し、その過程で得られた設計原則や成果物を次のDomainへ再利用する。


<a id="1113-model・vocabulary・data-dictionaryは反復的に整備する"></a>
<a id="1113Model・Vocabulary・DataDictionaryは反復的に整備する"></a>
### 11.1.3 Model・Vocabulary・Data Dictionaryは反復的に整備する

これらは完全な直列工程ではない。

```text
                    Concept
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       UML Model    Vocabulary  Data Dictionary
          │            │            │
          └────────────┼────────────┘
                       ▼
                    Review
                       │
                       └────> Model修正
```

Modelingの過程でConceptの違いが明らかになり、Vocabularyを整理することでModelの問題が見つかることもある。

したがって、

> **Concept、Model、Vocabulary、Data Dictionary、Codeを反復しながら一体的に整備する**

ことが重要となる。


<a id="1114-implementation-formを最初から固定しない"></a>
<a id="1114ImplementationFormを最初から固定しない"></a>
### 11.1.4 Implementation Formを最初から固定しない

本提言で示す機能を、

- Existing GIF / IMI等の拡張
- Existing Platformとの連携
- 新しいFoundationの構築

のどの方式で実現するかは、あらかじめ固定しない。

重要なのは、

- Cross-domain利用
- Small Core / Domain分離
- Stable Identifier
- Namespace
- Mapping
- Machine-readable Vocabulary
- Data Dictionary
- Schema / Context
- Governance

等のRequirementsを満たすことである。

> **概念的な役割は明確にするが、Implementation FormはRequirementsに基づいて選択する。**


<a id="112-実装アプローチの一例"></a>
<a id="112実装アプローチの一例"></a>
## 11.2 実装アプローチの一例

以下に示す手順は、日本全体に一律に適用すべき標準化Processを定めるものではない。

Semantic Data Modelを小規模な対象領域から実装する場合の、

> **一つの実践的な進め方の例**

として示すものである。

対象Domain、Existing Asset、Use Case、Governance、実装主体、利用するTool等によって、工程の順序や成果物は変更され得る。

また、各工程は必ずしも完全なWaterfallとして進めるものではなく、必要に応じて前の工程へ戻りながら反復する。

この例で重要なのは、個々のStepを形式的に実施することではない。

> **Conceptの整理からMachine-readable Specification、実DataによるValidationまでを一度通し、実装可能性を確認する**

ことにある。


<a id="113-step-1-対象領域と既存資産の整理"></a>
<a id="113Step1対象領域と既存資産の整理"></a>
## 11.3 Step 1 対象領域と既存資産の整理

<a id="1131-use-caseから対象を選定する"></a>
<a id="1131UseCaseから対象を選定する"></a>
### 11.3.1 Use Caseから対象を選定する

最初に、

> **どのDataを、誰と誰の間で、何のために利用可能にしたいのか**

を明確にする。

例えば、

```text
Facility Data
      │
      ▼
複数System間で交換
      │
      ▼
Map / Search / Analysis / AI等で利用
```

といった具体的なUse Caseを設定する。


<a id="1132-existing-assetを調査する"></a>
<a id="1132ExistingAssetを調査する"></a>
### 11.3.2 Existing Assetを調査する

新しいConceptを作成する前に、

- 国内Standard
- Domain Standard
- Schema.org
- CityGML
- W3C Standard
- ISO Standard
- Existing Code Scheme
- Existing Data Dictionary

等を調査する。

```text
Existing Asset
      │
      ▼
Meaning / Structureを比較
      │
      ├── Reuse
      ├── Reference
      ├── Mapping
      └── 新規定義
```


<a id="1133-step-1の成果物例"></a>
<a id="1133Step1の成果物例"></a>
### 11.3.3 Step 1の成果物例

- Use Case
- Scope
- Existing Standard一覧
- Existing Vocabulary一覧
- Existing Data Model一覧
- Existing Code Scheme一覧
- Concept比較表
- Initial Mapping
- 課題一覧


<a id="114-step-2-pilot-semantic-data-modelの構築"></a>
<a id="114Step2PilotSemanticDataModelの構築"></a>
## 11.4 Step 2 Pilot Semantic Data Modelの構築

<a id="1141-conceptを整理する"></a>
<a id="1141Conceptを整理する"></a>
### 11.4.1 Conceptを整理する

対象Domainに存在する主要ConceptとRelationを整理する。

```text
Facility
   │
   ├── Address
   ├── Equipment
   ├── Organization
   └── Location
```


<a id="1142-umlクラス図を作成する"></a>
<a id="1142UMLクラス図を作成する"></a>
### 11.4.2 UMLクラス図を作成する

Concept整理を基礎として、

- Class
- Attribute
- Relation
- Generalization
- Composition
- 多重度

等をUMLクラス図として整理する。


<a id="1143-vocabularyを整備する"></a>
<a id="1143Vocabularyを整備する"></a>
### 11.4.3 Vocabularyを整備する

ConceptやPropertyについて、

- Identifier
- Label
- Definition
- Relation
- Existing VocabularyとのMapping

等を整理する。


<a id="1144-data-dictionaryを整備する"></a>
<a id="1144DataDictionaryを整備する"></a>
### 11.4.4 Data Dictionaryを整備する

各Data Elementについて、

- 日本語論理名
- 英語論理名
- Definition
- データ型
- 多重度
- Unit
- Value Domain
- Constraint
- Property URI

等を整理する。


<a id="1145-code-schemeを整理する"></a>
<a id="1145CodeSchemeを整理する"></a>
### 11.4.5 Code Schemeを整理する

Existing Codeを優先し、独自Codeが必要な場合には、

- Code
- Label
- Definition
- Scheme
- Version
- Mapping

を管理する。


<a id="1146-step-2の成果物例"></a>
<a id="1146Step2の成果物例"></a>
### 11.4.6 Step 2の成果物例

```text
UML Class Diagram
       +
Vocabulary
       +
Data Dictionary
       +
Code Scheme
       +
Existing Standard Mapping
```

を相互に対応付ける。


<a id="115-step-3-namespace・uriの整備"></a>
<a id="115Step3Namespace・URIの整備"></a>
## 11.5 Step 3 Namespace・URIの整備

<a id="1151-domain-namespaceを設計する"></a>
<a id="1151DomainNamespaceを設計する"></a>
### 11.5.1 Domain Namespaceを設計する

自Domainで管理するConceptやPropertyについてNamespaceを設定する。

併せて、

- Owner
- URI Pattern
- Persistence
- Version
- Deprecation
- Migration

等を定める。


<a id="1152-existing-namespaceを再利用する"></a>
<a id="1152ExistingNamespaceを再利用する"></a>
### 11.5.2 Existing Namespaceを再利用する

Schema.org等のExisting Vocabularyが利用可能な場合には、同じConceptを不用意に再定義せず、そのNamespaceを利用する。

```text
自Domain
   │
   ├── schema:xxx
   ├── Existing Domain URI
   └── {own-namespace}:xxx
```


<a id="1153-uriを参照可能にする"></a>
<a id="1153URIを参照可能にする"></a>
### 11.5.3 URIを参照可能にする

理想的には、

```text
Vocabulary URI
      │
      ▼
Definition
RDFS
Documentation
Mapping
Version
```

へ到達可能にする。


<a id="116-step-4-machine-readable-specificationの整備"></a>
<a id="116Step4MachinereadableSpecificationの整備"></a>
## 11.6 Step 4 Machine-readable Specificationの整備

一つのData Model Definitionから複数の成果物を整備する。

```text
              Data Model Definition
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
      RDFS         JSON Schema    JSON-LD Context
                       │               │
                       ▼               ▼
                 JSON Sample      JSON-LD Sample
```

これらは直列の成熟度ではなく、役割の異なる成果物である。


<a id="1161-rdfs"></a>
<a id="1161RDFS"></a>
### 11.6.1 RDFS

自Domain Vocabularyについて、

- Class
- Property
- Label
- Definition
- subClassOf
- domain
- range

等を機械可読にする。


<a id="1162-json-schema"></a>
<a id="1162JSONSchema"></a>
### 11.6.2 JSON Schema

Data Dictionaryを基礎として、

- Structure
- Datatype
- Required
- Pattern
- Constraint

等を定義する。


<a id="1163-json-sample"></a>
<a id="1163JSONSample"></a>
### 11.6.3 JSON Sample

実際の利用を想定した通常JSON Sampleを提供する。


<a id="1164-json-ld-context"></a>
<a id="1164JSONLDContext"></a>
### 11.6.4 JSON-LD Context

JSON PropertyとVocabulary URIの対応を定義する。


<a id="1165-json-ld-sample"></a>
<a id="1165JSONLDSample"></a>
### 11.6.5 JSON-LD Sample

Contextを適用したSemanticなJSONの利用例を提供する。


<a id="1166-standard-packageの一例"></a>
<a id="1166StandardPackageの一例"></a>
### 11.6.6 Standard Packageの一例

```text
UML Class Diagram
        +
Vocabulary
        +
Data Dictionary
        +
Code Scheme
        +
Namespace / URI
        +
RDFS
        +
JSON Schema
        +
JSON Sample
        +
JSON-LD Context
        +
JSON-LD Sample
```

を一つの実装可能なPackageとして扱うことが考えられる。


<a id="117-step-5-pilot実装・検証"></a>
<a id="117Step5Pilot実装・検証"></a>
## 11.7 Step 5 Pilot実装・検証

<a id="1171-実dataへ適用する"></a>
<a id="1171実Dataへ適用する"></a>
### 11.7.1 実Dataへ適用する

```text
Existing Data
      │
      ▼
Mapping
      │
      ▼
Standard JSON
      │
      ├── JSON Schema Validation
      │
      └── JSON-LD Context
```


<a id="1172-technical-validation"></a>
<a id="1172TechnicalValidation"></a>
### 11.7.2 Technical Validation

例えば、

- JSON Schemaが正しく機能するか
- Context Mappingが正しいか
- URIが解決できるか
- RDFS DefinitionとModelが一致するか
- Code Schemeが利用可能か

を確認する。


<a id="1173-operational-validation"></a>
<a id="1173OperationalValidation"></a>
### 11.7.3 Operational Validation

技術的な正しさだけでなく、

- Data Providerの負担
- Mapping Cost
- System改修量
- Standardの理解難易度
- Maintenance Cost

等も評価する。

> **採用できないほど複雑なStandardは、技術的に正しくても実用的とはいえない。**


<a id="118-step-6-domain展開とsmall-coreの成長"></a>
<a id="118Step6Domain展開とSmallCoreの成長"></a>
## 11.8 Step 6 Domain展開とSmall Coreの成長

<a id="1181-pilotからcommon-patternを抽出する"></a>
<a id="1181PilotからCommonPatternを抽出する"></a>
### 11.8.1 PilotからCommon Patternを抽出する

複数Pilotから、

- Common Concept
- Naming Rule
- Datatype
- Identifier Pattern
- Namespace Pattern
- Schema Pattern
- Context Pattern

等を抽出する。


<a id="1182-small-coreを育てる"></a>
<a id="1182SmallCoreを育てる"></a>
### 11.8.2 Small Coreを育てる

```text
Pilot A ──┐
Pilot B ──┼── Common Concept ──> Small Core
Pilot C ──┘
```

とし、実際に複数Domainで共通利用できることが確認されたConceptをCoreへ追加する。


<a id="1183-coreを巨大化させない"></a>
<a id="1183Coreを巨大化させない"></a>
### 11.8.3 Coreを巨大化させない

Domain固有Conceptを無理にCoreへ移さない。

```text
Small Core
    │
    ├── Domain A
    ├── Domain B
    └── Existing Standard
```

という関係を維持する。


<a id="119-必要に応じたrdf・linked-data等への発展"></a>
<a id="119必要に応じたRDF・LinkedData等への発展"></a>
## 11.9 必要に応じたRDF・Linked Data等への発展

JSON-LD等まで整備されたDataは、必要に応じてRDFとして利用することができる。

しかし、

> **すべてのDataをRDF化することを必須Goalとはしない。**

例えば、

- Cross-dataset Linking
- Knowledge Graph
- Linked Open Data
- Graph Query

等で効果が高い場合に利用する。

高度なOntologyやReasoningが必要な場合にはOWL、RDF Graph Queryが必要な場合にはSPARQLを利用することができる。

これらも初期Standard Packageの必須成果物とはしない。


<a id="1110-参考roadmap全体像"></a>
<a id="1110参考Roadmap全体像"></a>
## 11.10 参考Roadmap全体像

以上の実装例をまとめると、次のようになる。

```text
Step 1
Domain / Use Case / Existing Asset
        │
        ▼
Step 2
UML / Vocabulary / Data Dictionary / Code
        │
        ▼
Step 3
Namespace / URI
        │
        ▼
Step 4
RDFS / JSON Schema / JSON-LD Context / Sample
        │
        ▼
Step 5
Pilot Implementation / Validation
        │
        ▼
Step 6
Domain Expansion / Small Core Growth
        │
        ▼
Optional
RDF / Linked Data / Knowledge Graph
```

より簡潔に表現すると、

```text
小さく始める
     ↓
Meaningを整理する
     ↓
Model化する
     ↓
識別可能にする
     ↓
機械から使えるようにする
     ↓
実Dataで検証する
     ↓
横展開する
     ↓
Common Assetを育てる
```

なお、この順序や工程は固定的なものではなく、一つのReference Processとして位置付ける。


<a id="1111-roadmapを支えるgovernance"></a>
<a id="1111Roadmapを支えるGovernance"></a>
## 11.11 Roadmapを支えるGovernance

<a id="11111-standardは作成後からが運用である"></a>
<a id="11111Standardは作成後からが運用である"></a>
### 11.11.1 Standardは作成後からが運用である

StandardはReleaseした時点で完成するものではない。

- Change Proposal
- Review
- Approval
- Version
- Deprecated
- Migration

等のLifecycleが必要となる。


<a id="11112-coreとdomainで責任を分ける"></a>
<a id="11112CoreとDomainで責任を分ける"></a>
### 11.11.2 CoreとDomainで責任を分ける

```text
                 Small Core
                     │
             Common Governance
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 Domain A         Domain B       Domain C
 Steward          Steward        Steward
```

とする。

Common Foundation側では、

- Design Principle
- Namespace Principle
- Naming Principle
- Mapping Principle
- Version Policy

等を管理し、専門ConceptはDomain Stewardが管理する。


<a id="11113-standard自体をdigital-assetとして管理する"></a>
<a id="11113Standard自体をDigitalAssetとして管理する"></a>
### 11.11.3 Standard自体をDigital Assetとして管理する

```text
Standard Repository
       │
       ├── UML
       ├── Vocabulary
       ├── Data Dictionary
       ├── Code
       ├── RDFS
       ├── JSON Schema
       ├── JSON-LD Context
       ├── Sample
       ├── Mapping
       └── Change History
```

として管理する。

> **Standardを文書として公開するだけでなく、Version管理されたDigital Assetとして運用する。**


<a id="1112-本章のまとめ"></a>
<a id="1112本章のまとめ"></a>
## 11.12 本章のまとめ

本章で示した工程は、日本全体に一律に適用する唯一のRoadmapではない。

Semantic Data Modelを小さな対象領域から実装する場合の、一つのReference Processである。

一方、その背景にある、

> **全国・全分野を先にModel化するのではなく、小さな範囲で実装・Validationまで行い、その実績からCommon Assetを育てる**

という考え方は重要である。

特に、

> **「横に広げる前に、縦に通す」**

ことで、

- Conceptとして妥当か
- Data Structureとして実装可能か
- VocabularyとData Dictionaryが対応しているか
- Namespaceが利用できるか
- JSON SchemaでValidation可能か
- JSON-LD ContextでMeaningを接続できるか
- 実装・運用負担が現実的か

を確認することができる。

したがってRoadmapの目的は、特定技術を順番に導入することではない。

> **SemanticなStandardを、実際に利用・維持・発展可能なData Assetへ変えること**

にある。


---

<a id="第12章-おわりに"></a>
<a id="第12章おわりに"></a>
# 第12章 おわりに

<a id="121-本書のまとめ"></a>
<a id="121本書のまとめ"></a>
## 12.1 本書のまとめ

本書では、日本におけるData Standardizationの現状を踏まえ、AI時代のData DistributionとInteroperabilityを支えるSemantic Data Model Foundationの考え方と、その整備方向を整理した。

本書の出発点は、

> **日本にData Standardが存在しないのではなく、既に存在する多様なStandard、Data Model、Vocabulary、Code Schemeを、分野や組織を越えてどのように接続・再利用可能にするか**

という問題意識である。


<a id="1211-構造の互換性からmeaningのinteroperabilityへ"></a>
<a id="1211構造の互換性からMeaningのInteroperabilityへ"></a>
### 12.1.1 構造の互換性からMeaningのInteroperabilityへ

JSON、CSV、API等によって同じStructureでDataを交換できても、そのMeaningが同じとは限らない。

```text
Same Syntax
    ≠
Same Meaning
```

したがって、これまでのStructureやFormatのStandardizationに加え、

- Concept
- Definition
- Identifier
- Vocabulary
- Mapping

を扱う必要がある。

> **構造の互換性とMeaningの互換性は同じではない。**


<a id="1212-semantic-data-modelは従来modelを否定しない"></a>
<a id="1212SemanticDataModelは従来Modelを否定しない"></a>
### 12.1.2 Semantic Data Modelは従来Modelを否定しない

従来のData Modelにも業務上のMeaningは存在する。

問題は、そのMeaningが特定System、Document、人間の理解の中に閉じている場合があることである。

Semantic Data Modelでは、

```text
Local / Contextual Meaning
           │
           ▼
Explicit Definition
           │
           ▼
Identifier / Namespace
           │
           ▼
Machine-referenceable Meaning
```

へ発展させる。

したがってSemantic Data Modelは、従来のConceptual / Logical Data Modelを置き換えるものではない。

> **Existing Modelが持つMeaningを、組織やSystemを越えて識別・参照・Mapping可能にする**

ことが重要である。


<a id="1213-meaningのstandardizationは一つに統一することではない"></a>
<a id="1213MeaningのStandardizationは一つに統一することではない"></a>
### 12.1.3 MeaningのStandardizationは一つに統一することではない

同じ「人口」という言葉でも、

- 国勢調査人口
- 住民基本台帳人口
- 推計人口
- 昼間人口
- 夜間人口

等、異なるConceptが存在する。

これらを一つへ統合すると、重要なMeaningの違いが失われる。

したがって、

> **SemanticなStandardizationとは、Meaningの違いをなくすことではなく、その違いとRelationを明示すること**

である。


<a id="1214-existing-assetを活用する"></a>
<a id="1214ExistingAssetを活用する"></a>
### 12.1.4 Existing Assetを活用する

日本には既に、

- 国内Standard
- Classification
- Code Scheme
- IMI
- GIF
- Domain Standard
- Base Registry関連Data

等の資産が存在する。

また国際的にも、

- Schema.org
- CityGML
- W3C Standard
- その他Domain Standard

等が利用可能である。

本書は、これらを否定してすべて新しく作り直すことを目的とはしない。

```text
Existing Asset
      │
      ├── Reuse
      ├── Reference
      └── Mapping
              │
              ▼
Semantic Data Model Foundation
```

として利用する。

また、本提言で必要とする機能をExisting Foundationの拡張で実現するか、新しいFoundationとして構築するかについても先に固定しない。

> **必要なSemantic Interoperabilityを実現できることを優先する。**


<a id="1215-vocabularyとdata-dictionaryを接続する"></a>
<a id="1215VocabularyとDataDictionaryを接続する"></a>
### 12.1.5 VocabularyとData Dictionaryを接続する

本書では、

> **VocabularyはMeaningの辞書、Data DictionaryはData Elementの辞書**

として区別した。

```text
Vocabulary
    │
    │ Concept / Property URI
    ▼
Data Dictionary
    │
    ▼
Data
```

という形で両者を接続する。

これによって、Data Elementの名称や実装が変化しても、その背後のMeaningを維持しやすくなる。


<a id="1216-namespaceがsemantic-foundationを支える"></a>
<a id="1216NamespaceがSemanticFoundationを支える"></a>
### 12.1.6 NamespaceがSemantic Foundationを支える

NamespaceとURIによって、

- Conceptを一意に識別する
- Propertyを識別する
- Definitionへ到達する
- Existing Vocabularyを共存させる
- Mappingを共有する
- Management Responsibilityを明確にする

ことができる。

```text
JSON Property
      │
      ▼
JSON-LD Context
      │
      ▼
Vocabulary URI
      │
      ▼
Definition / RDFS / Mapping
```

という仕組みを整備することで、一般DeveloperがNamespaceやRDFを直接意識しなくても、その恩恵を利用できる状態を目指す。


<a id="1217-standardを利用できるpackageにする"></a>
<a id="1217Standardを利用できるPackageにする"></a>
### 12.1.7 Standardを「利用できるPackage」にする

UMLクラス図やPDF Specificationだけでは、実装までの距離が大きい。

本書では、

```text
UML Class Diagram
        +
Vocabulary
        +
Data Dictionary
        +
Code Scheme
        +
Namespace / URI
        +
RDFS
        +
JSON Schema
        +
JSON Sample
        +
JSON-LD Context
        +
JSON-LD Sample
```

を一体的なStandard Packageとして提供することを提案した。

重要なのは、

```text
Standardを理解する
       ↓
各利用者が実装方法を考える
```

という状態から、

```text
Standardを参照する
       ↓
直接実装・Validationへ利用する
```

状態へ近づけることである。


<a id="1218-ai時代にsemantic-standardが持つmeaning"></a>
<a id="1218AI時代にSemanticStandardが持つMeaning"></a>
### 12.1.8 AI時代にSemantic Standardが持つMeaning

Semantic WebやOntologyの考え方は、生成AIによって初めて生まれたものではない。

一方、AIがData利用主体となり始めたことで、

> **Meaningを機械から参照可能にしておく価値**

はさらに高まっている。

AIはMeaningを推測できる。

しかし、

> **推測できることと、Definitionを確認できることは異なる。**

Semantic Data ModelはAIへ答えを与える仕組みではない。

AI、人間、Systemが同じMeaningへ到達するための共通基盤である。


<a id="1219-small-coreを実利用から育てる"></a>
<a id="1219SmallCoreを実利用から育てる"></a>
### 12.1.9 Small Coreを実利用から育てる

最初から巨大なCommon Modelを作るのではなく、

```text
Pilot A ──┐
Pilot B ──┼── Common Concept ──> Small Core
Pilot C ──┘
```

として、実際に複数Domainから利用されたConceptをCoreへ取り込む。

> **Coreは完成品ではなく、実利用によって成長するFoundation**

として扱う。


<a id="122-semantic-data-foundationによって期待される将来像"></a>
<a id="122SemanticDataFoundationによって期待される将来像"></a>
## 12.2 Semantic Data Foundationによって期待される将来像

ここで示す将来像は、直ちにすべて実現可能であることを前提とするものではない。

本書で提案したSemantic Data Foundationが長期的に整備・利用された場合に、

> **Dataを利用する社会がどのように変化し得るか**

という理想的な方向を示すものである。


<a id="1221-meaningやmappingを再利用できる社会"></a>
<a id="1221MeaningやMappingを再利用できる社会"></a>
### 12.2.1 MeaningやMappingを再利用できる社会

現在、異なるDataを利用する際には、

```text
Data取得
   ↓
Specification確認
   ↓
Meaning確認
   ↓
Code確認
   ↓
Mapping
   ↓
Integration
```

という作業が繰り返される。

Dataそのものは再利用されても、

> **Dataを理解するために行った調査やMappingが、別Projectで再び作り直される**

場合がある。

Semantic Foundationによって、

```text
Data
 │
 ├── Data Dictionary
 ├── Concept URI
 ├── Vocabulary
 ├── Code Scheme
 └── Mapping
        │
        ▼
      Reuse
```

という構造が形成されれば、

> **Dataだけでなく、Meaning、Definition、Code、Mappingそのものを共有資産として再利用する**

ことが可能になる。

これは、Data利用のたびに同じMeaningを調査し直す社会から、

> **一度整理したMeaningを社会全体で再利用する社会**

への変化である。


<a id="1222-data-discoveryから利用までの時間を短縮する"></a>
<a id="1222DataDiscoveryから利用までの時間を短縮する"></a>
### 12.2.2 Data Discoveryから利用までの時間を短縮する

現在のData Catalogでは、

- Dataset Name
- Publisher
- Keyword
- File Format

等からDataを発見することができる。

しかし、発見したDatasetが本当に必要なMeaningを持っているかを判断するには、SpecificationやData Definitionを読む必要がある場合が多い。

Semantic FoundationとData Catalogが接続されれば、

```text
Concept
   │
   ▼
Definition
   │
   ▼
Related Dataset
   │
   ▼
Data Dictionary
   │
   ▼
Schema / API / Distribution
```

という経路を提供できる。

これにより、

> **Dataを「見つける」ことから、Dataを「理解し、利用する」ことまでの距離を短縮する**

ことが期待される。


<a id="1223-組織・system間連携の負担を軽減する"></a>
<a id="1223組織・System間連携の負担を軽減する"></a>
### 12.2.3 組織・System間連携の負担を軽減する

現在のData Integrationでは、

```text
System A ── Mapping ── System B
System A ── Mapping ── System C
System B ── Mapping ── System C
System C ── Mapping ── System D
```

のような個別Mappingが多数作成される。

Semantic Foundationが存在すれば、

```text
                  Shared Concepts
                       ▲
             ┌─────────┼─────────┐
             │         │         │
          System A  System B  System C
                       │
                    System D
```

のように、各Systemから共通ConceptへMappingする方法を利用できる。

すべての個別変換が不要になるわけではない。

しかし、

> **一度確認されたSemantic Mappingを共有資産として利用できる**

ようになれば、組織やSystemを越えたData Integrationの負担を減らせる可能性がある。


<a id="1224-domainの専門性を残したままdataを接続する"></a>
<a id="1224Domainの専門性を残したままDataを接続する"></a>
### 12.2.4 Domainの専門性を残したままDataを接続する

社会全体のDataを一つの巨大Modelへ統一すると、Domain固有のMeaningや制度上の違いが失われる可能性がある。

本書では、

```text
Statistics Model
       │
       ├── Mapping
       │
Common Concept
       │
       ├── Mapping
       │
City Model
```

のように、各Domain Modelを維持しながらCommon Conceptを通じて接続する。

これによって、

> **専門性を保持したままInteroperabilityを確保する**

ことを目指す。

Data StandardizationによってDomainの違いを消すのではなく、

> **違いを明示したまま接続できる社会**

を形成する。


<a id="1225-standardそのものがsystem-developmentの部品になる"></a>
<a id="1225StandardそのものがSystemDevelopmentの部品になる"></a>
### 12.2.5 StandardそのものがSystem Developmentの部品になる

従来、Standardは、

```text
Standard
   ↓
PDF / Document
   ↓
Humanが読む
   ↓
Systemへ実装
```

という形で利用されることが多かった。

Standardそのものが、

- JSON Schema
- RDFS
- JSON-LD Context
- Code List
- Sample
- Mapping

等のMachine-readableな資産になれば、

```text
                 Standard
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
       IDE       Validator     API
        │           │           │
        └───────────┼───────────┘
                    ▼
                 System
```

のように、StandardをSoftware Developmentの部品として直接利用できる。

> **Standardが読むためのDocumentから、利用するためのDigital Assetへ変わる**

ことが期待される。


<a id="1226-aiがmeaningを確認できるdata環境"></a>
<a id="1226AIがMeaningを確認できるData環境"></a>
### 12.2.6 AIがMeaningを確認できるData環境

Semantic Foundationがない環境では、

```text
AI
 ↓
Property Name
 ↓
Context
 ↓
Meaningを推測
```

という利用になりやすい。

一方、

```text
AI
 ↓
Property URI
 ↓
Vocabulary
 ↓
Definition / Mapping / Source
 ↓
判断
```

という環境があれば、AIはMeaningを毎回推測するだけでなく、Definitionへ到達できる。

これはAIの回答が常に正しくなることを意味しない。

しかし、

> **AIが何を根拠にDataを解釈すべきかを確認できる環境**

を提供することができる。

人間とAIで別々のMeaning体系を持つのではなく、

> **Human、System、AIが同じStandardを参照する**

ことが理想となる。


<a id="1227-新しいdata-serviceで共通資産を再利用する"></a>
<a id="1227新しいDataServiceで共通資産を再利用する"></a>
### 12.2.7 新しいData Serviceで共通資産を再利用する

新しいServiceやAnalysisを構築するたびに、

- Data Model
- Definition
- Code
- Mapping
- Schema

を一から作成すると、多くのCostが重複する。

Semantic Foundationによって、

```text
             Shared Data Assets
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    Service A    Service B    Analysis
                    │
                    ▼
                    AI
```

のように共通資産を再利用できれば、新しいData Serviceを構築する際の初期整備負担を減らせる可能性がある。

これは、

> **データ整備を、個別プロジェクトごとに完結するコストから、複数のサービスで再利用可能な基盤投資へ近づける**

ことでもある。


<a id="1228-data-standardizationによって期待される社会的効果"></a>
<a id="1228DataStandardizationによって期待される社会的効果"></a>
### 12.2.8 Data Standardizationによって期待される社会的効果

以上を整理すると、Semantic Data Foundationによって期待される効果は、

```text
Meaning確認の重複削減
          +
Mappingの再利用
          +
Data Discoveryの効率化
          +
System Integration負担の軽減
          +
StandardのMachine-readable化
          +
AI・Systemからの利用
          │
          ▼
Dataを利用可能にするまでのCostと時間の削減
```

と整理できる。

その結果として、

- 新しい行政Service
- 民間Service
- Research
- Cross-domain Analysis
- Policy Making
- AI Application

等へDataをつなぐまでの時間を短縮できる可能性がある。

つまり、Semantic Data Modelの価値は、単なるIT Standardizationにとどまらない。

> **社会に存在するData Assetを、より低いCostで繰り返し利用可能にするためのInfrastructure**

として捉えることができる。


<a id="1229-最終的に目指す社会像"></a>
<a id="1229最終的に目指す社会像"></a>
### 12.2.9 最終的に目指す社会像

本書が最終的に目指すものは、

- RDFを普及させること
- JSON-LDを普及させること
- Ontologyを巨大化させること
- 日本中のDataを一つのModelへ統一すること

ではない。

目指すのは、

> **Dataの利用者が行政、企業、研究者、Developer、System、AIのいずれであっても、DataのMeaningを一から読み解き直すことなく、必要なDefinitionへ到達し、既存Data Assetを再利用できる状態**

である。

```text
                 Japan's Data Assets
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
 Administration       Statistics        Geography
       │                 │                 │
    Health            Industry          Private
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                Semantic Foundation
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
        Small Core    Vocabulary    Identifier
           │             │             │
           └─────────────┼─────────────┘
                         ▼
                Machine-readable
                    Standards
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
            API       Open Data      AI
             │           │           │
             └───────────┼───────────┘
                         ▼
                 Cross-domain Use
```

この構造の中心にあるのはTechnologyではない。

中心にあるのは、

> **DataのMeaningを共有・確認できること**

である。

その結果として、個々の組織が繰り返してきた、

- Data Definition
- Meaning確認
- Code変換
- Mapping
- Data Integration

等を可能な範囲で共有資産へ変え、

> **社会全体でDataを再利用するCostを下げ、新しいAnalysis、Service、Policy、AI利用へDataをより早くつなげられる状態**

を目指す。

Semantic Data ModelのStandardizationは、そのための最終目的ではない。

それは、

> **日本に存在する多様なData Assetを、Meaningを失うことなく接続し、継続的に流通・再利用できる社会基盤へ発展させるための手段**

として位置付けるべきである。

<a id="付録a-用語集"></a>
<a id="付録A用語集"></a>
# 付録A 用語集

本付録では、本書で使用する主要な用語について、本書における意味と位置付けを整理する。

ここで示す説明は、各標準や学術分野における厳密な定義をすべて置き換えるものではない。

本書を読む上で、各用語をどのような意味で使用しているかを明確にすることを目的とする。

---

<a id="a1-data-modelデータモデル"></a>
<a id="A1DataModelデータモデル"></a>
## A.1 Data Model（データモデル）

Data Model（データモデル）とは、

> **現実世界の何をデータとして捉え、どのような構造と関係で表現するかを定義するモデル**

である。

主として、

- Entity（エンティティ）
- Attribute（属性）
- Relationship（関係）
- Identifier（識別子）
- Constraint（制約）
- Datatype（データ型）
- Cardinality（多重度）

等を扱う。

本書では、Conceptual Data Model（概念データモデル）およびLogical Data Model（論理データモデル）を標準データモデルの主な対象とし、Physical Data Model（物理データモデル）は各System（システム）やService（サービス）の実装主体が設計するものとする。

---

<a id="a2-semantic-data-modelセマンティックデータモデル"></a>
<a id="A2SemanticDataModelセマンティックデータモデル"></a>
## A.2 Semantic Data Model（セマンティックデータモデル）

本書では、Semantic Data Model（セマンティックデータモデル）を、

> **データの構造だけではなく、データが表すConcept（概念）、Definition（定義）、Identifier（識別子）、Concept間のRelation（関係）、他のModel（モデル）とのMapping（対応付け）等を明示的に扱うデータモデル**

と定義する。

従来のData Model（データモデル）を置き換えるものではなく、

```text
Data Structure（データ構造）
        +
Semantic Information（意味情報）
```

として捉える。

Semantic Information（意味情報）には、例えば、

- Concept（概念）
- Definition（定義）
- Identifier（識別子）
- Namespace（名前空間）
- Relation（関係）
- Vocabulary（語彙）
- Mapping（対応付け）

等が含まれる。

---

<a id="a3-concept概念"></a>
<a id="A3Concept概念"></a>
## A.3 Concept（概念）

Concept（概念）とは、人、組織、施設、地域、人口等、

> **データが表そうとしている意味上の対象または概念**

である。

例えば、

```text
population
```

というData Element（データ項目）と、

```text
国勢調査人口
```

というConcept（概念）は必ずしも同じものではない。

複数のData Element（データ項目）が同じConcept（概念）を表す場合もあれば、同じData Element名が異なるConcept（概念）を表す場合もある。

---

<a id="a4-classクラス"></a>
<a id="A4Classクラス"></a>
## A.4 Class（クラス）

Class（クラス）とは、Concept（概念）をData Model（データモデル）上で構造化して表現するための単位である。

例えば、

```text
Facility
Person
Organization
PostalAddress
```

等をClass（クラス）として定義することができる。

本書では、Concept（概念）とClass（クラス）は密接に関係するが、完全に同一のものとは限らないものとして扱う。

Concept（概念）は意味上の対象を表し、Class（クラス）はそのConceptをData Model上で表現するための構造である。

---

<a id="a5-propertyプロパティ"></a>
<a id="A5Propertyプロパティ"></a>
## A.5 Property（プロパティ）

Property（プロパティ）とは、Class（クラス）が持つAttribute（属性）や、他のClass（クラス）とのRelation（関係）を表すものである。

例えば、

```text
Facility
  ├── facilityId
  ├── facilityType
  ├── name
  └── hasAddress
```

における、

```text
facilityId
facilityType
name
hasAddress
```

がProperty（プロパティ）に相当する。

本書では、Property（プロパティ）の英語論理名は原則として**lowerCamelCase**とする。

---

<a id="a6-identifier識別子"></a>
<a id="A6Identifier識別子"></a>
## A.6 Identifier（識別子）

Identifier（識別子）とは、Concept（概念）、Resource（リソース）、Data Element（データ項目）等を他の対象と区別して識別するための情報である。

本書では、

- Concept Identifier（概念識別子）
- Property Identifier（プロパティ識別子）
- Resource Identifier（リソース識別子）
- Code Identifier（コード識別子）

等を区別して扱う。

Semantic Data Model（セマンティックデータモデル）では、Concept（概念）やProperty（プロパティ）について、名称だけではなく安定したIdentifierを持たせることを重視する。

---

<a id="a7-core-modelコアモデル-common-core共通コア"></a>
<a id="A7CoreModelコアモデルCommonCore共通コア"></a>
## A.7 Core Model（コアモデル） / Common Core（共通コア）

Core Model（コアモデル）とは、複数のDomain（分野）で共通して利用される基本的なConcept（概念）を定義するModel（モデル）である。

本書では、

> **必要最小限で、安定し、複数Domainから実際に再利用されるConcept**

を中心とするSmall Common Core（小規模な共通コア）を想定する。

また、Common Core（共通コア）をすべて新しく設計することを原則とはしない。

GIF等のExisting Core Model（既存コアモデル）に利用可能なConcept（概念）やStructure（構造）が存在する場合には、それを優先的にReuse（再利用）する。

---

<a id="a8-domain-modelドメインモデル"></a>
<a id="A8DomainModelドメインモデル"></a>
## A.8 Domain Model（ドメインモデル）

Domain Model（ドメインモデル）とは、行政、統計、医療、地理空間、Smart City（スマートシティ）等、

> **特定の専門領域で必要となるConcept（概念）、Property（プロパティ）、Relation（関係）等を表現するModel**

である。

Domain固有の専門性はDomain Modelで維持し、Common Core（共通コア）へ無理に統合しない。

```text
              Common Core
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Domain A    Domain B    Domain C
```

---

<a id="a9-vocabulary語彙"></a>
<a id="A9Vocabulary語彙"></a>
## A.9 Vocabulary（語彙）

Vocabulary（語彙）とは、

> **Concept（概念）やProperty（プロパティ）について、Identifier（識別子）、Label（名称）、Definition（定義）、Relation（関係）等を定義し、複数のData ModelやDatasetから参照可能にする意味上の資産**

である。

本書では簡潔に、

> **Vocabularyは「意味の辞書」**

と位置付ける。

例えば、

```text
Concept
  Facility

Identifier
  {namespace}:Facility

Preferred Label
  施設

English Label
  Facility

Definition
  ...
```

のように管理する。

---

<a id="a10-data-dictionaryデータ辞書"></a>
<a id="A10DataDictionaryデータ辞書"></a>
## A.10 Data Dictionary（データ辞書）

Data Dictionary（データ辞書）とは、

> **特定のData ModelやDatasetで使用するData Element（データ項目）について、名称、Definition（定義）、Datatype（データ型）、Cardinality（多重度）、Unit（単位）、Value Domain（値領域）、Constraint（制約）等を定義する資産**

である。

本書では、

> **Data Dictionaryは「データ項目の辞書」**

と位置付ける。

Vocabulary（語彙）とData Dictionary（データ辞書）は異なる役割を持つが、

```text
Vocabulary
    │
    │ Concept / Property URI
    ▼
Data Dictionary
    │
    ▼
Data
```

として接続する。

---

<a id="a11-data-elementデータ項目"></a>
<a id="A11DataElementデータ項目"></a>
## A.11 Data Element（データ項目）

Data Element（データ項目）とは、Data Model（データモデル）やDataset（データセット）の中で具体的に利用されるデータ項目である。

例えば、

```text
日本語論理名
  施設種別

英語論理名
  facilityType

Datatype
  Code

Cardinality
  0..1

Value Domain
  FacilityType
```

等によって定義する。

本書では、Data Element（データ項目）の英語論理名は原則として**lowerCamelCase**とする。

Data Elementが何を意味するかについては、Vocabulary（語彙）上のConcept（概念）またはProperty（プロパティ）と対応付ける。

---

<a id="a12-data-element-conceptデータ項目概念"></a>
<a id="A12DataElementConceptデータ項目概念"></a>
## A.12 Data Element Concept（データ項目概念）

Data Element Concept（データ項目概念）とは、

> **Data Element（データ項目）が表す意味を、具体的なRepresentation（表現）から分離して捉えるための概念**

である。

本書ではISO/IEC 11179の考え方を参照し、

```text
Concept
   │
   ▼
Data Element Concept
   │
   ▼
Data Element
   │
   ├── Representation
   └── Value Domain
```

のように、Concept（概念）とData Element（データ項目）の具体的な表現を分離して考える。

---

<a id="a13-value-domain値領域"></a>
<a id="A13ValueDomain値領域"></a>
## A.13 Value Domain（値領域）

Value Domain（値領域）とは、

> **Data Element（データ項目）で許容される値の集合や範囲**

である。

例えば、

- Code List（コードリスト）
- 許容値の集合
- 数値範囲
- Classification（分類）に基づく値集合

等がValue Domainとして考えられる。

Datatype（データ型）そのものとは区別する。

---

<a id="a14-code-schemeコード体系"></a>
<a id="A14CodeSchemeコード体系"></a>
## A.14 Code Scheme（コード体系）

Code Scheme（コード体系）とは、一定の目的や分類基準に基づいてCode（コード）を管理する体系である。

例えば、

```text
FacilityType
  ├── park
  ├── library
  └── school
```

のように整理することができる。

Code（コード）そのものと、それが表すConcept（概念）は区別して管理する。

---

<a id="a15-mapping対応付け"></a>
<a id="A15Mapping対応付け"></a>
## A.15 Mapping（対応付け）

Mapping（対応付け）とは、

> **異なるConcept（概念）、Vocabulary（語彙）、Data Model（データモデル）、Data Element（データ項目）等の間に存在する対応関係を明示すること**

である。

```text
Model A
   │
   │ Mapping
   ▼
Model B
```

Mappingは、異なるStandard（標準）を一つへ統合することとは異なる。

意味の違いを維持したまま、そのRelation（関係）を記述することが重要である。

---

<a id="a16-ontologyオントロジー"></a>
<a id="A16Ontologyオントロジー"></a>
## A.16 Ontology（オントロジー）

Ontology（オントロジー）とは、

> **ある領域に存在するConcept（概念）と、それらのRelation（関係）やConstraint（制約）等を体系的に表現するKnowledge Model（知識モデル）**

である。

Semantic Data Model（セマンティックデータモデル）と重なる部分を持つが、両者を単純な上下関係として捉えない。

本書では、Ontologyそのものを大規模に構築することを目的とはせず、必要に応じてOntologyで整理されたSemantic Asset（意味資産）をSemantic Data Modelから利用する。

---

<a id="a17-taxonomyタクソノミー"></a>
<a id="A17Taxonomyタクソノミー"></a>
## A.17 Taxonomy（タクソノミー）

Taxonomy（タクソノミー）とは、主としてConcept（概念）や対象を分類・階層化する体系である。

例えば、

```text
Facility
   ├── EducationalFacility
   ├── MedicalFacility
   └── PublicFacility
```

のような分類を表現する。

Taxonomy、Thesaurus、Ontologyは、それぞれ異なる学術的・実務的背景を持つため、単純な成熟度の段階とは考えない。

---

<a id="a18-thesaurusシソーラス"></a>
<a id="A18Thesaurusシソーラス"></a>
## A.18 Thesaurus（シソーラス）

Thesaurus（シソーラス）とは、情報検索や語彙統制等で利用される語彙体系であり、

- Preferred Term（優先語）
- Alternative Term（代替語）
- Broader Term（上位語）
- Narrower Term（下位語）
- Related Term（関連語）

等のRelation（関係）を扱う。

Taxonomy（タクソノミー）と重なる部分を持つが、同義語や関連語等も扱う点に特徴がある。

---

<a id="a19-rdfresource-description-framework"></a>
<a id="A19RDFResourceDescriptionFramework"></a>
## A.19 RDF（Resource Description Framework）

RDF（Resource Description Framework）は、

> **Resource（リソース）とRelation（関係）をGraph（グラフ）として表現するためのData Model**

である。

基本的な表現単位はTriple（トリプル）であり、

- Subject（主語）
- Predicate（述語）
- Object（目的語）

から構成される。

```text
Person A
   ── memberOf ──>
Organization B
```

---

<a id="a20-rdfsrdf-schema"></a>
<a id="A20RDFSRDFSchema"></a>
## A.20 RDFS（RDF Schema）

RDFS（RDF Schema）は、RDFで利用する、

- Class（クラス）
- Property（プロパティ）
- subClassOf
- subPropertyOf
- domain
- range
- label
- comment

等を定義するためのVocabulary（語彙）である。

本書では、

> **Vocabulary、Class、Property、基本的な意味関係を機械可読に公開するための基本的な表現**

として利用する。

---

<a id="a21-owlweb-ontology-language"></a>
<a id="A21OWLWebOntologyLanguage"></a>
## A.21 OWL（Web Ontology Language）

OWL（Web Ontology Language）は、RDFSよりも高度なOntology（オントロジー）や論理的Relation（関係）、Constraint（制約）等を表現するためのLanguage（言語）である。

本書では初期Standard Package（標準パッケージ）の必須要件とはせず、高度なOntologyやReasoning（推論）が必要なUse Case（利用目的）で選択的に利用する。

---

<a id="a22-skossimple-knowledge-organization-system"></a>
<a id="A22SKOSSimpleKnowledgeOrganizationSystem"></a>
## A.22 SKOS（Simple Knowledge Organization System）

SKOS（Simple Knowledge Organization System）は、

- Classification（分類）
- Taxonomy（タクソノミー）
- Thesaurus（シソーラス）
- Concept Scheme（概念体系）

等を機械可読に表現するために利用できる。

例えば、

- prefLabel
- altLabel
- notation
- broader
- narrower
- related

等を表現できる。

---

<a id="a23-json-schemajsonスキーマ"></a>
<a id="A23JSONSchemaJSONスキーマ"></a>
## A.23 JSON Schema（JSONスキーマ）

JSON Schema（JSONスキーマ）は、

> **JSON DataのStructure（構造）とValidation Rule（検証規則）を定義するためのSchema**

である。

例えば、

- Property（プロパティ）
- Datatype（データ型）
- Required（必須）
- Pattern（形式）
- Array（配列）
- Constraint（制約）

等を定義する。

本書では、

```text
JSON Schema
  → Structure / Validation

Vocabulary / RDFS
  → Meaning / Semantic Definition
```

として役割を分離する。

---

<a id="a24-json-ld"></a>
<a id="A24JSONLD"></a>
## A.24 JSON-LD

JSON-LDは、

> **JSON文書上のKey（キー）をIRIへ対応付け、必要に応じて値のIRI解釈や型情報を定義することで、JSONをRDF Data Modelとして解釈可能にする仕組み**

である。

一般のDeveloper（開発者）にRDF Tripleの直接記述を要求せず、通常のJSONに近い形式からSemantic Identifier（意味上の識別子）へ接続できる。

---

<a id="a25-json-ld-contextjson-ldコンテキスト"></a>
<a id="A25JSONLDContextJSONLDコンテキスト"></a>
## A.25 JSON-LD Context（JSON-LDコンテキスト）

JSON-LD Context（JSON-LDコンテキスト）は、

> **JSON上で利用するTerm（用語）とIRIとのMapping（対応付け）を定義するもの**

である。

```text
JSON Property
      │
      ▼
JSON-LD Context
      │
      ▼
Vocabulary URI
      │
      ▼
RDFS Definition
```

---

<a id="a26-uri-iri識別子"></a>
<a id="A26URIIRI識別子"></a>
## A.26 URI / IRI（識別子）

URI / IRIは、Resource（リソース）やConcept（概念）等を識別するために利用するIdentifier（識別子）である。

本書では特に、

- Concept（概念）
- Class（クラス）
- Property（プロパティ）
- Code Concept（コード概念）
- Resource（リソース）

等を安定して識別するために利用する。

---

<a id="a27-namespace名前空間"></a>
<a id="A27Namespace名前空間"></a>
## A.27 Namespace（名前空間）

Namespace（名前空間）とは、

> **Identifier（識別子）や名称の衝突を避け、それらが属する名前空間を識別するための仕組み**

である。

本書ではこれに加え、Domain（分野）ごとのVocabulary（語彙）やSemantic Resource（意味資産）の管理責任を明確にするため、

> **NamespaceをGovernance（ガバナンス）の単位としても扱う**

ことを基本方針とする。

---

<a id="a28-linked-dataリンクトデータ"></a>
<a id="A28LinkedDataリンクトデータ"></a>
## A.28 Linked Data（リンクトデータ）

Linked Data（リンクトデータ）とは、URI / IRI等を利用してWeb上のResource（リソース）を識別・公開し、異なるDataを相互に接続する考え方である。

本書ではLinked DataをすべてのData Standard（データ標準）の必須Goal（目標）とはせず、必要なUse Caseで選択的に利用する。

---

<a id="a29-metadata-registryメタデータレジストリ"></a>
<a id="A29MetadataRegistryメタデータレジストリ"></a>
## A.29 Metadata Registry（メタデータレジストリ）

Metadata Registry（メタデータレジストリ）とは、Data Element（データ項目）、Concept（概念）、Value Domain（値領域）等のMetadata（メタデータ）を登録・管理する仕組みである。

本書では、Data Dictionary（データ辞書）やData Elementの管理についてISO/IEC 11179シリーズの考え方を参照する。

---

<a id="a30-data-spaceデータスペース"></a>
<a id="A30DataSpaceデータスペース"></a>
## A.30 Data Space（データスペース）

Data Space（データスペース）とは、

> **異なる組織が一定のRule（規則）やGovernance（ガバナンス）の下でDataを共有・流通・利用するための環境**

である。

Semantic Data Model（セマンティックデータモデル）は、その中でMeaning Interoperability（意味の相互運用性）を支える一つのFoundation（基盤）として位置付けられる。

---

<a id="付録b-国内・海外の主要標準・取り組み"></a>
<a id="付録B国内・海外の主要標準・取り組み"></a>
# 付録B 国内・海外の主要標準・取り組み

<a id="b1-本付録の位置付け"></a>
<a id="B1本付録の位置付け"></a>
## B.1 本付録の位置付け

本付録では、本書で参照した国内外の主要なStandard（標準）、Framework（フレームワーク）、Vocabulary（語彙）等について、その役割と本書との関係を整理する。

これらは同じ目的を持つStandardではない。

```text
Classification（分類）
Data Model（データモデル）
Vocabulary（語彙）
Metadata（メタデータ）
Data Exchange（データ交換）
Semantic Technology（セマンティック技術）
Governance（ガバナンス）
```

等、それぞれ異なる役割を持つ。

したがって、

> **どのStandardが最も優れているかを比較するのではなく、どの役割で利用できるか**

という観点から整理する。

---

<a id="b2-国内の主要standard標準・取り組み"></a>
<a id="B2国内の主要Standard標準・取り組み"></a>
## B.2 国内の主要Standard（標準）・取り組み

| Standard / 取り組み | 主な役割 | 本書との関係 |
|---|---|---|
| JIS | 国内の各種Standardを規定 | Existing Standard（既存標準）としてReuse / Reference対象 |
| 日本標準産業分類 | 産業のClassification（分類） | Domain Classification / Code Schemeとして利用 |
| 日本標準職業分類 | 職業のClassification（分類） | Domain Classification / Code Schemeとして利用 |
| ベース・レジストリ | 社会の基本情報となる公的Dataの整備 | Identifier・基本Data Assetとの接続対象 |
| IMI | 共通Vocabulary（語彙）やData Modelに関する既存資産 | 利用可能なConceptやVocabularyをReuse |
| 政府相互運用性フレームワーク（GIF） | 相互運用性のためのCore Data Model、Implementation Data Model等 | Common Coreを含むExisting Data ModelとしてReuse |

---

<a id="b3-日本標準産業分類・日本標準職業分類"></a>
<a id="B3日本標準産業分類・日本標準職業分類"></a>
## B.3 日本標準産業分類・日本標準職業分類

日本標準産業分類や日本標準職業分類は、Domain（分野）で共通利用されるClassification（分類）の例である。

Semantic Data Model（セマンティックデータモデル）では、これらのClassificationを必ず独自体系へ置き換える必要はない。

```text
Semantic Data Model
       │
       ▼
Existing Classification
       │
       ├── Code
       ├── Label
       └── Concept
```

として参照する。

必要に応じて、Classification間のRelation（関係）やMapping（対応付け）を管理する。

---

<a id="b4-ベース・レジストリ"></a>
<a id="B4ベース・レジストリ"></a>
## B.4 ベース・レジストリ

ベース・レジストリは、人、法人、土地、住所等、社会の基本となる情報を扱うData Asset（データ資産）として本書と関係する。

Semantic Data Model Foundation（セマンティックデータモデル基盤）では、ベース・レジストリそのものを置き換えるのではなく、

- Identifier（識別子）
- Concept（概念）
- Data Dictionary（データ辞書）
- Dataset Metadata（データセットメタデータ）
- Mapping（対応付け）

等を通じて接続することが考えられる。

---

<a id="b5-imi"></a>
<a id="B5IMI"></a>
## B.5 IMI

IMIは、行政等における情報共有やData Exchange（データ交換）で利用するVocabulary（語彙）やData Model（データモデル）の既存資産として位置付ける。

IMIでは、分野を越えて利用するCore Vocabulary（コア語彙）と、Domain（分野）ごとのVocabulary（語彙）等が整理されている。

本書では、

> **Existing Asset（既存資産）を可能な限りReuse（再利用）する**

という立場を取る。

利用可能なConcept（概念）、Property（プロパティ）、Vocabulary（語彙）等については、IMIを含むExisting Assetを調査した上で利用する。

したがって、

> **必要な要件を既存資産の利用または拡張によって満たせる場合には、それを利用することも選択肢となる。**

---

<a id="b6-政府相互運用性フレームワークgif"></a>
<a id="B6政府相互運用性フレームワークGIF"></a>
## B.6 政府相互運用性フレームワーク（GIF）

政府相互運用性フレームワーク（GIF）は、政府情報システムにおけるInteroperability（相互運用性）を支える既存のFramework（フレームワーク）である。

GIFでは、

- Implementation Data Model（実装データモデル）
- Core Data Model（コアデータモデル）
- Core Data Parts（コアデータパーツ）

等が提供されている。

本書では、IMIと同様に、

> **既に利用可能なData Model（データモデル）やVocabulary（語彙）等については、可能な限りExisting Asset（既存資産）を利用する**

という立場を取る。

特に、本書で想定するCommon Core（共通コア）については、原則としてすべてを新しく設計するのではなく、GIFに存在するCore Data Model（コアデータモデル）から利用可能なConcept（概念）やStructure（構造）を優先して利用する。

```text
        GIF Core Data Model
                 │
                 │ Reuse
                 ▼
          Common Core候補
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
     Domain A Domain B Domain C
```

また、GIFのCore Data Model（コアデータモデル）とIMIのVocabulary（語彙）にはRelation（関係）がある。

```text
IMI Core Vocabulary
        │
        ▼
Core Data Model Vocabulary
        │
        ▼
GIF Core Data Model
```

したがって、本書ではGIFとIMIを別々に新規構築し直す対象とは考えない。

既存のConcept（概念）やProperty（プロパティ）をそのまま利用できない場合には、

- Definition（定義）の確認
- Namespace（名前空間）の整理
- URI / IRIによる識別
- Existing Vocabulary（既存語彙）とのMapping（対応付け）
- Machine-readable（機械可読）な表現への展開

等を必要に応じて行う。

したがってGIFについてもIMIと同様に、

> **必要な要件を既存資産の利用または拡張によって満たせる場合には、それを利用することも選択肢となる。**

---

<a id="b7-海外・国際的な主要standard標準・取り組み"></a>
<a id="B7海外・国際的な主要Standard標準・取り組み"></a>
## B.7 海外・国際的な主要Standard（標準）・取り組み

| Standard / 取り組み | 主な役割 | 本書への示唆 |
|---|---|---|
| W3C | RDF、RDFS、OWL、SKOS、JSON-LD等のTechnical Standard | 技術ごとの役割分担 |
| SEMIC Core Vocabularies | Cross-domainで利用可能なCore Vocabulary | Small Core + Domain + Mapping |
| Schema.org | Web上で共有されるVocabulary | Stable Namespace、Reuse |
| NIEM | 組織間情報交換のためのReusable Data Model | Core + Domain、Existing Asset活用 |
| CityGML | 都市・地理空間DomainのSemantic Data Model | Existing Domain ModelのReuse / Mapping |
| ISO/IEC 11179 | Metadata Registry / Data Element管理 | Concept、Data Element、Definition、Naming等 |
| Dublin Core | 汎用Metadata Vocabulary | 共通Metadata TermのReuse |
| DCAT | Dataset / Data Service Metadata | Data CatalogとDataset Discovery |

---

<a id="b8-w3c"></a>
<a id="B8W3C"></a>
## B.8 W3C

W3Cでは、

- RDF
- RDFS
- OWL
- SKOS
- JSON-LD
- SPARQL
- DCAT

等、Semantic Web（セマンティックWeb）やData Exchange（データ交換）に関係するTechnical Standard（技術標準）が整備されている。

これらは一つのTechnologyとしてではなく、それぞれ異なる役割を持つ。

```text
RDF
  → Graph Data Model（グラフデータモデル）

RDFS
  → Basic Semantic Definition（基本的な意味定義）

SKOS
  → Concept Scheme（概念体系）

OWL
  → Advanced Ontology（高度なオントロジー）

JSON-LD
  → JSONとIRI / RDF Data Modelの接続

SPARQL
  → RDF Graph Query

DCAT
  → Dataset / Data Service Metadata
```

本書では、用途に応じて必要なものを組み合わせる。

---

<a id="b9-semic-core-vocabularies"></a>
<a id="B9SEMICCoreVocabularies"></a>
## B.9 SEMIC Core Vocabularies

SEMIC Core Vocabulariesから得られる重要な示唆は、

> **複数Domainで再利用可能な基本Concept（概念）をCore（コア）として分離する**

という考え方である。

```text
             Small Core
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
   Domain A   Domain B   Domain C
```

本書ではこの考え方を参考とするが、Coreを最初から巨大化させることを目的とはしない。

また、日本ではGIF等のExisting Core Model（既存コアモデル）が存在するため、まずそれらのReuse（再利用）を検討する。

---

<a id="b10-schemaorg"></a>
<a id="B10Schemaorg"></a>
## B.10 Schema.org

Schema.orgは、Web上で共有されるVocabulary（語彙）であり、

- Person（人）
- Organization（組織）
- Place（場所）
- Event（イベント）
- Product（製品）
- Service（サービス）

等の一般的なConcept（概念）やProperty（プロパティ）を提供する。

本書が特に参考とするのは、

- Stable Namespace（安定した名前空間）
- URIによるVocabulary公開
- JSON-LDからの利用
- Developer（開発者）がSemantic Web内部技術を強く意識せず利用できること

である。

利用目的が一致する場合には、同じConcept（概念）やProperty（プロパティ）を国内側で再定義するのではなくReuse / Referenceすることを検討する。

---

<a id="b11-niem"></a>
<a id="B11NIEM"></a>
## B.11 NIEM

NIEMは、異なる組織間で情報交換を行うためのReusable Data Model（再利用可能なデータモデル）を整備する取り組みである。

本書との関係では、

```text
Core（コア）
   +
Domain（分野）
```

という構成と、Existing Data Dictionary（既存データ辞書）やExisting Schema（既存スキーマ）等を活用しながら共通Modelを整理する考え方が参考となる。

---

<a id="b12-citygml"></a>
<a id="B12CityGML"></a>
## B.12 CityGML

CityGMLは、都市・地理空間Domain（分野）において、

- Building（建物）
- Road（道路）
- Bridge（橋梁）
- Tunnel（トンネル）
- LandUse（土地利用）

等を意味を持ったObject（対象）として扱うSemantic Data Model（セマンティックデータモデル）である。

本書では、

> **既存Domain ModelをCommon Coreへコピーするのではなく、既存Domain Modelを維持しながらReference（参照）またはMapping（対応付け）する**

対象の一例として位置付ける。

---

<a id="b13-isoiec-11179"></a>
<a id="B13ISOIEC11179"></a>
## B.13 ISO/IEC 11179

ISO/IEC 11179シリーズは、Metadata Registry（メタデータレジストリ）において、Concept（概念）、Data Element（データ項目）、Definition（定義）、Naming（命名）、Value Domain（値領域）等を管理するための考え方を提供する国際標準である。

本書では、ISO/IEC 11179シリーズそのものを完全なMetadata Registryとして実装することを目的とはしない。

特に、

- Concept（概念）とData Element（データ項目）の分離
- Definition（定義）
- Naming（命名）
- Identifier（識別子）
- Value Domain（値領域）
- Registration（登録・管理）
- Concept System（概念体系）
- Dataset（データセット）

等の考え方を参照する。

<a id="b131-本書で主に参照するpart"></a>
<a id="B131本書で主に参照するPart"></a>
### B.13.1 本書で主に参照するPart

本書で特に関係するPartは次のとおりである。

| Part | 名称・主な内容 | 本書での主な参照内容 |
|---|---|---|
| ISO/IEC 11179-3 | Metamodel for registry common facilities | Identifier、Designation、Definition、Registration、Classification、Mapping等 |
| ISO/IEC 11179-4 | Formulation of data definitions | DataやMetadataのDefinition（定義）の作成原則 |
| ISO/IEC 11179-5 | Naming principles | Concept、Data Element等のNaming Principle（命名原則） |
| ISO/IEC 11179-6 | Registration | Metadata ItemのRegistration（登録）、管理責任、Status等 |
| ISO/IEC 11179-31 | Metamodel for data specification registration | Data Element、Data Element Concept、Object Class、Property、Value Domain等 |
| ISO/IEC 11179-32 | Metamodel for concept system registration | Concept System、Concept間Relation、Ontology等 |
| ISO/IEC 11179-33 | Metamodel for data set registration | Dataset Metadata、Provenance、Quality等 |

本書では、これらのPartをすべて同じ深さで実装することを目的とはしない。

用途に応じて必要な考え方を参照する。

<a id="b132-isoiec-11179-3"></a>
<a id="B132ISOIEC111793"></a>
### B.13.2 ISO/IEC 11179-3

ISO/IEC 11179-3は、Metadata Registry（メタデータレジストリ）の共通機能に関するMetamodel（メタモデル）を扱う。

本書では特に、

```text
Registry Item
     │
     ├── Identification
     ├── Designation / Definition
     ├── Registration
     ├── Classification
     └── Mapping
```

というMetadata Resource（メタデータ資産）の管理の考え方を参照する。

Semantic Data Model FoundationにおけるVocabulary、Data Dictionary、Mapping、Version、Governance等を管理する際の参考となる。

<a id="b133-isoiec-11179-4"></a>
<a id="B133ISOIEC111794"></a>
### B.13.3 ISO/IEC 11179-4

ISO/IEC 11179-4は、Data（データ）およびMetadata（メタデータ）のDefinition（定義）を作成する際の原則を扱う。

本書では、Vocabulary（語彙）やData Dictionary（データ辞書）に記載するDefinitionについて、

> **名称を言い換えるだけではなく、対象となるConcept（概念）の意味や範囲を明確にする**

ための考え方として参照する。

<a id="b134-isoiec-11179-5"></a>
<a id="B134ISOIEC111795"></a>
### B.13.4 ISO/IEC 11179-5

本書における英語論理名のNaming Rule（命名規則）は、ISO/IEC 11179-5のNaming Principle（命名原則）を基礎としつつ、実装時の可読性と利用性を重視して具体化したものである。

ISO/IEC 11179-5のNaming Structureを厳密に機械適用することは目的とせず、Meaning（意味）が損なわれない範囲で、冗長なRepresentation Term（表現用語）の省略等を許容する。

本書では、その考え方をData Model（データモデル）のClass（クラス）やProperty（プロパティ）等にも適用し、

> **意味が明確で、Domain内で一貫し、再利用しやすいLogical Name（論理名）を定義する**

ことを基本とする。

具体的な表記規則として、本書では次を採用する。

| 対象 | 命名規則 | 例 |
|---|---|---|
| Concept / Class | UpperCamelCase | `Facility`, `PostalAddress` |
| Property / Attribute | lowerCamelCase | `facilityType`, `postalCode` |
| Relationship Property | lowerCamelCase | `hasAddress`, `operatedBy` |
| JSON Property | lowerCamelCase | `facilityId`, `facilityType` |

なお、

> **UpperCamelCaseやlowerCamelCaseそのものをISO/IEC 11179-5が規定しているわけではない。**

ISO/IEC 11179-5のNaming Principle（命名原則）を参照した上で、本書における具体的なNaming Convention（命名規約）として採用するものである。

<a id="b135-isoiec-11179-6"></a>
<a id="B135ISOIEC111796"></a>
### B.13.5 ISO/IEC 11179-6

ISO/IEC 11179-6は、Metadata Registryに登録するItemについて、Registration（登録）のために必要となる情報、条件、手続等を扱う。

本書では、

- Owner（管理主体）
- Registration Status（登録状態）
- Version（版）
- Change Management（変更管理）

等のGovernance（ガバナンス）を検討する際の参考とする。

<a id="b136-isoiec-11179-31"></a>
<a id="B136ISOIEC1117931"></a>
### B.13.6 ISO/IEC 11179-31

ISO/IEC 11179-31は、Data Element（データ項目）および関連するConcept（概念）等のMetadataを登録するためのMetamodelを扱う。

本書では、

```text
Object Class
      +
Property
      │
      ▼
Data Element Concept
      │
      ▼
Data Element
      │
      ├── Datatype
      ├── Value Domain
      └── Permissible Value
```

等の考え方をData Dictionary（データ辞書）の設計に参照する。

<a id="b137-isoiec-11179-32"></a>
<a id="B137ISOIEC1117932"></a>
### B.13.7 ISO/IEC 11179-32

ISO/IEC 11179-32は、

- Concept System（概念体系）
- Concept（概念）
- Concept間のRelation（関係）
- Conceptに関するAssertion

等をMetadata Registryで管理するためのMetamodelを扱う。

本書ではOntology（オントロジー）を必須成果物とはしないが、Vocabulary（語彙）やConcept Systemを高度化する場合の参考とする。

<a id="b138-isoiec-11179-33"></a>
<a id="B138ISOIEC1117933"></a>
### B.13.8 ISO/IEC 11179-33

ISO/IEC 11179-33は、Dataset（データセット）をMetadata Registryへ登録するためのMetamodelを扱う。

Datasetについて、

- Provenance（来歴）
- Quality（品質）
- 利用適合性
- Risk（リスク）

等のMetadataを管理する考え方を含む。

本書では、DCATやDublin CoreによるDataset Metadataとの関係も考慮しながら、必要に応じて参照する。

---

<a id="b14-dcat-dublin-core"></a>
<a id="B14DCATDublinCore"></a>
## B.14 DCAT / Dublin Core

Dataset（データセット）やData Service（データサービス）のMetadata（メタデータ）を記述する際には、DCATとDublin Coreを利用することができる。

両者は競合するものではない。

Dublin Coreは、Resource（リソース）を記述するための汎用的なMetadata Term（メタデータ項目）を提供する。

代表的なものとして、

- title
- description
- creator
- publisher
- subject
- language
- rights
- license
- relation
- conformsTo

等がある。

一方、DCATはData Catalog（データカタログ）における、

- Catalog
- Dataset
- Distribution
- Data Service

等を記述し、DatasetやData ServiceのDiscovery（発見）やInteroperability（相互運用性）を支えるVocabulary（語彙）である。

DCATでは、Dublin Core Termsを含むExisting Vocabulary（既存語彙）が広く利用されている。

したがって本書では、

> **Dataset MetadataについてDCATだけを唯一のMetadata Vocabularyとするのではなく、用途に応じてDublin CoreのTermを直接Reuse（再利用）する**

ことを基本とする。

概念的には、

```text
                Dataset Metadata
                       │
           ┌───────────┴───────────┐
           ▼                       ▼
     Dublin Core                  DCAT
  General Metadata        Dataset / Data Service
           │                       │
           └───────────┬───────────┘
                       ▼
                  Data Catalog
```

と整理する。

例えば、

```text
Title
Description
Creator
Publisher
Language
License
Relation
```

等の汎用MetadataについてはDublin CoreのExisting TermをReuseできる。

一方、

```text
Catalog
Dataset
Distribution
Data Service
```

等、Data Catalog固有の構造についてはDCATを利用する。

重要なのは、

> **Existing Metadata Vocabulary（既存メタデータ語彙）に存在するProperty（プロパティ）を独自に再定義しないこと**

である。

必要なMetadata TermがDublin CoreやDCAT等に存在する場合には、それをReuse（再利用）し、日本固有またはDomain固有のMetadataのみを必要に応じて追加する。

---

<a id="b15-各standard標準の役割分担"></a>
<a id="B15各Standard標準の役割分担"></a>
## B.15 各Standard（標準）の役割分担

本書で参照する主要Standard等は、概念的には次のように整理できる。

```text
Semantic / Concept
    ├── IMI
    ├── GIF
    ├── Schema.org
    ├── SEMIC
    └── Domain Vocabulary

Data Model
    ├── GIF Core Data Model
    ├── NIEM
    ├── CityGML
    └── Domestic Domain Standards

Metadata / Data Dictionary
    ├── ISO/IEC 11179
    ├── Dublin Core
    └── DCAT

Semantic Technology
    ├── RDF
    ├── RDFS
    ├── SKOS
    ├── OWL
    └── JSON-LD

Governance / Interoperability
    ├── GIF
    ├── ISO/IEC 11179
    └── 各Domain Standard
```

これらを競合するStandardとして捉えるのではなく、

> **Existing Asset（既存資産）を利用し、不足する部分を補い、それぞれの役割を接続する**

ことが重要である。

---

<a id="付録c-名前空間・uri設計ガイド"></a>
<a id="付録C名前空間・URI設計ガイド"></a>
# 付録C 名前空間・URI設計ガイド

<a id="c1-本付録の目的"></a>
<a id="C1本付録の目的"></a>
## C.1 本付録の目的

本付録では、Semantic Data Model（セマンティックデータモデル）で使用するNamespace（名前空間）およびURI / IRIについて、基本的な設計方針を整理する。

NamespaceやURIの具体的な形式は、実際の管理主体、Domain（分野）、運用環境等に応じて決定する必要がある。

したがって、本付録は特定のURI Pattern（URIパターン）を一律に要求するものではなく、

> **安定したSemantic Identifier（意味上の識別子）を設計・管理するための基本原則**

を示すものである。

---

<a id="c2-namespace名前空間の基本的な役割"></a>
<a id="C2Namespace名前空間の基本的な役割"></a>
## C.2 Namespace（名前空間）の基本的な役割

Namespace（名前空間）は、Identifier（識別子）や名称を区別するための名前空間である。

例えば、

```text
Domain A
  status

Domain B
  status
```

が存在した場合、Local Name（ローカル名）だけでは同じ意味か判断できない。

Namespaceを利用すると、

```text
{namespace-a}:status
{namespace-b}:status
```

として識別できる。

本書ではこれに加え、

> **DomainごとのVocabulary（語彙）やSemantic Resource（意味資産）の管理責任を明確にするため、NamespaceをGovernance（ガバナンス）の単位としても扱う**

ことを基本方針とする。

---

<a id="c3-namespace名前空間設計の基本原則"></a>
<a id="C3Namespace名前空間設計の基本原則"></a>
## C.3 Namespace（名前空間）設計の基本原則

<a id="c31-管理主体を明確にする"></a>
<a id="C31管理主体を明確にする"></a>
### C.3.1 管理主体を明確にする

Namespaceについて、

- Owner（管理主体）
- Responsible Organization（責任組織）
- Domain（分野）
- Contact（問い合わせ先）
- Change Management（変更管理）

等を明確にする。

<a id="c32-長期的な安定性を優先する"></a>
<a id="C32長期的な安定性を優先する"></a>
### C.3.2 長期的な安定性を優先する

URIはDataやSystemから長期間参照される可能性がある。

そのため、

> **組織内部のSystem構成や一時的なProject名へ過度に依存しない**

設計とする。

<a id="c33-domain分野ごとに責任を分離する"></a>
<a id="C33Domain分野ごとに責任を分離する"></a>
### C.3.3 Domain（分野）ごとに責任を分離する

すべてのVocabulary（語彙）を一つのNamespaceで管理する必要はない。

```text
Common Namespace
     └── Common Concept

Statistics Namespace
     └── Statistics Concept

Smart City Namespace
     └── Smart City Concept

Health Namespace
     └── Health Concept
```

のように分散管理することができる。

<a id="c34-existing-namespace既存名前空間をreuseする"></a>
<a id="C34ExistingNamespace既存名前空間をReuseする"></a>
### C.3.4 Existing Namespace（既存名前空間）をReuseする

既に利用可能なVocabulary（語彙）が存在する場合には、同じConcept（概念）やProperty（プロパティ）を不用意に再定義しない。

例えば、

```text
Schema.org
Existing Domain Vocabulary
Own Domain Vocabulary
```

を同じModel内で組み合わせることができる。

---

<a id="c4-uri-iriの役割"></a>
<a id="C4URIIRIの役割"></a>
## C.4 URI / IRIの役割

URI / IRIは、

- Concept（概念）
- Class（クラス）
- Property（プロパティ）
- Code Concept（コード概念）
- Dataset（データセット）
- Resource（リソース）

等を識別するために利用できる。

重要なのは、

> **同じURIが長期的に同じSemantic Resource（意味資産）を識別する**

ことである。

---

<a id="c5-concept-uri概念uriとresource-uriリソースuriを区別する"></a>
<a id="C5ConceptURI概念URIとResourceURIリソースURIを区別する"></a>
## C.5 Concept URI（概念URI）とResource URI（リソースURI）を区別する

次の二つは異なる。

```text
Concept URI
    │
    ▼
「FacilityというConcept（概念）」

Resource URI
    │
    ▼
「ある特定のFacility（施設）」
```

概念例：

```text
Concept / Class
https://{authority-domain}/vocab/Facility

Resource
https://{authority-domain}/resource/facility/F001
```

本書でまず重視するのは、Vocabulary（語彙）、Class（クラス）、Property（プロパティ）等を識別するConcept側のURIである。

---

<a id="c6-uri-patternuriパターンの概念例"></a>
<a id="C6URIPatternURIパターンの概念例"></a>
## C.6 URI Pattern（URIパターン）の概念例

実際のDomain NameやPath Structureは管理主体が決定する。

以下は説明用のPatternである。

```text
Vocabulary / Class
https://{authority-domain}/vocab/{term}

Concept
https://{authority-domain}/concept/{concept-id}

Code Scheme
https://{authority-domain}/code/{scheme}

Code Concept
https://{authority-domain}/code/{scheme}/{code}

Resource
https://{authority-domain}/resource/{resource-type}/{id}

JSON-LD Context
https://{authority-domain}/context/{profile}

JSON Schema
https://{authority-domain}/schema/{profile}
```

これらはStandard Patternそのものではなく、Resourceの種類を分けて管理する考え方を示している。

---

<a id="c7-uriを解決可能にする"></a>
<a id="C7URIを解決可能にする"></a>
## C.7 URIを解決可能にする

理想的にはVocabulary URIへAccessした際に、

```text
URI
 │
 ├── Human-readable Documentation
 ├── Definition
 ├── RDFS
 ├── Mapping
 ├── Version
 └── Related Vocabulary
```

等へ到達できるようにする。

つまりURIを、

> **単なる識別文字列ではなく、Semantic Information（意味情報）へ到達する入口**

として利用する。

---

<a id="c8-human-readable人間可読とmachine-readable機械可読を両立する"></a>
<a id="C8Humanreadable人間可読とMachinereadable機械可読を両立する"></a>
## C.8 Human-readable（人間可読）とMachine-readable（機械可読）を両立する

同じConcept（概念）について、

```text
Human
  ↓
Documentation

Machine
  ↓
RDFS / Metadata
```

の双方からDefinition（定義）を確認できることが望ましい。

```text
              Concept URI
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
Human-readable         Machine-readable
Documentation          Definition
```

---

<a id="c9-version版管理"></a>
<a id="C9Version版管理"></a>
## C.9 Version（版）管理

<a id="c91-identifier識別子とversion版を分離する"></a>
<a id="C91Identifier識別子とVersion版を分離する"></a>
### C.9.1 Identifier（識別子）とVersion（版）を分離する

軽微なDefinition変更のたびにConcept URIを変更すると、Existing DataからのReferenceが不安定になる。

したがって、

```text
Concept Identifier
       │
       └── Stable

Version Information
       │
       ├── Version 1
       ├── Version 2
       └── Version 3
```

のように、IdentifierとVersionを分離して考える。

<a id="c92-meaning意味が変わる場合"></a>
<a id="C92Meaning意味が変わる場合"></a>
### C.9.2 Meaning（意味）が変わる場合

Definition変更によってConcept（概念）の意味そのものが変化する場合には、同一Conceptとして維持すべきかを検討する必要がある。

例えば、

- Definitionの誤字修正
- Labelの追加

と、

- Scopeの変更
- 対象範囲の変更
- Conceptそのものの変更

は区別する。

<a id="c93-json-schema-json-ld-contextのversion"></a>
<a id="C93JSONSchemaJSONLDContextのVersion"></a>
### C.9.3 JSON Schema / JSON-LD ContextのVersion

JSON SchemaやJSON-LD ContextはImplementation（実装）へ直接影響する可能性がある。

そのため、

- Compatibility（互換性）
- Release（公開）
- Deprecation（非推奨）
- Migration（移行）

等を管理する。

---

<a id="c10-persistence永続性"></a>
<a id="C10Persistence永続性"></a>
## C.10 Persistence（永続性）

URIは長期的に参照される可能性があるため、Persistence（永続性）を考慮する。

特に、

- Organization Rename（組織名称変更）
- System Replacement（システム更改）
- Website Renewal（Webサイト更改）
- Repository Migration（リポジトリ移行）

等によってURIが失われない設計が必要となる。

```text
Concept
   │
   ▼
Stable URI
   │
   ├── Current Definition
   └── Historical Information
```

---

<a id="c11-deprecated-concept非推奨概念の扱い"></a>
<a id="C11DeprecatedConcept非推奨概念の扱い"></a>
## C.11 Deprecated Concept（非推奨概念）の扱い

Concept（概念）を利用停止する場合でも、既存URIを直ちに削除することは望ましくない。

例えば、

```text
Old Concept
    │
    ├── Deprecated
    ├── Replacement
    └── Last Version
```

等の情報を残す。

これにより、過去DataからのReferenceを維持できる。

---

<a id="c12-uriとlabel名称を分離する"></a>
<a id="C12URIとLabel名称を分離する"></a>
## C.12 URIとLabel（名称）を分離する

URIはIdentifier（識別子）であり、Human-readableな名称そのものではない。

```text
Stable URI
    │
    ├── 日本語Label
    ├── English Label
    ├── Alternative Label
    └── Definition
```

とする。

名称が変更されても、Concept（概念）が同じであればIdentifierを維持できる。

---

<a id="c13-uri-local-nameuriローカル名とlogical-name論理名"></a>
<a id="C13URILocalNameURIローカル名とLogicalName論理名"></a>
## C.13 URI Local Name（URIローカル名）とLogical Name（論理名）

URIのLocal NameとJSON上のLogical Nameは、必ずしも同一である必要はない。

例えば、

```text
JSON Property
  facilityType

        │
        ▼ JSON-LD Context

Vocabulary Property
  {namespace}:facilityType
```

のようにMappingできる。

したがって、

> **Application上のNaming Rule（命名規則）とSemantic Identifier（意味上の識別子）を分離できる**

ことがNamespace / URIを利用するメリットの一つである。

---

<a id="c14-naming-rule命名規則"></a>
<a id="C14NamingRule命名規則"></a>
## C.14 Naming Rule（命名規則）

<a id="c141-基本方針"></a>
<a id="C141基本方針"></a>
### C.14.1 基本方針

本書における英語論理名のNaming Rule（命名規則）は、ISO/IEC 11179-5のNaming Principle（命名原則）を主要な参考の一つとする。

その上で、本書における具体的な表記規則を定める。

| 対象 | 日本語 | 命名規則 | 例 |
|---|---|---|---|
| Concept / Class | 概念・クラス | UpperCamelCase | `Facility`, `PostalAddress`, `MedicalFacility` |
| Property / Attribute | プロパティ・属性 | lowerCamelCase | `facilityId`, `facilityType`, `postalCode` |
| Relationship Property | 関係プロパティ | lowerCamelCase | `hasAddress`, `operatedBy`, `locatedIn` |
| JSON Property | JSONプロパティ | lowerCamelCase | `facilityId`, `facilityType`, `postalCode` |
| Code Scheme | コード体系 | UpperCamelCase | `FacilityType`, `SchoolType` |
| Code / Notation | コード・表記 | 各Code Schemeの規則 | `01`, `park`, `hospital` |

なお、UpperCamelCaseやlowerCamelCaseそのものをISO/IEC 11179-5が規定しているわけではない。

本書における具体的なNaming Convention（命名規約）として採用する。

<a id="c142-concept概念・classクラス"></a>
<a id="C142Concept概念・Classクラス"></a>
### C.14.2 Concept（概念）・Class（クラス）

Concept（概念）やClass（クラス）の英語名称は、原則としてUpperCamelCaseとする。

```text
Facility
PostalAddress
MedicalFacility
PublicFacility
```

<a id="c143-propertyプロパティ・attribute属性"></a>
<a id="C143Propertyプロパティ・Attribute属性"></a>
### C.14.3 Property（プロパティ）・Attribute（属性）

Property（プロパティ）およびAttribute（属性）の英語論理名は、原則としてlowerCamelCaseとする。

```text
facilityId
facilityType
postalCode
addressText
```

snake_case、

```text
facility_id
facility_type
postal_code
```

は、本書で定義する標準的な英語論理名としては使用しない。

<a id="c144-relationship-property関係プロパティ"></a>
<a id="C144RelationshipProperty関係プロパティ"></a>
### C.14.4 Relationship Property（関係プロパティ）

Class間のRelation（関係）を表すPropertyについてもlowerCamelCaseを利用する。

Relationの意味が分かる動詞または動詞句を使用する。

```text
hasAddress
operatedBy
locatedIn
memberOf
```

<a id="c145-json-propertyjsonプロパティ"></a>
<a id="C145JSONPropertyJSONプロパティ"></a>
### C.14.5 JSON Property（JSONプロパティ）

JSON Propertyについても、Data DictionaryやUML Class Diagramで定義する英語論理名と同じlowerCamelCaseを原則として利用する。

```text
UML Property
  facilityType
       │
       ▼
Data Dictionary
  facilityType
       │
       ▼
JSON Property
  facilityType
       │
       ▼
JSON Schema
  facilityType
       │
       ▼
JSON-LD Context
  facilityType
```

これにより、複数成果物間でLogical Name（論理名）を一貫して利用する。

<a id="c146-日本語論理名と英語論理名"></a>
<a id="C146日本語論理名と英語論理名"></a>
### C.14.6 日本語論理名と英語論理名

Data Dictionaryでは、日本語論理名と英語論理名を分離して管理する。

例えば、

```text
日本語論理名
  施設種別

英語論理名
  facilityType
```

とする。

日本語名称の変更によって、英語論理名やConcept Identifierを安易に変更しない。

<a id="c147-略語・短縮語"></a>
<a id="C147略語・短縮語"></a>
### C.14.7 略語・短縮語

略語やAcronym（頭字語）を使用する場合には、Domain内で表記を統一する。

意味が不明確になる短縮や、特定組織の内部だけで通用する略語は可能な限り避ける。

<a id="c148-logical-name論理名とidentifier識別子"></a>
<a id="C148LogicalName論理名とIdentifier識別子"></a>
### C.14.8 Logical Name（論理名）とIdentifier（識別子）

Logical NameはDeveloper（開発者）が利用しやすい表現とし、Semantic IdentifierはURIによって安定して管理する。

```text
Logical Name
  facilityType
       │
       ▼
Property URI
  {namespace}:facilityType
```

名称そのものだけに意味を依存させないことが重要である。

---

<a id="c15-code-schemeコード体系のuri"></a>
<a id="C15CodeSchemeコード体系のURI"></a>
## C.15 Code Scheme（コード体系）のURI

Code（コード）についてもScheme（体系）とCode Concept（コード概念）を区別する。

```text
FacilityType
       │
       ├── park
       ├── library
       └── school
```

概念例：

```text
Scheme
https://{authority-domain}/code/facility-type

Code Concept
https://{authority-domain}/code/facility-type/park
```

これにより、同じ`01`や`park`というCodeであっても、どのSchemeに属するかを識別できる。

---

<a id="c16-external-vocabulary外部語彙との共存"></a>
<a id="C16ExternalVocabulary外部語彙との共存"></a>
## C.16 External Vocabulary（外部語彙）との共存

Semantic Data Modelでは、自Domain Namespaceだけを利用する必要はない。

```text
JSON-LD Context
       │
       ├── Schema.org
       ├── Existing Domestic Vocabulary
       ├── Existing Domain Vocabulary
       └── Own Domain Namespace
```

とすることができる。

Existing Vocabularyとして、

- IMI
- GIFに関連するVocabulary
- Schema.org
- Domain Standard

等が利用可能な場合には、まずReuse（再利用）を検討する。

意味が一致しない場合にはOwn Domain Vocabulary（独自ドメイン語彙）を定義し、Mapping（対応付け）を行う。

---

<a id="c17-mapping対応付けの管理"></a>
<a id="C17Mapping対応付けの管理"></a>
## C.17 Mapping（対応付け）の管理

External Vocabulary（外部語彙）との対応は、名称の一致だけで判断しない。

```text
Own Concept
     │
     ├── Definition
     ├── Scope
     └── Relation
             │
             ▼
       External Concept
```

を確認する。

Mappingについても、

- Mapping Target（対応先）
- Mapping Type（対応関係）
- Rationale（判断根拠）
- Version（版）
- Reviewer（確認者）

等を管理することが望ましい。

Mapping自体も再利用可能なSemantic Asset（意味資産）として管理する。

---

<a id="c18-namespace名前空間管理情報"></a>
<a id="C18Namespace名前空間管理情報"></a>
## C.18 Namespace（名前空間）管理情報

Namespace自体について、最低限次の情報を管理することが考えられる。

| 項目 | 内容 |
|---|---|
| Namespace Identifier | Namespaceを識別する名称 |
| Base URI | URIのBase |
| Domain | 管理対象Domain |
| Owner | 管理責任主体 |
| Contact | 問い合わせ先 |
| Version Policy | Version管理方針 |
| Persistence Policy | 永続性方針 |
| Deprecation Policy | 廃止Conceptの管理方針 |
| Documentation | 利用方法 |
| Machine-readable Resource | RDFS等へのAccess方法 |

---

<a id="c19-namespace名前空間設計で避けたい状態"></a>
<a id="C19Namespace名前空間設計で避けたい状態"></a>
## C.19 Namespace（名前空間）設計で避けたい状態

<a id="c191-一時的なsystem名への依存"></a>
<a id="C191一時的なSystem名への依存"></a>
### C.19.1 一時的なSystem名への依存

```text
/project-2026/system-v2/...
```

等、一時的なProject構成をConcept URIに強く含めることは避ける。

<a id="c192-definitionなしでuriだけ作成する"></a>
<a id="C192DefinitionなしでURIだけ作成する"></a>
### C.19.2 DefinitionなしでURIだけ作成する

URIが存在しても、

```text
URI
  ↓
404 / Definitionなし
```

ではSemantic Resourceとしての利用価値が低い。

<a id="c193-同じconcept概念に複数uriを無秩序に発行する"></a>
<a id="C193同じConcept概念に複数URIを無秩序に発行する"></a>
### C.19.3 同じConcept（概念）に複数URIを無秩序に発行する

同じConceptについてDomainごとに独自URIを発行すると、再びMappingが必要になる。

Reuse可能なIdentifierが存在する場合は、その利用を検討する。

<a id="c194-uri変更を安易に行う"></a>
<a id="C194URI変更を安易に行う"></a>
### C.19.4 URI変更を安易に行う

Label（名称）の変更やSystem Renewal（システム更改）だけを理由としてConcept URIを変更しない。

---

<a id="c20-本付録のまとめ"></a>
<a id="C20本付録のまとめ"></a>
## C.20 本付録のまとめ

Namespace（名前空間）とURIの目的は、

> **長いURLをDataへ付加することではない。**

重要なのは、

```text
Data Element
     │
     ▼
Property URI
     │
     ▼
Vocabulary
     │
     ▼
Definition / Mapping / Version
```

という経路を安定して構築することである。

また、Existing Vocabulary（既存語彙）やExisting Model（既存モデル）が利用可能な場合には、それを優先してReuseする。

```text
Existing Asset
      │
      ├── GIF
      ├── IMI
      ├── Schema.org
      └── Domain Standard
              │
              ▼
          Reuse / Mapping
              │
              ▼
      Own Domain Namespace
```

その結果、

- Human（人間）
- Developer（開発者）
- System（システム）
- Data Catalog（データカタログ）
- AI

が同じSemantic Definition（意味定義）へ到達できる。

したがって、本書では、

> **Namespace / URIをSemantic Data Model Foundationにおける識別・参照・再利用を支える基盤**

として位置付ける。