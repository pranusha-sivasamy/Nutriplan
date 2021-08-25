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
  // noUser = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router
  ) {}

  userlogin = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get getControl() {
    return this.userlogin.controls;
  }

  async onLogin() {
    try {
      await this.validatorService.loginCheck(
        this.userlogin.value.username,
        this.userlogin.value.password
      );
      this.loginResultFailed = false;
      this.validatorService.getRole(this.userlogin.value.username).then((res)=>{
        this.role=res;
        this.validatorService.onLogin(this.userlogin.value.username, this.role);
        this.router.navigate(['/home']);
      });
    } catch (err) {
      this.loginResultFailed = true;
    }
  }

  confirmPasswordDirty() {
    this.loginResultFailed = false;
  }
}
