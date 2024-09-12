const { encrypt, decrypt } = require('./crypt');
const API = require('./request');

(async () => {
    try {
        const baseUrl = 'https://api-test.gpsuperapi.com/api';
        const playerUsername = '0801234567';
        const currencyCode = 'THB';
        const launcherCode = 'da52e06c-d6b6-42c6-96b9-96b526bd82bd';
        const encryptionKey = 'MNzLhy68lkH418xGYFE41XkKvoiRr2FX';
        const operatorToken = ''
        const secretKey = ''
        const textStr = `${operatorToken}:${secretKey}`;
        
        const encrypted = encrypt(textStr, encryptionKey);
        console.log('Encrypted:', encrypted);

        const decrypted = decrypt(encrypted, encryptionKey);
        console.log('Decrypted:', decrypted);

        // API instance
        const api = new API(baseUrl, encrypted);

        // Call getGameLink method asynchronously
        const gameLauncher = await api.getGameLink(playerUsername, currencyCode, launcherCode);
        console.log('Launch [Response]:', gameLauncher);

        // Call getProductList method asynchronously
        const productList = await api.getProductList();
        console.log('Product List [Response]:', productList);

        // Call getGameList method asynchronously
        const gameList = await api.getGameList('16');
        console.log('Game List [Response]:', gameList);

    } catch (error) {
        console.error('Error:', error.message);
    }
})();
