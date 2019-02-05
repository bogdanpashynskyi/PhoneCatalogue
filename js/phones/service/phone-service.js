const PhoneService = {
    getAllPhones( { query = '', orderType = ''} = {}) {

        console.log(query, orderType);

        let xhr = new XMLHttpRequest();

        xhr.open(
            'GET',
            'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json',
            false
        );
        
        xhr.send();

        if (xhr.status !== 200) {
            console.log(`${ xhr.status } ${ xhr.statusText }`);
            return [];
        }  

        let phones = JSON.parse(xhr.responseText);
        
        let filteredPhones = this._filter(phones, query);
        
        return filteredPhones;
    },

    getById(phoneId, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open(
            'GET',
            `https://mate-academy.github.io/phone-catalogue-static/phones/${ phoneId }.json`,
            true
        );
        
        xhr.send();

        xhr.onload = () => {
            if (xhr.status !== 200) {
                console.log(`${ xhr.status } ${ xhr.statusText }`);
                return {};
            }  
    
            const phoneDetails = JSON.parse(xhr.responseText); 
    
            callback(phoneDetails);
        }

    },

    _filter(phones, query) {
        let lowerCasedQuery = query.toLowerCase();

        return phones.filter((phone) => {
            return phone.name.toLowerCase().includes(lowerCasedQuery)
        }); 
    },

    _sort(phones, orderType) {
        
    }
};

export default PhoneService;