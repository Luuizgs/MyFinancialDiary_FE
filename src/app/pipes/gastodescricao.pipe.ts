import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gastoDescricao'
})
export class GastoDescricaoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 1:
        return 'Moradia';
      case 2:
        return 'Midia';
      case 3:
        return 'Alimentação';
      case 4:
        return 'Pessoal';
      case 5:
        return 'Carro';
      case 6:
        return 'Saúde';
      case 7:
        return 'Outros';
      default:
        break;
    }
    return null;
  }

}
