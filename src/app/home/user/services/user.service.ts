import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserDetails(username: string, data: Object) {
    return this.http.put(
      `http://localhost:8080/user/updateUserDetails?username=${username}`,
      data,
      {
        responseType: 'text',
      }
    );
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

  getAllUser() {
    return this.http.get(`http://localhost:8080/user/getAllUser`);
  }

  findUser(username: string) {
    return this.http.get(
      `http://localhost:8080/user/findUser?username=${username}`
    );
  }

  updateRole(username: string, data: object) {
    return this.http.put(
      `http://localhost:8080/user/updateRole?username=${username}`,
      data,
      { responseType: 'text' }
    );
  }

  deleteUser(username: string) {
    return this.http.delete(
      `http://localhost:8080/user/deleteUser?username=${username}`,
      { responseType: 'text' }
    );
  }
}
