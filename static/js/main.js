// theme toggle
const root = document.getElementById('page-root');
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(t){
  if(!root) return;
  if(t === 'dark'){
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
    themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun');
  } else {
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
    themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon');
  }
  localStorage.setItem('theme', t);
}
const saved = localStorage.getItem('theme') || 'light';
setTheme(saved);
if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    const next = root.classList.contains('theme-dark') ? 'light' : 'dark';
    setTheme(next);
  });
}

// project modal
function openProject(title, desc, link){
  const modal = document.getElementById('projectModal');
  if(!modal) return;
  document.getElementById('pm-title').innerText = title;
  document.getElementById('pm-desc').innerText = desc;
  document.getElementById('pm-link').href = link;
  modal.style.display = 'grid';
}
function closeProject(){
  const modal = document.getElementById('projectModal');
  if(modal) modal.style.display = 'none';
}
document.addEventListener('click', (e)=>{
  if(e.target.matches('.view-project')) {
    const el = e.target.closest('.interactive');
    const title = e.target.dataset.title || el?.dataset?.title;
    const desc = e.target.dataset.desc || el?.dataset?.desc;
    const link = e.target.dataset.link || el?.dataset?.link || '#';
    openProject(title, desc, link);
  }
  if(e.target.matches('.close-modal') || e.target.id === 'projectModal') closeProject();
});

// card hover small tilt
document.querySelectorAll('.interactive').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2, cy = rect.height/2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    card.style.transform = `perspective(600px) rotateX(${dy * -3}deg) rotateY(${dx * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
});

// filters for projects page
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-tile').forEach(tile=>{
      if(f === 'all') tile.style.display = '';
      else {
        const tags = tile.dataset.tags.split(',');
        tile.style.display = tags.includes(f) ? '' : 'none';
      }
    });
  });
});

// small: close modal on ESC
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeProject(); });
