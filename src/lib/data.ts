export interface PersonaType {
  slug: string;
  name: string;
  meterPosition: number; // 0-100, -1 for glitch
  tags: string[];
  description: string;
  stats: {
    label: string;
    value: number;
    glitched?: boolean;
  }[];
  spiritAnimal: {
    emoji: string;
    name: string;
  };
  // Card gradient background (from → to)
  gradient: [string, string];
  // Text color on the gradient
  textColor: string;
  // Accent color for meter needle, stat fills, etc.
  accent: string;
}

export const personaTypes: PersonaType[] = [
  {
    slug: "cortisol-flatline",
    name: "THE CORTISOL FLATLINE",
    meterPosition: 5,
    tags: ["#ZenMaster", "#Unbothered", "#LowCortisolIcon"],
    description:
      "POV: everyone's panicking about the deadline and you're googling 'best pasta near me' 🍝 stress tried to add you. you declined the request.",
    stats: [
      { label: "Stress", value: 12 },
      { label: "Chill", value: 98 },
      { label: "Monday Fear", value: 5 },
    ],
    spiritAnimal: { emoji: "🦥", name: "Sloth" },
    gradient: ["#a8edea", "#fed6e3"],
    textColor: "#1a3a4a",
    accent: "#0d9488",
  },
  {
    slug: "zen-drifter",
    name: "THE ZEN DRIFTER",
    meterPosition: 20,
    tags: ["#GoWithTheFlow", "#NoWorries", "#MainCharacterEnergy"],
    description:
      "them: 'aren't you worried?'\nyou: 'about what?'\nthem: '...everything?'\nyou: *sips iced coffee* 'nah'\n\nyour therapist quit bc there was nothing to fix. main character fr.",
    stats: [
      { label: "Stress", value: 22 },
      { label: "Chill", value: 88 },
      { label: "Monday Fear", value: 15 },
    ],
    spiritAnimal: { emoji: "🐢", name: "Turtle" },
    gradient: ["#c1dfc4", "#deecdd"],
    textColor: "#1a3a2a",
    accent: "#16a34a",
  },
  {
    slug: "calm-imposter",
    name: "THE CALM IMPOSTER",
    meterPosition: 35,
    tags: ["#FineOnTheOutside", "#InternallyScreaming", "#PokerFace"],
    description:
      "outside: 😊 inside: 🔥🔥🔥🔥🔥\n\nyou're the human version of 'this is fine' meme. your smile has its own PR team. people say 'you're so calm' and you physically cannot tell them the truth.",
    stats: [
      { label: "Stress", value: 40 },
      { label: "Chill", value: 58 },
      { label: "Monday Fear", value: 35 },
    ],
    spiritAnimal: { emoji: "🦆", name: "Duck" },
    gradient: ["#e0c3fc", "#8ec5fc"],
    textColor: "#2a1a4a",
    accent: "#7c3aed",
  },
  {
    slug: "cortisol-surfer",
    name: "THE CORTISOL SURFER",
    meterPosition: 50,
    tags: ["#MoodSwings", "#ItDepends", "#EmotionalRollercoaster"],
    description:
      "your cortisol has a playlist and it's on shuffle. 8am: 'life is beautiful' ☀️ 2am: 'why did i say that in 2019' 🕳️ you and stress aren't enemies — you're toxic roommates who share snacks.",
    stats: [
      { label: "Stress", value: 52 },
      { label: "Chill", value: 50 },
      { label: "Monday Fear", value: 50 },
    ],
    spiritAnimal: { emoji: "🐙", name: "Octopus" },
    gradient: ["#ffecd2", "#fcb69f"],
    textColor: "#3a2a1a",
    accent: "#ea580c",
  },
  {
    slug: "functional-chaos",
    name: "THE FUNCTIONAL CHAOS",
    meterPosition: 65,
    tags: ["#DeadlinePowered", "#ChaoticGood", "#ThriveInPanic"],
    description:
      "deadline: tomorrow\nyou: starts at 11:47pm\nresult: somehow your best work??\n\nyou run on espresso, adrenaline, and unhinged optimism. your calendar is a crime scene but things keep... working out??? doctors hate this one trick (it's denial).",
    stats: [
      { label: "Stress", value: 72 },
      { label: "Chill", value: 28 },
      { label: "Monday Fear", value: 58 },
    ],
    spiritAnimal: { emoji: "🐿️", name: "Squirrel" },
    gradient: ["#fbc2eb", "#a6c1ee"],
    textColor: "#3a1a3a",
    accent: "#db2777",
  },
  {
    slug: "cortisol-volcano",
    name: "THE CORTISOL VOLCANO",
    meterPosition: 80,
    tags: ["#AboutToSnap", "#ImFine", "#OneEmailAway"],
    description:
      "things that could make you snap rn:\n• one more 'per my last email'\n• someone asking 'are you ok?'\n• your wifi buffering for 0.3 seconds\n\nyou don't spiral — you ✨ create content ✨",
    stats: [
      { label: "Stress", value: 82 },
      { label: "Chill", value: 15 },
      { label: "Monday Fear", value: 78 },
    ],
    spiritAnimal: { emoji: "🐡", name: "Pufferfish" },
    gradient: ["#ff9a9e", "#fecfef"],
    textColor: "#3a1a1a",
    accent: "#e11d48",
  },
  {
    slug: "permanent-spike",
    name: "THE PERMANENT SPIKE",
    meterPosition: 95,
    tags: ["#StressIsMyPersonality", "#AlwaysOn", "#SendHelp"],
    description:
      "google calendar at 7pm: ✨spontaneous fun✨\nyou at 7pm: stressed about whether you're having enough fun\n\nonce panicked about NOT being stressed bc that meant you forgot something. your nervous system doesn't have an off button. it has a 'less on' button.",
    stats: [
      { label: "Stress", value: 96 },
      { label: "Chill", value: 4 },
      { label: "Monday Fear", value: 92 },
    ],
    spiritAnimal: { emoji: "🐈", name: "Cat at 3am" },
    gradient: ["#f093fb", "#f5576c"],
    textColor: "#ffffff",
    accent: "#fbbf24",
  },
  {
    slug: "cortisol-glitch",
    name: "THE CORTISOL GLITCH",
    meterPosition: -1,
    tags: ["#SystemError", "#Unpredictable", "#BufferingForever"],
    description:
      "your cortisol: ↗️↘️↗️↘️↗️↘️\nyour therapist: 'interesting'\nyou: 'is it tho'\n\nzen at breakfast. unhinged by lunch. asleep at 3pm. wide awake at 3am. your nervous system is buffering. permanently. someone restart the wifi.",
    stats: [
      { label: "Stress", value: 37, glitched: true },
      { label: "Chill", value: 63, glitched: true },
      { label: "Monday Fear", value: 50, glitched: true },
    ],
    spiritAnimal: { emoji: "🦎", name: "Chameleon" },
    gradient: ["#a18cd1", "#fbc2eb"],
    textColor: "#1a1a3a",
    accent: "#8b5cf6",
  },
];

