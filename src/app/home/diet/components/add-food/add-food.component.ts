import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})

export class AddFoodComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private foodService: FoodService
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
    const date = Date.now();
    const today = new Date(date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;
    this.foodService.getFood(finalDate, this.type).subscribe(async (data) => {
      this.food = data;
      this.foodExist = true;
      await this.fetchSelectedFood();
      if (this.selectedFood[0].intakeFood.length != 0) {
        this.selectedFoodExist = true;
      }
    });
  }

  addAnotherFood() {
    this.displaySearchBar = true;
  }

  async onSearch(food: string) {
    this.searchedFood = food;
    this.foodService.searchFood(food).subscribe((data) => {
      this.searchFoodResult = data;
    });
  }

  async addFood(food: string, quantity: number, unit: string) {
    const data = {
      date: this.date,
      food: food,
      quantity: quantity,
      type: this.type,
      unit: unit,
    };
    this.foodService.addIntake(data).subscribe((result) => {
      this.getFood();
    });
  }

  async removeIntake(food: string, quantity: string) {
    const quantityConverted = Number.parseInt(quantity);
    const data = {
      itemName: food,
      type: this.type,
      date: this.date,
      quantity: quantityConverted,
    };
    this.foodService.removeIntakeFood(data).subscribe(async (result) => {
      this.fetchSelectedFood();
    });
  }

  async fetchSelectedFood() {
    this.selectedFood = await this.foodService.getIntakeFood(
      this.type,
      this.date
    );
  }
}
