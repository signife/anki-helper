# Anki Vocabulary Helper

<p align="center">
  <strong>English</strong> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a>
</p>


<p align="center">
  <img src="./docs/images/anki-card-preview.png" alt="Anki vocabulary card preview" width="760">
</p>

<p align="center">
  A static web tool that sends Japanese vocabulary cards to Anki and generates word and example audio with AivisSpeech.
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


## Features

- Add ChatGPT-generated card JSON directly to Anki through AnkiConnect
- Process one card or multiple cards at once
- Import JSON arrays, multiple JSON objects, and JSON/TXT files
- Generate word and example audio with the local AivisSpeech API
- Store audio in Anki media with unique WAV filenames
- Support Japanese → Japanese and Japanese → native-language card modes
- English, Japanese, Korean, and Chinese web UI
- Automatically create and update the Anki note type, fields, templates, and CSS
- Show a kanji information popup when a kanji is clicked on the back
- Reveal reading and hidden kanji information by holding the front
- Responsive card layout for desktop and mobile
- Preview the actual `templates.js` locally

## Requirements

The web page itself does not need to be installed. Open the deployed GitHub Pages site in a browser.

Required local applications:

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect add-on](https://ankiweb.net/shared/info/2055492159)**
   - Add-on code: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. A recent version of Chrome or Edge

No backend server, Node.js, npm, or Python installation is required for normal use.

## Project Structure

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
│     └─ anki-card-preview.png
└─ templates_local_preview.html
```

## User Setup

### 1. Install Anki

Install and start Anki Desktop.

### 2. Install AnkiConnect

In Anki:

```text
Tools
→ Add-ons
→ Get Add-ons
→ Code: 2055492159
```

Restart Anki after installation.

### 3. Configure AnkiConnect CORS

Open:

```text
Tools
→ Add-ons
→ AnkiConnect
→ Config
```

Add your GitHub Pages origin to `webCorsOriginList`.

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

For local development, you may also allow:

```json
{
  "webCorsOriginList": [
    "http://localhost",
    "http://127.0.0.1",
    "https://signife.github.io"
  ]
}
```

Save the configuration and restart Anki.

### 4. Install and Start AivisSpeech

Install and start AivisSpeech.

Default local API URL:

```text
http://127.0.0.1:10101
```

API documentation:

```text
http://127.0.0.1:10101/docs
```

When browser access is blocked, allow the following origin in AivisSpeech:

```text
https://signife.github.io
```

Restart AivisSpeech after changing its settings.

## Connection Check

1. Start Anki.
2. Start AivisSpeech.
3. Open the deployed web page.
4. Confirm these values:

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

5. Click **Test connection**.
6. A green check means both services are ready.

## Initial Anki Setup

Choose:

- Deck name
- Card mode
- Card font
- AivisSpeech voice
- Speech speed
- Whether to generate word audio
- Whether to generate example audio

Then click **Create recommended Anki setup**.

If the note type already exists, the app updates:

- Front template
- Back template
- Card CSS
- Missing fields

## Anki Note Type

Default note type:

```text
signife_anki_helper
```

It uses 13 fields:

| Field | Description |
|---|---|
| `CardMode` | `jp-jp` or `jp-native` |
| `Word` | Japanese headword |
| `Reading` | Full hiragana reading |
| `Definition` | Japanese definition |
| `NativeMeaning` | Meaning in the user's language |
| `Expressions` | Common expressions |
| `Examples` | Example sentences |
| `Synonyms` | Synonyms |
| `KanjiData` | Per-kanji information as JSON |
| `WordAudio` | Word audio tag |
| `ExamplesAudio` | Example audio tags |
| `WordAudioSource` | Word audio generation metadata |
| `ExamplesAudioSource` | Example audio generation metadata |

## Card Modes

### `jp-jp`

Shows the Japanese definition on the back.

```json
{
  "cardMode": "jp-jp"
}
```

### `jp-native`

Shows the native-language meaning on the back.

```json
{
  "cardMode": "jp-native"
}
```

## Card JSON Example

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

## GPT Prompt Example

```text
Create one card JSON object for signife_anki_helper from the following Japanese word.
Return JSON only. Do not include explanations or a code fence.

Fields:
cardMode, word, reading, definition, nativeMeaning,
expressions, examples, exampleReadings, synonyms, kanji.

Write reading as the complete and accurate hiragana reading of the headword.
Write exampleReadings in the same order as examples, using the full hiragana reading of each sentence.
Write kanji as an object containing the reading and meaning of each kanji in the headword.
Set cardMode to jp-native.
```

## Audio Generation Flow

```text
JSON input
→ choose reading or voiceText
→ AivisSpeech /audio_query
→ apply speedScale
→ AivisSpeech /synthesis
→ create WAV Blob
→ generate unique filename
→ AnkiConnect storeMediaFile
→ save [sound:filename.wav] in the field
```

Example filenames:

```text
signife_word_1781741234567_a8d42f6b911c.wav
signife_example_1_1781741238912_f1920ed34b7a.wav
```

The card template does not guess filenames. It only renders:

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## Card Design

### Front

- Headword
- Reading revealed by holding the card
- Word audio button
- Matching font and word size on front and back

### Back

- Headword and reading
- Clickable per-kanji popup
- Word audio
- Japanese definition or native meaning
- Scrollable gray detail area
  - Examples
  - Example audio
  - Common expressions
  - Synonyms

The card font is selected in `config.js` and passed to `buildCardCss(fontStack)`.

## AivisSpeech Configuration

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

## Developer Setup

Normal users do not need this section.

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

To preview the actual card template:

```text
http://localhost:8000/templates_local_preview.html
```

## Troubleshooting

### AnkiConnect Connection Failed

Check:

- Anki is running
- AnkiConnect is installed
- The URL is `http://localhost:8765`
- Your site origin is included in `webCorsOriginList`
- Anki was restarted after the configuration change

### AivisSpeech Connection Failed

Check:

- AivisSpeech is running
- The URL is `http://127.0.0.1:10101`
- `http://127.0.0.1:10101/docs` opens
- The site origin is allowed
- AivisSpeech was restarted after the configuration change

### Card Design Did Not Update

1. Edit `js/templates.js`
2. Hard-refresh the browser
3. Click **Create recommended Anki setup** again
4. Check the note type templates in Anki

## Privacy

- Card JSON is not stored on this website.
- Card data is sent only to AnkiConnect on the user's computer.
- Audio synthesis is processed locally by AivisSpeech.
- Generated audio is stored in the Anki media collection.

## License

Add the repository license that matches your project, for example:

```text
MIT License
```
