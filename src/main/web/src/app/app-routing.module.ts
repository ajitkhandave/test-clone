import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './common/components/error/error.component';
import { LoginGuard } from './common/service/login.guard';

const routes: Routes = [
  {
    path: 'reports/error',
    canActivate: [LoginGuard],
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
