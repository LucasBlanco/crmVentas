import {Chart, ChartDataSet,} from "@modelos/charts/Charts";

export interface ILineChart{
	type:string
	data: ILineChartData;
}

export class LineChart extends Chart implements ILineChart{
	type = 'line'
	data: ILineChartData;
	constructor(contacto: ILineChart) {
		super()
		this.data = contacto.data;
	}
}

export interface ILineChartData {
	labels: string[],
	datasets: LineChartDataSet[]
}


export interface ILineChartDataSet {
	label: string
	data: number[]
	backgroundColor: string
	borderColor:string
	fill:string,
	clip:number
}

export class LineChartDataSet extends ChartDataSet{
	fill:string
	clip:number
	constructor(contacto: ILineChartDataSet) {
		super(contacto);
		this.fill = contacto.fill;
		this.clip = contacto.clip;
	}
}
