import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct:undefined|product[];
  trendyProducts:undefined|product[];
  constructor(private productService:ProductService){ }
  ngOnInit(): void {
   this.productService.popularProducts().subscribe((res)=>{
    if(res){
    this.popularProduct=res;
    console.warn(this.popularProduct)}});
    this.productService.trendyProducts().subscribe((result)=>{
      this.trendyProducts=result;
    });
  }

	

}
