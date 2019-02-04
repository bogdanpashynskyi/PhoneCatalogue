const PhoneService = {
    getAllPhones( { orderType = '', query = '' } = {}) {

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

        return phones;
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

    }

};

export default PhoneService;