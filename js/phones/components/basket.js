import Component from "../component.js";

export default class Basket extends Component {
    constructor({ element }) {
        super({ element });

        this._render();
    }

    addPhone(phone) {
        this._phone = phone;
        let ul = document.querySelector('ul');

        ul.insertAdjacentHTML('afterBegin', `<li>${this._phone}</li>`);
    }

    clearBasket() {
        this._element.innerHTML = "";
    }

    _render() {
        this._element.innerHTML = `
        <ul>
        </ul>
        `
    }
}