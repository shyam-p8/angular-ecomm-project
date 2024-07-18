import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = "";
  constructor(private userService: UserService, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    this.userService.userSignUp(data);
  }
  login(data: login) {
    console.warn("calling this.userService.userLogin(data);")
    this.userService.userLogin(data);
    console.warn("return from this.userService.userLogin(data);")
    console.warn("now executing this.userService.invalidUserAuth.subscribe((result)")
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter correct user details"
      } else {
        console.warn("calling this.localCartToRemoteCart();");
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSingUp() {
    this.showLogin = false;
  }
  //this function add local storage cart product to DB cart when user logged in. 
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartDataList.forEach((element: product, index) => {
        let cartData: cart = {
          ...element,
          productId: element.id,
          userId: userId
        };
        delete cartData.id
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.warn("local item stored in DB")
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });

    }

  }
}
