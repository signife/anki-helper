# Anki Vocabulary Helper

<p align="center">
  <img src="./docs/images/anki-card-preview.png" alt="Anki vocabulary card preview" width="760">
</p>

<p align="center">
  일본어 단어 JSON을 붙여넣어 Anki 카드로 추가하고, AivisSpeech로 단어와 예문 음성을 자동 생성하는 정적 웹 도구입니다.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=111" alt="JavaScript">
  <img src="https://img.shields.io/badge/AnkiConnect-8765-4B8BBE" alt="AnkiConnect">
  <img src="https://img.shields.io/badge/AivisSpeech-10101-7C3AED" alt="AivisSpeech">
</p>

## 주요 기능

- ChatGPT가 생성한 카드 JSON을 AnkiConnect로 직접 추가
- 한 장 또는 여러 장의 카드 일괄 처리
- JSON 배열, 여러 JSON 객체, JSON/TXT 파일 불러오기 지원
- AivisSpeech 로컬 API를 통한 단어 및 예문 음성 생성
- 음성 파일을 고유한 WAV 파일명으로 Anki 미디어에 저장
- 일본어 → 일본어 / 일본어 → 모국어 카드 모드 지원
- 영어, 한국어, 일본어, 중국어 UI
- 카드 글꼴 선택 및 Anki 노트 타입 자동 생성
- 단어의 한자를 클릭하면 개별 한자 정보 팝업 표시
- PC와 모바일 화면을 고려한 반응형 카드 디자인
- 앞면을 길게 누르면 루비와 한자 정보 표시
- 실제 `templates.js`를 불러오는 로컬 카드 미리보기 지원

## Requirements

다음 프로그램이 필요합니다.

1. **Anki Desktop**
2. **AnkiConnect add-on**
   - Add-on code: `2055492159`
3. **AivisSpeech**
   - 로컬 음성 합성 엔진
4. 최신 Chrome 또는 Edge 권장

이 프로젝트는 GitHub Pages에서 실행되는 정적 웹사이트이므로 별도의 백엔드 서버는 필요하지 않습니다.

## 프로젝트 구조

```text
anki-helper-modular/
├─ index.html
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

## 사용자 설정

이 웹페이지 자체는 설치할 필요가 없습니다. 배포된 GitHub Pages 주소에 접속해서 사용합니다.

```text
https://signife.github.io/...
```

일반 사용자는 저장소 다운로드, Node.js, npm, Python 설치가 필요하지 않습니다.

### 1. Anki 설치

Anki Desktop을 설치하고 실행합니다.

### 2. AnkiConnect 설치

Anki에서 다음 순서로 설치합니다.

```text
Tools
→ Add-ons
→ Get Add-ons
→ Code: 2055492159
```

설치 후 Anki를 재시작합니다.

### 3. AnkiConnect CORS 설정

Anki에서 다음 메뉴를 엽니다.

```text
Tools
→ Add-ons
→ AnkiConnect
→ Config
```

`webCorsOriginList`에 GitHub Pages 주소를 추가합니다.

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

로컬 개발도 함께 사용하는 경우 다음 주소를 추가할 수 있습니다.

```json
{
  "webCorsOriginList": [
    "http://localhost",
    "http://127.0.0.1",
    "https://signife.github.io"
  ]
}
```

저장 후 Anki를 재시작합니다.

### 4. AivisSpeech 설치 및 실행

AivisSpeech를 설치하고 실행합니다.

기본 로컬 API 주소:

```text
http://127.0.0.1:10101
```

API 실행 확인:

```text
http://127.0.0.1:10101/docs
```

GitHub Pages에서 API 호출이 차단되는 경우 AivisSpeech 설정에서 다음 Origin을 허용합니다.

```text
https://signife.github.io
```

설정 변경 후 AivisSpeech를 완전히 종료했다가 다시 실행합니다.

## 연결 확인

1. Anki를 실행합니다.
2. AivisSpeech를 실행합니다.
3. 웹페이지를 엽니다.
4. 다음 값을 확인합니다.

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

5. **Test connection / 연결 테스트** 버튼을 누릅니다.
6. 초록색 체크가 표시되면 AnkiConnect와 AivisSpeech가 모두 준비된 상태입니다.

## 최초 Anki 설정

웹페이지의 연결 설정에서 다음 항목을 선택합니다.

- Deck name
- Card mode
- Card font
- AivisSpeech voice
- Speech speed
- 단어 음성 생성 여부
- 예문 음성 생성 여부

이후 **Create recommended Anki setup / 추천 Anki 설정 만들기**를 누릅니다.

이미 노트 타입이 존재하면 다음 항목이 갱신됩니다.

- 카드 앞면 템플릿
- 카드 뒷면 템플릿
- 카드 CSS
- 누락된 필드

## Anki 노트 타입

기본 노트 타입 이름:

```text
signife_anki_helper
```

총 13개 필드를 사용합니다.

| Field | 설명 |
|---|---|
| `CardMode` | `jp-jp` 또는 `jp-native` |
| `Word` | 일본어 표제어 |
| `Reading` | 표제어 전체 히라가나 독음 |
| `Definition` | 일본어 정의 |
| `NativeMeaning` | 한국어 등 모국어 뜻 |
| `Expressions` | 자주 쓰는 표현 |
| `Examples` | 예문 |
| `Synonyms` | 유의어 |
| `KanjiData` | 한자별 정보 JSON |
| `WordAudio` | 단어 음성 태그 |
| `ExamplesAudio` | 예문 음성 태그 |
| `WordAudioSource` | 단어 음성 생성 정보 |
| `ExamplesAudioSource` | 예문 음성 생성 정보 |

## 카드 모드

### `jp-jp`

뒷면에 일본어 정의를 표시합니다.

```json
{
  "cardMode": "jp-jp"
}
```

### `jp-native`

뒷면에 모국어 뜻을 표시합니다.

```json
{
  "cardMode": "jp-native"
}
```

## 카드 JSON 예시

```json
{
  "cardMode": "jp-native",
  "word": "正義",
  "reading": "せいぎ",
  "definition": "正しい道理。また、社会を公平に保つための正しい考え方。",
  "nativeMeaning": "정의, 올바른 도리",
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
    "正": "음독: セイ・ショウ / 훈독: ただしい・ただす",
    "義": "음독: ギ / 뜻: 사람이 지켜야 할 올바른 도리"
  }
}
```

## GPT 프롬프트 예시

```text
다음 일본어 단어를 signife_anki_helper용 카드 JSON 하나로 만들어줘.
JSON 이외의 설명과 코드 블록은 출력하지 마.

