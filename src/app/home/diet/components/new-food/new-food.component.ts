import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css'],
})
export class NewFoodComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<NewFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  newFood = this.fb.group({
    itemName: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    unit: ['', Validators.required],
    calorie: ['', [Validators.required]],
    kind: ['', [Validators.required]],
    breakfast: [false],
    lunch: [false],
    dinner: [false],
    combo: [''],
  });
  combo: any;
  id!: string;

  async ngOnInit() {
    this.foodService.getAllCombo().subscribe((data) => {
      this.combo = data;
    });
    if (this.data.title == 'Edit Food') {
      this.foodService.getFoodDetails(this.data.name).subscribe((data) => {
        this.showDetails(data);
      });
    }
  }

  showDetails(data: any) {
    this.newFood.patchValue({
      itemName: data.itemName,
      calorie: data.calorie,
      unit: data.unit,
      quantity: data.quantity,
      combo: data.combo,
      kind: data.kind,
    });

    if (data.type.includes('breakfast') == true)
      this.newFood.patchValue({ breakfast: true });
    if (data.type.includes('lunch') == true)
      this.newFood.patchValue({ lunch: true });
    if (data.type.includes('dinner') == true)
      this.newFood.patchValue({ dinner: true });

    this.id = data._id;
  }

  async addNewFood() {
    let type = [];
    let combo = [];
    if (this.value.breakfast) type.push('breakfast');

    if (this.value.lunch) type.push('lunch');

    if (this.value.dinner) type.push('dinner');

    if (this.value.kind == 'side' || this.value.kind == 'part') {
      combo.push(this.value.combo);
    }
    const data = {
      itemName: this.value.itemName,
      quantity: this.value.quantity,
      unit: this.value.unit,
      type: type,
      kind: this.value.kind,
      calorie: this.value.calorie,
      combo: combo,
    };
    this.foodService.addNewFood(data).subscribe((result) => {
      this.newFood.reset();
      this.dialogRef.close();
    });
  }

  addComboValidation() {
    this.newFood.controls.combo.setValidators([Validators.required]);
    this.newFood.controls.combo.updateValueAndValidity();
  }

  onClose() {
    this.newFood.reset();
    this.dialogRef.close();
  }

  async saveChanges() {
    let type = [];
    if (this.value.breakfast) type.push('breakfast');
    if (this.value.lunch) type.push('lunch');
    if (this.value.dinner) type.push('dinner');
    const data = {
      itemName: this.value.itemName,
      quantity: this.value.quantity,
      unit: this.value.unit,
      type: type,
      calorie: this.value.calorie,
      combo: this.value.combo,
      kind: this.value.kind,
    };
    this.foodService.updateFood(this.id, data).subscribe((result) => {
      this.newFood.reset();
      this.dialogRef.close();
    });
  }

  get control() {
    return this.newFood.controls;
  }

  get value() {
    return this.newFood.value;
  }
}
