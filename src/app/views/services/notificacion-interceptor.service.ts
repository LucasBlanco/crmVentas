import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificacionInterceptorService implements HttpInterceptor{

  constructor(private _snackBar: MatSnackBar) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('hola')

		if(req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')
		{
			next.handle(req).subscribe(
				(data) => {
					if(data instanceof HttpResponse)
					this._snackBar.open('La accion se realizo con exito', 'x', {
							duration: 2000
						})},
							(error) => this._snackBar.open(error.error.title, "x", {
								duration: 2000,
							})
					)
		}

		return next.handle(req)


	}
}
