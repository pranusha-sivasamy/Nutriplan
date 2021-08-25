import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(data: Object) {
    return this.http.post('http://localhost:8080/user/addUser', data, {
      responseType: 'text',
    });
  }

  checkUser(username: string, password: string) {
    return this.http.get(
      `http://localhost:8080/user/checkUser?username=${username}&password=${password}`,
      { responseType: 'text' }
    );
  }

  searchUsername(data: Object) {
    return this.http.post(`http://localhost:8080/user/searchUser`, data, {
      responseType: 'text',
    });
  }

  searchEmail(data: Object) {
    return this.http.post(`http://localhost:8080/user/searchEmail`, data, {
      responseType: 'text',
    });
  }

  getRole(username: string) {
    return this.http.get(
      `http://localhost:8080/user/getRole?username=${username}`,
      { responseType: 'text' }
    );
  }
}
