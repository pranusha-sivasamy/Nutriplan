import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentLeave } from 'src/app/auth/guards/unsaved-changes.guard';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
})
export class BasicDetailsComponent implements CanComponentLeave {
  displaySuccessRegistration = false;
  public details: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.details = this.fb.group({
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      activity: ['', [Validators.required]],
      heightUnit: ['cm', [Validators.required]],
    });
  }

  get getControl() {
    return this.details.controls;
  }

  async onSubmit() {
    const username: any = this.commonService.getUsername();
    const data = {
      age: this.details.value.age,
      gender: this.details.value.gender,
      height: this.details.value.height,
      weight: this.details.value.weight,
      activityState: this.details.value.activity,
    };
    const result = await this.taskService.updateUserDetails(username, data);
    this.router.navigate(['/home/user/goal']);
    this.displaySuccessRegistration = true;
  }

  canLeave() {
    if (this.details.valid) {
      return true;
    } else {
      window.confirm('Your basic details is required!');
      return false;
    }
  }
}
