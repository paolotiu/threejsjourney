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
      if (key.charAt(0) !== "/") {
        return;
      }
      const a = document.createElement("a");
      const div = document.querySelector(".links") as HTMLDivElement;
      a.href = key;
      a.innerText = key;
      div.appendChild(a);
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
