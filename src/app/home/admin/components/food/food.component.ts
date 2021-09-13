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
  myStyle: any;

  async ngOnInit() {
    this.food = await this.taskService.getAllFood();
    let height = (this.food.length * 46 + 100).toString() + 'px';
    if (this.food.length * 50 + 100 < 553) {
      height = '553px';
    }
    this.myStyle = { height: height };
  }

  onCreateNewFood() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Add Food' };
    dialogConfig.width = '45%';
    dialogConfig.height = '85%';
    this.dialog.open(NewFoodComponent, dialogConfig);
  }

  async editFood(food: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Edit Food', name: food };
    dialogConfig.width = '45%';
    dialogConfig.height = '85%';
    this.dialog.open(NewFoodComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
      this.food = await this.taskService.getAllFood();
    });
  }

  async deleteFood(food: string) {
    const result = await this.taskService.deleteFood(food);
    this.food = await this.taskService.getAllFood();
  }

  async onSearch(food: string) {
    this.food = await this.taskService.searchFood(food);
  }
}
