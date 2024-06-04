import { IUsuario } from "./IUsuario";

export interface IUserStorage {
    token: string;
    user: IUsuario
}