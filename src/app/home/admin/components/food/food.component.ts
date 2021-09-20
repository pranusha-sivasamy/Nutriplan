import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/home/diet/services/task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewFoodComponent } from 'src/app/home/diet/components/new-food/new-food.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  constructor(private taskService: TaskService, private dialog: MatDialog) {}
  food: any;
  page = 1;
  tableSize = 8;

  async ngOnInit() {
    this.fetchFood();
  }

  onCreateNewFood() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Add Food' };
    dialogConfig.width = '45%';
    dialogConfig.height = '85%';
    this.dialog.open(NewFoodComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
      this.fetchFood();
    });
  }

  async editFood(food: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Edit Food', name: food };
    dialogConfig.width = '45%';
    dialogConfig.height = '85%';
    this.dialog.open(NewFoodComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
      this.fetchFood();
    });
  }

  async deleteFood(food: string) {
    const result = await this.taskService.deleteFood(food);
    this.fetchFood();
  }

  async onSearch(food: string) {
    this.food = await this.taskService.searchFood(food);
  }

  async onTableDataChange(event: any) {
    this.page = event;
    this.fetchFood();
  }

  async fetchFood() {
    this.food = await this.taskService.getAllFood();
  }
}
