import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Tipo } from 'src/app/Interfaces/Entities/Enum/Tipo.enum';
import { IGasto } from 'src/app/Interfaces/Entities/IGasto';
import { GastoService } from 'src/app/services/gasto.service';
import {
  GetExpensesList,
  getFormaPagamentoDescription,
  GetPaymentTypeList,
  getTipoDescription,
} from 'src/app/utils/FuncHelpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos-modal',
  templateUrl: './gastos-modal.component.html',
  styleUrls: ['./gastos-modal.component.scss'],
})
export class GastosModalComponent implements OnInit {
  @Input()
  public showModalGastos: boolean = false;

  @Input()
  public diarioMensalId: number;

  public gastos: IGasto[] = [];

  gasto: any;

  headerModal: string;

  displayGastoModal: boolean = false;

  listOfExpenses: any[] = [];

  despesaDropdown: any[] = [];
  selectedExpense: any;

  paymentTypeDropdown: any[] = [];
  selectedPayment: any;

  selectedGasto: any = {};

  recorrenteChecked: boolean = false;

  constructor(
    private gastoService: GastoService,
    private datePipeService: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.despesaDropdown = GetExpensesList();
    this.paymentTypeDropdown = GetPaymentTypeList();
    this.selectedGasto = {
      dataLancamento: '',
      diarioMensalId: 0,
      valor: '',
      tipo: '',
      formaPagamento: '',
      descricao: '',
      recorrente: false,
      dataInicio: '',
      dataTermino: '',
      parcelas: '',
      observacao: '',
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.showModalGastos) this.GetGastos();
  }

  async GetGastos() {
    const response = await this.gastoService.GetGastosByDiarioMensal(
      this.diarioMensalId
    );
    console.log('Modal Response = ', response);
    this.gastos = response.gastos;
    console.log('Modal gastos = ', this.gastos);
    this.getExpensesList(this.gastos);
  }

  openGasto(gasto: IGasto, header: string) {
    this.headerModal = header;
    console.log('Gasto -> ', gasto);
    if (gasto) {
      this.selectedGasto = {
        id: gasto.id,
        diarioMensalId: gasto.diarioMensalId,
        dataLancamento: this.datePipeService.transform(
          gasto.dataLancamento,
          'yyyy-MM-dd'
        ),
        valor: gasto.valor,
        tipo: { name: getTipoDescription(gasto.tipo), code: gasto.tipo },
        formaPagamento: {
          name: getFormaPagamentoDescription(gasto.formaPagamento),
          code: gasto.formaPagamento,
        },
        descricao: gasto.descricao,
        recorrente: gasto.recorrente ? true : false,
        nomeCartao: gasto.nomeCartao,
        dataInicio: this.datePipeService.transform(
          gasto.dataInicio,
          'yyyy-MM-dd'
        ),
        dataTermino: this.datePipeService.transform(
          gasto.dataTermino,
          'yyyy-MM-dd'
        ),
        parcelas: '',
        observacao: gasto.observacao,
      };
    } else {
      this.selectedGasto = {
        id: null,
        diarioMensalId: this.diarioMensalId,
        dataLancamento: this.datePipeService.transform(
          new Date(),
          'yyyy-MM-dd'
        ),
        valor: '',
        tipo: '',
        formaPagamento: '',
        descricao: '',
        recorrente: false,
        nomeCartao: '',
        dataInicio: '',
        dataTermino: '',
        parcelas: '',
        observacao: '',
      };
    }
    this.displayGastoModal = true;
  }

  closeModal(valor: any) {
    this.showModalGastos = !valor;
    this.listOfExpenses = [];
  }

