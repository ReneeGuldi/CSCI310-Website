/* ============================================================
   chatbot.js — "Ask about Renee" chat assistant.
   Pure JavaScript, no frameworks, no server, no API keys.

   How it works:
   - Each INTENT has keywords and a reply. The visitor's message is
     scored against every intent's keywords; the best match answers.
   - The bot can also take a message for Renee: it asks for a name,
     email and message, then sends it with sendContactMessage()
     (defined in script.js), so visitors never see an email address.
   - To teach it something new, add an object to INTENTS below.
   ============================================================ */

(function () {
  const cfg = window.SITE_CONFIG || {};
  const LINKEDIN = cfg.linkedinUrl || "https://www.linkedin.com/in/rguldi";
  const GITHUB = cfg.githubUrl || "https://github.com/ReneeGuldi";

  // Links work from every page (index, project, demo)
  const onHome = !!document.getElementById("contact");
  const CONTACT_HREF = onHome ? "#contact" : "index.html#contact";

  /* ---
     Knowledge base
     reply: array of strings or {text, href} link parts
     chips: follow-up suggestions shown after the reply
     --- */
  const INTENTS = [
    {
      id: "greeting",
      keywords: ["hi", "hello", "hey", "howdy", "good morning", "good afternoon", "good evening", "yo"],
      reply: ["Hi there! I can tell you about Renee's background, skills, and projects, or pass along a message to her. What would you like to know?"],
      chips: ["Who is Renee?", "Show me projects", "Leave a message"],
    },
    {
      id: "about",
      keywords: ["who", "about", "renee", "background", "yourself", "introduce", "tell me about her"],
      reply: [
        "Renee Guldi is a Computer Science student at the University of Indianapolis (a concentration in Software Engineering, expected May 2028) " +
          "with an A.A.S. in Software Development from Ivy Tech. She also has 4+ years in regulatory compliance and healthcare operations, " +
          "where she replaced a paper process with a tracker her whole team now uses.",
      ],
      chips: ["Work experience", "What are her skills?", "Is she looking for an internship?"],
    },
    {
      id: "education",
      keywords: ["school", "degree", "university", "college", "uindy", "indianapolis", "ivy tech", "study", "studying", "major", "education", "graduate", "graduation", "class", "course", "csci"],
      reply: [
        "Renee is working on a B.S. in Computer Science with a concentration in Software Engineering at the University of Indianapolis, expected May 2028. " +
          "Before that she earned an A.A.S. in Software Development from Ivy Tech Community College in May 2025, making the Dean's List four terms in a row. " +
          "The projects on this site come from her CSCI-310 GUI & Game Programming class.",
      ],
      chips: ["Show me projects", "What are her skills?"],
    },
    {
      id: "internship",
      keywords: ["internship", "intern", "hire", "hiring", "job", "available", "availability", "opportunity", "position", "role", "recruit", "recruiter", "employ", "work for", "open to"],
      reply: [
        "Yes! Renee is currently looking for a software development internship. The best way to reach her about an opportunity is to leave a message right here, or ",
        { text: "connect on LinkedIn", href: LINKEDIN },
        ".",
      ],
      chips: ["Leave a message", "See her resume", "Work experience"],
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "résumé"],
      reply: [
        "You can read Renee's resume on the ",
        { text: "resume page", href: "resume.html" },
        ". If you'd like the PDF, leave her a message and she'll send it.",
      ],
      chips: ["Leave a message"],
    },
    {
      id: "skills",
      keywords: ["skill", "skills", "language", "languages", "tech", "stack", "know", "tools", "javascript", "html", "css", "experience with", "technologies", "proficient"],
      reply: [
        "Languages: Python, Java, C#, C++, Kotlin, JavaScript, SQL (MySQL, PostgreSQL) and HTML/CSS. " +
          "Frameworks: PyTorch, pandas, NumPy, Django, .NET, Unity, Three.js, Node.js and Socket.IO. " +
          "Tools: Git, Docker, Jupyter, Postman, Android Studio and Arduino, plus Agile/Scrum and testing practices.",
      ],
      chips: ["Show me projects", "Tell me about the multiplayer game"],
    },
    {
      id: "experience",
      keywords: ["experience", "work history", "worked", "jobs", "compliance", "indiana testing", "medical", "healthcare", "assistant", "employment", "career", "dot", "fmcsa"],
      reply: [
        "Renee has been a Compliance Specialist at Indiana Testing, Inc. since April 2022. She verifies 300+ DOT applications a month under FMCSA regulations and " +
          "replaced the team's paper tracking with a Google Sheets tracker that flags missing or expiring documents before the 30-day deadline; the whole team adopted it. " +
          "Before that she was a Medical Assistant at Indiana Neurology & Pain Center, where daily EHR work showed her where clinical software slows people down.",
      ],
      chips: ["Leadership", "What are her skills?", "See her resume"],
    },
    {
      id: "leadership",
      keywords: ["leadership", "lead", "leader", "team lead", "manage", "manager", "project manager", "scrum", "agile", "teamwork", "team"],
      reply: [
        "At UIndy, Renee took over as project manager mid-semester and delivered two engineering design projects, one run with Scrum and one with Waterfall, " +
          "plus programmed sensors for an Arduino robot. At Ivy Tech she led three Unity game projects on three-person teams.",
      ],
      chips: ["Work experience", "Show me projects"],
    },
    {
      id: "ml",
      keywords: ["machine learning", "ml", "ai projects", "pytorch", "neural", "fraud", "classifier", "bbc", "data science", "model", "python"],
      reply: [
        "Renee has two PyTorch projects. Her fraud detection model caught 74 of 98 fraud cases with only 10 false alarms, in a dataset where just 0.17% of transactions are fraud. " +
          "Her BBC news classifier reached 95.51% accuracy and placed 2nd in her class. ",
        { text: "See them on the projects page", href: "project.html" },
        ".",
      ],
      chips: ["Tell me about the multiplayer game", "What are her skills?"],
    },
    {
      id: "projects",
      keywords: ["project", "projects", "portfolio", "built", "build", "made", "work samples", "examples", "show me"],
      reply: [
        "Highlights: The Last Signal, a 3D browser shooter she expanded into 8-player real-time multiplayer; two PyTorch machine learning projects " +
          "(fraud detection and a news classifier); and her CSCI-310 classwork, including this site. ",
        { text: "See them all", href: "project.html" },
        ".",
      ],
      chips: ["Tell me about the multiplayer game", "Machine learning projects", "How was this site built?"],
    },
    {
      id: "lastsignal",
      keywords: ["last signal", "game", "3d", "three.js", "threejs", "shooter", "husk", "husks", "cannon", "physics", "blockbench", "play"],
      reply: [
        "The Last Signal is a low-poly, first-person survival shooter that runs in your browser. You find three radio parts, repair a radio tower, " +
          "and survive until the evac chopper arrives. Renee built it with Three.js and cannon-es physics (exploding barrels chain-react!) and made the models herself in Blockbench. ",
        { text: "Play it here", href: "https://reneeguldi.github.io/Last_Signal/" },
        ".",
      ],
      chips: ["Tell me about the multiplayer game", "What are her skills?"],
    },
    {
      id: "multiplayer",
      keywords: ["multiplayer", "multi player", "online", "socket", "socket.io", "server", "node", "node.js", "network", "networking", "docker", "render", "back-end", "backend"],
      reply: [
        "The multiplayer edition expands The Last Signal into a whole town for up to 8 players. A Node.js + Socket.IO server collects each player's position 15 times a second " +
          "and broadcasts a batched snapshot 20 times a second, and clients smoothly interpolate between snapshots. It's packaged with Docker and hosted on Render. ",
        { text: "Play multiplayer", href: "https://last-signal-multiplayer.onrender.com/" },
        " (the free server can take up to a minute to wake up). For the full story, read ",
        { text: "the case study", href: "last-signal-case-study.html" },
        ".",
      ],
      chips: ["Show me projects", "Leave a message"],
    },
    {
      id: "thissite",
      keywords: ["this site", "this website", "website", "site", "demo", "built this", "made this", "portfolio site", "project 1"],
      reply: [
        "This site is hand-built with HTML, CSS, and vanilla JavaScript (no frameworks). It has a theme toggle, a time-of-day greeting, scroll-reveal cards, a project details modal, " +
          "a back-to-top button, and, well, me. ",
        { text: "Try the JavaScript demo", href: "demo.html" },
        ".",
      ],
      chips: ["Are you an AI?", "Show me projects"],
    },
    {
      id: "project4",
      keywords: ["project 4", "fourth", "final project", "next project", "coming soon", "upcoming"],
      reply: ["Project 4 is Renee's final CSCI-310 project and it's in progress right now. Check back soon!"],
      chips: ["Show me projects"],
    },
    {
      id: "contact",
      keywords: ["contact", "email", "e-mail", "reach", "message", "talk", "get in touch", "connect", "send", "write to", "leave a message"],
      action: "startMessage",
    },
    {
      id: "linkedin",
      keywords: ["linkedin", "linked in"],
      reply: ["Here's Renee's ", { text: "LinkedIn profile", href: LINKEDIN }, "."],
      chips: ["Leave a message"],
    },
    {
      id: "github",
      keywords: ["github", "git hub", "source", "code", "repo", "repository"],
      reply: ["All of Renee's project code is on ", { text: "GitHub", href: GITHUB }, "."],
      chips: ["Show me projects"],
    },
    {
      id: "bot",
      keywords: ["are you", "ai", "bot", "robot", "chatgpt", "real person", "human", "how do you work"],
      reply: [
        "I'm a small assistant Renee wrote in plain JavaScript. I'm not an AI model: I match keywords in your question to answers she wrote. " +
          "If I can't help, I can pass a message straight to her.",
      ],
      chips: ["Leave a message", "Who is Renee?"],
    },
    {
      id: "thanks",
      keywords: ["thanks", "thank you", "thx", "ty", "appreciate", "cool", "awesome", "great", "nice"],
      reply: ["You're welcome! Anything else I can help with?"],
      chips: ["Leave a message", "Show me projects"],
    },
    {
      id: "bye",
      keywords: ["bye", "goodbye", "see you", "later", "that's all", "thats all"],
      reply: ["Thanks for stopping by! Have a great day."],
      chips: [],
    },
  ];

  const FALLBACK = {
    reply: ["I'm not sure about that one. I can tell you about Renee's background, skills, projects, or internship search, or I can pass a message along to her."],
    chips: ["Who is Renee?", "Show me projects", "Leave a message"],
  };

  /* --- Matching: count keyword hits (whole words / phrases), best wins --- */
  function normalize(s) {
    return " " + s.toLowerCase().replace(/[^a-z0-9.\-'é ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
  }

  // Very common words count for less, so "tell me about the multiplayer game"
  // lands on the multiplayer answer instead of the generic "about" one.
  const WEAK = new Set(["who", "about", "game", "play", "site", "built", "build", "made", "know", "code", "source",
    "later", "great", "nice", "cool", "send", "talk", "message", "work for", "show me", "online", "class", "connect"]);

  function findIntent(text) {
    const t = normalize(text);
    let best = null;
    let bestScore = 0;
    INTENTS.forEach((intent) => {
      let score = 0;
      intent.keywords.forEach((k) => {
        if (t.includes(" " + k + " ") || (k.length > 4 && t.includes(k))) {
          if (WEAK.has(k)) score += 0.5;
          else score += k.includes(" ") ? 2 : 1; // phrases count more than single words
        }
      });
      if (score > bestScore) { best = intent; bestScore = score; }
    });
    return best;
  }

  /* --- Build the widget --- */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return node;
  }

  const launcher = el("button", { class: "chat-launcher", type: "button", "aria-label": "Open chat assistant", "aria-expanded": "false", "aria-controls": "chatPanel" }, [
    el("span", { class: "chat-launcher-icon", "aria-hidden": "true", text: "💬" }),
    el("span", { class: "chat-launcher-text", text: "Ask about Renee" }),
  ]);

  const log = el("div", { class: "chat-log", role: "log", "aria-live": "polite" });
  const chipsBox = el("div", { class: "chat-chips" });
  const input = el("input", { type: "text", class: "chat-input", placeholder: "Type a question…", "aria-label": "Message", maxlength: "1000", autocomplete: "off" });
  const sendBtn = el("button", { type: "submit", class: "chat-send", "aria-label": "Send", text: "➤" });
  const inputForm = el("form", { class: "chat-form" }, [input, sendBtn]);
  const closeBtn = el("button", { type: "button", class: "chat-close", "aria-label": "Close chat", text: "×" });

  const panel = el("section", { id: "chatPanel", class: "chat-panel", role: "dialog", "aria-label": "Chat assistant", hidden: "" }, [
    el("header", { class: "chat-header" }, [
      el("div", {}, [
        el("p", { class: "chat-title", text: "Ask about Renee" }),
        el("p", { class: "chat-subtitle", text: "Quick answers, or leave her a message" }),
      ]),
      closeBtn,
    ]),
    log,
    chipsBox,
    inputForm,
  ]);

  document.body.appendChild(panel);
  document.body.appendChild(launcher);
  document.body.classList.add("has-chat");

  /* --- Rendering helpers --- */
  function addMessage(parts, who) {
    const bubble = el("div", { class: `chat-msg chat-msg-${who}` });
    (Array.isArray(parts) ? parts : [parts]).forEach((p) => {
      if (typeof p === "string") bubble.appendChild(document.createTextNode(p));
      else if (p && p.href) {
        const a = el("a", { href: p.href, text: p.text });
        if (/^https?:/.test(p.href)) { a.target = "_blank"; a.rel = "noopener"; }
        else if (p.href.startsWith("#")) a.addEventListener("click", closeChat);
        bubble.appendChild(a);
      }
    });
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function botSay(parts, chips) {
    // A short "typing" pause makes the conversation easier to follow
    const typing = el("div", { class: "chat-msg chat-msg-bot chat-typing", "aria-hidden": "true" }, [el("span"), el("span"), el("span")]);
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    setChips([]);
    setTimeout(() => {
      typing.remove();
      addMessage(parts, "bot");
      setChips(chips || []);
    }, 350);
  }

  function setChips(list) {
    chipsBox.replaceChildren();
    list.forEach((label) => {
      const b = el("button", { type: "button", class: "chat-chip", text: label });
      b.addEventListener("click", () => handleUserText(label));
      chipsBox.appendChild(b);
    });
  }

  /* --- Leave-a-message flow (a tiny state machine) --- */
  let flow = null; // null | { step, name, email, message }

  function startMessageFlow() {
    if (!cfg.web3formsAccessKey) {
      botSay(["Renee's message inbox isn't connected yet. For now, the best way to reach her is ", { text: "LinkedIn", href: LINKEDIN }, "."], ["Who is Renee?", "Show me projects"]);
      return;
    }
    flow = { step: "name" };
    botSay(["Happy to pass a message along to Renee. Your email stays between you and her. First, what's your name?"], ["Cancel"]);
  }

  async function continueFlow(text) {
    if (/^(cancel|stop|never mind|nevermind|quit)$/i.test(text.trim())) {
      flow = null;
      botSay(["No problem, message cancelled. Anything else?"], ["Show me projects", "Who is Renee?"]);
      return;
    }
    if (flow.step === "name") {
      flow.name = text.trim().slice(0, 100);
      flow.step = "email";
      botSay([`Nice to meet you, ${flow.name}. What email should Renee reply to?`], ["Cancel"]);
    } else if (flow.step === "email") {
      const email = text.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        botSay(["Hmm, that doesn't look like an email address. Could you try again?"], ["Cancel"]);
        return;
      }
      flow.email = email;
      flow.step = "message";
      botSay(["Got it. What would you like to say to Renee?"], ["Cancel"]);
    } else if (flow.step === "message") {
      flow.message = text.trim();
      flow.step = "confirm";
      botSay([`Here's what I'll send:\nFrom: ${flow.name} (${flow.email})\n"${flow.message}"\n\nSend it?`], ["Send it", "Cancel"]);
    } else if (flow.step === "confirm") {
      if (!/^(send|send it|yes|y|yep|sure|ok|okay)$/i.test(text.trim())) {
        botSay(["Just say \"Send it\" when you're ready, or \"Cancel\" to stop."], ["Send it", "Cancel"]);
        return;
      }
      const payload = { name: flow.name, email: flow.email, message: flow.message, topic: "Chat assistant", source: "chat assistant" };
      flow = null;
      botSay(["Sending…"], []);
      const result = await window.sendContactMessage(payload);
      botSay([result.message], result.ok ? ["Show me projects"] : ["Leave a message"]);
    }
  }

  /* --- Main handler --- */
  function handleUserText(text) {
    const clean = text.trim();
    if (!clean) return;
    addMessage(clean, "user");

    if (flow) { continueFlow(clean); return; }

    const intent = findIntent(clean);
    if (!intent) { botSay(FALLBACK.reply, FALLBACK.chips); return; }
    if (intent.action === "startMessage") { startMessageFlow(); return; }
    botSay(intent.reply, intent.chips);
  }

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    handleUserText(text);
  });

  /* --- Open / close --- */
  let greeted = false;
  function openChat() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    document.body.classList.add("chat-open");
    if (!greeted) {
      greeted = true;
      botSay(["Hi! I'm Renee's site assistant. Ask me about her background, skills, or projects, or leave her a message."], ["Who is Renee?", "Work experience", "Show me projects", "Leave a message"]);
    }
    setTimeout(() => input.focus(), 50);
  }
  function closeChat() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    document.body.classList.remove("chat-open");
  }

  launcher.addEventListener("click", () => (panel.hidden ? openChat() : closeChat()));
  closeBtn.addEventListener("click", () => { closeChat(); launcher.focus(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { closeChat(); launcher.focus(); }
  });

  // Let other parts of the page open the chat (e.g. a button with data-open-chat)
  document.querySelectorAll("[data-open-chat]").forEach((b) => b.addEventListener("click", openChat));
})();
