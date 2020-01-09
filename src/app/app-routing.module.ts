import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth';
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';

// Angular
// Components
// Auth
const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule) },

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'crm',
				loadChildren: () => import('app/views/pages/crm/crm.module').then(m => m.CrmModule)
			},
			{
				path: 'asignacionBases',
				loadChildren: () => import('app/views/pages/asignacion-bases/asignacion-bases.module').then(m => m.AsignacionBasesModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard-posta/dashboard-posta.module').then(m => m.DashboardPostaModule)
			},
			{
				path: 'controlOperadoras',
				loadChildren: () => import('app/views/pages/control-operadoras/control-operadoras.module').then(m => m.ControlOperadorasModule)
			},
			{
				path: 'visualizarSeguimientos',
				loadChildren: () => import('app/views/pages/visualizar-seguimientos/visualizar-seguimientos.module').then(m => m.VisualizarSeguimientosModule)
			},
			{
				path: 'mail',
				loadChildren: () => import('app/views/pages/apps/mail/mail.module').then(m => m.MailModule)
			},
			{
				path: 'ecommerce',
				loadChildren: () => import('app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'ngbootstrap',
				loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
			},
			{
				path: 'material',
				loadChildren: () => import('app/views/pages/material/material.module').then(m => m.MaterialModule)
			},
			{
				path: 'user-management',
				loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			},
			{
				path: 'wizard',
				loadChildren: () => import('app/views/pages/wizard/wizard.module').then(m => m.WizardModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
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
