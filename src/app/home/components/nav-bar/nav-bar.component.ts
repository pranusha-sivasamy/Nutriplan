import { Component, OnInit } from '@angular/core';
import { ValidatorService } from 'src/app/auth/services/validator.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private checkLogout: ValidatorService) {}

  ngOnInit(): void {}

  adminloggedIn() {
    if (localStorage.getItem('role') == 'admin') return true;
    else return false;
  }

  onLogout() {
    this.checkLogout.onLogout();
  }
}
