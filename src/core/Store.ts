import { observable } from './Observer';

export const createStore = (reducer: any) => {
  const state = observable(reducer());

  const proxyState: any = {};

  Object.keys(state).forEach(key => {
    Object.defineProperty(proxyState, key, {
      get: () => state[key]
    });
  });

  const dispatch = (action: any) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === undefined) continue;
      state[key] = value;

    }
  };

  const getState = () => proxyState;

  return { getState, dispatch };
};
