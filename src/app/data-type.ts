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
    productId:undefined|string
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

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface orderData{
id:string,
address : string,
email:string,
contact:number,
totalPrice:number,
orderType:string,
userId:string
}