// ──────────────────────────────────────────────
// Question Pool — 18 questions, pick 3 randomly
// ──────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  options: {
    emoji: string;
    text: string;
    score: "low" | "medium" | "high" | "chaotic";
  }[];
}

export const questionPool: QuizQuestion[] = [
  {
    question: "It's Monday morning. Your alarm just went off.",
    options: [
      { emoji: "🛌", text: "Hit snooze... 3 more times", score: "low" },
      { emoji: "📱", text: "Grab phone, check everything", score: "medium" },
      { emoji: "😰", text: "Already awake since 5am", score: "high" },
      { emoji: "🎵", text: "Vibe to the alarm like it's a banger", score: "chaotic" },
    ],
  },
  {
    question: 'Your boss sends: "We need to talk."',
    options: [
      { emoji: "🤷", text: '"Probably nothing"', score: "low" },
      { emoji: "🧐", text: "Start mentally preparing", score: "medium" },
      { emoji: "💀", text: "Already updating resume", score: "high" },
      { emoji: "😂", text: 'Reply: "same lol"', score: "chaotic" },
    ],
  },
  {
    question: "Sunday evening. Tomorrow is Monday.",
    options: [
      { emoji: "🌅", text: "What's Monday? Still vibing", score: "low" },
      { emoji: "📋", text: "Light planning for the week", score: "medium" },
      { emoji: "😵‍💫", text: "Full Sunday Scaries activated", score: "high" },
      { emoji: "🎉", text: "Every day feels the same anyway", score: "chaotic" },
    ],
  },
  {
    question: "You have 47 unread messages in a group chat.",
    options: [
      { emoji: "😴", text: "Mute it. Forever", score: "low" },
      { emoji: "👀", text: "Scroll through but don't reply", score: "medium" },
      { emoji: "😫", text: "Anxiety spike. What did I miss??", score: "high" },
      { emoji: "🗑️", text: "Leave the group chat entirely", score: "chaotic" },
    ],
  },
  {
    question: "Someone says 'can I give you some feedback?'",
    options: [
      { emoji: "😊", text: "Sure, love growing", score: "low" },
      { emoji: "😐", text: "Internally bracing for impact", score: "medium" },
      { emoji: "💔", text: "Already replaying every mistake ever", score: "high" },
      { emoji: "🏃", text: "Leaving the country", score: "chaotic" },
    ],
  },
  {
    question: "Your phone battery is at 5%.",
    options: [
      { emoji: "🙂", text: "It'll be fine", score: "low" },
      { emoji: "🔌", text: "Speed-walk to the nearest charger", score: "medium" },
      { emoji: "😱", text: "This is how I die", score: "high" },
      { emoji: "📴", text: "Good. Peace at last", score: "chaotic" },
    ],
  },
  {
    question: "You just sent a text with a typo to your crush.",
    options: [
      { emoji: "😌", text: "Typos are cute tbh", score: "low" },
      { emoji: "😅", text: "Quick follow-up to correct it", score: "medium" },
      { emoji: "🕳️", text: "Contemplating moving to a new city", score: "high" },
      { emoji: "🤡", text: "Double down on the typo. Commit.", score: "chaotic" },
    ],
  },
  {
    question: "It's 3am. You can't sleep.",
    options: [
      { emoji: "🧘", text: "Meditate and drift off", score: "low" },
      { emoji: "📱", text: "Doom-scroll until eyes close", score: "medium" },
      { emoji: "🧠", text: "Overthinking a conversation from 2017", score: "high" },
      { emoji: "🍳", text: "Might as well make breakfast", score: "chaotic" },
    ],
  },
  {
    question: "Your friend cancels plans last minute.",
    options: [
      { emoji: "🎉", text: "Secretly relieved. Couch time", score: "low" },
      { emoji: "😕", text: "A little bummed but ok", score: "medium" },
      { emoji: "😢", text: "Do they hate me? Was it something I said?", score: "high" },
      { emoji: "🪩", text: "Go out alone anyway. Main character mode", score: "chaotic" },
    ],
  },
  {
    question: "You're in a meeting and someone says your name.",
    options: [
      { emoji: "😎", text: "I'm always ready", score: "low" },
      { emoji: "😳", text: "Quick panic then recover", score: "medium" },
      { emoji: "💀", text: "Heart rate: 180 bpm", score: "high" },
      { emoji: "🎤", text: "Time to freestyle an answer", score: "chaotic" },
    ],
  },
  {
    question: "You see your ex in public.",
    options: [
      { emoji: "✌️", text: "Friendly wave, keep walking", score: "low" },
      { emoji: "🫣", text: "Pretend to check phone very seriously", score: "medium" },
      { emoji: "🚨", text: "Fight or flight response activated", score: "high" },
      { emoji: "💅", text: "Walk towards them. Power move", score: "chaotic" },
    ],
  },
  {
    question: "Your WiFi drops during an important call.",
    options: [
      { emoji: "🤙", text: "It's a sign. Take a break", score: "low" },
      { emoji: "🔄", text: "Calmly restart router", score: "medium" },
      { emoji: "🤯", text: "Full meltdown. Career over", score: "high" },
      { emoji: "🏠", text: "Consider becoming a farmer", score: "chaotic" },
    ],
  },
  {
    question: "You realize you've been on your phone for 4 hours.",
    options: [
      { emoji: "🤷", text: "And I'll do it again", score: "low" },
      { emoji: "😬", text: "Guilt hits. Put it down... for 5 min", score: "medium" },
      { emoji: "📊", text: "Check screen time report. Instant regret", score: "high" },
      { emoji: "🗑️", text: "Throw phone in a lake (metaphorically)", score: "chaotic" },
    ],
  },
  {
    question: "Someone is typing... for 5 minutes straight.",
    options: [
      { emoji: "☕", text: "Make tea while they figure it out", score: "low" },
      { emoji: "👀", text: "Staring at the bubble intensely", score: "medium" },
      { emoji: "💀", text: "Every second is a year of my life", score: "high" },
      { emoji: "📤", text: "Send 10 messages before they finish", score: "chaotic" },
    ],
  },
  {
    question: "You're late to something important.",
    options: [
      { emoji: "🐌", text: "They can wait. I'm worth it", score: "low" },
      { emoji: "🏃", text: "Power walk + rehearse excuse", score: "medium" },
      { emoji: "😭", text: "Life is falling apart", score: "high" },
      { emoji: "🛏️", text: "Already late. Might as well not go", score: "chaotic" },
    ],
  },
  {
    question: "You just posted something and got zero likes after 10 min.",
    options: [
      { emoji: "😌", text: "I post for me, not the algorithm", score: "low" },
      { emoji: "🔄", text: "Check if it actually posted", score: "medium" },
      { emoji: "🗑️", text: "Delete before anyone sees the flop", score: "high" },
      { emoji: "📢", text: "Repost it with a different caption", score: "chaotic" },
    ],
  },
  {
    question: "You hear your name whispered in a conversation across the room.",
    options: [
      { emoji: "😎", text: "They're probably saying how cool I am", score: "low" },
      { emoji: "🤔", text: "Try to casually eavesdrop", score: "medium" },
      { emoji: "😰", text: "Immediate paranoia spiral", score: "high" },
      { emoji: "🚶", text: "Walk over and say 'talking about me?'", score: "chaotic" },
    ],
  },
  {
    question: "Your package says 'delivered' but it's not at your door.",
    options: [
      { emoji: "🤷", text: "It'll show up eventually", score: "low" },
      { emoji: "🔍", text: "Check with neighbors", score: "medium" },
      { emoji: "📞", text: "Call customer support immediately. Crime scene", score: "high" },
      { emoji: "🕵️", text: "Check every neighbor's Ring camera", score: "chaotic" },
    ],
  },
];

/**
 * Randomly pick N questions from the pool.
 * Uses Fisher-Yates shuffle on indices.
 */
export function getRandomQuestions(count: number = 3): QuizQuestion[] {
  const indices = questionPool.map((_, i) => i);
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count).map((i) => questionPool[i]);
}

export function calculateResult(
  answers: ("low" | "medium" | "high" | "chaotic")[]
): PersonaType {
  const chaoticCount = answers.filter((a) => a === "chaotic").length;

  // 2+ chaotic answers → Cortisol Glitch
  if (chaoticCount >= 2) {
    return personaTypes[7]; // The Cortisol Glitch
  }

  const scoreMap = { low: 1, medium: 2, high: 3, chaotic: 2 };
  const total = answers.reduce((sum, a) => sum + scoreMap[a], 0);

  // total range: 3-9 → map to types 0-6
  const index = Math.min(Math.max(total - 3, 0), 6);
  return personaTypes[index];
}

export function getPersonaBySlug(slug: string): PersonaType | undefined {
  return personaTypes.find((p) => p.slug === slug);
}
