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

  getFood(date: string, type: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getFood?date=${date}&type=${type}`
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

  addIntake(data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.dailyDataPath}/updateIntake`,
      data
    );
  }

  generateFoodPlan(data: any) {
    return this.http.post(
      `${environment.baseUrl}/${environment.dailyDataPath}/addFoodPlan`,
      data
    ).toPromise();
  }

  getAllottedCalorie(date: string, type: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getFood?date=${date}&type=${type}`
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

  getIntakeFood(type: string, date: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/getIntakeFood?type=${type}&date=${date}`
    ).toPromise();
  }

  removeIntakeFood(data: any) {
    return this.http.put(
      `${environment.baseUrl}/${environment.dailyDataPath}/removeIntake`,
      data
    );
  }
}
