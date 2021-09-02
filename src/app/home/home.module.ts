import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DietModule } from './diet/diet.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UserModule,
    DietModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    UserService,
    TaskService
  ]
})
export class HomeModule { }
