import PhoneCatalog from "./components/phones-catalog.js";
import PhoneViewer from "./components/phone-viewer.js";
import Basket from "./components/basket.js";
import PhoneService from "./service/phone-service.js";
import Component from "./component.js";

export default class PhonesPage extends Component {
    constructor({ element }) {
      super({ element });

      this._render();

      this._catalog = new PhoneCatalog({
        element: document.querySelector(".phones-page__phones-catalog"),
        phones: PhoneService.getAllPhones(),

        onPhoneSelected: (phoneId) => {
          const phoneDetails = PhoneService.getById(phoneId);

          this._catalog.hide();
          this._viewer.show(phoneDetails);
        },

        onPhoneAdded: (phoneId) => {
          this._phoneDetails = phoneId;

          this._basket.addPhone(this._phoneDetails);
        }
      });

      this._viewer = new PhoneViewer({
        element: document.querySelector(".phones-page__phone-viewer"),

        onReturn: () => {
          this._viewer.hide();
          this._catalog.show();
        },

        onAddInViewer: (phoneName) => {
          this._phoneName = phoneName;

          this._basket.addPhone(this._phoneName)
        }
      })

      this._basket = new Basket({
        element: document.querySelector('.phones-page__phones-basket'),
      })

      this._clearBasket = document.querySelector('.basket__clear-button');

      this._clearBasket.addEventListener('click', () => {
        this._basket.clearBasket();
      })
    }

     _render() {
      this._element.innerHTML = `
        <div class="row">
           <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <p>
                Search:
                <input>
              </p>
      
              <p>
                Sort by:
                <select>
                  <option value="name">Alphabetical</option>
                  <option value="age">Newest</option>
                </select>
              </p>
            </section>
      
            <section>
              <p>Shopping Cart</p>
              <button class="basket__clear-button">Clear Basket</button>
              <div class="phones-page__phones-basket"></div>
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
          <div class="phones-page__phones-catalog"></div>
          <div class="phones-page__phone-viewer" hidden></div>
      
          </div>
        </div>
      `;
    }
  }