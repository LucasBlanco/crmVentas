import { HttpParams } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';

export interface PaginatorData<T> {
    currentPage: number;
    from: number;
    to: number;
    total: number;
    lastPage: number;
    perPage: number;
    data: any[];
    path: string;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string;
    prevPageUrl: string | null;

}


export class Paginator<T>{

    protected _data = new ReplaySubject<T[]>();
    protected paginationInfo: Omit<PaginatorData<T>, 'data'> = {
        currentPage: 0,
        from: 0,
        to: 0,
        total: 0,
        lastPage: 0,
        perPage: 0,
        path: '',
        firstPageUrl: '',
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
    };

    constructor(
        private loadFunction: (params: HttpParams) => Observable<PaginatorData<T>>,
        private builder: (data: any) => T
    ) { }

    loadFirstPage() {
        this.loadPage(1);
    }

    loadNextPage() {
        const nextPage = this.currentPage + 1;
        if (nextPage > this.lastPage) { return; }
        this.loadPage(nextPage);
    }

    loadPreviousPage() {
        const previousPage = this.currentPage - 1;
        if (previousPage === 0) { return; }
        this.loadPage(previousPage);
    }

    loadLastPage() {
        this.loadPage(this.lastPage);
    }

    loadPage(pageNumber: number) {
        const params = new HttpParams().append('page', pageNumber.toString());
        this.loadFunction(params).subscribe(paginationData => {
            const { data, ...paginationInfo } = paginationData;
            this._data.next(data.map(this.builder));
            this.paginationInfo = paginationInfo;
        });
    }


    get data() { return this._data; }
    get currentPage() { return this.paginationInfo.currentPage; }
    get from() { return this.paginationInfo.from; }
    get to() { return this.paginationInfo.to; }
    get total() { return this.paginationInfo.total; }
    get lastPage() { return this.paginationInfo.lastPage; }
    get perPage() { return this.paginationInfo.perPage; }
    get path() { return this.paginationInfo.path; }
    get firstPageUrl() { return this.paginationInfo.firstPageUrl; }
    get lastPageUrl() { return this.paginationInfo.lastPageUrl; }
    get nextPageUrl() { return this.paginationInfo.nextPageUrl; }
    get prevPageUrl() { return this.paginationInfo.prevPageUrl; }

}
