import { EncryptedText } from "../models/encrypted-text";

/**
 * Service that provides text encryption and decryption
 */
export class EncryptionService {
  constructor(
    private readonly key: string = process.env.ENCRYPTION_KEY as string
  ) {}

  encrypt(text: string) {
    return EncryptedText.encrypt(text, this.key);
  }

  decrypt(text: string) {
    return EncryptedText.decrypt(text, this.key);
  }
}

export const encryptionService = new EncryptionService();
