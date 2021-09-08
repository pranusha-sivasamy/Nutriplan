import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private userService: UserService) {}

  getUserDailyCalorie(username: string) {
    return this.userService.getUserDailyCalorie(username).toPromise();
  }

  getDailyData(username: string, date: string) {
    return this.userService.getDailyData(username, date).toPromise<any>();
  }
}
