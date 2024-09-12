const axios = require('axios');

class API {
    constructor(baseUrl, headerToken) {
        this.baseUrl = baseUrl;
        this.headerToken = headerToken;
    }

    // get method
    async getGameLink(playerUsername, currencyCode, launchCode) {
        const url = `${this.baseUrl}/v1/launch`;
        const params = {
            playerUsername,
            currencyCode,
            launchCode,
            deviceType: 'mobile',
            lang: 'en',
            returnUrl: 'https://google.com',
            playerIp: '127.0.0.1'
        }
        const response = await axios.post(url, params, {
            headers: {
                "X-Authorization-Token": this.headerToken,
            },
        });

        return response.data;
    }

    async getProductList() {
        const url = `${this.baseUrl}/v1/products`;
        const response = await axios.get(url, {
            headers: {
                "X-Authorization-Token": this.headerToken,
            },
        });

        return response.data;
    }

    async getGameList(productId) {
        const url = `${this.baseUrl}/v1/games?productId=${productId}`;
        const response = await axios.get(url, {
            headers: {
                "X-Authorization-Token": this.headerToken,
            },
        });

        return response.data;
    }
}

module.exports = API;