import {NativeModules} from 'react-native'

const {CryptoModule} = NativeModules

import CryptoES from "crypto-es";
import {Base64} from "crypto-es/lib/enc-base64";


function padTo16Bytes(buffer: Buffer): Buffer {
  const length = buffer.length;
  const paddingLength = 16 - (length % 16);
  if (paddingLength === 16) {
    return buffer; // 已经是16的倍数，无需补0
  }
  const padding = Buffer.alloc(paddingLength, paddingLength); // 创建补0的Buffer
  return Buffer.concat([buffer, padding]); // 合并原始Buffer和补0的Buffer
}

// export const testRsa = (text: string, key: string) => {
//   // console.log(sourceFilePath, targetFilePath)
//   return CryptoModule.testRsa()
// }

enum KEY_PREFIX {
  publicKeyStart = '-----BEGIN PUBLIC KEY-----',
  publicKeyEnd = '-----END PUBLIC KEY-----',
  privateKeyStart = '-----BEGIN PRIVATE KEY-----',
  privateKeyEnd = '-----END PRIVATE KEY-----',
}

export enum RSA_PADDING {
  OAEPWithSHA1AndMGF1Padding = 'RSA/ECB/OAEPWithSHA1AndMGF1Padding',
  NoPadding = 'RSA/ECB/NoPadding',
}

export enum AES_MODE {
  CBC_128_PKCS7Padding = 'AES/CBC/PKCS7Padding',
  ECB_128_NoPadding = 'AES',
}

export const generateRsaKey = async () => {
  // console.log(sourceFilePath, targetFilePath)
  const key = await CryptoModule.generateRsaKey() as { publicKey: string, privateKey: string }
  return {
    publicKey: `${KEY_PREFIX.publicKeyStart}\n${key.publicKey}${KEY_PREFIX.publicKeyEnd}`,
    privateKey: `${KEY_PREFIX.privateKeyStart}\n${key.privateKey}${KEY_PREFIX.privateKeyEnd}`,
  }
}

export const rsaEncrypt = async (text: string, key: string, padding: RSA_PADDING): Promise<string> => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.rsaEncrypt(text, key
      .replace(KEY_PREFIX.publicKeyStart, '')
      .replace(KEY_PREFIX.publicKeyEnd, ''),
    padding)
}

export const rsaDecrypt = async (text: string, key: string, padding: RSA_PADDING): Promise<string> => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.rsaDecrypt(text, key
      .replace(KEY_PREFIX.privateKeyStart, '')
      .replace(KEY_PREFIX.privateKeyEnd, ''),
    padding)
}

export const rsaEncryptSync = (text: string, key: string, padding: RSA_PADDING): string => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.rsaEncryptSync(text, key
      .replace(KEY_PREFIX.publicKeyStart, '')
      .replace(KEY_PREFIX.publicKeyEnd, ''),
    padding)
}

export const rsaDecryptSync = (text: string, key: string, padding: RSA_PADDING): string => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.rsaDecryptSync(text, key
      .replace(KEY_PREFIX.privateKeyStart, '')
      .replace(KEY_PREFIX.privateKeyEnd, ''),
    padding)
}


export const aesEncrypt = async (text: string, key: string, vi: string, mode: AES_MODE): Promise<string> => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.aesEncrypt(text, key, vi, mode)
}

export const aesDecrypt = async (text: string, key: string, vi: string, mode: AES_MODE): Promise<string> => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.aesDecrypt(text, key, vi, mode)
}

export const aesEncryptSync = (text: string, key: string, vi: string, mode: AES_MODE): string => {
  // console.log(sourceFilePath, targetFilePath)
  console.log("aesEncryptSync - text:", text);
  console.log("aesEncryptSync - key:", key);
  console.log("aesEncryptSync - vi:", vi);
  console.log("aesEncryptSync - mode:", mode);

  const textDecodeBase64 = Buffer.from(text, 'base64')
  const keyDecodeBase64 = Buffer.from(key, 'base64')
  const viDecodeBase64 = Buffer.from(vi, 'base64')

  console.log("textDecodeBase64:", textDecodeBase64);
  console.log("keyDecodeBase64 - key:", keyDecodeBase64);
  console.log("viDecodeBase64 - vi:", viDecodeBase64);




  const encryptNoPadding = CryptoES.AES.encrypt(CryptoES.lib.WordArray.create(textDecodeBase64), CryptoES.lib.WordArray.create(keyDecodeBase64), {
    mode: CryptoES.mode.ECB,
    padding:CryptoES.pad.Pkcs7
  });


  console.log("encryptNoPadding - encryptNoPadding:", Base64.stringify(encryptNoPadding.ciphertext!).replace(/[\r\n]/g, ""));
  const javaEncrypted = CryptoModule.aesEncryptSync(text, key, vi, mode)
  console.log("java Crypto", javaEncrypted)
  return javaEncrypted
}

export const aesDecryptSync = (text: string, key: string, vi: string, mode: AES_MODE): string => {
  // console.log(sourceFilePath, targetFilePath)
  return CryptoModule.aesDecryptSync(text, key, vi, mode)
}
