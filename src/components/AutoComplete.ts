import Component from '../core/Component';
import { store } from '../store';
import { changeKeyword, updateMovies } from '../store/action';
import { URL } from '../utils/constants';
import { debounce } from '../utils/debounce';
import { fetchRequest } from '../utils/httpRequset';
import { movie } from '../utils/type';

export default class AutoComplete extends Component {
  template() {
    const { keyword, movies } = store.getState();

    return `
      <input type="search" class="searchInput" name="keyword" value="${keyword}" list="movie-list" placeholder="검색어를 입력해주세요" autofocus autocomplete="off" />
      <datalist id="movie-list">
        ${movies.map((movie: movie) => `
          <option >${movie.text}</option>
        `).join('')}
      </datalist>
    `;
  }

  setEvent() {
    this.addEvent('keyup', '.searchInput', debounce(e => {
      store.dispatch(changeKeyword(e.target.value));
    }, 300));
  }

  async mounted() {
    this.getMovies();
  }

  async getMovies() {
    const { keyword } = store.getState();

    if (!keyword) {
      store.dispatch(updateMovies([]));
      return;
    }

    try {
      const result = await fetchRequest(`${URL}?value=${keyword}`, 'GET');
      store.dispatch(updateMovies(result));
    } catch (err) {
      console.error(err);
    }
  }
}
