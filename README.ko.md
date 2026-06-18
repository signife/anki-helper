# Anki Vocabulary Helper

<p align="center">
  <a href="./README.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <strong>한국어</strong>
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
  일본어 단어 카드를 Anki로 전송하고 AivisSpeech로 단어와 예문 음성을 생성하는 정적 웹 도구입니다.
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

## 기능

- ChatGPT가 생성한 카드 JSON을 AnkiConnect를 통해 Anki에 직접 추가
- 한 장 또는 여러 장의 카드를 한 번에 처리
- JSON 배열, 여러 JSON 객체, JSON/TXT 파일 불러오기
- 로컬 AivisSpeech API로 단어와 예문 음성 생성
- 고유한 WAV 파일명으로 음성을 Anki 미디어에 저장
- 일본어 → 일본어, 일본어 → 모국어 카드 모드 지원
- 영어, 일본어, 한국어, 중국어 웹 UI
- Anki 노트 타입, 필드, 템플릿, CSS 자동 생성 및 갱신
- 뒷면 한자를 클릭하면 한자 정보 팝업 표시
- 앞면을 길게 누르면 읽기와 숨겨진 한자 정보 표시
- 데스크톱과 모바일에 대응하는 반응형 카드 레이아웃
- 실제 `templates.js`를 로컬에서 미리보기

## 요구사항

웹페이지 자체를 설치할 필요는 없습니다. 배포된 웹 앱을 열어 사용하세요.

**https://signife.github.io/anki-helper/**

