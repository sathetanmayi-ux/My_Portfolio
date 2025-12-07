// Theme toggle
const root = document.getElementById('page-root');
const btn = document.getElementById('themeToggle');

function applyTheme(name) {
  if (!root) return;
  if (name === 'dark') {
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
    if (btn) btn.innerText = 'Light';
  } else {
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
    if (btn) btn.innerText = 'Dark';
  }
  localStorage.setItem('theme', name);
}

const saved = localStorage.getItem('theme') || 'light';
applyTheme(saved);

if (btn) {
  btn.addEventListener('click', () => {
    const next = root.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(next);
  });
}
