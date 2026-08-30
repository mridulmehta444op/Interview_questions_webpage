Whiteboard Interview — AI Interview Question Generator

A simple web app for practicing technical interview questions. Pick a role, topic, difficulty, and how many questions you want — the app pulls a random set from a built-in question bank and displays them on a whiteboard-styled board, complete with optional hints.

Show Image Show Image

Features
Role — Software Developer, QA, DevOps, Frontend
Topic — DSA, DBMS, OOP, OS, CN
Difficulty — Easy, Medium, Hard
Question count — 5, 10, or 15
225 curated questions (5 topics × 3 difficulties × 15 questions each), each with an optional "Peek at the approach" hint
Random selection on every run, so repeat sessions don't feel identical
No API key, no backend server, no internet connection needed — everything runs in the browser
Demo

Open index.html in any modern browser. That's it.

Project structure
.
├── index.html          # Page markup and the question-setup form
├── styles.css           # Whiteboard/marker-themed styling
├── script.js             # Filters and renders questions from the bank
└── questions-data.js      # Static question bank (225 questions)
Getting started
Option 1 — Just open it

Clone the repo and double-click index.html, or drag it into your browser.

bash
git clone https://github.com/<your-username>/whiteboard-interview.git
cd whiteboard-interview

Then open index.html directly, or serve it locally:

Option 2 — Serve it locally (optional, for a cleaner localhost URL)
bash
# Python
python3 -m http.server 8000

# Node (if you have npx)
npx serve .

Then visit http://localhost:8000.

How it works

questions-data.js defines a QUESTION_BANK object keyed by topic and difficulty:

js
const QUESTION_BANK = {
  DSA: {
    Easy: [{ question: "...", hint: "..." }, ...],
    Medium: [...],
    Hard: [...]
  },
  DBMS: { ... },
  ...
};

When you click Draw up questions, script.js looks up the matching topic + difficulty bucket, shuffles it, and renders the requested count as cards. The Role field is currently for context only — DSA/DBMS/OOP/OS/CN fundamentals are shared across roles — but the data structure can be extended to filter by role too (see below).

Extending the question bank

To add more questions, open questions-data.js and add entries to the relevant topic/difficulty array:

js
{ question: "Your question here?", hint: "A short nudge, not the full answer." }

To add role-specific filtering, nest an extra level in QUESTION_BANK (e.g. QUESTION_BANK[role][topic][difficulty]) and update the lookup in script.js's generateQuestions() function accordingly.

Tech stack

Plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

License

MIT — free to use, modify, and share.
