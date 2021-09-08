import { Component } from '@angular/core';
import { ValidatorService } from 'src/app/auth/services/validator.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(
    private checkLogout: ValidatorService,
    private commonService: CommonService
  ) {}

  adminloggedIn() {
    if (this.commonService.getRole() == 'admin') return true;
    else return false;
  }

  onLogout() {
    this.checkLogout.onLogout();
  }
}
