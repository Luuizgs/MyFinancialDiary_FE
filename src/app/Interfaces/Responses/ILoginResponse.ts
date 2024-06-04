import { BaseResponse } from "./BaseResponse";

export interface ILoginResponse extends BaseResponse {
    token: string;
}