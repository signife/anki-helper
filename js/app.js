import { MODEL_NAME, CARD_FONT_STACKS, SPEECH_ENGINE } from "./config.js";
import { translations } from "./translations.js";
import { SAMPLE_CARDS } from "./samples.js";
import { buildCardTemplates, buildCardCss } from "./templates.js";

const $ = (selector) => document.querySelector(selector);

const elements = {
  root: document.documentElement,
  themeToggle: $("#themeToggle"),
  themeIcon: $("#themeIcon"),
  themeLabel: $("#themeLabel"),
  languageSelect: $("#languageSelect"),
  helpBtn: $("#helpBtn"),
  helpModal: $("#helpModal"),
  closeHelpBtn: $("#closeHelpBtn"),
  copyCorsBtn: $("#copyCorsBtn"),
  corsCode: $("#corsCode"),
  ankiUrl: $("#ankiUrl"),
  deckName: $("#deckName"),
  speechEngineUrl: $("#speechEngineUrl"),
  speechEngineSpeaker: $("#speechEngineSpeaker"),
  speechEngineSpeed: $("#speechEngineSpeed"),
  generateWordAudio: $("#generateWordAudio"),
  generateExampleAudio: $("#generateExampleAudio"),
  speechEngineStatus: $("#speechEngineStatus"),
  speechEngineStatusText: $("#speechEngineStatusText"),
  saveSettingsBtn: $("#saveSettingsBtn"),
  cardMode: $("#cardMode"),
  cardFont: $("#cardFont"),
  createSetupBtn: $("#createSetupBtn"),
  setupResult: $("#setupResult"),
  modeTooltipTitle: $("#modeTooltipTitle"),
  modeBackDiagram: $("#modeBackDiagram"),
  jsonInput: $("#jsonInput"),
  fileDropZone: $("#fileDropZone"),
  cardFileInput: $("#cardFileInput"),
  fileInfo: $("#fileInfo"),
  status: $("#status"),
  preview: $("#preview"),
  previewWord: $("#previewWord"),
  previewReading: $("#previewReading"),
  previewDefinitionSection: $("#previewDefinitionSection"),
  previewDefinition: $("#previewDefinition"),
  previewNativeSection: $("#previewNativeSection"),
  previewNativeMeaning: $("#previewNativeMeaning"),
  previewExpressions: $("#previewExpressions"),
  previewExamples: $("#previewExamples"),
  previewSynonyms: $("#previewSynonyms"),
  testConnectionBtn: $("#testConnectionBtn"),
  connectionIcon: $("#connectionIcon"),
  loadSampleBtn: $("#loadSampleBtn"),
  validateBtn: $("#validateBtn"),
  clearBtn: $("#clearBtn"),
  addBtn: $("#addBtn"),
  addButtonIcon: $("#addButtonIcon"),
  operationModal: $("#operationModal"),
  operationSpinner: $("#operationSpinner"),
  operationResultIcon: $("#operationResultIcon"),
  operationTitle: $("#operationTitle"),
  operationMessage: $("#operationMessage"),
  operationDetails: $("#operationDetails"),
  operationCloseBtn: $("#operationCloseBtn"),
  openAnkiConnectBtn: $("#openAnkiConnectBtn"),
  copyAnkiConnectCodeBtn: $("#copyAnkiConnectCodeBtn"),
  openSpeechEngineBtn: $("#openSpeechEngineBtn"),
  openSpeechEngineSettingBtn: $("#openSpeechEngineSettingBtn"),
  copyOriginBtn: $("#copyOriginBtn"),
  copyPromptBtn: $("#copyPromptBtn")
};


let currentLanguage = "en";

function t(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? key;
}

function setStatus(message, type = "") {
  elements.status.textContent = message;
  elements.status.className = `status ${type}`.trim();
}

function setConnectionState(state) {
  elements.testConnectionBtn.classList.remove("connected", "error");

  if (state === "connected") {
    elements.testConnectionBtn.classList.add("connected");
    elements.connectionIcon.textContent = "✓";
  } else if (state === "error") {
    elements.testConnectionBtn.classList.add("error");
    elements.connectionIcon.textContent = "✕";
  } else if (state === "loading") {
    elements.connectionIcon.innerHTML = '<span class="spin">◌</span>';
  } else {
    elements.connectionIcon.textContent = "●";
  }
}

function showOperationLoading(message) {
  elements.operationModal.hidden = false;
  document.body.classList.add("modal-open");
  elements.operationSpinner.hidden = false;
  elements.operationResultIcon.hidden = true;
  elements.operationDetails.hidden = true;
  elements.operationCloseBtn.hidden = true;
  elements.operationTitle.textContent = t("operationAddingTitle");
  elements.operationMessage.textContent = message || t("operationPreparing");
  elements.operationDetails.textContent = "";
}

