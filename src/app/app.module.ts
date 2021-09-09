import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpErrorInterceptor } from './auth/services/httperrorinterceptor.service';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    HomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        disallowedRoutes: [
          'http://localhost:8080/user/checkUser',
          'http://localhost:8080/user/searchUser',
          'http://localhost:8080/user/searchEmail',
          'http://localhost:8080/user/addUser',
          'http://localhost:8080/user/getRole',
        ],
        allowedDomains: ['localhost:8080'],
        authScheme: 'Bearer ',
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
