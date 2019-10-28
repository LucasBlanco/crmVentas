import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fuente } from '@modelos/fuente';
import { FuentesService } from '@servicios/fuentes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-fuentes',
  templateUrl: './fuentes.component.html',
  styleUrls: ['./fuentes.component.scss', '../../styles/table.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuentesComponent implements OnInit {

  fuentes: Observable<Fuente[]>;
  dataSource: MatTableDataSource<Fuente>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private fuentesSrv: FuentesService) { }

  ngOnInit() {
    this.fuentes = this.fuentesSrv.traerTodos();
    this.fuentes.subscribe(fuentes => {
      this.dataSource = new MatTableDataSource([...fuentes, ...fuentes, ...fuentes, ...fuentes, ...fuentes, ...fuentes, ...fuentes]);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
