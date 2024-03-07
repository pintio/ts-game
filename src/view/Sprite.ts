export default class Sprite {
  private _image!: HTMLImageElement;
  private height!: number;
  private width!: number;
  private src!: string;
  private _loaded = false;

  onLoad: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;

  constructor(linkToSprite: string, height: number, width: number) {
    this.src = linkToSprite;
    this.height = height;
    this.width = width;
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  public get loaded(): boolean {
    return this._loaded;
  }

  public create(): void {
    const spriteImg = new Image(this.width, this.height);
    spriteImg.addEventListener("load", () => {
      console.log("ONLOAD FROM CLASS");
      this._loaded = true;
    });
    if (this.onLoad) spriteImg.addEventListener("load", this.onLoad);

    spriteImg.src = this.src;
    this._image = spriteImg;
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this._loaded) {
      this._image.onload = function () {
        ctx.drawImage(this as HTMLImageElement, 0, 0);
      };
      return;
    }
    // console.log("IMAGW", ctx);
    ctx.drawImage(this._image, 0, 0, this._image.width, this._image.height);
  }
}

// "images/sprites/bg-layers/Layer_0005_5.png"
