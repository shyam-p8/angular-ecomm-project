import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { meterReading } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class RebillingServiceService {
  constructor(private httpClient: HttpClient) { }
  getMeterReading(meterNo: string) {

    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJBTVJDRUxMIiwidXNlciI6IkFNUkNFTEwiLCJyb2xlIjoiQU1SQ0VMTCIsInN0YXR1cyI6ImFjdGl2ZSIsImlhdCI6MTcyMjkzMDQ2OSwiZXhwIjoxNzIyOTM0MDY5fQ.my8ARzT1Hn6-JPNsHxOO77oj0diwdCWKGPuGoaDZJLy-QeVS56g69rvqdNsHoTmv' };
    //this.loginService.loginUser(userData).subscribe({next:suc=>{console.log("login successful",suc.toString)},error:err=>{ console.log("invalid user try again",err)}});
    console.warn("meter no =", meterNo);
   return this.httpClient.get<meterReading[]>('https://rebilling.mpwin.co.in:4200/rebilling/meter_reading/meterNo/' + meterNo + '/history', { headers, observe: 'response' });
  }


}
