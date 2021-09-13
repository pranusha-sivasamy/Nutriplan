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
      data,
      {
        responseType: 'text',
      }
    );
  }

  checkUser(username: string, password: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/checkUser?username=${username}&password=${password}`
    );
  }

  searchUsername(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/searchUser`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  searchEmail(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.userPath}/searchEmail`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  getRole(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.userPath}/getRole?username=${username}`,
      { responseType: 'text' }
    );
  }
}
