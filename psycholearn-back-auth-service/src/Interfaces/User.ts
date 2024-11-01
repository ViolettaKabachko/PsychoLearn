export interface User {
    name: string,
    surname: string,
    email: string,
    password: string
};

export const userGuard = (obj: object): obj is User => {
    return ["email", "name", "surname", "password"].every(x => Object.getOwnPropertyDescriptor(obj, x) !== undefined)
}