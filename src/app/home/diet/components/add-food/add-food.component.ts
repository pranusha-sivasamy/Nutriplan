import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute
  ) {}

  food: any;
  date!: string;
  type: any;
  displaySearchBar = false;
  searchFoodResult: any;
  selectedFood: any;
  username!: string;

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.type = params['type'];
      console.log(this.type);
    });
    this.getFood();
  }

  async getFood() {
    const username = localStorage.getItem('username');
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
      this.selectedFood = await this.taskService.getIntakeFood(
        username,
        this.type,
        finalDate
      );
      console.log(this.food);
    }
  }

  addAnotherFood() {
    this.displaySearchBar = true;
  }

  async onSearch(food: string) {
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
    this.selectedFood = await this.taskService.getIntakeFood(
      this.username,
      this.type,
      this.date
    );
    console.log(this.selectedFood);
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
    this.selectedFood = await this.taskService.getIntakeFood(
      this.username,
      this.type,
      this.date
    );
  }
}
