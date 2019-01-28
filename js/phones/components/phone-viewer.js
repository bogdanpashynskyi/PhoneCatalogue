class PhoneViewer extends Component {
    constructor ({element}){
      super({element});
    }

    show(phoneDetails) {
      this._phoneDetails = phoneDetails;
      this._element.hidden = false;

      this._render();
      this._selectImage();
    }

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

        <button>Back</button>
        <button>Add to basket</button>
    
    
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