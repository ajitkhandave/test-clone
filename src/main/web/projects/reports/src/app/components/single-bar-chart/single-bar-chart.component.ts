import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.scss']
})
export class SingleBarChartComponent implements OnInit, OnDestroy {

  @Input() showXAxisLabel: boolean;

  @Input() xAxisLabel: string;

  @Input() showYAxisLabel: boolean;

  @Input() yAxisLabel: string;

  @Input() single: any[];

  @Input() view: number[];

  @Input() colorScheme = {
    domain: ['#5cb85c', '#C7B42C', '#0275d8', '#aae3f5']
  };

  @Input() activeOnClick: boolean;

  @Input() customColors: any[] = [];

  @Input() clearSelection: Subject<void>;

  @Output() onSelection: EventEmitter<any> = new EventEmitter();

  unsub$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit() {
    if (this.clearSelection) {
      this.clearSelection.pipe(
        takeUntil(this.unsub$)
      ).subscribe(() => this.clearColumnClick())
    }
  }

  clearColumnClick() {
    this.customColors = [];
  }

  onColumnClick(event) {
    if (!this.activeOnClick) { return; }
    const isSelected = this.customColors.find(color => color.name === event.name);
    if (isSelected) {
      this.customColors = [];
      this.onSelection.emit(null);
      return;
    }
    this.single.filter(row => row.name !== event.name);
    this.customColors = [{
      name: event.name,
      value: '#122377'
    }];

    this.onSelection.emit(event);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
