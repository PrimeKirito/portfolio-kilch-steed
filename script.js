const projectContent = {
  sacerdoce: {
    title: "Sacerdoce Royal — identité visuelle",
    description: "Extrait de la **charte graphique de Sacerdoce Royal**, conçue et réalisée par mes soins en 2026. Le document complet ne pouvant être téléchargé, cet aperçu présente une sélection de ses éléments visuels.",
    role: "Designer identifié sur la charte graphique : conception de l’identité visuelle et formalisation de ses règles d’usage.",
    next: "La galerie rassemble six visuels sélectionnés. La charte complète n’est pas publiée sur ce site."
  },
  magik: {
    title: "Magik Opti’k — charte graphique",
    description: "Une charte graphique pour une marque de magasin d’optique, autour d’un logotype qui associe la lettre M à une paire de lunettes. Le document présente également les variantes, les couleurs, la typographie et des applications de la marque.",
    role: "Conception graphique et formalisation d’un système d’identité visuelle.",
    next: "L’aperçu présente seulement une sélection d’applications, sans publier la charte complète."
  },
  codev: {
    title: "CODEV — Métropole du Grand Paris",
    description: "Dans le cadre de sa mission auprès du CODEV de la Métropole du Grand Paris, l’agence 893° a cadré la production d’une série de quatre vidéos de témoignage. Le document de travail décrit la préparation éditoriale, l’organisation des tournages et la post-production ; ces éléments internes ne sont pas reproduits ici.",
    role: "Pilotage d’une production audiovisuelle pendant mon stage de fin d’études à l’agence 893°, conformément à mon CV.",
    next: "Cette fiche montre uniquement la couverture du document de cadrage. Les calendriers, plannings et détails opérationnels restent privés."
  },
  plaine: {
    title: "Plaine Commune — rapport institutionnel",
    description: "Participation à la production éditoriale et à la mise en page d’un rapport institutionnel consacré aux actes d’une journée d’échanges sur la clause sociale et l’achat responsable. L’aperçu retenu est un extrait infographique, plutôt que le rapport intégral.",
    role: "Production éditoriale et mise en page, selon l’expérience présentée dans mon CV.",
    next: "Le rapport complet n’est pas disponible au téléchargement. Seul un extrait visuel est présenté dans ce portfolio."
  },
  scuio: {
    title: "SCUIO-IP — guide sur l’IA générative",
    description: "Conception d’un guide pour accompagner les agents du SCUIO-IP de l’Université Paris 8 dans l’usage réfléchi de l’IA générative pour la recherche d’emploi. Le support traite notamment de l’amélioration du CV, des lettres de motivation et de la préparation aux entretiens.",
    role: "Chef de projet et contribution à la conception et à la rédaction au sein de l’agence 893°, en collaboration avec Narcisse N’OUEMOU et l’équipe.",
    next: "Seule la couverture est présentée. Le guide complet n’est pas publié sur ce site."
  },
  lundi: {
    title: "Atelier IA",
    description: "Aperçu du support de l’atelier **« Mieux utiliser l’IA pour sa recherche de stage ou d’alternance »**, destiné aux étudiants de l’Université Paris 8. Il présente les objectifs pédagogiques, la méthode C.O.R.E. et les clés d’un usage réfléchi de l’IA.\n**Animation :** Kilch Steed EYEGHE, chef de projet chez 893°, et Narcisse N’OUEMOU, consultant en Learning IA.",
    role: "Co-animation et contribution à la conception du support avec Narcisse N’OUEMOU au sein de l’agence 893°.",
    next: "Trois médias sélectionnés sont présentés ; le support complet n’est pas publié."
  },
  nano: {
    title: "NaNo Ring — bague connectée multifonctionnelle",
    description: "NaNo Ring est un projet de bague connectée multifonctionnelle qui réunit trois usages complémentaires : le paiement, le suivi santé et la gestion quotidienne. Les médias présentent une sélection du projet et de ses interfaces.",
    role: "Chef de projet — pilotage du projet NaNo Ring et mise en cohérence des usages présentés autour du paiement, du suivi santé et de l’organisation quotidienne.",
    next: "Cette galerie rassemble sept médias nommés NaNo App. Elle présente un aperçu du projet, sans constituer une validation médicale ni une promesse de performance."
  },
  agency: {
    title: "893° — créations et communication d’agence",
    description: "Une sélection de médias dédiés à 893°, l’agence de communication et d’innovation numérique. Cette galerie distingue les supports liés à la vie et à la communication de l’agence des projets réalisés pour ses clients.",
    role: "Contribution au développement, à la coordination et à la communication de l’agence 893°.",
    next: "Quatre médias de l’agence sont présentés dans cette sélection."
  },
  autres: {
    title: "Autres créations — sélection complémentaire",
    description: "Une galerie complémentaire destinée à présenter d’autres créations graphiques et explorations visuelles qui ne relèvent pas des projets détaillés dans les autres fiches.",
    role: "Sélection de créations complémentaires.",
    next: "Trois visuels sont présentés dans cette galerie. Les médias sont montrés comme une sélection et non comme un projet client unique."
  }
};

