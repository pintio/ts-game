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

const platform = new Platform(400, 800);

const sprites: Sprite[] = bgImgArr.map((bgImg) => {
  return new Sprite(bgImgPath + bgImg, {
    dWidth: 800,
    dHeight: 400,
    // sHeight: 700,
    // sWidth: 800,
  });
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

const re = new RenderEngine(div, platform);
re.addSprites(sprites);
new Game(re);
