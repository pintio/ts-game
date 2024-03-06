import Platform from "./controllers/Platform";
import Game from "./game";
import RenderEngine from "./view/RenderEngine";
import Sprite from "./view/Sprite";

const bgImg = "images/sprites/bg-layers/Layer_0005_5.png";

const bgSprite = new Sprite(bgImg, 300, 500);
// bgSprite.onLoad = (ev) => {
//   console.log("ONLOAD LOGGER", ev);
//   console.log("bgSprite.loaded after", bgSprite.loaded);
// };
bgSprite.create();

const div = document.getElementById("app") as HTMLElement;
const platform = new Platform(300, 500);

const re = new RenderEngine(div, platform);
re.addSprite(bgSprite);
new Game(re);
