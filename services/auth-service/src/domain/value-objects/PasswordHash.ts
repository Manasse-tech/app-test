import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export class PasswordHash {
  private readonly hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  static async create(plainPassword: string): Promise<PasswordHash> {
    if (plainPassword.length < 12) {
      throw new Error('Password must be at least 12 characters long');
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(plainPassword, salt);
    return new PasswordHash(hash);
  }

  static fromHash(hash: string): PasswordHash {
    return new PasswordHash(hash);
  }

  async verify(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hash);
  }

  getHash(): string {
    return this.hash;
  }
}
