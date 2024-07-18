export interface signUp{
    id:string
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
    category:string,
    quantity:undefined|number,
}

export interface cart{
    id:string | undefined,
    name:string,
    price:number,
    color:string,
    description:string,
    image:string,
    category:string,
    quantity:undefined|number,
    productId:string,
    userId:string
}