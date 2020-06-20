import { EncryptedText } from "../models/encrypted-text";
/**
 * Service that provides text encryption and decryption.
 */
export declare class EncryptionService {
    private readonly key;
    constructor(key?: string);
    encrypt(text: string): EncryptedText;
    decrypt(text: string): EncryptedText;
}
export declare const encryptionService: EncryptionService;
