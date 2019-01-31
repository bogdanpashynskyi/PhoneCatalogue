import Component from "../component.js";

export default class Basket extends Component {
    constructor({ element }) {
        super({ element });

        this._basketItems = [];

        this.on('click', 'remove-button', (phone) => {
            this._removeItem(phone);
        })

        this.on('click', 'add-qty-button', (phone) => {
            this._addQty(phone);
        })

        this.on('click', 'reduce-qty-button', (phone) => {
            this._reduceQty(phone);
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

    _addQty(event) {
        let phoneId = event.target.closest('[data-element="basket-item"]').id;
        let index = this._findIndex(phoneId);
        this._basketItems[index].qty++;

        this._render();
    }

    _reduceQty() {
        let phoneId = event.target.closest('[data-element="basket-item"]').id;
        let index = this._findIndex(phoneId);
        let qty = this._basketItems[index].qty;

        this._basketItems[index].qty--;

        if(qty < 2) {
            this._basketItems.splice(index, 1);
        }

        this._render();
    }

    clear() {
        this._basketItems.length = 0;
        this._render();
    }

    _render() {
        this._element.innerHTML = `
        <ul data-element="basket">
                ${this._basketItems.map(item => { return `
                <div data-element="basket-item" id="${ item.name }">
                    <li>${ item.name } </li>
                    <div class="qty-button">
                        <button type="button" class="add-qty-button" data-element="reduce-qty-button">-</button>
                        <div>  Qty: ${ item.qty }</div> 
                        <button type="button" class="reduce-qty-button" data-element="add-qty-button">+</button>
                        <button class="remove-button" data-element="remove-button">x</button>
                    </div>
                </div>
                `
                }).join('')}
        </ul>
        `;
    }
}