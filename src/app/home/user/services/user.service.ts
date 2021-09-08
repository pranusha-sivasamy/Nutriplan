import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserDetails(username: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.userPath}/updateUserDetails?username=${username}`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  getUserDetails(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getUserDetails?username=${username}`
    );
  }

  getAptWeight(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getAptWeight?username=${username}`
    );
  }

  updateGoal(username: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.userPath}/updateGoal?username=${username}`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  getAllUser() {
    return this.http.get(`${environment.baseUrl}/${environment.userPath}/getAllUser`);
  }

  findUser(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/findUser?username=${username}`
    );
  }

  updateRole(username: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.userPath}/updateRole?username=${username}`,
      data,
      { responseType: 'text' }
    );
  }

  deleteUser(username: string) {
    return this.http.delete(
      `${environment.baseUrl}/${environment.userPath}/deleteUser?username=${username}`,
      { responseType: 'text' }
    );
  }
}
