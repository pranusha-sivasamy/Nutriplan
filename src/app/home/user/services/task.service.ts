import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private userService: UserService, private router: Router) {}

  getUserDetails(username: string) {
    return new Promise<object>((res, rej) => {
      this.userService.getUserDetails(username).subscribe((ret: object) => {
        console.log(ret);
        res(ret);
      });
    });
  }

  getUserAptWeight(username: string) {
    return new Promise<number>((res, rej) => {
      this.userService.getAptWeight(username).subscribe((ret: any) => {
        console.log('apt weight in task service : ', ret);
        res(ret);
      });
    });
  }

  updateGoal(username: string, goalPerWeek: number) {
    const data = { username: username, goalPerWeek: goalPerWeek };
    this.userService.updateGoal(data).subscribe((ret: any) => {
      console.log(`goal update status : `, ret);
      this.router.navigate(['/dashboard']);
    });
  }
}
