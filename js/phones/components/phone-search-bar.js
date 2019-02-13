import Component from "../component.js";

const debounce = _.debounce;

const QUERY_CHANGE_DELAY = 300;

export default class Filter extends Component {
    constructor({ element }) {
        super({ element });

        this._render();

        this._orderField = this._element.querySelector('[data-element="order-field"]')
        this._queryField = this._element.querySelector('[data-element="query-field"]')

        this.on('change', 'order-field', () => {
            this.emit('order-changed');
        })

        let emitQueryChangedWithDebounce = debounce(() => {
            this.emit('phones-filtered');
        }, QUERY_CHANGE_DELAY)

        this.on('input', 'query-field', emitQueryChangedWithDebounce)
    }

    getCurrentData() {
        return {
        query: this._queryField.value,
        orderType: this._orderField.value,
        }
    }

    _render() {
        this._element.innerHTML = `
<section>
    <div class="search">
        <p>
          Search:
        </p>
        <input class="input-option" data-element="query-field">
    </div>
    <div class="sort">
        <p>
          Sort by:
        </p>
        <select class="input-option" data-element="order-field">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
        </select>
    </div>
</section>
        `
    }
}