import { randomBytes, scrypt } from "crypto";

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);

        resolve(derivedKey);
      });
    });

    return `${buffer.toString("hex")}.${salt}`;
  }
}
