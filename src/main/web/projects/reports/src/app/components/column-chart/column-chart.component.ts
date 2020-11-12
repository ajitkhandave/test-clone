import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {

  @Input() showXAxisLabel: boolean;

  @Input() xAxisLabel: string;

  @Input() showYAxisLabel: boolean;

  @Input() yAxisLabel: string;

  @Input() single: any[];

  constructor() { }

  ngOnInit() {  }

}
