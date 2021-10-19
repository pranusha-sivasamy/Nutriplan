import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserService } from './services/user.service';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    DashboardComponent,
    ConfirmBoxComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService,
  ]
})
export class HomeModule { }
