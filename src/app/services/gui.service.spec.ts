import { TestBed } from '@angular/core/testing';

import { GuiService } from './gui.service';
import { IKeyCloakUser } from '../model/keycloak/keycloak-user.model';

describe('GuiService', () => {
  let service: GuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('CloakUser', () => {
    const email = "boc@portal.mx";
    const user: IKeyCloakUser = { email };
    service.setKeycloakUser(user);
    expect(service.getKeycloakUser().email).toBe(email);
  });

});
