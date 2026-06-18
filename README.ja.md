# Anki Vocabulary Helper

<p align="center">
  <a href="./README.md">English</a> ·
  <strong>日本語</strong> ·
  <a href="./README.ko.md">한국어</a>
</p>


<p align="center">
  <img src="./docs/images/anki-card-preview.png" alt="Anki vocabulary card preview" width="760">
</p>

<p align="center">
  日本語単語のJSONをAnkiへ追加し、AivisSpeechで単語・例文音声を自動生成する静的Webツールです。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=111" alt="JavaScript">
  <a href="https://ankiweb.net/shared/info/2055492159">
    <img src="https://img.shields.io/badge/AnkiConnect-8765-4B8BBE" alt="AnkiConnect">
  </a>
  <a href="https://github.com/Aivis-Project/AivisSpeech">
    <img src="https://img.shields.io/badge/AivisSpeech-10101-7C3AED" alt="AivisSpeech">
  </a>
</p>


## 主な機能

- ChatGPTが生成したカードJSONをAnkiConnect経由でAnkiへ追加
- 1件または複数件のカードを一括処理
- JSON配列、複数JSONオブジェクト、JSON/TXTファイルに対応
- AivisSpeechのローカルAPIで単語・例文音声を生成
- 一意なWAVファイル名でAnkiメディアへ保存
- 日本語→日本語 / 日本語→母語のカードモード
- 英語・日本語・韓国語・中国語UI
- ノートタイプ、13フィールド、テンプレート、CSSを自動作成・更新
- 裏面の漢字クリックで漢字情報ポップアップ
- 表面の長押しで読みと非表示情報を表示
- PC・モバイル対応のレスポンシブカード
- 実際の`templates.js`を使ったローカルプレビュー

## 必要なもの

Webページ自体のインストールは不要です。GitHub Pagesへアクセスして使用します。

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect add-on](https://ankiweb.net/shared/info/2055492159)**
   - アドオンコード: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. 最新版のChromeまたはEdge

通常利用ではNode.js、npm、Python、バックエンドサーバーは不要です。

## ユーザー設定

### 1. AnkiConnectのインストール

```text
ツール
→ アドオン
→ アドオンを取得
→ コード: 2055492159
```

インストール後にAnkiを再起動します。

### 2. AnkiConnectのCORS設定

```text
ツール
→ アドオン
→ AnkiConnect
→ 設定
```

`webCorsOriginList`にGitHub PagesのOriginを追加します。

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

保存後にAnkiを再起動します。

### 3. AivisSpeechのインストールと起動

既定のAPI URL:

```text
http://127.0.0.1:10101
```

APIドキュメント:

```text
http://127.0.0.1:10101/docs
```

必要に応じてAivisSpeechで次のOriginを許可します。

```text
https://signife.github.io
```

設定変更後はAivisSpeechを完全終了して再起動します。

## 接続確認

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

AnkiとAivisSpeechを起動し、Webページで**接続テスト**を押します。

## 初回Anki設定

次の項目を選択します。

- デッキ名
- カードモード
- カードフォント
- AivisSpeechボイス
- 話速
- 単語音声生成
- 例文音声生成

その後、**推奨Anki設定を作成**を押します。

## ノートタイプ

既定名:

```text
signife_anki_helper
```

13個のフィールドを使用します。

| Field | 内容 |
|---|---|
| `CardMode` | `jp-jp` または `jp-native` |
| `Word` | 日本語の見出し語 |
| `Reading` | 見出し語全体のひらがな読み |
| `Definition` | 日本語定義 |
| `NativeMeaning` | 母語の意味 |
| `Expressions` | よく使う表現 |
| `Examples` | 例文 |
| `Synonyms` | 類義語 |
| `KanjiData` | 漢字別情報JSON |
| `WordAudio` | 単語音声タグ |
| `ExamplesAudio` | 例文音声タグ |
| `WordAudioSource` | 単語音声生成情報 |
| `ExamplesAudioSource` | 例文音声生成情報 |

## 音声生成フロー

```text
JSON入力
→ readingまたはvoiceTextを選択
→ AivisSpeech /audio_query
→ speedScaleを適用
→ AivisSpeech /synthesis
→ WAV Blob生成
→ 一意なファイル名生成
→ AnkiConnect storeMediaFile
→ [sound:filename.wav]を保存
```

テンプレートはファイル名を推測せず、次のフィールドのみを表示します。

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## 開発者向けローカル実行

通常利用者には不要です。

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

```text
http://localhost:8000
```

カードテンプレートのプレビュー:

```text
http://localhost:8000/templates_local_preview.html
```

## プライバシー

- カードJSONはWebサイトのサーバーへ保存されません。
- カードデータはユーザーPCのAnkiConnectへ送信されます。
- 音声合成はローカルAivisSpeechで処理されます。
- 生成音声はAnkiメディアコレクションへ保存されます。