function updateOperationProgress(message) {
  if (!elements.operationModal.hidden && !elements.operationSpinner.hidden) {
    elements.operationMessage.textContent = message;
  }
  setStatus(message);
}

function showOperationResult(success, message, details = "") {
  elements.operationModal.hidden = false;
  document.body.classList.add("modal-open");
  elements.operationSpinner.hidden = true;
  elements.operationResultIcon.hidden = false;
  elements.operationResultIcon.className = `operation-result-icon ${success ? "success" : "error"}`;
  elements.operationResultIcon.textContent = success ? "✓" : "✕";
  elements.operationTitle.textContent = success
    ? t("operationSuccessTitle")
    : t("operationErrorTitle");
  elements.operationMessage.textContent = message;
  elements.operationDetails.textContent = details;
  elements.operationDetails.hidden = !details;
  elements.operationCloseBtn.hidden = false;
  elements.operationCloseBtn.focus();
}

function closeOperationModal() {
  if (!elements.operationSpinner.hidden) return;
  elements.operationModal.hidden = true;
  document.body.classList.remove("modal-open");
  elements.addBtn.focus();
}

function setAddButtonLoading(isLoading) {
  elements.addBtn.disabled = isLoading;
  elements.addBtn.setAttribute("aria-busy", String(isLoading));
  elements.addButtonIcon.innerHTML = isLoading
    ? '<span class="spin">◌</span>'
    : "＋";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listToHtml(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function sanitizeRubyHtml(value) {
  const template = document.createElement("template");
  template.innerHTML = String(value ?? "");

  const allowedTags = new Set(["RUBY", "RB", "RT", "RP", "BR"]);
  const walker = document.createTreeWalker(
    template.content,
    NodeFilter.SHOW_ELEMENT
  );

  const elementsToRemove = [];

  while (walker.nextNode()) {
    const element = walker.currentNode;

    if (!allowedTags.has(element.tagName)) {
      elementsToRemove.push(element);
      continue;
    }

    for (const attribute of Array.from(element.attributes)) {
      element.removeAttribute(attribute.name);
    }
  }

  for (const element of elementsToRemove) {
    element.replaceWith(document.createTextNode(element.textContent || ""));
  }

  return template.innerHTML;
}

function rubyListToHtml(items) {
  if (!Array.isArray(items) || items.length === 0) return "";

  return `<ul>${items
    .map(item => `<li class="ruby-list-item">${sanitizeRubyHtml(item)}</li>`)
    .join("")}</ul>`;
}

function kanjiToJson(kanji) {
  if (!kanji || typeof kanji !== "object") return "{}";
  return JSON.stringify(kanji);
}

function fillList(target, items) {
  target.innerHTML = "";
  for (const item of items ?? []) {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  }
}

function getNativeSampleKey() {
  if (currentLanguage === "ko") return "jp-ko";
  if (currentLanguage === "zh") return "jp-zh";
  return "jp-en";
}

function getCurrentSampleCard() {
  const mode = currentLanguage === "ja" ? "jp-jp" : elements.cardMode.value;
  const source = mode === "jp-jp"
    ? SAMPLE_CARDS["jp-jp"]
    : SAMPLE_CARDS[getNativeSampleKey()];

  return JSON.parse(JSON.stringify({ ...source, cardMode: mode }));
}

function validateCard(card) {
  if (!card || typeof card !== "object" || Array.isArray(card)) {
    throw new Error("JSON top-level value must be an object.");
  }

  if (!card.cardMode) {
    card.cardMode = elements.cardMode.value || "jp-jp";
  }

  if (!["jp-jp", "jp-native"].includes(card.cardMode)) {
    throw new Error('cardMode must be either "jp-jp" or "jp-native".');
  }

  if (!card.word || typeof card.word !== "string") {
    throw new Error("word is required.");
  }

  if (!card.reading || typeof card.reading !== "string") {
    throw new Error("reading is required.");
  }

  if (!card.definition || typeof card.definition !== "string") {
    throw new Error("definition is required.");
  }

  if (card.cardMode === "jp-native" && !card.nativeMeaning) {
    throw new Error("nativeMeaning is required when cardMode is jp-native.");
  }

  for (const key of ["expressions", "examples", "synonyms"]) {
    if (card[key] !== undefined && !Array.isArray(card[key])) {
      throw new Error(`${key} must be an array.`);
    }
  }

  if (
    card.exampleReadings !== undefined &&
    !Array.isArray(card.exampleReadings)
  ) {
    throw new Error("exampleReadings must be an array.");
  }

  if (card.voiceText !== undefined && typeof card.voiceText !== "string") {
    throw new Error("voiceText must be a string.");
  }

  if (
    card.kanji !== undefined &&
    (typeof card.kanji !== "object" || Array.isArray(card.kanji) || card.kanji === null)
  ) {
    throw new Error("kanji must be an object.");
  }

  return card;
}

function stripJsonFence(raw) {
  const trimmed = String(raw || "").trim();
  const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return match ? match[1].trim() : trimmed;
}

function splitTopLevelJsonValues(raw) {
  const values = [];
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < raw.length; index += 1) {
    const character = raw[index];

    if (start === -1) {
      if (/\s|,/.test(character)) continue;
      if (character !== "{" && character !== "[") {
        throw new Error(`Unexpected character at position ${index + 1}: ${character}`);
      }
      start = index;
      depth = 1;
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === "{" || character === "[") {
      depth += 1;
    } else if (character === "}" || character === "]") {
      depth -= 1;

      if (depth === 0) {
        const segment = raw.slice(start, index + 1);
        values.push(JSON.parse(segment));
        start = -1;
      }
    }
  }

  if (start !== -1 || inString || depth !== 0) {
    throw new Error("The JSON appears to be incomplete.");
  }

  return values;
}

function normalizeCardCollection(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && Array.isArray(value.cards)) {
    return value.cards;
  }
  return [value];
}

