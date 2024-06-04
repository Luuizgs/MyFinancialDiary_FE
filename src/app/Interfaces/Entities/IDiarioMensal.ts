import { IGasto } from "./IGasto";

export interface IDiarioMensal {
    id: number,
    mes: string,
    ano: string,
    createdOn: Date,
    lastUpdate: Date,

    usuarioId: string,

    gastos: IGasto[]
}