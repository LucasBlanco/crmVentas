import { LandingComponent } from './views/pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth';
import {
	FormularioCargaDatosComponent,
} from './views/pages/cargar-datos/formulario-carga-datos/formulario-carga-datos.component';
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
				path: 'visualizarSeguimientos',
				loadChildren: () => import('./views/pages/visualizar-seguimientos/visualizar-seguimientos.module')
					.then(m => m.VisualizarSeguimientosModule)
			},
			{
				path: "landing",
				component: LandingComponent
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
		]
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule],
	declarations: [
		LandingComponent
	]
})
export class AppRoutingModule {
}