function parseCardsFromText(rawText) {
  const raw = stripJsonFence(rawText);
  if (!raw) throw new Error("Please enter JSON or choose a file first.");

  let parsedValues;

  try {
    parsedValues = [JSON.parse(raw)];
  } catch (singleError) {
    try {
      parsedValues = splitTopLevelJsonValues(raw);
    } catch (multipleError) {
      throw new Error(`JSON syntax error: ${multipleError.message || singleError.message}`);
    }
  }

  const cards = parsedValues.flatMap(normalizeCardCollection);
  if (!cards.length) throw new Error("No cards were found in the JSON.");

  return cards.map((card, index) => {
    try {
      return validateCard(card);
    } catch (error) {
      const label = card && typeof card === "object" && card.word
        ? ` (${card.word})`
        : "";
      throw new Error(`Card ${index + 1}${label}: ${error.message}`);
    }
  });
}

function parseInputCards() {
  return parseCardsFromText(elements.jsonInput.value);
}

function parseInput() {
  const cards = parseInputCards();
  if (cards.length !== 1) {
    throw new Error(`This action expects one card, but ${cards.length} cards were found.`);
  }
  return cards[0];
}

function updatePreview(card) {
  elements.preview.hidden = false;
  elements.previewWord.textContent = card.word ?? "";
  elements.previewReading.textContent = card.reading ?? "";
  elements.previewDefinition.textContent = card.definition ?? "";
  elements.previewNativeMeaning.textContent = card.nativeMeaning ?? "";

  const isNative = card.cardMode === "jp-native";
  elements.previewDefinitionSection.style.display = isNative ? "none" : "block";
  elements.previewNativeSection.style.display = isNative ? "block" : "none";

  fillList(elements.previewExpressions, card.expressions);
  fillList(elements.previewExamples, card.examples);
  fillList(elements.previewSynonyms, card.synonyms);
}

function clearPreview() {
  elements.preview.hidden = true;
}

function clearFileInfo() {
  elements.fileInfo.hidden = true;
  elements.fileInfo.textContent = "";
  elements.cardFileInput.value = "";
}

function formatCardsForEditor(cards) {
  return JSON.stringify(cards.length === 1 ? cards[0] : cards, null, 2);
}

async function loadCardFile(file) {
  if (!file) return;

  const extension = file.name.toLowerCase().split(".").pop();
  if (!['json', 'txt'].includes(extension)) {
    setStatus(t("unsupportedFile"), "error");
    elements.fileInfo.hidden = false;
    elements.fileInfo.textContent = `${file.name} · ${t("unsupportedFile")}`;
    return;
  }

  try {
    const raw = await file.text();
    const cards = parseCardsFromText(raw);
    elements.jsonInput.value = formatCardsForEditor(cards);
    updatePreview(cards[0]);
    elements.fileInfo.hidden = false;
    elements.fileInfo.textContent = `${file.name} · ${cards.length} ${t("cardsDetected")}`;
    setStatus(`${t("fileLoaded")}: ${file.name} · ${cards.length} ${t("cardsDetected")}`, "success");
  } catch (error) {
    clearPreview();
    const message = `${t("fileReadFailed")}
${String(error.message || error)}`;
    setStatus(message, "error");
    elements.fileInfo.hidden = false;
    elements.fileInfo.textContent = message;
  }
}

