import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) {}

  food: any;
  date!: string;
  type: any;
  displaySearchBar = false;
  searchFoodResult: any;
  selectedFood: any;
  username!: string;
  searchedFood: any;
  foodExist = false;
  selectedFoodExist = false;

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.type = params['type'];
    });
    this.getFood();
  }

  async getFood() {
    const username = this.commonService.getUsername();
    const date = Date.now();
    const today = new Date(date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;
    if (typeof username == 'string') {
      this.username = username;
      this.food = await this.taskService.getFood(
        username,
        finalDate,
        this.type
      );
      this.foodExist = true;
      await this.fetchSelectedFood();
      if (this.selectedFood[0].intakeFood.length != 0) {
        this.selectedFoodExist = true;
      }
    }
  }

  addAnotherFood() {
    this.displaySearchBar = true;
  }

  async onSearch(food: string) {
    this.searchedFood = food;
    this.searchFoodResult = await this.taskService.searchFood(food);
  }

  async addFood(food: string, quantity: number, unit: string) {
    const data = {
      date: this.date,
      food: food,
      quantity: quantity,
      type: this.type,
      unit: unit,
    };
    const result = await this.taskService.addIntakeCalories(
      this.username,
      data
    );
    await this.fetchSelectedFood();
    this.getFood();
  }

  async removeIntake(food: string, quantity: string) {
    const quantityConverted = Number.parseInt(quantity);
    const data = {
      itemName: food,
      type: this.type,
      date: this.date,
      quantity: quantityConverted,
    };
    const result = await this.taskService.removeIntakeFood(this.username, data);
    await this.fetchSelectedFood();
  }

  async fetchSelectedFood() {
    this.selectedFood = await this.taskService.getIntakeFood(
      this.username,
      this.type,
      this.date
    );
  }
}
