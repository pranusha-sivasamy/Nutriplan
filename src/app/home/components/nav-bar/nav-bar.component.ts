import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private router: Router, private commonService: CommonService) {}

  adminloggedIn() {
    if (this.commonService.getRole() == 'admin') return true;
    else return false;
  }

  onLogout() {
    this.router.navigate(['/auth/login']);
  }
}
