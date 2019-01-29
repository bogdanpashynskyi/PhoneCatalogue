import Component from "../component.js";

export default class Basket extends Component {
    constructor({ element }) {
        super({ element });

        this._render();
    }

    addPhone(phone) {
        this._phone = phone;
        let gallery = document.querySelector('[data-element="gallery"]');

        gallery.insertAdjacentHTML('afterBegin', `<li>${this._phone}</li>`);
    }

    clear() {
        this._element.innerHTML = '';
    }

    _render() {
        this._element.innerHTML = `
        <ul data-element="gallery">
        </ul>
        `
    }
}