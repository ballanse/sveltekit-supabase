import type { ServiceResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { get, post } from "$lib/utils/EndpointClient";
import type { Session } from "@supabase/gotrue-js";
import cookie from 'cookie'

export async function login(user: LoginUserModel): Promise<ServiceResponse<Session>> {

    try {
        return await post<LoginUserModel, Session>('api/user/login', user);

    } catch (err) {
        console.log(err);
    }
}

export async function register(user: RegisterUserModel): Promise<ServiceResponse<Session>> {

    try {
        return await post<RegisterUserModel, Session>('api/user/register', user);

    } catch (err) {
        console.log(err);
    }
}

export async function logout(): Promise<ServiceResponse<void>> {

    try {
        return await post('api/user/logout');

    } catch (err) {
        console.log(err);
    }
}

export function setSessionHeaders(session: Session) {
    return {
        'Set-Cookie':
            cookie.serialize(
                'access_token', session.access_token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: session.expires_in * 1000,
                path: "/"
            })
    }
}

export function clearSessionHeaders() {
    console.log("clearing cookie")
    return {
        'set-cookie': 'access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}
