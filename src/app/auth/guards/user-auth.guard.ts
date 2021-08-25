import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  canActivate() {
    if (localStorage.getItem('LoggedIn')) return true;
    else return false;
  }
}
