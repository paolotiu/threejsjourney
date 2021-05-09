const router = (() => {
  let map: { [key: string]: () => any | undefined } = {};
  const on = (path: string, cb: () => void) => {
    map = { ...map, [path]: cb };
  };

  const run = () => {
    if (typeof map.cleanup === "function") {
      map.cleanup();
    }
    const path = location.pathname;
    const toRun = map[path];
    if (toRun) {
      const cleanup = toRun();
      map.cleanup = cleanup;
    }
  };

  const push = (path: string) => {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const createAnchors = () => {
    Object.keys(map).forEach((key) => {
      const a = document.createElement("a");
      a.href = key;
      a.innerText = key;
      document.body.appendChild(a);
    });
  };

  const transformAnchors = () => {
    document.querySelectorAll("a").forEach((a) => {
      const path = a.href;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        router.push(path);
      });
    });
  };
  return { on, run, push, transformAnchors, createAnchors };
})();

window.addEventListener("popstate", router.run);

export default router;
