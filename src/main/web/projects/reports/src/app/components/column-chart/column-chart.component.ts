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

  colorScheme = {
    domain: ['#5cb85c', '#C7B42C', '#0275d8','#aae3f5']
  };

  constructor() { }

  ngOnInit() {  }

}
