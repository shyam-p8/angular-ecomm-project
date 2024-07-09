import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {


  showLogin=false;
  authError:string='';

  constructor(private sellerService: SellerService) {

  }
  ngOnInit(): void {
   this.sellerService.reloadSeller();
  }
  
  signUp(data: signUp): void {
    this.sellerService.userSignUp(data);
  }

  openLogin() {
    this.showLogin=true;
    }

    openSignUp(){
      this.showLogin=false;
    }
    login(data:login){
      this.sellerService.userLogin(data);
      this.sellerService.isLoginError.subscribe((isError)=>{
        if(isError){
          this.authError="email or password is not correct";
        }
      })
    }
}
