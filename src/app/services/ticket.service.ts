import { Injectable } from '@angular/core';
import tickets from 'db/tickets.json';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  getHistoryTickets() {
    return tickets.tickets;
  }
}
