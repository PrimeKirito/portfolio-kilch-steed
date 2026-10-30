const projects = [
  { key:'nano', title:'NaNo Ring — une bague, trois usages', category:'Étude de cas · Produit connecté', description:'NaNo Ring réunit paiement, suivi santé et organisation quotidienne dans une bague connectée. Le travail consiste à rendre cette proposition plurielle claire et cohérente, en reliant les usages au fil d’une journée.', role:'Chef de projet : pilotage du projet et mise en cohérence des usages présentés autour du paiement, du suivi santé et de l’organisation quotidienne.', note:'Les médias du portfolio présentent un aperçu du projet. Ils ne constituent pas une validation médicale ni une promesse de performance.' },
  { key:'codev', title:'CODEV — Métropole du Grand Paris', category:'Production audiovisuelle · Pilotage', description:'L’agence 893° a cadré la production d’une série de quatre vidéos de témoignage pour le CODEV de la Métropole du Grand Paris. La préparation éditoriale, les tournages et la post-production ont été pensés comme un même parcours de production.', role:'Pilotage d’une production audiovisuelle pendant le stage de fin d’études à l’agence 893°.', note:'L’aperçu montre la couverture du document de cadrage. Les plannings et détails opérationnels internes ne sont pas publiés.' },
  { key:'plaine', title:'Plaine Commune — rapport institutionnel', category:'Production éditoriale · Mise en page', description:'Participation à la production éditoriale et à la mise en page d’un rapport consacré aux actes d’une journée d’échanges sur la clause sociale et l’achat responsable.', role:'Production éditoriale et mise en page, selon l’expérience présentée dans le portfolio.', note:'Seul un extrait visuel est présenté. Le rapport complet n’est pas disponible au téléchargement.' },
  { key:'scuio', title:'SCUIO-IP — guide sur l’IA générative', category:'Conception éditoriale · Pédagogie', description:'Un guide accompagne les agents du SCUIO-IP de l’Université Paris 8 dans l’usage réfléchi de l’IA générative pour la recherche d’emploi : amélioration du CV, lettres de motivation et préparation aux entretiens.', role:'Chef de projet et contribution à la conception et à la rédaction au sein de l’agence 893°, en collaboration avec l’équipe.', note:'Seule la couverture du guide est présentée.' },
  { key:'lundi', title:'Atelier IA — apprendre à faire', category:'Atelier · Transmission', description:'Un atelier destiné aux étudiants de l’Université Paris 8 explore comment utiliser l’IA pour chercher un stage ou une alternance.', role:'Co-animation et contribution à la conception du support au sein de l’agence 893°.', note:'Trois médias sélectionnés sont présentés ; le support complet n’est pas publié.' },
  { key:'sacerdoce', title:'Sacerdoce Royal — identité visuelle', category:'Identité visuelle · Charte graphique', description:'Une identité visuelle formalisée dans une charte graphique conçue et réalisée en 2026. Les éléments sélectionnés montrent les codes visuels et leurs règles d’usage.', role:'Conception de l’identité visuelle et formalisation de ses règles d’usage.', note:'La galerie présente six visuels. La charte complète n’est pas publiée sur ce site.' },
  { key:'magik', title:'Magik Opti’k — charte graphique', category:'Identité de marque · Design', description:'Une identité pour une marque de magasin d’optique, articulée autour d’un logotype qui associe la lettre M à une paire de lunettes.', role:'Conception graphique et formalisation d’un système d’identité visuelle.', note:'L’aperçu présente une sélection d’applications, sans publier la charte complète.' },
  { key:'agency', title:'893° — créations et communication d’agence', category:'Communication · Créations visuelles', description:'Une sélection de médias liés à 893°, l’agence de communication et d’innovation numérique. La galerie distingue les supports de l’agence des projets réalisés pour ses clients.', role:'Contribution au développement, à la coordination et à la communication de l’agence 893°.', note:'Quatre médias de l’agence sont présentés dans cette sélection.' },
  { key:'autres', title:'Autres créations — explorations graphiques', category:'Sélection complémentaire · Explorations', description:'Une galerie complémentaire rassemble des créations graphiques et des explorations visuelles qui ne relèvent pas des autres projets détaillés.', role:'Sélection de créations complémentaires.', note:'Les trois visuels forment une sélection, pas un projet client unique.' }
];

const slides = Array.from(document.querySelectorAll('.slide'));
const currentNumber = document.querySelector('[data-current]');
let activeIndex = 0;

