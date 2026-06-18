# Anki Vocabulary Helper

<p align="center">
  <a href="./README.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <strong>한국어</strong>
</p>


<p align="center">
  <img src="./docs/images/anki-card-preview.png" alt="Anki vocabulary card preview" width="760">
</p>

<p align="center">
  일본어 단어 JSON을 Anki에 추가하고 AivisSpeech로 단어·예문 음성을 자동 생성하는 정적 웹 도구입니다.
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


## 주요 기능

- ChatGPT가 생성한 카드 JSON을 AnkiConnect로 직접 추가
- 한 장 또는 여러 장의 카드 일괄 처리
- JSON 배열, 여러 JSON 객체, JSON/TXT 파일 지원
- AivisSpeech 로컬 API로 단어 및 예문 음성 생성
- 고유한 WAV 파일명으로 Anki 미디어에 저장
- 일본어 → 일본어 / 일본어 → 모국어 카드 모드
- 영어, 일본어, 한국어, 중국어 UI
- Anki 노트 타입, 13개 필드, 템플릿, CSS 자동 생성 및 갱신
- 뒷면 한자 클릭 팝업
- 앞면 길게 누르기로 읽기와 숨김 정보 표시
- PC와 모바일 대응 반응형 카드
- 실제 `templates.js`를 사용하는 로컬 미리보기

## 요구사항

웹페이지 자체는 설치할 필요가 없습니다. GitHub Pages에 접속해서 사용합니다.

1. **[Anki Desktop](https://apps.ankiweb.net/)**
2. **[AnkiConnect add-on](https://ankiweb.net/shared/info/2055492159)**
   - 애드온 코드: `2055492159`
3. **[AivisSpeech](https://github.com/Aivis-Project/AivisSpeech)**
4. 최신 Chrome 또는 Edge

일반 사용자는 Node.js, npm, Python, 별도 백엔드 서버가 필요하지 않습니다.

## 사용자 설정

### 1. AnkiConnect 설치

```text
도구
→ 부가 기능
→ 부가 기능 가져오기
→ 코드: 2055492159
```

설치 후 Anki를 재시작합니다.

### 2. AnkiConnect CORS 설정

```text
도구
→ 부가 기능
→ AnkiConnect
→ 설정
```

`webCorsOriginList`에 GitHub Pages Origin을 추가합니다.

```json
{
  "webCorsOriginList": [
    "https://signife.github.io"
  ]
}
```

저장 후 Anki를 재시작합니다.

### 3. AivisSpeech 설치 및 실행

기본 API 주소:

```text
http://127.0.0.1:10101
```

API 문서:

```text
http://127.0.0.1:10101/docs
```

필요한 경우 AivisSpeech에서 다음 Origin을 허용합니다.

```text
https://signife.github.io
```

설정 변경 후 AivisSpeech를 완전히 종료했다가 다시 실행합니다.

## 연결 확인

```text
AnkiConnect URL
http://localhost:8765
```

```text
Speech engine URL
http://127.0.0.1:10101
```

Anki와 AivisSpeech를 실행한 다음 웹페이지에서 **연결 테스트**를 누릅니다.

## 최초 Anki 설정

다음 항목을 선택합니다.

- 덱 이름
- 카드 모드
- 카드 글꼴
- AivisSpeech 보이스
- 말하기 속도
- 단어 음성 생성 여부
- 예문 음성 생성 여부

이후 **추천 Anki 설정 만들기**를 누릅니다.

## 노트 타입

기본 이름:

```text
signife_anki_helper
```

13개 필드를 사용합니다.

| Field | 설명 |
|---|---|
| `CardMode` | `jp-jp` 또는 `jp-native` |
| `Word` | 일본어 표제어 |
| `Reading` | 표제어 전체 히라가나 독음 |
| `Definition` | 일본어 정의 |
| `NativeMeaning` | 모국어 뜻 |
| `Expressions` | 자주 쓰는 표현 |
| `Examples` | 예문 |
| `Synonyms` | 유의어 |
| `KanjiData` | 한자별 정보 JSON |
| `WordAudio` | 단어 음성 태그 |
| `ExamplesAudio` | 예문 음성 태그 |
| `WordAudioSource` | 단어 음성 생성 정보 |
| `ExamplesAudioSource` | 예문 음성 생성 정보 |

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
→ [sound:filename.wav] 저장
```

템플릿은 파일명을 추측하지 않고 다음 필드만 출력합니다.

```html
{{WordAudio}}
{{ExamplesAudio}}
```

## 개발자용 로컬 실행

일반 사용자에게는 필요하지 않습니다.

```bash
git clone <YOUR_REPOSITORY_URL>
cd anki-helper-modular
python -m http.server 8000
```

```text
http://localhost:8000
```

카드 템플릿 미리보기:

```text
http://localhost:8000/templates_local_preview.html
```

## 개인정보

- 카드 JSON은 웹사이트 서버에 저장되지 않습니다.
- 카드 데이터는 사용자 PC의 AnkiConnect로만 전송됩니다.
- 음성 합성은 로컬 AivisSpeech에서 처리됩니다.
- 생성된 음성은 Anki 미디어 컬렉션에 저장됩니다.
