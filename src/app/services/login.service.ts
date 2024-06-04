import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MFDApi } from 'src/environments/environment';
import { ILoginRequest } from '../Interfaces/Requests/ILoginRequest';
import { ILoginResponse } from '../Interfaces/Responses/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async Login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    return new Promise( (resolve) => {
      this.http.post(`${MFDApi.Url}/Login`, loginRequest)
                .subscribe( (response) => {
                  console.log(response);
                  return resolve(response as ILoginResponse);
                });
    });
  }
}
