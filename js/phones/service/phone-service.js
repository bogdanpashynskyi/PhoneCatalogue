const PhoneService = {
    getAllPhones( { query = '', orderType = ''} = {} ) {
        let url = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';

        const callbackForSendingRequest = (phones) => {
            return new Promise ((resolve, reject) => {
                let filteredPhones = this._filter(phones, query);
                let sortedPhones = this._sort(filteredPhones, orderType);
                    
                resolve(sortedPhones);
                })
            }

        return fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(callbackForSendingRequest);  
    },

    getById(phoneId) {
        let url = `https://mate-academy.github.io/phone-catalogue-static/phones/${ phoneId }.json`

        return fetch(url);
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