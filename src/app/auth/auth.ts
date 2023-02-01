export interface Auth {
    accessToken: string,
    user: {
        id: number,
        name: string,
        surname: string,
        email: string,
        password: string,
    }
}

export interface AuthRegister {
    name: string,
    surname: string,
    email: string,
    password: string,
}

export interface AuthLogin{
    email: string,
    password: string
}