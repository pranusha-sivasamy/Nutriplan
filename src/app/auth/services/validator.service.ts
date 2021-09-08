import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private router: Router, private userService: UserService) {}

  passwordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordcontrol || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordcontrol.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  onLogin(username: string, role: string, token: string) {
    localStorage.setItem('LoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
  }

  onLogout() {
    this.router.navigate(['/']);
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }

  async onRegister(userProfile: FormGroup) {
    const data = {
      username: userProfile.value.username,
      email: userProfile.value.email,
      password: userProfile.value.password,
    };
    const result = await this.userService.addUser(data).toPromise();
    this.onLogin(userProfile.value.username, 'user', result);
    this.router.navigate(['/home/user/details']);
  }

  getRole(username: string) {
    return this.userService.getRole(username).toPromise();
  }

  loginCheck(username: string, password: string) {
    return this.userService.checkUser(username, password).toPromise();
  }

  usernameAvailability(username: string) {
    const data = { username: username };
    return this.userService.searchUsername(data).toPromise();
  }

  userEmailAvailability(email: string) {
    const data = { email: email };
    return this.userService.searchEmail(data).toPromise();
  }
}
