import Component from "../component.js";

export default class Basket extends Component {
    constructor({ element }) {
        super({ element });

        this._render();
    }

    addPhone(phone) {
        this._phone = phone;
        let basket = document.querySelector('[data-element="basket"]');

        basket.insertAdjacentHTML('afterBegin', `<div data-element="basket-item">
                                                    <li data-element="basket-item-text">
                                                    ${this._phone}
                                                    </li>
                                                    <button class="remove-button" data-element="remove-button">[x]</button>
                                                    </div>
                                                    `);
    }

    clear() {
        this._element.innerHTML = `<ul data-element="basket">
        </ul>`;
    }

    removePhone(phone) {
        phone.remove();
    }

    _render() {
        this._element.innerHTML = `
        <ul data-element="basket">
        </ul>
        `
    }
}