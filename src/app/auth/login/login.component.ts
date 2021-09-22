import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  loginResultFailed = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(){
    sessionStorage.removeItem('token');
  }

  userlogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get control() {
    return this.userlogin.controls;
  }

  onLogin() {
    this.userService
      .login(this.userlogin.value.username, this.userlogin.value.password)
      .subscribe((result: any) => {
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
      });
  }

  confirmPasswordDirty() {
    this.loginResultFailed = false;
  }
}
