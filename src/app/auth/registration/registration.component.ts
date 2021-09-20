import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CanComponentLeave } from '../guards/unsaved-changes.guard';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements CanComponentLeave {
  usernameNotEligible = false;
  emailNotEligible = false;
  canNavigate = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  userProfile = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, Validators.required]],
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
    this.validatorService.onRegister(this.userProfile);
  }

  async validateUsername() {
    const result = await this.validatorService.usernameAvailability(
      this.userProfile.value.username
    );
    this.usernameNotEligible =
      result === "username doesn't exist" ? false : true;
  }

  async validateEmail() {
    const result = await this.validatorService.userEmailAvailability(
      this.userProfile.value.email
    );
    this.emailNotEligible = result === "email doesn't exist" ? false : true;
  }

  hideError() {
    this.usernameNotEligible = false;
  }

  canLeave() {
    if (this.userProfile.dirty && !this.canNavigate) {
      return window.confirm(
        'You have some unsaved changes.Are you sure you want to leave?'
      );
    }
    return true;
  }

  get control() {
    return this.userProfile.controls;
  }
}
