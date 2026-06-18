# Anki Vocabulary Helper

<p align="center">
  <a href="./README.md">English</a> ·
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
  일본어 어휘 카드를 Anki로 보내고, ruby 후리가나를 표시하며, AivisSpeech로 단어와 예문 음성을 생성하는 정적 웹 도구입니다.
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
- 카드 1개 또는 여러 개를 한 번에 처리
- JSON 배열, 여러 JSON 객체, JSON/TXT 파일 가져오기 지원
- 로컬 AivisSpeech API로 단어 음성과 예문 음성 생성
- 관용 표현과 예문에 ruby 후리가나 표시
- 카드 뒷면에서 후리가나 표시/숨김 전환
- 고유한 WAV 파일명으로 Anki 미디어에 음성 저장
- 일본어 → 일본어, 일본어 → 모국어 카드 모드 지원
- 영어, 일본어, 한국어, 중국어 웹 UI 지원
- Anki 노트 타입, 필드, 템플릿, CSS 자동 생성 및 업데이트
- 뒷면에서 한자를 클릭하면 한자 정보 팝업 표시
- 앞면을 길게 누르면 읽기와 숨겨진 한자 정보 표시
- 데스크톱과 모바일에 대응하는 반응형 카드 레이아웃

## 요구 사항

웹페이지 자체는 설치할 필요가 없습니다. 배포된 GitHub Pages 사이트를 브라우저에서 열면 됩니다.

