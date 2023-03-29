import {Injectable} from "@angular/core";
import {User} from "./model/User.model";

@Injectable()
export class LocalStorageService {
  private userDataKey = 'userData';
  private expandedItems = 'expandedItems';

  saveExpandedData(expandedItems: Array<number>){
    localStorage.setItem(this.expandedItems, JSON.stringify(expandedItems));
  }

  loadExpandedData(){
    const expandedItems = localStorage.getItem(this.expandedItems);
    if(expandedItems === null)
      return [];
    return JSON.parse(expandedItems);
  }

  saveUserData(user: User){
    localStorage.setItem(this.userDataKey, JSON.stringify(user, this.replacer));
  }

  loadUserData(): User | null{
    const userData = localStorage.getItem(this.userDataKey);
    if(userData === null)
      return null;
    return JSON.parse(userData, this.reviver);
  }

  clearUserData(){
    localStorage.removeItem(this.userDataKey);
  }

  replacer(key: any, value: any) {
    if (key === '_accessTokenExpirationDate' || key === '_refreshTokenExpirationDate') {
      return Date.parse(value.toString());
    }
    return value;
  }

  reviver(key: any, value: any) {
    if (key === '_accessTokenExpirationDate' || key === '_refreshTokenExpirationDate') {
      return new Date(value);
    }
    return value;
  }
}