// Enforce the portfolio order at runtime as a safeguard against stale markup.
const preferredProjectOrder = [
  "codev",
  "plaine",
  "nano",
  "lundi",
  "sacerdoce",
  "agency",
  "scuio",
  "magik",
  "autres"
];
const projectGrid = document.querySelector(".project-grid");
if (projectGrid) {
  const cardsInGrid = Array.from(projectGrid.querySelectorAll(".project-card"));
  cardsInGrid.sort((a, b) => {
    const aId = a.querySelector("[data-gallery]")?.dataset.gallery;
    const bId = b.querySelector("[data-gallery]")?.dataset.gallery;
    const aIndex = preferredProjectOrder.indexOf(aId);
    const bIndex = preferredProjectOrder.indexOf(bId);
    return (aIndex < 0 ? preferredProjectOrder.length : aIndex) -
      (bIndex < 0 ? preferredProjectOrder.length : bIndex);
  });
  cardsInGrid.forEach((card) => projectGrid.appendChild(card));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      card.hidden = selected !== "all" && !categories.includes(selected);
    });
  });
});


const galleryImages = {
  nano: [
    { src: "assets/NaNo%20App01.png", alt: "NaNo Ring — média de présentation, visuel 1" },
    { src: "assets/NaNo%20App02.png", alt: "NaNo Ring — média de présentation, visuel 2" },
    { src: "assets/NaNo%20App03.png", alt: "NaNo Ring — média de présentation, visuel 3" },
    { src: "assets/NaNo%20App04.png", alt: "NaNo Ring — média de présentation, visuel 4" },
    { src: "assets/NaNo%20App06.png", alt: "NaNo Ring — média de présentation, visuel 5" },
    { src: "assets/NaNo%20App07.png", alt: "NaNo Ring — média de présentation, visuel 6" },
    { src: "assets/NaNo%20App08.png", alt: "NaNo Ring — média de présentation, visuel 7" }
  ],
  lundi: [
    { src: "assets/atelier-lundi-pro01.PNG", alt: "Atelier IA pour la recherche de stage, visuel 1" },
    { src: "assets/atelier-lundi-pro02.PNG", alt: "Atelier IA pour la recherche de stage, visuel 2" },
    { src: "assets/atelier-lundi-pro03.PNG", alt: "Atelier IA pour la recherche de stage, visuel 3" }
  ],
  codev: [
    { src: "assets/codev-grand-paris01.png", alt: "CODEV Grand Paris — document de cadrage, visuel 1" },
    { src: "assets/codev-grand-paris02.png", alt: "CODEV Grand Paris — document de cadrage, visuel 2" },
    { src: "assets/codev-grand-paris03.png", alt: "CODEV Grand Paris — document de cadrage, visuel 3" },
    { src: "assets/codev-grand-paris04.png", alt: "CODEV Grand Paris — document de cadrage, visuel 4" }
  ],
  scuio: [
    { src: "assets/guide-scuio-ip01.png", alt: "SCUIO-IP — guide sur l’IA générative, visuel 1" },
    { src: "assets/guide-scuio-ip02.png", alt: "SCUIO-IP — guide sur l’IA générative, visuel 2" }
  ],
  plaine: [
    { src: "assets/plaine-commune01.png", alt: "Plaine Commune — extrait du rapport institutionnel, visuel 1" },
    { src: "assets/plaine-commune02.png", alt: "Plaine Commune — extrait du rapport institutionnel, visuel 2" }
  ],
  sacerdoce: [
    { src: "assets/sacerdoce-royal01.png", alt: "Sacerdoce Royal — identité visuelle, visuel 1" },
    { src: "assets/sacerdoce-royal02.png", alt: "Sacerdoce Royal — identité visuelle, visuel 2" },
    { src: "assets/sacerdoce-royal03.png", alt: "Sacerdoce Royal — identité visuelle, visuel 3" },
    { src: "assets/sacerdoce-royal04.png", alt: "Sacerdoce Royal — identité visuelle, visuel 4" },
    { src: "assets/sacerdoce-royal05.png", alt: "Sacerdoce Royal — identité visuelle, visuel 5" },
    { src: "assets/sacerdoce-royal06.png", alt: "Sacerdoce Royal — identité visuelle, visuel 6" }
  ],
  magik: [
    { src: "assets/magik-optik01.png", alt: "Magik Opti’k — identité de marque, visuel 1" },
    { src: "assets/magik-optik02.png", alt: "Magik Opti’k — identité de marque, visuel 2" }
  ],
  agency: [
    { src: "assets/893%C2%B0%2001.png", alt: "893° — communication d’agence, visuel 1" },
    { src: "assets/893%20%C2%B0%2002.png", alt: "893° — communication d’agence, visuel 2" },
    { src: "assets/893%20%C2%B0%2003.png", alt: "893° — communication d’agence, visuel 3" },
    { src: "assets/893%20%C2%B0%2004.png", alt: "893° — communication d’agence, visuel 4" }
  ],
  autres: [
    { src: "assets/Autres01.png", alt: "Autres créations — visuel 1" },
    { src: "assets/Autres02.png", alt: "Autres créations — visuel 2" },
    { src: "assets/Autres03.png", alt: "Autres créations — visuel 3" }
  ]
};

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const images = galleryImages[gallery.dataset.gallery];
  const imageElement = gallery.querySelector(".gallery-image");
  const counter = gallery.querySelector(".gallery-counter");
  const previousButton = gallery.querySelector("[data-gallery-prev]");
  const nextButton = gallery.querySelector("[data-gallery-next]");

  if (!images || images.length < 2 || !imageElement || !counter || !previousButton || !nextButton) return;

  let currentIndex = 0;
  let isLoading = false;
  let touchStartX = null;

  const showImage = (requestedIndex, direction = 1) => {
    if (isLoading) return;
    const nextIndex = (requestedIndex + images.length) % images.length;
    if (nextIndex === currentIndex) return;

    isLoading = true;
    const selectedImage = images[nextIndex];
    const preload = new Image();

    preload.onload = () => {
      gallery.style.setProperty("--slide-offset", direction > 0 ? "1.1rem" : "-1.1rem");
      imageElement.classList.add("is-changing");
      imageElement.src = selectedImage.src;
      imageElement.alt = selectedImage.alt;
      currentIndex = nextIndex;
      counter.textContent = String(currentIndex + 1) + " / " + String(images.length);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          imageElement.classList.remove("is-changing");
          isLoading = false;
        });
      });
    };

    preload.onerror = () => {
      counter.textContent = "Image indisponible";
      isLoading = false;
    };
    preload.src = selectedImage.src;
  };

  previousButton.addEventListener("click", () => showImage(currentIndex - 1, -1));
  nextButton.addEventListener("click", () => showImage(currentIndex + 1, 1));

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(currentIndex - 1, -1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1, 1);
  });

  gallery.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  gallery.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 45) return;
    showImage(currentIndex + (distance < 0 ? 1 : -1), distance < 0 ? 1 : -1);
  }, { passive: true });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector("span").textContent = isOpen ? "−" : "＋";
    navigation.classList.toggle("is-open", isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector("span").textContent = "＋";
      navigation.classList.remove("is-open");
    });
  });
}

