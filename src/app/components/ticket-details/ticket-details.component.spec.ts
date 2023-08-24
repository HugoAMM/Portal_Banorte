import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketDetailsComponent } from './ticket-details.component';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;

  const dataMatDialog = { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatListModule, MatDividerModule,
        MatIconModule, NoopAnimationsModule],
      declarations: [ TicketDetailsComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataMatDialog },
        { provide: MatDialogRef, useValue: { close() { } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.closeModal();
    expect(component).toBeTruthy();
  });
});
