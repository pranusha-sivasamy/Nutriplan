import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFood() {
    return this.http.get(
      `${environment.baseUrl}/${environment.foodPath}/getAllFood`
    );
  }

  getFood(username: string, date: string, type: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getFood?username=${username}&date=${date}&type=${type}`
    );
  }

  getFoodDetails(name: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.foodPath}/getFood?itemName=${name}`
    );
  }

  searchFood(food: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.foodPath}/searchFood?itemName=${food}`
    );
  }

  addIntakeCalories(username: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.dailyDataPath}/updateIntake?username=${username}`,
      data
    );
  }

  generateFoodPlan(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.dailyDataPath}/addFoodPlan`,
      data
    );
  }

  getAllottedCalorie(username: string, date: string, type: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getFood?username=${username}&date=${date}&type=${type}`
    );
  }

  getIntakeCalorie(username: string, date: string, type: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/currentIntake?username=${username}&date=${date}&type=${type}`
    );
  }

  addNewFood(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.foodPath}/addFood`,
      data
    );
  }

  getAllCombo() {
    return this.http.get(
      `${environment.baseUrl}/${environment.foodPath}/getAllCombo`
    );
  }

  updateFood(id: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.foodPath}/updateFood?id=${id}`,
      data
    );
  }

  deleteFood(food: string) {
    return this.http.delete(
      `${environment.baseUrl}/${environment.foodPath}/deleteFood?itemName=${food}`
    );
  }

  getIntakeFood(username: string, type: string, date: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getIntakeFood?username=${username}&type=${type}&date=${date}`
    );
  }

  removeIntakeFood(username: string, data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.dailyDataPath}/removeIntake?username=${username}`,
      data
    );
  }
}
