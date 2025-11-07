"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SceneFact = {
  label: string;
  value: string;
};

type Scene = {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  facts: SceneFact[];
  quote: {
    text: string;
    author: string;
  };
  highlight: string;
  duration: number;
  background: string;
  overlay: string;
  texture: string;
  camera: {
    scale: number;
    x: number;
    y: number;
  };
  accent: string;
  voiceover: string;
};

const SCENES: Scene[] = [
  {
    id: "promise",
    title: "A Promise of Marble",
    subtitle: "Agra, 1631",
    description: [
      "Dawn lights the Yamuna in soft gold as a mourning emperor imagines a monument worthy of eternal memory.",
      "Students witness how a vow can mobilise poets, mathematicians, and artisans across continents."
    ],
    facts: [
      { label: "Moment", value: "Mumtaz Mahal's passing at Burhanpur" },
      { label: "Response", value: "Shah Jahan pledges an eternal memorial" },
      { label: "Lesson", value: "Emotion becomes the blueprint for innovation" }
    ],
    quote: {
      text: "हमारी मोहब्बत पत्थरों में सांस लेगी।",
      author: "Shah Jahan"
    },
    highlight: "The vow that ignited twenty thousand minds.",
    duration: 43000,
    background:
      "linear-gradient(135deg, #150b0d 0%, #3b1a1a 38%, #b78544 100%)",
    overlay:
      "radial-gradient(circle at 20% 25%, rgba(255, 224, 167, 0.4), transparent 58%), radial-gradient(circle at 82% 65%, rgba(90, 15, 38, 0.32), transparent 55%)",
    texture:
      "radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.05) 0%, transparent 38%), radial-gradient(circle at 75% 28%, rgba(255, 255, 255, 0.04) 0%, transparent 42%), linear-gradient(120deg, rgba(255, 247, 235, 0.1), transparent)",
    camera: {
      scale: 1.12,
      x: -3,
      y: -2
    },
    accent: "#f5cd8b",
    voiceover:
      "सूर्योदय की सुनहरी आभा में यमुना शांत बह रही है। महल की दीवारों पर पिघलते मोती जैसे ओस चमक रही है और शाहजहाँ मौन खड़े हैं, हाथों में वह प्रतिज्ञा जो प्रेम और शोक का संगम बन गई। 1631 में मुमताज़ की अंतिम साँसों के साथ उन्होंने वचन दिया कि उनके प्रेम को पत्थर में बसा देंगे। इसी संकल्प ने कलाकारों, कवियों और वैज्ञानिकों को एकजुट किया। यह कहानी केवल महल की नहीं, उस भावना की है जिसमें हर ईंट इंसानी दिल की धड़कन बन गई। आइए, उस प्रतिज्ञा के साथ आगे बढ़ें जिसने इतिहास को सोने की रोशनी से रंग दिया।"
  },
  {
    id: "blueprint",
    title: "Designing Eternity",
    subtitle: "The imperial studios",
    description: [
      "Architects, astronomers, and planners align maps with the stars to script a celestial geometry.",
      "Learners see mathematics and poetry woven into a single architectural sentence."
    ],
    facts: [
      { label: "Chief Architect", value: "Ustad Ahmad Lahori" },
      { label: "Design Principle", value: "Perfect bilateral symmetry" },
      { label: "Site Science", value: "Soil readings along the Yamuna floodplain" }
    ],
    quote: {
      text: "जगह का हर कोना आकाश की दिशा से तय होगा।",
      author: "Ustad Ahmad Lahori"
    },
    highlight: "Blueprints blend astronomy, geometry, and devotion.",
    duration: 45000,
    background:
      "linear-gradient(120deg, #0d1724 0%, #1f2f48 42%, #a6b4d5 100%)",
    overlay:
      "radial-gradient(circle at 18% 32%, rgba(126, 194, 255, 0.38), transparent 56%), radial-gradient(circle at 80% 72%, rgba(18, 48, 87, 0.45), transparent 64%)",
    texture:
      "radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 30%), radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 38%), linear-gradient(160deg, rgba(18, 27, 54, 0.45), rgba(6, 9, 20, 0.2))",
    camera: {
      scale: 1.1,
      x: 2,
      y: -4
    },
    accent: "#9cc3ff",
    voiceover:
      "दरबार में उस्ताद अहमद लाहौरी अपने शिष्यों के संग नक्शे बुन रहे हैं। फ़ारसी ज्योतिषी तारों की चाल से दिशाएँ चुनते हैं, जबकि इंजीनियर यमुना की मिट्टी जांचते हैं। शाहजहाँ का आदेश स्पष्ट है—एक ऐसा धाम जो समरूपता में स्वर्ग को छू ले। संगमरमर मकबरे की रेखाओं से लेकर चारदीवारी के बगीचों तक, हर रेखा गणित और कविता का संगम है। योजना की हर परत सवाल करती है: प्रेम को हम किस रूप में संरक्षित करें? जवाब मिलता है—संगठन, संतुलन और प्रकाश की भाषा में।"
  },
  {
    id: "craft",
    title: "Hands of Many Nations",
    subtitle: "A global atelier",
    description: [
      "Workshops ring with chisels and poetry as artisans from Rajasthan to Bukhara craft shared symbolism.",
      "Students experience diversity translating into a single visual hymn."
    ],
    facts: [
      { label: "Artisans", value: "Over 20,000 master craftsmen" },
      { label: "Techniques", value: "Pietra dura inlay & Makrana marble carving" },
      { label: "Cultural Blend", value: "Persian calligraphy meets Sanskrit motifs" }
    ],
    quote: {
      text: "जहाँ कला मिलती है, वहाँ सीमाएँ मिट जाती हैं।",
      author: "Workshop foreman"
    },
    highlight: "Every petal is laid with mathematical grace and human warmth.",
    duration: 46000,
    background:
      "linear-gradient(130deg, #1a1e22 0%, #3d2b3b 48%, #f0c9b3 100%)",
    overlay:
      "radial-gradient(circle at 30% 35%, rgba(255, 200, 170, 0.42), transparent 62%), radial-gradient(circle at 78% 68%, rgba(90, 46, 90, 0.35), transparent 60%)",
    texture:
      "radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.05), transparent 36%), radial-gradient(circle at 72% 24%, rgba(255, 255, 255, 0.04), transparent 40%), linear-gradient(140deg, rgba(215, 174, 170, 0.35), rgba(20, 18, 25, 0.2))",
    camera: {
      scale: 1.14,
      x: -1,
      y: 3
    },
    accent: "#f6a6b0",
    voiceover:
      "आरा बाज़ार में राजस्थान के संगतराश, बुख़ारा के इनले शिल्पी और फ़ारस के सुलेखकार एक धुन में काम कर रहे हैं। संगमरमर की स्लैबों पर फूल खिलते हैं, लाल, फिरोज़ा और जेड पत्थरों से जड़ाऊ बेल-बूटे उभरते हैं। कारीगर हाथ में छेनी लेकर शेर-ओ-शायरी बुनते हैं, जिनमें क़ुरआन की आयतें और फूलों की कहानियाँ छिपी हैं। बारह हज़ार से अधिक हाथ एक साथ गाते हैं कि कला सीमाओं से परे है। यहाँ सीख मिलती है—संस्कृतियाँ जब साथ काम करती हैं तो पत्थर भी धड़कने लगते हैं।"
  },
  {
    id: "engineering",
    title: "Science Beneath the Marble",
    subtitle: "Invisible strengths",
    description: [
      "Engineers debate weights, winds, and water to keep the mausoleum floating above the river valley.",
      "Learners see how emotion anchors itself in rigorous physics."
    ],
    facts: [
      { label: "Foundation", value: "22 deep wells with sal-wood platforms" },
      { label: "Dome Height", value: "73 m double shell for lightness" },
      { label: "Seismic Design", value: "Minarets lean 1.5° outward" }
    ],
    quote: {
      text: "भावना की रक्षा विज्ञान से होगी।",
      author: "Royal engineer"
    },
    highlight: "Physics, hydraulics, and craft keep the promise standing.",
    duration: 43000,
    background:
      "linear-gradient(135deg, #0f181f 0%, #1c2f2d 35%, #7aa0a3 100%)",
    overlay:
      "radial-gradient(circle at 28% 22%, rgba(123, 199, 208, 0.35), transparent 58%), radial-gradient(circle at 82% 78%, rgba(15, 34, 37, 0.45), transparent 60%)",
    texture:
      "radial-gradient(circle at 16% 20%, rgba(255, 255, 255, 0.05), transparent 36%), radial-gradient(circle at 64% 26%, rgba(255, 255, 255, 0.05), transparent 42%), linear-gradient(150deg, rgba(42, 74, 78, 0.45), rgba(5, 12, 14, 0.25))",
    camera: {
      scale: 1.08,
      x: 3,
      y: 2
    },
    accent: "#8ec5c8",
    voiceover:
      "भट्ठियों के पीछे इंजीनियर नींव की गहराई पर चर्चा कर रहे हैं। यमुना की मुलायम मिट्टी पर इतना भार कैसे टिकेगा? समाधान निकलता है—बावन कुओं की नींव, लाखों ईंटें और चूने से बना लचीला घोल। गुंबद को हल्का रखने के लिए भीतर दोहरी परत बनाई जाती है, जिस पर तारे जैसे लटकन चमकते हैं। मीनारें हल्की सी बाहर झुकी हैं ताकि भूकंप आने पर मकबरे को ढाल बन सकें। हर संख्यात्मक निर्णय यह बताता है कि भावनाएँ भी वैज्ञानिक सोच मांगती हैं।"
  },
  {
    id: "symbolism",
    title: "Light, Water, and Faith",
    subtitle: "Meaning in motion",
    description: [
      "The Charbagh garden, fountains, and calligraphy teach how architecture speaks spiritual languages.",
      "Students decode how light and proportion turn stone into metaphor."
    ],
    facts: [
      { label: "Paradise Layout", value: "Charbagh quadrants meeting at water" },
      { label: "Optics", value: "Calligraphy scales with eye level" },
      { label: "Color Shift", value: "Marble blushes dawn pink to moonlit silver" }
    ],
    quote: {
      text: "प्रकाश ही यहां की स्याही है।",
      author: "Court scholar"
    },
    highlight: "Symbolism guides every reflection and shadow.",
    duration: 45000,
    background:
      "linear-gradient(120deg, #1a1d29 0%, #28324a 45%, #dbe6ff 100%)",
    overlay:
      "radial-gradient(circle at 30% 28%, rgba(255, 255, 204, 0.42), transparent 60%), radial-gradient(circle at 74% 70%, rgba(40, 64, 121, 0.4), transparent 58%)",
    texture:
      "radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.05), transparent 32%), radial-gradient(circle at 78% 26%, rgba(255, 255, 255, 0.05), transparent 40%), linear-gradient(140deg, rgba(71, 84, 146, 0.35), rgba(15, 17, 30, 0.2))",
    camera: {
      scale: 1.09,
      x: -2,
      y: 1
    },
    accent: "#d4dcff",
    voiceover:
      "जब संगमरमर पर सूर्य की किरणें गिरती हैं तो पूरा परिसर समय के साथ अपना रंग बदलता है—सुबह गुलाबी, दिन में दूधिया, रात को चाँदनी नीला। सूफ़ी, पंडित और मौलवी एक साथ वास्तुशास्त्र, फ़िबोनाची और कुरआनी आयतें समझाते हैं। चार बाग़ जन्नत के चार दरवाज़ों का प्रतीक हैं और केन्द्रीय जलधारा जीवन की धारा का स्मरण कराती है। यह स्मारक सिखाता है कि आध्यात्मिकता किसी एक धर्म की विरासत नहीं, बल्कि प्रकाश, पानी और समरूपता की साझा कहानी है।"
  },
  {
    id: "legacy",
    title: "The Living Constitution",
    subtitle: "Inheritance of wonder",
    description: [
      "Generations later, conservationists and students carry the story forward with science and empathy.",
      "Learners end with a call to steward culture and curiosity."
    ],
    facts: [
      { label: "UNESCO", value: "World Heritage inscription in 1983" },
      { label: "Visitors", value: "~7 million each year" },
      { label: "Conservation", value: "Traditional lime polishing keeps the glow" }
    ],
    quote: {
      text: "धरोहर तभी जीवित रहती है जब हम उसे आगे बढ़ाते हैं।",
      author: "Modern conservator"
    },
    highlight: "A charge to future guardians of history and harmony.",
    duration: 42000,
    background:
      "linear-gradient(135deg, #0f1018 0%, #1c1f31 46%, #7a86c2 100%)",
    overlay:
      "radial-gradient(circle at 18% 32%, rgba(173, 181, 255, 0.38), transparent 58%), radial-gradient(circle at 80% 74%, rgba(25, 34, 67, 0.44), transparent 62%)",
    texture:
      "radial-gradient(circle at 14% 16%, rgba(255, 255, 255, 0.05), transparent 34%), radial-gradient(circle at 72% 22%, rgba(255, 255, 255, 0.05), transparent 42%), linear-gradient(150deg, rgba(77, 85, 140, 0.35), rgba(18, 20, 32, 0.2))",
    camera: {
      scale: 1.07,
      x: 0,
      y: -1
    },
    accent: "#c0c6ff",
    voiceover:
      "सदियों बाद, जब छात्र ताजमहल के आँगन में कदम रखते हैं, उन्हें सिर्फ़ सफ़ेद संगमरमर नहीं दिखता, बल्कि सहिष्णुता, शिक्षा और कल्पना की मिसाल दिखाई देती है। औद्योगिक युग से लेकर आज तक मरम्मत करने वाले कारीगर उसी परंपरा को आगे बढ़ाते हैं। 1983 में यूनेस्को ने इसे मानवता की धरोहर घोषित किया और हर वर्ष लाखों दर्शक यहाँ प्रेरणा लेकर लौटते हैं। यही इस कहानी का संविधान है—ज्ञान, कला और संवेदनशीलता का ऐसा दस्तावेज़ जो आने वाली पीढ़ियों को साहस देता है कि वे भी सपनों को आकार दे सकते हैं।"
  }
];