function saveSettings(showMessage = false) {
  const settings = {
    ankiUrl: elements.ankiUrl.value.trim(),
    deckName: elements.deckName.value.trim(),
    speechEngineUrl: elements.speechEngineUrl.value.trim(),
    speechEngineSpeaker: elements.speechEngineSpeaker.value,
    speechEngineSpeed: elements.speechEngineSpeed.value,
    generateWordAudio: elements.generateWordAudio.checked,
    generateExampleAudio: elements.generateExampleAudio.checked,
    cardMode: elements.cardMode.value,
    cardFont: elements.cardFont.value
  };

  localStorage.setItem("anki-helper-settings", JSON.stringify(settings));
  localStorage.setItem("anki-helper-language", currentLanguage);
  localStorage.setItem("anki-helper-theme", elements.root.dataset.theme || "dark");

  if (showMessage) {
    setStatus(t("settingsSaved"), "success");
  }
}

function loadSettings() {
  const saved = localStorage.getItem("anki-helper-settings");
  if (!saved) return;

  try {
    const settings = JSON.parse(saved);
    if (settings.ankiUrl) elements.ankiUrl.value = settings.ankiUrl;
    if (settings.deckName) elements.deckName.value = settings.deckName;
    const savedEngineUrl = settings.speechEngineUrl || settings.voicevoxUrl;
    const savedSpeaker = settings.speechEngineSpeaker ?? settings.voicevoxSpeaker;
    const savedSpeed = settings.speechEngineSpeed || settings.voicevoxSpeed;

    if (savedEngineUrl) {
      elements.speechEngineUrl.value =
        savedEngineUrl.includes(":50021")
          ? SPEECH_ENGINE.defaultUrl
          : savedEngineUrl;
    }
    if (savedSpeaker !== undefined) {
      elements.speechEngineSpeaker.dataset.savedValue = String(savedSpeaker);
    }
    if (savedSpeed) elements.speechEngineSpeed.value = savedSpeed;
    if (settings.generateWordAudio !== undefined) elements.generateWordAudio.checked = Boolean(settings.generateWordAudio);
    if (settings.generateExampleAudio !== undefined) elements.generateExampleAudio.checked = Boolean(settings.generateExampleAudio);
    if (settings.cardMode) elements.cardMode.value = settings.cardMode;
    if (settings.cardFont) elements.cardFont.value = settings.cardFont;
  } catch {
    localStorage.removeItem("anki-helper-settings");
  }
}

function applyTheme(theme) {
  elements.root.dataset.theme = theme;
  localStorage.setItem("anki-helper-theme", theme);

  const isDark = theme === "dark";
  elements.themeIcon.textContent = isDark ? "☀️" : "🌙";
  elements.themeLabel.textContent = isDark ? t("lightMode") : t("darkMode");
}

function updateModeAvailability() {
  const isJapaneseUi = currentLanguage === "ja";

  if (isJapaneseUi) {
    elements.cardMode.value = "jp-jp";
    elements.cardMode.disabled = true;
    elements.cardMode.title = t("japaneseOnlyMode");
  } else {
    elements.cardMode.disabled = false;
    elements.cardMode.removeAttribute("title");
  }

  updateModeDetails();
}

function updateModeDetails() {
  const isNative = elements.cardMode.value === "jp-native";
  elements.modeTooltipTitle.textContent = isNative ? t("jpNative") : t("jpJp");
  elements.modeBackDiagram.innerHTML = isNative ? t("jpNativeBack") : t("jpJpBack");
  updateJsonPlaceholder();
}

function updateJsonPlaceholder() {
  elements.jsonInput.placeholder = JSON.stringify(getCurrentSampleCard(), null, 2);
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  localStorage.setItem("anki-helper-language", currentLanguage);
  elements.root.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
  elements.languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  applyTheme(elements.root.dataset.theme || "dark");
  updateModeAvailability();
}

function openHelp() {
  elements.helpModal.hidden = false;
  document.body.classList.add("modal-open");
  elements.closeHelpBtn.focus();
}

function closeHelp() {
  elements.helpModal.hidden = true;
  document.body.classList.remove("modal-open");
  elements.helpBtn.focus();
}

async function invoke(action, params = {}) {
  const url = elements.ankiUrl.value.trim() || "http://localhost:8765";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, version: 6, params })
  });

  if (!response.ok) {
    throw new Error(`AnkiConnect HTTP error: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}


function normalizeBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function setSpeechEngineStatus(message, type = "") {
  elements.speechEngineStatusText.textContent = message;
  elements.speechEngineStatus.className = `voicevox-status ${type}`.trim();
}

async function speechEngineRequest(path, options = {}) {
  const baseUrl = normalizeBaseUrl(elements.speechEngineUrl.value) || SPEECH_ENGINE.defaultUrl;
  const response = await fetch(`${baseUrl}${path}`, options);

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${SPEECH_ENGINE.name} HTTP ${response.status}${detail ? `: ${detail}` : ""}`);
  }

  return response;
}

