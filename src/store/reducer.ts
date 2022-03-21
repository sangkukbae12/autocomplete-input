import { ACTION_TYPE } from '../utils/constants';

const initState = {
  keyword: "",
  movies: []
};

export const reducer = (state = initState, action: any = {}) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_KEYWORD: {
      return { ...state, keyword: action.payload };
    }
    case ACTION_TYPE.UPDATE_MOVIES: {
      return { ...state, movies: action.payload };
    }
    default:
      return initState;
  }
};
