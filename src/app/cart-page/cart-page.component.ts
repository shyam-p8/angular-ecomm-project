import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData:cart[]|undefined;
 priceSummary : priceSummary={
  price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
 }
  constructor(private productService: ProductService, private router:Router) {

  }

  ngOnInit(): void {
    this.productService.currentcart().subscribe((result) => {
      let price=0;
      if (result) {
        this.cartData=result;
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

  checkout(){
    this.router.navigate(['/checkout']);
  }

}
