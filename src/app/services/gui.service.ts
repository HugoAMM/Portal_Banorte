import { Injectable } from '@angular/core';
import { IKeyCloakUser } from '../model/keycloak/keycloak-user.model';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  keycloakUser: IKeyCloakUser = {};

  isAdminBS: BehaviorSubject<boolean | undefined>;
  isAdmin$: Observable<boolean | undefined>;

  userDataBS: BehaviorSubject<object | undefined>;
  userData$: Observable<object | undefined>;

  constructor() {
    this.isAdminBS = new BehaviorSubject<boolean | undefined>(false);
    this.isAdmin$ = this.isAdminBS.asObservable();

    this.userDataBS = new BehaviorSubject<object | undefined>({});
    this.userData$ = this.userDataBS.asObservable();
  }

  setKeycloakUser = (user: IKeyCloakUser) => {
    this.keycloakUser = user;
    this.isAdminBS.next(user.isAdmin);
    this.userDataBS.next(user)
  }

  getKeycloakUser = () => this.keycloakUser;

}
