/**
 * Created by yuriel on 2/6/17.
 */

/* Fake key, don't use！ */
export const AES_KEY = '41b22374855f9c9c4703f1f6de1b5d17846d3f3d29cba49c14ca9a66d83028ea';

/* Fake VI, don't use! */
const AES_VI = '31af64daf4a37da29a96e1cc75c7498c';

const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");


function rand(minNum: number,maxNum: number){
    let range = maxNum - minNum;
    return minNum + Math.round(Math.random()*range);
}

function randoms(length: number, chars: string){
    let maxNum = chars.length - 1;
    let hex = '';
    let num = 0;
    for(let i = 0; i < length; i ++){
        num = rand(0,maxNum-1);
        hex += chars.slice(num,num+1);
    }
    return hex;
}

export class ThorEncrypt {
    private key: string;

    constructor(k: string) {
        this.key = CryptoJS.enc.Hex.parse(k);
    }

    /**
     * Encrypt string
     * @param content
     * @returns {string}
     */
    encrypt(content: string) {
        let ivRaw = randoms(32, '0123456789abcdef');
        let iv = CryptoJS.enc.Hex.parse(ivRaw);
        return ivRaw + AES.encrypt(content, this.key, {iv: iv, mode: CryptoJS.mode.CFB}).toString();
    }

    /**
     * Decrypt string
     * @param content
     * @returns {string}
     */
    decrypt(content: string) {
        let c = content.substr(16, content.length - 32);
        let ivRaw = content.slice(-16) + content.substring(0, 16);
        let iv = CryptoJS.enc.Hex.parse(ivRaw);
        let cipher = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(c)
        });
        return AES
            .decrypt(cipher, this.key, {iv: iv, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding})
            .toString(CryptoJS.enc.Utf8);
    }
}