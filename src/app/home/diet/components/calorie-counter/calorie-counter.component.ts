import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-calorie-counter',
  templateUrl: './calorie-counter.component.html',
  styleUrls: ['./calorie-counter.component.css'],
})
export class CalorieCounterComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private commonService: CommonService
  ) {}

  breakFastCalorie: number = 0;
  lunchCalorie: number = 0;
  dinnerCalorie: number = 0;
  breakfastIntake: number = 0;
  lunchIntake: number = 0;
  dinnerIntake: number = 0;
  date!: string;

  async ngOnInit() {
    const username = this.commonService.getUsername();

    const date = Date.now();
    const today = new Date(date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;

    if (typeof username == 'string') {
      const breakfastResult = await this.taskService.generateFoodPlan(
        username,
        'breakfast'
      );

      const breakfast = await this.taskService.getAllottedCalorie(
        username,
        this.date,
        'breakfast'
      );
      let value = Object.values(breakfast);
      this.breakFastCalorie = value[2];
      this.breakfastIntake = value[1];

      const lunchResult = await this.taskService.generateFoodPlan(
        username,
        'lunch'
      );

      const lunch = await this.taskService.getAllottedCalorie(
        username,
        this.date,
        'lunch'
      );
      value = Object.values(lunch);
      this.lunchCalorie = value[2];
      this.lunchIntake = value[1];

      const dinnerResult = await this.taskService.generateFoodPlan(
        username,
        'dinner'
      );

      const dinner = await this.taskService.getAllottedCalorie(
        username,
        this.date,
        'dinner'
      );
      value = Object.values(dinner);
      this.dinnerCalorie = value[2];
      this.dinnerIntake = value[1];
    }
  }
}
