import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | product[];
  productMessage:undefined|string;
  icon=faTrash;
  editIcon=faEdit;
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
   this.getProduct();
  }

  getProduct(){
    this.productService.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
    });
  }
  deleteItem(id:string){

    this.productService.deleteProduct(id).subscribe((res)=>{
     if(res){
      this.productMessage="Product Deleted Successfully.";
      this.getProduct();
     }
    });
    setTimeout(()=>this.productMessage=undefined,3000);

  }

}
