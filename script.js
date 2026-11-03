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

const slideGalleryControls = new Map();
let internalGalleryInterval = null;
let slideshowResumeTimeout = null;
const AUTO_SLIDE_DELAY = 2800;
const SLIDESHOW_RESUME_DELAY = 900;
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function stopActiveProjectSlideshow() {
  if (internalGalleryInterval !== null) {
    window.clearInterval(internalGalleryInterval);
    internalGalleryInterval = null;
  }
}

function pauseActiveProjectSlideshow() {
  stopActiveProjectSlideshow();
  if (slideshowResumeTimeout !== null) {
    window.clearTimeout(slideshowResumeTimeout);
    slideshowResumeTimeout = null;
  }
}

function startActiveProjectSlideshow() {
  pauseActiveProjectSlideshow();

  const activeCard = slides[activeIndex];
  if (
    !activeCard ||
    !activeCard.classList.contains('is-active') ||
    document.hidden ||
    document.querySelector('dialog[open]') ||
    reducedMotionPreference.matches
  ) return;

  // Do not rotate under a desktop pointer: manual hover-preview takes priority.
  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fineHover && activeCard.matches(':hover')) return;

  const gallery = slideGalleryControls.get(activeCard);
  if (!gallery || gallery.length <= 1) return;

  internalGalleryInterval = window.setInterval(() => {
    if (document.hidden || slides[activeIndex] !== activeCard || !activeCard.classList.contains('is-active')) {
      stopActiveProjectSlideshow();
      return;
    }
    gallery.step(1);
  }, AUTO_SLIDE_DELAY);
}

function scheduleActiveProjectSlideshow(delay = SLIDESHOW_RESUME_DELAY) {
  stopActiveProjectSlideshow();
  if (slideshowResumeTimeout !== null) window.clearTimeout(slideshowResumeTimeout);
  slideshowResumeTimeout = window.setTimeout(() => {
    slideshowResumeTimeout = null;
    startActiveProjectSlideshow();
  }, delay);
}

function setActiveSlide(requestedIndex) {
  pauseActiveProjectSlideshow();
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
  startActiveProjectSlideshow();
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
let suppressSlideClick = false;

carousel?.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a')) {
    pointerStart = null;
    return;
  }

  const touchedSlide = event.target.closest('.slide');
  pointerStart = {
    x: event.clientX,
    y: event.clientY,
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    slide: touchedSlide
  };

  if (touchedSlide?.classList.contains('is-active')) {
    pauseActiveProjectSlideshow();
  }
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

  if (start.slide?.classList.contains('is-active')) {
    scheduleActiveProjectSlideshow();
  }
});

carousel?.addEventListener('pointercancel', () => {
  const wasActive = pointerStart?.slide?.classList.contains('is-active');
  pointerStart = null;
  if (wasActive) scheduleActiveProjectSlideshow();
});

carousel?.addEventListener('lostpointercapture', () => {
  const wasActive = pointerStart?.slide?.classList.contains('is-active');
  pointerStart = null;
  if (wasActive) scheduleActiveProjectSlideshow();
});

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
  pauseActiveProjectSlideshow();
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

  projectDialog.addEventListener('close', () => {
    scheduleActiveProjectSlideshow(500);
  });
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseActiveProjectSlideshow();
  else scheduleActiveProjectSlideshow(300);
});

