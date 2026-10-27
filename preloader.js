(() => {
  const motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (motionPreference?.matches) return;

  const root = document.documentElement;
  root.classList.add("is-loading");

  const startLoader = () => {
    const loader = document.querySelector("[data-entry-loader]");
    if (!loader) {
      root.classList.remove("is-loading");
      return;
    }

    loader.hidden = false;
    const number = loader.querySelector("[data-entry-number]");
    const fill = loader.querySelector("[data-entry-fill]");
    const progressbar = loader.querySelector('[role="progressbar"]');
    const status = loader.querySelector("[data-entry-status]");
    const pageElements = Array.from(document.body.children)
      .filter((element) => element !== loader)
      .map((element) => ({ element, inert: element.inert }));

    pageElements.forEach(({ element }) => { element.inert = true; });

    const beganAt = performance.now();
    const minimumDuration = 1600;
    let ready = document.readyState === "complete";
    let progress = 0;
    let finished = false;

    const renderProgress = (value) => {
      progress = Math.max(progress, Math.min(100, Math.floor(value)));
      if (number) number.textContent = String(progress);
      if (fill) fill.style.transform = `scaleX(${progress / 100})`;
      if (progressbar) progressbar.setAttribute("aria-valuenow", String(progress));
    };

    const finish = () => {
      if (finished || !ready || performance.now() - beganAt < minimumDuration) return;
      finished = true;
      renderProgress(100);
      loader.classList.add("is-complete");
      if (status) status.textContent = "Le portfolio est prêt.";

      window.setTimeout(() => {
        loader.classList.add("is-leaving");
        window.setTimeout(() => {
          loader.hidden = true;
          loader.setAttribute("aria-hidden", "true");
          root.classList.remove("is-loading");
          pageElements.forEach(({ element, inert }) => { element.inert = inert; });
        }, 650);
      }, 180);
    };

    const animate = (now) => {
      if (finished) return;
      const elapsed = now - beganAt;
      const eased = Math.min(92, (elapsed / minimumDuration) * 92);
      renderProgress(eased);
      finish();
      if (!finished) window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
    window.addEventListener("load", () => { ready = true; finish(); }, { once: true });
    window.setTimeout(() => { ready = true; finish(); }, 3500);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoader, { once: true });
  } else {
    startLoader();
  }
})();