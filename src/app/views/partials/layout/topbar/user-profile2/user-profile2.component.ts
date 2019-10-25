import { Router } from '@angular/router';
// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
	// Public properties
	user$: Observable<User>;
	user: { nombre: string };
	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>, private router: Router) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		//this.user$ = this.store.pipe(select(currentUser));
		console.log('user', JSON.parse(localStorage.getItem('tokenInfo')))
		this.user = JSON.parse(localStorage.getItem('tokenInfo'))
	}

	/**
	 * Log out
	 */
	logout() {
		// this.store.dispatch(new Logout());
		localStorage.setItem('tokenInfo', '');
		this.router.navigateByUrl('/auth/login');
	}
}