const TOTAL_DURATION = SCENES.reduce((total, scene) => total + scene.duration, 0);
const MUSIC_GAIN = 0.16;
const RUN_TIME_MINUTES = (TOTAL_DURATION / 1000 / 60).toFixed(1);

type AmbientParticle = {
  top: string;
  left: string;
  size: number;
  opacity: number;
  delay: number;
};

const AMBIENT_PARTICLES: AmbientParticle[] = [
  { top: "8%", left: "14%", size: 280, opacity: 0.16, delay: 0 },
  { top: "24%", left: "70%", size: 340, opacity: 0.12, delay: 4 },
  { top: "62%", left: "18%", size: 220, opacity: 0.18, delay: 2 },
  { top: "78%", left: "60%", size: 280, opacity: 0.14, delay: 6 },
  { top: "38%", left: "38%", size: 200, opacity: 0.2, delay: 3 },
  { top: "12%", left: "82%", size: 260, opacity: 0.12, delay: 7 }
];

const TajSilhouette = ({ accent }: { accent: string }) => (
  <svg
    className="pointer-events-none"
    viewBox="0 0 1440 600"
    aria-hidden
  >
    <defs>
      <linearGradient id="tajGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
        <stop offset="100%" stopColor={accent} stopOpacity={0} />
      </linearGradient>
    </defs>
    <path
      d="M0 520h160c24-40 72-88 152-92s188 52 284 44 210-104 306-104 204 96 314 100 182-52 224-72 0 124 0 124H0z"
      fill="url(#tajGlow)"
    />
    <path
      d="M708 180c-31 0-56-25-56-56s25-56 56-56 56 25 56 56-25 56-56 56zm-180 64c-14 0-26-12-26-26s12-26 26-26 26 12 26 26-12 26-26 26zm360 0c-14 0-26-12-26-26s12-26 26-26 26 12 26 26-12 26-26 26z"
      fill={accent}
      fillOpacity={0.08}
    />
    <path
      d="M300 520V328l32-14v-62l48-20 84 24v-38l112-40 96 32 100-32 120 44v32l96-24 64 18 16 30v48l32 20v214H300z"
      fill={accent}
      fillOpacity={0.12}
    />
    <path
      d="M632 196l76-24 80 26v264h-156z"
      fill={accent}
      fillOpacity={0.18}
    />
  </svg>
);

