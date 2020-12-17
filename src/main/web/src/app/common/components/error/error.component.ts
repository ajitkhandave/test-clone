import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../service/app.config";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public status: string;

  constructor(private constant: AppConfig) { }

  ngOnInit() {
    this.status = 'We’re sorry, you do not have permission to access this page';
  }

}
