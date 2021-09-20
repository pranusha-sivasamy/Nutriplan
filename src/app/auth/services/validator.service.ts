import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
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
      if (passwordcontrol.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }

  // usernameCheck(control: AbstractControl):ValidatorFn {
  //   console.log(control.value);
  //   if (!!control.value) {
  //     (async()=>{
  //     const result = await this.usernameAvailability(control.value);
  //     if (result === "username doesn't exist") {
  //       control.setErrors({ exist: true });
  //     } else {
  //       control.setErrors(null);
  //     }
  //   })();
  // }
  // return null
  // }

  onLogin(token: any) {
    sessionStorage.setItem('token', token);
  }

  onLogout() {
    this.router.navigate(['/']);
    sessionStorage.removeItem('token');
  }

  async onRegister(userProfile: FormGroup) {
    const data = {
      username: userProfile.value.username,
      email: userProfile.value.email,
      password: userProfile.value.password,
    };
    const result = await this.userService.addUser(data).toPromise();
    this.onLogin(result);
    this.router.navigate(['/home/user/details']);
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
