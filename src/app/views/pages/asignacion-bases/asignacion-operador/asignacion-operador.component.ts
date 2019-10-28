import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '@modelos/persona';
import { Observable } from 'rxjs';

import { FuentesService } from './../../../services/fuentes.service';

@Component({
  selector: 'crm-asignacion-operador',
  templateUrl: './asignacion-operador.component.html',
  styleUrls: ['./asignacion-operador.component.scss', '../../styles/table.scss']
})
export class AsignacionOperadorComponent implements OnInit {

  dataSource: MatTableDataSource<Persona>;
  personas: Observable<Persona[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private route: ActivatedRoute, private fuentesSrv: FuentesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.personas = this.fuentesSrv.traerUno(Number(id));
    this.personas.subscribe(personas => {
      this.dataSource = new MatTableDataSource([...personas, ...personas, ...personas, ...personas, ...personas, ...personas, ...personas]);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
