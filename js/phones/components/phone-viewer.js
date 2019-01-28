class PhoneViewer {
    constructor({ element }) {
        this._element = element;

    }

    show(phoneDetails) {
      this._phoneDetails = phoneDetails;
      this._element.hidden = false;

      this._render();
    }

    _render() {
        const phone = this._phoneDetails;

        this._element.innerHTML = `
        <img class="phone" src="${ phone.images[0] }">

        <button>Back</button>
        <button>Add to basket</button>
    
    
        <h1>${ phone.name }</h1>
    
        <p>${ phone.description }</p>
    
        <ul class="phone-thumbs">
        ${ phone.images.map(image => `
          <li>
          <img src="${ image }">
          </li>`)}

        </ul>
        `
    }
}