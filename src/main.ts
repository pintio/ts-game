import Platform from "./controllers/Platform";
import Game from "./game";
import RenderEngine from "./view/RenderEngine";
import Sprite from "./view/Sprite";

const bgImgPath = "./images/sprites/bg-layers/";

const bgImgArr = [
  "a11.png",
  "a10.png",
  "a9.png",
  "a8.png",
  "a7.png",
  "a6.png",
  "a5.png",
  "a4.png",
  "a3.png",
  "a2.png",
  "a1.png",
  "a0.png",
];

const sprites: Sprite[] = bgImgArr.map((bgImg) => {
  return new Sprite(
    bgImgPath + bgImg,
    window.innerHeight / 2,
    window.innerWidth / 1.5
  );
});

sprites.forEach((sprite) => {
  sprite.create();
});

// bgSprite.onLoad = (ev) => {
//   console.log("ONLOAD LOGGER", ev);
//   console.log("bgSprite.loaded after", bgSprite.loaded);
// };
// bgSprite.onLoad = () => {
//   div.appendChild(bgSprite.image);
// };

const div = document.getElementById("app") as HTMLElement;
const platform = new Platform(window.innerHeight / 2, window.innerWidth);

const re = new RenderEngine(div, platform);
re.addSprites(sprites);
new Game(re);