async function loadSpeechEngineSpeakers({ quiet = false } = {}) {
  if (!quiet) setSpeechEngineStatus(`${SPEECH_ENGINE.name}를 자동으로 확인하는 중입니다…`);

  try {
    const [versionResponse, speakersResponse] = await Promise.all([
      speechEngineRequest("/version"),
      speechEngineRequest("/speakers")
    ]);

    const version = await versionResponse.json();
    const speakers = await speakersResponse.json();
    const savedValue =
      elements.speechEngineSpeaker.value ||
      elements.speechEngineSpeaker.dataset.savedValue ||
      "";

    elements.speechEngineSpeaker.innerHTML = "";

    for (const speaker of speakers) {
      for (const style of speaker.styles || []) {
        const option = document.createElement("option");
        option.value = String(style.id);
        option.textContent = `${speaker.name} — ${style.name}`;
        elements.speechEngineSpeaker.appendChild(option);
      }
    }

    if (
      savedValue &&
      [...elements.speechEngineSpeaker.options].some(option => option.value === String(savedValue))
    ) {
      elements.speechEngineSpeaker.value = String(savedValue);
    }

    delete elements.speechEngineSpeaker.dataset.savedValue;
    setSpeechEngineStatus(`${SPEECH_ENGINE.name} 사용 가능 · v${version}`, "success");
    saveSettings(false);
    return true;
  } catch (error) {
    setSpeechEngineStatus(`${SPEECH_ENGINE.name}가 꺼져 있습니다. 음성 생성 시 실행해주세요.`, "error");
    if (!quiet) console.warn(error);
    return false;
  }
}

