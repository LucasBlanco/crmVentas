import {Persona} from "../persona";
import {IContacto} from "../contacto";

export interface IChartEjeXTiempo{
	labels: string[],
	datasets: IChartDataSet[]
}

export interface IChartDataSet {
	label: string,
	data: number[],
	backgroundColor: string,
	borderColor:string,
}

export class ChartDataSet implements IChartDataSet{
	label: string
	data: number[]
	backgroundColor: string
	borderColor:string
	constructor(contacto: IChartDataSet) {
		this.label = contacto.label;
		this.data = contacto.data;
		this.backgroundColor = contacto.backgroundColor;
		this.borderColor= contacto.borderColor;
	}
}


export class ChartEjeXTiempo implements IChartEjeXTiempo{
	labels: string[];
	datasets: IChartDataSet[];
	constructor(contacto: IChartEjeXTiempo) {
		this.labels = contacto.labels;
		this.datasets = contacto.datasets;
	}
}


export abstract class Chart{
	type: string
	data: ChartData
}

export class ChartData implements IChartData{
	labels: string[]
	datasets: ChartDataSet[]
	constructor(contacto: IChartData) {
		this.labels = contacto.labels;
		this.datasets= contacto.datasets;
	}
}

export interface IChartData{
	labels: string[],
	datasets: ChartDataSet[]
}



