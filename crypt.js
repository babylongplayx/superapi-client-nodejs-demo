const crypto = require('crypto');

const encrypt = (text, key) => {
    if (key.length !== 32) {
        throw new Error("Key must be 32 bytes long.");
    }

    const iv = crypto.randomBytes(16); // AES-256-CBC uses a 16-byte IV
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

    const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final(),
    ]);

    const data = Buffer.concat([iv, encrypted]).toString('base64');
    return data;
}

const decrypt = (data, key) => {
    if (key.length !== 32) {
        throw new Error("Key must be 32 bytes long.");
    }

    const decodedData = Buffer.from(data, 'base64');
    const iv = decodedData.slice(0, 16);
    const encryptedText = decodedData.slice(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);

    return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };