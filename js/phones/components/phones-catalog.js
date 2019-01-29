import Component from "../component.js";

export default class PhoneCatalog extends Component {
    constructor({ element, 
      phones = [], 
      onPhoneSelected = () => {},
      onPhoneAdded = () => {}
    }) {
        super({element})
        this._phones = phones;
        this._onPhoneSelected = onPhoneSelected;
        this._onPhoneAdded = onPhoneAdded;

        this._render();

        this.on('click', '[data-element="phone"]', (event) => {
          let phoneElement = event.target.closest('[data-element="phone"]');

          this._onPhoneSelected(phoneElement.dataset.phoneId)})

        this.on('click', '[data-element="catalog__basket-add-button"]', (event) => {
          let clickedAddBtn = event.target.closest('[data-element="catalog__basket-add-button"]');
          
          this._onPhoneAdded(clickedAddBtn.dataset.phoneName);
        })
    }

    hide() {
      super.hide();
    }

    _render() {
        this._element.innerHTML = `
        <ul class="phone-list phones">
          ${ this._phones.map(phone => `
          <li class="phone-list___element thumbnail" data-element="phone" data-phone-id="${ phone.id }">
          <a href="#!/phones/${ phone.id }" class="thumb">
            <img alt="${ phone.name }" src="${ phone.imageUrl }">
          </a>

          <div class="phones__btn-buy-wrapper">
            <a data-phone-name="${ phone.name }" class="btn btn-success" data-element="catalog__basket-add-button">
              Add
            </a>
          </div>

          <a href="#!/phones/${ phone.id }">${ phone.name }</a>
          <p>${ phone.snippet }</p>
        </li>
        `).join('')}
        </ul>
        `;
    }
}