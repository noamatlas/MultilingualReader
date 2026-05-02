import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BookOpen, Edit3, Download, Upload, Volume2, CheckCircle, Clock, X, Globe, AlignLeft, Sparkles, StopCircle, BookA, Languages, Undo2, Search, ArrowDown, GraduationCap, Library, Save, Trash2, BookMarked, ChevronLeft, ChevronRight, Plus, Eye, EyeOff, MessageCircle, Send, Lightbulb, Minimize, Maximize, ChevronFirst, ChevronLast, LayoutList, Map, Info } from 'lucide-react';

const LANGUAGES = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'sq', name: 'Albanian' },
  { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hy', name: 'Armenian' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' },
  { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'et', name: 'Estonian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' },
  { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'jv', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'km', name: 'Khmer' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'ko', name: 'Korean' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' },
  { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' },
  { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' },
  { code: 'ny', name: 'Nyanja (Chichewa)' },
  { code: 'or', name: 'Odia (Oriya)' },
  { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' },
  { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' },
  { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tl', name: 'Tagalog (Filipino)' },
  { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' },
  { code: 'tt', name: 'Tatar' },
  { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' }
];

// Refined list per user specification to avoid transliterating Greek, Spanish, etc.
const TRANSLITERATE_LANGS = ['am', 'hy', 'eu', 'bn', 'ceb', 'zh-CN', 'zh-TW', 'ka', 'gu', 'ha', 'haw', 'hi', 'hmn', 'ig', 'id', 'ga', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'mg', 'ms', 'ml', 'mi', 'mr', 'mn', 'my', 'ne', 'ny', 'or', 'ps', 'fa', 'pa', 'sm', 'gd', 'st', 'sn', 'sd', 'si', 'so', 'su', 'sw', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'ur', 'ug', 'vi', 'cy', 'xh', 'yo', 'zu'];

const safeStorage = {
  memoryCache: {},
  getItem(key) {
    try {
      return localStorage.getItem(key) || this.memoryCache[key] || null;
    } catch (e) {
      return this.memoryCache[key] || null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      this.memoryCache[key] = value;
    }
  }
};

const formatMarkdown = (text) => {
  if (!text) return { __html: '' };
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^####\s+(.*$)/gim, '<h4 class="text-base font-extrabold mt-4 mb-1 text-indigo-900">$1</h4>')
    .replace(/^###\s+(.*$)/gim, '<h3 class="text-lg font-extrabold mt-4 mb-2 text-indigo-900">$1</h3>')
    .replace(/^##\s+(.*$)/gim, '<h2 class="text-xl font-extrabold mt-5 mb-2 text-indigo-900">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(?!\s)(.*?)\*/g, '<em class="italic text-indigo-800">$1</em>')
    .replace(/(?:^|\n)\*\s+(.*)/g, '\n<li class="ml-5 list-disc marker:text-indigo-400 mb-1">$1</li>');

  html = html.replace(/\n/g, '<br />');
  html = html.replace(/(<br \/>)+<li/g, '<li'); 
  html = html.replace(/<\/li>(<br \/>)+/g, '</li>'); 
  html = html.replace(/(<br \/>)+<h/g, '<h');

  return { __html: html };
};

const base64ToPcm = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Int16Array(bytes.buffer);
};

const pcmToWav = (pcmData, sampleRate = 24000) => {
  const wavBuffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(wavBuffer);
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
  };
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); 
  view.setUint16(22, 1, true); 
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); 
  view.setUint16(32, 2, true); 
  view.setUint16(34, 16, true); 
  writeString(view, 36, 'data');
  view.setUint32(40, pcmData.length * 2, true);
  let offset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(offset, pcmData[i], true);
    offset += 2;
  }
  return new Blob([view], { type: 'audio/wav' });
};

const splitIntoChunks = (text, maxSize = 600) => {
  const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) || [text];
  const chunks = [];
  let currentChunk = "";
  for (let sentence of sentences) {
    sentence = sentence.trim();
    if (!sentence) continue;
    if (currentChunk.length + sentence.length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks;
};

const tokenizeText = (text, langCode) => {
  if (!text || !langCode) return [];
  try {
    const segmenter = new Intl.Segmenter(langCode, { granularity: 'word' });
    return Array.from(segmenter.segment(text)).map((s, idx) => ({
      text: s.segment,
      isWordLike: s.isWordLike,
      arrayIndex: idx
    }));
  } catch (e) {
    const fallbackTokens = [];
    let index = 0;
    const parts = text.split(/([^\p{L}\p{M}]+)/gu);
    for (const part of parts) {
        const isWord = /^[\p{L}\p{M}]+$/u.test(part);
        fallbackTokens.push({ text: part, isWordLike: isWord, arrayIndex: index++ });
    }
    return fallbackTokens;
  }
};

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentLang, setCurrentLang] = useState(null); 
  const [hasTTS, setHasTTS] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isReading, setIsReading] = useState(false); 
  
  const [isLibraryVisible, setIsLibraryVisible] = useState(true);
  const [isVocabVisible, setIsVocabVisible] = useState(true);
  const [isPlanVisible, setIsPlanVisible] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  
  // Sentence Mode State
  const [isSentenceMode, setIsSentenceMode] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const [library, setLibrary] = useState([]);
  const [librarySearch, setLibrarySearch] = useState("");
  
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [activeChapters, setActiveChapters] = useState([]); 
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  
  const [isEditingBookTitle, setIsEditingBookTitle] = useState(false);
  const [isEditingChapterTitle, setIsEditingChapterTitle] = useState(false);

  // Study Plan State
  const [studyPlan, setStudyPlan] = useState([]); // Array of {id, title, description}
  const [activePlanChapterId, setActivePlanChapterId] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const planFileInputRef = useRef(null);

  const [vocab, setVocab] = useState({});
  const [vocabHistory, setVocabHistory] = useState([]); 
  const [translationCache, setTranslationCache] = useState({});
  const translationCacheRef = useRef(translationCache);
  const [romanizationCache, setRomanizationCache] = useState({});
  const romanizationCacheRef = useRef(romanizationCache);
  const [etymologyCache, setEtymologyCache] = useState({});
  const etymologyCacheRef = useRef(etymologyCache);
  
  const [selectedWords, setSelectedWords] = useState([]); 
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeSentence, setActiveSentence] = useState("");
  const [sentenceTranslation, setSentenceTranslation] = useState("");
  const [isTranslatingSentence, setIsTranslatingSentence] = useState(false);
  
  const [showFullTranslationToggle, setShowFullTranslationToggle] = useState(false);
  const [fullStoryTranslation, setFullStoryTranslation] = useState("");
  const [isTranslatingFullStory, setIsTranslatingFullStory] = useState(false);
  
  // Pre-Processing Summary State
  const [ppsData, setPpsData] = useState(null);
  const [isGeneratingPPS, setIsGeneratingPPS] = useState(false);
  const [showPPS, setShowPPS] = useState(false);

  const [infoPopup, setInfoPopup] = useState(null); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const [vocabSearch, setVocabSearch] = useState("");

  const [vocabTranslations, setVocabTranslations] = useState({});
  const [isVocabTranslating, setIsVocabTranslating] = useState({});

  const [storyTopic, setStoryTopic] = useState("");
  const [storyLevel, setStoryLevel] = useState("A0"); 
  const [storyMeta, setStoryMeta] = useState(""); 
  const [targetChapterLength, setTargetChapterLength] = useState(100);
  
  const [nextChapterTopic, setNextChapterTopic] = useState("");
  const [nextChapterMeta, setNextChapterMeta] = useState("");
  const [nextChapterLevel, setNextChapterLevel] = useState("A1");

  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  
  // Audio Speed State
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const audioSpeedRef = useRef(1.0);

  // Audio Voice State
  const [audioVoice, setAudioVoice] = useState('Aoede'); // 'Aoede' (Female), 'Puck' (Male)
  const audioVoiceRef = useRef('Aoede');

  // Conversational Roleplay State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); 
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollRef = useRef(null);

  const fileInputRef = useRef(null);
  const libraryFileInputRef = useRef(null);
  const currentAudioRef = useRef(null);
  const audioQueueRef = useRef([]);
  const audioBlobCacheRef = useRef({});
  const audioPromiseCacheRef = useRef({});
  const isPlayingSequenceRef = useRef(false);
  const playbackIdRef = useRef(0);
  const prevSelectedLengthRef = useRef(0);
  const [isPlayingFullStory, setIsPlayingFullStory] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isStoryAudioLoading, setIsStoryAudioLoading] = useState(false);

  // Sync audio speed dynamically to currently playing audio
  useEffect(() => {
    audioSpeedRef.current = audioSpeed;
    if (currentAudioRef.current) {
      currentAudioRef.current.playbackRate = audioSpeed;
    }
  }, [audioSpeed]);

  // Sync voice ref
  useEffect(() => {
    audioVoiceRef.current = audioVoice;
  }, [audioVoice]);

  const handleInputTextChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    setActiveChapters(prev => {
      const next = [...prev];
      if (next.length === 0) {
        next.push({ text: newText, level: storyLevel, meta: storyMeta, topic: storyTopic, chapterTitle: "Chapter 1" });
      } else {
        next[activeChapterIndex] = { ...next[activeChapterIndex], text: newText };
      }
      return next;
    });
  };

  const bodyTokens = useMemo(() => tokenizeText(inputText, currentLang?.code), [inputText, currentLang?.code]);
  const titleTokens = useMemo(() => tokenizeText(bookTitle, currentLang?.code), [bookTitle, currentLang?.code]);
  const chapterTitleStr = activeChapters[activeChapterIndex]?.chapterTitle || `Chapter ${activeChapterIndex + 1}`;
  const chapterTitleTokens = useMemo(() => tokenizeText(chapterTitleStr, currentLang?.code), [chapterTitleStr, currentLang?.code]);
  
  // Sentence Grouper for "One Sentence at a Time" Mode
  const sentenceTokensGroups = useMemo(() => {
    if (!bodyTokens.length) return [];
    try {
        const segmenter = new Intl.Segmenter(currentLang?.code || 'en', { granularity: 'sentence' });
        const sentences = Array.from(segmenter.segment(inputText));
        
        const groups = [];
        let tokenIdx = 0;
        
        for (const sent of sentences) {
            const sentText = sent.segment;
            const group = [];
            let assembled = "";
            while (tokenIdx < bodyTokens.length && assembled.length < sentText.length) {
                group.push(bodyTokens[tokenIdx]);
                assembled += bodyTokens[tokenIdx].text;
                tokenIdx++;
            }
            if (group.length > 0) groups.push(group);
        }
        
        const remainder = [];
        while (tokenIdx < bodyTokens.length) {
            remainder.push(bodyTokens[tokenIdx]);
            tokenIdx++;
        }
        if (remainder.length > 0 && groups.length > 0) {
            groups[groups.length - 1].push(...remainder);
        } else if (remainder.length > 0) {
            groups.push(remainder);
        }
        return groups.filter(g => g.some(t => /\S/.test(t.text)));
    } catch(e) {
        const groups = [];
        let currentGroup = [];
        for (let i = 0; i < bodyTokens.length; i++) {
          const token = bodyTokens[i];
          currentGroup.push(token);
          if (!token.isWordLike && /[.!?。！？\n]/.test(token.text)) {
              let j = i + 1;
              while (j < bodyTokens.length && !bodyTokens[j].isWordLike && /^[\s"”'»)]*$/.test(bodyTokens[j].text)) {
                 currentGroup.push(bodyTokens[j]);
                 j++;
              }
              groups.push(currentGroup);
              currentGroup = [];
              i = j - 1;
          }
        }
        if (currentGroup.length > 0) groups.push(currentGroup);
        return groups.filter(g => g.some(t => /\S/.test(t.text)));
    }
  }, [bodyTokens, inputText, currentLang?.code]);

  // Safeguard sentence index if text changes dramatically
  useEffect(() => {
    if (currentSentenceIndex >= sentenceTokensGroups.length && sentenceTokensGroups.length > 0) {
      setCurrentSentenceIndex(sentenceTokensGroups.length - 1);
    }
  }, [sentenceTokensGroups, currentSentenceIndex]);

  // Reset sentence index on chapter change
  useEffect(() => {
    setCurrentSentenceIndex(0);
    setShowPPS(false);
    setPpsData(null);
  }, [activeStoryId, activeChapterIndex, isSentenceMode]);

  const toggleSentenceMode = () => {
    setIsSentenceMode(!isSentenceMode);
    setShowFullTranslationToggle(false);
    setShowPPS(false);
    stopAudio();
    setSelectedWords([]);
  };

  // Tokenize chat messages
  const chatTokensArray = useMemo(() => {
    return chatMessages.map(msg => tokenizeText(msg.text, currentLang?.code));
  }, [chatMessages, currentLang?.code]);

  const tokensRef = useRef({});
  useEffect(() => {
    tokensRef.current = { body: bodyTokens, title: titleTokens, chapter: chapterTitleTokens, chat: chatTokensArray };
  }, [bodyTokens, titleTokens, chapterTitleTokens, chatTokensArray]);

  useEffect(() => {
    translationCacheRef.current = translationCache;
    romanizationCacheRef.current = romanizationCache;
    etymologyCacheRef.current = etymologyCache;
  }, [translationCache, romanizationCache, etymologyCache]);

  const cleanWord = (rawWord) => {
    if (!currentLang) return rawWord;
    return rawWord.replace(/[^\p{L}\p{M}]/gu, '').toLocaleLowerCase(currentLang.code);
  };

  useEffect(() => {
    if (!searchQuery.trim() || !isReading) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }
    const targetWords = searchQuery.split(/\s+/).map(w => cleanWord(w)).filter(Boolean);
    if (targetWords.length === 0) return;

    const results = [];
    for (let i = 0; i < bodyTokens.length; i++) {
      if (!bodyTokens[i].isWordLike) continue;
      let matchCount = 0;
      let tokenIndex = i;
      const currentMatchIndices = [];
      while (matchCount < targetWords.length && tokenIndex < bodyTokens.length) {
        if (bodyTokens[tokenIndex].isWordLike) {
          if (cleanWord(bodyTokens[tokenIndex].text) === targetWords[matchCount]) {
            currentMatchIndices.push(tokenIndex);
            matchCount++;
          } else { break; }
        } else {
          currentMatchIndices.push(tokenIndex); 
        }
        tokenIndex++;
      }
      if (matchCount === targetWords.length) results.push(currentMatchIndices);
    }
    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);
  }, [searchQuery, bodyTokens, isReading, currentLang]);

  const handleNextSearch = () => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex(prev => (prev + 1) % searchResults.length);
    }
  };

  useEffect(() => {
    if (!currentLang) return;
    setHasTTS(true); // Using Gemini TTS for everything now, which supports all provided languages.
  }, [currentLang?.code]);

  const callGeminiAPI = async (prompt, expectJson = false) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    
    if (expectJson) {
      payload.generationConfig = { responseMimeType: "application/json" };
    }
    
    const delays = [500, 1000, 2000, 4000, 8000];

    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      } catch (err) {
        if (i === 4) return null;
        await new Promise(r => setTimeout(r, delays[i]));
      }
    }
    return null;
  };

  const callGeminiChatAPI = async (history, sysInstruction) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ 
        text: msg.role === 'user' 
          ? msg.text 
          : JSON.stringify({ feedback: msg.feedback, hiddenTarget: msg.hiddenTarget, message: msg.text }) 
      }]
    }));

    const payload = {
      systemInstruction: { parts: [{ text: sysInstruction }] },
      contents: formattedHistory
    };
    
    const delays = [500, 1000, 2000, 4000, 8000];

    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      } catch (err) {
        if (i === 4) return null;
        await new Promise(r => setTimeout(r, delays[i]));
      }
    }
    return null;
  };

  const fetchGeminiAudio = async (text, langCode, langName, voiceName = "Aoede") => {
    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
    
    let promptText = `Say naturally and expressively in ${langName}: ${text}`;
    if (langCode === 'ar') {
      promptText = `Say naturally and expressively in Palestinian Arabic (اللَّهْجَة الْفِلَسْطِينِيَّة): ${text}`;
    } else if (langCode === 'zh-CN' || langCode === 'zh-TW') {
      promptText = `Say naturally and expressively in Mandarin Chinese (Simplified: 普通话 / Traditional: 普通話 | Pinyin: Pǔtōnghuà): ${text}`;
    } else if (langCode === 'el') {
      promptText = `Say naturally and expressively in clear Standard Modern Greek (Κοινή Νεοελληνική). Ensure crisp consonants (e.g. 'β' is 'v', 'λ' is 'l') and pure vowels (e.g. 'ω' is 'o'): ${text}`;
    }

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } } }
      }
    };

    try {
      const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
      const data = await res.json();
      const base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) return null;

      const pcm = base64ToPcm(base64Audio);
      const wavBlob = pcmToWav(pcm, 24000);
      return URL.createObjectURL(wavBlob);
    } catch (e) {
      console.error("Gemini TTS Error", e);
      return null;
    }
  };

  const getAudioUrl = async (text, lang, voice = "Aoede") => {
    const cacheKey = `${lang.code}_${voice}_${text}`;
    if (audioBlobCacheRef.current[cacheKey]) return audioBlobCacheRef.current[cacheKey];
    if (audioPromiseCacheRef.current[cacheKey]) return await audioPromiseCacheRef.current[cacheKey];
    
    const promise = fetchGeminiAudio(text, lang.code, lang.name, voice).then(url => {
      if (url) audioBlobCacheRef.current[cacheKey] = url;
      delete audioPromiseCacheRef.current[cacheKey];
      return url;
    });

    audioPromiseCacheRef.current[cacheKey] = promise;
    return await promise;
  };

  // INITIALIZATION
  useEffect(() => {
    const init = async () => {
      const savedLangCode = safeStorage.getItem('last_language');
      if (savedLangCode) {
        const lang = LANGUAGES.find(l => l.code === savedLangCode);
        if (lang) {
          setCurrentLang(lang);
          setVocab(JSON.parse(safeStorage.getItem(`vocab_${lang.code}`) || '{}'));
          setTranslationCache(JSON.parse(safeStorage.getItem(`cache_${lang.code}`) || '{}'));
          setRomanizationCache(JSON.parse(safeStorage.getItem(`rom_${lang.code}`) || '{}'));
          setEtymologyCache(JSON.parse(safeStorage.getItem(`etym_${lang.code}`) || '{}'));
          
          const savedSpeed = safeStorage.getItem('audio_speed');
          if (savedSpeed) setAudioSpeed(parseFloat(savedSpeed));
          
          const savedVoice = safeStorage.getItem('audio_voice');
          if (savedVoice) setAudioVoice(savedVoice);
          
          const rawLibrary = JSON.parse(safeStorage.getItem(`library_${lang.code}`) || '[]');
          const migratedLibrary = rawLibrary.map(item => {
             if (item.chapters) return item; 
             return {
                id: item.id,
                title: item.title,
                date: item.date,
                chapters: [{ text: item.text, level: item.level || 'A1', meta: item.meta || "", topic: item.topic || "", chapterTitle: item.chapterTitle || "Chapter 1" }]
             };
          });
          setLibrary(migratedLibrary);
          
          const savedPlan = JSON.parse(safeStorage.getItem(`plan_${lang.code}`) || '[]');
          setStudyPlan(savedPlan);
          
          const savedText = safeStorage.getItem(`text_${lang.code}`);
          if (savedText) {
            setInputText(savedText);
            setActiveChapters([{ text: savedText, level: "A1", meta: "", topic: "", chapterTitle: "Chapter 1" }]);
            setIsReading(true);
          } else {
            setInputText("");
            setIsReading(false);
          }
        }
      }
      setIsInitialized(true);
    };
    init();
  }, []);

  // Split Storage hooks to prevent mass re-renders and lag spikes
  useEffect(() => {
    if (isInitialized && currentLang) {
      safeStorage.setItem(`vocab_${currentLang.code}`, JSON.stringify(vocab));
    }
  }, [vocab, currentLang, isInitialized]);

  useEffect(() => {
    if (isInitialized && currentLang) {
      safeStorage.setItem(`cache_${currentLang.code}`, JSON.stringify(translationCache));
      safeStorage.setItem(`rom_${currentLang.code}`, JSON.stringify(romanizationCache));
      safeStorage.setItem(`etym_${currentLang.code}`, JSON.stringify(etymologyCache));
    }
  }, [translationCache, romanizationCache, etymologyCache, currentLang, isInitialized]);

  useEffect(() => {
    if (isInitialized && currentLang) {
      safeStorage.setItem(`text_${currentLang.code}`, inputText);
    }
  }, [inputText, currentLang, isInitialized]);

  useEffect(() => {
    if (isInitialized && currentLang) {
      safeStorage.setItem(`plan_${currentLang.code}`, JSON.stringify(studyPlan));
    }
  }, [studyPlan, currentLang, isInitialized]);

  useEffect(() => {
    if (isInitialized && currentLang) {
      try {
        safeStorage.setItem(`library_${currentLang.code}`, JSON.stringify(library));
      } catch(e) {
        console.warn("Library too large to save safely to localStorage", e);
      }
    }
  }, [library, currentLang, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      safeStorage.setItem('last_language', currentLang?.code || "");
      safeStorage.setItem('audio_speed', audioSpeed.toString());
      safeStorage.setItem('audio_voice', audioVoice);
    }
  }, [currentLang, audioSpeed, audioVoice, isInitialized]);


  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleLanguageChange = (e) => {
    const newCode = e.target.value;
    const newLang = LANGUAGES.find(l => l.code === newCode);
    
    stopAudio();
    setCurrentLang(newLang);
    setStoryTopic("");
    setStoryMeta("");
    setNextChapterTopic("");
    setNextChapterMeta("");
    setBookTitle("");
    setSelectedWords([]);
    setSentenceTranslation("");
    setInfoPopup(null);
    setShowFullTranslationToggle(false);
    setShowPPS(false);
    setPpsData(null);
    setFullStoryTranslation("");
    setSearchQuery("");
    setSearchResults([]);
    setVocabHistory([]);
    setLibrarySearch("");
    setVocabSearch("");
    setVocabTranslations({});
    setIsVocabTranslating({});
    setActiveStoryId(null);
    setActiveChapters([]);
    setActiveChapterIndex(0);
    setIsChatOpen(false);
    setIsSentenceMode(false);
    setCurrentSentenceIndex(0);
    setChatMessages([]);
    setActivePlanChapterId(null);

    const newVocab = JSON.parse(safeStorage.getItem(`vocab_${newCode}`) || '{}');
    const newCache = JSON.parse(safeStorage.getItem(`cache_${newCode}`) || '{}');
    const newRomCache = JSON.parse(safeStorage.getItem(`rom_${newCode}`) || '{}');
    const newEtymCache = JSON.parse(safeStorage.getItem(`etym_${newCode}`) || '{}');
    const newPlan = JSON.parse(safeStorage.getItem(`plan_${newCode}`) || '[]');
    
    const rawLibrary = JSON.parse(safeStorage.getItem(`library_${newCode}`) || '[]');
    const migratedLibrary = rawLibrary.map(item => {
       if (item.chapters) return item; 
       return {
          id: item.id,
          title: item.title,
          date: item.date,
          chapters: [{ 
            text: item.text, 
            level: item.level || 'A1', 
            meta: item.meta || "", 
            topic: item.topic || "", 
            chapterTitle: item.chapterTitle || "Chapter 1" 
          }]
       };
    });

    const newText = safeStorage.getItem(`text_${newCode}`);

    setVocab(newVocab);
    setTranslationCache(newCache);
    setRomanizationCache(newRomCache);
    setEtymologyCache(newEtymCache);
    setLibrary(migratedLibrary);
    setStudyPlan(newPlan);
    
    if (newText) {
      setInputText(newText);
      setActiveChapters([{ text: newText, level: "A1", meta: "", topic: "", chapterTitle: "Chapter 1" }]);
      setIsReading(true);
    } else {
      setInputText("");
      setIsReading(false);
    }
  };

  const handleGenerateStudyPlan = async () => {
    if (isGeneratingPlan || !currentLang) return;
    setIsGeneratingPlan(true);

    const sysInstruction = `You are an expert linguist and language curriculum designer. Create a comprehensive, grammatically-sequenced study plan blueprint for learning ${currentLang.name}.
    
    CRITICAL RULES:
    1. Do NOT use thematic conversational chapters (e.g., "At the airport", "Weather").
    2. Sequence the chapters based strictly on the language's internal grammatical complexity, from absolute beginner to advanced (e.g., "The Present Tense", "The Dative Case", "Introduction to Subjunctive").
    3. Ensure it reflects the exact, authentic linguistic features of ${currentLang.name} (e.g., if it has noun cases, include them; if it lacks a subjunctive, omit it; if it has a unique feature like the Vocative case, include it).
    4. Keep the list robust but manageable (around 15-25 chapters).
    5. Return ONLY a valid JSON array of objects with exactly this structure, NO markdown formatting:
    [
      { "id": "1", "title": "Grammar Topic Name", "description": "Brief explanation of the specific grammatical concepts covered" }
    ]`;

    const rawResponse = await callGeminiAPI(sysInstruction, true);
    if (rawResponse) {
      try {
        const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawResponse);
        if (Array.isArray(parsed)) {
           setStudyPlan(parsed);
           setActivePlanChapterId(null);
           setIsPlanVisible(true);
        }
      } catch (e) {
        console.error("Failed to parse study plan JSON", e, rawResponse);
        alert("Failed to generate the study plan properly. Please try again.");
      }
    }
    setIsGeneratingPlan(false);
  };

  const handleExplainPlanChapter = async (e, chapter) => {
    e.stopPropagation();
    if (!currentLang) return;
    
    setInfoPopup({ title: `Curriculum: ${chapter.title}`, isLoading: true });

    const prompt = `Explain the grammatical concept of "${chapter.title}" in ${currentLang.name} (${chapter.description}). Provide a clear, highly structured English explanation detailing its construction and uses, and provide several practical examples in ${currentLang.name} along with their translations.`;
    
    const explanation = await callGeminiAPI(prompt);
    setInfoPopup({ 
      title: `Curriculum: ${chapter.title}`, 
      text: explanation || "Explanation currently unavailable.", 
      isLoading: false 
    });
  };

  const handleExportPlan = () => {
    if (!currentLang || studyPlan.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studyPlan, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${currentLang.name.toLowerCase().replace(/[^a-z]/g, '')}_study_plan.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportPlan = (e) => {
    const file = e.target.files[0];
    if (!file || !currentLang) return;

    const expectedPrefix = currentLang.name.toLowerCase().replace(/[^a-z]/g, '');
    if (!file.name.toLowerCase().includes(expectedPrefix)) {
      alert(`Import mismatch!\n\nYou are trying to import a file named:\n"${file.name}"\n\nBut your currently selected language is:\n${currentLang.name}\n\nPlease select the correct file or switch languages first.`);
      if (planFileInputRef.current) planFileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData) && importedData.length > 0 && importedData[0].title) {
          setStudyPlan(importedData);
          setActivePlanChapterId(null);
          setIsPlanVisible(true);
        } else {
          alert("Invalid study plan format.");
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    if (planFileInputRef.current) planFileInputRef.current.value = '';
  };

  const parseTeacherResponse = (rawText) => {
     try {
       const jsonMatch = rawText.match(/\{[\s\S]*\}/);
       if (jsonMatch) {
         const parsed = JSON.parse(jsonMatch[0]);
         return {
           feedback: parsed.feedback || "",
           hiddenTarget: parsed.hiddenTarget || "",
           message: parsed.message || parsed.text || "...", 
         };
       }
     } catch (e) {
       console.error("Failed to parse Teacher JSON response", e);
     }
     return { feedback: "", hiddenTarget: "", message: rawText };
  };

  const handleOpenChat = async () => {
    if (!currentLang) return;
    setIsChatOpen(true);
    
    if (chatMessages.length === 0) {
      setIsChatLoading(true);
      
      const activePlan = studyPlan.find(p => p.id === activePlanChapterId);
      
      let sysInstruction = `You are a structured language teacher using the Pimsleur/Guided active recall method.
      Target Language for conversation: ${currentLang.name}. User Level: CEFR ${storyLevel}.
      Curriculum (User's Meta Instructions): ${storyMeta.trim() || 'General conversation'}.
      Context Topic: ${storyTopic.trim() || 'Everyday topics'}.`;

      if (activePlan) {
        sysInstruction += `\nCRITICAL GRAMMAR FOCUS: You MUST design your questions to specifically force the user to practice this grammatical concept: "${activePlan.title}" (${activePlan.description}).`;
      }
      
      sysInstruction += `
      Your goal is to force the user to actively produce specific words, conjugations, or grammar structures based on their curriculum.
      
      RULES FOR EVERY TURN:
      1. Secretly decide on a specific "Hidden Target" (a word or phrase in ${currentLang.name}) you want the user to type in their NEXT reply.
      2. If the user sent a message, evaluate it. Did they successfully use your PREVIOUS hidden target? Correct any grammar errors gently.
      3. Your questions MUST be designed so that the most natural answer includes your new Hidden Target. CRITICAL: You must NEVER use the Hidden Target word (or its root/lemma) in your own "message" prompt. Force the user to recall it by using context, synonyms, opposites, or fill-in-the-blank style clues.
      4. STRICT BILINGUAL RULE: The "feedback" field MUST be written ENTIRELY IN ENGLISH. The "message" field MUST be written ENTIRELY IN ${currentLang.name.toUpperCase()}.
      5. You MUST ALWAYS return ONLY a valid JSON object with EXACTLY these three keys:
         {
           "feedback": "Your evaluation and feedback STRICTLY IN ENGLISH",
           "hiddenTarget": "The exact word/phrase you want them to say next in ${currentLang.name}",
           "message": "Your actual conversational prompt/question in ${currentLang.name}"
         }`;

      const prompt = `Start the session. Output ONLY valid JSON matching the system instructions.`;
      
      const rawResponse = await callGeminiChatAPI([{ role: 'user', text: prompt }], sysInstruction);
      
      if (rawResponse) {
        const parsed = parseTeacherResponse(rawResponse);
        setChatMessages([{ 
          role: 'model', 
          text: parsed.message, 
          feedback: parsed.feedback, 
          hiddenTarget: parsed.hiddenTarget,
          isHintOpen: false 
        }]);
      } else {
        setChatMessages([{ role: 'model', text: "Hello! Let's start our conversation. What would you like to talk about?" }]);
      }
      setIsChatLoading(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading || !currentLang) return;
    
    const newMessages = [...chatMessages, { role: 'user', text: chatInput.trim() }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsChatLoading(true);
    
    const activePlan = studyPlan.find(p => p.id === activePlanChapterId);

    let sysInstruction = `You are a structured language teacher using the Pimsleur/Guided active recall method.
    Target Language for conversation: ${currentLang.name}. User Level: CEFR ${storyLevel}.
    Curriculum (User's Meta Instructions): ${storyMeta.trim() || 'General conversation'}.
    Context Topic: ${storyTopic.trim() || 'Everyday topics'}.`;

    if (activePlan) {
      sysInstruction += `\nCRITICAL GRAMMAR FOCUS: You MUST design your questions to specifically force the user to practice this grammatical concept: "${activePlan.title}" (${activePlan.description}).`;
    }
    
    sysInstruction += `
    Your goal is to force the user to actively produce specific words, conjugations, or grammar structures based on their curriculum.
    
    RULES FOR EVERY TURN:
    1. Secretly decide on a specific "Hidden Target" (a word or phrase in ${currentLang.name}) you want the user to type in their NEXT reply.
    2. Evaluate the user's message. Did they successfully use your PREVIOUS hidden target? 
       - If YES: Praise them briefly in the feedback.
       - If NO/Error: Correct them gently in the feedback, explain what you were looking for, and re-ask the question in a different way.
    3. Your questions MUST be designed so that the most natural answer includes your new Hidden Target. CRITICAL: You must NEVER use the Hidden Target word (or its root/lemma) in your own "message" prompt. Force the user to recall it by using context, synonyms, opposites, or fill-in-the-blank style clues.
    4. STRICT BILINGUAL RULE: The "feedback" field MUST be written ENTIRELY IN ENGLISH. The "message" field MUST be written ENTIRELY IN ${currentLang.name.toUpperCase()}. Do not mix them up.
    5. You MUST ALWAYS return ONLY a valid JSON object with EXACTLY these three keys:
       {
         "feedback": "Your evaluation/feedback STRICTLY IN ENGLISH. Be encouraging but clear.",
         "hiddenTarget": "The exact word/phrase you want them to say next in ${currentLang.name}",
         "message": "Your actual conversational prompt/question in ${currentLang.name}"
       }
    ${currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW' ? '\n6. CRITICAL: For Chinese, you MUST include Simplified/Traditional Hanzi AND Pinyin in your "message" text.' : ''}`;

    const rawResponse = await callGeminiChatAPI(newMessages, sysInstruction);
    
    if (rawResponse) {
      const parsed = parseTeacherResponse(rawResponse);
      setChatMessages([...newMessages, { 
        role: 'model', 
        text: parsed.message,
        feedback: parsed.feedback,
        hiddenTarget: parsed.hiddenTarget,
        isHintOpen: false
      }]);
    } else {
      setChatMessages([...newMessages, { role: 'model', text: "Sorry, I couldn't process that. Please try again." }]);
    }
    setIsChatLoading(false);
  };

  const toggleChatHint = (index) => {
    setChatMessages(prev => {
      const next = [...prev];
      if (next[index]) next[index].isHintOpen = !next[index].isHintOpen;
      return next;
    });
  };

  const handleSaveChatAsBook = () => {
    if (chatMessages.length === 0) return;
    
    const chatText = chatMessages.map(msg => {
      if (msg.role === 'user') return `Me:\n${msg.text}`;
      let modelText = `Tutor:\n`;
      if (msg.feedback) modelText += `[Feedback: ${msg.feedback}]\n`;
      modelText += `${msg.text}`;
      return modelText;
    }).join('\n\n');

    let resolvedTitle = `Roleplay: ${storyTopic.trim() || 'Conversation'}`;

    const newBook = {
      id: Date.now().toString(),
      title: resolvedTitle,
      date: Date.now(),
      chapters: [{
        text: chatText,
        level: storyLevel,
        meta: storyMeta,
        topic: storyTopic,
        chapterTitle: "Chat Transcript"
      }]
    };

    setLibrary(prev => [newBook, ...prev]);
    setActiveStoryId(newBook.id);
    setBookTitle(resolvedTitle);
    setActiveChapters(newBook.chapters);
    setActiveChapterIndex(0);
    setInputText(chatText);
    setIsReading(true);
    setIsChatOpen(false); 
    setSelectedWords([]);
    setInfoPopup(null);
  };

  const saveCurrentStory = () => {
    if (activeChapters.length === 0 && !inputText) return;
    
    let currentChaps = activeChapters.length > 0 ? activeChapters : [{ text: inputText, level: storyLevel, meta: storyMeta, topic: storyTopic, chapterTitle: "Chapter 1" }];
    
    let resolvedTitle = bookTitle.trim();
    if (!resolvedTitle) {
      resolvedTitle = currentChaps[0].chapterTitle || "Generated Book";
    }

    const newBook = {
      id: activeStoryId || Date.now().toString(),
      title: resolvedTitle,
      date: Date.now(),
      chapters: currentChaps
    };

    setLibrary(prev => {
      const exists = prev.some(s => s.id === newBook.id);
      if (exists) return prev.map(s => s.id === newBook.id ? newBook : s);
      return [newBook, ...prev];
    });
    
    setActiveStoryId(newBook.id);
    setBookTitle(resolvedTitle);
  };

  const deleteStory = (e, id) => {
    e.stopPropagation();
    setLibrary(prev => prev.filter(s => s.id !== id));
    if (activeStoryId === id) {
       setActiveStoryId(null);
    }
  };

  const loadStory = (book) => {
    setBookTitle(book.title);
    setActiveChapters(book.chapters);
    setActiveChapterIndex(0);
    
    setStoryLevel(book.chapters[0].level || "A1");
    setStoryTopic(book.chapters[0].topic || "");
    setStoryMeta(book.chapters[0].meta || "");
    
    setNextChapterLevel(book.chapters[book.chapters.length - 1].level || "A1");
    setNextChapterTopic("");
    setNextChapterMeta("");

    setInputText(book.chapters[0].text);
    setActiveStoryId(book.id);
    setIsReading(true);
    setIsChatOpen(false);
    setSelectedWords([]);
    setInfoPopup(null);
    stopAudio();
  };

  const handleExportLibrary = () => {
    if (!currentLang || library.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(library, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${currentLang.name.toLowerCase().replace(/[^a-z]/g, '')}_library.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportLibrary = (e) => {
    const file = e.target.files[0];
    if (!file || !currentLang) return;

    const expectedPrefix = currentLang.name.toLowerCase().replace(/[^a-z]/g, '');
    if (!file.name.toLowerCase().includes(expectedPrefix)) {
      alert(`Import mismatch!\n\nYou are trying to import a file named:\n"${file.name}"\n\nBut your currently selected language is:\n${currentLang.name}\n\nPlease select the correct file or switch languages first.`);
      if (libraryFileInputRef.current) libraryFileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          const migratedData = importedData.map(item => {
             if (item.chapters) return item; 
             return {
                id: item.id || Date.now().toString() + Math.random().toString(),
                title: item.title || "Untitled Book",
                date: item.date || Date.now(),
                chapters: [{ 
                  text: item.text || "", 
                  level: item.level || 'A1', 
                  meta: item.meta || "", 
                  topic: item.topic || "", 
                  chapterTitle: item.chapterTitle || "Chapter 1" 
                }]
             };
          });

          setLibrary(prev => {
            const existingIds = new Set(prev.map(s => s.id));
            const newStories = migratedData.filter(s => s.id && s.title && s.chapters && !existingIds.has(s.id));
            return [...newStories, ...prev];
          });
        } else {
          alert("Invalid library file format. Expected an array of stories.");
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    if (libraryFileInputRef.current) libraryFileInputRef.current.value = '';
  };

  const goToChapter = (index) => {
    if (index >= 0 && index < activeChapters.length) {
       setActiveChapterIndex(index);
       setInputText(activeChapters[index].text);
       setStoryLevel(activeChapters[index].level || "A1");
       setStoryTopic(activeChapters[index].topic || "");
       setStoryMeta(activeChapters[index].meta || "");
       
       setNextChapterLevel(activeChapters[activeChapters.length - 1].level || "A1");

       setSelectedWords([]);
       setInfoPopup(null);
       setShowFullTranslationToggle(false);
       stopAudio();
    }
  };

  const stopAudio = (incrementId = true) => {
    if (incrementId) {
      playbackIdRef.current += 1;
      isPlayingSequenceRef.current = false; 
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    audioQueueRef.current = [];
    setIsPlayingFullStory(false);
    setIsStoryAudioLoading(false);
    setIsAudioLoading(false);
  };

  const playWordPhraseAudio = async (text) => {
    if (!text || !currentLang) return;
    const currentPlaybackId = ++playbackIdRef.current;
    stopAudio(false); 
    
    setIsAudioLoading(true);
    // Upgraded to use Gemini TTS for dictionary words to maintain voice consistency and caching
    const url = await getAudioUrl(text, currentLang, audioVoiceRef.current);
    await new Promise(r => setTimeout(r, 100));
    
    if (playbackIdRef.current !== currentPlaybackId) return; 
    
    setIsAudioLoading(false);
    if (url) {
      const audio = new Audio(url);
      audio.playbackRate = audioSpeedRef.current;
      currentAudioRef.current = audio;
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const playNextInQueue = async () => {
    if (audioQueueRef.current.length === 0 || !isPlayingSequenceRef.current) {
      setIsPlayingFullStory(false);
      setIsStoryAudioLoading(false);
      return;
    }
    
    const text = audioQueueRef.current.shift();
    
    setIsStoryAudioLoading(true);
    const url = await getAudioUrl(text, currentLang, audioVoiceRef.current);
    
    if (!isPlayingSequenceRef.current) {
      setIsStoryAudioLoading(false);
      return; 
    }
    setIsStoryAudioLoading(false);

    if (audioQueueRef.current.length > 0) {
      getAudioUrl(audioQueueRef.current[0], currentLang, audioVoiceRef.current);
    }

    if (url) {
      const audio = new Audio(url);
      audio.playbackRate = audioSpeedRef.current;
      currentAudioRef.current = audio;
      audio.onended = playNextInQueue;
      audio.play().catch(e => {
        console.error("Chunk playback failed, skipping...", e);
        playNextInQueue();
      });
    } else {
      playNextInQueue();
    }
  };

  const playFullStory = () => {
    const textToPlay = isSentenceMode && sentenceTokensGroups[currentSentenceIndex]
      ? sentenceTokensGroups[currentSentenceIndex].map(t => t.text).join('')
      : inputText;
      
    if (!textToPlay || !currentLang) return;
    
    stopAudio();
    isPlayingSequenceRef.current = true;
    audioQueueRef.current = splitIntoChunks(textToPlay, 600);
    if (audioQueueRef.current.length > 0) {
      setIsPlayingFullStory(true);
      playNextInQueue();
    }
  };

  const handleExport = () => {
    if (!currentLang) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vocab, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${currentLang.name.toLowerCase().replace(/[^a-z]/g, '')}_vocab_progress.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file || !currentLang) return;

    const expectedPrefix = currentLang.name.toLowerCase().replace(/[^a-z]/g, '');
    if (!file.name.toLowerCase().includes(expectedPrefix)) {
      alert(`Import mismatch!\n\nYou are trying to import a file named:\n"${file.name}"\n\nBut your currently selected language is:\n${currentLang.name}\n\nPlease select the correct file or switch languages first.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setVocab(importedData);
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerateStory = async () => {
    if (isGeneratingStory || !currentLang) return;
    setIsGeneratingStory(true);
    
    const learningWordsToInclude = Object.entries(vocab)
      .filter(([_, data]) => data.status === 'learning')
      .sort((a, b) => (a[1].lastUsed || 0) - (b[1].lastUsed || 0))
      .slice(0, 5)
      .map(([word, _]) => word);

    const topicPhrase = storyTopic.trim() ? `about "${storyTopic.trim()}"` : "about a random, interesting everyday situation";
    const activePlan = studyPlan.find(p => p.id === activePlanChapterId);

    let prompt = "";
    if (storyLevel === "A0") {
      prompt = `Write an absolute beginner comprehensible input story (exactly around ${targetChapterLength} words) at a 'Pre-A1' (Zero) level ${topicPhrase} in ${currentLang.name}. Use extreme simplicity: very short sentences, basic present-tense grammar, and a strictly limited total vocabulary of only 4 to 10 unique words repeated naturally. Return ONLY the ${currentLang.name} text, no English translation, no intro, and no markdown formatting.`;
    } else {
      prompt = `Write a short, engaging comprehensible input story (exactly around ${targetChapterLength} words) at CEFR level ${storyLevel} ${topicPhrase} in ${currentLang.name}. Ensure the grammar and vocabulary perfectly match the requested level. Return ONLY the ${currentLang.name} text, no English translation, no intro, and no markdown formatting.`;
    }
    
    if (currentLang.code === 'zh-CN') {
      prompt += "\n\nCRITICAL INSTRUCTION: Output the story ENTIRELY in Simplified Hanzi (Chinese characters). Do not use Pinyin in the main text.";
    }

    if (learningWordsToInclude.length > 0) {
      prompt += `\n\nCRITICAL INSTRUCTION: You MUST naturally weave these specific vocabulary words into the story: ${learningWordsToInclude.join(', ')}.`;
    }
    
    if (activePlan) {
      prompt += `\n\nCRITICAL GRAMMAR FOCUS: This story MUST be designed specifically to practice this grammatical concept: "${activePlan.title}" (${activePlan.description}). Embed several natural examples of this structure heavily into the text.`;
    }

    if (storyMeta.trim()) {
      prompt += `\n\nCRITICAL USER INSTRUCTION FOR THIS STORY: ${storyMeta.trim()}`;
    }
    
    prompt += `\n\nReturn ONLY a valid JSON object with the following structure:
    {
      "bookTitle": "A creative title for the overall book/story in ${currentLang.name}",
      "chapterTitle": "A title for this first chapter in ${currentLang.name}",
      "text": "The actual story text here..."
    }`;

    const generatedText = await callGeminiAPI(prompt);
    if (generatedText) {
      let parsedData;
      try {
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
        } else {
            parsedData = { text: generatedText, bookTitle: storyTopic || "Generated Book", chapterTitle: "Chapter 1" };
        }
      } catch (e) {
        parsedData = { text: generatedText, bookTitle: storyTopic || "Generated Book", chapterTitle: "Chapter 1" };
      }

      const newChapter = { 
        text: parsedData.text, 
        level: storyLevel, 
        meta: storyMeta.trim(),
        topic: storyTopic.trim(),
        chapterTitle: parsedData.chapterTitle || "Chapter 1"
      };
      
      setBookTitle(parsedData.bookTitle || "New Book");
      setActiveChapters([newChapter]);
      setActiveChapterIndex(0);
      setActiveStoryId(null); 
      setNextChapterLevel(storyLevel);
      setInputText(parsedData.text);
      setIsReading(true);
      setSelectedWords([]); 
      setShowFullTranslationToggle(false);
      setShowPPS(false);
      setPpsData(null);
      
      if (learningWordsToInclude.length > 0) {
        setVocabHistory(prev => [...prev, vocab]);
        setVocab(prev => {
          const nextVocab = { ...prev };
          learningWordsToInclude.forEach(word => {
            if (nextVocab[word]) {
              nextVocab[word] = { ...nextVocab[word], lastUsed: Date.now() };
            }
          });
          return nextVocab;
        });
      }
    } else {
      alert("Failed to generate story. Please try again.");
    }
    setIsGeneratingStory(false);
  };

  const handleGenerateNextChapter = async () => {
    if (isGeneratingStory || !currentLang || activeChapters.length === 0) return;
    setIsGeneratingStory(true);
    
    const previousChapterText = activeChapters[activeChapters.length - 1].text;
    
    const learningWordsToInclude = Object.entries(vocab)
      .filter(([_, data]) => data.status === 'learning')
      .sort((a, b) => (a[1].lastUsed || 0) - (b[1].lastUsed || 0))
      .slice(0, 5)
      .map(([word, _]) => word);
    
    let prompt = `Write chapter ${activeChapters.length + 1} (a direct continuation) of the following ${currentLang.name} story thread. `;
    const activePlan = studyPlan.find(p => p.id === activePlanChapterId);

    if (nextChapterLevel === "A0") {
      prompt += `Keep this new chapter at an absolute beginner 'Pre-A1' (Zero) level (exactly around ${targetChapterLength} words, very simple sentences, and a strictly limited total vocabulary of only 4 to 10 unique words repeated naturally). `;
    } else {
      prompt += `Make this new chapter exactly around ${targetChapterLength} words at CEFR level ${nextChapterLevel}. Ensure the grammar and vocabulary perfectly match this level. `;
    }
    
    prompt += `\n\nPrevious chapter text for context:\n"${previousChapterText}"\n\n`;
    
    if (nextChapterTopic.trim()) {
        prompt += `\n\nCRITICAL THEMATIC INSTRUCTION FOR THIS NEW CHAPTER: Focus the plot heavily on: "${nextChapterTopic.trim()}".`;
    }

    if (activePlan) {
      prompt += `\n\nCRITICAL GRAMMAR FOCUS: This chapter MUST be designed specifically to practice this grammatical concept: "${activePlan.title}" (${activePlan.description}). Embed several natural examples of this structure heavily into the text.`;
    }

    if (nextChapterMeta.trim()) {
      prompt += `\n\nCRITICAL META INSTRUCTION FOR THIS SPECIFIC CHAPTER: ${nextChapterMeta.trim()}`;
    }
    
    if (currentLang.code === 'zh-CN') {
      prompt += "\n\nCRITICAL INSTRUCTION: Output the story text ENTIRELY in Simplified Hanzi (Chinese characters). Do not use Pinyin in the main story text.";
    }

    if (learningWordsToInclude.length > 0) {
      prompt += `\n\nCRITICAL INSTRUCTION: You MUST naturally weave these specific vocabulary words into the new chapter: ${learningWordsToInclude.join(', ')}.`;
    }

    prompt += `\n\nReturn ONLY a valid JSON object with the following structure:
    {
      "chapterTitle": "A fitting title for this new chapter in ${currentLang.name}",
      "text": "The story text here..."
    }`;
    
    const generatedText = await callGeminiAPI(prompt);
    if (generatedText) {
      let parsedData;
      try {
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
        } else {
            parsedData = { text: generatedText, chapterTitle: `Chapter ${activeChapters.length + 1}` };
        }
      } catch (e) {
        parsedData = { text: generatedText, chapterTitle: `Chapter ${activeChapters.length + 1}` };
      }

      const newChapters = [...activeChapters, { 
        text: parsedData.text, 
        level: nextChapterLevel, 
        meta: nextChapterMeta.trim(),
        topic: nextChapterTopic.trim(),
        chapterTitle: parsedData.chapterTitle
      }];
      
      setActiveChapters(newChapters);
      setActiveChapterIndex(newChapters.length - 1);
      setInputText(parsedData.text);
      setIsReading(true);
      setSelectedWords([]); 
      setShowFullTranslationToggle(false);
      setShowPPS(false);
      setPpsData(null);
      
      setNextChapterTopic("");
      setNextChapterMeta("");
      
      if (activeStoryId) {
          setLibrary(prev => prev.map(s => s.id === activeStoryId ? { ...s, chapters: newChapters, date: Date.now() } : s));
      }
      
      if (learningWordsToInclude.length > 0) {
        setVocabHistory(prev => [...prev, vocab]);
        setVocab(prev => {
          const nextVocab = { ...prev };
          learningWordsToInclude.forEach(word => {
            if (nextVocab[word]) {
              nextVocab[word] = { ...nextVocab[word], lastUsed: Date.now() };
            }
          });
          return nextVocab;
        });
      }
    } else {
      alert("Failed to generate next chapter. Please try again.");
    }
    setIsGeneratingStory(false);
  };

  const handleGeneratePPS = async () => {
    if (isGeneratingPPS || !inputText || !currentLang) return;
    
    const textToPrep = isSentenceMode && sentenceTokensGroups[currentSentenceIndex]
      ? sentenceTokensGroups[currentSentenceIndex].map(t => t.text).join('')
      : inputText;
      
    if (!textToPrep.trim()) return;

    setIsGeneratingPPS(true);
    setShowPPS(true);

    const needsTransliteration = TRANSLITERATE_LANGS.includes(currentLang.code);

    const sysInstruction = `You are a linguistic expert analyzing text for a language learner. Analyze the following text in ${currentLang.name}:\n\n"${textToPrep}"\n\nReturn ONLY a valid JSON object matching exactly this structure, with NO markdown formatting:
    {
      "summary": "Brief English summary of the plot or content",
      "newWords": [
        { "term": "word or phrase in ${currentLang.name}", "translation": "English translation"${needsTransliteration ? ', "transliteration": "Latin script transliteration"' : ''} }
      ],
      "structures": [
        { "template": "Grammar template/pattern in ${currentLang.name} (e.g. 'μου αρέσει να...')", "explanation": "Brief English explanation of how this template works"${needsTransliteration ? ', "transliteration": "Latin script transliteration"' : ''} }
      ]
    }
    Pick 4 to 8 of the most useful words/phrases for a learner, and 2 to 4 key grammar templates found in the text.`;

    const rawResponse = await callGeminiAPI(sysInstruction, true);
    
    if (rawResponse) {
      try {
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawResponse);
        setPpsData(parsed);
      } catch (e) {
        try {
          const parsed = JSON.parse(rawResponse);
          setPpsData(parsed);
        } catch (err) {
           console.error("PPS JSON Parse failed", err);
           setPpsData(null);
        }
      }
    } else {
      setPpsData(null);
    }
    setIsGeneratingPPS(false);
  };

  const toggleFullStoryTranslation = async () => {
    if (showFullTranslationToggle) {
      setShowFullTranslationToggle(false);
      return;
    }
    
    setShowFullTranslationToggle(true);
    
    const textToTranslate = isSentenceMode && sentenceTokensGroups[currentSentenceIndex]
      ? sentenceTokensGroups[currentSentenceIndex].map(t => t.text).join('')
      : inputText;
      
    const cacheKey = `full_${textToTranslate.trim()}`;
    
    if (translationCacheRef.current[cacheKey]) {
      setFullStoryTranslation(translationCacheRef.current[cacheKey]);
      return;
    }

    setIsTranslatingFullStory(true);
    
    let prompt = isSentenceMode
      ? `Translate this ${currentLang.name} sentence to English:\n\n"${textToTranslate}"\n\nProvide ONLY the direct contextual English translation.`
      : `Translate this ${currentLang.name} chapter to English:\n\n"${textToTranslate}"\n\nProvide ONLY the English translation. Ensure it reads naturally as a complete cohesive text.`;
    
    if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
      prompt += ` Also append the Pinyin of the entire text in brackets at the end.`;
    }
    if (currentLang.code === 'ar') {
      prompt += ` Translate using the vocabulary of the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة).`;
    }
    
    const trans = await callGeminiAPI(prompt);
    if (trans) {
      setFullStoryTranslation(trans);
      setTranslationCache(prev => ({ ...prev, [cacheKey]: trans }));
    } else {
      setFullStoryTranslation("Translation currently unavailable.");
    }
    setIsTranslatingFullStory(false);
  };

  const handleWordClick = (e, token, index, source) => {
    e.stopPropagation();
    const cleaned = cleanWord(token);
    if (!cleaned) return;
    
    setSelectedWords(prev => {
      if (prev.length > 0 && prev[0].source !== source) {
          return [{ index, token, clean: cleaned, source }];
      }
      const exists = prev.find(p => p.index === index);
      let newSelection;
      if (exists) {
        newSelection = prev.filter(p => p.index !== index);
      } else {
        newSelection = [...prev, { index, token, clean: cleaned, source }].sort((a, b) => a.index - b.index);
      }
      return newSelection;
    });
    setInfoPopup(null);
  };

  const handleRightClick = async (e, token) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cleaned = cleanWord(token);
    if (!cleaned || !currentLang) return;

    setInfoPopup({ title: `Etymology: ${token}`, isLoading: true });

    if (etymologyCacheRef.current[cleaned]) {
      setInfoPopup({ title: `Etymology: ${token}`, text: etymologyCacheRef.current[cleaned], isLoading: false });
    } else {
      let prompt = `Provide a brief, fascinating etymology (word origin) for the ${currentLang.name} word "${token}". Keep the explanation in English, highly informative but concise (around 30-50 words).`;
      
      if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
        prompt += ` CRITICAL RULE: Because the word is of Chinese origin, you MUST seamlessly include its Simplified Hanzi (普通话), Traditional Hanzi (普通話), and Pinyin (Pǔtōnghuà) natively in your explanation text.`;
      }

      const etymology = await callGeminiAPI(prompt);
      const textResult = etymology || "Etymology information currently unavailable.";
      
      setInfoPopup({ title: `Etymology: ${token}`, text: textResult, isLoading: false });
      setEtymologyCache(prev => ({ ...prev, [cleaned]: textResult }));
    }
  };

  const handleExplainGrammar = async () => {
    if (selectedWords.length === 0 || !currentLang) return;
    
    const separator = ['zh-CN', 'zh-TW', 'ja'].includes(currentLang.code) ? '' : ' ';
    const phrase = selectedWords.map(w => w.token).join(separator);
    
    setInfoPopup({ title: `Grammar & Syntax: ${phrase}`, isLoading: true });

    let prompt = `Explain the syntax, grammar, inflections, cases, prepositions, collocations, and cultural background of the ${currentLang.name} phrase "${phrase}" exactly as it is used in this sentence context: "${activeSentence}". Keep the explanation in English, highly informative, clear, and well-structured. Feel free to use markdown formatting (like bolding and bullet points) to make it readable.`;
    
    if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
      prompt += ` CRITICAL RULE: Because the language is Chinese, you MUST seamlessly include its Simplified Hanzi (普通话), Traditional Hanzi (普通話), and Pinyin (Pǔtōnghuà) natively in your explanation text.`;
    }
    if (currentLang.code === 'ar') {
      prompt += ` Frame the grammatical explanation considering the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة) context.`;
    }

    const explanation = await callGeminiAPI(prompt);
    setInfoPopup({ 
      title: `Grammar & Syntax: ${phrase}`, 
      text: explanation || "Grammar explanation currently unavailable.", 
      isLoading: false 
    });
  };

  const handleVocabGrammar = async (e, phrase) => {
    e.stopPropagation();
    if (!currentLang) return;
    
    setInfoPopup({ title: `Grammar & Syntax: ${phrase}`, isLoading: true });

    let prompt = `Explain the syntax, grammar, inflections, cases, prepositions, collocations, and cultural background of the ${currentLang.name} phrase "${phrase}". Keep the explanation in English, highly informative, clear, and well-structured. Feel free to use markdown formatting (like bolding and bullet points) to make it readable.`;
    
    if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
      prompt += ` CRITICAL RULE: Because the language is Chinese, you MUST seamlessly include its Simplified Hanzi (普通话), Traditional Hanzi (普通話), and Pinyin (Pǔtōnghuà) natively in your explanation text.`;
    }
    if (currentLang.code === 'ar') {
      prompt += ` Frame the grammatical explanation considering the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة) context.`;
    }

    const explanation = await callGeminiAPI(prompt);
    setInfoPopup({ 
      title: `Grammar & Syntax: ${phrase}`, 
      text: explanation || "Grammar explanation currently unavailable.", 
      isLoading: false 
    });
  };

  const handleTranslateVocab = async (e, wordKey) => {
    e.stopPropagation();
    if (!currentLang) return;

    if (vocabTranslations[wordKey]) {
      setVocabTranslations(prev => {
        const next = { ...prev };
        delete next[wordKey];
        return next;
      });
      return;
    }

    setIsVocabTranslating(prev => ({ ...prev, [wordKey]: true }));
    
    const cleanKey = wordKey.toLowerCase();
    let trans = translationCacheRef.current[cleanKey];

    if (!trans) {
        let prompt = `Translate the ${currentLang.name} term "${wordKey}" to English. Provide ONLY a concise direct translation.`;
        if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
          prompt += ` CRITICAL RULE: Include Hanzi and Pinyin natively, like "translation (Simplified: 苹果 / Traditional: 蘋果 | Pinyin: píngguǒ)".`;
        }
        if (currentLang.code === 'ar') {
          prompt += ` Translate using the vocabulary of the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة).`;
        }
        
        trans = await callGeminiAPI(prompt);
        if (trans) {
            setTranslationCache(prev => ({ ...prev, [cleanKey]: trans }));
        }
    }

    setVocabTranslations(prev => ({ ...prev, [wordKey]: trans || "Translation unavailable" }));
    setIsVocabTranslating(prev => ({ ...prev, [wordKey]: false }));
  };

  const handleRemoveVocab = (e, wordKey) => {
    e.stopPropagation();
    setVocabHistory(prev => [...prev, vocab]);
    setVocab(prev => {
      const next = { ...prev };
      delete next[wordKey];
      return next;
    });
  };
  
  const addTermToVocab = (e, term) => {
    e.stopPropagation();
    if (!term || !currentLang) return;
    setVocabHistory(prev => [...prev, vocab]);
    setVocab(prev => {
      const nextVocab = { ...prev };
      const separator = ['zh-CN', 'zh-TW', 'ja'].includes(currentLang.code) ? '' : ' ';
      const tokens = tokenizeText(term, currentLang.code).filter(t => t.isWordLike).map(t => cleanWord(t.text));
      const phraseKey = tokens.join(separator);
      
      if (!phraseKey) return nextVocab;
      
      nextVocab[phraseKey] = { 
        status: 'learning', 
        lastUsed: Date.now(),
        isPhrase: tokens.length > 1,
        words: tokens 
      };
      return nextVocab;
    });
  };

  // Snappy Context-Aware Phrase Translation
  useEffect(() => {
    const isDeselection = selectedWords.length < prevSelectedLengthRef.current;
    prevSelectedLengthRef.current = selectedWords.length;

    if (selectedWords.length === 0 || !currentLang) {
      setTranslation(""); 
      setSentenceTranslation(""); 
      return;
    }

    const source = selectedWords[0].source;
    let currentTokens = tokensRef.current.body;
    if (source === 'title') currentTokens = tokensRef.current.title;
    else if (source === 'chapter') currentTokens = tokensRef.current.chapter;
    else if (source.startsWith('chat-')) {
       const chatIdx = parseInt(source.split('-')[1], 10);
       currentTokens = tokensRef.current.chat[chatIdx] || [];
    }

    const separator = ['zh-CN', 'zh-TW', 'ja'].includes(currentLang.code) ? '' : ' ';
    const phrase = selectedWords.map(w => w.token).join(separator);
    const cleanPhraseKey = phrase.toLowerCase();
    
    if (!isDeselection) {
      playWordPhraseAudio(phrase);
    }

    const firstIndex = selectedWords[0].index;
    let start = firstIndex;
    let end = firstIndex;
    while (start > 0 && currentTokens[start - 1] && !/[.;!?\n]/.test(currentTokens[start - 1].text)) start--;
    while (end < currentTokens.length - 1 && currentTokens[end] && !/[.;!?\n]/.test(currentTokens[end].text)) end++;
    const sentence = currentTokens.slice(start, end + 1).map(t => t.text).join('').trim();
    setActiveSentence(sentence);

    const timeoutId = setTimeout(async () => {
      if (translationCacheRef.current[cleanPhraseKey]) {
        setTranslation(translationCacheRef.current[cleanPhraseKey]);
        setIsTranslating(false);
      } else {
        setIsTranslating(true);
        let prompt = `Translate the ${currentLang.name} phrase "${phrase}" to English. Critically, use this specific sentence as context to determine its exact meaning and function: "${sentence}". Provide ONLY the direct contextual translation and a very brief part of speech. Keep it extremely concise (under 10 words if possible).`;
        
        if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
          prompt += ` CRITICAL: You MUST include the Hanzi and Pinyin. Format strictly as: "translation (Simplified: 苹果 / Traditional: 蘋果 | Pinyin: píngguǒ)".`;
        }

        if (currentLang.code === 'ar') {
          prompt += ` Ensure the translation reflects the meaning in the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة) context.`;
        }
        
        const trans = await callGeminiAPI(prompt);
        if (trans) {
          setTranslation(trans);
          setTranslationCache(prev => ({ ...prev, [cleanPhraseKey]: trans }));
        } else {
          setTranslation("Translation unavailable");
        }
        setIsTranslating(false);
      }
    }, 200); 

    return () => clearTimeout(timeoutId);
  }, [selectedWords, currentLang]);

  const handleTranslateSentence = async () => {
    if (!activeSentence || isTranslatingSentence || !currentLang) return;
    playWordPhraseAudio(activeSentence);

    if (sentenceTranslation) return;

    setIsTranslatingSentence(true);
    let prompt = `Translate this ${currentLang.name} sentence to English: "${activeSentence}". Provide ONLY the translation.`;
    
    if (currentLang.code === 'zh-CN' || currentLang.code === 'zh-TW') {
      prompt += ` Also append the Pinyin of the entire sentence in brackets.`;
    }
    if (currentLang.code === 'ar') {
      prompt += ` Translate using the vocabulary of the Palestinian dialect (اللَّهْجَة الْفِلَسْطِينِيَّة).`;
    }
    
    const trans = await callGeminiAPI(prompt);
    if (trans) {
      setSentenceTranslation(trans);
    } else {
      setSentenceTranslation("Sentence translation unavailable");
    }
    setIsTranslatingSentence(false);
  };

  const updateWordStatus = (status) => {
    if (selectedWords.length === 0 || !currentLang) return;
    
    setVocabHistory(prev => [...prev, vocab]);

    setVocab(prev => {
      const nextVocab = { ...prev };
      const separator = ['zh-CN', 'zh-TW', 'ja'].includes(currentLang.code) ? '' : ' ';
      const phraseKey = selectedWords.map(w => w.clean).join(separator);
      
      nextVocab[phraseKey] = { 
        status, 
        lastUsed: Date.now(),
        isPhrase: selectedWords.length > 1,
        words: selectedWords.map(w => w.clean) 
      };
      
      return nextVocab;
    });
  };

  const handleUndo = () => {
    if (vocabHistory.length === 0) return;
    const previousVocab = vocabHistory[vocabHistory.length - 1];
    setVocab(previousVocab);
    setVocabHistory(prev => prev.slice(0, -1));
  };

  const renderInteractiveTokens = (tokens, source, isDarkBg = false) => {
    if (!currentLang || !tokens) return null;
    const phraseEntries = Object.values(vocab).filter(v => typeof v === 'object' && v?.isPhrase && v?.words);
    const learningPhrasesWords = new Set(phraseEntries.filter(v => v.status === 'learning').flatMap(v => v.words));
    const knownPhrasesWords = new Set(phraseEntries.filter(v => v.status === 'known').flatMap(v => v.words));

    return tokens.map((tokenObj) => {
      const { text: token, isWordLike, arrayIndex: index } = tokenObj;
      if (!isWordLike) {
        const isSearchMatch = source === 'body' && searchResults[currentSearchIndex]?.includes(index);
        return <span key={`${source}-${index}`} className={`whitespace-pre-wrap ${isDarkBg ? 'text-white' : 'text-slate-700'} ${isSearchMatch ? 'bg-yellow-200 text-slate-800' : ''}`}>{token}</span>;
      }

      const wordKey = cleanWord(token);
      const vocabEntry = vocab[wordKey];
      let status = vocabEntry ? (typeof vocabEntry === 'string' ? vocabEntry : vocabEntry.status) : null;

      if (!status) {
        if (learningPhrasesWords.has(wordKey)) status = 'learning';
        else if (knownPhrasesWords.has(wordKey)) status = 'known';
      }

      let colorClasses = `${isDarkBg ? 'text-white' : 'text-slate-800'} cursor-pointer transition-colors px-0.5 rounded`;
      
      if (showHighlights) {
        if (status === 'known') {
          colorClasses = "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 cursor-pointer transition-colors px-0.5 rounded";
        } else if (status === 'learning') {
          colorClasses = "bg-amber-100 text-amber-900 border-b-2 border-amber-300 hover:bg-amber-200 cursor-pointer transition-colors px-0.5 rounded";
        } else {
          colorClasses += isDarkBg ? " hover:bg-blue-700" : " hover:bg-blue-100";
        }
      } else {
        colorClasses += isDarkBg ? " hover:bg-blue-700" : " hover:bg-slate-200"; 
      }

      const isSelected = selectedWords.some(w => w.index === index && w.source === source);
      const isSearchMatch = source === 'body' && searchResults[currentSearchIndex]?.includes(index);
      const romanization = TRANSLITERATE_LANGS.includes(currentLang.code) ? romanizationCache[wordKey] : null;

      return (
        <span 
          key={`${source}-${index}`} 
          onClick={(e) => handleWordClick(e, token, index, source)}
          onContextMenu={(e) => handleRightClick(e, token)}
          className={`relative group inline-block ${colorClasses} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isSearchMatch ? 'bg-yellow-200 ring-2 ring-yellow-400 text-slate-800' : ''}`}
        >
          {romanization && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-800 text-white text-[0.8rem] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
              {romanization}
            </span>
          )}
          {token}
        </span>
      );
    });
  };

  const filteredLibrary = useMemo(() => {
    const searchLower = librarySearch.toLowerCase();
    return library.filter(book => 
      book.title.toLowerCase().includes(searchLower) || 
      book.chapters.some(c => c.text.toLowerCase().includes(searchLower))
    );
  }, [library, librarySearch]);

  const vocabList = useMemo(() => {
    const searchLower = vocabSearch.toLowerCase();
    return Object.entries(vocab)
      .filter(([word]) => word.toLowerCase().includes(searchLower))
      .sort((a, b) => {
         const timeA = typeof a[1] === 'object' ? (a[1].lastUsed || 0) : 0;
         const timeB = typeof b[1] === 'object' ? (b[1].lastUsed || 0) : 0;
         return timeB - timeA;
      });
  }, [vocab, vocabSearch]);

  const playButtonText = isSentenceMode 
    ? (isStoryAudioLoading ? 'Buffering...' : 'Play Sentence') 
    : (isStoryAudioLoading ? 'Buffering...' : 'Play Chapter');
    
  const translateButtonText = isSentenceMode 
    ? (showFullTranslationToggle ? 'Hide Translation' : 'Translate Sentence') 
    : (showFullTranslationToggle ? 'Hide Translation' : 'Translate Chapter');

  if (!isInitialized) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>;
  }

  const currentSeparator = currentLang && ['zh-CN', 'zh-TW', 'ja'].includes(currentLang.code) ? '' : ' ';
  const displayPhrase = selectedWords.map(w => w.token).join(currentSeparator);
  const currentPhraseKey = selectedWords.map(w => w.clean).join(currentSeparator);
  
  const phraseVocabEntry = vocab[currentPhraseKey];
  const phraseStatus = phraseVocabEntry ? (typeof phraseVocabEntry === 'string' ? phraseVocabEntry : phraseVocabEntry.status) : null;
  
  const isPhraseKnown = selectedWords.length > 0 && phraseStatus === 'known';
  const isPhraseLearning = selectedWords.length > 0 && phraseStatus === 'learning';
  
  const activePlanChapter = studyPlan.find(p => p.id === activePlanChapterId);

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32"
      onClick={() => {
        setSelectedWords([]);
        setInfoPopup(null);
        stopAudio(); 
      }}
    >
      {/* Header */}
      <header 
        className="bg-blue-700 text-white shadow-md px-4 py-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-200" />
              <h1 className="text-xl font-bold tracking-tight hidden sm:block">Input Reader</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <select 
              value={currentLang?.code || ""}
              onChange={handleLanguageChange}
              className="bg-blue-800 border border-blue-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 cursor-pointer outline-none"
            >
              <option value="" disabled>-- Select Language --</option>
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>

            {currentLang && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-blue-800 px-3 py-2 rounded-lg border border-blue-600 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-300" />
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={audioSpeed}
                    onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
                    className="w-20 sm:w-24 h-1.5 bg-blue-900 rounded-lg appearance-none cursor-pointer"
                    title="Playback Speed"
                  />
                  <span className="text-xs font-bold text-blue-100 w-8 text-right">{audioSpeed.toFixed(1)}x</span>
                </div>
                <div className="hidden sm:block w-px h-5 bg-blue-600"></div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-blue-100 font-medium">
                    <input 
                      type="radio" 
                      name="voiceGender" 
                      value="Aoede" 
                      checked={audioVoice === 'Aoede'} 
                      onChange={(e) => setAudioVoice(e.target.value)}
                      className="accent-blue-400 w-3.5 h-3.5"
                    /> Female
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-blue-100 font-medium">
                    <input 
                      type="radio" 
                      name="voiceGender" 
                      value="Puck" 
                      checked={audioVoice === 'Puck'} 
                      onChange={(e) => setAudioVoice(e.target.value)}
                      className="accent-blue-400 w-3.5 h-3.5"
                    /> Male
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsPlanVisible(!isPlanVisible)}
            disabled={!currentLang}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 border ${isPlanVisible ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-800 text-white border-blue-600 hover:bg-blue-900'}`}
            title="Toggle Study Plan Sidebar"
          >
            <Map className="w-4 h-4" /> <span className="hidden sm:inline">Study Plan</span>
          </button>
          
          <div className="hidden sm:block w-px h-6 bg-blue-600 mx-1"></div>
          
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            disabled={!currentLang}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={!currentLang}
            className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-blue-800 hover:bg-blue-900 rounded-lg text-sm transition-colors disabled:opacity-50"
            title="Import Vocabulary Progress"
          >
            <Upload className="w-4 h-4" /> <span className="hidden lg:inline">Import Vocab</span>
          </button>
          <button 
            onClick={handleExport}
            disabled={!currentLang}
            className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-blue-800 hover:bg-blue-900 rounded-lg text-sm transition-colors disabled:opacity-50"
            title="Export Vocabulary Progress"
          >
            <Download className="w-4 h-4" /> <span className="hidden lg:inline">Export Vocab</span>
          </button>
        </div>
      </header>

      {/* 3-COLUMN MAIN LAYOUT */}
      <div className="max-w-[1800px] mx-auto w-full px-4 py-6 flex flex-col xl:flex-row gap-6 items-start">
        
        {/* LEFT SIDEBAR: LIBRARY */}
        {isLibraryVisible && (
          <aside className="w-full xl:w-72 2xl:w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px] xl:h-[calc(100vh-120px)] xl:sticky xl:top-24" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
              <h2 className="font-bold text-slate-700 flex items-center gap-2">
                <Library className="w-5 h-5 text-indigo-600" /> Library
              </h2>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  accept=".json" 
                  ref={libraryFileInputRef} 
                  onChange={handleImportLibrary} 
                  className="hidden" 
                  disabled={!currentLang}
                />
                <button 
                  onClick={() => libraryFileInputRef.current?.click()}
                  disabled={!currentLang}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:opacity-50"
                  title="Import Library JSON"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleExportLibrary}
                  disabled={!currentLang || library.length === 0}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:opacity-50"
                  title="Export Library JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={saveCurrentStory}
                  disabled={!currentLang || !inputText || isChatOpen}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
            
            <div className="p-3 border-b border-slate-200">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  value={librarySearch}
                  onChange={e => setLibrarySearch(e.target.value)}
                  placeholder="Search books..."
                  className="w-full bg-transparent focus:outline-none text-sm text-slate-700"
                  disabled={!currentLang}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {!currentLang ? (
                <p className="text-center text-slate-400 mt-10 text-sm">Select a language to view your library.</p>
              ) : filteredLibrary.length === 0 ? (
                <p className="text-center text-slate-400 mt-10 text-sm">No books saved yet.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredLibrary.map(book => (
                    <div 
                      key={book.id} 
                      onClick={() => loadStory(book)}
                      className={`p-3 bg-white border ${activeStoryId === book.id && !isChatOpen ? 'border-indigo-500 shadow-md bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'} rounded-lg cursor-pointer transition-all group relative`}
                    >
                      <div className="flex justify-between items-start mb-1 pr-6">
                        <h3 className="font-bold text-slate-800 text-sm truncate" title={book.title}>{book.title}</h3>
                        
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => deleteStory(e, book.id)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                            title="Delete Book"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <span className="text-slate-500 flex items-center gap-1">
                          <BookA className="w-3 h-3"/> {book.chapters.length} Chapter{book.chapters.length !== 1 ? 's' : ''} 
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">{book.chapters[0].level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* CENTER MAIN EDITOR */}
        <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col">
          
          {currentLang ? (
            isChatOpen ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[600px] xl:h-[calc(100vh-120px)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                 <div className="bg-indigo-600 text-white px-5 py-4 flex justify-between items-center shrink-0">
                   <div>
                     <h2 className="font-bold flex items-center gap-2 text-lg">
                       <MessageCircle className="w-5 h-5"/> {currentLang?.name} Language Tutor
                     </h2>
                   </div>
                   <div className="flex items-center gap-2">
                     <button onClick={handleSaveChatAsBook} className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors" title="Save Chat as Book">
                       <Save className="w-4 h-4"/> Save as Book
                     </button>
                     <div className="h-6 w-px bg-indigo-400 mx-2"></div>
                     <button onClick={() => setIsLibraryVisible(!isLibraryVisible)} className={`p-2 rounded-lg transition-colors ${isLibraryVisible ? 'bg-indigo-800' : 'bg-indigo-500 hover:bg-indigo-400'}`} title="Toggle Library Sidebar">
                        <Library className="w-4 h-4" />
                     </button>
                     <button onClick={() => setIsVocabVisible(!isVocabVisible)} className={`p-2 rounded-lg transition-colors ${isVocabVisible ? 'bg-indigo-800' : 'bg-indigo-500 hover:bg-indigo-400'}`} title="Toggle Vocab Viewer Sidebar">
                        <BookMarked className="w-4 h-4" />
                     </button>
                     <div className="h-6 w-px bg-indigo-400 mx-2"></div>
                     <button onClick={() => { setChatMessages([]); setChatInput(""); handleOpenChat(); }} className="p-2 bg-indigo-700 hover:bg-indigo-800 rounded-full transition-colors" title="Restart Conversation">
                       <Undo2 className="w-4 h-4"/>
                     </button>
                     <button onClick={() => setIsChatOpen(false)} className="p-2 text-indigo-200 hover:text-white transition-colors" title="Close Chat">
                       <X className="w-6 h-6"/>
                     </button>
                   </div>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 flex flex-col gap-4" ref={chatScrollRef} onClick={() => { setSelectedWords([]); setInfoPopup(null); }}>
                    {chatMessages.length === 0 && !isChatLoading && (
                       <div className="m-auto text-slate-400 text-center">
                         <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                         <p>Ready to chat! Starting connection...</p>
                       </div>
                    )}
                    {chatMessages.map((msg, idx) => (
                       <div key={idx} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                          <div className={`px-4 py-3 text-[1.05rem] leading-relaxed shadow-sm relative group ${
                             msg.role === 'user' 
                             ? 'bg-blue-600 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl' 
                             : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
                          }`}>
                             {msg.role === 'model' && msg.feedback && (
                               <div className="text-sm text-indigo-600 mb-2 italic border-b border-indigo-100 pb-2">
                                  {msg.feedback}
                               </div>
                             )}
                             
                             {renderInteractiveTokens(chatTokensArray[idx], `chat-${idx}`, msg.role === 'user')}
                             
                             {msg.role === 'model' && (
                               <div className="absolute -right-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button 
                                   onClick={() => playWordPhraseAudio(msg.text)}
                                   className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-full shadow-sm border border-slate-200"
                                   title="Listen to message"
                                 >
                                   <Volume2 className="w-4 h-4" />
                                 </button>
                                 {msg.hiddenTarget && (
                                   <button 
                                     onClick={() => toggleChatHint(idx)}
                                     className={`p-1.5 transition-colors rounded-full shadow-sm border ${msg.isHintOpen ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-400 hover:text-amber-500 bg-white border-slate-200'}`}
                                     title="Show Hint (Hidden Target)"
                                   >
                                     <Lightbulb className="w-4 h-4" />
                                   </button>
                                 )}
                               </div>
                             )}
                             
                             {msg.role === 'model' && msg.isHintOpen && msg.hiddenTarget && (
                               <div className="mt-3 text-sm bg-amber-50 text-amber-800 border border-amber-200 p-2 rounded flex items-center gap-2">
                                 <Lightbulb className="w-4 h-4 text-amber-500 shrink-0"/>
                                 <span><strong>Target:</strong> Try to use <em>"{msg.hiddenTarget}"</em> in your reply!</span>
                               </div>
                             )}
                          </div>
                       </div>
                    ))}
                    {isChatLoading && (
                       <div className="self-start items-start flex gap-2 text-slate-400 px-4 py-3">
                         <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                         <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '150ms'}}></span>
                         <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '300ms'}}></span>
                       </div>
                    )}
                 </div>
                 
                 <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                    <div className="flex gap-2 relative">
                      <input 
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSendChatMessage(); }}
                        placeholder={`Type your message in ${currentLang?.name}...`}
                        className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-800"
                        disabled={isChatLoading}
                        autoFocus
                      />
                      <button 
                        onClick={handleSendChatMessage}
                        disabled={isChatLoading || !chatInput.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
              </div>
            ) : (
            <>
              {/* Top Toolbar (Play, Search, Undo, Edit Mode) */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                
                {/* Left Group: Play/Stop, Search, Prep */}
                <div className="flex flex-wrap items-center gap-2">
                  {isReading && inputText && (
                    <>
                      {isPlayingFullStory ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); stopAudio(); }}
                          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors w-44"
                        >
                          {isStoryAudioLoading ? (
                            <span className="w-5 h-5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></span>
                          ) : (
                            <StopCircle className="w-5 h-5" /> 
                          )}
                          {isStoryAudioLoading ? 'Buffering...' : 'Stop Audio'}
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); playFullStory(); }}
                          disabled={!hasTTS || isStoryAudioLoading}
                          className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-44"
                        >
                          {isStoryAudioLoading ? (
                            <span className="w-5 h-5 border-2 border-indigo-300 border-t-indigo-700 rounded-full animate-spin"></span>
                          ) : (
                            <Volume2 className="w-5 h-5" /> 
                          )}
                          {playButtonText}
                        </button>
                      )}
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFullStoryTranslation(); }}
                        disabled={isTranslatingFullStory && !showFullTranslationToggle}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors border ${showFullTranslationToggle ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700' : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 disabled:opacity-50'}`}
                      >
                        {isTranslatingFullStory && !showFullTranslationToggle ? (
                           <span className="w-5 h-5 border-2 border-indigo-300 border-t-indigo-700 rounded-full animate-spin"></span>
                        ) : (
                           <Languages className="w-5 h-5" />
                        )}
                        <span className="hidden sm:inline">{translateButtonText}</span>
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleGeneratePPS(); }}
                        disabled={isGeneratingPPS}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors border ${showPPS ? 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 disabled:opacity-50'}`}
                      >
                        {isGeneratingPPS ? (
                           <span className="w-5 h-5 border-2 border-purple-300 border-t-purple-700 rounded-full animate-spin"></span>
                        ) : (
                           <LayoutList className="w-5 h-5" />
                        )}
                        <span className="hidden sm:inline">Prep Summary</span>
                      </button>
                    </>
                  )}

                  {/* Search Bar */}
                  {isReading && inputText && !isSentenceMode && (
                    <div 
                      className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Search className="w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search text..."
                        className="w-28 sm:w-32 focus:outline-none text-sm text-slate-700"
                      />
                      {searchResults.length > 0 && (
                        <>
                          <span className="text-xs text-slate-400 font-medium">
                            {currentSearchIndex + 1}/{searchResults.length}
                          </span>
                          <button 
                            onClick={handleNextSearch}
                            className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                            title="Find Next"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Group: View Toggles, Undo, Toggle Mode */}
                <div className="flex items-center gap-2 ml-auto">
                  {isReading && inputText && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSentenceMode(); }}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm border transition-colors ${isSentenceMode ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                      title={isSentenceMode ? "Exit Sentence Mode" : "Focus Mode (One sentence at a time)"}
                    >
                      {isSentenceMode ? <Maximize className="w-5 h-5" /> : <Minimize className="w-5 h-5" />}
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowHighlights(!showHighlights); }}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm border transition-colors ${showHighlights ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    title="Toggle Focus Mode (Hide Highlights)"
                  >
                    {showHighlights ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setIsLibraryVisible(!isLibraryVisible); }}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm border transition-colors ${isLibraryVisible ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    title="Toggle Library Sidebar"
                  >
                    <Library className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsVocabVisible(!isVocabVisible); }}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-sm border transition-colors mr-2 ${isVocabVisible ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    title="Toggle Vocab Viewer Sidebar"
                  >
                    <BookMarked className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleUndo(); }}
                    disabled={vocabHistory.length === 0}
                    className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg shadow-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo last vocabulary status change"
                  >
                    <Undo2 className="w-5 h-5" /> <span className="hidden sm:inline">Undo</span>
                  </button>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsReading(!isReading);
                      setSelectedWords([]);
                      setSearchQuery("");
                      setShowPPS(false);
                      setPpsData(null);
                    }}
                    className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-white hover:bg-slate-900 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors"
                  >
                    {isReading ? (
                      <><Edit3 className="w-5 h-5" /> <span className="hidden sm:inline">Edit Text</span></>
                    ) : (
                      <><BookOpen className="w-5 h-5" /> <span className="hidden sm:inline">Start Reading</span></>
                    )}
                  </button>
                </div>
              </div>

              {/* Editor / Reader Views */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 min-h-[400px] flex flex-col relative" onClick={(e) => e.stopPropagation()}>

                {/* NEW BOOK Generator Panel */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                     <h3 className="font-bold text-blue-900 text-sm uppercase tracking-wide">Start a New Book</h3>
                     <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm w-48">
                       <span className="text-xs font-bold text-blue-800 shrink-0">Length:</span>
                       <input
                         type="range"
                         min="5"
                         max="250"
                         step="5"
                         value={targetChapterLength}
                         onChange={(e) => setTargetChapterLength(parseInt(e.target.value))}
                         className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                         title="Target Words"
                       />
                       <span className="text-xs font-bold text-blue-900 w-8 text-right">{targetChapterLength}</span>
                     </div>
                  </div>
                  
                  {activePlanChapter && (
                    <div className="bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 flex items-center justify-between shadow-sm">
                       <div className="flex items-center gap-2">
                         <Map className="w-4 h-4 text-blue-600" />
                         <span className="text-sm font-semibold text-blue-800">Focus: {activePlanChapter.title}</span>
                       </div>
                       <button 
                         onClick={() => setActivePlanChapterId(null)} 
                         className="text-blue-500 hover:text-blue-800 p-1"
                         title="Clear Focus"
                       >
                         <X className="w-4 h-4" />
                       </button>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-3 items-start w-full">
                    <div className="flex-1 w-full flex flex-col gap-3">
                      <textarea 
                        value={storyTopic}
                        onChange={(e) => setStoryTopic(e.target.value)}
                        placeholder={`Provide a plot topic or inspiration in ${currentLang.name} (optional)...`}
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 resize-y"
                        rows={2}
                        disabled={isGeneratingStory}
                      />
                      <textarea 
                        value={storyMeta}
                        onChange={(e) => setStoryMeta(e.target.value)}
                        placeholder="Meta instructions (e.g., 'Make it a poem', 'Focus on past tense conjugations', 'Use slang')..."
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 resize-y"
                        rows={2}
                        disabled={isGeneratingStory}
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                      <select 
                        value={storyLevel}
                        onChange={(e) => setStoryLevel(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 cursor-pointer"
                        disabled={isGeneratingStory}
                      >
                        <option value="A0">A0 (Absolute Beginner)</option>
                        <option value="A1">A1 (Beginner)</option>
                        <option value="A2">A2 (Elementary)</option>
                        <option value="B1">B1 (Intermediate)</option>
                        <option value="B2">B2 (Upper Int.)</option>
                        <option value="C1">C1 (Advanced)</option>
                      </select>
                      
                      <div className="flex flex-col gap-2 w-full">
                        <button 
                          onClick={handleGenerateStory}
                          disabled={isGeneratingStory}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                          title="Starts a completely new story book thread"
                        >
                          {isGeneratingStory ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Sparkles className="w-5 h-5" />
                          )}
                          New Book
                        </button>
                        
                        <button 
                          onClick={handleOpenChat}
                          disabled={isGeneratingStory}
                          className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                          title="Start a freeform conversational roleplay based on these inputs"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Roleplay Chat
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Chapter Navigator UI */}
                  {activeChapters.length > 0 && isReading && (
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-blue-200/60">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => goToChapter(activeChapterIndex - 1)} 
                          disabled={activeChapterIndex === 0}
                          className="p-1.5 rounded bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-bold text-blue-900 px-2">
                          Chapter {activeChapterIndex + 1} of {activeChapters.length}
                        </span>
                        <button 
                          onClick={() => goToChapter(activeChapterIndex + 1)} 
                          disabled={activeChapterIndex === activeChapters.length - 1}
                          className="p-1.5 rounded bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {isReading && activeChapters.length > 0 && (
                   <div className="mb-6 flex flex-col gap-1 border-b border-slate-200 pb-4">
                       {isEditingBookTitle ? (
                         <input
                           autoFocus
                           onBlur={() => setIsEditingBookTitle(false)}
                           onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingBookTitle(false); }}
                           className="text-3xl font-extrabold text-slate-900 w-full bg-transparent focus:outline-none focus:border-b-2 border-blue-200 placeholder-slate-300 mb-2"
                           value={bookTitle}
                           onChange={e => setBookTitle(e.target.value)}
                           placeholder="Book Title"
                         />
                       ) : (
                         <div className="group relative flex items-center gap-3 mb-2">
                           <div className="text-3xl font-extrabold text-slate-900 leading-normal flex-1">
                             {renderInteractiveTokens(titleTokens, 'title')}
                           </div>
                           <button onClick={() => setIsEditingBookTitle(true)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-blue-600 transition-opacity" title="Edit Book Title">
                             <Edit3 className="w-5 h-5" />
                           </button>
                         </div>
                       )}

                       {isEditingChapterTitle ? (
                         <input
                           autoFocus
                           onBlur={() => setIsEditingChapterTitle(false)}
                           onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingChapterTitle(false); }}
                           className="text-xl font-bold text-slate-500 w-full bg-transparent focus:outline-none focus:border-b-2 border-blue-200 placeholder-slate-300"
                           value={activeChapters[activeChapterIndex]?.chapterTitle || `Chapter ${activeChapterIndex + 1}`}
                           onChange={e => {
                               const newChapters = [...activeChapters];
                               newChapters[activeChapterIndex].chapterTitle = e.target.value;
                               setActiveChapters(newChapters);
                           }}
                           placeholder="Chapter Title"
                         />
                       ) : (
                         <div className="group relative flex items-center gap-3">
                           <div className="text-xl font-bold text-slate-500 leading-normal flex-1">
                             {renderInteractiveTokens(chapterTitleTokens, 'chapter')}
                           </div>
                           <button onClick={() => setIsEditingChapterTitle(true)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 transition-opacity" title="Edit Chapter Title">
                             <Edit3 className="w-4 h-4" />
                           </button>
                         </div>
                       )}
                       
                       {/* Chapter Metadata Badges */}
                       {(activeChapters[activeChapterIndex]?.topic || activeChapters[activeChapterIndex]?.meta) && (
                         <div className="flex flex-wrap gap-2 mt-3">
                           {activeChapters[activeChapterIndex]?.topic && (
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                                Topic: {activeChapters[activeChapterIndex].topic}
                              </span>
                           )}
                           {activeChapters[activeChapterIndex]?.meta && (
                              <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium border border-purple-100">
                                Meta: {activeChapters[activeChapterIndex].meta}
                              </span>
                           )}
                         </div>
                       )}
                   </div>
                )}

                {!isReading ? (
                   <textarea
                     value={inputText}
                     onChange={handleInputTextChange}
                     placeholder={`Paste your ${currentLang.name} text here, or generate a story above to begin...`}
                     className="w-full flex-1 min-h-[300px] text-lg resize-none focus:outline-none focus:ring-0 text-slate-800"
                   />
                ) : (
                  <div 
                    className="flex-1 pb-10"
                    onClick={() => { setSelectedWords([]); setInfoPopup(null); }}
                  >
                    {isGeneratingStory ? (
                       <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-3">
                          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <p>Writing a story in {currentLang.name}...</p>
                       </div>
                    ) : isSentenceMode && sentenceTokensGroups.length > 0 ? (
                       <div className="flex flex-col items-center justify-center py-10 md:py-20 min-h-[300px] transition-all">
                          <div className="text-3xl md:text-4xl leading-relaxed md:leading-loose text-center max-w-4xl text-slate-900 transition-all duration-300">
                             {renderInteractiveTokens(sentenceTokensGroups[currentSentenceIndex] || [], 'body')}
                          </div>
                          <div className="flex items-center gap-4 mt-16 bg-slate-50 border border-slate-200 px-6 py-3 rounded-full shadow-sm text-slate-600">
                             <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentSentenceIndex(0); stopAudio(); setShowFullTranslationToggle(false); setSelectedWords([]); setShowPPS(false); setPpsData(null); }} 
                                disabled={currentSentenceIndex === 0} 
                                className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                title="First Sentence"
                             >
                               <ChevronFirst className="w-5 h-5"/>
                             </button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentSentenceIndex(prev => prev - 1); stopAudio(); setShowFullTranslationToggle(false); setSelectedWords([]); setShowPPS(false); setPpsData(null); }} 
                                disabled={currentSentenceIndex === 0} 
                                className="flex items-center gap-1 p-2 pr-3 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                             >
                               <ChevronLeft className="w-5 h-5"/> Prev
                             </button>
                             <span className="text-sm font-bold tracking-widest uppercase text-slate-400 mx-2">
                                {currentSentenceIndex + 1} / {sentenceTokensGroups.length}
                             </span>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentSentenceIndex(prev => prev + 1); stopAudio(); setShowFullTranslationToggle(false); setSelectedWords([]); setShowPPS(false); setPpsData(null); }} 
                                disabled={currentSentenceIndex === sentenceTokensGroups.length - 1} 
                                className="flex items-center gap-1 p-2 pl-3 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                             >
                               Next <ChevronRight className="w-5 h-5"/>
                             </button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); setCurrentSentenceIndex(sentenceTokensGroups.length - 1); stopAudio(); setShowFullTranslationToggle(false); setSelectedWords([]); setShowPPS(false); setPpsData(null); }} 
                                disabled={currentSentenceIndex === sentenceTokensGroups.length - 1} 
                                className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                title="Last Sentence"
                             >
                               <ChevronLast className="w-5 h-5"/>
                             </button>
                          </div>
                       </div>
                    ) : (
                       <div className="text-xl md:text-2xl leading-relaxed md:leading-loose">
                         {renderInteractiveTokens(bodyTokens, 'body')}
                       </div>
                    )}
                  </div>
                )}

                {/* Continue Story / Next Chapter Panel */}
                {isReading && activeChapters.length > 0 && activeChapterIndex === activeChapters.length - 1 && (
                  <div className="mt-8 p-5 bg-indigo-50/50 border border-indigo-100 rounded-xl flex flex-col gap-3">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-indigo-900 flex items-center gap-2 text-sm uppercase tracking-wide">
                         <Sparkles className="w-4 h-4 text-indigo-600" /> Continue the Story
                      </h4>
                      <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm w-48">
                         <span className="text-xs font-bold text-indigo-800 shrink-0">Length:</span>
                         <input
                           type="range"
                           min="5"
                           max="250"
                           step="5"
                           value={targetChapterLength}
                           onChange={(e) => setTargetChapterLength(parseInt(e.target.value))}
                           className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                           title="Target Words"
                         />
                         <span className="text-xs font-bold text-indigo-900 w-8 text-right">{targetChapterLength}</span>
                       </div>
                    </div>
                    
                    {activePlanChapter && (
                      <div className="bg-indigo-100 border border-indigo-300 rounded-lg px-3 py-2 flex items-center justify-between shadow-sm">
                         <div className="flex items-center gap-2">
                           <Map className="w-4 h-4 text-indigo-700" />
                           <span className="text-sm font-semibold text-indigo-900">Focus: {activePlanChapter.title}</span>
                         </div>
                         <button 
                           onClick={() => setActivePlanChapterId(null)} 
                           className="text-indigo-500 hover:text-indigo-800 p-1"
                           title="Clear Focus"
                         >
                           <X className="w-4 h-4" />
                         </button>
                      </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <textarea 
                        value={nextChapterTopic}
                        onChange={(e) => setNextChapterTopic(e.target.value)}
                        placeholder="What should happen next? (Plot/Topic)"
                        className="w-full px-4 py-2.5 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 resize-y"
                        rows={2}
                        disabled={isGeneratingStory}
                      />
                      <textarea 
                        value={nextChapterMeta}
                        onChange={(e) => setNextChapterMeta(e.target.value)}
                        placeholder="Meta instructions (e.g., 'Use passive voice', 'Make it mysterious')"
                        className="w-full px-4 py-2.5 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 resize-y"
                        rows={2}
                        disabled={isGeneratingStory}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <select 
                        value={nextChapterLevel}
                        onChange={(e) => setNextChapterLevel(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-indigo-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 cursor-pointer"
                        disabled={isGeneratingStory}
                      >
                        <option value="A0">A0 (Absolute Beginner)</option>
                        <option value="A1">A1 (Beginner)</option>
                        <option value="A2">A2 (Elementary)</option>
                        <option value="B1">B1 (Intermediate)</option>
                        <option value="B2">B2 (Upper Int.)</option>
                        <option value="C1">C1 (Advanced)</option>
                      </select>
                      <button 
                        onClick={handleGenerateNextChapter}
                        disabled={isGeneratingStory}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50"
                      >
                        {isGeneratingStory ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                        Next Chapter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
            )
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl border border-slate-200 p-8 text-slate-500 shadow-sm mt-12">
              <BookA className="w-20 h-20 mb-6 opacity-20 text-blue-600" />
              <h2 className="text-3xl font-medium text-slate-700 mb-2">Welcome to Input Reader</h2>
              <p className="text-lg">Please select a language from the menu above to begin your journey.</p>
            </div>
          )}

        </main>

        {/* RIGHT SIDEBAR: STUDY PLAN & VOCAB VIEWER */}
        <div className="flex flex-col gap-6 w-full xl:w-72 2xl:w-80 flex-shrink-0">
          
          {/* STUDY PLAN SIDEBAR */}
          {isPlanVisible && (
            <aside className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[400px] xl:h-[calc(50vh-80px)] xl:sticky xl:top-24" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
                <h2 className="font-bold text-slate-700 flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-600" /> Study Plan
                </h2>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    accept=".json" 
                    ref={planFileInputRef} 
                    onChange={handleImportPlan} 
                    className="hidden" 
                    disabled={!currentLang}
                  />
                  <button 
                    onClick={() => planFileInputRef.current?.click()}
                    disabled={!currentLang}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                    title="Import Study Plan JSON"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleExportPlan}
                    disabled={!currentLang || studyPlan.length === 0}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                    title="Export Study Plan JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-3 border-b border-slate-200">
                 <button 
                    onClick={handleGenerateStudyPlan}
                    disabled={!currentLang || isGeneratingPlan}
                    className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                  >
                    {isGeneratingPlan ? (
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-800 rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Generate New Plan
                  </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {!currentLang ? (
                  <p className="text-center text-slate-400 mt-10 text-sm">Select a language to generate a plan.</p>
                ) : studyPlan.length === 0 ? (
                  <p className="text-center text-slate-400 mt-10 text-sm px-4">Generate a grammatically sequenced curriculum for this language.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {studyPlan.map((chapter, idx) => (
                      <div 
                        key={chapter.id || idx} 
                        onClick={() => setActivePlanChapterId(chapter.id === activePlanChapterId ? null : chapter.id)}
                        className={`p-3 bg-white border ${activePlanChapterId === chapter.id ? 'border-blue-500 shadow-md bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'} rounded-lg cursor-pointer transition-all flex flex-col gap-1 relative group`}
                      >
                        <div className="flex items-start justify-between">
                           <h4 className="font-bold text-slate-800 text-sm leading-tight pr-6">
                             {idx + 1}. {chapter.title}
                           </h4>
                           <button 
                             onClick={(e) => handleExplainPlanChapter(e, chapter)}
                             className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors absolute top-2 right-2"
                             title="Explain Grammatical Concept"
                           >
                             <Info className="w-4 h-4" />
                           </button>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2" title={chapter.description}>{chapter.description}</p>
                        {activePlanChapterId === chapter.id && (
                           <div className="mt-2 text-xs font-bold text-blue-700 bg-blue-100 py-1 px-2 rounded inline-flex self-start items-center gap-1">
                             <CheckCircle className="w-3 h-3" /> Active Focus
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* VOCAB VIEWER SIDEBAR */}
          {isVocabVisible && (
            <aside className={`bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col ${isPlanVisible ? 'h-[400px] xl:h-[calc(50vh-80px)] xl:sticky xl:top-[calc(50vh+40px)]' : 'h-[500px] xl:h-[calc(100vh-120px)] xl:sticky xl:top-24'}`} onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
                <h2 className="font-bold text-slate-700 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-emerald-600" /> Vocab Viewer
                </h2>
                <button 
                  onClick={handleUndo}
                  disabled={vocabHistory.length === 0}
                  className="text-slate-500 hover:text-emerald-700 transition-colors disabled:opacity-50"
                  title="Undo last vocabulary change"
                >
                  <Undo2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-3 border-b border-slate-200">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    value={vocabSearch}
                    onChange={e => setVocabSearch(e.target.value)}
                    placeholder="Search vocabulary..."
                    className="w-full bg-transparent focus:outline-none text-sm text-slate-700"
                    disabled={!currentLang}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {!currentLang ? (
                  <p className="text-center text-slate-400 mt-10 text-sm">Select a language to view vocabulary.</p>
                ) : vocabList.length === 0 ? (
                  <p className="text-center text-slate-400 mt-10 text-sm">No saved vocabulary.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {vocabList.map(([wordKey, data]) => {
                      const status = typeof data === 'string' ? data : data.status;
                      const isPhrase = typeof data === 'object' ? data.isPhrase : wordKey.includes(' ');
                      const romanization = TRANSLITERATE_LANGS.includes(currentLang.code) ? romanizationCache[wordKey] : null;
                      const activeTranslation = vocabTranslations[wordKey];
                      
                      return (
                        <div 
                          key={wordKey} 
                          onContextMenu={(e) => handleRightClick(e, wordKey)}
                          className="p-3 bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm rounded-lg transition-all relative flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="relative group inline-block max-w-fit">
                              <span className="font-bold text-slate-800 text-base cursor-pointer inline-block">{wordKey}</span>
                              {romanization && (
                                <span className="absolute top-full left-0 mt-1 hidden group-hover:block bg-slate-800 text-white text-[0.75rem] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                                  {romanization}
                                </span>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status === 'known' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {status}
                            </span>
                          </div>
                          
                          {activeTranslation && (
                            <div className="mt-1 text-sm text-indigo-800 bg-indigo-50 p-2 rounded border border-indigo-100 leading-relaxed whitespace-pre-wrap">
                              {activeTranslation}
                            </div>
                          )}

                          <div className="flex items-center gap-1 justify-end mt-1">
                            <button 
                              onClick={(e) => handleTranslateVocab(e, wordKey)}
                              className={`p-1.5 rounded transition-colors ${activeTranslation ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                              title="Translate"
                            >
                              {isVocabTranslating[wordKey] ? (
                                 <span className="block w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></span>
                              ) : (
                                 <Languages className="w-4 h-4" />
                              )}
                            </button>

                            <button 
                              onClick={(e) => { e.stopPropagation(); playWordPhraseAudio(wordKey); }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Play Audio"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            
                            {isPhrase && (
                              <button 
                                onClick={(e) => handleVocabGrammar(e, wordKey)}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                title="Grammar Explanation"
                              >
                                <GraduationCap className="w-4 h-4" />
                              </button>
                            )}

                            <button 
                              onClick={(e) => handleRemoveVocab(e, wordKey)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Remove from vocabulary"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

      </div>

      {/* Action Bar (Fixed at bottom when words are selected, story translation is open, grammar info is open, or PPS is open) */}
      {(selectedWords.length > 0 || showFullTranslationToggle || infoPopup || showPPS) && currentLang && (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.1)] p-4 transform transition-transform duration-300 ease-in-out z-50 max-h-[60vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-4">

            {/* PRE-PROCESSING SUMMARY (PPS) Popup */}
            {showPPS && ppsData && !isGeneratingPPS && (
              <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-200 relative shadow-sm">
                 <button onClick={() => setShowPPS(false)} className="absolute top-4 right-4 text-purple-400 hover:text-purple-700 bg-white rounded-full p-1 shadow-sm border border-purple-100"><X className="w-5 h-5"/></button>
                 <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2 border-b border-purple-100 pb-3">
                   <LayoutList className="w-6 h-6 text-purple-600"/> Pre-Processing Summary
                 </h3>
                 
                 <div className="space-y-6">
                    <section>
                       <h4 className="font-bold text-purple-800 text-sm uppercase tracking-wide">1. Plot Summary</h4>
                       <p className="text-purple-950 text-base mt-2 leading-relaxed bg-white p-3 rounded-lg border border-purple-100 shadow-sm">{ppsData.summary}</p>
                    </section>
                    
                    <section>
                       <h4 className="font-bold text-purple-800 text-sm uppercase tracking-wide">2. Key Vocabulary</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                         {ppsData.newWords?.map((word, i) => (
                           <div key={i} className="bg-white border border-purple-200 p-3 rounded-lg shadow-sm flex flex-col justify-center gap-1 hover:border-purple-400 transition-colors">
                             <div className="flex justify-between items-start">
                               <div className="group relative inline-block">
                                 <span className="font-bold text-slate-800 text-lg cursor-help border-b border-dashed border-slate-300 pb-0.5">{word.term}</span>
                                 {word.transliteration && (
                                   <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-[0.85rem] px-2.5 py-1 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                                     {word.transliteration}
                                   </span>
                                 )}
                               </div>
                               <div className="flex gap-1 ml-2 shrink-0">
                                  <button onClick={() => playWordPhraseAudio(word.term)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Listen"><Volume2 className="w-4 h-4"/></button>
                                  <button onClick={(e) => handleVocabGrammar(e, word.term)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Grammar Check"><GraduationCap className="w-4 h-4"/></button>
                                  <button onClick={(e) => addTermToVocab(e, word.term)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Add to Learning"><Plus className="w-4 h-4"/></button>
                               </div>
                             </div>
                             <span className="text-sm text-slate-600 font-medium">{word.translation}</span>
                           </div>
                         ))}
                       </div>
                    </section>
                    
                    <section>
                       <h4 className="font-bold text-purple-800 text-sm uppercase tracking-wide">3. Grammatical Templates</h4>
                       <div className="space-y-3 mt-2">
                         {ppsData.structures?.map((struct, i) => (
                           <div key={i} className="bg-white border border-purple-200 p-4 rounded-lg shadow-sm group relative hover:border-purple-400 transition-colors">
                             <div className="flex justify-between items-start mb-2">
                               <div className="group relative inline-block">
                                 <span className="font-bold text-indigo-700 text-lg cursor-help">{struct.template}</span>
                                 {struct.transliteration && (
                                   <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-[0.85rem] px-2.5 py-1 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
                                     {struct.transliteration}
                                   </span>
                                 )}
                               </div>
                               <div className="flex gap-1 ml-4 shrink-0">
                                  <button onClick={() => playWordPhraseAudio(struct.template)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Listen"><Volume2 className="w-4 h-4"/></button>
                                  <button onClick={(e) => addTermToVocab(e, struct.template)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Add to Learning"><Plus className="w-4 h-4"/></button>
                               </div>
                             </div>
                             <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">{struct.explanation}</p>
                           </div>
                         ))}
                       </div>
                    </section>
                 </div>
              </div>
            )}

            {/* Grammar / Etymology Popup */}
            {infoPopup && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm w-full relative">
                <div className="flex justify-between items-start mb-2 border-b border-indigo-100 pb-2">
                  <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> {infoPopup.title}
                  </h3>
                  <button onClick={() => setInfoPopup(null)} className="text-indigo-400 hover:text-indigo-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="pr-1">
                  {infoPopup.isLoading ? (
                    <div className="flex items-center gap-2 text-indigo-500 py-2">
                      <div className="w-5 h-5 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
                      <span>Unearthing linguistic secrets...</span>
                    </div>
                  ) : (
                    <div 
                      className="leading-relaxed text-indigo-950 text-base"
                      dangerouslySetInnerHTML={formatMarkdown(infoPopup.text)}
                    />
                  )}
                </div>
              </div>
            )}
            
            {/* Word / Phrase Translation Block */}
            {selectedWords.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => { setSelectedWords([]); setInfoPopup(null); }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-slate-800 tracking-wide truncate" title={displayPhrase}>
                        {displayPhrase}
                      </h2>
                      <button 
                        onClick={() => playWordPhraseAudio(displayPhrase)}
                        className={`p-2 rounded-full transition-colors flex-shrink-0 text-blue-600 hover:bg-blue-50 relative`}
                        title={"Play Phrase Audio"}
                      >
                        {isAudioLoading && <span className="absolute inset-0 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin m-1"></span>}
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="min-h-[24px]">
                      <div className={`transition-opacity duration-200 ${isTranslating ? 'opacity-50' : 'opacity-100'}`}>
                        {translation && (
                          <p className="text-sm text-blue-700 font-medium mt-0.5 truncate" title={translation}>
                            {translation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0 flex-shrink-0">
                  <div className="flex w-full md:w-auto gap-2">
                    <button 
                      onClick={() => updateWordStatus('known')}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                        isPhraseKnown 
                        ? 'bg-emerald-600 text-white shadow-inner' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" /> Known
                    </button>
                    
                    <button 
                      onClick={() => updateWordStatus('learning')}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                        isPhraseLearning 
                        ? 'bg-amber-500 text-white shadow-inner' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <Clock className="w-5 h-5" /> Learning
                    </button>
                  </div>

                  <div className="flex w-full md:w-auto gap-2">
                    <button 
                      onClick={handleExplainGrammar}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded-lg font-medium transition-colors"
                      title="Explain syntax, grammar, and inflection"
                    >
                      <GraduationCap className="w-5 h-5" />
                      Grammar
                    </button>
                    <button 
                      onClick={handleTranslateSentence}
                      disabled={isTranslatingSentence || !activeSentence}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                      title="Translate surrounding sentence"
                    >
                      {isTranslatingSentence ? (
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                      ) : (
                        <AlignLeft className="w-5 h-5" />
                      )}
                      Sentence
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Sentence Translation Box */}
            {selectedWords.length > 0 && sentenceTranslation && (
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2 bg-slate-100 p-3 rounded-lg border border-slate-200">
                  <AlignLeft className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {sentenceTranslation}
                  </p>
                </div>
              </div>
            )}

            {/* Full Story Translation Box */}
            {showFullTranslationToggle && (
              <div className={`pt-3 ${selectedWords.length > 0 ? 'border-t border-slate-100' : ''}`}>
                <div className="flex items-start gap-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 relative">
                  <Languages className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-indigo-800 mb-1">
                      {isSentenceMode ? "Sentence Translation" : "Chapter Translation"}
                    </h4>
                    {isTranslatingFullStory ? (
                       <div className="flex items-center gap-2 text-indigo-500 py-2">
                         <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-700 rounded-full animate-spin"></div>
                         <span className="text-sm">Translating...</span>
                       </div>
                    ) : (
                       <p className="text-sm text-indigo-900 leading-relaxed font-medium whitespace-pre-wrap pr-6">
                         {fullStoryTranslation}
                       </p>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowFullTranslationToggle(false)} 
                    className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}