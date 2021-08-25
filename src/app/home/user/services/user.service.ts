import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserDetails(data: Object) {
    return this.http.put('http://localhost:8080/user/updateUserDetails', data, {
      responseType: 'text',
    });
  }

  getUserDetails(username: string) {
    return this.http.get(
      `http://localhost:8080/user/getUserDetails?username=${username}`
    );
  }

  getAptWeight(username: string) {
    return this.http.get(
      `http://localhost:8080/user/getAptWeight?username=${username}`
    );
  }

  updateGoal(data: object) {
    return this.http.put(`http://localhost:8080/user/updateGoal`, data, {
      responseType: 'text',
    });
  }
}
