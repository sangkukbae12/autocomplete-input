import Component from './core/Component';
import AutoComplete from './components/AutoComplete';

export default class App extends Component {
  template() {
    return `
      <div data-component="autocomplete"></div>
    `;
  }

  mounted() {
    const $autocomplete = this.$target.querySelector('[data-component="autocomplete"]');
    new AutoComplete($autocomplete);
  }
}
