import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HistoryTicketsComponent } from './history-tickets/history-tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateTicketComponent, HistoryTicketsComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    ComponentsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
})
export class TicketsModule { }
