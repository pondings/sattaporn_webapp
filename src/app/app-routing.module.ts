import { DocumentManagementComponent } from './pages/document/document-management/document-management.component';
import { CustomerManagementComponent } from './pages/customer/customer-management/customer-management.component';
import { AuthGuardService } from './core/services/auth-gurad.service';
import { NotFoundComponent } from './pages/authenication/not-found/not-found.component';
import { LoginComponent } from './pages/authenication/login/login.component';
import { EmailComponent } from './pages/email/email.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' , pathMatch: 'full', canActivate: [AuthGuardService] },
  {
    path: 'customer',
    component: CustomerManagementComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'document',
    component: DocumentManagementComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'email', component: EmailComponent, canActivate: [AuthGuardService] },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  { path: '**', redirectTo: 'auth/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
