import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Operador } from '@modelos/operador';
import { Persona } from '@modelos/persona';
import { FuentesService } from '@servicios/fuentes.service';
import { OperadoresService } from '@servicios/operadores.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'crm-asignacion-operador',
  templateUrl: './asignacion-operador.component.html',
  styleUrls: ['./asignacion-operador.component.scss', '../../styles/table.scss']
})
export class AsignacionOperadorComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Persona>;
  personas$: BehaviorSubject<Persona[]>;
  operadores$: BehaviorSubject<Operador[]>;
  operadoresFiltrados$: Observable<Operador[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selection: SelectionModel<Persona>;
  form = new FormGroup({
    personas: new FormControl([], Validators.required),
    operador: new FormControl('', Validators.required)
  });

  get personas() { return this.form.get('personas'); }
  get operador() { return this.form.get('operador'); }

  constructor(private route: ActivatedRoute, private fuentesSrv: FuentesService, private operadoresSrv: OperadoresService) {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Persona>(allowMultiSelect, initialSelection);
  }

  ngOnInit() {

    this.route.url.subscribe((url: UrlSegment[]) => {
      const id = url[1].path;
      this.personas$ = this.fuentesSrv.traerUno(Number(id));
      this.operadores$ = this.operadoresSrv.traerTodos();
      this.iniciarAutocompleteOperador();
      this.iniciarTabla();
    });

  }

  iniciarTabla() {
    this.dataSource = new MatTableDataSource(this.personas$.value);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.selection.changed.subscribe(sel => {
      this.personas.setValue(sel.source.selected);
    });
  }

  iniciarAutocompleteOperador() {
    this.operadoresFiltrados$ = this.form.get('operador').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this.filterOperadores(name) : this.operadores$.value)
      );
  }

  filterOperadores = name => {
    const filterValue = name.toLowerCase();
    return this.operadores$.value.filter(op => op.nombre.toLowerCase().includes(filterValue));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getNombreOperador(operador: Operador) {
    return operador.nombre;
  }

  ngOnDestroy() {
    this.personas$.unsubscribe();
    this.operadores$.unsubscribe();
  }
}
