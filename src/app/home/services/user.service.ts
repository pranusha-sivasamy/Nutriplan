import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDailyCalorie(username: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.foodPath}/userDailyCalorie?username=${username}`
    );
  }
  getDailyData(username: string, date: string) {
    return this.http.get(
      `${environment.baseUrl}/${environment.dailyDataPath}/dailyData?username=${username}&date=${date}`
    );
  }
}
