import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicTableComponent } from './basic-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SimpleTablePipe } from 'src/app/pipes/simple-table.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BasicTableComponent', () => {
  let component: BasicTableComponent;
  let fixture: ComponentFixture<BasicTableComponent>;

  const dataMatDialog = { }

  let data = [
    { numTicket: "numTicket 1", rol: "status 1", tooltip: false},
    { numTicket: "numTicket 2", rol: "status 2", tooltip: false},
    { numTicket: "numTicket 3", rol: "status 3", tooltip: false},
    { numTicket: "numTicket 4", rol: "status 4", tooltip: false},
    { numTicket: "numTicket 5", rol: "status 5", tooltip: false},
  ];
  let headers = [
    { key: "numTicket", title: "Usuario"},
    { key: "rol", title: "Rol"}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatTooltipModule, MatIconModule,
        MatPaginatorModule, NoopAnimationsModule],
      declarations: [ BasicTableComponent, SimpleTablePipe ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataMatDialog },
        { provide: MatDialogRef, useValue: { close() { } } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableComponent);
    component = fixture.componentInstance;
    component.headers = headers;
    component.dataSource.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create rows', () => {
    const trElements = fixture.nativeElement.querySelector('tbody').querySelectorAll('tr');
    expect(trElements.length).toBe(data.length);
  });

  it('get tooltip message', () => {
    const tooltipMessage = "Here!";
    let dataTooltip= { 
      numTicket: "numTicket 2", rol: "status 2", tooltip: true, tooltipColumns: [{key: 'numTicket'}], tooltipMessages: [{key: 'numTicket', message: tooltipMessage}]
    };
    let message = component.getTooltipMessage(dataTooltip, headers[0]);
    expect(message).toBe(tooltipMessage);

    dataTooltip= { 
      numTicket: "numTicket 2", rol: "status 2", tooltip: true, tooltipColumns: [{key: 'numTicket'}], tooltipMessages: [{key: 'rol', message: tooltipMessage}]
    };
    message = component.getTooltipMessage(dataTooltip, headers[0]);
    expect(message).toBe(null);

    message = component.getTooltipMessage(dataTooltip, headers[1]);
    expect(message).toBe(null);
  });
});
