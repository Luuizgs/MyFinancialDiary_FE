import { JwtHelperService } from "@auth0/angular-jwt";
export function DecodeToken(token: string) {
    return new JwtHelperService().decodeToken(token);
}