import { ACTION_TYPE } from '../utils/constants';
import { movie } from '../utils/type';

export const changeKeyword = (payload: string) => ({
  type: ACTION_TYPE.CHANGE_KEYWORD,
  payload
});

export const updateMovies = (payload: movie[]) => ({
  type: ACTION_TYPE.UPDATE_MOVIES,
  payload
});
