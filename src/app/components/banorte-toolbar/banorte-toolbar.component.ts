import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-banorte-toolbar',
  templateUrl: './banorte-toolbar.component.html',
  styleUrls: ['./banorte-toolbar.component.scss']
})
export class BanorteToolbarComponent implements OnInit, OnDestroy {

  userName: string = '';
  initialLetter: string = '';

  userDataSubscription: Subscription = new Subscription;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    protected readonly keycloak: KeycloakService,
    private _guiService: GuiService) {
    const iconPath = '../../../../assets/img/icons/icon-logout.svg';
    const securePath = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath);
    this.matIconRegistry.addSvgIcon("logout", securePath);
  }

  ngOnInit(): void {
    this.userDataSubscription = this._guiService.userData$.subscribe((user: any) => {
      const fullName = user.firstName + ' ' + user.lastName;
      const userName = user.userName;
      this.userName = user.firstName && user.lastName ? fullName : userName;
      this.initialLetter = fullName.charAt(0).toUpperCase();
    }
    )
  };

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  logout = async () => {
    await this.keycloak.logout();
  }
}
