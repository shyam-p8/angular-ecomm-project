import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  totalCartData = new EventEmitter<product[] | []>();

  constructor(private httpClient: HttpClient) { }
  addProduct(data: product) {
    console.warn("product service called with data", data);
    return this.httpClient.post<product>('http://localhost:3000/product', data);
  }
  productList() {
    return this.httpClient.get<product[]>('http://localhost:3000/product');
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`http://localhost:3000/product/${id}`);
  }
  getProduct(id: string) {
    return this.httpClient.get<product>(`http://localhost:3000/product/${id}`)
  }

  updateProduct(data: product) {
    return this.httpClient.put<product>(`http://localhost:3000/product/${data.id}`, data);
  }
  popularProducts() {
    return this.httpClient.get<product[]>('http://localhost:3000/product?_limit=3');
  }
  trendyProducts() {
    return this.httpClient.get<product[]>('http://localhost:3000/product?_limit=8');
  }
  searchProduct(query: string) {
    return this.httpClient.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }
  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.totalCartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.totalCartData.emit(cartData)
    }
   // this.totalCartData.emit(cartData);
  }
  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.totalCartData.emit(items);
    }
  }
  addToCart(cartData:cart){
    return this.httpClient.post<cart>("http://localhost:3000/cart",cartData);
  }

  getCartList(userId:string){
    return this.httpClient.get<product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).
    subscribe((result)=>{
    if(result && result.body){
      this.totalCartData.emit(result.body);
    }
    });
  }


}