reducedMotionPreference.addEventListener?.('change', event => {
  if (event.matches) pauseActiveProjectSlideshow();
  else scheduleActiveProjectSlideshow(300);
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
  const firstImage = slide.querySelector('img');
  if (gallery.length < 2 || !firstImage) return;

  const counter = document.createElement('span');
  counter.className = 'slide-gallery-count';
  counter.setAttribute('aria-hidden', 'true');
  counter.textContent = '01 / ' + String(gallery.length).padStart(2, '0');
  slide.append(counter);

  // Two synchronized layers allow an actual cross-fade without changing the card layout.
  firstImage.classList.add('gallery-image-layer', 'is-visible');
  firstImage.setAttribute('aria-hidden', 'false');

  const secondImage = firstImage.cloneNode(false);
  secondImage.classList.remove('is-visible');
  secondImage.classList.add('gallery-image-layer');
  secondImage.setAttribute('aria-hidden', 'true');
  secondImage.alt = '';
  secondImage.loading = 'eager';
  secondImage.decoding = 'async';
  slide.insertBefore(secondImage, slide.querySelector('.slide-scrim'));

  const layers = [firstImage, secondImage];
  let visibleLayerIndex = 0;
  let visibleFrameIndex = 0;
  let chosen = 0;
  let frameRequestId = 0;

  const updateFrame = nextIndex => {
    const next = (nextIndex + gallery.length) % gallery.length;
    if (next === chosen) return;

    chosen = next;
    const targetLayerIndex = 1 - visibleLayerIndex;
    const targetLayer = layers[targetLayerIndex];
    const requestId = ++frameRequestId;
    const targetAlt = slide.getAttribute('aria-label').replace(/^Projet \d+ sur \d+ : /, '') +
      ' — visuel ' + (next + 1) + ' sur ' + gallery.length;
    let frameRevealed = false;

    const revealLoadedFrame = () => {
      if (requestId !== frameRequestId || frameRevealed) return;
      frameRevealed = true;

      const previousLayer = layers[visibleLayerIndex];
      previousLayer.classList.remove('is-visible');
      previousLayer.setAttribute('aria-hidden', 'true');

      targetLayer.alt = targetAlt;
      targetLayer.classList.add('is-visible');
      targetLayer.setAttribute('aria-hidden', 'false');
      visibleLayerIndex = targetLayerIndex;
      visibleFrameIndex = next;

      // Keep the counter and accessible description in sync with the visible image.
      counter.textContent = String(next + 1).padStart(2, '0') + ' / ' + String(gallery.length).padStart(2, '0');
    };

    targetLayer.onload = revealLoadedFrame;
    targetLayer.onerror = () => {
      if (requestId === frameRequestId) chosen = visibleFrameIndex;
    };
    targetLayer.src = encodeAsset(gallery[next]);

    if (targetLayer.complete && targetLayer.naturalWidth > 0) {
      window.requestAnimationFrame(revealLoadedFrame);
    }
  };

  slideGalleryControls.set(slide, {
    length: gallery.length,
    step: direction => updateFrame(chosen + direction)
  });

  const selectFrame = event => {
    if (event.pointerType !== 'mouse' || event.target.closest('button')) return;
    const rect = slide.getBoundingClientRect();
    const ratio = Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
    const next = Math.min(gallery.length - 1, Math.floor(ratio * gallery.length));
    if (next !== chosen) updateFrame(next);
  };

  slide.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && slide.classList.contains('is-active')) {
      pauseActiveProjectSlideshow();
    }
  });

  slide.addEventListener('pointermove', selectFrame);

  slide.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;

    if (chosen !== 0) updateFrame(0);
    if (slide.classList.contains('is-active')) {
      scheduleActiveProjectSlideshow();
    }
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




