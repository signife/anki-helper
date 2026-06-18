# Anki Vocabulary Helper

<p align="center">
  <a href="./README.md">English</a> ·
  <strong>日本語</strong> ·
  <a href="./README.ko.md">한국어</a>
</p>

<p align="center">
  <a href="https://signife.github.io/anki-helper/">
    <img
      src="https://img.shields.io/badge/Open%20Web%20App-Anki%20Vocabulary%20Helper-2EA44F?style=for-the-badge"
      alt="Open Anki Vocabulary Helper"
    >
  </a>
</p>

<p align="center">
  <img src="./docs/images/anki-card-preview.png" alt="Anki vocabulary card preview" width="760">
</p>

<p align="center">
  日本語の単語カードをAnkiへ送信し、AivisSpeechで単語と例文の音声を生成する静的Webツールです。
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

## 機能

- ChatGPTが生成したカードJSONをAnkiConnect経由でAnkiへ直接追加
- 1件または複数件のカードを一括処理
- JSON配列、複数のJSONオブジェクト、JSON/TXTファイルを読み込み
- ローカルのAivisSpeech APIで単語と例文の音声を生成
- 一意なWAVファイル名で音声をAnkiメディアへ保存
- 日本語 → 日本語、日本語 → 母語のカードモードに対応
- 英語、日本語、韓国語、中国語のWeb UI
- Ankiのノートタイプ、フィールド、テンプレート、CSSを自動作成・更新
- 裏面の漢字をクリックすると漢字情報のポップアップを表示
- 表面を長押しすると読みと非表示の漢字情報を表示
- デスクトップとモバイルに対応したレスポンシブカードレイアウト
- 実際の`templates.js`をローカルでプレビュー

## 必要なもの

Webページ自体をインストールする必要はありません。デプロイ済みのWebアプリを開いてください。

**https://signife.github.io/anki-helper/**

