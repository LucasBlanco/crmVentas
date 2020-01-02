// Angular
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core.module';
import { PartialsModule } from '../partials/partials.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { MailModule } from './apps/mail/mail.module';
import { AsignacionBasesModule } from './asignacion-bases/asignacion-bases.module';
import { CrmModule } from './crm/crm.module';
import { MyPageComponent } from './my-page/my-page.component';
import { UserManagementModule } from './user-management/user-management.module';
import {ControlOperadorasModule} from "./control-operadoras/control-operadoras.module";
import { ModalBreakComponent } from './modal-break/modal-break.component';
import { LandingComponent } from './landing/landing.component';
import {VisualizarSeguimientosModule} from "./visualizar-seguimientos/visualizar-seguimientos.module";

// Partials
// Pages
@NgModule({
	declarations: [MyPageComponent, LandingComponent],
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
		AsignacionBasesModule,
		ControlOperadorasModule,
		VisualizarSeguimientosModule
	],
	providers: []
})
export class PagesModule {
}
