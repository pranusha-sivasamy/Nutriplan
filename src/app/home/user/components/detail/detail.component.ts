import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {}

  username: string = '';
  user: any;
  range: any;

  async ngOnInit() {
    const username = this.commonService.getUsername();
    if (typeof username == 'string') {
      this.username = username;
      this.user = await this.taskService.getUserDetails(username);
      this.showDetails();
    }
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

    this.user = await this.taskService.getUserDetails(this.username);
    this.showDetails();
  }

  get getValue() {
    return this.userData.value;
  }

  get getControl() {
    return this.userData.controls;
  }
}
