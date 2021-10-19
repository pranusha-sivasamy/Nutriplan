import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/auth/guards/user-auth.guard';
import { HasRoleGuard } from '../guards/has-role.guard';
import { FoodComponent } from './components/food/food.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'food',
        component: FoodComponent,
        canActivate: [HasRoleGuard, UserAuthGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [HasRoleGuard, UserAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
