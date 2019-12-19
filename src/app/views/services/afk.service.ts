import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfkService {

  constructor() { }

  subscribeToMouseMove(observable: Observable<any>) {
    observable.pipe(auditTime(1000)).subscribe(() => console.log('mouseMove'))
  }


}
