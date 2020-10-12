import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DateRange } from '../../models/date-range';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {


  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  maxDate: NgbDate;
  @Input() setRange: Subject<DateRange>;
  @Output() startDateChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() endDateChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public formatter: NgbDateParserFormatter
  ) { }

  ngOnInit() {
    const convert = (date) => NgbDate.from(this.formatter.parse(date));
    if (this.setRange) {
      this.setRange.subscribe(({ startDate, endDate }) => {
        this.fromDate = convert(startDate);
        this.toDate = convert(endDate);
      });
    }
  }

  /**
   * Helper setter method to apply startDate Value to formGroup.
   */
  set StartDate(date: NgbDate) {
    let isoDate = null;
    if (date) {
      isoDate = moment({
        day: date.day,
        month: date.month - 1,
        year: date.year
      }).format('YYYY-MM-DD');
    }
    this.startDateChange.emit(isoDate);
  }

  /**
   * Helper setter method to apply endDate Value to formGroup.
   */
  set EndDate(date: NgbDate) {
    let isoDate = null;
    if (date) {
      isoDate = moment({
        day: date.day,
        month: date.month - 1,
        year: date.year
      }).format('YYYY-MM-DD');
    }
    this.endDateChange.emit(isoDate);
  }

  /**
   * Method to display the date string.
   */
  dateRangeFormatter() {
    if (this.fromDate && this.toDate) {
      return this.formatter.format(this.fromDate) + ' to ' + this.formatter.format(this.toDate);
    }
    return null;
  }

  /**
   * Date select event Handler. It gets called when user click on date from popup.
   * @param date Date Object.
   * @param picker Picker object.
   */
  onDateSelection(date: NgbDate, picker: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.StartDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.EndDate = date;
      picker.toggle();
    } else {
      this.toDate = null;
      this.EndDate = null;
      this.fromDate = date;
      this.StartDate = date;
    }
  }

  /**
   * Method required for showing multiple effects.
   * @param date Date Object.
   */
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate) && date.before(this.maxDate);
  }
  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  /*********************** */


}
