import { FormaPagamento } from '../Interfaces/Entities/Enum/FormaPagamento.enum';
import { Tipo } from '../Interfaces/Entities/Enum/Tipo.enum';

export function toCamelCase(text: string): string {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}

export function GetExpensesList() {
  let valueArray = Object.keys(Tipo).map((key) => ({ key, value: Tipo[+key] }));
  valueArray = valueArray.splice(0, 7);
  let expensesList: any[] = [];

  for (let index = 0; index < valueArray.length; index++) {
    const element = valueArray[index];
    expensesList.push({ name: element.value, code: +element.key });
  }
  return expensesList;
}

export function GetPaymentTypeList() {
  let valueArray = Object.keys(FormaPagamento).map((key) => ({
    key,
    value: FormaPagamento[+key],
  }));
  valueArray = valueArray.splice(0, 2);
  let paymentTypeList: any[] = [];

  for (let index = 0; index < valueArray.length; index++) {
    const element = valueArray[index];
    paymentTypeList.push({ name: element.value, code: +element.key });
  }
  return paymentTypeList;
}

export function getTodosMeses() {
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
  return meses;
}

export function getTipoDescription(value: any) {
  switch (value) {
    case Tipo.Alimentacao:
      return 'Alimentacao';
      break;
    case Tipo.Carro:
      return 'Carro';
      break;
    case Tipo.Midia:
      return 'Midia';
      break;
    case Tipo.Moradia:
      return 'Moradia';
      break;
    case Tipo.Outros:
      return 'Outros';
      break;
    case Tipo.Pessoal:
      return 'Pessoal';
      break;
    case Tipo.Saude:
      return 'Saude';
      break;
    default:
      return '';
      break;
  }
}

export function getFormaPagamentoDescription(value: any) {
  switch (value) {
    case FormaPagamento.Credito:
      return 'Credito';
      break;
    case FormaPagamento.Debito:
      return 'Debito';
      break;
    default:
      return '';
      break;
  }
}
