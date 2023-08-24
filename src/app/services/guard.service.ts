import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { GuiService } from './gui.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService extends KeycloakAuthGuard {

  private ADMIN_ROLE = "manage-account";

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private _guiService: GuiService) {
    super(router, keycloak)
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Getting user's data.
    const userData = await this.keycloak.loadUserProfile();
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const username = userData.username;
    const email = userData.email;
    const isAdmin = this.keycloak.getUserRoles().includes(this.ADMIN_ROLE);


    this._guiService.setKeycloakUser({ firstName, lastName, username, email, isAdmin });


    return Promise.resolve(this.authenticated);
  }


}
