class PhonesPage extends Component {
    constructor({ element }) {
      super(element);

      this._render();

      this._catalog = new PhoneCatalog({
        element: document.querySelector(".phones-page__phones-catalog"),
        phones: PhoneService.getAllPhones(),

        onPhoneSelected: (phoneId) => {
          const phoneDetails = PhoneService.getById(phoneId);

          this._catalog.hide();
          this._viewer.show(phoneDetails);
        },
      });

      console.log(this._element)
      this._viewer = new PhoneViewer({
        element: document.querySelector(".phone-page__phone-viewer")
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
              <ul>
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
              </ul>
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
          <div class="phones-page__phones-catalog"></div>
          <div class="phone-page__phone-viewer" hidden></div>
      
          </div>
        </div>
      `;
    }
  }