  async saveGastoModal() {
    let gasto: IGasto;
    let response: any;
    if (this.selectedGasto.id) {
      gasto = {
        dataLancamento: this.selectedGasto.dataLancamento,
        descricao: this.selectedGasto.descricao,
        diarioMensalId: this.selectedGasto.diarioMensalId,
        id: this.selectedGasto.id,
        valor: this.selectedGasto.valor,
        tipo: this.selectedGasto.tipo.code,
        formaPagamento: this.selectedGasto.formaPagamento.code,

        recorrente: this.selectedGasto.recorrente,
        dataInicio: this.selectedGasto.recorrente
          ? this.selectedGasto.dataInicio
          : null,
        dataTermino: this.selectedGasto.recorrente
          ? this.selectedGasto.dataTermino
          : null,
        observacao: this.selectedGasto.recorrente
          ? this.selectedGasto.observacao
          : null,
        parcelas: this.selectedGasto.recorrente
          ? this.selectedGasto.parcelas
          : null,
        nomeCartao: this.selectedGasto.recorrente
          ? this.selectedGasto.nomeCartao
          : null,
      };
      
      console.log('Request for API - UPDATE');
      console.log('Gasto - Update ', gasto);
      response = await this.gastoService.UpdateGasto(gasto);
      console.log('Response: ', response);
    } else {
      gasto = {
        dataLancamento: this.selectedGasto.dataLancamento,
        descricao: this.selectedGasto.descricao,
        diarioMensalId: this.selectedGasto.diarioMensalId,
        id: 0,
        valor: this.selectedGasto.valor,
        tipo: this.selectedGasto.tipo.code,
        formaPagamento: this.selectedGasto.formaPagamento.code,

        recorrente: this.selectedGasto.recorrente,
        dataInicio: this.selectedGasto.recorrente
          ? this.selectedGasto.dataInicio
          : null,
        dataTermino: this.selectedGasto.recorrente
          ? this.selectedGasto.dataTermino
          : null,
        observacao: this.selectedGasto.recorrente
          ? this.selectedGasto.observacao
          : null,
        parcelas: this.selectedGasto.recorrente
          ? this.selectedGasto.parcelas
          : null,
        nomeCartao: this.selectedGasto.recorrente
          ? this.selectedGasto.nomeCartao
          : null,
      };
      
      console.log('Request for API - POST');
      response = await this.gastoService.AddGasto(gasto);
      console.log('Response: ', response);
    }

    if (response.success) {
      this.redirect();
    }
  }

  redirect() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then( () => {
      this.router.navigate(['/in/diariomensal']);
    })
  }

  getExpensesList(gastos: IGasto[]) {
    let valueArray = Object.keys(Tipo).map((key) => ({
      key,
      value: Tipo[+key],
    }));
    valueArray = valueArray.splice(0, 7);

    for (let index = 0; index < valueArray.length; index++) {
      const element = valueArray[index];

      this.howManyExpenses(this.gastos, element);
    }
  }

  howManyExpenses(gastos: IGasto[], tipo: any) {
    let expenseType = {
      color: '',
      expense: '',
      howMany: 0,
    };
    let contador = 0;
    if (gastos.length > 0) {
      for (let index = 0; index < gastos.length; index++) {
        const element = gastos[index];
        if (element.tipo == +tipo.key) {
          expenseType.expense = tipo.value;
          contador++;
        } else {
          expenseType.expense = tipo.value;
        }
      }
    }
    else {
      expenseType.expense = tipo.value;
    }

    switch (+tipo.key) {
      case Tipo.Alimentacao:
        expenseType.color = '#ddebf7';
        break;
      case Tipo.Carro:
        expenseType.color = '#bde394';
        break;
      case Tipo.Midia:
        expenseType.color = '#ffe081';
        break;
      case Tipo.Moradia:
        expenseType.color = '#f9e7fe';
        break;
      case Tipo.Outros:
        expenseType.color = '#d9e1f2';
        break;
      case Tipo.Pessoal:
        expenseType.color = '#efbfd5';
        break;
      case Tipo.Saude:
        expenseType.color = '#d3bdff';
        break;
      default:
        break;
    }
    expenseType.howMany = contador;

    this.listOfExpenses.push(expenseType);
  }
}
