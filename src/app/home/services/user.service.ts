import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getDailyData(date: string) {
    return this.http.get<any[]>(
      `${environment.baseUrl}/${environment.dailyDataPath}/dailyData?date=${date}`
    );
  }
}
