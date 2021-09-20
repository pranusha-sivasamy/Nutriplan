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

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router
  ) {}

  userlogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get control() {
    return this.userlogin.controls;
  }

  async onLogin() {
    const result: any = await this.validatorService.loginCheck(
      this.userlogin.value.username,
      this.userlogin.value.password
    );

    if (
      result.result == 'No user found' ||
      result.result == 'Incorrect password'
    ) {
      this.loginResultFailed = true;
    } else {
      this.loginResultFailed = false;
      this.validatorService.onLogin(result.result);
      if (result.hasDetail) {
        if (!result.hasGoal) {
          this.router.navigate(['/home/user/goal']);
        } else this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/home/user/details']);
      }
    }
  }

  confirmPasswordDirty() {
    this.loginResultFailed = false;
  }
}
