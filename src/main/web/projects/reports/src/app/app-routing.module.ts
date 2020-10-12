import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { TitleComponent } from './components/title/title.component';
import { AllSaversReportComponent } from './reports/all-savers-report/all-savers-report.component';
import { PopActiveProductsComponent } from './reports/pop-active-products/pop-active-products.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reports'
  }, {
    path: 'reports',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'type',
        component: TitleComponent,
        children: [{
          path: 'pop-active-products',
          component: PopActiveProductsComponent
        }, {
          path: 'all-savers-report',
          component: AllSaversReportComponent
        }
        ]
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
