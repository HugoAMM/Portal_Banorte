import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: 'tickets',
    canActivate: [GuardService],
    loadChildren: () =>
      import('./pages/tickets/tickets.module').then((m) => m.TicketsModule),
  },
  {
    path: '**',
    redirectTo: '/tickets/create',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
