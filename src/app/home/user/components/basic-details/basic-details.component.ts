import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CanComponentLeave } from 'src/app/auth/guards/unsaved-changes.guard';
import { ConfirmBoxComponent } from 'src/app/home/components/confirm-box/confirm-box.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
})
export class BasicDetailsComponent implements CanComponentLeave {
  displaySuccessRegistration = false;
  canNavigate = false;
  styleUnit: any;
  focusField = '';
  public details: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.details = this.fb.group({
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      activity: ['', [Validators.required]],
    });
  }

  get control() {
    return this.details.controls;
  }

  async onSubmit() {
    this.canNavigate = true;
    const data = {
      age: this.details.value.age,
      gender: this.details.value.gender,
      height: this.details.value.height,
      weight: this.details.value.weight,
      activityState: this.details.value.activity,
    };
    const result = await this.userService.updateUserDetails(data);
    this.router.navigate(['/home/user/goal']);
    this.displaySuccessRegistration = true;
  }

  async canLeave() {
    if (this.canNavigate) {
      return true;
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        guard: 'shouldBeFilled',
        info: 'Your basic details are essential for BMI calculation. Please provide the required details.',
      };
      dialogConfig.width = '30%';
      dialogConfig.height = '46%';
      dialogConfig.disableClose = true;
      const dialogRef = this.dialog.open(ConfirmBoxComponent, dialogConfig);
      return await dialogRef.afterClosed().toPromise();
    }
  }

  changeBck(field: string) {
    this.focusField = field;
    this.styleUnit = {
      border: '1px solid white',
      borderLeft: 'none',
    };
  }

  regularBck() {
    this.styleUnit = {
      border: 'none',
    };
  }
}
