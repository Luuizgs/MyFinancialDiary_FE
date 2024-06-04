import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MFDApi } from 'src/environments/environment';
import { IDiarioMensal } from '../Interfaces/Entities/IDiarioMensal';
import { IDiarioMensalRequest } from '../Interfaces/Requests/IDiarioMensalRequest';
import { IDiarioMensalResponse } from '../Interfaces/Responses/IDiarioMensalResponse';
import { IPaginationResponse } from '../Interfaces/Responses/IPaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class DiarioMensalService {

  constructor(private http: HttpClient) { }

  async getDiarioMensalByMesAtual(usuarioId: string): Promise<IDiarioMensalResponse> {
    return new Promise( (resolve) => {
      this.http.get(`${MFDApi.Url}/DiarioMensal/mesAtual/${usuarioId}`)
      .subscribe( (response) => {
        return resolve(response as IDiarioMensalResponse);
      })
    });
  }

  async getTodosDiariosMensais(usuarioId: string): Promise<IDiarioMensalResponse> {
    return new Promise( (resolve) => {
      this.http.get(`${MFDApi.Url}/DiarioMensal/${usuarioId}/todos`)
      .subscribe( (response) => {
        return resolve(response as IDiarioMensalResponse);
      })
    });
  }

  async getDiarioMensalPaginado(request: IDiarioMensalRequest): Promise<IPaginationResponse<IDiarioMensal>> {      
      let params = new HttpParams();
      params = !!request.searchMes ? params.append('SearchMes', request.searchMes) : params;
      params = !!request.searchAno ? params.append('SearchAno', request.searchAno) : params;
      params = !!request.orderBy ? params.append('OrderBy', request.orderBy) : params;
      params = !!request.sortDirection ? params.append('SortDirection', request.sortDirection) : params;
      params = !!request.usuarioId ? params.append('UsuarioId', request.usuarioId) : params;
      params = !!request.skip ? params.append('Skip', request.skip) : params;
      params = !!request.take ? params.append('Take', request.take) : params;

      return new Promise( (resolve) => {
        this.http.get(`${MFDApi.Url}/DiarioMensal/Todos/Paginado`, { params: params })
        .subscribe( (response) => {
          return resolve(response as IPaginationResponse<IDiarioMensal>);
        })
      });
  }

  async postDiarioMensal(body: IDiarioMensal): Promise<IDiarioMensalResponse> {
    return new Promise( (resolve) => {
      this.http.post(`${MFDApi.Url}/DiarioMensal`, body)
      .subscribe( (response) => {
        return resolve(response as IDiarioMensalResponse);
      })
    });
  }
}
