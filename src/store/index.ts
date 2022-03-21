import { createStore } from '../core/Store';
import { reducer } from './reducer';

export const store = createStore(reducer);
