export default class Component {
    constructor({ element }) {
        this._element = element;
    }

    show() {
        this._element.hidden = false;
    }

    hide() {
        this._element.hidden = true;
    }

    on(eventName, selector, callback) {
        this._element.addEventListener(eventName, (event) => {
            let delegetedTarget = event.target.closest(selector);

            if(!delegetedTarget || !this._element.contains(delegetedTarget)) {
                return;
            }

            callback(event);
        })
    }
}