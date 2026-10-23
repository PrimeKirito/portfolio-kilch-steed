const projectContent = {
  sacerdoce: {
    title: "Sacerdoce Royal — identité visuelle",
    description: "Conception d’une charte graphique pour Sacerdoce Royal. Le document présente notamment le logotype, ses variantes, la palette chromatique, la typographie et des exemples d’application. La galerie présente six visuels sélectionnés de l’identité.",
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
    title: "Lundi Pro — atelier sur l’IA",
    description: "Support de l’atelier « Mieux utiliser l’IA pour sa recherche de stage ou d’alternance », avec des objectifs pédagogiques, une méthode C.O.R.E. et des repères pour un usage réfléchi des outils. La présentation attribue l’animation à Kelch Steed EYEGHE et Narcisse N’OUEMOU.",
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
    { src: "assets/atelier-lundi-pro01.PNG", alt: "Lundi Pro — atelier IA pour la recherche de stage, visuel 1" },
    { src: "assets/atelier-lundi-pro02.PNG", alt: "Lundi Pro — atelier IA pour la recherche de stage, visuel 2" },
    { src: "assets/atelier-lundi-pro03.PNG", alt: "Lundi Pro — atelier IA pour la recherche de stage, visuel 3" }
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

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectContent[button.dataset.project];
    if (!project || !dialog) return;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
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
