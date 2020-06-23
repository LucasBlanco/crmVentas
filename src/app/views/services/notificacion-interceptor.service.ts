import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NotificacionInterceptorService implements HttpInterceptor {

	constructor(private _snackBar: MatSnackBar) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('hola');
		const nextHadle = next.handle(req);
		return nextHadle.pipe(
			catchError((error) => {
				this._snackBar.open(error.error.title, "x", { duration: 2000, });
				return of(error);
			}),
			tap((data) => {
				if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
					if (data instanceof HttpResponse) {
						this._snackBar.open('La accion se realizo con exito', 'x', {
							duration: 2000
						});
					}
				}
			})
		);
	}
}
