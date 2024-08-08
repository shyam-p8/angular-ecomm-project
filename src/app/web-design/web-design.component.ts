import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { meterData, meterReading } from '../data-type';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.css']
})
export class WebDesignComponent {

  meterReadings: meterReading[] | undefined;
  constructor(private httpClient: HttpClient) { }
  getMeterReading(meterData: meterData) {

    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBTVJDRUxMIiwidXNlciI6IkFNUkNFTEwiLCJyb2xlIjoiQU1SQ0VMTCIsInN0YXR1cyI6ImFjdGl2ZSIsImlhdCI6MTcyMjg1MjU5NiwiZXhwIjoxNzIyODU2MTk2fQ.OrKzQcXhhQzVK-HlGuyinea5QilAlPuYgzkh8euzCvLZ1P9M6V6QEH36lMS1uvGx'};

    // https://rebilling.mpwin.co.in:4200/rebilling/meter_reading/meterNo/Q0715867/history
    /* */


    // console.warn("meter no =",meterData.meterNo);
    // this.httpClient.get<meterReading[]>('https://rebilling.mpwin.co.in:4200/rebilling/meter_reading/meterNo/Q0715867/history', { headers }).subscribe((res)=>{
    //   if(res){
    //     console.warn(res);
    //     this.meterReadings=res;
    //   }
    // });

    //this.loginService.loginUser(userData).subscribe({next:suc=>{console.log("login successful",suc.toString)},error:err=>{ console.log("invalid user try again",err)}});
    console.warn("meter no =", meterData.meterNo);
    this.httpClient.get<meterReading[]>('https://rebilling.mpwin.co.in:4200/rebilling/meter_reading/meterNo/Q0715867/history',{ headers, observe: 'response'})
      .subscribe({
        next: res => {
          if (res.status==200) {
            if (res.body) {
              this.meterReadings=res.body;
              console.warn("res.status==200: ", res.statusText)
            }
          }
         

        }, error: err => {
        if (err.status == 401) { console.log("invalid user id or password try again status=", err.status,"status text=", err.statusText); }
        else if (err.status == 404) { console.log("404 error status=", err.status,"status text=", err.statusText); }
         else if (err) { console.warn("error:err status= ", err.status, err.statusText) } }
      });
  }

}
