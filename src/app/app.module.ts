import { AuthenicationModule } from './pages/authenication/authenication.module';
import { EmailService } from './shared/services/api/email.service';
import { EmailModule } from './pages/email/email.module';
import { DocumentModule } from './pages/document/document.module';
import { CustomerModule } from './pages/customer/customer.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Third-Party
 */
import { ClarityModule } from 'clarity-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    DashboardModule,
    DocumentModule,
    CustomerModule,
    AuthenicationModule,
    EmailModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
  ],
  providers: [
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
