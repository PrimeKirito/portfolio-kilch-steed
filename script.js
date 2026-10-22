const projectContent = {
  sacerdoce: {
    title: "Sacerdoce Royal — identité visuelle",
    description: "Conception d’une charte graphique pour Sacerdoce Royal. Le document présente notamment le logotype, ses variantes, la palette chromatique, la typographie et des exemples d’application. L’aperçu public montre une seule application de l’identité.",
    role: "Designer identifié sur la charte graphique : conception de l’identité visuelle et formalisation de ses règles d’usage.",
    next: "L’aperçu ne donne pas accès à la charte complète. D’autres applications seront ajoutées au fil de la sélection."
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
    next: "Une diapositive sélectionnée est présentée ; le support complet n’est pas publié."
  }
};

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
