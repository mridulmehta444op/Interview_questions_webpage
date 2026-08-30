// ---------------------------------------------------------------
// Whiteboard Interview — Question Generator
// Pulls from the static QUESTION_BANK (questions-data.js).
// No API key, no server, no internet connection required.
// ---------------------------------------------------------------

const generateBtn = document.getElementById('generateBtn');
const results = document.getElementById('results');
const statusMsg = document.getElementById('status-msg');
const eraseBtn = document.getElementById('eraseBtn');
const actionsFooter = document.getElementById('actionsFooter');

function setError(message) {
  results.innerHTML = `<div class="empty-state" style="color: var(--marker-red);">${message}</div>`;
  actionsFooter.style.display = 'none';
}

function diffClass(d) {
  const s = (d || '').toLowerCase();
  if (s.startsWith('e')) return 'easy';
  if (s.startsWith('h')) return 'hard';
  return 'medium';
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderQuestions(questions, difficulty) {
  const cls = diffClass(difficulty);
  results.innerHTML = questions.map((q, i) => `
    <div class="q-card" style="animation-delay:${i * 0.05}s">
      <div class="q-num ${cls}">${i + 1}</div>
      <div class="q-body">
        <div class="q-meta"><span class="tag ${cls}">${difficulty}</span></div>
        <p class="q-text">${escapeHTML(q.question)}</p>
        ${q.hint ? `
          <button class="hint-toggle" type="button" data-idx="${i}">Peek at the approach</button>
          <div class="hint-note" id="hint-${i}">${escapeHTML(q.hint)}</div>
        ` : ''}
      </div>
    </div>
  `).join('');

  results.querySelectorAll('.hint-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const note = document.getElementById(`hint-${btn.dataset.idx}`);
      const showing = note.classList.toggle('show');
      btn.textContent = showing ? 'Hide the approach' : 'Peek at the approach';
    });
  });

  actionsFooter.style.display = 'flex';
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function generateQuestions() {
  const role = document.getElementById('role').value;
  const difficulty = document.getElementById('difficulty').value;
  const topic = document.getElementById('topic').value;
  const count = parseInt(document.getElementById('count').value, 10);

  statusMsg.textContent = '';

  const bucket = QUESTION_BANK[topic] && QUESTION_BANK[topic][difficulty];

  if (!bucket || bucket.length === 0) {
    setError(`No questions on the board yet for ${topic} (${difficulty}).`);
    return;
  }

  // Shuffle so repeat runs don't always show the same order,
  // then take as many as requested (bank has 15 per topic/difficulty).
  const picked = shuffle(bucket).slice(0, Math.min(count, bucket.length));

  renderQuestions(picked, difficulty);

  // role isn't used to filter (fundamentals are shared across roles),
  // but it's still shown for context if you want to extend this later.
  void role;
}

generateBtn.addEventListener('click', generateQuestions);

eraseBtn.addEventListener('click', () => {
  results.innerHTML = `<div class="empty-state">Nothing on the board yet. Pick your criteria above and hit "Draw up questions."</div>`;
  actionsFooter.style.display = 'none';
});
