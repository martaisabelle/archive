/* ─── CURSOR CUSTOMIZADO ───────────────────────────────── */
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .port-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

/* ─── SCROLL REVEAL (Intersection Observer) ─────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ─── NAV SCROLL BEHAVIOR ────────────────────────────────── */
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) {
    nav.style.background = 'rgba(44,26,14,0.92)';
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.padding = '1rem 2.5rem';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.padding = '1.5rem 2.5rem';
  }
  lastScroll = current;
});

/* ─── STAGGERED REVEAL PARA GRID ITEMS ───────────────────── */
const gridItems = document.querySelectorAll('.port-item, .yt-card, .stat-item');

const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = Array.from(gridItems).indexOf(entry.target) % 6 * 80;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

gridItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  gridObserver.observe(el);
});

/* ─── YOUTUBE RECENT VIDEOS ──────────────────────────────── */
// Dados estáticos com thumbnails reais do canal (sem API key)
// Para produção: conectar via YouTube Data API v3
const ytVideos = [
  {
    title: "Jogando até não aguentar mais",
    category: "Games",
    thumb: null,
    url: "https://www.youtube.com/@martaisabelle"
  },
  {
    title: "Rotina de streamer: o que ninguém mostra",
    category: "Lifestyle",
    thumb: null,
    url: "https://www.youtube.com/@martaisabelle"
  },
  {
    title: "Minha setup completa 2024",
    category: "Setup Tour",
    thumb: null,
    url: "https://www.youtube.com/@martaisabelle"
  },
  {
    title: "Reagindo aos meus clips antigos",
    category: "Games",
    thumb: null,
    url: "https://www.youtube.com/@martaisabelle"
  }
];

function createYTCard(video, index) {
  const colors = ['#4a5e45','#6b3e26','#2c1a0e','#8b6914'];
  const bg = colors[index % colors.length];
  
  return `
    <a class="yt-card reveal" href="${video.url}" target="_blank" rel="noopener">
      <div class="yt-thumb">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="180" fill="${bg}" opacity="0.15"/>
          <rect x="0" y="0" width="320" height="180" fill="${bg}" opacity="0.08"/>
          <!-- hand-drawn grid lines -->
          <line x1="0" y1="60" x2="320" y2="60" stroke="${bg}" stroke-width="0.5" opacity="0.3"/>
          <line x1="0" y1="120" x2="320" y2="120" stroke="${bg}" stroke-width="0.5" opacity="0.3"/>
          <line x1="80" y1="0" x2="80" y2="180" stroke="${bg}" stroke-width="0.5" opacity="0.3"/>
          <line x1="160" y1="0" x2="160" y2="180" stroke="${bg}" stroke-width="0.5" opacity="0.3"/>
          <line x1="240" y1="0" x2="240" y2="180" stroke="${bg}" stroke-width="0.5" opacity="0.3"/>
          <!-- play icon abstrato -->
          <circle cx="160" cy="90" r="28" fill="none" stroke="${bg}" stroke-width="1.5" opacity="0.6"/>
          <polygon points="152,78 178,90 152,102" fill="${bg}" opacity="0.5"/>
          <!-- grain texture dots -->
          <circle cx="40" cy="30" r="1" fill="${bg}" opacity="0.2"/>
          <circle cx="100" cy="150" r="1.5" fill="${bg}" opacity="0.2"/>
          <circle cx="280" cy="45" r="1" fill="${bg}" opacity="0.2"/>
          <circle cx="220" cy="140" r="2" fill="${bg}" opacity="0.15"/>
        </svg>
        <div class="yt-play-btn"></div>
      </div>
      <div class="yt-info">
        <h3>${video.title}</h3>
        <span>${video.category}</span>
      </div>
    </a>
  `;
}

const ytGrid = document.querySelector('.yt-grid');
if (ytGrid) {
  ytGrid.innerHTML = ytVideos.map((v, i) => createYTCard(v, i)).join('');
  // Re-observe novos elementos
  document.querySelectorAll('.yt-card.reveal').forEach(el => observer.observe(el));
}

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});