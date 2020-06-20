"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const value_object_1 = require("./value-object");
/**
 * Encrypted Text value object
 */
class EncryptedText extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
    }
    toValue() {
        return this.props.cipher;
    }
    get plain() {
        return this.props.plain;
    }
    get cipher() {
        return this.props.cipher;
    }
    toString() {
        return this.props.cipher;
    }
    toJSON() {
        return this.props.cipher;
    }
    static encrypt(text, key) {
        if (!text || !key) {
            throw new Error("Expected text and key");
        }
        const iv = crypto_1.default.randomBytes(EncryptedText.IV_LENGTH);
        const cipher = crypto_1.default.createCipheriv("aes-128-cbc", Buffer.from(key, "base64"), iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return new EncryptedText({
            plain: text,
            cipher: iv.toString("hex") + ":" + encrypted.toString("hex"),
        });
    }
    static decrypt(text, key) {
        if (!text || !key) {
            throw new Error("Expected text and key");
        }
        const textParts = text.split(":");
        const iv = Buffer.from(textParts.shift(), "hex");
        const encryptedText = Buffer.from(textParts.join(":"), "hex");
        const decipher = crypto_1.default.createDecipheriv("aes-128-cbc", Buffer.from(key, "base64"), iv);
        const decrypted = decipher.update(encryptedText);
        return new EncryptedText({
            plain: Buffer.concat([decrypted, decipher.final()]).toString(),
            cipher: text,
        });
    }
}
exports.EncryptedText = EncryptedText;
EncryptedText.IV_LENGTH = 16;
//# sourceMappingURL=encrypted-text.js.map