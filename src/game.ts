import RenderEngine from "./view/RenderEngine";

interface GameLoop {
  //   frame: FrameRequestCallback
}

class Game implements GameLoop {
  private lastFrameTime!: number;
  private fpsLimitInMs: number;
  private renderEnginer: RenderEngine;

  constructor(renderEngine: RenderEngine, maxFps: number = 30) {
    this.renderEnginer = renderEngine;
    // caching the fpsInMs
    this.fpsLimitInMs = this.getMsFromFps(maxFps);
    this.gameLoop();
  }

  private getMsFromFps(fps: number): number {
    return 1000 / fps;
  }

  private handleAnimationFrame(time: number) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = time;
    }
    if (time - this.lastFrameTime >= this.fpsLimitInMs - 2) {
      this.renderEnginer.renderCanvas();
      //   console.log("FPS :", 1000 / (time - this.lastFrameTime));
      this.lastFrameTime = time;
    }
    requestAnimationFrame(this.handleAnimationFrame.bind(this));
  }

  private gameLoop() {
    requestAnimationFrame(this.handleAnimationFrame.bind(this));
  }
}

export default Game;
