import React, { createContext, useContext, useState, ReactNode } from "react";
import {
    REDIRECT_URI,
    SCOPE,
    RESPONSE_TYPE,
    CDN_IMAGE,
    CLIENT_ID
} from "../configs";
import { api } from "../services/api";
import * as AuthSession from 'expo-auth-session';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    toke: string;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string;
    }
}



type AuthContextData = {
    user: User;
    signIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);


    async function signIn() {
        try {

            setLoading(true)
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const { type, params} = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;

            // if(type === "success"){
            //     api.defaults.headers.autorization
            // }
        } catch (error) {
            throw new Error('Não foi possível autenticar');
        }

    }
    return (
        <AuthContext.Provider value={{
            user,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    useAuth,

}