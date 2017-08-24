import { UserInStorage } from './user-info.service';
import { Injectable } from '@angular/core';

export interface UserInStorage {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

export interface LoginUserInfoInStorage {
  success: boolean;
  message: string;
  landingPage: string;
  user?: UserInStorage;
}

@Injectable()
export class UserInfoService {

  public currentUserKey = 'currentUser';
  public storage: Storage = sessionStorage;

  constructor() { }

  public storeUserInfo(userInfoString: string) {
    this.storage.setItem(this.currentUserKey, userInfoString);
  }

  public removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
  }

  public getUserInfo(): UserInStorage | null {
    try {
      const userInfoString: string = this.storage.getItem(this.currentUserKey);
      if (userInfoString) {
        const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
        return userObj;
      }else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public isLoggedIn() {
    return this.storage.getItem(this.currentUserKey) ? true : false;
  }

  public getUserName(): string {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.fullName;
    }
    return 'null';
  }

  public getStoredToken(): string | null {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.token;
    }
    return null;
  }

}
