import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    public status: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.status = params['status'] == 403 ? "We’re sorry, you do not have permission to access this page.": "Unfortunately, there is a problem with this page.";
            });
    }
}
