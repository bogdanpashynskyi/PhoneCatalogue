import Component from "../component.js";

export default class PhoneViewer extends Component {
    constructor ({ element }){
      super({ element });

      this.on('click', 'return-button', () => {
        this.emit('return')
      });

      this.on('click', 'viewer-add-button', (event) => { 
        let phoneAdded = event.target;

        this.emit('phone-added-inViewer', phoneAdded.dataset.phoneName);
      })

      this.on('click', 'small-image', (event) => {
        let smallImage = event.target;
        let mainImage = document.querySelector('[data-element="main-image"]');
        mainImage.src = smallImage.src;
      })
    }

    show(phoneDetails) {
      this._phoneDetails = phoneDetails;
      super.show();

      this._render();     
    };

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
          <img data-element="small-image" src="${ image }">
          </li>`)}

        </ul>
        `
    }
}