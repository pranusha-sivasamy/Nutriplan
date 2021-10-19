import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewFoodComponent } from 'src/app/home/diet/components/new-food/new-food.component';
import { FoodService } from 'src/app/home/diet/services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  constructor(private dialog: MatDialog, private foodService: FoodService) {}
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
    dialogConfig.disableClose = true;
    this.dialog.open(NewFoodComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
      this.fetchFood();
    });
  }

  async deleteFood(food: string) {
    this.foodService.deleteFood(food).subscribe((result) => {
      this.fetchFood();
    });
  }

  async onSearch(food: string) {
    this.foodService.searchFood(food).subscribe((data) => {
      this.food = data;
    });
  }

  async onTableDataChange(event: any) {
    this.page = event;
  }

  async fetchFood() {
    this.foodService.getAllFood().subscribe((data) => {
      this.food = data;
    });
  }
}
