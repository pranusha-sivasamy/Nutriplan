import { Injectable } from '@angular/core';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private foodService: FoodService) {}

  getAllFood() {
    return this.foodService.getAllFood().toPromise();
  }

  getAllCombo() {
    return this.foodService.getAllCombo().toPromise();
  }

  getFood(username: string, date: string, type: string) {
    return this.foodService.getFood(username, date, type).toPromise();
  }

  getFoodDetails(name: string) {
    return this.foodService.getFoodDetails(name).toPromise();
  }

  searchFood(food: string) {
    return this.foodService.searchFood(food).toPromise();
  }

  addIntakeCalories(username: string, data: object) {
    return this.foodService.addIntakeCalories(username, data).toPromise();
  }

  generateFoodPlan(username: string, type: string) {
    const data = { username: username, type: type };
    return this.foodService.generateFoodPlan(data).toPromise();
  }

  getAllottedCalorie(username: string, date: string, type: string) {
    return this.foodService
      .getAllottedCalorie(username, date, type)
      .toPromise();
  }

  addNewFood(
    itemName: string,
    quantity: number,
    unit: string,
    type: string[],
    kind: string,
    calorie: number,
    combo: string[]
  ) {
    const data = {
      itemName: itemName,
      quantity: quantity,
      unit: unit,
      type: type,
      kind: kind,
      calorie: calorie,
      combo: combo,
    };
    console.log('inside task ');

    return this.foodService.addNewFood(data).toPromise();
  }

  updateFood(id: string, data: object) {
    return this.foodService.updateFood(id, data).toPromise();
  }

  deleteFood(food: string) {
    return this.foodService.deleteFood(food).toPromise();
  }

  getIntakeFood(username: string, type: string, date: string) {
    return this.foodService.getIntakeFood(username, type, date).toPromise();
  }

  removeIntakeFood(username: string, data: object) {
    return this.foodService.removeIntakeFood(username, data).toPromise();
  }
}
