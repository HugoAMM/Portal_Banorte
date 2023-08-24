import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HistoryTicketsComponent } from './history-tickets/history-tickets.component';

const routes: Routes = [
  { path: '', component: CreateTicketComponent },
  { path: 'create', component: CreateTicketComponent },
  { path: 'history', component: HistoryTicketsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule { }
