import { store } from '../store';
import { updateElement } from '../utils/diff';
import { movie } from '../utils/type';
import { observable, observe } from './Observer';

export default class Component {
  $target;
  $props;
  #state: Record<string, string | movie[]> = {};

  constructor($target: any, $props: any = {}) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
  }

  mounted() { }
  template() { }
  setEvent() { }
  created() { }

  getState(key: string, defaultState: any) {
    if (!this.#state[key]) {
      this.#state[key] = defaultState;
    }
    return this.#state[key];
  }

  setState(key: string, value: any) {
    this.#state[key] = value;
    this.render();
  }

  setup() {
    observable(store.getState());
    observe(() => {
      this.render();
    });
  }

  render() {
    this.created();
    const { $target } = this;

    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    const oldChildNodes = [...$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }
    this.mounted();
  }

  addEvent(eventType: string, selector: string, callback: (event: any) => void) {
    const children = [...this.$target.querySelectorAll(selector)];

    const isTarget = (target: any) => children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event: any): boolean | void => {
      if (!isTarget(event.target)) {
        return false;
      }
      callback(event);
    });
  }
}