const dialog = document.querySelector(".project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogRole = document.querySelector("#dialog-role");
const dialogNext = document.querySelector("#dialog-next");

function renderRichText(element, source) {
  element.replaceChildren();
  String(source).split("\n").forEach((line, lineIndex) => {
    if (lineIndex > 0) element.appendChild(document.createElement("br"));
    line.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
      if (!part) return;
      if (part.startsWith("**") && part.endsWith("**")) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(2, -2);
        element.appendChild(strong);
      } else {
        element.appendChild(document.createTextNode(part));
      }
    });
  });
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectContent[button.dataset.project];
    if (!project || !dialog) return;
    dialogTitle.textContent = project.title;
    renderRichText(dialogDescription, project.description);
    dialogRole.textContent = project.role;
    dialogNext.textContent = project.next;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

// Keep the top navigation in sync with the section currently being viewed.
const navLinks = Array.from(document.querySelectorAll("#navigation a"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setCurrentNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === "#" + sectionId;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (targetId) setCurrentNavLink(targetId);
  });
});

if ("IntersectionObserver" in window && navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visibleSections[0]) setCurrentNavLink(visibleSections[0].target.id);
  }, { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.15, 0.35, 0.6] });

  navSections.forEach((section) => navObserver.observe(section));
}



