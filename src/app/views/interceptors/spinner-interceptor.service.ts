import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ShowOverlayService } from './show-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(private showOverlay: ShowOverlayService, private _snackBar: MatSnackBar, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showOverlay.initRequest();
    const nextHandle = next.handle(req);
    return nextHandle.pipe(
      tap((data) => {
        if (data instanceof HttpResponse) {
          this.showOverlay.endRequest();
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          this.showOverlay.endRequest();
        }
        return throwError(error);
      })
    );
  }
}
