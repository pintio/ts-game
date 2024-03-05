import Platform from "./controllers/Platform";
import Game from "./game";
import RenderEngine from "./view/RenderEngine";

const div = document.getElementById("app") as HTMLElement;
const platform = new Platform(300, 500);

const re = new RenderEngine(div, platform);
new Game(re);
