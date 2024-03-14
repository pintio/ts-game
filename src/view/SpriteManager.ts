import Sprite from "./Sprite";

type SpriteMap = Map<string, Sprite>;

export default class SpriteManager {
  private sprites: SpriteMap;
  private spritesLoaded = false;

  constructor(sprites?: SpriteMap | [string, Sprite][]) {
    if (sprites) {
      this.sprites = new Map([...sprites]);
    } else {
      this.sprites = new Map();
    }
  }

  public add(name: string, sprite: Sprite) {
    this.sprites.set(name, sprite);
  }

  public get(name: string) {
    return this.sprites.get(name);
  }

  [Symbol.iterator]() {
    const arrOfKeys = Array.from(this.sprites.keys());
    let idx = 0;
    const max = arrOfKeys.length;

    // for (let i of this.sprites) {
    //   yield i[1];
    // }
    return {
      next: () => {
        return {
          done: !(idx < max),
          value: this.sprites.get(arrOfKeys[idx++]) as Sprite,
        };
      },
    };
  }

  public forEach(callback: (sprite: Sprite, name: string) => void) {
    this.sprites.forEach((sprite, name) => callback(sprite, name));
  }

  public loadSprites(callback: () => void) {
    if (this.spritesLoaded) {
      callback();
      return;
    }

    let idx = 0;
    for (let [_, sprite] of this.sprites) {
      idx++;
      if (sprite.loaded) {
        console.log("55555555555555 ", sprite);
        if (idx === this.sprites.size) {
          this.spritesLoaded = true;
          callback();
          return;
        }
        continue;
      }
      sprite.onLoad = () => {
        this.loadSprites(callback);
      };
      break;
    }
  }
}