// Lightweight UseAnimations icon adapter for the simple path + translate JSON exports.
// Keeps the animation JSON local; no third-party player or remote script is loaded.
// The gallery chevrons stay static by design: without JSON files, their original ← / → text remains visible.
const animationFiles = {
  "arrow-down-right": "assets/animations/arrow-down-right.json"
};

const animationDataCache = new Map();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function toSvgPath(shape) {
  const geometry = shape?.ks?.k;
  if (!geometry || !Array.isArray(geometry.v) || !geometry.v.length) return "";
  const vertices = geometry.v;
  const incoming = geometry.i || vertices.map(() => [0, 0]);
  const outgoing = geometry.o || vertices.map(() => [0, 0]);
  const isStraight = vertices.every((_, index) =>
    (incoming[index] || [0, 0]).every(value => value === 0) &&
    (outgoing[index] || [0, 0]).every(value => value === 0)
  );
  const command = (point) => `${Number(point[0].toFixed(3))} ${Number(point[1].toFixed(3))}`;
  let path = "M " + command(vertices[0]);
  for (let index = 1; index < vertices.length; index += 1) {
    if (isStraight) {
      path += " L " + command(vertices[index]);
    } else {
      const previous = vertices[index - 1];
      const next = vertices[index];
      const out = outgoing[index - 1] || [0, 0];
      const incomingPoint = incoming[index] || [0, 0];
      path += " C " + command([previous[0] + out[0], previous[1] + out[1]]) +
        " " + command([next[0] + incomingPoint[0], next[1] + incomingPoint[1]]) +
        " " + command(next);
    }
  }
  if (geometry.c) path += " Z";
  return path;
}

function collectShapeItems(shapes, type, results = []) {
  (shapes || []).forEach(shape => {
    if (shape.ty === type) results.push(shape);
    if (Array.isArray(shape.it)) collectShapeItems(shape.it, type, results);
    if (Array.isArray(shape.shapes)) collectShapeItems(shape.shapes, type, results);
  });
  return results;
}

function animationPosition(keyframe, fallback) {
  const value = keyframe?.s;
  if (Array.isArray(value) && Array.isArray(value[0])) return value[0];
  if (Array.isArray(value)) return value;
  return fallback;
}

