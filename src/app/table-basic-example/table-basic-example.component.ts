import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { meterData, meterReading, PeriodicElement } from '../data-type';
import { RebillingServiceService } from '../services/rebilling-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css']
})
export class TableBasicExampleComponent implements AfterViewInit{
  meterReadings!: meterReading[];
  constructor(private rebillingService: RebillingServiceService) { }
  dataSource = new MatTableDataSource<meterReading>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  displayedColumns: string[] = ['id', 'meterNo', 'readingDate', 'eactiveEnergy'];
  getMeterRead(meterData: meterData) {
    meterData.meterNo && this.rebillingService.getMeterReading(meterData.meterNo).subscribe({
      next: res => {
        if (res.status == 200) {
          if (res.body) {
            this.meterReadings = res.body;
            this.dataSource.data=this.meterReadings;
            console.warn("res.status==200: ", res.statusText)
          }
        }
      },
      error: err => {
        if (err.status == 401) { console.log("invalid user id or password try again status=", err.status, "status text=", err.statusText); }
        else if (err.status == 404) { console.log("404 error status=", err.status, "status text=", err.statusText); }
        else if (err) { console.warn("error:err status= ", err.status, err.statusText) }
      }
    }
    );
  }
  
 
    
 
}

