import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orderData, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  

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
    alert("order placed and order id: "+result.id);
    this.router.navigate(['/my-orders']);
    
  }
  });
  }

}
