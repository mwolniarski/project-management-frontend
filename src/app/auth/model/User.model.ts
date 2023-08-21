import {BehaviorSubject} from "rxjs";
import {ProfileDetails} from "./ProfileDetails";

export class User {
  constructor(
    public email: string,
    public _accessToken: string,
    public _refreshToken: string,
    public userDetails: BehaviorSubject<ProfileDetails | null>,
    public _accessTokenExpirationDate: Date,
    public _refreshTokenExpirationDate: Date) {}
}
