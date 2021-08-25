import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserActivityComponent } from './components/user-activity/user-activity.component';
import { DetailComponent } from './components/detail/detail.component';
import { GoalComponent } from './components/goal/goal.component';


@NgModule({
  declarations: [
    UserActivityComponent,
    DetailComponent,
    GoalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
