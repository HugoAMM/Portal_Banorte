import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-banorte-sidenav',
  templateUrl: './banorte-sidenav.component.html',
  styleUrls: ['./banorte-sidenav.component.scss']
})
export class BanorteSidenavComponent implements OnInit {

  selectedMenu: string;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    private router: Router) {

    const iconPathLogo = '../../../../assets/img/icons/icon-logo-banorte.svg';
    const securePathLogo = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPathLogo);
    this.matIconRegistry.addSvgIcon("logo-banorte", securePathLogo);

    const iconPathTicket = '../../../../assets/img/icons/icon-create-ticket.svg';
    const securePathTicket = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPathTicket);
    this.matIconRegistry.addSvgIcon("create-ticket", securePathTicket);

    const iconPathHistory = '../../../../assets/img/icons/icon-tickets-history.svg';
    const securePathHistory = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPathHistory);
    this.matIconRegistry.addSvgIcon("tickets-history", securePathHistory);

    const iconPathSupport = '../../../../assets/img/icons/icon-support.svg';
    const securePathSupport = this.domSanitizer.bypassSecurityTrustResourceUrl(iconPathSupport);
    this.matIconRegistry.addSvgIcon("support", securePathSupport);

    this.selectedMenu = 'create-ticket';
  }

  ngOnInit(): void {
    this.validateSelectedMenu();

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.validateSelectedMenu();
      }
    })
  }

  validateSelectedMenu() {
    const url = this.getLocation();
    const urlSplit = url.split('/');
    if (urlSplit[3] == 'tickets') {
      if (urlSplit[4] == 'history') {
        this.selectedMenu = 'history';
      } else {
        this.selectedMenu = 'create-ticket';
      }
    }
  }

  getLocation() {
    return window.location.href;
  }

}
