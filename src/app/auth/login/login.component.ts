import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginResultFailed = false;
  role: string = '';

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router
  ) {}

  userlogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get getControl() {
    return this.userlogin.controls;
  }

  async onLogin() {
    const result = await this.validatorService.loginCheck(
      this.userlogin.value.username,
      this.userlogin.value.password
    );
    if (result == 'No user found' || result == 'Incorrect password') {
      this.loginResultFailed = true;
    } else {
      this.loginResultFailed = false;
      const res = await this.validatorService.getRole(
        this.userlogin.value.username
      );
      this.role = res;
      this.validatorService.onLogin(this.userlogin.value.username, this.role,result);
      this.router.navigate(['/home']);
    }
  }

  confirmPasswordDirty() {
    this.loginResultFailed = false;
  }
}
