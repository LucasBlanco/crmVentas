import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Fuente } from '@modelos/fuente';
import { FuentesService } from '@servicios/fuentes.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'crm-fuentes',
  templateUrl: './fuentes.component.html',
  styleUrls: ['./fuentes.component.scss', '../../styles/table.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuentesComponent implements OnInit {

  fuentes$: BehaviorSubject<Fuente[]>;
  dataSource: MatTableDataSource<Fuente>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private fuentesSrv: FuentesService, private router: Router) { }

  ngOnInit() {
    this.fuentes$ = this.fuentesSrv.traerTodos();
    this.fuentes$.subscribe(fuentes => {
      this.dataSource = new MatTableDataSource(fuentes);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToAsignacionBases(id) {
    this.router.navigateByUrl('/asignacionBases/operador/' + id);
  }

}
