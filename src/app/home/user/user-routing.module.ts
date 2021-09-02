import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/auth/guards/user-auth.guard';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { DetailComponent } from './components/detail/detail.component';
import { GoalComponent } from './components/goal/goal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'details',
        component: BasicDetailsComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'goal',
        component: GoalComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'profile',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
