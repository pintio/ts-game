interface SpritePosition {
  sHeight?: number;
  sWidth?: number;
  dHeight?: number;
  dWidth?: number;
}

export default class Sprite {
  private _image!: HTMLImageElement;
  // private height!: number;
  // private width!: number;
  private position!: SpritePosition;
  private offsetPosition!: { x: number; y: number; iterations: number };
  private src!: string;
  private _loaded = false;
  private _velocity: number = 0.5; // should be between 0 and 1, 0 means no velocity [still], 1 means maxSpeed

  onLoad: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;

  constructor(
    linkToSprite: string,
    // height: number,
    // width: number,
    position?: SpritePosition
  ) {
    this.src = linkToSprite;
    // this.height = height;
    // this.width = width;
    if (position) this.position = position;
    this.offsetPosition = { x: 0, y: 0, iterations: 0 };
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  public get loaded(): boolean {
    return this._loaded;
  }

  public set velocity(velocity: number) {
    this._velocity = velocity;
  }

  public create(): void {
    const spriteImg = new Image();
    spriteImg.addEventListener("load", () => {
      this._loaded = true;
    });
    if (this.onLoad) spriteImg.addEventListener("load", this.onLoad);

    spriteImg.src = this.src;
    this._image = spriteImg;
  }

  private getDestinationDimension() {
    const dw = this.position.dHeight
      ? (this.position.dHeight * this._image.width) / this._image.height
      : this._image.width;
    const dh = this.position.dHeight || this._image.height;

    return { dh, dw };
  }

  private draw(ctx: CanvasRenderingContext2D, iteration: number) {
    const { dw, dh } = this.getDestinationDimension();
    ctx.drawImage(
      this._image,
      0,
      0,
      this.position.sWidth || this._image.width,
      this.position.sHeight || this._image.height,
      dw * (iteration - 0.01) + this.offsetPosition.x,
      0 - this.offsetPosition.y,
      dw,
      dh
    );
  }

  private forward(by: number = 2) {
    by = by * this._velocity;
    const disappearConstant = 50;
    const { dw } = this.getDestinationDimension();
    let it = this.offsetPosition.iterations;

    if (this.offsetPosition.x > dw * (-it + 1) - disappearConstant) {
      it = it - 1;
    }

    this.offsetPosition = {
      x: this.offsetPosition.x + by,
      y: this.offsetPosition.y,
      iterations: it,
    };
  }

  private reverse(by: number = 2) {
    by = by * this._velocity;
    const disappearConstant = 50;
    let it = this.offsetPosition.iterations;
    const { dw } = this.getDestinationDimension();
    if (this.offsetPosition.x < 0 - disappearConstant - dw * it) {
      it = it + 1;
    }
    this.offsetPosition = {
      x: this.offsetPosition.x - by,
      y: this.offsetPosition.y,
      iterations: it,
    };
  }

  public render(ctx: CanvasRenderingContext2D, reverse: boolean = false) {
    const { iterations } = this.offsetPosition;
    if (!this._loaded) {
      this._image.onload = () => {
        this.draw(ctx, 1);
        this.draw(ctx, 0);
        this.draw(ctx, -1);
      };
      return;
    }
    this.draw(ctx, 1 + iterations);
    this.draw(ctx, 0 + iterations);
    this.draw(ctx, -1 + iterations);
    if (reverse) {
      this.reverse();
    } else {
      this.forward();
    }
  }
}

// "images/sprites/bg-layers/Layer_0005_5.png"
