import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MFDApi } from 'src/environments/environment';
import { IUserStorage } from '../Interfaces/Entities/IUserStorage';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLogin = request.url.includes('Login');
    if (!isLogin) {
      const userStorage: IUserStorage = JSON.parse(
        localStorage.getItem('userStorage')
      );

      const isLoggedIn = userStorage.token;
      const isApiUrl = request.url.startsWith(MFDApi.Url);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${userStorage.token}` },
        });
      }

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 401) {
            this.router.navigate(['/login']);
            return throwError(() => new Error('Not Authenticated'));
          }
          return throwError(() => new Error(''));
        })
      );
    }
    return next.handle(request);
  }
}
