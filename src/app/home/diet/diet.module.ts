import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddFoodComponent } from './components/add-food/add-food.component';
import { CalorieCounterComponent } from './components/calorie-counter/calorie-counter.component';
import { NewFoodComponent } from './components/new-food/new-food.component';
import { DietRoutingModule } from './diet-routing.module';


@NgModule({
  declarations: [
    CalorieCounterComponent,
    AddFoodComponent,
    NewFoodComponent,
  ],
  imports: [
    CommonModule,
    DietRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DietModule { }
