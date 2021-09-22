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
          validators: [Validators.required, Validators.minLength(8)],
          asyncValidators: [this.validatorService.usernameValidator()],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.email, Validators.required],
          asyncValidators: [this.validatorService.emailValidator()],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

  get control() {
    return this.userProfile.controls;
  }
}
