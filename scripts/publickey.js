// 涉及到前端向后台传输密码时产生密文

import jsEncrypt from 'jsencrypt';

let publicKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKHeKSnqKWYam7TRTzuUNNLZxu
    bFjfRshoM9TPc8EwpeVUWqZw/XxbEsVLzEw0YO0aEeJxsYLn4iW7XZVbQOh8UCd9
    INc86lwrp5N0lf8nMPh+uyAukvr+rK8R1DPcYkzFbDDHEpOI4PyDCzKwwJVMtC6b
    qdYwbEUCAwrYs5184QIDAQAB
    -----END PUBLIC KEY-----`

let getEncryptedPasswd = function (originPassword) {
	let encrypt = new jsEncrypt.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    let encryptedPasswd = encrypt.encrypt(originPassword);
    return encryptedPasswd;
}

export default {
    getEncryptedPasswd, 
}