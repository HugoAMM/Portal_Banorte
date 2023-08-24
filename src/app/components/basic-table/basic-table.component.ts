import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Headers } from 'src/app/model/form/basic-table';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
})
export class BasicTableComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<any>; //Data for show un rows
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @Input() headers: Headers[] = []; //Headers for show data
  @Input()
  clickRowBody!: ((dataRow: any) => void); //Function to execute when click a row
  @Input() getModalHeight: Function | undefined;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTooltipMessage(data: any, header: any) {
    /*
      When the data has a field tooltip true,
      we get the message for show from data for that specific cell
    */
    const tooltipHeader = data.tooltipColumns.find((item: any) => item.key == header.key);
    if (tooltipHeader) {
      const tooltipData = data.tooltipMessages.find((item: any) => item.key == header.key);
      if (tooltipData) {
        return tooltipData.message;
      }
    }
    return null;
  }
}