필드:
cardMode, word, reading, definition, nativeMeaning,
expressions, examples, exampleReadings, synonyms, kanji.

reading은 표제어 전체의 정확한 히라가나 독음으로 작성해.
exampleReadings는 examples와 같은 순서로 각 예문의 전체 히라가나 독음을 작성해.
kanji는 표제어에 포함된 각 한자의 읽기와 의미를 객체로 작성해.
cardMode는 jp-native로 작성해.
```

## 음성 생성 흐름

```text
JSON 입력
→ reading 또는 voiceText 선택
→ AivisSpeech /audio_query
→ speedScale 적용
→ AivisSpeech /synthesis
→ WAV Blob 생성
→ 고유 파일명 생성
→ AnkiConnect storeMediaFile
→ [sound:filename.wav] 필드 저장
```

생성되는 파일명 예시:

```text
signife_word_1781741234567_a8d42f6b911c.wav
signife_example_1_1781741238912_f1920ed34b7a.wav
```

템플릿은 파일명을 추측하지 않습니다.

```html
{{WordAudio}}
{{ExamplesAudio}}
```

Anki 필드에 저장된 실제 `[sound:...]` 태그를 그대로 재생하므로 파일명이 랜덤이어도 문제없습니다.

## WAV를 사용하는 이유

AivisSpeech 로컬 합성 결과는 WAV 형식으로 처리합니다.

장점:

- 별도 변환 라이브러리 불필요
- 브라우저에서 바로 AnkiConnect로 전송 가능
- 구현이 단순하고 안정적
- Anki PC 및 모바일에서 재생 가능

향후 MP3 변환을 추가하려면 다음 단계 사이에 변환 처리를 넣을 수 있습니다.

```text
AivisSpeech WAV Blob
→ ffmpeg.wasm
→ MP3 Blob
→ AnkiConnect 저장
```

카드 템플릿은 음성 필드만 출력하므로 MP3로 변경해도 수정할 필요가 없습니다.

## 카드 디자인

### 앞면

- 단어
- 길게 눌렀을 때 루비 표시
- 단어 음성 버튼
- 앞면과 뒷면의 단어 글꼴 및 크기 통일

### 뒷면

- 단어와 루비
- 개별 한자 클릭 팝업
- 단어 음성
- 일본어 정의 또는 모국어 뜻
- 회색 스크롤 영역
  - 예문
  - 예문 음성
  - 자주 쓰는 표현
  - 유의어

폰트는 `templates.js`에 고정하지 않고 `config.js`의 `CARD_FONT_STACKS`에서 선택한 값을 `buildCardCss(fontStack)`으로 전달합니다.

## 한자 팝업

`KanjiData`는 JSON 문자열로 Anki 필드에 저장됩니다.

예:

```json
{
  "正": "음독: セイ・ショウ / 훈독: ただしい・ただす",
  "義": "음독: ギ / 뜻: 사람이 지켜야 할 올바른 도리"
}
```

뒷면에서 한자를 클릭하면 해당 한자의 정보가 팝업으로 표시됩니다.

앞면에서는 한자 클릭 팝업을 사용하지 않고, 길게 누르기 동작으로 숨겨진 정보를 표시합니다.

## 글꼴 설정

글꼴은 `config.js`에서 관리합니다.

```js
export const CARD_FONT_STACKS = {
  "ms-mincho": '"MS Mincho", "Yu Mincho", serif',
  "yu-mincho": '"Yu Mincho", "MS Mincho", serif',
  "meiryo": '"Meiryo", "Yu Gothic", sans-serif'
};
```

`templates.js`에서는 전달받은 값만 사용합니다.

```js
export function buildCardCss(fontStack) {
  return `
    .card {
      font-family: ${fontStack};
    }
  `;
}
```

## AivisSpeech 공통 설정

음성 엔진 설정은 `config.js`에서 관리합니다.

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

UI와 음성 생성 코드는 `speechEngineUrl`, `speechEngineSpeaker`, `speechEngineSpeed` 같은 중립적인 이름을 사용합니다.

## 개발자용 로컬 실행

이 섹션은 저장소를 수정하거나 `templates.js`를 직접 테스트할 때만 필요합니다.

### 저장소 내려받기

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
```

