import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BanorteSidenavComponent } from './banorte-sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivationEnd, Event, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe('BanorteSidenavComponent', () => {
  let component: BanorteSidenavComponent;
  let fixture: ComponentFixture<BanorteSidenavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanorteSidenavComponent ],
      imports: [ MatIconModule, MatButtonToggleModule, HttpClientModule, RouterModule,
        RouterTestingModule.withRoutes([
          { path: 'tickets/create', redirectTo: '' },
          { path: 'tickets/history', redirectTo: '' }
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanorteSidenavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    const events$ = router.events as Subject<Event>;
    events$.next(new NavigationStart(1, "url"));
    expect(component).toBeTruthy();
  });

  it('validate selected menu branch', () => {
    const url = 'http://localhost/tickets/history';
    const spyWindow = spyOn(component, 'getLocation').and.returnValue(url);

    const events$ = router.events as Subject<Event>;
    events$.next(new NavigationEnd(1, "url", "urlAfter"));
    
    component.validateSelectedMenu();
    expect(component.selectedMenu).toBe('history');
    expect(spyWindow).toHaveBeenCalled();
  });

  it('validate selected menu branch create-ticket', () => {
    const url = 'http://localhost/tickets/create';
    const spyWindow = spyOn(component, 'getLocation').and.returnValue(url);
    
    component.validateSelectedMenu();
    expect(component.selectedMenu).toBe('create-ticket');
    expect(spyWindow).toHaveBeenCalled();
  });
});
