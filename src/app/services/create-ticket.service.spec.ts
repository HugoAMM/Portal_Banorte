import { TestBed } from '@angular/core/testing';

import { CreateTicketService } from './create-ticket.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateTicketService', () => {
  let service: CreateTicketService;
  let _httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    _httpClientSpy = jasmine.createSpyObj('service', [
      'post',
    ])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: _httpClientSpy
        }
      ],
    });
    service = TestBed.inject(CreateTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
