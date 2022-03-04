import { Injectable } from '@angular/core';
import { IUsuario } from '../Interfaces/IUsuario';
import { v4 as Guidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: IUsuario;

  constructor() { }

  async inicializaUsuario() {
    if (!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if (!token) 
      return false;

    try {
      // TODO: Trocar isso para usar a API do Back, qnd ela estiver pronta. 
      // pra poder deslogar o cara qnd o token estiver vencido
      this.usuario =  await this.getUsuario();
      return true;
    } catch(ex) {
      return false;
    }
  }

  async getUsuario(): Promise<IUsuario> {
    return new Promise((resolve) => {
      return resolve({ id: Guidv4(), nome: 'Carol' });
    });
  }

  getMe() {
    return this.usuario;
  }
}
