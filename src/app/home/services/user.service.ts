import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getUserDetails(username: string) {
  //   return this.http.get(
  //     `http://localhost:8080/user/getUserDetails?username=${username}`
  //   );
  // }
  
}
