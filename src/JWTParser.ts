import { jwtDecode } from "jwt-decode";
import type {UserModel} from "./interfaces/UserModel.ts";

interface JWTPayload
{
    sub: string;
    given_name: string;
    family_name: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string | string[];
}

export function getUserFromJWT(token: string): UserModel
{
    const decodedToken = jwtDecode<JWTPayload>(token);

    const roleClaim = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const roles: string[] = Array.isArray(roleClaim) ? roleClaim : roleClaim ? [roleClaim] : [];

    return {
        id: decodedToken.sub,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        roles: roles,
    };
}