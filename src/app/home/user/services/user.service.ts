import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserDetails(data: any) {
    return this.http
      .put(
        `${environment.baseUrl}/${environment.userPath}/updateUserDetails`,
        data
      )
      .toPromise();
  }

  getUserDetails() {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getUserDetails`
    );
  }

  getAptWeight() {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getAptWeight`
    );
  }

  updateGoal(data: any) {
    return this.http
      .put(
        `${environment.baseUrl}/${environment.userPath}/updateGoal`,
        data
      );
  }

  getAllUser() {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getAllUser`
    );
  }
}
