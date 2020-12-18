import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    constructor(private toastrService: ToastrService) {
    }

    ngOnInit() {
    }


    onResetPasswordSuccess() {
        this.toastrService.success('Password has been changed successfully.')
    }

    onResetPasswordFailed(error) {
        if(error.status === 400){
            this.toastrService.error('Error: This password has already been used. Please choose a password different from the last 5 used passwords.');
        } else {
            this.toastrService.error('Error: Oops! Something went wrong. Please try again later.');
        }
    }

    onResetTokenExpiry(error) {
        this.toastrService.error('This reset password link is invalid or expired. Please reset and try again.')
    }
}
