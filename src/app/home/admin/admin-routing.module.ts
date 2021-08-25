import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from '../guards/has-role.guard';
import { FoodComponent } from './components/food/food.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'food', component: FoodComponent, canActivate: [HasRoleGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
