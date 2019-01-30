import Component from "../component.js";

export default class PhoneSearchBar extends Component {
    constructor({ element }) {
        super({ element });

        this._render();
    }

    _render() {
        this._element.innerHTML = `
<section>
    <div class="search">
        <p>
          Search:
        </p>
        <input class="input-option">
    </div>
    <div class="sort">
        <p>
          Sort by:
        </p>
        <select class="input-option">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
        </select>
    </div>
</section>
        `
    }
}