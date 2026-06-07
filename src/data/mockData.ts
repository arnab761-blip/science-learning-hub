import { Article, Question, Ebook, LiveSession } from "../types";

export const fallbackArticles: Article[] = [
  {
    title: "James Webb Captures Water Vapor in Inner Disc of Faraway Star System",
    content: "Astronomers utilizing the James Webb Space Telescope have made a historic discovery, detecting water vapor in the inner planet-forming region of a distant star system. This marks the first time that water reservoirs have been identified in a disk surrounding a young star with existing gas planets, yielding profound insights into where Earth-like rocky planets might form and gather life-giving elements in the cosmos.",
    date: "2026-06-05",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: "Astronomy",
    author: "Dr. Elena Vance",
    readTime: "4 min read"
  },
  {
    title: "Quantum Processor Achieves New State of Matter at Room Temperature",
    content: "In a collaborative effort that pushes the boundaries of condensed-matter physics, researchers have successfully used a state-of-the-art 92-qubit superconducting quantum processor to simulate and stabilize a novel material state known as an 'excitonic insulator.' The experiment, conducted with near-perfect coherence, represents a crucial milestone for building fault-tolerant quantum computers of the future.",
    date: "2026-05-28",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    category: "Physics",
    author: "Prof. Tyler Mercer",
    readTime: "6 min read"
  },
  {
    title: "Deep Ocean Expedition Discovers 40 New Species Near Mariana Trench Hydrothermal Vents",
    content: "Plunging over 6,500 meters into the abyss, a robotic deep-sea submersible has mapped unexpected ecosystems buzzing around volcanic hydrothermal vents. Among the forty species discovered are unique sulfur-oxidizing bioluminescent crabs and translucent glass-sponge structures. These organisms rewrite our understanding of metabolic life in environments completely starved of solar radiation.",
    date: "2026-05-19",
    image: "https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?auto=format&fit=crop&w=800&q=80",
    category: "Biology",
    author: "Sarah Gold, MSc",
    readTime: "5 min read"
  },
  {
    title: "CRISPR Genetically Redesigning Crops to Endure Severe Regional Droughts",
    content: "Agricultural geneticists have pioneered a gene-edited variant of winter wheat that thrives with 45% less moisture. By utilizing advanced CRISPR-Cas9 base-editing techniques, the researchers targeted specific hydraulic regulation pathways in the crop's stomata, significantly reducing transpiration without sacrificing yield. Field trials on multiple continents show stellar resistance.",
    date: "2026-05-10",
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
    category: "Genetics",
    author: "Dr. Marcus Lin",
    readTime: "3 min read"
  }
];

export const sampleQuestions: Question[] = [
  {
    id: "q-1",
    title: "How did water oceans form on Earth if the early planet was a ball of molten rock?",
    category: "Astronomy",
    author: "Stella_Learner",
    date: "2026-06-06",
    votes: 34,
    answersCount: 2,
    solved: true,
    replies: [
      {
        id: "r-11",
        author: "Dr. Marcus Lin",
        role: "Scientist",
        content: "Excellent question! The current scientific consensus points to a combination of two primary sources. First is 'outgassing' — where volcanic activity released steam trapped deep in the Earth's early mantle. As the planet cooled, this steam condensed into torrential rain. The second major contributor is the 'Late Heavy Bombardment' around 4 billion years ago, during which ice-rich comets and carbonaceous chondrite asteroids crashed into Earth, enriching our system with vast outer-solar system water reserves.",
        date: "2026-06-06",
        upvotes: 21
      },
      {
        id: "r-12",
        author: "Prof. Tyler Mercer",
        role: "Educator",
        content: "To add to Dr. Lin's great summary, recent isotopic measurements of hydrogen in ancient meteorites match closely with ocean water today, indicating asteroids likely brought the majority of initial surface liquids!",
        date: "2026-06-07",
        upvotes: 11
      }
    ]
  },
  {
    id: "q-2",
    title: "Does quantum entanglement violate Einstein's speed limit (the speed of light)?",
    category: "Physics",
    author: "CuriousGeek",
    date: "2026-06-05",
    votes: 48,
    answersCount: 1,
    solved: true,
    replies: [
      {
        id: "r-21",
        author: "AlbertWave",
        role: "Scientist",
        content: "No, it does not actually violate relativity! While the collapse of entangled states is instantaneous (proven by Bell's theorem tests to be at least 10,000 times faster than light), it is impossible to use this phenomenon to send actual 'classical information.' Because the measurement results are fundamentally random, the sender cannot choose what state the receiver's particle collapses into. To decode any meaningful message, the parties must still communicate information via light-speed classical channels.",
        date: "2026-06-05",
        upvotes: 37
      }
    ]
  },
  {
    id: "q-3",
    title: "Why are some viral particles considered 'living' while others are classified as non-living inert capsules?",
    category: "Biology",
    author: "BioMajor99",
    date: "2026-06-04",
    votes: 19,
    answersCount: 1,
    solved: false,
    replies: [
      {
        id: "r-31",
        author: "Sarah Gold, MSc",
        role: "Educator",
        content: "Most biologists actually class all viruses as non-living (inert chemical machines) because they lack metabolism, cannot maintain homeostasis, and cannot replicate without hijacking a host cell's machinery. However, the discovery of 'Giant Viruses' (like Mimivirus, which carries genes for translation) has blurred this binary, prompting some to argue they represent a fourth domain of cellular life.",
        date: "2026-06-05",
        upvotes: 12
      }
    ]
  }
];

