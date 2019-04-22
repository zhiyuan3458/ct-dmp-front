import CryptoJS from 'crypto-js';
// 十六位十六进制数作为密钥
const KEY = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
// 十六位十六进制数作为密钥偏移量
const IV = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

// 加密方法
export function encrypt (word)
{
  let encrypted = CryptoJS.AES.encrypt(word, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// 解密方法
export function decrypt (word)
{
  let decrypted = CryptoJS.AES.decrypt(word, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
