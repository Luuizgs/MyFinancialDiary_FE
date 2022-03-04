import { Component, OnInit } from '@angular/core';
import { ILancamento } from 'src/app/Interfaces/ILancamento';
import { v4 as Guidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastAddedLancamentos: ILancamento[] = [ ];
  totalLancamentos: ILancamento[] = [ ];
  arrayTipos:string[] = [
    'Cartão Débito',
    'Cartão Crédito',
    'Dinheiro',
    'Pix'
  ];
  chartData: any;
  chartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.loadLancamentos();
    this.loadChart(); 
  }


  loadLancamentos() {
    for (let index = 0; index < 15; index++) {
      const element: ILancamento = {
        
        id: this.getLancamentoId(),
        data: this.getLancamentoData(),
        tipo: index % 2 == 0 ? 'Débito' : 'Crédito',
        tipoTransacao: this.getTipo() ,
        valor: `R$ ${ ((index + 1) * 100) / 2 },00`,
        Obs: index % 2 == 0 ? 'Nenhuma' : 'Teste'

      };
      this.totalLancamentos.push(element);
    }

    for (let index = 0; index < 4; index++) {
      const element = this.totalLancamentos[index];
      this.lastAddedLancamentos.push(element);
    }

  }

  loadChart() {

    const groupBy = (array: any, key: any) => {
      return array.reduce((result: any, currentValue: any) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        
        return result;
      }, {}); 
    };

    const arrayGroupBy = groupBy(this.totalLancamentos, 'tipoTransacao');

    let dataSet: any = [ ];
    this.arrayTipos.forEach((item: any) => {
      let size: any;
      if (arrayGroupBy[item])
        size = arrayGroupBy[item].length;
      else 
        size = 0;
      dataSet.push(size);
    });

    this.chartData = {
      labels: this.arrayTipos,
      datasets: [
        {
          label: 'Lançamentos de Fevereiro',
          backgroundColor: '#42A5F5',
          data: dataSet
        }
      ]
    };

    this.chartOptions = {
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

  getLancamentoId(): string {
    return Guidv4();
  }

  getTipo() {
    const position = this.getRandomNumber(0, 3);

    return this.arrayTipos[position];
  }

  getLancamentoData():string {
    return this.getRandomNumber(1, 28) + '/02' + '/2022';
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
