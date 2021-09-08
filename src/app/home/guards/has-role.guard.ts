import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private commonService: CommonService) {}
  canActivate() {
    if (this.commonService.getRole() == 'admin') return true;
    else return false;
  }
}
