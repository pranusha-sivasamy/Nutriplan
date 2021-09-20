import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/addUser`,
      data
    );
  }

  checkUser(username: string, password: string) {
    const data = { username: username, password: password };
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/checkUser`,
      data
    );
  }

  searchUsername(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/searchUser`,
      data
    );
  }

  searchEmail(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/searchEmail`,
      data
    );
  }

}
