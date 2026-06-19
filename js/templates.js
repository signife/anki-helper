export function buildCardTemplates() {
 const front = `
<div class="jlpt-card jlpt-front">
  <div class="front-center no-select">
    <div class="word-area">
      <div id="frontWordCharacters" class="word-ruby word-characters"></div>
      <span id="frontWordSource" hidden>{{Word}}</span>
    </div>

    <div class="front-extra front-hidden">
      {{#KanjiData}}<div class="front-kanji-data">{{KanjiData}}</div>{{/KanjiData}}
    </div>

    <div id="frontWordAudioStore" class="audio-store">{{WordAudio}}</div>
  </div>
</div>

<script>
(() => {
  const sourceEl = document.getElementById("frontWordSource");
  const wordEl = document.getElementById("frontWordCharacters");
  const pressArea = document.querySelector(".front-center");
  if (!sourceEl || !wordEl || !pressArea) return;

  for (const character of Array.from(sourceEl.textContent || "")) {
    const span = document.createElement("span");
    span.className = "word-character";
    span.textContent = character;
    wordEl.appendChild(span);
  }

  const hidden = pressArea.querySelectorAll(".front-hidden");
  let pressed = false;
  let timer = null;

  const show = () => hidden.forEach(el => el.classList.add("show"));
  const hide = () => hidden.forEach(el => el.classList.remove("show"));

  const start = event => {
    if (event.type === "touchstart") event.preventDefault();
    pressed = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (pressed) show();
    }, 500);
  };

  const end = () => {
    pressed = false;
    clearTimeout(timer);
    hide();
  };

  pressArea.addEventListener("mousedown", start);
  pressArea.addEventListener("mouseup", end);
  pressArea.addEventListener("mouseleave", end);
  pressArea.addEventListener("touchstart", start, { passive: false });
  pressArea.addEventListener("touchend", end, { passive: true });
  pressArea.addEventListener("touchcancel", end, { passive: true });
})();
<\/script>`;

  const back = `
<div class="jlpt-card jlpt-back">
  <div class="back-layout">
    <header class="back-header">
      <div class="word-area">
        <div id="backDisplayWord" class="word-ruby word-characters">
          {{furigana:FuriganaWord}}
        </div>
        <span id="backWordSource" hidden>{{Word}}</span>
        <span id="backKanjiSource" hidden>{{KanjiData}}</span>
      </div>

      <div id="kanjiPopup" class="kanji-popup" hidden>
        <strong id="kanjiPopupTitle"></strong>
        <div id="kanjiPopupContent"></div>
      </div>

      <div class="mode-source" data-card-mode="{{CardMode}}" hidden></div>

      <div id="wordAudioStore" class="audio-store">{{WordAudio}}</div>
      <div id="examplesAudioStore" class="audio-store">{{ExamplesAudio}}</div>
      <div id="synonymsAudioStore" class="audio-store">{{SynonymsAudio}}</div>

      <div class="meaning-divider"></div>

      <section id="definitionSection" class="meaning-section">
        <div class="definition">{{Definition}}</div>
      </section>

      <section id="nativeMeaningSection" class="meaning-section native-meaning-section">
        <div class="native-meaning">{{NativeMeaning}}</div>
      </section>

      <div class="meaning-divider"></div>
    </header>

    <div class="reading-controls">
      <label for="toggle-ruby" class="toggle-switch">
        <input type="checkbox" id="toggle-ruby">
        <span class="slider"></span>
        요미가나
      </label>
    </div>

    <main class="detail-tray">
      {{#Examples}}
      <section class="detail-section examples-section">
        <div class="content-list">{{Examples}}</div>
      </section>
      {{/Examples}}

      {{#Expressions}}
      <section class="detail-section expressions-section">
        <div class="detail-label">Common expressions</div>
        <div class="content-list">{{Expressions}}</div>
      </section>
      {{/Expressions}}

      {{#Synonyms}}
      <section class="detail-section synonyms-section">
        <div class="detail-label">Synonyms</div>
        <div class="content-list">{{Synonyms}}</div>
      </section>
      {{/Synonyms}}
    </main>
  </div>
</div>

<script>
(() => {
  const wordSourceEl = document.getElementById("backWordSource");
  const kanjiSourceEl = document.getElementById("backKanjiSource");
  const displayWordEl = document.getElementById("backDisplayWord");
  const popupEl = document.getElementById("kanjiPopup");
  const popupTitleEl = document.getElementById("kanjiPopupTitle");
  const popupContentEl = document.getElementById("kanjiPopupContent");

  const rawKanji = kanjiSourceEl?.textContent || "{}";

  let kanjiData = {};
  try {
    kanjiData = JSON.parse(rawKanji);
  } catch (_) {
    kanjiData = {};
  }

  const isKanji = character => /[\\u3400-\\u9FFF々]/.test(character);

  const hidePopup = () => {
    if (!popupEl) return;
    popupEl.hidden = true;
    popupEl.style.visibility = "hidden";
    document.querySelectorAll(".word-character.clicked").forEach(el => {
      el.classList.remove("clicked");
    });
  };

  const positionPopup = target => {
    if (!popupEl) return;

    popupEl.hidden = false;
    popupEl.style.visibility = "hidden";
    popupEl.style.left = "0px";
    popupEl.style.top = "0px";

    requestAnimationFrame(() => {
      const targetRect = target.getBoundingClientRect();
      const popupRect = popupEl.getBoundingClientRect();
      const edge = 10;

      let left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
      left = Math.max(edge, Math.min(left, window.innerWidth - popupRect.width - edge));

      let top = targetRect.bottom + 9;
      if (top + popupRect.height > window.innerHeight - edge) {
        top = Math.max(edge, targetRect.top - popupRect.height - 9);
      }

      popupEl.style.left = left + "px";
      popupEl.style.top = top + "px";
      popupEl.style.visibility = "visible";
    });
  };

  const attachKanjiPopup = span => {
    const character = span.textContent.trim();
    const info = kanjiData[character];

    if (!info || !popupEl || !popupTitleEl || !popupContentEl) return;

    span.classList.add("word-character-clickable");
    span.tabIndex = 0;
    span.setAttribute("role", "button");

    const showPopup = event => {
      event.preventDefault();
      event.stopPropagation();

      document.querySelectorAll(".word-character.clicked").forEach(el => {
        el.classList.remove("clicked");
      });

      span.classList.add("clicked");
      popupTitleEl.textContent = character;
      popupContentEl.textContent =
        typeof info === "string"
          ? info
          : JSON.stringify(info, null, 2);

      positionPopup(span);
    };

    span.addEventListener("click", showPopup);
    span.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") showPopup(event);
    });
  };

  const wrapKanjiTextNodes = root => {
    if (!root) return;

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest("rt, rp")) return NodeFilter.FILTER_REJECT;
          if (!node.textContent || !/[\\u3400-\\u9FFF々]/.test(node.textContent)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (const node of textNodes) {
      const fragment = document.createDocumentFragment();

      for (const character of Array.from(node.textContent)) {
        if (isKanji(character)) {
          const span = document.createElement("span");
          span.className = "word-character";
          span.textContent = character;
          attachKanjiPopup(span);
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(character));
        }
      }

      node.replaceWith(fragment);
    }
  };

  wrapKanjiTextNodes(displayWordEl);

  if (popupEl) {
    popupEl.addEventListener("click", event => event.stopPropagation());
    document.addEventListener("click", hidePopup);
    window.addEventListener("resize", hidePopup);
    window.addEventListener("scroll", hidePopup, true);
  }

  const mode = document.querySelector(".mode-source")?.dataset.cardMode || "jp-jp";
  const definition = document.getElementById("definitionSection");
  const nativeMeaning = document.getElementById("nativeMeaningSection");

  if (mode === "jp-native") {
    if (definition) definition.hidden = true;
    if (nativeMeaning) nativeMeaning.hidden = false;
  } else {
    if (definition) definition.hidden = false;
    if (nativeMeaning) nativeMeaning.hidden = true;
  }

  const toggleRuby = document.getElementById("toggle-ruby");
  const detailTray = document.querySelector(".detail-tray");

  if (toggleRuby) {
    const rts = [
      ...(displayWordEl ? displayWordEl.querySelectorAll("ruby rt") : []),
      ...(detailTray ? detailTray.querySelectorAll("ruby rt") : [])
    ];

    let rubyOn = localStorage.getItem("rubyOn");
    rubyOn = rubyOn === null ? true : rubyOn === "true";

    toggleRuby.checked = rubyOn;

    const updateRuby = () => {
      rts.forEach(rt => {
        rt.style.display = toggleRuby.checked ? "" : "none";
      });
    };

    updateRuby();

    toggleRuby.addEventListener("change", () => {
      localStorage.setItem("rubyOn", String(toggleRuby.checked));
      updateRuby();
    });
  }

  const exampleItems = document.querySelectorAll(".examples-section .content-list li");
  const exampleButtons = document.querySelectorAll("#examplesAudioStore .replay-button");

  exampleItems.forEach((item, index) => {
    item.classList.add("clickable-audio");
    item.addEventListener("click", event => {
      event.stopPropagation();
      exampleButtons[index]?.click();
    });
  });

  const synonymItems = document.querySelectorAll(".synonyms-section .content-list li");
  const synonymButtons = document.querySelectorAll("#synonymsAudioStore .replay-button");

  synonymItems.forEach((item, index) => {
    item.classList.add("clickable-audio");
    item.addEventListener("click", event => {
      event.stopPropagation();
      synonymButtons[index]?.click();
    });
  });
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
* {
  box-sizing: border-box;
}

html,
body,
.card {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.card {
  color: #f5f5f5;
  background: #222;
  font-family: ${fontStack};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.65;
  text-align: left;
}

.jlpt-card {
  width: 100%;
  height: 100dvh;
}

.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.jlpt-front {
  display: block;
  padding: 0;
 
}

.front-center {
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  padding: 20px 18px 14px;
}

.back-layout {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  height: 100dvh;
  overflow: hidden;
}

.back-header {
  padding: 20px 18px 14px;
  
  text-align: center;
}

.word-area {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
}


.word-ruby,
.word-ruby rb,
.word-characters,
.word-character,
.word-ruby rt {
  font-synthesis: none;
}

.word-ruby {
  font-family: ${fontStack} !important;
  font-size: clamp(2.05rem, 5.8vw, 2.65rem) !important;
  font-weight: 400 !important;
  line-height: 1.15 !important;
  letter-spacing: .02em !important;
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
  color: #d0d0d0;
  font-family: ${fontStack} !important;
  font-size: .32em !important;
  font-weight: 400 !important;
  line-height: 1.1 !important;
  letter-spacing: .04em !important;
}

.word-character {
  display: inline;
  padding: 0 .018em;
  color: inherit;
}

.front-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity .25s ease, visibility .25s ease;
}

.front-hidden.show {
  opacity: 1;
  visibility: visible;
}

.front-extra {
  min-height: 1.8em;
  margin-top: 8px;
  color: #d7d7d7;
  font-size: 1rem;
  text-align: center;
}

.word-audio,
.examples-audio {
  margin-top: 14px;
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
  width: 46px !important;
  height: 46px !important;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 50% !important;
}

.replay-button svg {
  width: 31px !important;
  height: 31px !important;
}

.meaning-divider {
  width: min(700px, 100%);
  height: 1px;
  margin: 15px auto;
  background: rgba(255,255,255,.22);
}

.reading-controls {
  position: relative;
  z-index: 5;
  padding: 0 18px 10px;
  text-align: center;
}

.detail-tray {
  position: relative;
  z-index: 1;
}

.toggle-switch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #ddd;
  font-family: ${fontStack};
  font-size: .85rem;
  font-weight: 400;
  line-height: 1.3;
  cursor: pointer;
  user-select: none;
}

.toggle-switch input {
  cursor: pointer;
}

.slider {
  display: inline-block;
}

.meaning-section {
  min-height: 1.7em;
  padding: 0 8px;
  text-align: center;
}

.audio-store {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.clickable-audio {
  cursor: pointer;
}

.clickable-audio:active {
  opacity: .72;
}

.definition {
  max-width: 700px;
  margin: 0 auto;
  color: #fff;
  font-family: ${fontStack};
  font-size: clamp(1.1rem, 3.2vw, 1.45rem);
  font-weight: 400;
  line-height: 1.45;
  text-align: center;
}

.native-meaning {
  max-width: 700px;
  margin: 0 auto;
  color: #fff;
  font-family: ${fontStack};
  font-size: clamp(1.15rem, 3.4vw, 1.55rem);
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
}
.detail-tray {
  width: min(700px, calc(100% - 36px));
  min-height: 0;
  margin: 0 auto 14px;
  padding: 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  color: #151515;
  background: rgba(176,176,176,.88);
  border-radius: 10px;
}

.detail-tray::-webkit-scrollbar {
  display: none;
}

.detail-section {
  margin: 0;
  padding: 0;
}

.detail-section + .detail-section {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(40,40,40,.25);
}

.detail-label {
  margin-bottom: 10px;
  color: #252525;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
}

.content-list {
  color: #111;
  font-family: ${fontStack};
  font-size: 1.15rem;
  line-height: 1.8;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: anywhere;
}

.content-list p:first-child,
.content-list ul:first-child,
.content-list ol:first-child {
  margin-top: 0;
}

.content-list p:last-child,
.content-list ul:last-child,
.content-list ol:last-child {
  margin-bottom: 0;
}

.content-list ul,
.content-list ol {
  margin-left: 0;
  padding-left: 0;
  list-style: none;
  text-align: center;
}
.content-list li {
  margin: .65em 0;
  text-align: center;
}

.content-list ruby {
  ruby-align: center;
}

.content-list ruby rt {
  color: #8d1717;
  font-family: ${fontStack};
  font-size: .58em;
  font-weight: 400;
  line-height: 1;
}

.word-character-clickable {
  cursor: pointer;
  border-radius: .08em;
}

.word-character-clickable.clicked {
  color: #d32f2f;
  font-weight: 400 !important;
  transform: scale(1.06);
}

.kanji-popup {
  position: fixed;
  z-index: 9999;
  width: min(360px, calc(100vw - 20px));
  padding: 13px 15px;
  border: 1px solid rgba(255,255,255,.28);
  border-radius: 10px;
  color: #eee;
  background: rgba(28,28,28,.96);
  box-shadow: 0 12px 34px rgba(0,0,0,.45);
  font-family: ${fontStack};
  font-size: .9rem;
  line-height: 1.6;
  text-align: left;
  white-space: pre-wrap;
  visibility: hidden;
}

.kanji-popup[hidden] {
  display: none;
}

.kanji-popup strong {
  display: block;
  margin-bottom: 5px;
  color: #fff;
  font-size: 1.35rem;
  line-height: 1.2;
  text-align: center;
}

@media (max-width: 480px) {
  .front-center,
  .back-header {
    padding: 16px 12px 11px;
  }

  .word-ruby {
    font-size: clamp(1.95rem, 9.5vw, 2.45rem) !important;
  }

 .definition {
  font-size: clamp(1rem, 4.4vw, 1.25rem);
}

.native-meaning {
  font-size: clamp(1.05rem, 4.8vw, 1.35rem);
}

  .detail-tray {
  width: min(700px, calc(100% - 24px));
  margin: 0 auto 10px;
  padding: 13px;
}
}
`;
}
