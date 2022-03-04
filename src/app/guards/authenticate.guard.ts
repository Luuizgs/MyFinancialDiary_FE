import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanLoad {

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token');

      if (!token) {
        return this.notAuthenticated();
      }
      
      return new Promise((resolve) => {
        const usuarioCriado = this.usuarioService.inicializaUsuario();
        if (usuarioCriado)
          resolve(true);
        else
          resolve(this.notAuthenticated());
      });
  }

  notAuthenticated() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
