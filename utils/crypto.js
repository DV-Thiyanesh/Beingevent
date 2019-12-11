const crypto = require('crypto');
const walletUtils = require('./wallet');
const Tx = require('ethereumjs-tx');
const config = require('config');
const algorithm = config.get('cryptoAlgo');
const encrypt = (password, text) => {
    // console.log("cipher",algorithm,password,text)
    const cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
const decrypt = (algorithm, encrypted , password) => {
    // console.log("datas", algorithm, encrypted, password)
    const decipher = crypto.createDecipher(algorithm, password);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const signTx = (seedhash, password, rawTransaction) => {
    let seed = decrypt( algorithm,  seedhash, password)
    const wallet = walletUtils.getWallet(seed)
    let privateKey = walletUtils.getWalletPrivateKey(wallet);
    // console.log("private key", privateKey)
    privateKey = new Buffer(privateKey, 'hex');
    const tx = new Tx(rawTransaction);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    return serializedTx
}
module.exports = {encrypt,decrypt, signTx};