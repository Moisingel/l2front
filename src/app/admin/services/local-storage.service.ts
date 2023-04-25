import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private ls = window.localStorage;
  
  constructor() { }

  public setItem(key:string,value:string) {
    this.ls.setItem(key,value);
  }

  public getItem(key:string) {
    const value = this.ls.getItem(key);
    try {
      return value;
    } catch (error) {
      return null;
    }
  }

  public removeItem(key:string) {
    const value = this.ls.removeItem(key);
    try {
      return value;
    } catch (error) {
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }

}
