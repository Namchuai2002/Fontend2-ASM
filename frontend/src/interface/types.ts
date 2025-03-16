export interface IStudent {
    id: number|string,
    name: string,
    birday: string,
    image: string,
    industry:string
}

export type StudenForm = Omit<IStudent, "id">
export interface IUser{
    id: number,
    name: string,
    phone:string,
    email: string,
    password:string
}

export type UserLogin = Pick<IUser, "email"|"password">
export type UserRegister = Omit<IUser,"id">
