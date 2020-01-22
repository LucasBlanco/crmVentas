import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ChartComponent } from '../../components/chart/chart.component';
import { LandingComponent } from '../landing/landing.component';
import { UserService } from './../../services/user.service';
import { SupervisorCallComponent } from './supervisor-call/supervisor-call.component';
import { VendedoraComponent } from './vendedora/vendedora.component';
import { WidgetComponent } from './widget/widget.component';

const dashboard = () => {


};

@Injectable()
class Guard implements CanActivate {

  constructor(private userSrv: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    try {
      const user = this.userSrv.getCurrentUser();
      const esSupervisor = user.perfiles.some(p => p.toLocaleLowerCase() === 'supervisor call');
      const esOperador = user.perfiles.some(p => p.toLocaleLowerCase() === 'operador venta');
      const id = user.id;
      if (esSupervisor) {
        if (state.url === '/dashboard/supervisorcall' || state.url.includes('/dashboard/vendedora/')) {
          return of(true);
        }
        this.router.navigateByUrl('/dashboard/supervisorcall');
      }
      if (esOperador) {
        if (state.url.includes('/dashboard/vendedora/')) {
          return of(true);
        }
        this.router.navigateByUrl('/dashboard/vendedora/' + id);
      }
      if (state.url === '/dashboard/landing') {
        return of(true);
      }
      this.router.navigateByUrl('/dashboard/landing');
      return of(true);
    } catch {
      this.router.navigateByUrl('/dashboard/landing');
      return of(true);
    }
  }
}

const routes: Routes = [
  { path: 'supervisorcall', component: SupervisorCallComponent, canActivate: [Guard] },
  { path: 'vendedora/:id', component: VendedoraComponent, canActivate: [Guard] },
  { path: 'landing', component: LandingComponent, canActivate: [Guard] }
];

@NgModule({
  declarations: [SupervisorCallComponent, ChartComponent, WidgetComponent, VendedoraComponent, LandingComponent],
  providers: [Guard],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardPostaModule { }
