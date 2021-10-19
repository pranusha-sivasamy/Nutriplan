import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { GoalComponent } from './components/goal/goal.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    DetailComponent,
    GoalComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
