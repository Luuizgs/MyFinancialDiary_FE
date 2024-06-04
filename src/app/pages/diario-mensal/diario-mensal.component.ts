import { Component, OnInit } from '@angular/core';
import { IDiarioMensal } from 'src/app/Interfaces/Entities/IDiarioMensal';
import { IUsuario } from 'src/app/Interfaces/Entities/IUsuario';
import { IDiarioMensalRequest } from 'src/app/Interfaces/Requests/IDiarioMensalRequest';
import { IPaginationResponse } from 'src/app/Interfaces/Responses/IPaginationResponse';
import { DiarioMensalService } from 'src/app/services/diariomensal.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { getTodosMeses } from 'src/app/utils/FuncHelpers';

@Component({
  selector: 'app-diario-mensal',
  templateUrl: './diario-mensal.component.html',
  styleUrls: ['./diario-mensal.component.scss']
})
export class DiarioMensalComponent implements OnInit {

  public skipDefault: number = 0;
  public takeDefault: number = 5;
  public totalItems: number;

  public skip: number;
  public take: number;

  diarios: IDiarioMensal[];
  resultadoPaginado: IPaginationResponse<IDiarioMensal>;

  public dMensalId: number;

  usuario: IUsuario;

  constructor(private diarioMensalService: DiarioMensalService, private userStorageService: UserStorageService) { }

  showModalGastos: boolean = false;

  ngOnInit(): void {
    this.usuario = this.userStorageService.getUsuario();
    this.listarTodosDiariosMensais();
  }

  abrirGastosByDiarioMensal(diarioMensalId: number) {
    this.showModalGastos = !this.showModalGastos;
    this.dMensalId = diarioMensalId;
  }

  async listarTodosDiariosMensais() {
    let request: IDiarioMensalRequest = {
      skip: this.skipDefault,
      take: this.takeDefault,
      usuarioId: this.usuario.id,
    };

    const usuarioId = this.usuario.id;
    const response: any = await this.diarioMensalService.getTodosDiariosMensais(usuarioId); // await this.diarioMensalService.getDiarioMensalPaginado(request);
    // this.resultadoPaginado = response;
    // this.diarios = this.resultadoPaginado.rows;
    const diariosMensais = response.diarioMensais;
    this.diarios = response.diarioMensais;
    this.totalItems = response.diarioMensais.length;
    // console.log('response ', diariosMensais);
    // console.log('response ', diariosMensais.length);
    // console.log('Diarios ', this.diarios);
  }

  onPageChange(event: any) {
    console.log('Event ', event);
    console.log('Event.page ', event.page);
    const skipcount = event.page * 10;
    console.log('skipcount ', skipcount);
  }

  async criarNovoDiarioMensal() {
    const response: any = await this.diarioMensalService.getTodosDiariosMensais(this.usuario.id);
    const diarioMensais: IDiarioMensal[] = response.diarioMensais;
    const todosMeses = getTodosMeses();
    const mesAtual = new Date().toLocaleString('default', {month: 'long'});
    const anoAtual = new Date().getFullYear().toString();

    const exist = this.diarioMensalJaExiste(mesAtual, anoAtual, diarioMensais);
    if (exist) {
      alert("O Diário Mensal do Mês de " + todosMeses[new Date().getMonth()] + " já existe.");
      return;
    }
    const body: any = {
      ano: anoAtual,
      mes: todosMeses[new Date().getMonth()],
      usuarioId: this.usuario.id
    };
    await this.diarioMensalService.postDiarioMensal(body);
    location.reload();
  }

  private diarioMensalJaExiste(mesAtual: string, anoAtual: string, diariosMensais: IDiarioMensal[]) {
    let existe: boolean = false;
    diariosMensais.forEach(dm => {
      if (dm.ano === anoAtual && dm.mes.toLowerCase() === mesAtual) {
        existe = true;
        return;
      }
    })
    return existe;
  }

}