### 로컬 서버 실행

ES Modules를 사용하므로 HTML 파일을 `file://`로 직접 열지 말고 로컬 서버를 사용합니다.

```bash
python -m http.server 8000
```

브라우저에서 접속:

```text
http://localhost:8000
```

일반 사용자는 이 과정을 진행할 필요가 없습니다.

## 카드 템플릿 로컬 미리보기

`templates_local_preview.html`을 프로젝트 루트에 둡니다.

```text
anki-helper-modular/
├─ templates_local_preview.html
└─ js/
   └─ templates.js
```

로컬 서버 실행 후:

```text
http://localhost:8000/templates_local_preview.html
```

이 페이지는 실제 `./js/templates.js`를 import해 앞면과 뒷면을 렌더링합니다.

`templates.js`를 수정한 후 새로고침하면 변경 결과를 바로 확인할 수 있습니다.

## 사용 순서

1. Anki 실행
2. AivisSpeech 실행
3. 웹페이지 열기
4. 연결 테스트
5. 최초 1회 추천 Anki 설정 생성
6. GPT에서 카드 JSON 생성
7. JSON 붙여넣기 또는 파일 불러오기
8. JSON 검사
9. Anki에 추가
10. PC 또는 모바일 Anki에서 동기화 및 학습

## 문제 해결

### AnkiConnect 연결 실패

확인할 내용:

- Anki가 실행 중인지
- AnkiConnect가 설치되어 있는지
- `http://localhost:8765`가 맞는지
- `webCorsOriginList`에 현재 사이트 주소가 있는지
- 설정 후 Anki를 재시작했는지

### AivisSpeech 연결 실패

확인할 내용:

- AivisSpeech가 실행 중인지
- API 주소가 `http://127.0.0.1:10101`인지
- `http://127.0.0.1:10101/docs`가 열리는지
- 사이트 Origin이 허용되어 있는지
- 설정 변경 후 AivisSpeech를 재시작했는지

### 기존 VOICEVOX 설정이 남아 있는 경우

이전 버전에서 브라우저 `localStorage`에 `50021` 포트가 저장되어 있을 수 있습니다.

설정 화면에서 다음 주소로 다시 저장합니다.

```text
http://127.0.0.1:10101
```

또는 사이트 데이터와 로컬 저장소를 초기화합니다.

### 카드 디자인이 갱신되지 않는 경우

1. `js/templates.js` 수정
2. 브라우저에서 강력 새로고침
3. **추천 Anki 설정 만들기** 다시 실행
4. Anki 카드 편집기에서 노트 타입 템플릿 갱신 확인

### 음성이 재생되지 않는 경우

- `WordAudio` 또는 `ExamplesAudio` 필드에 `[sound:...]`가 들어 있는지 확인
- Anki 미디어 파일이 동기화되었는지 확인
- 모바일 Anki에서 미디어 동기화를 완료했는지 확인

## Privacy

- 카드 JSON은 이 웹사이트의 서버에 저장되지 않습니다.
- 카드 데이터는 현재 PC의 AnkiConnect로 전송됩니다.
- 음성 합성은 로컬 AivisSpeech에서 처리됩니다.
- 생성된 음성은 Anki 미디어 컬렉션에 저장됩니다.

## License

프로젝트 라이선스를 저장소에 맞게 추가하세요.

```text
MIT License
```
