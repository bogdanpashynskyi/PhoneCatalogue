import PhoneCatalog from "./components/phone-catalog.js";
import PhoneViewer from "./components/phone-viewer.js";
import Filter from "./components/phone-search-bar.js";
import Basket from "./components/phone-basket.js";
import PhoneService from "./service/phone-service.js";
import Component from "./component.js";

export default class PhonesPage extends Component {
    constructor({ element }) {
      super({ element });

      this._render();
      this._initFilter();
      this._initCatalog();
      this._initViewer();
      this._initBasket();
    }

    _initCatalog() {
      this._catalog = new PhoneCatalog({
        element: document.querySelector(".phones-page__phones-catalog"),
      });

      this._showPhones();

      this._catalog.subscribe('phone-selected', (phoneId) => {
        PhoneService.getById(phoneId, (phoneDetails) => {
          this._catalog.hide();
          this._viewer.show(phoneDetails);
        });

      }) 

      this._catalog.subscribe('phone-added', (phoneName) => {
        this._phoneDetails = phoneName;

        this._basket.addItem(this._phoneDetails);
      });
    };

    _initViewer() {
      this._viewer = new PhoneViewer({
        element: document.querySelector('.phones-page__phone-viewer'),
      })

      this._viewer.subscribe('return', () => {
        this._viewer.hide();
        this._catalog.show();
      });

      this._viewer.subscribe('phone-added-in-viewer', (phoneName) => {
        this._phoneName = phoneName;

        this._basket.addItem(this._phoneName)
      });
    };

    _initBasket() {
      this._basket = new Basket({
        element: document.querySelector('.phones-page__phones-basket'),
      })

      this.on('click', 'clear-basket-button', () => {
        this._basket.clear();
      });

    };

    _initFilter() {
      this._filter = new Filter( {
        element: document.querySelector('.phones-page__search-bar')
      });

      this._filter.subscribe('order-changed', () => {
        this._showPhones();
      })

      this._filter.subscribe('phones-filtered', () => {
        this._showPhones();
      })
    }

    _showPhones() {
      let currentFiltering = this._filter.getCurrentData();
      let phones = PhoneService.getAllPhones(currentFiltering);

      this._catalog.show(phones);
    }

     _render() {
      this._element.innerHTML = `
        <div class="row">
           <!--Sidebar-->
          <div class="col-md-2">
          <div class="phones-page__search-bar"></div>
          
            <section>
              <p class="basket-header">Shopping Cart</p>
              <button data-element="clear-basket-button">Clear Basket</button>
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