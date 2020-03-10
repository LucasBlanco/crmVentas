import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { PartialsModule } from '../partials/partials.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { MailModule } from './apps/mail/mail.module';
import { AsignacionBasesModule } from './asignacion-bases/asignacion-bases.module';
import { ControlOperadorasModule } from './control-operadoras/control-operadoras.module';
import { CrmModule } from './crm/crm.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { MyPageComponent } from './my-page/my-page.component';
import { UserManagementModule } from './user-management/user-management.module';
import { VisualizarSeguimientosModule } from './visualizar-seguimientos/visualizar-seguimientos.module';

// Angular

// Partials
// Pages
@NgModule({
	declarations: [MyPageComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		UserManagementModule,
		CrmModule,
		EstadisticasModule,
		AsignacionBasesModule,
		AsignacionBasesModule,
		ControlOperadorasModule,
		VisualizarSeguimientosModule
	],
	providers: []
})
export class PagesModule {
}
