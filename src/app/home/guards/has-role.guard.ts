import { Injectable } from '@angular/core';
import {
  CanActivate
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  canActivate() {
    if (localStorage.getItem('role') == 'admin') return true;
    else return false;
  }
}
