import Component from "../component.js";

export default class PhoneCatalog extends Component {
    constructor({ element, 
      phones = [], 
    }) {
        super({element})
        this._phones = phones;

        this._render();

        this.on('click', 'phone', (event) => {
          let phoneElement = event.target;

          this.emit('phone-selected', phoneElement.dataset.phoneId);
        })

        this.on('click', 'phone-add-button', (event) => {
          let clickedAddBtn = event.target;

          this.emit('phone-added', clickedAddBtn.dataset.phoneName);
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
            <a data-phone-name="${ phone.name }" class="btn btn-success" data-element="phone-add-button">
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