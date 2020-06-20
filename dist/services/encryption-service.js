"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypted_text_1 = require("../models/encrypted-text");
class EncryptionService {
    constructor(key = process.env.ENCRYPTION_KEY) {
        this.key = key;
    }
    encrypt(text) {
        return encrypted_text_1.EncryptedText.encrypt(text, this.key);
    }
    decrypt(text) {
        return encrypted_text_1.EncryptedText.decrypt(text, this.key);
    }
}
exports.EncryptionService = EncryptionService;
exports.encryptionService = new EncryptionService();
//# sourceMappingURL=encryption-service.js.map