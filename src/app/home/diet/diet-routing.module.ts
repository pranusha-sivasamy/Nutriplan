import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { CalorieCounterComponent } from './components/calorie-counter/calorie-counter.component';
import { NewFoodComponent } from './components/new-food/new-food.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'calorie-counter', component: CalorieCounterComponent },
      { path: 'addFood', component: AddFoodComponent },
      { path: 'newFood', component: NewFoodComponent },
      { path: '', pathMatch: 'full', redirectTo: 'calorie-counter' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietRoutingModule {}