async function synthesizeSpeech(text) {
  const cleanText = String(text || "").trim();
  if (!cleanText) throw new Error(`${SPEECH_ENGINE.name}로 읽을 텍스트가 비어 있습니다.`);

  const speaker = Number(elements.speechEngineSpeaker.value);
  if (!Number.isInteger(speaker)) {
    const connected = await loadSpeechEngineSpeakers();
    if (!connected || !elements.speechEngineSpeaker.value) {
      throw new Error(`${SPEECH_ENGINE.name}를 실행한 뒤 다시 시도하세요.`);
    }
  }

  const selectedSpeaker = Number(elements.speechEngineSpeaker.value);
  const queryResponse = await speechEngineRequest(
    `/audio_query?text=${encodeURIComponent(cleanText)}&speaker=${selectedSpeaker}`,
    { method: "POST" }
  );
  const query = await queryResponse.json();
  query.speedScale = Number(elements.speechEngineSpeed.value) || 1;

  const synthesisResponse = await speechEngineRequest(
    `/synthesis?speaker=${selectedSpeaker}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }
  );

  return synthesisResponse.blob();
}

async function blobToBase64(blob) {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

function makeAudioSource(text) {
  return JSON.stringify({
    text: String(text || "").trim(),
    speaker: Number(elements.speechEngineSpeaker.value),
    speed: Number(elements.speechEngineSpeed.value) || 1,
    engine: SPEECH_ENGINE.sourceName
  });
}

function createUniqueAudioFilename(kind) {
  const randomPart =
    globalThis.crypto?.randomUUID?.().replaceAll("-", "").slice(0, 12) ||
    Math.random().toString(36).slice(2, 14);

  return `signife_${kind}_${Date.now()}_${randomPart}.wav`;
}

async function synthesizeAndStore(text, kind) {
  const audioBlob = await synthesizeSpeech(text);
  const data = await blobToBase64(audioBlob);
  const filename = createUniqueAudioFilename(kind);
  const storedFilename = await invoke("storeMediaFile", { filename, data });
  return `[sound:${storedFilename}]`;
}

async function createAudioFields(card, progressPrefix = "") {
  const fields = {
    WordAudio: "",
    ExamplesAudio: "",
    WordAudioSource: "",
    ExamplesAudioSource: ""
  };

  if (elements.generateWordAudio.checked) {
    const wordVoiceText = String(card.voiceText || card.reading || card.word).trim();
    updateOperationProgress(`${progressPrefix}${SPEECH_ENGINE.name} 단어 음성 생성 중… ${card.word} (${wordVoiceText})`);
    fields.WordAudio = await synthesizeAndStore(wordVoiceText, "word");
    fields.WordAudioSource = makeAudioSource(wordVoiceText);
  }

  if (elements.generateExampleAudio.checked && Array.isArray(card.examples) && card.examples.length) {
    const audioTags = [];

    for (let index = 0; index < card.examples.length; index += 1) {
      const example = String(card.examples[index] || "").trim();
      if (!example) continue;

      const exampleVoiceText = String(
        Array.isArray(card.exampleReadings) && card.exampleReadings[index]
          ? card.exampleReadings[index]
          : example
      ).trim();

      updateOperationProgress(`${progressPrefix}${SPEECH_ENGINE.name} 예문 음성 생성 중… ${index + 1}/${card.examples.length}`);
      audioTags.push(await synthesizeAndStore(exampleVoiceText, `example_${index + 1}`));
    }

    fields.ExamplesAudio = audioTags.join(" ");
    fields.ExamplesAudioSource = makeAudioSource(card.examples.join("\n"));
  }

  return fields;
}

async function ensureSpeechEngineFieldsAndTemplates(modelName, fontStack) {
  const requiredFields = [
    "CardMode",
    "Word",
    "Reading",
    "Definition",
    "NativeMeaning",
    "Expressions",
    "Examples",
    "Synonyms",
    "KanjiData",
    "WordAudio",
    "ExamplesAudio",
    "WordAudioSource",
    "ExamplesAudioSource"
  ];

  const existingFields = await invoke("modelFieldNames", { modelName });

  for (const fieldName of requiredFields) {
    if (!existingFields.includes(fieldName)) {
      await invoke("modelFieldAdd", { modelName, fieldName });
    }
  }

  const templates = buildCardTemplates();

  await invoke("updateModelTemplates", {
    model: {
      name: modelName,
      templates: Object.fromEntries(
        templates.map(template => [
          template.Name,
          {
            Front: template.Front,
            Back: template.Back
          }
        ])
      )
    }
  });

  await invoke("updateModelStyling", {
    model: {
      name: modelName,
      css: buildCardCss(fontStack)
    }
  });
}

async function testConnection() {
  elements.testConnectionBtn.disabled = true;
  setConnectionState("loading");
  setStatus(t("connecting"));

  try {
    const version = await invoke("version");
    const speechEngineReady = await loadSpeechEngineSpeakers({ quiet: true });

    if (!speechEngineReady) {
      throw new Error(`${SPEECH_ENGINE.name} 연결 실패: 실행 상태와 CORS Allow Origin 설정을 확인하세요.`);
    }

    setConnectionState("connected");
    setStatus(`${t("connectionSuccess")} · AnkiConnect v${version} · ${SPEECH_ENGINE.name} ready`, "success");
  } catch (error) {
    setConnectionState("error");
    setStatus(`${t("connectionFailed")}
${String(error.message || error)}

${t("connectionHelp")}`, "error");
  } finally {
    elements.testConnectionBtn.disabled = false;
  }
}

async function createRecommendedSetup() {
  const deckName = elements.deckName.value.trim() || "Japanese";
  const modelName = MODEL_NAME;
  const fontStack = CARD_FONT_STACKS[elements.cardFont.value] || CARD_FONT_STACKS["ms-mincho"];

  elements.createSetupBtn.disabled = true;
  elements.setupResult.textContent = t("setupStarting");

  try {
    await invoke("version");

    const lines = [];
    const decks = await invoke("deckNames");

    if (decks.includes(deckName)) {
      lines.push(`${t("setupDeckExists")}: ${deckName}`);
    } else {
      await invoke("createDeck", { deck: deckName });
      lines.push(`${t("setupDeckCreated")}: ${deckName}`);
    }

    const models = await invoke("modelNames");

    if (models.includes(modelName)) {
      await ensureSpeechEngineFieldsAndTemplates(modelName, fontStack);
      lines.push(`${t("setupModelExists")}: ${modelName} · templates and CSS updated`);
    } else {
      await invoke("createModel", {
        modelName,
        inOrderFields: [
          "CardMode",
          "Word",
          "Reading",
          "Definition",
          "NativeMeaning",
          "Expressions",
          "Examples",
          "Synonyms",
          "KanjiData",
          "WordAudio",
          "ExamplesAudio",
          "WordAudioSource",
          "ExamplesAudioSource"
        ],
        css: buildCardCss(fontStack),
        isCloze: false,
        cardTemplates: buildCardTemplates()
      });

      lines.push(`${t("setupModelCreated")}: ${modelName}`);
    }

    saveSettings(false);
    lines.push(t("setupReady"));

    elements.setupResult.textContent = lines.join("\n");
    setStatus(t("setupReady"), "success");
  } catch (error) {
    const message = `${t("setupFailed")}\n${String(error.message || error)}`;
    elements.setupResult.textContent = message;
    setStatus(message, "error");
  } finally {
    elements.createSetupBtn.disabled = false;
  }
}

async function addOneCardToAnki(card, index, total) {
  const deckName = elements.deckName.value.trim();
  const modelName = MODEL_NAME;
  const progressPrefix = total > 1 ? `[${index}/${total}] ` : "";

  const audioFields = await createAudioFields(card, progressPrefix);

  const note = {
  deckName,
  modelName,
  fields: {
    CardMode: escapeHtml(card.cardMode),
    Word: escapeHtml(card.word),
    Reading: escapeHtml(card.reading),
    Definition: escapeHtml(card.definition),
    NativeMeaning: escapeHtml(card.nativeMeaning),
    Expressions: rubyListToHtml(card.expressions),
    Examples: rubyListToHtml(card.examples),
    Synonyms: listToHtml(card.synonyms),
    KanjiData: kanjiToJson(card.kanji),
    ...audioFields
  },
  options: {
    allowDuplicate: false,
    duplicateScope: "deck"
  },
  tags: ["Japanese", "ChatGPT", "AnkiHelper"]
};

  updateOperationProgress(`${progressPrefix}Anki에 저장하는 중… ${card.word}`);
  const noteId = await invoke("addNote", { note });
  return noteId;
}

async function addToAnki() {
  let cards;

  try {
    cards = parseInputCards();
    updatePreview(cards[0]);
  } catch (error) {
    const message = String(error.message || error);
    setStatus(message, "error");
    showOperationResult(false, t("addFailed"), message);
    return;
  }

  const deckName = elements.deckName.value.trim();
  if (!deckName) {
    const message = "Deck name is required.";
    setStatus(message, "error");
    showOperationResult(false, t("addFailed"), message);
    return;
  }

  setAddButtonLoading(true);
  showOperationLoading(`${t("adding")} · ${cards.length} card(s)`);

  const successes = [];
  const failures = [];

  try {
    updateOperationProgress(`${SPEECH_ENGINE.name}와 Anki 연결을 확인하는 중…`);
    await invoke("version");

    if (elements.generateWordAudio.checked || elements.generateExampleAudio.checked) {
      const speechEngineReady = await loadSpeechEngineSpeakers({ quiet: true });
      if (!speechEngineReady) {
        throw new Error(`${SPEECH_ENGINE.name} 연결 실패: 실행 상태와 CORS Allow Origin 설정을 확인하세요.`);
      }
    }

    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      const number = index + 1;

      try {
        updateOperationProgress(`[${number}/${cards.length}] ${card.word} 처리 중…`);
        const noteId = await addOneCardToAnki(card, number, cards.length);
        successes.push({ index: number, word: card.word, noteId });
      } catch (error) {
        failures.push({
          index: number,
          word: card.word || "(unknown)",
          error: String(error.message || error)
        });
      }
    }

    const summary = `${t("bulkSummary")} · 성공 ${successes.length} / 실패 ${failures.length} / 전체 ${cards.length}`;
    const details = [
      ...successes.map(item => `✓ ${item.index}. ${item.word} · Note ID: ${item.noteId}`),
      ...failures.map(item => `✕ ${item.index}. ${item.word}\n  ${item.error}`)
    ].join("\n");

    const allSucceeded = failures.length === 0;
    setStatus(summary, allSucceeded ? "success" : "warning");
    showOperationResult(allSucceeded, summary, details);

    if (allSucceeded) {
      elements.jsonInput.value = "";
      clearPreview();
      clearFileInfo();
    }
  } catch (error) {
    const message = String(error.message || error);
    setStatus(`${t("addFailed")}\n${message}`, "error");
    showOperationResult(false, t("addFailed"), message);
  } finally {
    setAddButtonLoading(false);
  }
}

elements.speechEngineUrl.addEventListener("change", async () => {
  saveSettings(false);
  await loadSpeechEngineSpeakers();
});

elements.speechEngineSpeaker.addEventListener("change", () => saveSettings(false));
elements.speechEngineSpeed.addEventListener("change", () => saveSettings(false));
elements.generateWordAudio.addEventListener("change", () => saveSettings(false));
elements.generateExampleAudio.addEventListener("change", () => saveSettings(false));

elements.themeToggle.addEventListener("click", () => {
  const next = elements.root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

elements.languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

elements.helpBtn.addEventListener("click", openHelp);
elements.closeHelpBtn.addEventListener("click", closeHelp);

elements.operationCloseBtn.addEventListener("click", closeOperationModal);

elements.operationModal.addEventListener("click", (event) => {
  if (
    event.target === elements.operationModal &&
    elements.operationSpinner.hidden
  ) {
    closeOperationModal();
  }
});

elements.openAnkiConnectBtn.addEventListener("click", () => {
  window.open("https://ankiweb.net/shared/info/2055492159", "_blank", "noopener");
});

elements.copyAnkiConnectCodeBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText("2055492159");
  elements.copyAnkiConnectCodeBtn.textContent = t("copied");
  setTimeout(() => {
    elements.copyAnkiConnectCodeBtn.textContent = t("copyAddonCode");
  }, 1400);
});

elements.openSpeechEngineBtn.addEventListener("click", () => {
  window.open(SPEECH_ENGINE.websiteUrl, "_blank", "noopener");
});

elements.openSpeechEngineSettingBtn.addEventListener("click", () => {
  window.open(SPEECH_ENGINE.settingsUrl, "_blank", "noopener");
});

elements.copyOriginBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText("https://signife.github.io");
  elements.copyOriginBtn.textContent = t("copied");
  setTimeout(() => {
    elements.copyOriginBtn.textContent = t("copyOrigin");
  }, 1400);
});

elements.copyPromptBtn.addEventListener("click", async () => {
  const prompt = `Create one valid JSON object for the signife_anki_helper Anki note type from the following Japanese word or grammar expression.

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
}`;
  await navigator.clipboard.writeText(prompt);
  elements.copyPromptBtn.textContent = t("copied");
  setTimeout(() => {
    elements.copyPromptBtn.textContent = t("copyPrompt");
  }, 1400);
});

elements.helpModal.addEventListener("click", (event) => {
  if (event.target === elements.helpModal) closeHelp();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!elements.helpModal.hidden) {
    closeHelp();
  } else if (
    !elements.operationModal.hidden &&
    elements.operationSpinner.hidden
  ) {
    closeOperationModal();
  }
});

elements.copyCorsBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(elements.corsCode.textContent);
    elements.copyCorsBtn.textContent = t("copied");

    setTimeout(() => {
      elements.copyCorsBtn.textContent = t("copy");
    }, 1400);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(elements.corsCode);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

elements.saveSettingsBtn.addEventListener("click", () => {
  saveSettings(true);
});

elements.cardMode.addEventListener("change", () => {
  if (currentLanguage === "ja") {
    elements.cardMode.value = "jp-jp";
  }

  updateModeDetails();

  const raw = elements.jsonInput.value.trim();
  if (raw) {
    try {
      const cards = parseCardsFromText(raw);
      cards.forEach(card => {
        card.cardMode = elements.cardMode.value;
      });
      elements.jsonInput.value = formatCardsForEditor(cards);
      updatePreview(cards[0]);
    } catch (_) {}
  }
});

elements.createSetupBtn.addEventListener("click", createRecommendedSetup);
elements.testConnectionBtn.addEventListener("click", testConnection);

elements.loadSampleBtn.addEventListener("click", () => {
  const sample = getCurrentSampleCard();
  elements.jsonInput.value = JSON.stringify(sample, null, 2);
  updatePreview(sample);
  setStatus(t("sampleLoaded"), "success");
});

elements.validateBtn.addEventListener("click", () => {
  try {
    const cards = parseInputCards();
    updatePreview(cards[0]);
    setStatus(`${t("jsonValid")} · ${cards.length} ${t("cardsDetected")}`, "success");
  } catch (error) {
    clearPreview();
    setStatus(error.message, "error");
  }
});

elements.clearBtn.addEventListener("click", () => {
  elements.jsonInput.value = "";
  clearPreview();
  clearFileInfo();
  setStatus(t("cleared"));
});

elements.fileDropZone.addEventListener("click", () => {
  elements.cardFileInput.click();
});

elements.fileDropZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    elements.cardFileInput.click();
  }
});

elements.cardFileInput.addEventListener("change", async (event) => {
  await loadCardFile(event.target.files?.[0]);
});

for (const eventName of ["dragenter", "dragover"]) {
  elements.fileDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    elements.fileDropZone.classList.add("dragover");
  });
}

for (const eventName of ["dragleave", "drop"]) {
  elements.fileDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    elements.fileDropZone.classList.remove("dragover");
  });
}

elements.fileDropZone.addEventListener("drop", async (event) => {
  const file = event.dataTransfer?.files?.[0];
  await loadCardFile(file);
});

elements.addBtn.addEventListener("click", addToAnki);

elements.jsonInput.addEventListener("input", () => {
  const raw = elements.jsonInput.value.trim();

  if (!raw) {
    clearPreview();
    return;
  }

  try {
    const cards = parseCardsFromText(raw);
    updatePreview(cards[0]);
  } catch {
    clearPreview();
  }
});

loadSettings();

if (!elements.speechEngineUrl.value.trim()) {
  elements.speechEngineUrl.value = SPEECH_ENGINE.defaultUrl;
}

applyTheme(localStorage.getItem("anki-helper-theme") || "dark");
applyLanguage(localStorage.getItem("anki-helper-language") || "en");
updateModeDetails();
loadSpeechEngineSpeakers({ quiet: true });
