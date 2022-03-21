import { debounceFrame } from '../utils/debounceFrame';

let currentObserver: any = null;

export const observe = (fn: (...args: any[]) => any) => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};

export const observable = (obj: any) => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) {
          observers.add(currentObserver);
        }
        return _value;
      },
      set(value) {
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;

        _value = value;
        observers.forEach((callback: any) => callback());
      }
    });
  });
  return obj;
};
