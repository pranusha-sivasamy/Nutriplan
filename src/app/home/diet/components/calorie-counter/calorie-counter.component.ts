import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-calorie-counter',
  templateUrl: './calorie-counter.component.html',
  styleUrls: ['./calorie-counter.component.css'],
})
export class CalorieCounterComponent implements OnInit {
  constructor(
    private foodService: FoodService
  ) {}

  breakFastCalorie: number = 0;
  lunchCalorie: number = 0;
  dinnerCalorie: number = 0;
  breakfastIntake: number = 0;
  lunchIntake: number = 0;
  dinnerIntake: number = 0;
  date!: string;

  async ngOnInit() {
    const date = Date.now();
    const today = new Date(date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;
    let value;

    const breakfastResult = await this.foodService.generateFoodPlan({
      type: 'breakfast',
    });

    this.foodService
      .getAllottedCalorie(this.date, 'breakfast')
      .subscribe((data) => {
        value = Object.values(data);
        this.breakFastCalorie = value[2];
        this.breakfastIntake = value[1];
      });

    const lunchResult = await this.foodService.generateFoodPlan({
      type: 'lunch',
    });

    this.foodService
      .getAllottedCalorie(this.date, 'lunch')
      .subscribe((data) => {
        value = Object.values(data);
        this.lunchCalorie = value[2];
        this.lunchIntake = value[1];
      });

    const dinnerResult = await this.foodService.generateFoodPlan({
      type: 'dinner',
    });

    this.foodService
      .getAllottedCalorie(this.date, 'dinner')
      .subscribe((data) => {
        value = Object.values(data);
        this.dinnerCalorie = value[2];
        this.dinnerIntake = value[1];
      });
  }
}
