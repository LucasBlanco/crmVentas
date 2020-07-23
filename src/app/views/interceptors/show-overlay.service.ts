import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowOverlayService {

  cantRequests$ = new BehaviorSubject<number>(0);

  constructor() {
    this.cantRequests$.subscribe(c => console.log(c));
  }

  get show$() {
    return this.cantRequests$.pipe(
      map(cant => cant !== 0)
    );
  }

  initRequest() {
    this.cantRequests$.next(this.cantRequests$.value + 1);
  }

  endRequest() {
    this.cantRequests$.next(this.cantRequests$.value - 1);
  }
}
