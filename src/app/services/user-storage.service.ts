import { Injectable } from '@angular/core';
import { IUserStorage } from '../Interfaces/Entities/IUserStorage';
import { IUsuario } from '../Interfaces/Entities/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  getUserStorageFull(): IUserStorage {
    const userStorage: IUserStorage = JSON.parse(localStorage.getItem('userStorage'));
    return userStorage;
  }

  getUsuario(): IUsuario {
    return this.getUserStorageFull().user;
  }
}
