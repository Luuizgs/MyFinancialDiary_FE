import { BaseResponse } from "../Responses/BaseResponse";

export interface IUsuario {
    id: string;
    primeiroNome: string;
    segundoNome?: string;
    email?: string;
    username:string;
}