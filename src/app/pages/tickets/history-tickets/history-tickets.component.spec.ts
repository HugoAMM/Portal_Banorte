import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HistoryTicketsComponent } from './history-tickets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BasicTableComponent } from 'src/app/components/basic-table/basic-table.component';
import { SimpleTablePipe } from 'src/app/pipes/simple-table.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { TicketService } from 'src/app/services/ticket.service';


describe('HistoryTicketsComponent', () => {
  let component: HistoryTicketsComponent;
  let fixture: ComponentFixture<HistoryTicketsComponent>;
  let dialogSpy: jasmine.Spy;
  let ticketServiceStub: Partial<TicketService>;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  const data = [
    {
      numTicket: "GTR",
      openDate: "2019-06-15T16:51:08.681Z",
      closedDate: "2019-06-15T16:51:08.681Z",
      status: "",
      summary: "",
      description: "",
      assignedTo: "",
      solution: ""
    },
    {
      numTicket: "AMR",
      openDate: "2019-06-15T16:51:08.681Z",
      closedDate: "2019-06-15T16:51:08.681Z",
      status: "",
      summary: "",
      description: "",
      assignedTo: "",
      solution: ""
    }
  ];

  ticketServiceStub = {
    getHistoryTickets: () => data
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTicketsComponent, BasicTableComponent, SimpleTablePipe ],
      imports: [ MatIconModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, NoopAnimationsModule, MatDialogModule,
        MatIconModule, MatPaginatorModule, RouterTestingModule ],
      providers: [
        FormBuilder,
        { provide: TicketService, useValue: ticketServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applyFilter', () => {
    let numTicket = "GTR";
    let filterValue = {
      target: {
        value: numTicket
      }
    };

    component.applyFilter(filterValue);
    expect(component.dataSource.data[0].numTicket).toBe(numTicket);
  });

  it('applyFilter branch', () => {
    let filterValue = {
      target: {
        value: ""
      }
    };

    component.applyFilter(filterValue);
    expect(component.dataSource.data.length).toBe(data.length);
  });

  it('Open modal', () => {

    const dataRow = { ticketNum: 'GTR'};
    component.openDetailModal(dataRow);
    expect(dialogSpy).toHaveBeenCalled();
  });

});
