import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<UserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  user: any;
  username: any;

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
      this.user = await this.taskService.getUserDetails(this.data.name);
      this.showDetails();
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
      age: this.userData.value.age,
      gender: this.userData.value.gender,
      height: this.userData.value.height,
      weight: this.userData.value.weight,
      activityState: this.userData.value.activity,
    };
    const firstUpdateResult = await this.taskService.updateUserDetails(
      this.username,
      data
    );
    const secondUpdateResult = await this.taskService.updateGoal(
      this.username,
      this.userData.value.goalPerWeek
    );
    const thirdUpdateResult = await this.taskService.updateRole(
      this.username,
      this.userData.value.role
    );
    this.userData.reset();
    this.dialogRef.close();
  }

  close() {
    this.userData.reset();
    this.dialogRef.close();
  }

  get getControl() {
    return this.userData.controls;
  }

  get getValue() {
    return this.userData.value;
  }
}
