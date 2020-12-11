import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.scss']
})
export class SingleBarChartComponent implements OnInit {

  @Input() showXAxisLabel: boolean;

  @Input() xAxisLabel: string;

  @Input() showYAxisLabel: boolean;

  @Input() yAxisLabel: string;

  @Input() single: any[];

  @Input() view: number[];

  @Input() colorScheme = {
    domain: ['#5cb85c', '#C7B42C', '#0275d8','#aae3f5']
  };

  constructor() { }

  ngOnInit() {
  }

}
