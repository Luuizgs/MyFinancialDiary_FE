import { Injectable } from '@angular/core';
import { IUsuario } from '../Interfaces/Entities/IUsuario';
import { v4 as Guidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { MFDApi } from 'src/environments/environment';
import { IUserStorage } from '../Interfaces/Entities/IUserStorage';
import { IUsuarioResponse } from '../Interfaces/Responses/IUsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: IUsuario;

  constructor(private http: HttpClient) { }

  async getUsuarioById(usuarioId: string): Promise<IUsuarioResponse> {
    return new Promise((resolve) => {
      this.http.get(`${MFDApi.Url}/Usuario/${usuarioId}`)
      .subscribe( (response) => {
        return resolve(response as IUsuarioResponse);
      });
    });
  }

}
