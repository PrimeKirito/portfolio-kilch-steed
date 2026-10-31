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
const slideGalleryControls = new Map();
let pointerStart = null;
let suppressSlideClick = false;

carousel?.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a')) {
    pointerStart = null;
    return;
  }

  pointerStart = {
    x: event.clientX,
    y: event.clientY,
    pointerId: event.pointerId,
    slide: event.target.closest('.slide')
  };
});

carousel?.addEventListener('pointerup', event => {
  if (!pointerStart || pointerStart.pointerId !== event.pointerId) return;

  const start = pointerStart;
  const deltaX = event.clientX - start.x;
  const deltaY = event.clientY - start.y;
  pointerStart = null;

  // Horizontal intent is required. Vertical movement remains native page scrolling.
  if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

  suppressSlideClick = true;
  window.setTimeout(() => { suppressSlideClick = false; }, 400);

  // On touch screens, swipe through the active card's images.
  // Swiping outside the active card changes the project instead.
  const gallery = start.slide?.classList.contains('is-active')
    ? slideGalleryControls.get(start.slide)
    : null;

  if (gallery) {
    gallery.step(deltaX < 0 ? 1 : -1);
  } else {
    setActiveSlide(activeIndex + (deltaX < 0 ? 1 : -1));
  }
});

carousel?.addEventListener('pointercancel', () => { pointerStart = null; });
carousel?.addEventListener('lostpointercapture', () => { pointerStart = null; });

const dialog = document.querySelector('.project-dialog');
let currentProjectIndex = 0;

const dedicatedProjectDialogs = {
  nano: 'dialog-nano',
  codev: 'dialog-codev',
  scuio: 'dialog-scuio',
  plaine: 'dialog-plaine',
  lundi: 'dialog-lundi',
  sacerdoce: 'dialog-sacerdoce',
  magik: 'dialog-magik',
  agency: 'dialog-agence',
  agence: 'dialog-agence',
  '893': 'dialog-agence',
  autres: 'dialog-autres',
  more: 'dialog-autres'
};

function openProject(key) {
  const dedicatedDialogId = dedicatedProjectDialogs[key];
  if (dedicatedDialogId) {
    document.getElementById(dedicatedDialogId)?.showModal();
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
    if (suppressSlideClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
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
        copyText.textContent = '';
        copyBtn.classList.remove('is-copied');
      }, 2500);
    } catch (error) {
      copyText.textContent = 'Copie indisponible';
    }
  });
}


const hoverGalleries = {
  nano: ['NaNo App01.png','NaNo App02.png','NaNo App03.png','NaNo App04.png','NaNo App06.png','NaNo App07.png','NaNo App08.png'],
  codev: ['codev-grand-paris01.png','codev-grand-paris02.png','codev-grand-paris03.png','codev-grand-paris04.png'],
  plaine: ['plaine-commune01.png','plaine-commune02.png'],
  scuio: ['guide-scuio-ip01.png','guide-scuio-ip02.png'],
  lundi: ['atelier-lundi-pro01.PNG','atelier-lundi-pro02.PNG','atelier-lundi-pro03.PNG'],
  sacerdoce: ['sacerdoce-royal01.png','sacerdoce-royal02.png','sacerdoce-royal03.png','sacerdoce-royal04.png','sacerdoce-royal05.png','sacerdoce-royal06.png'],
  magik: ['magik-optik01.png','magik-optik02.png'],
  agency: ['893° 01.png','893 °.png','893 ° 02.png','893 ° 03.png','893 ° 04.png'],
  autres: ['Autres01.png','Autres02.png','Autres03.png']
};
const encodeAsset = name => 'assets/' + encodeURIComponent(name).replace(/%2F/gi, '/');
slides.forEach(slide => {
  const gallery = hoverGalleries[slide.dataset.project] || [];
  const image = slide.querySelector('img');
  if (gallery.length < 2 || !image) return;
  const counter = document.createElement('span');
  counter.className = 'slide-gallery-count';
  counter.setAttribute('aria-hidden', 'true');
  counter.textContent = '01 / ' + String(gallery.length).padStart(2, '0');
  slide.append(counter);
  let chosen = 0;
  const updateFrame = nextIndex => {
    chosen = (nextIndex + gallery.length) % gallery.length;
    image.src = encodeAsset(gallery[chosen]);
    image.alt = slide.getAttribute('aria-label').replace(/^Projet \d+ sur \d+ : /, '') + ' — visuel ' + (chosen + 1) + ' sur ' + gallery.length;
    counter.textContent = String(chosen + 1).padStart(2, '0') + ' / ' + String(gallery.length).padStart(2, '0');
  };

  slideGalleryControls.set(slide, {
    step: direction => updateFrame(chosen + direction)
  });

  const selectFrame = event => {
    if (event.pointerType !== 'mouse' || event.target.closest('button')) return;
    const rect = slide.getBoundingClientRect();
    const ratio = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
    const next = Math.min(gallery.length - 1, Math.floor(ratio * gallery.length));
    if (next === chosen) return;
    updateFrame(next);
  };

  slide.addEventListener('pointermove', selectFrame);
  slide.addEventListener('pointerleave', event => {
    // Keep the selected frame after a touch swipe; only desktop hover previews reset.
    if (event.pointerType !== 'mouse' || chosen === 0) return;
    updateFrame(0);
  });
});