function createAnimatedSvg(data, iconName) {
  const ns = "http://www.w3.org/2000/svg";
  const layer = (data.layers || []).find(item => item.ty === 4 && Array.isArray(item.shapes));
  if (!layer) throw new Error("Aucune couche vectorielle prise en charge pour " + iconName);

  const anchorValue = layer.ks?.a?.k;
  const anchor = Array.isArray(anchorValue) ? anchorValue : [0, 0, 0];
  const position = layer.ks?.p;
  const positionKeys = position?.a === 1 && Array.isArray(position.k)
    ? position.k
    : [];
  const firstPosition = animationPosition(positionKeys[0], Array.isArray(position?.k) ? position.k : [16, 16, 0]);
  const base = [Number(firstPosition[0] ?? 16), Number(firstPosition[1] ?? 16)];
  const durationFrames = Math.max(1, Number(data.op || 36) - Number(data.ip || 0));
  const frameRate = Math.max(1, Number(data.fr || 30));
  const animationDuration = durationFrames / frameRate;
  const pathShapes = collectShapeItems(layer.shapes, "sh");
  if (!pathShapes.length) throw new Error("Aucun tracé vectoriel exploitable pour " + iconName);
  const strokeShape = collectShapeItems(layer.shapes, "st")[0];
  const strokeWidth = Number(strokeShape?.w || 2);

  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${Number(data.w || 32)} ${Number(data.h || 32)}`);
  svg.setAttribute("width", "1em");
  svg.setAttribute("height", "1em");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("useanimation-svg", "useanimation-" + iconName);

  const group = document.createElementNS(ns, "g");
  group.setAttribute("transform", `translate(${base[0] - Number(anchor[0] || 0)} ${base[1] - Number(anchor[1] || 0)})`);

  pathShapes.forEach(shape => {
    const pathData = toSvgPath(shape);
    if (!pathData) return;
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", String(strokeWidth));
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    group.appendChild(path);
  });

  if (!reducedMotion.matches && positionKeys.length > 1) {
    const translateAnimation = document.createElementNS(ns, "animateTransform");
    translateAnimation.setAttribute("attributeName", "transform");
    translateAnimation.setAttribute("type", "translate");
    translateAnimation.setAttribute("dur", animationDuration + "s");
    translateAnimation.setAttribute("begin", "indefinite");
    translateAnimation.setAttribute("fill", "freeze");
    translateAnimation.setAttribute("calcMode", "linear");

    const keyTimes = [];
    const values = [];
    positionKeys.forEach((keyframe) => {
      const frame = Number(keyframe.t ?? 0) - Number(data.ip || 0);
      if (frame < 0 || frame > durationFrames) return;
      const time = Math.max(0, Math.min(1, frame / durationFrames));
      const pos = animationPosition(keyframe, base);
      if (!Array.isArray(pos)) return;
      keyTimes.push(time.toFixed(5));
      values.push(`${Number(pos[0] ?? base[0]) - Number(anchor[0] || 0)} ${Number(pos[1] ?? base[1]) - Number(anchor[1] || 0)}`);
    });

    if (keyTimes.length && Number(keyTimes[keyTimes.length - 1]) < 1) {
      keyTimes.push("1");
      const lastValue = values[values.length - 1];
      values.push(lastValue);
    }

    const pairs = keyTimes.map((time, index) => ({ time: Number(time), value: values[index] }))
      .filter((item, index, all) => index === 0 || item.time > all[index - 1].time);
    if (pairs.length > 1) {
      translateAnimation.setAttribute("keyTimes", pairs.map(pair => pair.time.toFixed(5)).join(";"));
      translateAnimation.setAttribute("values", pairs.map(pair => pair.value).join(";"));
      group.appendChild(translateAnimation);
    }
  }

  svg.appendChild(group);
  return svg;
}

async function loadUseAnimation(iconElement) {
  const animationName = iconElement.dataset.animation;
  const path = animationFiles[animationName];
  if (!path) return;

  try {
    let promise = animationDataCache.get(path);
    if (!promise) {
      promise = fetch(path + "?v=icons-visible-20261023").then(response => {
        if (!response.ok) throw new Error("Chargement impossible : " + path);
        return response.json();
      });
      animationDataCache.set(path, promise);
    }

    const data = await promise;
    const svg = createAnimatedSvg(data, animationName);
    iconElement.replaceChildren(svg);
    iconElement.dataset.animationReady = "true";

    const play = () => {
      const animation = svg.querySelector("animateTransform");
      if (!animation || reducedMotion.matches) return;
      try {
        animation.beginElement();
      } catch (_) {
        // The static vector still remains usable if SMIL is unavailable.
      }
    };

    const trigger = iconElement.closest("a, button") || iconElement;
    if (animationName === "arrow-down-right") {
      trigger.addEventListener("pointerenter", play);
      trigger.addEventListener("focus", play);
      trigger.addEventListener("click", play);
    } else {
      trigger.addEventListener("click", play);
      trigger.addEventListener("pointerenter", play);
      trigger.addEventListener("focus", play);
    }
  } catch (error) {
    // Preserve the original text arrow as a fallback; don't interrupt navigation.
    console.warn("UseAnimations :", error);
  }
}

document.querySelectorAll(".animated-icon[data-animation]").forEach(icon => {
  loadUseAnimation(icon);
});

if (reducedMotion.addEventListener) {
  reducedMotion.addEventListener("change", () => {
    // Reloading the page is not required for navigation; the fallback remains safe.
    document.querySelectorAll(".useanimation-svg animateTransform").forEach(animation => {
      if (reducedMotion.matches) animation.remove();
    });
  });
}


// Cloudflare Web Analytics stays inert until the visitor explicitly opts in.
const analyticsStorageKey="portfolio-analytics-choice";
const analyticsPanel=document.querySelector("#analytics-choice");
const analyticsTemplate=document.querySelector("#cloudflare-analytics-template");
function getAnalyticsChoice(){
  try{return localStorage.getItem(analyticsStorageKey)}catch(_){return null}
}
function loadCloudflareAnalytics(force=false){
  if((!force&&getAnalyticsChoice()!=="accepted")||document.querySelector("[data-cf-beacon]"))return;
  const source=analyticsTemplate?.content.querySelector("script");
  if(!source)return;
  const beacon=document.createElement("script");beacon.type=source.type;beacon.src=source.src;
  beacon.setAttribute("data-cf-beacon",source.getAttribute("data-cf-beacon"));document.head.append(beacon);
}
function showAnalyticsPreferences(focusFirst=true){
  if(!analyticsPanel)return;
  analyticsPanel.hidden=false;
  if(focusFirst)analyticsPanel.querySelector("[data-analytics-choice='refused']")?.focus();
}
window.showAnalyticsPreferences=showAnalyticsPreferences;
const analyticsChoice=getAnalyticsChoice();
if(analyticsChoice==="accepted")loadCloudflareAnalytics();
if(window.location.hash==="#privacy-preferences")showAnalyticsPreferences();
else if(analyticsChoice!=="accepted"&&analyticsChoice!=="refused")showAnalyticsPreferences(false);
document.querySelectorAll("[data-open-analytics-preferences]").forEach(button=>button.addEventListener("click",()=>showAnalyticsPreferences()));
document.querySelectorAll("[data-analytics-choice]").forEach(button=>button.addEventListener("click",()=>{
  const choice=button.dataset.analyticsChoice;
  try{localStorage.setItem(analyticsStorageKey,choice)}catch(_){}
  analyticsPanel.hidden=true;
  if(choice==="accepted")loadCloudflareAnalytics(true);
}));

// Reveal large headings as they enter view, with a visible fallback for reduced motion.
const largeHeadings=[...document.querySelectorAll(".hero h1,main h2,.project-dialog h2")];
if("IntersectionObserver" in window&&!reducedMotion.matches){
  document.documentElement.classList.add("motion-ready");
  largeHeadings[0]?.classList.add("is-visible");
  const headingObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("is-visible");headingObserver.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  largeHeadings.forEach(heading=>headingObserver.observe(heading));
}else largeHeadings.forEach(heading=>heading.classList.add("is-visible"));

const projectCollage=document.querySelector(".project-collage");
if(projectCollage){
  if("IntersectionObserver" in window&&!reducedMotion.matches){
    projectCollage.classList.add("has-entrance");
    const collageObserver=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        projectCollage.classList.add("is-visible");
        collageObserver.disconnect();
      }
    },{threshold:.16});
    collageObserver.observe(projectCollage);
  }else projectCollage.classList.add("is-visible");
}

const nanoEntry=document.querySelector("[data-nano-entry]");
const nanoCard=document.querySelector("#projet-nano");
if(nanoEntry&&nanoCard)nanoEntry.addEventListener("click",()=>{
  nanoCard.classList.remove("is-arriving");
  requestAnimationFrame(()=>nanoCard.classList.add("is-arriving"));
  window.setTimeout(()=>nanoCard.classList.remove("is-arriving"),reducedMotion.matches?0:1400);
});
