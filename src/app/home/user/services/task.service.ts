import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private userService: UserService, private router: Router) {}

  getUserDetails(username: string) {
    return this.userService.getUserDetails(username).toPromise();
  }

  getAllUser() {
    return this.userService.getAllUser().toPromise();
  }

  findUser(username: string) {
    return this.userService.findUser(username).toPromise();
  }

  getUserAptWeight(username: string) {
    return this.userService.getAptWeight(username).toPromise();
  }

  updateUserDetails(username: string, data: any) {
    return this.userService.updateUserDetails(username, data).toPromise();
  }

  updateGoal(username: string, goalPerWeek: number) {
    const data = { goalPerWeek: goalPerWeek };
    return this.userService.updateGoal(username, data).toPromise();
  }

  updateRole(username: string, role: string) {
    const data = { role: role };
    return this.userService.updateRole(username, data).toPromise();
  }

  deleteUser(username: string) {
    return this.userService.deleteUser(username).toPromise();
  }
}
