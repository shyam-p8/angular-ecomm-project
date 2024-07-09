export interface signUp{
    name:string,
    email:string,
    password:string
}

export interface login{
    email:string,
    password:string
}

export interface product{
    id:string
    name:string,
    price:number,
    color:string,
    description:string,
    image:string,
    category:string
}