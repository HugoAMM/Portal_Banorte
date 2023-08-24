import { TestBed } from '@angular/core/testing';
import swal from 'sweetalert2';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showSweetWarning', () => {
    service.showSweetWarning('title', 'text');
    expect(swal.isVisible()).toBe(true);
  });

  it('showSweetWarningHTML', () => {
    service.showSweetWarningHTML('title', 'html');
    expect(swal.isVisible()).toBe(true);

    service.showSweetWarningHTML('title', 'html', 200);
    expect(swal.isVisible()).toBe(true);
  });
});
