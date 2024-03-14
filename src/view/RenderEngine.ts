import Platform from "../controllers/Platform";
import SpriteManager from "./SpriteManager";

export type RootElement = HTMLDivElement | HTMLElement;

export default class RenderEngine {
  private rootElement: RootElement;
  private canvas!: HTMLCanvasElement;
  private canvasCtx!: CanvasRenderingContext2D;
  private platform!: Platform;

  public spriteManager?: SpriteManager;
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
    this.spriteManager?.forEach((sprite) => sprite.render(ctx));
  }

  public renderCanvas() {
    if (!this.spritesLoaded) {
      this.spriteManager?.loadSprites(() => {
        this._renderCanvas();
      });
      return;
    }
    this._renderCanvas();
  }
}
