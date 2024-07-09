import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  addProduct(data:product){
    console.warn("product service called with data",data);
   return this.httpClient.post<product>('http://localhost:3000/product',data);
  }
  productList(){
    return this.httpClient.get<product[]>('http://localhost:3000/product');
  }

  deleteProduct(id:string){
    return this.httpClient.delete(`http://localhost:3000/product/${id}`);
  }
  getProduct(id:string){
    return this.httpClient.get<product>(`http://localhost:3000/product/${id}`)
  }

  updateProduct(data:product){
    return this.httpClient.put<product>(`http://localhost:3000/product/${data.id}`,data);
  }
popularProducts(){
  return this.httpClient.get<product[]>('http://localhost:3000/product?_limit=3');  
}
trendyProducts(){
  return this.httpClient.get<product[]>('http://localhost:3000/product?_limit=8');  
}
searchProduct(query:string){
  return this.httpClient.get<product[]>(`http://localhost:3000/product?q=${query}`);
}
}
