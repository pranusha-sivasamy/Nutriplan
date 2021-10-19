import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BasicDetailsComponent } from '../home/user/components/basic-details/basic-details.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    BasicDetailsComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers:[
    UserAuthGuard,
    UnsavedChangesGuard
  ]
})
export class AuthModule { }
