import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
import { locale as chLang } from './core/_config/i18n/ch';
import { locale as deLang } from './core/_config/i18n/de';
import { locale as enLang } from './core/_config/i18n/en';
import { locale as esLang } from './core/_config/i18n/es';
import { locale as frLang } from './core/_config/i18n/fr';
import { locale as jpLang } from './core/_config/i18n/jp';
import { AfkService } from './views/services/afk.service';

// Angular
// Layout
// language list
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	mouseMoveObservable = new Subject<any>()
	@HostListener('mousemove', ['$event'])
	onMousemove(event: MouseEvent) {
		this.mouseMoveObservable.next()
	}
	// Public properties
	title = 'Metronic';
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(private translationService: TranslationService,
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private splashScreenService: SplashScreenService,
		private afkService: AfkService) {

		// register translations
		this.afkService.subscribeToMouseMove(this.mouseMoveObservable)
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
