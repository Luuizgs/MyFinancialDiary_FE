import { Component, OnInit } from '@angular/core';
import { IDiarioMensal } from 'src/app/Interfaces/Entities/IDiarioMensal';
import { IGasto } from 'src/app/Interfaces/Entities/IGasto';
import { IUserStorage } from 'src/app/Interfaces/Entities/IUserStorage';
import { DiarioMensalService } from 'src/app/services/diariomensal.service';
import { getTodosMeses } from 'src/app/utils/FuncHelpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastAddedGastos: IGasto[] = [ ];
  totalLancamentos: IGasto[] = [ ];
  arrayFormaPagamento:any[] = [
    { descricao: 'Cartão Débito', tipo: 1 },
    { descricao: 'Cartão Crédito', tipo: 2 }
  ];
  chartData: any;
  chartOptions: any;

  constructor(private diarioMensalService: DiarioMensalService) { }

  ngOnInit(): void {
    
    this.loadLancamentos();
    this.loadChart(); 
  }

  getUsuario() {
    const userStorage: IUserStorage = JSON.parse(localStorage.getItem('userStorage'));
    return userStorage.user;
  }


  async getDiarioMensalAtual() {
    const response: any = await this.diarioMensalService.getDiarioMensalByMesAtual(this.getUsuario().id);
    if (response.diarioMensal == null)
      return;

    return response;
  }

  async loadLancamentos() {
    const response: any = await this.diarioMensalService.getDiarioMensalByMesAtual(this.getUsuario().id);
    if (response.diarioMensal == null)
      return;
    const diarioMensal = (await this.getDiarioMensalAtual()).diarioMensal;
    this.lastAddedGastos = diarioMensal.gastos;
    console.log('LoadLancamentos: ', response);
    console.log('diarioMensal: ', diarioMensal);
    console.log('lastAddedGastos: ', this.lastAddedGastos);

  }

  async loadChart() {

    const groupBy = (array: any, key: any) => {
      return array.reduce((result: any, currentValue: any) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        
        return result;
      }, {}); 
    };
    const diarioMensal = (await this.getDiarioMensalAtual()).diarioMensal;
    this.totalLancamentos = diarioMensal.gastos;
    const arrayGroupBy = groupBy(this.totalLancamentos, 'formaPagamento');

    let dataSet: any = [ ];
    this.arrayFormaPagamento.forEach((fp: any) => {
      let size: any;
      if (arrayGroupBy[fp.tipo])
        size = arrayGroupBy[fp.tipo].length;
      else 
        size = 0;
      dataSet.push(size);
    });

    const mesAtual = (getTodosMeses())[new Date().getMonth()];
    const labelMonthChart = mesAtual;
    const chartLabels = this.arrayFormaPagamento.map(fp => fp.descricao);
    this.chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: labelMonthChart,
          data: dataSet,
          backgroundColor: [ '#42A5F5', '#87CEFA'],
          borderColor: '#4682B4',
          borderWidth: 1,
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#778899'
          }
        }
      }
      // title: {
      //   display: false,
      //   text: 'Lançamentos de Fevereiro',
      //   fontSize: 16
      // },
      // legend: {
      //   position: 'bottom'
      // }
    };
  }

}
