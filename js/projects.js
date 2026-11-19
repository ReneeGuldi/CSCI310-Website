/* ============================================================
   projects.js — the write-up behind each project card.
   The project modal (effect #4 in script.js) reads from here.
   ============================================================ */

window.PROJECTS = {
  p1: {
    eyebrow: "Project 1 · HTML, CSS & JavaScript",
    title: "Portfolio Site & JavaScript Demo",
    summary:
      "This website. A hand-built, framework-free portfolio with a responsive layout and a set of " +
      "event-driven JavaScript effects, plus a standalone demo page with live interactive widgets.",
    highlights: [
      "Dark / light theme toggle that remembers your choice with localStorage",
      "Time-of-day greeting, scroll-reveal project cards (IntersectionObserver), a details modal, and a back-to-top button",
      "Responsive grid that switches from 3 columns on desktop to 2 on phones, with fluid spacing using clamp()",
      "Demo page with a click counter and a live clock built on setInterval",
      "Later additions: a contact form that keeps my email private, and a built-in chat assistant",
    ],
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    links: [
      { label: "Open the demo", href: "demo.html", primary: true },
      { label: "Source code", href: "https://github.com/ReneeGuldi/CSCI310-Website" },
    ],
  },

  p2: {
    eyebrow: "Project 2 · Web 3D",
    title: "The Last Signal",
    summary:
      "A low-poly, first-person survival shooter that runs in the browser. The Bloom has turned people into " +
      "husks; you have to find three radio parts, repair a dead radio tower, and survive until the evac chopper arrives.",
    highlights: [
      "Physics with cannon-es: crates tumble when shot, explosive barrels chain-react, and a wrecked school bus can be blown loose",
      "First-person shooting with recoil, muzzle flash, bullet tracers, and impact effects",
      "Husk enemies that chase the player, flash when hit, and ragdoll when they die",
      "Custom low-poly models I made in Blockbench for the husks, radio parts, pickups, crates, and barrels",
      "A timed radio-tower finale with a flashing beacon, husk waves, a win screen, and hidden easter eggs",
    ],
    tech: ["Three.js r160", "cannon-es", "Blockbench", "JavaScript modules"],
    links: [
      { label: "Play in your browser", href: "https://reneeguldi.github.io/Last_Signal/", primary: true },
      { label: "Source code", href: "https://github.com/ReneeGuldi/Last_Signal" },
      { label: "Read the case study", href: "last-signal-case-study.html" },
    ],
  },

  p3: {
    eyebrow: "Project 3 · Front-end + Back-end",
    title: "The Last Signal: Multiplayer",
    summary:
      "A much larger expansion of Project 2 with real-time multiplayer. Up to 8 survivors explore a town, " +
      "repair the radio tower, fight down the evac road, and hold the landing zone together.",
    highlights: [
      "Node.js + Socket.IO server: clients send their state 15×/second and the server broadcasts one batched snapshot 20×/second",
      "Other players are smoothly interpolated between snapshots, with name tags, colored hoodies, walking animation, and visible gunfire",
      "Bigger world: a furnished town with enterable buildings, stairs husks can follow you up, and a walled evacuation route",
      "Three weapons (pistol, shotgun, machete), three enemy types plus spawning Bloom nests, and husk AI that hears gunfire",
      "Packaged with Docker and deployed on Render; falls back to single-player when no server is reachable",
    ],
    tech: ["Three.js", "cannon-es", "Socket.IO 4.8", "Node.js", "Docker", "Render"],
    note: "The multiplayer server runs on a free hosting tier, so the first load can take up to a minute while it wakes up.",
    links: [
      { label: "Play multiplayer", href: "https://last-signal-multiplayer.onrender.com/", primary: true },
      { label: "Source code", href: "https://github.com/ReneeGuldi/Last_Signal_Multiplayer" },
      { label: "Read the case study", href: "last-signal-case-study.html" },
    ],
  },

  ml1: {
    eyebrow: "Machine Learning · Python, PyTorch",
    title: "Credit Card Fraud Detection",
    summary:
      "A neural network that flags fraudulent transactions in a dataset where only 492 of 284,807 transactions are fraud. " +
      "A model that never flags anything would still be 99.83% accurate, so I measured success by fraud caught versus honest customers bothered.",
    highlights: [
      "Counted the classes before writing any model code, which changed the goal from accuracy to precision and recall",
      "Trained a logistic-regression baseline as a reality check, then a 30 → 64 → 32 → 1 feed-forward network",
      "Caught 74 of 98 fraud cases with only 10 false alarms out of 56,864 legitimate transactions (88.1% precision, 75.5% recall, F1 0.81)",
      "Used the 24 missed cases to decide what to fix next: the class imbalance",
    ],
    tech: ["Python", "PyTorch", "pandas", "Jupyter"],
    links: [
      { label: "Read the write-up", href: "https://github.com/ReneeGuldi/Credit-Card-Fraud-Detection", primary: true },
    ],
  },

  ml2: {
    eyebrow: "Machine Learning · NLP",
    title: "BBC News Article Classifier",
    summary:
      "Classifies 2,225 BBC articles into five topics (business, entertainment, politics, sport, tech) using Doc2Vec embeddings " +
      "and a PyTorch network. It reached 95.51% test accuracy and placed 2nd on the class leaderboard.",
    highlights: [
      "Went from 85.17% to 95.51% by changing one setting per run (Doc2Vec vector size, then training epochs) so each change was measurable",
      "When switching from Adam to SGD dropped accuracy to 46%, isolated testing showed the cause right away and I reverted",
      "Built TF-IDF from scratch to test bigger vs. smarter vectors: 29,088 dimensions still lost to Doc2Vec's 250 (92.81% vs 95.51%)",
      "250 → 128 → 64 → 5 network with ReLU and 0.3 dropout to limit overfitting",
    ],
    tech: ["Python", "PyTorch", "Gensim (Doc2Vec)", "NumPy", "Jupyter"],
    links: [
      { label: "Read the write-up", href: "https://github.com/ReneeGuldi/BBC-Article-Classifier", primary: true },
    ],
  },

  p4: {
    eyebrow: "Project 4",
    title: "Coming Soon",
    summary:
      "My final CSCI-310 project is in progress. Check back soon; this card will be updated with a write-up, " +
      "screenshots, and links once it's finished.",
    highlights: [],
    tech: [],
    links: [],
  },
};
