import Platform from "../controllers/Platform";
import Sprite from "./Sprite";

export type RootElement = HTMLDivElement | HTMLElement;

export default class RenderEngine {
  private rootElement: RootElement;
  private canvas!: HTMLCanvasElement;
  private canvasCtx!: CanvasRenderingContext2D;
  private platform!: Platform;

  private sprites?: Sprite[];
  private spritesLoaded: boolean = false;

  constructor(rootElement: RootElement, platform: Platform) {
    this.rootElement = rootElement;
    this.platform = platform;
  }

  private getCanvas(height: number, width: number) {
    if (this.canvas) {
      return this.canvas;
    }
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    this.canvas = canvas;
    this.rootElement.appendChild(canvas);
    return this.canvas;
  }

  private getContext(): CanvasRenderingContext2D {
    if (!this.canvasCtx) {
      this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    return this.canvasCtx;
  }

  public addSprite(sprite: Sprite) {
    if (!this.sprites) {
      this.sprites = [sprite];
      return;
    }
    this.sprites = [...this.sprites, sprite];
  }

  public addSprites(sprites: Sprite[]): void {
    sprites[0].onLoad = () => {};
    if (!this.sprites) {
      this.sprites = sprites;
      return;
    }
    this.sprites = [...this.sprites, ...sprites];
  }

  private loadSprites(start = 0, callback = () => {}) {
    if (this.spritesLoaded) {
      callback();
      return;
    }

    try {
      this.sprites?.every((sprite, idx) => {
        if (idx < start) return true;
        if (!sprite.loaded) {
          this.spritesLoaded = false;
          sprite.onLoad = () => {
            this.loadSprites(idx, callback);
          };
          return false;
        }
        if (idx + 1 === this.sprites?.length) {
          this.spritesLoaded = true;
          callback();
        }
        return true;
      });
    } catch (err) {
      throw new Error("Error while loading sprites");
    }
  }

  private _renderCanvas() {
    const { height, width } = this.platform;
    const canvas = this.getCanvas(height, width);
    const ctx = this.getContext();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(
      new Date().getMilliseconds().toString(),
      canvas.height / 2,
      canvas.width / 2
    );
    this.sprites?.forEach((sprite) => sprite.render(ctx));
  }

  public renderCanvas() {
    if (!this.spritesLoaded) {
      this.loadSprites(0, () => {
        this._renderCanvas();
      });
      return;
    }
    this._renderCanvas();
  }
}
