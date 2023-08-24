import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BanorteToolbarComponent } from './banorte-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { GuiService } from 'src/app/services/gui.service';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';

describe('BanorteToolbarComponent', () => {
  let component: BanorteToolbarComponent;
  let fixture: ComponentFixture<BanorteToolbarComponent>;

  let _guiServiceSpy: jasmine.SpyObj<GuiService>
  let _keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    _guiServiceSpy = jasmine.createSpyObj(
      '_guiService',
      [
        'userData$'
      ]
    );

    _keycloakServiceSpy = jasmine.createSpyObj(
      'KeycloakService',
      [
        'logout'
      ]
    );

    await TestBed.configureTestingModule({
      declarations: [BanorteToolbarComponent],
      imports: [
        MatIconModule,
        MatChipsModule,
        MatToolbarModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: GuiService,
          useValue: {
            userData$: of({
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              isAdmin: false
            })
          }
        },
        {
          provide: KeycloakService,
          useValue: _keycloakServiceSpy
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanorteToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Logout', () => {
    const btn = fixture.nativeElement.querySelector('#btn-logout') as HTMLElement;
    btn.click();

    expect(_keycloakServiceSpy.logout).toHaveBeenCalled();
  });

});
