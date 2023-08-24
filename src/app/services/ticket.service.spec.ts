import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';
import { Component } from '@angular/core';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get history tickets', () => {
    const tickets = service.getHistoryTickets();
    expect(tickets.length).toBeGreaterThan(0);
  });
});
