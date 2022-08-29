export default class Bag {
  #innerArray: ((...args: any) => void)[] = [];
  constructor(...defaultCallbacks: ((...args: any) => void)[]) {
    defaultCallbacks.forEach(this.subscribe);
  }

  subscribe = (callback: TrackingCallback) => {
    this.#innerArray.push(callback);
  };

  forEach = (action: (...args: any) => void) => {
    this.#innerArray.forEach((it) => {
      action(it);
    });
  };
}

type TrackingCallback = (...args: any) => void;
