import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface MonthChartConfig {
  startDate: string;
  endDate: string;
  monthKey: string;
  yearKey: string;
  qtyKey: string;
}

export interface SegmentChartConfig {
  startDate: string;
  endDate: string;
  qtyKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  generateMonthsChartData(config: MonthChartConfig, rows: any[]): { name: string, value: string }[] {
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

  generateBusinessChartData(config: SegmentChartConfig, rows: any[]): { name: string, value: string }[] {
    const { startDate, endDate } = config;
    rows = rows.filter(row => moment(row.segmentIdentity.order_date).isBetween(startDate, endDate, 'day', '[]'));
    const data: any[] = [];
    rows.forEach(row => {
      let existingRow = data.find(r => r.name === row.segmentIdentity.p3Segment);
      if (!existingRow) {
        existingRow = {
          name: row.segmentIdentity.p3Segment,
          value: Number(row[config.qtyKey])
        };
        data.push(existingRow);
      } else {
        existingRow.value += Number(row[config.qtyKey]);
      }
    });
    return data
      .filter(r => !!r.value)
      .sort((a, b) => b.value - a.value);
  }

  generateMonthList(startDate: string, endDate: string): { baseData: { name: string, value: number }[], format: string } {
    const momentStartDate = moment(startDate);
    const diff = moment(endDate).diff(momentStartDate, 'M');
    let format = 'MMM';
    if (diff >= 12) {
      format = 'MMM YYYY';
    }
    const rows = [{
      name: momentStartDate.format(format),
      value: 0
    }];
    for (let i = 1; i <= diff; i++) {
      const updatedMonthName = momentStartDate.add(1, 'M').format(format);
      rows[i] = {
        name: updatedMonthName,
        value: 0
      };
    }
    return {
      baseData: rows,
      format
    };
  }
}
