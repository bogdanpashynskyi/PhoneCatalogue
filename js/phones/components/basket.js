import Component from "../component.js";

export default class Basket extends Component {
    constructor({ element }) {
        super({ element });

        this._basketItems = [];

        this.on('click', 'remove-button', (phone) => {
            this._removeItem(phone);
        })
    }

    _removeItem(event) {
        let deletedItem = event.target.closest('[data-element="basket-item"]');

        if(!deletedItem) {
            return;
        }

        let index = this._findIndex(deletedItem.id);
        this._basketItems.splice(index, 1);

        this._render();     
    }

    addItem(phone) {
        this._phone = phone;

        let index = this._findIndex(this._phone)

        if(index === null) {

            this._basketItems.push( {
                name: this._phone,
                qty: 1,
                }
            )
        } else { this._basketItems[index].qty += 1 }


        this._render();
    }

    _findIndex(phone) {
        let basketItems = this._basketItems;

        for(let i = 0; basketItems.length > i; i++) {
            if(phone === basketItems[i].name) {
                return i;
            }
        }

        return null;
    }

    clear() {
        this._basketItems.length = 0;
        this._render();
    }

    _render() {
        this._element.innerHTML = `
        <ul data-element="basket">
                ${this._basketItems.map(item => { return `
                    <li data-element="basket-item" id="${ item.name }">
                             ${ item.name }
                    <div class="qty-button">
                        <div>  Qty: ${ item.qty } <span> </span> </div> 
                        <button class="remove-button" data-element="remove-button">x</button>
                    </div>
                    </li>
                    
                `
                }).join('')}
        </ul>
        `;
    }
}