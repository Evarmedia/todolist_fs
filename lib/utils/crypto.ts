import CryptoJS from 'crypto-js';

const getEncryptionKey = () => {
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  if (!key) {
    throw new Error('Encryption key not found in environment variables');
  }
  return key;
};

export const encryptData = (data: any): string => {
  const key = getEncryptionKey();
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, key).toString();
};

export const decryptData = (encryptedData: string): any => {
  const key = getEncryptionKey();
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};