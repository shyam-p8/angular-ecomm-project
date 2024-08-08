import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { meterData, meterReading, PeriodicElement } from '../data-type';
import { RebillingServiceService } from '../services/rebilling-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-table-page-sort',
  templateUrl: './table-page-sort.component.html',
  styleUrls: ['./table-page-sort.component.css']
})

export class TablePageSortComponent implements AfterViewInit{
  meterReadings!: meterReading[];
  constructor(private rebillingService: RebillingServiceService,private _liveAnnouncer: LiveAnnouncer) { }
  dataSource = new MatTableDataSource<meterReading>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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