필요한 로컬 애플리케이션:

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect 애드온](https://ankiweb.net/shared/info/2055492159)**
   - 애드온 코드: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. 최신 버전의 Chrome 또는 Edge

일반 사용에는 백엔드 서버, Node.js, npm, Python 설치가 필요하지 않습니다.

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
│     └─ anki-card-preview.png
```

## 사용자 설정

### 1. Anki 설치

Anki Desktop을 설치하고 실행합니다.

### 2. AnkiConnect 설치

Anki에서 다음 순서로 진행합니다.

```text
도구
→ 추가 기능
→ 추가 기능 가져오기
→ 코드: 2055492159
```

설치 후 Anki를 다시 시작합니다.

### 3. AnkiConnect CORS 설정

다음을 엽니다.

```text
도구
→ 추가 기능
→ AnkiConnect
→ 설정
```

`webCorsOriginList`에 GitHub Pages origin을 추가합니다.

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

로컬 개발을 할 경우 다음 origin도 허용할 수 있습니다.

```json
{
  "webCorsOriginList": [
    "http://localhost",
    "http://127.0.0.1",
    "https://signife.github.io"
  ]
}
```

설정을 저장한 뒤 Anki를 다시 시작합니다.

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

브라우저 접근이 차단될 경우 AivisSpeech에서 다음 origin을 허용합니다.

```text
https://signife.github.io
```

설정을 변경한 뒤 AivisSpeech를 다시 시작합니다.

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

5. **Test connection**을 클릭합니다.
6. 초록색 체크가 표시되면 두 서비스가 모두 준비된 상태입니다.

## 초기 Anki 설정

다음을 선택합니다.

- 덱 이름
- 카드 모드
- 카드 글꼴
- AivisSpeech 음성
- 음성 속도
- 단어 음성 생성 여부
- 예문 음성 생성 여부

그 다음 **Create recommended Anki setup**을 클릭합니다.

노트 타입이 이미 존재하는 경우 앱은 다음 항목을 업데이트합니다.

- 앞면 템플릿
- 뒷면 템플릿
- 카드 CSS
- 누락된 필드

## Anki 노트 타입

기본 노트 타입:

```text
signife_anki_helper
```

13개의 필드를 사용합니다.

| 필드 | 설명 |
|---|---|
| `CardMode` | `jp-jp` 또는 `jp-native` |
| `Word` | 일본어 표제어 |
| `Reading` | 전체 히라가나 읽기 |
| `Definition` | 일본어 정의 |
| `NativeMeaning` | 사용자의 언어로 된 뜻 |
| `Expressions` | 자주 쓰이는 표현. HTML ruby 후리가나 사용 가능 |
| `Examples` | 예문. HTML ruby 후리가나 사용 가능 |
| `Synonyms` | 유의어 |
| `KanjiData` | 한자별 정보를 담은 JSON |
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

`expressions`와 `examples`에는 안전한 HTML ruby 태그를 넣을 수 있습니다. JSON 문자열 안에서는 Markdown을 사용하지 않습니다.

```json
{
  "cardMode": "jp-native",
  "word": "正義",
  "reading": "せいぎ",
  "definition": "正しい道理。また、社会を公平に保つための正しい考え方。",
  "nativeMeaning": "정의, 올바른 도리",
  "expressions": [
    "<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>を<ruby><rb>貫</rb><rt>つらぬ</rt></ruby>",
    "<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>を<ruby><rb>守</rb><rt>まも</rt></ruby>る",
    "<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>に<ruby><rb>反</rb><rt>はん</rt></ruby>する",
    "<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>の<ruby><rb>味方</rb><rt>みかた</rt></ruby>"
  ],
  "examples": [
    "<ruby><rb>彼</rb><rt>かれ</rt></ruby>は<ruby><rb>最後</rb><rt>さいご</rt></ruby>まで<ruby><rb>自分</rb><rt>じぶん</rt></ruby>の<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>を<ruby><rb>貫</rb><rt>つらぬ</rt></ruby>いた。",
    "それは<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>に<ruby><rb>反</rb><rt>はん</rt></ruby>する<ruby><rb>行為</rb><rt>こうい</rt></ruby>だ。"
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

복사 프롬프트는 영어, 일본어, 한국어, 중국어 UI에서 일관되게 동작하도록 영어로 작성되어 있습니다.

```text
Create one valid JSON object for the signife_anki_helper Anki note type from the following Japanese word or grammar expression.

Output JSON only.
Do not include explanations, markdown, or code fences.

Required fields:
cardMode, word, reading, definition, nativeMeaning, expressions, examples, exampleReadings, synonyms, kanji.

Rules:
1. cardMode must be "jp-native".
2. word must contain the target Japanese word or grammar expression.
3. reading must contain the full hiragana reading of the target word or expression.
4. definition must be a natural Japanese dictionary-style definition.
5. nativeMeaning must be a natural meaning in the user's native language.
6. expressions must contain 3 to 5 common collocations or fixed expressions.
7. examples must contain 2 natural Japanese example sentences.
8. exampleReadings must contain the full hiragana readings of examples, in the same order.
9. synonyms must contain 2 to 4 synonyms or similar expressions.
10. kanji must be an object. For each kanji in the target word, include its onyomi, kunyomi, and meaning.
11. If there is no information for a field, use [] or {}, not null.
12. The JSON must be valid. Do not add trailing commas.

Ruby rules for expressions and examples:
- In expressions and examples, add furigana to kanji by using HTML ruby tags.
- Use this exact format:
  <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>
- Do not add ruby tags to hiragana, katakana, particles, or punctuation.
- Do not use Markdown.
- Do not use bullet syntax inside JSON string values.
- Keep the sentence natural and readable.

Example of ruby format:
<ruby><rb>彼</rb><rt>かれ</rt></ruby>は<ruby><rb>最後</rb><rt>さいご</rt></ruby>まで<ruby><rb>自分</rb><rt>じぶん</rt></ruby>の<ruby><rb>正義</rb><rt>せいぎ</rt></ruby>を<ruby><rb>貫</rb><rt>つらぬ</rt></ruby>いた。

Output format:
{
  "cardMode": "jp-native",
  "word": "",
  "reading": "",
  "definition": "",
  "nativeMeaning": "",
  "expressions": [],
  "examples": [],
  "exampleReadings": [],
  "synonyms": [],
  "kanji": {}
}
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
→ 필드에 [sound:filename.wav] 저장
```

예시 파일명:

```text
signife_word_1781741234567_a8d42f6b911c.wav
signife_example_1_1781741238912_f1920ed34b7a.wav
```

카드 템플릿은 파일명을 추측하지 않습니다. 다음 필드만 렌더링합니다.

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## 카드 디자인

### 앞면

- 표제어
- 카드를 길게 눌렀을 때 읽기 표시
- 단어 음성 버튼
- 앞면과 뒷면의 글꼴 및 표제어 크기 통일

### 뒷면

- 표제어와 읽기
- 클릭 가능한 한자별 정보 팝업
- 단어 음성
- 일본어 정의 또는 모국어 뜻
- 표현과 예문용 후리가나 토글
- 스크롤 가능한 회색 상세 영역
  - ruby 후리가나를 포함할 수 있는 예문
  - 예문 음성
  - ruby 후리가나를 포함할 수 있는 자주 쓰이는 표현
  - 유의어

카드 글꼴은 `config.js`에서 선택되고 `buildCardCss(fontStack)`으로 전달됩니다. 폰트 스택은 설치된 시스템 글꼴을 사용하며, 일반적인 데스크톱 사용에는 내장 폰트 파일이 필요하지 않습니다.

## AivisSpeech 설정

```js
export const SPEECH_ENGINE = {
  id: "aivis-speech",
  name: "AivisSpeech",
  defaultUrl: "http://127.0.0.1:10101",
  websiteUrl: "https://aivis-project.com/",
  settingsUrl: "http://127.0.0.1:10101/setting",
  sourceName: "AivisSpeech"
};
```

## 개발자 설정

일반 사용자는 이 섹션이 필요하지 않습니다.

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

열기:

```text
http://localhost:8000
```

## 문제 해결

### AnkiConnect 연결 실패

확인할 사항:

- Anki가 실행 중인지
- AnkiConnect가 설치되어 있는지
- URL이 `http://localhost:8765`인지
- 사이트 origin이 `webCorsOriginList`에 포함되어 있는지
- 설정 변경 후 Anki를 다시 시작했는지

### AivisSpeech 연결 실패

확인할 사항:

- AivisSpeech가 실행 중인지
- URL이 `http://127.0.0.1:10101`인지
- `http://127.0.0.1:10101/setting`가 열리는지
- 사이트 origin이 허용되어 있는지
- 설정 변경 후 AivisSpeech를 다시 시작했는지

### 카드 디자인이 업데이트되지 않음

1. `js/templates.js` 또는 `js/app.js`를 수정합니다.
2. 브라우저를 강력 새로고침합니다.
3. **Create recommended Anki setup**을 다시 클릭합니다.
4. Anki에서 노트 타입의 템플릿과 스타일링을 확인합니다.

### ruby 후리가나가 표시되지 않음

확인할 사항:

- `expressions`와 `examples`가 Markdown이 아니라 HTML ruby 태그를 포함하고 있는지
- 앱이 ruby 지원 리스트 렌더러로 `Expressions`와 `Examples`를 저장하는지
- 뒷면 템플릿에 후리가나 토글 스크립트가 포함되어 있는지
- 템플릿 또는 CSS 변경 후 **Create recommended Anki setup**을 다시 클릭했는지

## 개인정보

- 카드 JSON은 이 웹사이트에 저장되지 않습니다.
- 카드 데이터는 사용자의 컴퓨터에서 실행 중인 AnkiConnect로만 전송됩니다.
- 음성 합성은 AivisSpeech에서 로컬로 처리됩니다.
- 생성된 음성은 Anki 미디어 컬렉션에 저장됩니다.

## 라이선스

프로젝트에 맞는 저장소 라이선스를 추가하세요. 예:

```text
MIT License
```