const titleSelector = '.slide-copy h2, .about-heading h2, .experience-heading h2, .contact-content h2, .animated-title';
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const titles = Array.from(document.querySelectorAll(titleSelector));
  titles.forEach(title => title.classList.add('title-reveal'));
  document.documentElement.classList.add('has-title-reveal');
  const titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  titles.forEach(title => titleObserver.observe(title));
}

setActiveSlide(0);

/* --- CHOIX DE MESURE D'AUDIENCE : CHARGEMENT CONDITIONNEL CLOUDFLARE --- */
const initializeCookieConsent = () => {
  const consentKey = 'cookie_consent_choice_v2';
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  const manageBtn = document.getElementById('manage-cookies');
  const analyticsTemplate = document.getElementById('cloudflare-analytics-template');
  const entryLoader = document.querySelector('[data-entry-loader]');

  if (!cookieBanner) return;

  const readChoice = () => {
    try {
      return window.localStorage.getItem(consentKey);
    } catch (error) {
      return null;
    }
  };

  const saveChoice = choice => {
    try {
      window.localStorage.setItem(consentKey, choice);
      return true;
    } catch (error) {
      return false;
    }
  };

  const closeBanner = () => {
    cookieBanner.classList.remove('is-active');
    cookieBanner.setAttribute('aria-hidden', 'true');
  };

  const openBanner = () => {
    cookieBanner.classList.add('is-active');
    cookieBanner.setAttribute('aria-hidden', 'false');
  };

  const loadCloudflareAnalytics = () => {
    if (!analyticsTemplate || document.querySelector('[data-cloudflare-analytics-loaded]')) return;

    const source = analyticsTemplate.content.querySelector('script');
    if (!source) return;

    const beacon = document.createElement('script');
    beacon.type = source.type || 'module';
    beacon.src = source.src;
    const beaconConfig = source.getAttribute('data-cf-beacon');
    if (beaconConfig) beacon.setAttribute('data-cf-beacon', beaconConfig);
    beacon.dataset.cloudflareAnalyticsLoaded = 'true';
    document.body.appendChild(beacon);
  };

  const loaderHasDisappeared = () => {
    if (!entryLoader) return true;
    return entryLoader.hidden ||
      entryLoader.getAttribute('aria-hidden') === 'true' ||
      window.getComputedStyle(entryLoader).display === 'none';
  };

  const openBannerAfterLoader = () => {
    const checkLoader = () => {
      if (loaderHasDisappeared()) {
        window.requestAnimationFrame(() => {
          if (readChoice() === null) openBanner();
        });
        return;
      }
      window.setTimeout(checkLoader, 120);
    };

    checkLoader();
  };

  const currentChoice = readChoice();
  if (currentChoice === 'accepted') {
    loadCloudflareAnalytics();
  } else if (currentChoice !== 'declined') {
    openBannerAfterLoader();
  }

  acceptBtn?.addEventListener('click', () => {
    saveChoice('accepted');
    loadCloudflareAnalytics();
    closeBanner();
  });

  declineBtn?.addEventListener('click', () => {
    saveChoice('declined');
    closeBanner();
    if (document.querySelector('[data-cloudflare-analytics-loaded]')) {
      window.location.reload();
    }
  });

  manageBtn?.addEventListener('click', openBanner);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCookieConsent, { once: true });
} else {
  initializeCookieConsent();
}
