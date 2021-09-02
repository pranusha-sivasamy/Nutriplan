import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFood() {
    return this.http.get(`http://localhost:8080/food/getAllFood`);
  }

  getFood(username: string, date: string, type: string) {
    return this.http.get(
      `http://localhost:8080/dailyUpdate/getFood?username=${username}&date=${date}&type=${type}`
    );
  }

  getFoodDetails(name: string) {
    return this.http.get(`http://localhost:8080/food/getFood?itemName=${name}`);
  }

  searchFood(food: string) {
    return this.http.get(
      `http://localhost:8080/food/searchFood?itemName=${food}`
    );
  }

  addIntakeCalories(username: string, data: object) {
    return this.http.put(
      `http://localhost:8080/dailyUpdate/updateIntake?username=${username}`,
      data,
      { responseType: 'text' }
    );
  }

  generateFoodPlan(data: object) {
    return this.http.post(
      `http://localhost:8080/dailyUpdate/addFoodPlan`,
      data,
      { responseType: 'text' }
    );
  }

  getAllottedCalorie(username: string, date: string, type: string) {
    return this.http.get(
      `http://localhost:8080/dailyUpdate/getFood?username=${username}&date=${date}&type=${type}`
    );
  }

  getIntakeCalorie(username: string, date: string, type: string) {
    return this.http.get(
      `http://localhost:8080/dailyUpdate/currentIntake?username=${username}&date=${date}&type=${type}`
    );
  }

  addNewFood(data: object) {
    return this.http.post(`http://localhost:8080/food/addFood`, data, {
      responseType: 'text',
    });
  }

  getAllCombo() {
    return this.http.get(`http://localhost:8080/food/getAllCombo`);
  }

  updateFood(id: string, data: object) {
    return this.http.put(
      `http://localhost:8080/food/updateFood?id=${id}`,
      data,
      { responseType: 'text' }
    );
  }

  deleteFood(food: string) {
    return this.http.delete(
      `http://localhost:8080/food/deleteFood?itemName=${food}`,
      { responseType: 'text' }
    );
  }

  getIntakeFood(username: string, type: string, date: string) {
    return this.http.get(
      `http://localhost:8080/dailyUpdate/getIntakeFood?username=${username}&type=${type}&date=${date}`
    );
  }

  removeIntakeFood(username: string, data: object) {
    return this.http.put(
      `http://localhost:8080/dailyUpdate/removeIntake?username=${username}`,
      data,
      { responseType: 'text' }
    );
  }
}
