export interface IDonaChartData{
	labels: string[],
	datasets: DonaChartDataSet[]
}

export interface IDonaChart{
	type:string
	data: IDonaChartData;
}

export class DonaChart implements IDonaChart{
	type = 'doughnut';
	data: IDonaChartData;
	constructor(contacto: IDonaChart) {
		this.data = contacto.data;
		this.type = contacto.type;
	}
}

export interface IDonaChartDataSet{
	data: number[]
	backgroundColor: string[]
}

export class DonaChartDataSet{
	data:number[]
	backgroundColor: string[]
	constructor(contacto: IDonaChartDataSet) {
		this.data = contacto.data;
		this.backgroundColor = contacto.backgroundColor;
	}
}

