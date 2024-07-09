import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage:undefined|string;
  constructor(private activedRoute: ActivatedRoute, private productService: ProductService,
    private router:Router) {

  }
  ngOnInit(): void {
    let productId = this.activedRoute.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((res) => {
      this.productData = res;
    });
  }

  submit(data: product) {
    if(this.productData)
      data.id=this.productData.id;

    this.productService.updateProduct(data).subscribe((result)=>{
      if(result)
        this.productMessage="product is updated";
    });
    setTimeout(()=>{this.productMessage=undefined;
      this.router.navigate(['seller-home']);

    },3000);
  }

}
