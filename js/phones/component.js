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

    on(eventName, elementName, callback) {
        this._element.addEventListener(eventName, (event) => {
            let delegetedTarget = event.target.closest(`[data-element="${ elementName }"]`);

            if(!delegetedTarget || !this._element.contains(delegetedTarget)) {
                return;
            }

            callback(event);
        })
    }
}