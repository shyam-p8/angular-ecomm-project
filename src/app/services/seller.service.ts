import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient, private router: Router) { }

  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false);

  userSignUp(data:signUp){
    return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.isSellerLoggedIn.next(true);
        localStorage.setItem("seller",JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
    })
  }
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']);
  }
}

userLogin(data:login){
  console.warn(data);
  this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
    console.warn(result.body)
    if(result && result.body && result.body.length===1){
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      this.isLoginError.emit(false);
    }else{
      console.warn("login failed");
      this.isLoginError.emit(true);
    }
  });
}

}
