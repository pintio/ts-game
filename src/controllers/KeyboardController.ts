type KeyboardListener = (ev: KeyboardEvent) => void;
type keyDownListeners = Map<string, KeyboardListener[]>;
type KeyMap = Map<
  string,
  string | { action: string; listener: KeyboardListener }
>;

const defaultKeyMap: KeyMap = new Map([
  ["ArrowRight", "forward"],
  ["ArrowLeft", "reverse"],
  ["ArrowUp", "up"],
  ["ArrowDown", "down"],
]);

export class KeyboardController {
  //   private rootElement: RootElement;
  private keyMap: KeyMap;
  private keyDownListeners: keyDownListeners;

  constructor(keyMap?: KeyMap) {
    this.keyMap = new Map(
      keyMap ? [...defaultKeyMap, ...keyMap] : defaultKeyMap
    );
    this.addListenersFromKeyMap(this.keyMap);
    this.keyDownListeners = new Map();
    this.addListeners();
  }

  private addListenersFromKeyMap(keyMap: KeyMap): void {
    keyMap.forEach((value) => {
      if (typeof value === "object") {
        this.on(value.action, value.listener);
      }
    });
  }

  public on(action: string, listener: KeyboardListener): void {
    const existingListeners =
      this.keyDownListeners.get(action) || ([] as KeyboardListener[]);
    this.keyDownListeners.set(action, [...existingListeners, listener]);
  }

  private addListeners() {
    window.addEventListener("keydown", (ev) => {
      let action = this.keyMap.get(ev.key);
      if (!action) {
        return;
      }
      if (typeof action === "object") {
        action = action.action;
      }
      const listeners = this.keyDownListeners.get(action);
      if (listeners?.length) {
        listeners.forEach((listener) => {
          listener?.(ev);
        });
      }
    });
  }
}
