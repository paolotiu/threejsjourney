import router from "./router";
import "./style.css";
import { main } from "./basic";
import { transform } from "./transform";
import { animation } from "./animation";
import { camera } from "./camera";
import { resize } from "./resize";
import { geometry } from "./geometry";
import { debug } from "./debug";
import { textures } from "./textures";
import { materials } from "./materials";

router.on("/basic", main);
router.on("/transform", transform);
router.on("/animation", animation);
router.on("/camera", camera);
router.on("/resize", resize);
router.on("/geometry", geometry);
router.on("/debug", debug);
router.on("/textures", textures);
router.on("/materials", materials);

router.run();

router.createAnchors();
router.transformAnchors();
