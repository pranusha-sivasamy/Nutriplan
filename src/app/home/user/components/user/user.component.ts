import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/home/admin/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    private fb: FormBuilder,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  user: any;
  username: any;
  styleUnit: any;
  focusField = '';

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
    role: ['', [Validators.required]],
    dailyCalorie: [''],
  });

  async ngOnInit() {
    this.username = await this.data.name;
    if (this.data.title == 'Edit User') {
      this.adminService.getUserDetails(this.data.name).subscribe((data) => {
        this.user = data;
        this.showDetails();
      });
    }
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
      role: this.user.role,
    });
  }

  async saveChanges() {
    const data = {
      username: this.username,
      age: this.value.age,
      gender: this.value.gender,
      height: this.value.height,
      weight: this.value.weight,
      activityState: this.value.activity,
    };
    const firstUpdateResult = await this.adminService.updateUserDetails(data);
    const secondUpdateResult = await this.adminService.updateGoal({
      username: this.username,
      goalPerWeek: this.userData.value.goalPerWeek,
    });
    const thirdUpdateResult = await this.adminService.updateRole({
      username: this.username,
      role: this.userData.value.role,
    });
    this.userData.reset();
    this.dialogRef.close();
  }

  close() {
    this.userData.reset();
    this.dialogRef.close();
  }

  get control() {
    return this.userData.controls;
  }

  get value() {
    return this.userData.value;
  }

  changeBck(field: string) {
    this.focusField = field;
    this.styleUnit = {
      borderBottom: '1px solid green',
      transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    };
  }

  regularBck() {
    this.styleUnit = {
      borderBottom: '1px solid lightgray',
      transition: ' border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    };
  }
}
