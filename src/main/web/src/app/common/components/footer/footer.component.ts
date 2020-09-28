import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    isBorder = true;

    constructor(public router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                this.isBorder = val.urlAfterRedirects === '/reports' || val.urlAfterRedirects.includes('error');
            }
        });
    }


}
