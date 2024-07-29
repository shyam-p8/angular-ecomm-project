import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, orderData, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  [x: string]: any;
  
  currentCart:cart[]|undefined;
  orderMsg:string|undefined;
  priceSummary : priceSummary={
    price:0,
      discount:0,
      tax:0,
      delivery:0,
      total:0
   }
  constructor(private productService : ProductService, private router:Router){

  }
  ngOnInit(): void {
      this.productService.currentCart().subscribe((result) => {
      let price=0;
      if (result) {
        this.currentCart=result;
      result.forEach((item)=>{
          if(item.quantity){
      price=price + (+item.price * +item.quantity);
          }
        });
        this.priceSummary.price=price;
        this.priceSummary.delivery=100;
        this.priceSummary.discount=price*.1;
        this.priceSummary.tax=price*.12
        this.priceSummary.total=price + this.priceSummary.delivery - this.priceSummary.discount + this.priceSummary.tax;
       }
    });
   }

  orderNow(order : orderData){
  order.totalPrice=this.priceSummary.total;
  order.orderType='cash'
  let user =localStorage.getItem('user');
   order.userId=user && JSON.parse(user).id;
  this.productService.orderNow(order).subscribe((result)=>{
  if(result){
    this.orderMsg="your order has been placed. thansk!"
    this.currentCart?.forEach((item)=>{
     setTimeout(()=>{ item.id && this.productService.removeToCart(item.id).subscribe((res)=>{console.warn('this data deleted from cart',res)})},300);
    }) ;  
   setTimeout(()=>{this.router.navigate(['/my-orders']); this.orderMsg=undefined}, 3000);
  }
  });
  }

}
