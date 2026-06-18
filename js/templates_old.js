export function buildCardTemplates() {
  const front = `
<div class="card-shell card-front">
  <div class="word-area">
<ruby class="word-ruby">
  <rb id="frontWordCharacters" class="word-characters"></rb>
  <rt>{{Reading}}</rt>
</ruby>
<span id="frontWordSource" hidden>{{Word}}</span>
  </div>
  <div class="word-audio">{{WordAudio}}</div>
</div>

<script>
(() => {
  const sourceEl = document.getElementById("frontWordSource");
  const wordEl = document.getElementById("frontWordCharacters");
  if (!sourceEl || !wordEl) return;

  const rawWord = sourceEl.textContent || "";
  for (const character of Array.from(rawWord)) {
const span = document.createElement("span");
span.className = "word-character";
span.textContent = character;
wordEl.appendChild(span);
  }
})();
<\/script>`;

  const back = `
<div class="card-shell card-back">
  <div class="word-area">
<ruby class="word-ruby">
  <rb id="backWordCharacters" class="word-characters"></rb>
  <rt>{{Reading}}</rt>
</ruby>
<span id="backWordSource" hidden>{{Word}}</span>
<span id="backKanjiSource" hidden>{{KanjiData}}</span>
  </div>

  <div id="kanjiPopup" class="kanji-popup" hidden>
<strong id="kanjiPopupTitle"></strong>
<div id="kanjiPopupContent"></div>
  </div>

  <div class="word-audio">{{WordAudio}}</div>
  <div class="mode-source" data-card-mode="{{CardMode}}" hidden></div>

  <section id="definitionSection" class="section meaning-section">
<div class="definition">{{Definition}}</div>
  </section>

  <section id="nativeMeaningSection" class="section meaning-section native-meaning-section">
<div class="native-meaning">{{NativeMeaning}}</div>
  </section>

  {{#Examples}}
  <section class="section">
<h2>Examples</h2>
<div class="content-list">{{Examples}}</div>
<div class="examples-audio">{{ExamplesAudio}}</div>
  </section>
  {{/Examples}}

  {{#Expressions}}
  <section class="section">
<h2>Common expressions</h2>
<div class="content-list">{{Expressions}}</div>
  </section>
  {{/Expressions}}

  {{#Synonyms}}
  <section class="section">
<h2>Synonyms</h2>
<div class="content-list">{{Synonyms}}</div>
  </section>
  {{/Synonyms}}
</div>

<script>
(() => {
  const wordSourceEl = document.getElementById("backWordSource");
  const kanjiSourceEl = document.getElementById("backKanjiSource");
  const wordEl = document.getElementById("backWordCharacters");
  const popupEl = document.getElementById("kanjiPopup");
  const popupTitleEl = document.getElementById("kanjiPopupTitle");
  const popupContentEl = document.getElementById("kanjiPopupContent");

  if (
!wordSourceEl ||
!kanjiSourceEl ||
!wordEl ||
!popupEl ||
!popupTitleEl ||
!popupContentEl
  ) return;

  const rawWord = wordSourceEl.textContent || "";
  const rawKanji = kanjiSourceEl.textContent || "{}";

  let kanjiData = {};
  try {
kanjiData = JSON.parse(rawKanji);
  } catch (_) {
kanjiData = {};
  }

  const hidePopup = () => {
popupEl.hidden = true;
popupEl.style.visibility = "hidden";
  };

  const positionPopup = (target) => {
popupEl.hidden = false;
popupEl.style.visibility = "hidden";
popupEl.style.left = "0px";
popupEl.style.top = "0px";

requestAnimationFrame(() => {
  const targetRect = target.getBoundingClientRect();
  const popupRect = popupEl.getBoundingClientRect();
  const edge = 12;

  let left =
    targetRect.left +
    targetRect.width / 2 -
    popupRect.width / 2;

  left = Math.max(
    edge,
    Math.min(left, window.innerWidth - popupRect.width - edge)
  );

  // 팝업의 아래쪽이 한자 윗부분과 약 16px 겹치도록 배치한다.
  let top = targetRect.top - popupRect.height + 16;
  top = Math.max(edge, top);

  const arrowX =
    targetRect.left +
    targetRect.width / 2 -
    left;

  popupEl.style.left = left + "px";
  popupEl.style.top = top + "px";
  popupEl.style.setProperty("--arrow-x", arrowX + "px");
  popupEl.style.visibility = "visible";
});
  };

  for (const character of Array.from(rawWord)) {
const info = kanjiData[character];
const span = document.createElement("span");

span.textContent = character;
span.className = info
  ? "word-character word-character-clickable"
  : "word-character";

if (info) {
  span.setAttribute("role", "button");
  span.setAttribute("tabindex", "0");
  span.setAttribute("aria-label", character + " 한자 정보 보기");

  const showPopup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    popupTitleEl.textContent = character;
    popupContentEl.textContent = String(info);
    positionPopup(span);
  };

  span.addEventListener("click", showPopup);
  span.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      showPopup(event);
    }
  });
}

wordEl.appendChild(span);
  }

  popupEl.addEventListener("click", (event) => {
event.stopPropagation();
  });

  document.addEventListener("click", hidePopup);
  window.addEventListener("resize", hidePopup);
  window.addEventListener("scroll", hidePopup, true);

  const mode =
document.querySelector(".mode-source")?.dataset.cardMode ||
"jp-jp";
  const definition = document.getElementById("definitionSection");
  const nativeMeaning = document.getElementById("nativeMeaningSection");

  if (mode === "jp-native") {
if (definition) definition.hidden = true;
if (nativeMeaning) nativeMeaning.hidden = false;
  } else {
if (definition) definition.hidden = false;
if (nativeMeaning) nativeMeaning.hidden = true;
  }
})();
<\/script>`;

  return [{
    Name: "Japanese Dictionary Card",
    Front: front,
    Back: back
  }];
}