export const sampleEbooks: Ebook[] = [
  {
    id: "eb-1",
    title: "A Beginner's Guide to Quantum Mechanics",
    author: "Prof. Richard Thorne",
    description: "An elegant, intuitive, and mathematics-light entry point into the bizarre realm of subatomic physics. Covers wave-particle duality, superbposition, and entanglement.",
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=400&q=80",
    pages: 148,
    category: "Theoretical Physics",
    chapters: [
      "Introduction: The Death of Classical Certainty",
      "Chapter 1: The Double Slit & Wave-Particle Duality",
      "Chapter 2: Schrödinger's Equations and Wave Functions",
      "Chapter 3: Superposition & the Measurement Problem",
      "Chapter 4: Einstein, Podolsky, Rosen: Quantum Entanglement"
    ]
  },
  {
    id: "eb-2",
    title: "Astrophysics and Cosmic Scale Structures",
    author: "Dr. Clara Hastings",
    description: "An awe-inspiring textbook detailing cosmology from the Big Bang to stellar death, exploring galactic filaments, black holes, and deep planetary dynamics.",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
    pages: 284,
    category: "Cosmology",
    chapters: [
      "Introduction: Our Place in the Deep Cosmos",
      "Chapter 1: Stellar Evolution: From Dust Clouds to Neutron Stars",
      "Chapter 2: General Relativity & Black Hole event horizons",
      "Chapter 3: Galaxy Clusters & Cosmic Filaments",
      "Chapter 4: Dark Matter and Dark Energy: The Unknown 95%"
    ]
  },
  {
    id: "eb-3",
    title: "An Introduction to Gene Editing with CRISPR",
    author: "Dr. Julianne Perez",
    description: "A comprehensive primer on modern genetic engineering. Explores how bacteria developed CRISPR-Cas9 as an immune system, and how humans adapted it.",
    coverImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
    pages: 110,
    category: "Biotechnology",
    chapters: [
      "Introduction: Coding Life Itself",
      "Chapter 1: The Bacterial Immune Defense System Explained",
      "Chapter 2: Cas9 Nucleases: Molecular Scissors of Precision",
      "Chapter 3: Base Editing and Prime Editing Enhancements",
      "Chapter 4: Ethics and the Future of Gene-Modified Systems"
    ]
  }
];

export const sampleLiveSessions: LiveSession[] = [
  {
    id: "ls-1",
    title: "Simulating Dark Matter: High Performance Computing in Astronomy",
    speaker: "Dr. Elena Vance",
    role: "Senior Astrophysicist, NASA Supercomputing Division",
    date: "2026-06-15",
    time: "18:00 UTC",
    platform: "Zoom Interactive Video Stream",
    description: "Learn how modern astrophysicists simulate the expansion of dark matter filaments using millions of particles in supercomputing architectures, and how these models compare with the newest James Webb observations.",
    registered: false
  },
  {
    id: "ls-2",
    title: "Ethics of Human Germline CRISPR Alterations",
    speaker: "Dr. Julianne Perez & Panel",
    role: "Bioethics Professor, Harvard Medical Institute",
    date: "2026-06-22",
    time: "15:30 UTC",
    platform: "Science Hub Arena Live Stream",
    description: "Join us for a heated round-table discussion regarding recent proposals for genetic eradication of inheritable diseases, looking closely at equity, bioethics, and long-term evolutionary impacts.",
    registered: false
  }
];
