export class User {
  constructor(
    public email: string,
    public _accessToken: string,
    public _refreshToken: string,
    public _accessTokenExpirationDate: Date,
    public _refreshTokenExpirationDate: Date) {}
}
