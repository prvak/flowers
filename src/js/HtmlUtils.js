const HtmlUtils = {
  now() {
    return Date.now();
  },

  isLocalStorageSupported() {
    return window.localStorage !== null;
  },

  setToLocalStorage(key, value) {
    window.localStorage.setItem(key, value);
  },

  getFromLocalStorage(key) {
    return window.localStorage.getItem(key);
  },

  getWindowSize() {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName("body")[0];
    const width = w.innerWidth || e.clientWidth || g.clientWidth;
    const height = w.innerHeight || e.clientHeight || g.clientHeight;
    return { width, height };
  },
};

export default HtmlUtils;
