import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailsComponent } from 'src/app/components/ticket-details/ticket-details.component';
import { Headers } from 'src/app/model/form/basic-table';
import { Ticket } from 'src/app/model/form/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history-tickets',
  templateUrl: './history-tickets.component.html',
  styleUrls: ['./history-tickets.component.scss']
})
export class HistoryTicketsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any;

  searchTicketBuilder: FormGroup;
  headersTable: Headers[] = [];
  dataSource = new MatTableDataSource<Ticket>();
  data: Ticket[] =[];

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,
      private _ticketService: TicketService) {
    this.searchTicketBuilder = this._formBuilder.group({
      text: [''],
    });

    this.headersTable = [
      { key: "numTicket", title: "Número de ticket" },
      { key: "openDate", title: "Fecha de apertura", pipe: "date" },
      { key: "status", title: "Estatus" },
      { key: "summary", title: "Resumen" },
      { key: "details", title: "Ver detalles", icon: "description", colorIcon: "red-banorte" }
    ];

    this.dataSource = new MatTableDataSource<Ticket>();
    this.dataSource.paginator = this.paginator;

 }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data = this._ticketService.getHistoryTickets();
    this.dataSource.data = this.data;
  }
  openDetailModal = (dataRow: any) => {
    let width = '60vw';
    let height = '95vh';
    this.dialog.open(TicketDetailsComponent, {
      width, height, data: dataRow, position: {right:'5px', top: '10px'}, autoFocus: false });
  }

  applyFilter(filterValue: any) {
    const filterString = filterValue.target.value.trim().toLowerCase();
    if (filterString != '') {
      const filterData = this.data.filter((ticket) =>
        ticket.numTicket?.trim().toLowerCase().includes(filterString));
      this.dataSource.data = filterData;
    } else {
      this.getData();
    }
  }

}