/* --- PROCESS STORY : PERSONNAGE ET DESSIN SYNCHRONISÉS AU SCROLL --- */
function initializeProcessStory() {
  const map = document.querySelector('[data-process-map]');
  const artwork = document.getElementById('process-artwork');
  const path = document.getElementById('process-route-progress');
  const walker = document.getElementById('process-walker');

  if (!map || !artwork || !path || !walker || typeof path.getTotalLength !== 'function') return;

  const basePathDesktop = 'M 70 390 C 190 300 340 310 480 385 S 740 470 880 360 S 1050 300 1130 400 C 1200 520 1130 680 1000 770 S 770 875 610 830 S 330 760 170 900 C 70 980 130 1160 270 1240 S 590 1370 770 1320 S 1010 1270 1140 1430';
  const basePathMobile = 'M 38 360 C 120 300 300 320 365 420 S 350 620 220 700 S 42 810 62 950 S 260 1080 365 1200 S 285 1370 120 1460';

  const scenes = [
    document.getElementById('process-scene-01'),
    document.getElementById('process-scene-02'),
    document.getElementById('process-scene-03')
  ];
  const steps = Array.from(document.querySelectorAll('[data-process-step]'));
  const pins = [
    document.getElementById('process-pin-01'),
    document.getElementById('process-pin-02'),
    document.getElementById('process-pin-03')
  ];
  const stepCounter = document.getElementById('process-current-step');
  const legBack = document.getElementById('process-leg-back');
  const legFront = document.getElementById('process-leg-front');
  const armBack = document.getElementById('process-arm-back');
  const armFront = document.getElementById('process-arm-front');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 768px)');

  let pathLength = 0;
  let framePending = false;
  let lastFacing = 1;
  let activeScene = -1;

  const applyArtLayout = () => {
    const mobile = mobileLayout.matches;
    artwork.setAttribute('viewBox', mobile ? '0 0 420 1500' : '0 0 1200 1500');
    path.setAttribute('d', mobile ? basePathMobile : basePathDesktop);
    document.querySelector('.process-route-base')?.setAttribute('d', mobile ? basePathMobile : basePathDesktop);

    scenes[0]?.setAttribute('transform', mobile ? 'translate(270 130) scale(.78)' : 'translate(860 105)');
    scenes[1]?.setAttribute('transform', mobile ? 'translate(10 620) scale(.72)' : 'translate(65 615)');
    scenes[2]?.setAttribute('transform', mobile ? 'translate(235 1010) scale(.72)' : 'translate(810 985)');

    pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = String(pathLength);
    activeScene = -1;
  };

  const clamp = value => Math.min(1, Math.max(0, value));

  const updateSceneStates = progress => {
    const nextScene = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
    if (nextScene !== activeScene) {
      activeScene = nextScene;
      scenes.forEach((scene, index) => {
        scene?.classList.toggle('is-current', index === nextScene);
        scene?.classList.toggle('is-complete', index < nextScene);
      });
      steps.forEach((step, index) => {
        step.classList.toggle('is-current', index === nextScene);
        step.classList.toggle('is-complete', index < nextScene);
      });
      pins.forEach((pin, index) => {
        pin?.classList.toggle('is-current', index === nextScene);
        pin?.classList.toggle('is-complete', index < nextScene);
      });
      if (stepCounter) stepCounter.textContent = String(nextScene + 1).padStart(2, '0');
    }
  };

  const updateProcessStory = () => {
    if (framePending) return;
    framePending = true;

    window.requestAnimationFrame(() => {
      const rect = map.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travelDistance = rect.height + viewportHeight;
      const travelled = viewportHeight - rect.top;
      const progress = reducedMotion.matches
        ? 1
        : travelDistance > 0 ? clamp(travelled / travelDistance) : 0;

      const drawnLength = pathLength * progress;
      path.style.strokeDashoffset = String(pathLength - drawnLength);

      const point = path.getPointAtLength(drawnLength);
      const nextPoint = path.getPointAtLength(Math.min(pathLength, drawnLength + 4));
      const deltaX = nextPoint.x - point.x;
      if (Math.abs(deltaX) > 0.5) lastFacing = deltaX < 0 ? -1 : 1;

      // One original line-art character follows the route. The stride is driven by scroll,
      // so the character never keeps walking when the visitor stops.
      const stride = Math.sin(progress * Math.PI * 34) * (reducedMotion.matches ? 0 : 17);
      const mobile = mobileLayout.matches;
      const charScaleX = mobile ? 1.45 : 1;
      walker.setAttribute(
        'transform',
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) scale(${(lastFacing * charScaleX).toFixed(2)} 1)`
      );

      legBack?.setAttribute('transform', `rotate(${stride.toFixed(1)} -9 -35)`);
      legFront?.setAttribute('transform', `rotate(${(-stride).toFixed(1)} 8 -35)`);
      armBack?.setAttribute('transform', `rotate(${(-stride * 0.7).toFixed(1)} -13 -69)`);
      armFront?.setAttribute('transform', `rotate(${(stride * 0.7).toFixed(1)} 12 -68)`);

      // Milestones sit exactly on the route, not at approximate hard-coded positions.
      [0.22, 0.58, 0.9].forEach((fraction, index) => {
        const markerPoint = path.getPointAtLength(pathLength * fraction);
        pins[index]?.setAttribute('transform', `translate(${markerPoint.x.toFixed(2)} ${markerPoint.y.toFixed(2)})`);
      });

      updateSceneStates(progress);
      framePending = false;
    });
  };

  applyArtLayout();
  updateProcessStory();

  window.addEventListener('scroll', updateProcessStory, { passive: true });
  window.addEventListener('resize', () => {
    applyArtLayout();
    updateProcessStory();
  }, { passive: true });

  mobileLayout.addEventListener?.('change', () => {
    applyArtLayout();
    updateProcessStory();
  });

  reducedMotion.addEventListener?.('change', updateProcessStory);

  if ('ResizeObserver' in window) {
    const mapObserver = new ResizeObserver(updateProcessStory);
    mapObserver.observe(map);
  }

  window.addEventListener('load', updateProcessStory, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProcessStory, { once: true });
} else {
  initializeProcessStory();
}
