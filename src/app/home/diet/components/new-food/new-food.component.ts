import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css'],
})
export class NewFoodComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
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
    this.combo = await this.taskService.getAllCombo();
    if (this.data.title == 'Edit Food') {
      const result = await this.taskService.getFoodDetails(this.data.name);
      this.showDetails(result);
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
    if (this.getValue.breakfast) type.push('breakfast');

    if (this.getValue.lunch) type.push('lunch');

    if (this.getValue.dinner) type.push('dinner');

    if (this.getValue.kind == 'side' || this.getValue.kind == 'part') {
      combo.push(this.getValue.combo);
    }
    const result = await this.taskService.addNewFood(
      this.getValue.itemName,
      this.getValue.quantity,
      this.getValue.unit,
      type,
      this.getValue.kind,
      this.getValue.calorie,
      combo
    );
    console.log(result);

    this.newFood.reset();
    this.dialogRef.close();
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
    if (this.getValue.breakfast) type.push('breakfast');
    if (this.getValue.lunch) type.push('lunch');
    if (this.getValue.dinner) type.push('dinner');
    const data = {
      itemName: this.getValue.itemName,
      quantity: this.getValue.quantity,
      unit: this.getValue.unit,
      type: type,
      calorie: this.getValue.calorie,
      combo: this.getValue.combo,
      kind: this.getValue.kind,
    };
    const result = await this.taskService.updateFood(this.id, data);
    this.newFood.reset();
    this.dialogRef.close();
  }

  get getControl() {
    return this.newFood.controls;
  }

  get getValue() {
    return this.newFood.value;
  }
}
