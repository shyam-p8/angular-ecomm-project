import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orderData } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
 
  myOrders : orderData[] | undefined;
 constructor(private productService:ProductService){

 }
  ngOnInit(): void {
     this.getOrderList();
  }

getOrderList(){
  this.productService.myOrders().subscribe((res)=>{
    this.myOrders=res;
   });
}

cancelOrder(orderId:string|undefined){

  orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{
if(result){
  alert("order cancelled");
  this.getOrderList();
}
  })

}

}
