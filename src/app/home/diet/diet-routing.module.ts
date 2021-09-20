import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/auth/guards/user-auth.guard';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { CalorieCounterComponent } from './components/calorie-counter/calorie-counter.component';
import { NewFoodComponent } from './components/new-food/new-food.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calorie-counter',
        component: CalorieCounterComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'addFood',
        component: AddFoodComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'newFood',
        component: NewFoodComponent,
        canActivate: [UserAuthGuard],
      },
      { path: '', pathMatch: 'full', redirectTo: 'calorie-counter' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietRoutingModule {}
