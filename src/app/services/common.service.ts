import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  getUsername() {
    return localStorage.getItem('username');
  }

  getRole(){
    return localStorage.getItem('role')
  }

}
