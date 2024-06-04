import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserStorage } from '../Interfaces/Entities/IUserStorage';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanLoad {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userStorage: IUserStorage;
    const userStorageString = localStorage.getItem('userStorage');
    if (!userStorageString) {
      console.log('userStorageString = ', userStorageString);
      return this.notAuthenticated();
    }
    userStorage = JSON.parse(userStorageString);

    if (!userStorage.token) {
      return this.notAuthenticated();
    }

    return new Promise((resolve) => {
      const usuarioCriado = userStorage.user;
      if (usuarioCriado) resolve(true);
      else resolve(this.notAuthenticated());
    });
  }

  notAuthenticated() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
