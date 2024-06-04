import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MFDApi } from 'src/environments/environment';
import { IGasto } from '../Interfaces/Entities/IGasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private http: HttpClient) { }

  async GetGastosByDiarioMensal(diarioMensalId: number): Promise<any> {
    return new Promise( (resolve) => {
      this.http.get(`${MFDApi.Url}/Gasto/${diarioMensalId}`)
      .subscribe( (response) => {
        resolve(response);
      })
    });
  }

  async AddGasto(gasto: IGasto): Promise<any> {
    return new Promise( (resolve) => {
      const body: any = gasto;
      this.http.post<any>(`${MFDApi.Url}/Gasto`, body)
      .subscribe( (response) => {
        resolve(response);
      })
    });
  }

  async UpdateGasto(gasto: IGasto): Promise<any> {
    return new Promise( (resolve) => {
      const body: any = gasto;
      this.http.put(`${MFDApi.Url}/Gasto`, body)
      .subscribe( (response) => {
        resolve(response);
      })
    })
  }
}
