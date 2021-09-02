import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { UserActivityComponent } from '../user-activity/user-activity.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  public userDetails: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userDetails = this.fb.group({
      heightUnit: new FormControl('cm'),
    });
    this.initializeForm();
  }

  username: string = '';
  userData: object = {};
  keys: any[] = [];
  values: any[] = [];
  toggleButton = true;

  async initializeForm() {
    const user = localStorage.getItem('username');
    if (typeof user == 'string') {
      this.username = user;
      await this.getUserDetails(user);
    }
  }

  async getUserDetails(username: string) {
    this.userData = await this.taskService.getUserDetails(username);
    this.keys = Object.keys(this.userData);
    this.values = Object.values(this.userData);
    for (let i in this.keys) {
      console.log(`key : ${this.keys[i]}; value : ${this.values[i]}`);

      this.userDetails.addControl(
        this.keys[i],
        new FormControl(this.values[i])
      );
    }
    //  this.taskService.getUserDetails(username).then((res) => {
    //   this.userData = res;
    //   this.keys = Object.keys(this.userData);
    //   this.values = Object.values(this.userData);
    //   for (let i in this.keys) {
    //     console.log(`key : ${this.keys[i]}; value : ${this.values[i]}`);

    //     this.userDetails.addControl(
    //       this.keys[i],
    //       new FormControl(this.values[i])
    //     );
    //   }
    //   // console.log('form : ', this.userDetails.value);
    //   // console.log('user data : ', this.userData);
    // });
  }

  heightUnitChange(unit: string) {
    this.toggleButton = !this.toggleButton;
    this.userDetails.value.heightUnit = unit;
  }

  onEditActivity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '75%';
    this.dialog
      .open(UserActivityComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(`result from dialog : ${res}`);
        this.userDetails.value.activityState = res;
      });
  }

  get getValue() {
    const val = this.userDetails.value;
    // console.log('val : ', val);
    return val;
  }
}
