import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentLeave } from '../../../../auth/guards/unsaved-changes.guard';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
})
export class BasicDetailsComponent implements CanComponentLeave, OnInit {
  displaySuccessRegistration = false;
  public details: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.details = this.fb.group({
      heightInCm: ['', [Validators.required]],
      heightInft: [''],
      heightInIn: [''],
      weight: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      heightUnit: ['cm', [Validators.required]],
    });
  }

  ngOnInit() {
    this.details.get('heightUnit')?.valueChanges.subscribe((currentUnit) => {
      this.onselectHeight(currentUnit);
    });
  }

  get getControl() {
    return this.details.controls;
  }

  onSubmit() {
    console.log(this.details.value);
    if (this.details.value.heightUnit == 'ft') {
      this.details.value.heightInCm =
        this.details.value.heightInft * 30.48 +
        this.details.value.heightInIn * 2.54;
    }
    const data = {
      username: localStorage.getItem('username'),
      age: this.details.value.age,
      gender: this.details.value.gender,
      height: this.details.value.heightInCm,
      weight: this.details.value.weight,
      activityState: this.details.value.activity,
    };
    this.userService.updateUserDetails(data).subscribe((ret: any) => {
      console.log(ret);
      this.router.navigate(['/home/user/goal']);
    });
    this.displaySuccessRegistration = true;
  }

  private onselectHeight(unit: string) {
    console.log(unit);
    if (unit == 'ft') {
      this.details.controls.heightInft.setValidators([
        Validators.required,
        Validators.min(4),
        Validators.max(7),
      ]);
      this.details.controls.heightInIn.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(12),
      ]);
      this.details.controls.heightInCm.clearValidators();
      this.details.controls.heightInCm.updateValueAndValidity();
      this.details.controls.heightInft.updateValueAndValidity();
      this.details.controls.heightInIn.updateValueAndValidity();
    } else {
      this.details.controls.heightInCm.setValidators([Validators.required]);
      this.details.controls.heightInCm.updateValueAndValidity();
      this.details.controls.heightInft.clearValidators();
      this.details.controls.heightInIn.clearValidators();
      this.details.controls.heightInft.updateValueAndValidity();
      this.details.controls.heightInIn.updateValueAndValidity();
    }
  }

  canLeave() {
    if (this.getControl.username.dirty || this.getControl.password.dirty) {
      return window.confirm(
        'You have some unsaved changes.Are you sure you want to leave?'
      );
    }
    return true;
  }
}
