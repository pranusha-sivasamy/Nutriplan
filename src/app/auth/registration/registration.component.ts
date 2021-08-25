import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentLeave } from '../guards/unsaved-changes.guard';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements CanComponentLeave {
  displaySuccessRegistration = false;
  usernameNotEligible = false;
  emailNotEligible = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router
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
    this.displaySuccessRegistration = true;
    this.validatorService.onRegister(this.userProfile);
  }

  async validateUsername() {
    try {
      await this.validatorService.usernameAvailability(
        this.userProfile.value.username
      );
      this.usernameNotEligible = false;
    } catch (err) {
      this.usernameNotEligible = true;
    }
  }

  async validateEmail() {
    try {
      await this.validatorService.userEmailAvailability(
        this.userProfile.value.email
      );
      this.emailNotEligible = false;
    } catch (err) {
      this.emailNotEligible = true;
    }
  }

  canLeave() {
    if (
      (this.getControl.username.dirty || this.getControl.password.dirty) &&
      this.displaySuccessRegistration == false
    ) {
      return window.confirm(
        'You have some unsaved changes.Are you sure you want to leave?'
      );
    }
    console.log(this.displaySuccessRegistration);
    return true;
  }

  get getControl() {
    return this.userProfile.controls;
  }
}
