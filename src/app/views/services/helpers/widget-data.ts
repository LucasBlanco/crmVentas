import * as moment from 'moment';

export class WidgetData {

    labels: string[];
    datasets: any[];
    constructor(chart) {
        this.labels = chart.labels;
        this.datasets = chart.datasets;
    }

    get valorActual() {
        const index = this.labels.findIndex(l => l === moment().format('YYYY-MM-DD'));
        return this.datasets[0].data[index];
    }
}