function setActiveSlide(requestedIndex) {
  activeIndex = (requestedIndex + slides.length) % slides.length;
  slides.forEach((slide, index) => {
    const relative = (index - activeIndex + slides.length) % slides.length;
    const isPrevious = relative === slides.length - 1;
    const isNext = relative === 1;
    slide.classList.toggle('is-active', relative === 0);
    slide.classList.toggle('is-prev', isPrevious);
    slide.classList.toggle('is-next', isNext);
    slide.classList.toggle('is-far', relative > 1 && relative <= Math.floor(slides.length / 2));
    slide.classList.toggle('is-far-left', relative > Math.floor(slides.length / 2));
    slide.setAttribute('aria-hidden', String(relative !== 0));
    slide.inert = relative !== 0;
  });
  if (currentNumber) currentNumber.textContent = String(activeIndex + 1).padStart(2, '0');
}

document.querySelector('[data-previous]')?.addEventListener('click', () => setActiveSlide(activeIndex - 1));
document.querySelector('[data-next]')?.addEventListener('click', () => setActiveSlide(activeIndex + 1));

document.addEventListener('keydown', event => {
  if (document.querySelector('dialog[open]')) return;
  if (event.key === 'ArrowLeft') setActiveSlide(activeIndex - 1);
  if (event.key === 'ArrowRight') setActiveSlide(activeIndex + 1);
});

const carousel = document.querySelector('.carousel');
let pointerStart = null;
carousel?.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  pointerStart = event.clientX;
});
carousel?.addEventListener('pointerup', event => {
  if (pointerStart === null) return;
  const distance = event.clientX - pointerStart;
  pointerStart = null;
  if (Math.abs(distance) < 45) return;
  setActiveSlide(activeIndex + (distance < 0 ? 1 : -1));
});
carousel?.addEventListener('pointercancel', () => { pointerStart = null; });

const dialog = document.querySelector('.project-dialog');
let currentProjectIndex = 0;

function openProject(key) {
  if (key === 'nano' || key === 'codev') {
    document.getElementById('dialog-' + key)?.showModal();
    return;
  }
  const itemIndex = projects.findIndex(project => project.key === key);
  if (itemIndex < 0 || !dialog) return;
  currentProjectIndex = itemIndex;
  const item = projects[itemIndex];
  document.querySelector('#dialog-kicker').textContent = item.category;
  document.querySelector('#dialog-title').textContent = item.title;
  document.querySelector('.dialog-description').textContent = item.description;
  document.querySelector('.dialog-role').textContent = item.role;
  document.querySelector('.dialog-note').textContent = item.note;
  dialog.showModal();
}

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    openProject(button.dataset.open);
  });
});

slides.forEach((slide, index) => {
  slide.addEventListener('click', event => {
    if (event.target.closest('button')) return;
    if (index !== activeIndex) setActiveSlide(index);
    else openProject(slide.dataset.project);
  });
});

document.querySelector('.dialog-next')?.addEventListener('click', () => {
  const remaining = projects.filter(project => project.key !== 'nano' && project.key !== 'codev');
  const current = remaining.findIndex(project => project.key === projects[currentProjectIndex]?.key);
  currentProjectIndex = (current + 1 + remaining.length) % remaining.length;
  openProject(remaining[currentProjectIndex].key);
});

document.querySelectorAll('dialog.project-dialog').forEach(projectDialog => {
  projectDialog.addEventListener('click', event => {
    if (event.target === projectDialog) projectDialog.close();
  });
});

const navLinks = Array.from(document.querySelectorAll('.nav-item'));
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
function setCurrentNav(id) {
  navLinks.forEach(link => {
    const current = link.getAttribute('href') === '#' + id;
    link.classList.toggle('is-active', current);
    if (current) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
navLinks.forEach(link => link.addEventListener('click', () => setCurrentNav(link.getAttribute('href').slice(1))));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrentNav(visible.target.id);
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .15, .4, .7] });
  navSections.forEach(section => observer.observe(section));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

const copyBtn = document.getElementById('copy-email-btn');
const copyText = document.getElementById('copy-text');
if (copyBtn && copyText) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyText.textContent = 'Adresse copiée !';
      copyBtn.classList.add('is-copied');
      window.setTimeout(() => {
        copyText.textContent = '📋';
        copyBtn.classList.remove('is-copied');
      }, 2500);
    } catch (error) {
      copyText.textContent = 'Copie indisponible';
    }
  });
}

setActiveSlide(0);
