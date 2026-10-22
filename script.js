const projectContent = {
  sacerdoce: {
    title: "Sacerdoce Royale",
    description: "Une identité visuelle conçue pour rendre une marque immédiatement reconnaissable, avec un système graphique cohérent entre les supports. Cette fiche sera enrichie avec le contexte, les livrables et les visuels validés.",
    role: "Identité visuelle et direction artistique.",
    next: "Brief, démarche créative, déclinaisons et contribution exacte."
  },
  codev: {
    title: "CODEV Métropole du Grand Paris",
    description: "Un projet audiovisuel comprenant plusieurs témoignages, de la préparation éditoriale à la coordination de production et au montage. La présentation finale précisera le périmètre de la mission et les livrables autorisés.",
    role: "Coordination de projet et contribution à la production vidéo.",
    next: "Contexte, rôle détaillé, extraits autorisés et étapes de production."
  },
  plaine: {
    title: "Plaine Commune",
    description: "Un travail de conception éditoriale et de mise en page visant à structurer l'information et à faciliter la lecture d'une publication. Les pages présentées seront ajoutées après validation des droits de diffusion.",
    role: "Design éditorial et mise en page.",
    next: "Document final, contraintes, méthode et captures autorisées."
  },
  strategie: {
    title: "Stratégie & contenus numériques",
    description: "Une sélection de travaux de stratégie de communication, de conception de contenus et d'organisation de production. Les exemples seront remplacés par un cas réel clairement contextualisé.",
    role: "Cadrage, stratégie et conception de contenus selon le projet présenté.",
    next: "Nom du projet, objectifs, public, livrables et résultats vérifiables."
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