ローカル環境に必要なアプリケーション:

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect add-on](https://ankiweb.net/shared/info/2055492159)**
   - アドオンコード: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. 最新版のChromeまたはEdge

通常利用では、バックエンドサーバー、Node.js、npm、Pythonをインストールする必要はありません。

## プロジェクト構成

```text
anki-helper-modular/
├─ index.html
├─ README.md
├─ README.ja.md
├─ README.ko.md
├─ css/
│  └─ style.css
├─ js/
│  ├─ app.js
│  ├─ config.js
│  ├─ samples.js
│  ├─ templates.js
│  └─ translations.js
├─ docs/
│  └─ images/
└─    └─ anki-card-preview.png
```

## ユーザー設定

Webアプリを開きます。

**[https://signife.github.io/anki-helper/](https://signife.github.io/anki-helper/)**

### 1. Ankiをインストール

Anki Desktopをインストールして起動します。

### 2. AnkiConnectをインストール

Ankiで次の操作を行います。

```text
ツール
→ アドオン
→ アドオンを取得
→ コード: 2055492159
```

インストール後、Ankiを再起動します。

### 3. AnkiConnectのCORSを設定

次の画面を開きます。

```text
ツール
→ アドオン
→ AnkiConnect
→ 設定
```

GitHub PagesのOriginを`webCorsOriginList`へ追加します。

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

ローカル開発も行う場合は、次のOriginも許可できます。

```json
{
  "webCorsOriginList": [
    "http://localhost",
    "http://127.0.0.1",
    "https://signife.github.io"
  ]
}
```

設定を保存してAnkiを再起動します。

### 4. AivisSpeechをインストールして起動

AivisSpeechをインストールして起動します。

既定のローカルAPI URL:

```text
http://127.0.0.1:10101
```

APIドキュメント:

```text
http://127.0.0.1:10101/setting
```

ブラウザーからのアクセスがブロックされる場合は、AivisSpeechで次のOriginを許可します。

```text
https://signife.github.io
```

設定変更後、AivisSpeechを再起動します。

## 接続確認

1. Ankiを起動します。
2. AivisSpeechを起動します。
3. デプロイ済みのWebページを開きます。
4. 次の値を確認します。

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

5. **接続テスト**をクリックします。
6. 緑色のチェックが表示されれば、両方のサービスを利用できます。

## Ankiの初期設定

次の項目を選択します。

- デッキ名
- カードモード
- カードフォント
- AivisSpeechボイス
- 話速
- 単語音声を生成するか
- 例文音声を生成するか

次に、**推奨Anki設定を作成**をクリックします。

ノートタイプがすでに存在する場合、アプリは次の項目を更新します。

- 表面テンプレート
- 裏面テンプレート
- カードCSS
- 不足しているフィールド

## Ankiノートタイプ

既定のノートタイプ:

```text
signife_anki_helper
```

13個のフィールドを使用します。

| Field | 説明 |
|---|---|
| `CardMode` | `jp-jp` または `jp-native` |
| `Word` | 日本語の見出し語 |
| `Reading` | 全文のひらがな読み |
| `Definition` | 日本語の定義 |
| `NativeMeaning` | ユーザーの言語での意味 |
| `Expressions` | よく使われる表現 |
| `Examples` | 例文 |
| `Synonyms` | 類義語 |
| `KanjiData` | 漢字ごとの情報を格納するJSON |
| `WordAudio` | 単語音声タグ |
| `ExamplesAudio` | 例文音声タグ |
| `WordAudioSource` | 単語音声生成のメタデータ |
| `ExamplesAudioSource` | 例文音声生成のメタデータ |

## カードモード

### `jp-jp`

裏面に日本語の定義を表示します。

```json
{
  "cardMode": "jp-jp"
}
```

### `jp-native`

裏面に母語の意味を表示します。

```json
{
  "cardMode": "jp-native"
}
```

## カードJSONの例

```json
{
  "cardMode": "jp-native",
  "word": "正義",
  "reading": "せいぎ",
  "definition": "正しい道理。また、社会を公平に保つための正しい考え方。",
  "nativeMeaning": "justice; righteousness",
  "expressions": [
    "正義を貫く",
    "正義を守る",
    "正義に反する",
    "正義の味方"
  ],
  "examples": [
    "彼は最後まで自分の正義を貫いた。",
    "それは正義に反する行為だ。"
  ],
  "exampleReadings": [
    "かれはさいごまでじぶんのせいぎをつらぬいた。",
    "それはせいぎにはんするこういだ。"
  ],
  "synonyms": [
    "公正",
    "正当",
    "道義"
  ],
  "kanji": {
    "正": "On: セイ・ショウ / Kun: ただしい・ただす",
    "義": "On: ギ / Meaning: moral duty or what is right"
  }
}
```

## GPTプロンプトの例

```text
次の日本語の単語から、signife_anki_helper用のカードJSONオブジェクトを1件作成してください。
JSON以外の説明やコードブロックは出力しないでください。

フィールド:
cardMode, word, reading, definition, nativeMeaning,
expressions, examples, exampleReadings, synonyms, kanji.

readingには、見出し語全体の正確なひらがな読みを記述してください。
exampleReadingsには、examplesと同じ順番で各文の全文ひらがな読みを記述してください。
kanjiには、見出し語に含まれる各漢字の読みと意味をオブジェクトとして記述してください。
cardModeはjp-nativeに設定してください。
```

## 音声生成フロー

```text
JSON入力
→ readingまたはvoiceTextを選択
→ AivisSpeech /audio_query
→ speedScaleを適用
→ AivisSpeech /synthesis
→ WAV Blobを生成
→ 一意なファイル名を生成
→ AnkiConnect storeMediaFile
→ [sound:filename.wav]をフィールドに保存
```

ファイル名の例:

```text
signife_word_1781741234567_a8d42f6b911c.wav
signife_example_1_1781741238912_f1920ed34b7a.wav
```

カードテンプレートはファイル名を推測せず、次のフィールドのみを表示します。

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## カードデザイン

### 表面

- 見出し語
- カードの長押しで表示される読み
- 単語音声ボタン
- 表面と裏面で統一されたフォントと単語サイズ

### 裏面

- 見出し語と読み
- クリック可能な漢字ごとのポップアップ
- 単語音声
- 日本語の定義または母語の意味
- スクロール可能なグレーの詳細領域
  - 例文
  - 例文音声
  - よく使われる表現
  - 類義語

カードフォントは`config.js`で選択され、`buildCardCss(fontStack)`へ渡されます。

## AivisSpeechの設定

```js
export const SPEECH_ENGINE = {
  id: "aivis-speech",
  name: "AivisSpeech",
  defaultUrl: "http://127.0.0.1:10101",
  websiteUrl: "https://aivis-project.com/",
  settingsUrl: "http://127.0.0.1:10101/docs",
  sourceName: "AivisSpeech"
};
```

## 開発者向け設定

通常のユーザーにはこのセクションは必要ありません。

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

次のURLを開きます。

```text
http://localhost:8000
```

実際のカードテンプレートをプレビューするには、次のURLを開きます。

```text
http://localhost:8000/templates_local_preview.html
```

## トラブルシューティング

### AnkiConnectへの接続に失敗する場合

次の項目を確認してください。

- Ankiが起動している
- AnkiConnectがインストールされている
- URLが`http://localhost:8765`になっている
- サイトのOriginが`webCorsOriginList`に含まれている
- 設定変更後にAnkiを再起動した

### AivisSpeechへの接続に失敗する場合

次の項目を確認してください。

- AivisSpeechが起動している
- URLが`http://127.0.0.1:10101`になっている
- `http://127.0.0.1:10101/docs`を開ける
- サイトのOriginが許可されている
- 設定変更後にAivisSpeechを再起動した

### カードデザインが更新されない場合

1. `js/templates.js`を編集します。
2. ブラウザーを強制再読み込みします。
3. **推奨Anki設定を作成**をもう一度クリックします。
4. Ankiでノートタイプのテンプレートを確認します。

## プライバシー

- カードJSONはこのWebサイトに保存されません。
- カードデータはユーザーのコンピューター上のAnkiConnectだけに送信されます。
- 音声合成はローカルのAivisSpeechで処理されます。
- 生成された音声はAnkiのメディアコレクションに保存されます。

## ライセンス

プロジェクトに適したリポジトリライセンスを追加してください。例:

```text
MIT License
```
