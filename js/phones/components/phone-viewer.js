import Component from "../component.js";

export default class PhoneViewer extends Component {
    constructor ({element,
       onReturn = () => {},
       onAddInViewer = () => {}
      }){
      super({element});
      this._onReturn = onReturn;
      this._onAddInViewer = onAddInViewer;
    }

    show(phoneDetails) {
      this._phoneDetails = phoneDetails;
      super.show();

      this._render();
      this._selectImage(); 

      this._returnBtn = document.querySelector('[data-element="return-button"]');
      this._returnBtn.addEventListener('click', () => {
        this._onReturn();
    
      })

      this._element.addEventListener('click', (event) => {
        let phoneAdded = event.target.closest('[data-element="viewer-add-button"]');

        if(!phoneAdded) {
          return;
        }

        this._onAddInViewer(phoneAdded.dataset.phoneName);
      })
    };

    _selectImage() {
      this._images = document.querySelector('.phone-thumbs');

      this._images.addEventListener('click', (event) => {
        let selectedImage = event.target.closest('[data-element="image"]');

        if(!selectedImage) {
          return;
        }
        let mainImage = document.querySelector('[data-element="main-image"]');

        mainImage.src = selectedImage.src;
      })

    }

    _render() {
        const phone = this._phoneDetails;

        this._element.innerHTML = `
        <img class="phone" data-element="main-image" src="${ phone.images[0] }">

        <button data-element="return-button" >Back</button>
        <button data-element="viewer-add-button" data-phone-name="${phone.name}">Add to basket</button>
    
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
    
        <ul class="phone-thumbs">
        ${ phone.images.map(image => `
          <li>
          <img data-element="image" src="${ image }">
          </li>`)}

        </ul>
        `
    }
}