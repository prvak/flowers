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

  getRelativeMousePosition(event) {
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let canvasX = 0;
    let canvasY = 0;
    let currentElement = event.currentTarget;
    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);

    canvasX = (event.pageX - totalOffsetX) / event.currentTarget.clientWidth;
    canvasY = (event.pageY - totalOffsetY) / event.currentTarget.clientHeight;

    return { x: canvasX, y: canvasY };
  },

};

export default HtmlUtils;
