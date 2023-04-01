import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegistrationRequest} from "./model/RegistrationRequest";
import {LoginRequest} from "./model/LoginRequest";
import {BehaviorSubject} from "rxjs";
import {User} from "./model/User.model";
import {LoginResponse} from "./model/LoginResponse.model";
import {LocalStorageService} from "./localStorage.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {environment} from "../../environments/environment";
import {MessageServiceHelper} from "../service/messageServiceHelper.service";

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router,
    private messageService: MessageServiceHelper) {
  }

  register(request: RegistrationRequest){
    return this.httpClient.post<string>(this.getRequestUrl('api/registration'), request);
  }

  login(request: LoginRequest){
    this.httpClient.post<LoginResponse>(this.getRequestUrl('login'), request)
      .subscribe(
        response => {
          const accessTokenExpirationTime = new Date(new Date().getTime()+response.accessTokenExpirationTime);
          const refreshTokenExpirationTime = new Date(new Date().getTime()+response.refreshTokenExpirationTime);
          this.handleAuthentication(request.username, response.accessToken, response.refreshToken, accessTokenExpirationTime, refreshTokenExpirationTime, true);
        },
        () => {
          this.messageService.displayMessage('error', 'Error occurred during login attempt');
        },
        () => {
          this.messageService.displayMessage('success', 'You successfully logged in!');
        }
      );
  }

  logout(){
    this.user.next(null);
    this.localStorage.clearUserData();
    this.router.navigate(['/login']);
  }

  autoLogin(){
    const user = this.localStorage.loadUserData();
    if(user === null){
      return;
    }
    if(user._accessTokenExpirationDate < new Date() && !(user._refreshTokenExpirationDate < new Date())){
      this.refreshToken(user._refreshToken, user.email);
    }
    else if(user._refreshTokenExpirationDate <= new Date()){
      this.logout();
    }
    else{
      this.handleAuthentication(user.email, user._accessToken, user._refreshToken, user._accessTokenExpirationDate, user._refreshTokenExpirationDate, false);
    }
  }

  refreshToken(token: string, username: string){
    this.httpClient.get<LoginResponse>(this.getRequestUrl('api/refreshToken'), {headers: new HttpHeaders({'Authorization': 'Bearer ' + token})})
      .subscribe(
        response => {
          const accessTokenExpirationTime = new Date(new Date().getTime()+response.accessTokenExpirationTime);
          const refreshTokenExpirationTime = new Date(new Date().getTime()+response.refreshTokenExpirationTime);
          this.handleAuthentication(username, response.accessToken, response.refreshToken, accessTokenExpirationTime, refreshTokenExpirationTime, true);
        },
        () => {
          this.logout();
          this.messageService.displayMessage('error', 'Error occurred during refresh session attempt');
        },
        () => {
          this.messageService.displayMessage('success', 'Session refreshed!');
        }
      );
  }

  confirmRegistration(token: string){
    return this.httpClient.post<any>(this.getRequestUrl('api/registration/confirm?token=' + token), '');
  }

  handleAuthentication(email: string, accessToken: string, refreshToken: string, accessTokenExpirationDate: Date, refreshTokenExpirationDate: Date, redirect: boolean){
    let user = new User(email, accessToken, refreshToken, accessTokenExpirationDate, refreshTokenExpirationDate);
    this.user.next(user);
    this.localStorage.saveUserData(user);
    if (redirect)
      this.router.navigate(['']);
  }

  getRequestUrl(resourceUrl: string){
    return `${this.baseUrl}${resourceUrl}`
  }

  getProfileImage(){
    return this.httpClient.get<any>(this.getRequestUrl('api/profile/profileImage'));
  }

  setProfileImage(file: File){
    return this.httpClient.post<any>(this.getRequestUrl('api/profile/profileImage'), file, {headers: new HttpHeaders('multipart/form-data')})
  }
}
