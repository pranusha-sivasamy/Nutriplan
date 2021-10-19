import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  canNavigate = false;
  showPassword = false;
  iconStyle: any;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private userService: UserService,
    private router: Router
  ) {}
  userProfile = this.fb.group(
    {
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/(\b(?:([A-Za-z0-9])(?!\2{2}))+\b)/),
          ],
          asyncValidators: [this.validatorService.usernameValidator()],
          // updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /(\b^[a-z]{1}(?:([A-Za-z0-9._])(?!\2{2})){3,}@(?:([a-z])(?!\3{2})){5,}(\.[a-z]{3}|\.[a-z]{2,3}\.[a-z]{2})$\b)/
            ),
          ],
          asyncValidators: [this.validatorService.emailValidator()],
          // updateOn: 'blur',
        },
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.validatorService.passwordValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  onRegister() {
    this.canNavigate = true;
    const data = {
      username: this.userProfile.value.username,
      email: this.userProfile.value.email,
      password: this.userProfile.value.password,
    };
    this.userService.register(data).subscribe((result: any) => {
      this.validatorService.onLogin(result.result);
      this.router.navigate(['/home/user/details']);
    });
  }

  showPasswordToggle() {
    this.showPassword = this.showPassword ? false : true;
  }

  changeColor() {
    if (this.control.password.invalid && this.control.password.touched) {
      this.iconStyle = {
        borderBottom: '1px solid red',
      };
    } else {
      this.iconStyle = {
        borderBottom: '1px solid green',
      };
    }
  }

  regularColor() {
    if (this.control.password.invalid) {
      this.iconStyle = {
        borderBottom: '1px solid red',
      };
    } else {
      this.iconStyle = {
        borderBottom: '1px solid lightgray',
      };
    }
  }

  get control() {
    return this.userProfile.controls;
  }
}