로컬 환경에 필요한 프로그램:

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect add-on](https://ankiweb.net/shared/info/2055492159)**
   - 애드온 코드: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. 최신 버전의 Chrome 또는 Edge

일반 사용 시 백엔드 서버, Node.js, npm, Python을 설치할 필요가 없습니다.

## 프로젝트 구조

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

## 사용자 설정

웹 앱을 엽니다.

**[https://signife.github.io/anki-helper/](https://signife.github.io/anki-helper/)**

### 1. Anki 설치

Anki Desktop을 설치하고 실행합니다.

### 2. AnkiConnect 설치

Anki에서 다음 순서로 진행합니다.

```text
도구
→ 부가 기능
→ 부가 기능 가져오기
→ 코드: 2055492159
```

설치 후 Anki를 재시작합니다.

### 3. AnkiConnect CORS 설정

다음 화면을 엽니다.

```text
도구
→ 부가 기능
→ AnkiConnect
→ 설정
```

GitHub Pages Origin을 `webCorsOriginList`에 추가합니다.

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

로컬 개발도 함께 하는 경우 다음 Origin도 허용할 수 있습니다.

```json
{
  "webCorsOriginList": [
    "http://localhost",
    "http://127.0.0.1",
    "https://signife.github.io"
  ]
}
```

설정을 저장하고 Anki를 재시작합니다.

### 4. AivisSpeech 설치 및 실행

AivisSpeech를 설치하고 실행합니다.

기본 로컬 API URL:

```text
http://127.0.0.1:10101
```

API 문서:

```text
http://127.0.0.1:10101/setting
```

브라우저 접근이 차단되는 경우 AivisSpeech에서 다음 Origin을 허용합니다.

```text
https://signife.github.io
```

설정을 변경한 후 AivisSpeech를 재시작합니다.

## 연결 확인

1. Anki를 실행합니다.
2. AivisSpeech를 실행합니다.
3. 배포된 웹페이지를 엽니다.
4. 다음 값을 확인합니다.

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

5. **연결 테스트**를 클릭합니다.
6. 초록색 체크가 표시되면 두 서비스 모두 사용할 준비가 된 상태입니다.

## Anki 최초 설정

다음 항목을 선택합니다.

- 덱 이름
- 카드 모드
- 카드 글꼴
- AivisSpeech 보이스
- 말하기 속도
- 단어 음성 생성 여부
- 예문 음성 생성 여부

그다음 **추천 Anki 설정 만들기**를 클릭합니다.

노트 타입이 이미 존재하면 앱이 다음 항목을 갱신합니다.

- 앞면 템플릿
- 뒷면 템플릿
- 카드 CSS
- 누락된 필드

## Anki 노트 타입

기본 노트 타입:

```text
signife_anki_helper
```

13개 필드를 사용합니다.

| Field | 설명 |
|---|---|
| `CardMode` | `jp-jp` 또는 `jp-native` |
| `Word` | 일본어 표제어 |
| `Reading` | 전체 히라가나 읽기 |
| `Definition` | 일본어 정의 |
| `NativeMeaning` | 사용자 언어로 된 뜻 |
| `Expressions` | 자주 쓰는 표현 |
| `Examples` | 예문 |
| `Synonyms` | 유의어 |
| `KanjiData` | 한자별 정보를 담는 JSON |
| `WordAudio` | 단어 음성 태그 |
| `ExamplesAudio` | 예문 음성 태그 |
| `WordAudioSource` | 단어 음성 생성 메타데이터 |
| `ExamplesAudioSource` | 예문 음성 생성 메타데이터 |

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

## GPT 프롬프트 예시

```text
다음 일본어 단어로 signife_anki_helper용 카드 JSON 객체 한 개를 만들어 주세요.
JSON 이외의 설명이나 코드 블록은 출력하지 마세요.

필드:
cardMode, word, reading, definition, nativeMeaning,
expressions, examples, exampleReadings, synonyms, kanji.

reading에는 표제어 전체의 정확한 히라가나 읽기를 작성하세요.
exampleReadings에는 examples와 같은 순서로 각 문장의 전체 히라가나 읽기를 작성하세요.
kanji에는 표제어에 포함된 각 한자의 읽기와 의미를 객체로 작성하세요.
cardMode는 jp-native로 설정하세요.
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
→ [sound:filename.wav]를 필드에 저장
```

파일명 예시:

```text
signife_word_1781741234567_a8d42f6b911c.wav
signife_example_1_1781741238912_f1920ed34b7a.wav
```

카드 템플릿은 파일명을 추측하지 않고 다음 필드만 출력합니다.

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## 카드 디자인

### 앞면

- 표제어
- 카드를 길게 눌렀을 때 표시되는 읽기
- 단어 음성 버튼
- 앞면과 뒷면에서 통일된 글꼴과 단어 크기

### 뒷면

- 표제어와 읽기
- 클릭 가능한 한자별 팝업
- 단어 음성
- 일본어 정의 또는 모국어 뜻
- 스크롤 가능한 회색 상세 영역
  - 예문
  - 예문 음성
  - 자주 쓰는 표현
  - 유의어

카드 글꼴은 `config.js`에서 선택되며 `buildCardCss(fontStack)`으로 전달됩니다.

## AivisSpeech 설정

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

## 개발자용 설정

일반 사용자에게는 이 섹션이 필요하지 않습니다.

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

다음 URL을 엽니다.

```text
http://localhost:8000
```

실제 카드 템플릿을 미리보려면 다음 URL을 엽니다.

```text
http://localhost:8000/templates_local_preview.html
```

## 문제 해결

### AnkiConnect 연결 실패

다음 항목을 확인하세요.

- Anki가 실행 중인지
- AnkiConnect가 설치되어 있는지
- URL이 `http://localhost:8765`인지
- 사이트 Origin이 `webCorsOriginList`에 포함되어 있는지
- 설정 변경 후 Anki를 재시작했는지

### AivisSpeech 연결 실패

다음 항목을 확인하세요.

- AivisSpeech가 실행 중인지
- URL이 `http://127.0.0.1:10101`인지
- `http://127.0.0.1:10101/docs`가 열리는지
- 사이트 Origin이 허용되어 있는지
- 설정 변경 후 AivisSpeech를 재시작했는지

### 카드 디자인이 갱신되지 않는 경우

1. `js/templates.js`를 수정합니다.
2. 브라우저를 강력 새로고침합니다.
3. **추천 Anki 설정 만들기**를 다시 클릭합니다.
4. Anki에서 노트 타입 템플릿을 확인합니다.

## 개인정보

- 카드 JSON은 이 웹사이트에 저장되지 않습니다.
- 카드 데이터는 사용자 컴퓨터의 AnkiConnect로만 전송됩니다.
- 음성 합성은 로컬 AivisSpeech에서 처리됩니다.
- 생성된 음성은 Anki 미디어 컬렉션에 저장됩니다.

## 라이선스

프로젝트에 맞는 저장소 라이선스를 추가하세요. 예:

```text
MIT License
```
