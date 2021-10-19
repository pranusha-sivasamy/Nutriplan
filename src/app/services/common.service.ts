import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  getRole() {
    const token = sessionStorage.getItem('token');
    let data;
    if (typeof token == 'string') {
      data = JSON.parse(atob(token.split('.')[1]));
    }
    return data ? data.role : null;
  }
}
