import {AES, enc} from "crypto-js";

function encrypt(text: string, secretKey: string): string {
  return AES.encrypt(text, secretKey).toString();
}

function decrypt(encryptedText: string, secretKey: string): string {
  return AES.decrypt(encryptedText, secretKey).toString(enc.Utf8);
}

export {encrypt, decrypt};
