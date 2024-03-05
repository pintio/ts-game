import Platform from "../controllers/Platform";

type RootElement = HTMLDivElement | HTMLElement;

export default class RenderEngine {
  private rootElement: RootElement;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private platform!: Platform;

  constructor(rootElement: RootElement, platform: Platform) {
    this.rootElement = rootElement;
    this.platform = platform;
  }

  private createCanvas(height: number, width: number) {
    if (this.canvas) {
      return this.canvas;
    }
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    this.canvas = canvas;
    return this.canvas;
  }

  private getContext(): CanvasRenderingContext2D {
    if (!this.context) {
      this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    return this.context;
  }

  public renderCanvas() {
    const { height, width } = this.platform;
    const canvas = this.createCanvas(height, width);
    const ctx = this.getContext();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(
      new Date().getMilliseconds().toString(),
      canvas.height / 2,
      canvas.width / 2
    );
    this.rootElement.appendChild(canvas);
  }
}
