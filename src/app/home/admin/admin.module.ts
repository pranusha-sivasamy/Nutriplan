import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminRoutingModule } from './admin-routing.module';
import { FoodComponent } from './components/food/food.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [
    FoodComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
