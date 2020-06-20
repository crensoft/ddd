import { ValueObject } from "./value-object";
interface IEncryptedText {
    readonly cipher: string;
    readonly plain: string;
}
/**
 * Encrypted Text value object
 */
export declare class EncryptedText extends ValueObject<IEncryptedText> {
    private constructor();
    toValue(): string;
    get plain(): string;
    get cipher(): string;
    toString(): string;
    toJSON(): string;
    static IV_LENGTH: number;
    static encrypt(text: string, key: string): EncryptedText;
    static decrypt(text: string, key: string): EncryptedText;
}
export {};
