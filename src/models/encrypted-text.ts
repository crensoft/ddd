import crypto from "crypto";
import { ValueObject } from "./value-object";

interface IEncryptedText {
  readonly cipher: string;
  readonly plain: string;
}

/**
 * Encrypted Text value object
 */
export class EncryptedText extends ValueObject<IEncryptedText> {
  private constructor(props: Partial<IEncryptedText>) {
    super(props as any);
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

  static IV_LENGTH = 16;

  public static encrypt(text: string, key: string) {
    if (!text || !key) {
      throw new Error("Expected text and key");
    }

    const iv = crypto.randomBytes(EncryptedText.IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-128-cbc",
      Buffer.from(key, "base64"),
      iv
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return new EncryptedText({
      plain: text,
      cipher: iv.toString("hex") + ":" + encrypted.toString("hex"),
    });
  }

  public static decrypt(text: string, key: string) {
    if (!text || !key) {
      throw new Error("Expected text and key");
    }

    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift() as string, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-128-cbc",
      Buffer.from(key, "base64"),
      iv
    );
    const decrypted = decipher.update(encryptedText);

    return new EncryptedText({
      plain: Buffer.concat([decrypted, decipher.final()]).toString(),
      cipher: text,
    });
  }
}
