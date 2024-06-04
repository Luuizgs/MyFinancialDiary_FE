import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRotas } from './app.routes';
import { JwtInterceptorService } from './helpers/jwt-interceptor.service';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRotas)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
