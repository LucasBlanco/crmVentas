import { HttpParams } from '@angular/common/http';

export const groupBy = (campo: string) => (params: HttpParams) => params.append('groupBy[]', campo);

export const filter = (campo: string, valor: string | number) => (params: HttpParams) => {
    return params.append(`filters[${campo}][]`, valor.toString());
};