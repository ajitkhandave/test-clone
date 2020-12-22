import {LoginComponent} from "./components/login/login.component";
import {ResetPasswordComponent} from "./components/resetpassword/reset-password.component";
import {ErrorComponent} from "./components/error/error.component";

export const Routes = [
  {
        path: 'auth',
    component: LoginComponent
  },
  {
      path: 'auth/reset-password',
    component: ResetPasswordComponent
  },
    {
        path: 'auth/error',
        component: ErrorComponent
    }
];
