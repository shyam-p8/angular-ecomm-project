import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {


  addMessage: string | undefined;
  constructor(private productService: ProductService) { }

  submit(data: product) {
    // console.warn(data);
    this.productService.addProduct(data).subscribe((res) => {
      if (res) {
        this.addMessage = "product is added successfully";
      }
    });
    setTimeout(() => this.addMessage = undefined, 3000);
  }


}
