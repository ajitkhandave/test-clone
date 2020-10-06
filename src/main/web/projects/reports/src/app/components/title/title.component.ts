import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div class="report">
      <div class="report-header pb-1 pl-2">
        <span>Reports</span>
      </div>
    </div>
  `
})
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
