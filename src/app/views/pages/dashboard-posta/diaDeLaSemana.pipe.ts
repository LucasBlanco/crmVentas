import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({ name: 'diaDeLaSemana' })
export class DiaDeLaSemana implements PipeTransform {
    transform(fecha: string): string {
        return moment(fecha, 'YYYY-MM-DD').locale('es').format('dddd');
    }
}