/*import {Chart, ChartDataSet} from "@modelos/charts/Charts";
import {ILineChartData} from "@modelos/charts/line";

export interface IBarChartData{
	labels: string[],
	datasets: BarChartDataSet[]
}

export interface IBarChart{
	type:string
	data: IBarChartData;
}

export class BarChart extends Chart implements IBarChart{
	type = 'bar';
	data: IBarChartData;
	constructor(contacto: IBarChart) {
		super();
		this.data = contacto.data;
	}
}

export interface IBarChartDataSet{
	label: string
	data: number[]
	backgroundColor: string
	borderColor:string
	minBarLength:number
}

export class BarChartDataSet extends ChartDataSet{
	minBarLength:number;
	constructor(contacto: IBarChartDataSet) {
		super(contacto);
		this.minBarLength= contacto.minBarLength;
	}
}
*/