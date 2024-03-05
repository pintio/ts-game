export default class Platform {
  public height!: number;
  public width!: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}