export function buildCardCss(fontStack) {
  return `
.card {
  margin: 0;
  padding: 24px;
  color: #f5f5f5;
  background: #262626;
  font-family: ${fontStack};
  font-size: 20px;
  line-height: 1.7;
  text-align: left;
}

.card-shell {
  width: min(760px, 100%);
  margin: 0 auto;
}

.card-front {
  min-height: 52vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.word-area {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
}

.word-ruby {
  font-family: ${fontStack} !important;
  font-size: clamp(2.6rem, 6vw, 3.6rem) !important;
  font-weight: 400 !important;
  line-height: 1.16 !important;
  letter-spacing: .035em !important;
  ruby-align: center;
}

.word-ruby rb,
.word-characters,
.word-character {
  font-family: ${fontStack} !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  font-style: normal !important;
  line-height: inherit !important;
  letter-spacing: inherit !important;
}

.word-ruby rt {
  color: #c8c8c8;
  font-family: ${fontStack} !important;
  font-size: .32em !important;
  font-weight: 400 !important;
  line-height: 1.15 !important;
  letter-spacing: .06em !important;
}

.word-characters {
  display: inline;
  white-space: nowrap;
}

.word-character {
  display: inline;
  padding: 0 .025em;
  color: inherit;
}

.word-character-clickable {
  cursor: pointer;
  border-radius: .08em;
  transition:
color .16s ease,
background .16s ease,
text-shadow .16s ease;
}

.word-character-clickable:hover,
.word-character-clickable:focus-visible {
  color: #ffffff;
  background: rgba(255,255,255,.08);
  outline: none;
  text-shadow: 0 0 14px rgba(255,255,255,.18);
}

.kanji-popup {
  position: fixed;
  z-index: 9999;
  width: min(360px, calc(100vw - 24px));
  margin: 0;
  padding: 15px 17px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 15px;
  color: #f7f7f7;
  background: rgba(18,18,18,.84);
  box-shadow: 0 18px 48px rgba(0,0,0,.48);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: ${fontStack};
  font-size: .94rem;
  line-height: 1.7;
  text-align: left;
  white-space: pre-wrap;
  visibility: hidden;
}

.kanji-popup[hidden] {
  display: none;
}

.kanji-popup::after {
  content: "";
  position: absolute;
  left: var(--arrow-x, 50%);
  bottom: -7px;
  width: 13px;
  height: 13px;
  border-right: 1px solid rgba(255,255,255,.24);
  border-bottom: 1px solid rgba(255,255,255,.24);
  background: rgba(18,18,18,.84);
  transform: translateX(-50%) rotate(45deg);
}

.kanji-popup strong {
  display: block;
  margin-bottom: 6px;
  color: #ffffff;
  font-family: ${fontStack};
  font-size: 1.45rem;
  font-weight: 500;
  line-height: 1.2;
}

.word-audio,
.examples-audio {
  margin-top: 18px;
  text-align: center;
}

.word-audio .replay-button,
.examples-audio .replay-button {
  margin-left: auto !important;
  margin-right: auto !important;
}

.replay-button {
  display: inline-grid !important;
  place-items: center;
  width: 50px !important;
  height: 50px !important;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 999px !important;
}

.replay-button svg {
  width: 30px !important;
  height: 30px !important;
}

.section {
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,.18);
}

.section h2 {
  margin: 0 0 12px;
  color: #bdbdbd;
  font-family: ${fontStack};
  font-size: .82rem;
  letter-spacing: .06em;
  text-transform: none;
}

.meaning-section {
  text-align: center;
}

.definition,
.native-meaning,
.content-list {
  color: #f1f1f1;
  font-family: ${fontStack};
  font-size: 1.08rem;
  line-height: 1.85;
}

.definition,
.native-meaning {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.native-meaning {
  font-size: 1.28rem;
  font-weight: 700;
}

.content-list {
  color: #e2e2e2;
}

.content-list ul {
  margin: 0;
  padding-left: 1.35em;
}

.content-list li {
  margin: .5em 0;
}

@media (max-width: 480px) {
  .card {
padding: 18px;
font-size: 17px;
  }

  .word-ruby {
font-size: clamp(2.2rem, 11vw, 3rem) !important;
  }

  .kanji-popup {
width: min(320px, calc(100vw - 18px));
padding: 13px 14px;
font-size: .88rem;
  }
}
`;
}
