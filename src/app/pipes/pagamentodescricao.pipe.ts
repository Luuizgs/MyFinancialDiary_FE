import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagamentoDescricao'
})
export class PagamentoDescricaoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    
    switch (value) {
      case 1:
        return 'Crédito';
      case 2:
        return 'Débito';
      default:
        break;
    }
    return null;
  }

}
