const fs = require("fs")
const crypto = require("crypto")

function genKeyPair() {
    const keyPair =  crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096, //bites - standard for rsa
        publicKeyEncoding: {
            type: "pkcs1", //public key cryptography Standards 1
            format: "pem" // Most common formatting choice
        },
        privateKeyEncoding: {
            type: "pkcs1", //public key cryptography Standards 1
            format: "pem" // Most common formatting choice
        }
    });
    //create public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
    //create private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();