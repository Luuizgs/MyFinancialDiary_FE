import { IPaginationRequest } from "./IPaginationRequest";

export interface IDiarioMensalRequest extends IPaginationRequest {
    searchMes?: string,
    searchAno?: string,
    orderBy?: string,
    sortDirection?: string,
    usuarioId: string
}