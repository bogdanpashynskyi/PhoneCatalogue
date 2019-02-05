const PhoneService = {
    getAllPhones( callback, { query = '', orderType = ''} = {}) {
        let url = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';

        const callbackForSendingRequest = (phones) => {
            let filteredPhones = this._filter(phones, query);
            let sortedPhones = this._sort(filteredPhones, orderType);
                
            callback(sortedPhones);
            }

        this._sendRequest(url, callbackForSendingRequest);  
    },

    getById(phoneId, callback) {
        let url = `https://mate-academy.github.io/phone-catalogue-static/phones/${ phoneId }.json`

        this._sendRequest(url, callback);
    },

    _sendRequest(url, callback) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        
        xhr.send();

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.log(`${ xhr.status } ${ xhr.statusText }`);
                return {};
            }  
    
            const data = JSON.parse(xhr.responseText); 
    
            callback(data);
        }
    },

    _filter(phones, query) {
        let lowerCasedQuery = query.toLowerCase();

        return phones.filter((phone) => {
            return phone.name.toLowerCase().includes(lowerCasedQuery)
        }); 
    },

    _sort(phones, orderType) {
        return phones.sort((phoneA, phoneB) => {
            return phoneA[orderType] > phoneB[orderType] ? 1 : -1;
        })
    }
};

export default PhoneService;