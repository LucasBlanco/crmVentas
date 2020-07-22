import { Paginator, PaginatorData } from './paginator';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Example:

data: […]
current_page: 1
from: 1
to: 15
total: 204623
last_page: 13642
per_page: 15
last_page_url: "http://ventas.test/ventas?page=13642"
next_page_url: "http://ventas.test/ventas?page=2"
path: "http://ventas.test/ventas"
first_page_url: "http://ventas.test/ventas?page=1"
prev_page_url: null
*/
export interface LaravelPaginatorData {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export class LaravelPaginatorAdapter<T> extends Paginator<T>{

    constructor(
        loadFunction: (params: HttpParams) => Observable<LaravelPaginatorData>,
        builder: (data: any) => T
    ) {
        super(
            (params: HttpParams) => loadFunction(params).pipe(map(this.mapToPaginatorDataload)),
            builder
        );
    }

    private mapToPaginatorDataload(paginationData: LaravelPaginatorData): PaginatorData<T> {
        return {
            currentPage: paginationData.current_page,
            data: paginationData.data,
            from: paginationData.from,
            to: paginationData.to,
            total: paginationData.total,
            lastPage: paginationData.last_page,
            perPage: paginationData.per_page,
            path: paginationData.path,
            firstPageUrl: paginationData.first_page_url,
            lastPageUrl: paginationData.last_page_url,
            nextPageUrl: paginationData.next_page_url,
            prevPageUrl: paginationData.prev_page_url,
        };
    }
}