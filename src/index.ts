import router from "./router";

import { main } from "./basic";
import { transform } from "./transform";
import { animation } from "./animation";
import { camera } from "./camera";

router.on("/basic", main);
router.on("/transform", transform);
router.on("/animation", animation);
router.on("/camera", camera);

router.createAnchors();
router.run();
router.transformAnchors();
