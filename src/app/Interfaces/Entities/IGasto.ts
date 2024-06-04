import { FormaPagamento } from "./Enum/FormaPagamento.enum";
import { Tipo } from "./Enum/Tipo.enum";

export interface IGasto {
    id: number,
    dataLancamento: Date,
    valor: number,
    descricao: string,
    observacao?: string,
    tipo: Tipo,
    formaPagamento: FormaPagamento,
    recorrente: boolean,
    nomeCartao: string,
    parcelas: number,
    dataInicio: Date,
    dataTermino: Date,
    diarioMensalId: number
}