export default function Home() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneNodesRef = useRef<OscillatorNode[]>([]);
  const intervalRefs = useRef<number[]>([]);
  const timelineTimeoutsRef = useRef<number[]>([]);
  const voiceTimeoutsRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<number | null>(null);
  const startTimestampRef = useRef<number | null>(null);

  const currentScene = SCENES[currentSceneIndex];

  useEffect(() => {
    document.title = "The Constitution of the Taj Mahal";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const synth = window.speechSynthesis;

    const updateVoices = () => {
      const available = synth.getVoices();
      setVoices(available);
    };

    updateVoices();
    synth.addEventListener("voiceschanged", updateVoices);

    return () => {
      synth.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  const clearTimeline = useCallback(() => {
    timelineTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timelineTimeoutsRef.current = [];

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const clearVoiceover = useCallback(() => {
    voiceTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    voiceTimeoutsRef.current = [];

    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  }, []);

  const clearMusic = useCallback(() => {
    intervalRefs.current.forEach((intervalId) => window.clearInterval(intervalId));
    intervalRefs.current = [];

    droneNodesRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // oscillator might already be stopped
      }
      osc.disconnect();
    });
    droneNodesRef.current = [];

    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    const ctx = audioContextRef.current;
    if (ctx) {
      ctx.close().catch(() => undefined);
    }
    audioContextRef.current = null;
    masterGainRef.current = null;
  }, []);

  const fadeOutMusic = useCallback(() => {
    const ctx = audioContextRef.current;
    const gain = masterGainRef.current;

    if (!ctx || !gain) {
      return;
    }

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2);

    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
    }

    fadeTimeoutRef.current = window.setTimeout(() => {
      clearMusic();
    }, 2200);
  }, [clearMusic]);

  const stopExperience = useCallback(() => {
    setIsPlaying(false);
    clearTimeline();
    clearVoiceover();
    fadeOutMusic();
    setProgress(0);
  }, [clearTimeline, clearVoiceover, fadeOutMusic]);

  useEffect(() => {
    return () => {
      stopExperience();
      clearMusic();
    };
  }, [stopExperience, clearMusic]);

  const startMusic = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    clearMusic();

    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const ctx = new AudioContextClass();
    await ctx.resume();
    audioContextRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = isMuted ? 0.0001 : MUSIC_GAIN;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    const createDrone = (frequency: number, detune: number, gainValue: number) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = frequency;
      osc.detune.value = detune;

      const gainNode = ctx.createGain();
      gainNode.gain.value = gainValue;

      osc.connect(gainNode).connect(master);
      osc.start();
      osc.stop(ctx.currentTime + TOTAL_DURATION / 1000 + 6);
      droneNodesRef.current.push(osc);
    };

    createDrone(110, -4, 0.06);
    createDrone(220, 6, 0.05);
    createDrone(440 / 2, 0, 0.03);

    const playPluck = (frequency: number, sustain = 2.2) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = frequency * 2;
      filter.Q.value = 7.5;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + sustain);

      osc.connect(filter).connect(gainNode).connect(master);
      osc.start();
      osc.stop(ctx.currentTime + sustain + 0.1);
    };

    const playFlute = (frequency: number, sustain = 4.4) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      const vibrato = ctx.createOscillator();
      vibrato.type = "sine";
      vibrato.frequency.value = 5.5;

      const vibratoGain = ctx.createGain();
      vibratoGain.gain.value = 12;
      vibrato.connect(vibratoGain).connect(osc.frequency);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.3);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + sustain - 0.6);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + sustain);

      osc.connect(gainNode).connect(master);
      osc.start();
      vibrato.start();
      osc.stop(ctx.currentTime + sustain + 0.2);
      vibrato.stop(ctx.currentTime + sustain + 0.2);
    };

    const sitarPattern = [174.61, 196, 220, 246.94, 261.63, 293.66, 329.63];
    let sitarIndex = 0;
    const sitarInterval = window.setInterval(() => {
      playPluck(sitarPattern[sitarIndex % sitarPattern.length]);
      sitarIndex += 1;
    }, 2600);
    intervalRefs.current.push(sitarInterval);

    const flutePattern = [392, 440, 392, 349.23, 329.63, 392, 440, 493.88, 523.25];
    let fluteIndex = 0;
    const fluteInterval = window.setInterval(() => {
      playFlute(flutePattern[fluteIndex % flutePattern.length]);
      fluteIndex += 1;
    }, 4800);
    intervalRefs.current.push(fluteInterval);
  }, [clearMusic, isMuted]);

  const startVoiceover = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    clearVoiceover();

    const synth = window.speechSynthesis;
    const preferredVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("hi")) ?? voices.find((voice) => voice.lang.toLowerCase().includes("hi")) ?? null;

    let cumulativeDelay = 800;

    SCENES.forEach((scene) => {
      const timeoutId = window.setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(scene.voiceover);
        utterance.lang = "hi-IN";
        utterance.rate = 0.92;
        utterance.pitch = 0.95;
        utterance.volume = 1;
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        synth.speak(utterance);
      }, cumulativeDelay);

      voiceTimeoutsRef.current.push(timeoutId);
      cumulativeDelay += scene.duration;
    });
  }, [clearVoiceover, voices]);

  const startTimeline = useCallback(() => {
    clearTimeline();
    setHasEnded(false);
    setCurrentSceneIndex(0);
    setProgress(0);

    let cumulative = 0;
    SCENES.forEach((scene, index) => {
      const timeoutId = window.setTimeout(() => {
        setCurrentSceneIndex(index);
      }, cumulative);

      timelineTimeoutsRef.current.push(timeoutId);
      cumulative += scene.duration;
    });

    const finishTimeout = window.setTimeout(() => {
      setHasEnded(true);
      setIsPlaying(false);
      fadeOutMusic();
    }, cumulative);
    timelineTimeoutsRef.current.push(finishTimeout);

    startTimestampRef.current = performance.now();

    const updateProgress = (timestamp: number) => {
      if (startTimestampRef.current === null) {
        startTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - startTimestampRef.current;
      const nextProgress = Math.min(1, elapsed / TOTAL_DURATION);
      setProgress(nextProgress);

      if (elapsed <= TOTAL_DURATION + 1000) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  }, [clearTimeline, fadeOutMusic]);

  const beginExperience = useCallback(async () => {
    setIsIntroVisible(false);
    setIsMuted(false);
    setHasEnded(false);
    setProgress(0);
    setIsPlaying(true);

    await startMusic();
    startVoiceover();
    startTimeline();
  }, [startMusic, startTimeline, startVoiceover]);

  const handleReplay = useCallback(() => {
    stopExperience();
    setTimeout(() => {
      beginExperience();
    }, 400);
  }, [beginExperience, stopExperience]);

  const toggleMute = useCallback(() => {
    const ctx = audioContextRef.current;
    const gain = masterGainRef.current;
    if (!ctx || !gain) {
      setIsMuted((prev) => !prev);
      return;
    }

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    gain.gain.cancelScheduledValues(ctx.currentTime);
    const target = nextMuted ? 0.0001 : MUSIC_GAIN;
    gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.3);
  }, [isMuted]);

  const introContent = useMemo(() => {
    if (!isIntroVisible) {
      return null;
    }

    return (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 px-6 text-center backdrop-blur-md">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The Constitution of the Taj Mahal
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
            A cinematic learning journey with golden dawns, whispered vows, and the science that holds love aloft. Press start, close your eyes for a moment, and let history bloom.
          </p>
          <button
            type="button"
            onClick={beginExperience}
            className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3 text-base font-semibold uppercase tracking-[0.28em] text-black transition hover:bg-white"
          >
            Begin Journey
          </button>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Audio narration in Hindi · Ambient sitar & flute score
          </p>
        </div>
      </div>
    );
  }, [beginExperience, isIntroVisible]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-[4000ms] ease-out"
          style={{
            backgroundImage: currentScene.background,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[4000ms]"
          style={{
            backgroundImage: currentScene.overlay,
            backgroundSize: "cover"
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-[-20%] animate-pan-slow opacity-70"
            style={{
              backgroundImage: currentScene.texture,
              backgroundSize: "160% 160%",
              backgroundRepeat: "no-repeat",
              transform: `scale(${currentScene.camera.scale}) translate(${currentScene.camera.x}%, ${currentScene.camera.y}%)`,
              transition: "transform 12s ease-in-out"
            }}
          />
          {AMBIENT_PARTICLES.map((particle, index) => (
            <span
              key={`${particle.top}-${particle.left}-${index}`}
              className="absolute rounded-full blur-3xl animate-float-soft"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                background: currentScene.accent,
                opacity: particle.opacity,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
          <div className="absolute inset-0 opacity-60">
            <TajSilhouette accent={currentScene.accent} />
          </div>
        </div>

        <div className="relative z-20 flex min-h-screen flex-col px-6 pb-16 pt-12 sm:px-12 lg:px-24">
          <header className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">
                Cinematic Learning Module
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                {currentScene.title}
              </h2>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                {currentScene.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isPlaying || hasEnded ? (
                <button
                  type="button"
                  aria-label="Replay sequence"
                  onClick={handleReplay}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
                >
                  Replay
                </button>
              ) : null}
              <button
                type="button"
                aria-label={isMuted ? "Unmute background score" : "Mute background score"}
                onClick={toggleMute}
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </header>

          <main className="mt-14 grid flex-1 grid-cols-1 gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <article key={currentScene.id} className="space-y-7 animate-fade-in-up">
              <p className="text-lg text-white/80 sm:text-xl">
                {currentScene.description[0]}
              </p>
              <p className="text-base text-white/70 sm:text-lg">
                {currentScene.description[1]}
              </p>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                <p className="text-sm uppercase tracking-[0.5em] text-white/50">
                  Narrative Highlight
                </p>
                <p
                  className="mt-3 text-xl font-medium"
                  style={{ color: currentScene.accent }}
                >
                  {currentScene.highlight}
                </p>
              </div>
              <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-6 italic text-white/90">
                “{currentScene.quote.text}”
                <footer className="mt-4 text-sm not-italic uppercase tracking-[0.3em] text-white/60">
                  — {currentScene.quote.author}
                </footer>
              </blockquote>
            </article>
            <aside className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {currentScene.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur"
                    style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.35), inset 0 0 0 1px ${currentScene.accent}1a` }}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      {fact.label}
                    </p>
                    <p className="mt-3 text-base font-medium text-white/80">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur">
                <p className="uppercase tracking-[0.4em] text-white/50">Scene Map</p>
                <ul className="mt-4 space-y-2">
                  {SCENES.map((scene, index) => (
                    <li
                      key={scene.id}
                      className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: index === currentSceneIndex ? scene.accent : "rgba(255,255,255,0.35)",
                          boxShadow: index === currentSceneIndex ? `0 0 15px ${scene.accent}` : "none"
                        }}
                      />
                      <span className={index === currentSceneIndex ? "text-white" : "text-white/45"}>
                        {scene.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </main>

          <footer className="mt-14 space-y-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  background: `linear-gradient(90deg, ${currentScene.accent} 0%, rgba(255,255,255,0.9) 100%)`,
                  width: `${Math.min(100, progress * 100)}%`
                }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-white/55">
              <span>Running Time · {RUN_TIME_MINUTES} min</span>
              <span>The Constitution of the Taj Mahal</span>
            </div>
          </footer>
        </div>
      </div>

      {introContent}

      {hasEnded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <div className="pointer-events-auto rounded-full border border-white/20 bg-black/60 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur">
            Journey complete · Tap replay to relive the vow
          </div>
        </div>
      ) : null}
    </div>
  );
}
