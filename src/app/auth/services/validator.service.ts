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

  onLogin(username: string, role: string) {
    localStorage.setItem('LoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
  }

  onLogout() {
    // window.location.reload();
    this.router.navigate(['/']);
    localStorage.removeItem('LoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  onRegister(userProfile: FormGroup) {
    const data = {
      username: userProfile.value.username,
      email: userProfile.value.email,
      password: userProfile.value.password,
    };
    this.userService.addUser(data).subscribe((ret: any) => {
      console.log(ret);
      this.onLogin(userProfile.value.username, 'user');
      this.router.navigate(['/home/user/details']);
    });
  }

  getRole(username: string) {
    return new Promise<string>((res, rej) => {
      this.userService.getRole(username).subscribe((ret: string) => {
        res(ret);
      });
    });
  }

  loginCheck(username: string, password: string) {
    return new Promise((res, rej) => {
      this.userService.checkUser(username, password).subscribe((ret: any) => {
        console.log(ret);
        if (ret == 'No user found' || ret == 'Incorrect password') rej(false);
        else res(true);
      });
    });
  }

  usernameAvailability(username: string) {
    const data = { username: username };
    return new Promise((res, rej) => {
      this.userService.searchUsername(data).subscribe((ret: any) => {
        console.log(ret);
        if (ret == 'username already exists') rej(false);
        else res(true);
      });
    });
  }

  userEmailAvailability(email: string) {
    const data = { email: email };
    return new Promise((res, rej) => {
      this.userService.searchEmail(data).subscribe((ret: any) => {
        console.log(ret);
        if (ret == 'email already exists') rej(false);
        else res(true);
      });
    });
  }
}
