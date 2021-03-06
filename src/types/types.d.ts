type LoginForm = (value: any ) => void;
type Register = (value: any) => void;
type CheckLogin = (value: any) => boolean;

type Colors = {
    theme: string,
    current: string,
}

type Menus = {
    name: string,
    to: string,
    icon: object,
    exact: boolean,
}

type Accounts = {
    username: string,
    password: string,
}

type Staff = {
    id: string,
    name: string,
    email: string,
}