import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';

import { NgApexchartsModule } from 'ng-apexcharts';

import { BanorteToolbarComponent } from './banorte-toolbar/banorte-toolbar.component';
import { BanorteSidenavComponent } from './banorte-sidenav/banorte-sidenav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SimpleTablePipe } from '../pipes/simple-table.pipe';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormWsaComponent } from './category-forms/form-wsa/form-wsa.component';
import { FormBaseComponent } from './category-forms/form-base/form-base.component';
import { FormFwsComponent } from './category-forms/form-fws/form-fws.component';


@NgModule({
  declarations: [
    BanorteToolbarComponent,
    BanorteSidenavComponent,
    BasicTableComponent,
    SimpleTablePipe,
    TicketDetailsComponent,
    FormWsaComponent,
    FormBaseComponent,
    FormFwsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgApexchartsModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule
  ],
  exports: [
    BanorteToolbarComponent,
    BanorteSidenavComponent,
    BasicTableComponent,
    FormWsaComponent,
    FormFwsComponent
  ]
})
export class ComponentsModule { }
