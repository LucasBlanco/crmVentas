import 'hammerjs';

import { OverlayModule } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { AuthInterceptorService } from '@servicios/auth-interceptor.service';
import { NotificacionInterceptorService } from '@servicios/notificacion-interceptor.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import * as json from 'highlight.js/lib/languages/json';
import * as scss from 'highlight.js/lib/languages/scss';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as xml from 'highlight.js/lib/languages/xml';
import { InlineSVGModule } from 'ng-inline-svg';
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPermissionsModule } from 'ngx-permissions';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpUtilsService, LayoutUtilsService, TypesUtilsService } from './core/_base/crud';
import {
    DataTableService,
    FakeApiService,
    KtDialogService,
    LayoutConfigService,
    LayoutRefService,
    MenuAsideService,
    MenuConfigService,
    MenuHorizontalService,
    PageConfigService,
    SplashScreenService,
    SubheaderService,
} from './core/_base/layout';
import { LayoutConfig } from './core/_config/layout.config';
import { AuthService } from './core/auth';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './core/reducers';
import { AuthModule } from './views/pages/auth/auth.module';
import { CargarDatosModule } from './views/pages/cargar-datos/cargar-datos.module';
import { PartialsModule } from './views/partials/partials.module';
import { ThemeModule } from './views/theme/theme.module';
import { EstadisticasModule } from './views/pages/estadisticas/estadisticas.module';

// Angular
// Angular in memory
// Perfect Scroll bar
// SVG inline
// Env
// Hammer JS
// NGX Permissions
// NGRX
// State
// Copmponents
// Modules
// Partials
// Layout Services
// Auth
// CRUD
// Config
// Highlight JS
// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{ name: 'typescript', func: typescript },
		{ name: 'scss', func: scss },
		{ name: 'xml', func: xml },
		{ name: 'json', func: json }
	];
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
			passThruUnknownUrl: true,
			dataEncapsulation: false
		}) : [],
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		OverlayModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		ThemeModule,
		MatSnackBarModule,
		CargarDatosModule,
		EstadisticasModule

	],
	exports: [],
	providers: [
		AuthService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService], multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: NotificacionInterceptorService,
			multi: true
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
