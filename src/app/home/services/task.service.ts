import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private userService: UserService) {}

  // getUserDetails(username: string){
  //   return new Promise<object>((res, rej) => {
  //     this.userService.getUserDetails(username).subscribe((ret: object) => {
  //       console.log(ret);
  //       res(ret);
  //     });
  //   });
  // }
}
