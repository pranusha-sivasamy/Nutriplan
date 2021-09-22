import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  findUser(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.adminPath}/findUser?username=${username}`
    );
  }

  deleteUser(username: string) {
    return this.http.delete(
      `${environment.baseUrl}/${environment.adminPath}/deleteUser?username=${username}`
    );
  }

  updateRole(data: any) {
    return this.http
      .put(`${environment.baseUrl}/${environment.adminPath}/updateRole`, data)
      .toPromise();
  }

  updateGoal(data: any) {
    return this.http
      .put(`${environment.baseUrl}/${environment.adminPath}/updateGoal`, data)
      .toPromise();
  }

  getAllUser() {
    return this.http.get(
      `${environment.baseUrl}/${environment.adminPath}/getAllUser`
    );
  }

  updateUserDetails(data: any) {
    return this.http
      .put(
        `${environment.baseUrl}/${environment.adminPath}/updateUserDetails`,
        data
      )
      .toPromise();
  }

  getUserDetails(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.adminPath}/getUserDetails?username=${username}`
    );
  }
}
