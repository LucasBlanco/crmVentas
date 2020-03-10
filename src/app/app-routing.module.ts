import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth';
import { CargaVisitaComponent } from './views/pages/cargar-datos/carga-visita/carga-visita.component';
import {
    FormularioCargaDatosConVisitaComponent,
} from './views/pages/cargar-datos/formulario-carga-datos-con-visita/formulario-carga-datos-con-visita.component';
import {
    FormularioCargaDatosComponent,
} from './views/pages/cargar-datos/formulario-carga-datos/formulario-carga-datos.component';
import {
    VentasPendientesDeVisitaComponent,
} from './views/pages/cargar-datos/ventas-pendientes-de-visita/ventas-pendientes-de-visita.component';
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';


// Angular
// Components
// Auth
const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'crm',
				loadChildren: () => import('./views/pages/crm/crm.module').then(m => m.CrmModule)
			},
			{
				path: 'asignacionBases',
				loadChildren: () => import('./views/pages/asignacion-bases/asignacion-bases.module').then(m => m.AsignacionBasesModule)
			},
			{
				path: 'estadisticas',
				loadChildren: () => import('./views/pages/estadisticas/estadisticas.module').then(m => m.EstadisticasModule)
			},
			{
				path: 'controlOperadoras',
				loadChildren: () => import('./views/pages/control-operadoras/control-operadoras.module').then(m => m.ControlOperadorasModule)
			},
			{
				path: 'cargarDatos',
				component: FormularioCargaDatosComponent
			},
			{
				path: 'cargarDatosConVisita',
				component: FormularioCargaDatosConVisitaComponent
			},
			{
				path: 'cargarVisita/:idVenta',
				component: CargaVisitaComponent
			},
			{
				path: 'cargarVisita',
				component: CargaVisitaComponent
			},
			{
				path: 'ventasPendientesDeVisita',
				component: VentasPendientesDeVisitaComponent
			},
			{
				path: 'visualizarSeguimientos',
				loadChildren: () => import('./views/pages/visualizar-seguimientos/visualizar-seguimientos.module')
					.then(m => m.VisualizarSeguimientosModule)
			},
			{
				path: 'mail',
				loadChildren: () => import('./views/pages/apps/mail/mail.module').then(m => m.MailModule)
			},
			{
				path: 'ecommerce',
				loadChildren: () => import('./views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'ngbootstrap',
				loadChildren: () => import('./views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
			},
			{
				path: 'material',
				loadChildren: () => import('./views/pages/material/material.module').then(m => m.MaterialModule)
			},
			{
				path: 'user-management',
				loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			},
			{
				path: 'wizard',
				loadChildren: () => import('./views/pages/wizard/wizard.module').then(m => m.WizardModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'landing', pathMatch: 'full' },
			{ path: '**', redirectTo: 'landing', pathMatch: 'full' },
			{ path: 'landing', redirectTo: 'dashboard/landing', pathMatch: 'full' },
		]
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
