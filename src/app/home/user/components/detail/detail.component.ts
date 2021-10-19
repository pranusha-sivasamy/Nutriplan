import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'src/app/home/components/confirm-box/confirm-box.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  username: string = '';
  user: any;
  range: any;
  styleUnit: any;
  focusField = '';

  async ngOnInit() {
    this.userService.getUserDetails().subscribe((data) => {
      this.user = data;
      this.range = this.user.goalPerWeek;
      this.showDetails();
    });
  }

  userData = this.fb.group({
    username: [''],
    email: [''],
    gender: ['', [Validators.required]],
    age: ['', [Validators.required]],
    height: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    activity: ['', [Validators.required]],
    BMI: [''],
    BMR: [''],
    status: [''],
    aptWeight: [''],
    currentCalorie: [''],
    goalPerWeek: [''],
    dailyCalorie: [''],
  });

  changeRange() {
    this.range = this.userData.value.goalPerWeek;
  }

  showDetails() {
    this.userData.setValue({
      username: this.user.username,
      email: this.user.email,
      gender: this.user.gender,
      age: this.user.age,
      height: this.user.height,
      weight: this.user.weight,
      activity: this.user.activityState,
      BMI: this.user.BMI,
      BMR: this.user.BMR,
      status: this.user.status,
      aptWeight: this.user.aptWeight,
      currentCalorie: this.user.currentCalorie,
      goalPerWeek: this.user.goalPerWeek,
      dailyCalorie: this.user.dailyCalorie,
    });
  }

  async saveChanges() {
    const data = {
      age: this.value.age,
      gender: this.value.gender,
      height: this.value.height,
      weight: this.value.weight,
      activityState: this.value.activity,
    };
    const firstUpdateResult = await this.userService.updateUserDetails(data);
    this.userService
      .updateGoal({
        goalPerWeek: this.userData.value.goalPerWeek,
      })
      .subscribe((result) => {
        this.userData.reset();
        this.userService.getUserDetails().subscribe((data) => {
          this.user = data;
          this.showDetails();
        });
      });
  }

  async canLeave() {
    if (this.userData.dirty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        guard: 'unsavedChange',
        info: 'You have some unsaved changes. Are you sure you want to leave?',
      };
      dialogConfig.width = '30%';
      dialogConfig.height = '45%';
      dialogConfig.disableClose = true;
      const dialogRef = this.dialog.open(ConfirmBoxComponent, dialogConfig);
      return await dialogRef.afterClosed().toPromise();
    }
    return true;
  }

  get value() {
    return this.userData.value;
  }

  get control() {
    return this.userData.controls;
  }

  changeBck(field: string) {
    this.focusField = field;
    this.styleUnit = {
      backgroundColor: 'white',
      color: 'black',
    };
  }

  regularBck() {
    this.styleUnit = {
      backgroundColor: '#6e985680',
      color: 'white',
    };
  }
}
