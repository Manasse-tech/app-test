export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly tenantId: string,
    public readonly totpSecret: string,
    public readonly isTwoFactorEnabled: boolean
  ) {}
  public verifyTotpToken(
    token: string,
    cryptoEngine: { verifyTOTP(token: string, secret: string): boolean }
  ): boolean {
    if (!this.isTwoFactorEnabled) return true;
    return cryptoEngine.verifyTOTP(token, this.totpSecret);
  }
}
