import {Component, OnInit} from '@angular/core';
import {AuthConfig, LoginConfig} from "@sbs/ngpc-auth";
import {AppConfig} from "../../../../../../src/app/common/service/app.config";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginConfig: LoginConfig;
    public authConfig: AuthConfig;

    constructor(private config: AppConfig, private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.loginConfig = {
            skipUI: false,
            ssoUrl: this.config.get('sso-url'),
            hideRegister: true,
            hideSSO: true
        };

        this.authConfig = {
            redirectUrl: 'reports'
        };
    }

    onLoginFailed(error) {
        if(error.status === 401 || error.status === 403){
            this.toastrService.error('Error: You have entered an incorrect username or password, please try again.');
        } else{
            this.toastrService.error('Error: Oops! Something went wrong. Please try again later.');
        }
    }

    onForgotPasswordFailed(error) {
        if(error.status === 404){
            this.toastrService.error('Error: You have entered an invalid email address, please try again.');
        } else {
            this.toastrService.error('Error: Oops! Something went wrong. Please try again later.');

        }
    }

    onForgotPasswordSuccess() {
        this.toastrService.success('An email with reset password link has been sent.')
    }
}

