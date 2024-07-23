import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "";
  sellerName: string = "";
  searchResult: undefined | product[];
  userName: string = "";
  cartItems: number = 0;
  constructor(private router: Router, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller'
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }});
      let cartData=localStorage.getItem('localCart');
      if(cartData){
        this.cartItems=JSON.parse(cartData).length;
      }
      this.productService.totalCartData.subscribe((item)=>{
        this.cartItems=item.length;
      })
  }
  sellerLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.totalCartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.warn(element.value);
      this.productService.searchProduct(element.value).subscribe((result) => {
        //console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  searchSubmit(val: string) {
    this.router.navigate([`search/${val}`]);
  }
  redirectToDetail(id: string) {//search result link
    this.router.navigate(['details/' + id]);
  }

}
