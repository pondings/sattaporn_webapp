import { AuthGuardService } from './shared/services/auth-guard.service';
import { NotFoundComponent } from './pages/authenication/not-found/not-found.component';
import { LogoutComponent } from './pages/authenication/logout/logout.component';
import { LoginComponent } from './pages/authenication/login/login.component';
import { EmailComponent } from './pages/email/email.component';
import { DocumentComponent } from './pages/document/document.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'document', component: DocumentComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'email', component: EmailComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
