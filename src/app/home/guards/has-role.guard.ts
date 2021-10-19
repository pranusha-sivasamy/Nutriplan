import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}
  canActivate() {
    if (this.commonService.getRole() == 'admin') return true;
    else {
      this.router.navigate(['**']);
      return false;
    }
  }
}
