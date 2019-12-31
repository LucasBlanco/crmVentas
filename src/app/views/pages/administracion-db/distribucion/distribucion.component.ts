import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.scss']
})
export class DistribucionComponent implements OnInit {
  Math = Math;
  public total = 0;
  public change = false;
  public distribucion = [{
    name: 'usuarios',
    index: 0,
    value: 70
  },
  {
    name: 'db5',
    index: 1,
    value: 10
  },
  {
    name: 'db41',
    index: 2,
    value: 5
  },
  {
    name: 'db91',
    index: 3,
    value: 15
  },
  {
    name: 'db18',
    index: 4,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 5,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 6,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 7,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 8,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 9,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 10,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 11,
    value: 0
  }
    ,
  {
    name: 'db18',
    index: 12,
    value: 0
  }
  ];
  private percentages = [];
  private newPercentages = [];
  formatLabel(value: number) {
    return value + '%';
  }

  changePercentage(value, index) {
    this.newPercentages[index] = value;
    this.total = this.newPercentages.reduce((accumulator: number, currentValue: number) => Number(accumulator) + Number(currentValue));
    this.change = true;
  }

  checkPercentage() {
    if (this.total > 100) {
      alert('Tus porcentajes no suman 100%, revisa el total en la esquina inferior izquierda.');
    }
  }
  constructor() { }

  ngOnInit() {
    this.distribucion.forEach((element) => {
      this.percentages.push(element.value);
      this.newPercentages.push(element.value);
      this.total += element.value;
      this.change = false;
    });
  }

}
