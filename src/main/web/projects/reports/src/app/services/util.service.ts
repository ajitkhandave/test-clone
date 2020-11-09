import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface MonthChartConfig {
  startDate: string;
  endDate: string;
  monthKey: string;
  yearKey: string;
  qtyKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  generateMonthsChartData(config: MonthChartConfig, rows: any[]): string[] {
    const data: any[] = [];
    const momentStartDate = moment(config.startDate).startOf('M');
    const momentEndDate = moment(config.endDate).endOf('M');
    const interim = momentStartDate.clone();
    const endYear = Number(momentEndDate.format('YYYY'));
    let startYear = Number(momentStartDate.format('YYYY'));
    const allowedYears = [];
    do {
      allowedYears.push('' + startYear);
      startYear = startYear + 1;
    } while (startYear <= endYear);

    while (momentEndDate > interim || interim.format('M') === momentEndDate.format('M')) {
      const monthNo = interim.format('M');
      const monthName = interim.format('MMMM');
      const row = rows.filter(r => r[config.monthKey] == monthNo && allowedYears.includes(r[config.yearKey]));
      const qty = row.reduce((prev, curr) => prev + Number(curr[config.qtyKey]), 0);
      data.push({
        name: monthName,
        value: qty
      });
      interim.add(1, 'M');
    }

    return data;
  }
}
