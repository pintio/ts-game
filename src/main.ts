import { KeyboardController } from "./controllers/KeyboardController";
import Platform from "./controllers/Platform";
import Game from "./game";
import RenderEngine from "./view/RenderEngine";
import Sprite from "./view/Sprite";
import SpriteManager from "./view/SpriteManager";

const bgImgPath = "./images/sprites/bg-layers/";

const keyboardController = new KeyboardController();

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

const sprites: Sprite[] = bgImgArr.map((bgImg, idx) => {
  const sprite = new Sprite(bgImgPath + bgImg, {
    dWidth: 800,
    dHeight: 400,
  });
  sprite.velocity = ((idx || 1) ^ 1.2) / bgImgArr.length;
  return sprite;
});

const spriteManager = new SpriteManager();

sprites.forEach((sprite, idx) => {
  spriteManager.add("bg " + idx, sprite);
  sprite.create();
});

// spriteManager.forEach((sprite, name) => {

keyboardController.on("forward", () => {
  spriteManager.forEach((sprite, name) => {
    if (name.includes("bg")) {
      sprite.moveDirection = "left";
      sprite.move();
    }
  });
});

keyboardController.on("reverse", () => {
  spriteManager.forEach((sprite, name) => {
    if (name.includes("bg")) {
      sprite.moveDirection = "right";
      sprite.move();
    }
  });
});
// });

const div = document.getElementById("app") as HTMLElement;

const re = new RenderEngine(div, platform);
re.spriteManager = spriteManager;
new Game(re);
