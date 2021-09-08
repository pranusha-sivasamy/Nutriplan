import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CanComponentLeave } from '../guards/unsaved-changes.guard';
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
    this.displaySuccessRegistration = true;
    this.validatorService.onRegister(this.userProfile);
  }

  async validateUsername() {
    const result = await this.validatorService.usernameAvailability(
      this.userProfile.value.username
    );
    if (result == "username doesn't exist") this.usernameNotEligible = false;
    else this.usernameNotEligible = true;
  }

  async validateEmail() {
    const result = await this.validatorService.userEmailAvailability(
      this.userProfile.value.email
    );
    if (result == "email doesn't exist") this.emailNotEligible = false;
    else this.emailNotEligible = true;
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
    return true;
  }

  get getControl() {
    return this.userProfile.controls;
  }
}
