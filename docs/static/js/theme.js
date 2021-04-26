(function () {
  const media = "(prefers-color-scheme: dark)";
  const darkQuery = window.matchMedia(media);
  const themeListeners = [];

  const getDefaultTheme = () => {
    let theme = localStorage.getItem("theme");
    if (!theme) return darkQuery.matches ? "dark" : "light";
    return theme;
  };

  const saveTheme = () => {
    localStorage.setItem("theme", window.__theme);
  };

  const setTheme = (theme = window.__theme, notify = true) => {
    saveTheme();
    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
    if (notify) emitThemeChange(theme);
  };

  const emitThemeChange = (...params) => {
    themeListeners.forEach(listener => {
      listener.func(...params);
    });
  };

  const addThemeListener = (name, func) => {
    const isExists = themeListeners.find(ls => ls.name === name);
    if (isExists) return;
    themeListeners.push({ name, func });
  };

  window.__theme = getDefaultTheme();
  window.__listenThemeChange = addThemeListener;

  window.__toggleTheme = () => {
    const currTheme = window.__theme;
    window.__theme = currTheme == "dark" ? "light" : "dark";
    saveTheme();
    document.documentElement.classList.replace(currTheme, window.__theme);
    emitThemeChange(window.__theme);
  };

  darkQuery.addEventListener("change", () => {
    const theme = darkQuery.matches ? "dark" : "light";
    setTheme(theme);
  });

  setTheme();
  addThemeListener("watch", theme => {
    setTheme(theme, false);
  });

  document.addEventListener("click", ({ target }) => {
    if (target.tagName !== "PRE") return;
    target.classList.add("copied");
    const el = document.createElement("textarea");
    el.value = target.outerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setTimeout(() => {
      target.classList.remove("copied");
    }, 1000);
  });
})();
