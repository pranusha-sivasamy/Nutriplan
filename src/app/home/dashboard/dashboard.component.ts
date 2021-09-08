import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    Chart.register(...registerables);
  }
  breakfast: any = [];
  lunch: any = [];
  dinner: any = [];
  date: any;
  chart: any;
  today: any;
  style = {};
  valueExist = true;

  inputDate = this.fb.group({
    date: [''],
  });

  ngOnInit(): void {
    const date = Date.now();
    this.today = new Date().toJSON().split('T')[0];
    this.inputDate.setValue({ date: this.today });
    const today = new Date(date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;
    this.getValues();
  }

  setDate() {
    this.chart.destroy();
    this.breakfast = [];
    this.lunch = [];
    this.dinner = [];
    const today = new Date(this.inputDate.value.date).toUTCString().split(' ');
    const finalDate = today[1] + ' ' + today[2] + ' ' + today[3];
    this.date = finalDate;
    this.getValues();
  }

  async getValues() {
    const username = this.commonService.getUsername();
    if (typeof username == 'string') {
      const data = await this.taskService.getDailyData(username, this.date);
      if (data.length != 0) {
        this.valueExist = true;
        this.style = {};
        this.breakfast.push(data[0].allottedCalorie);
        this.breakfast.push(data[0].calorieIntake);
        this.lunch.push(data[1].allottedCalorie);
        this.lunch.push(data[1].calorieIntake);
        this.dinner.push(data[2].allottedCalorie);
        this.dinner.push(data[2].calorieIntake);
        this.buildChart();
      } else {
        this.valueExist = false;
        this.style = { display: 'none' };
      }
    }
  }

  buildChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['breakfast', 'lunch', 'dinner'],
        datasets: [
          {
            label: 'Allotted calorie',
            data: [this.breakfast[0], this.lunch[0], this.dinner[0]],
            backgroundColor: '#F93822FF',
            barThickness: 35,
          },
          {
            label: 'Your calorie intake',
            data: [this.breakfast[1], this.lunch[1], this.dinner[1]],
            backgroundColor: '#FDD20EFF',
            barThickness: 35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
