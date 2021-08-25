import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { UserActivityComponent } from '../user-activity/user-activity.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {

  public userDetails: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.userDetails = this.fb.group({
      heightUnit: new FormControl('cm'),
    });
  }

  username: string = '';
  userData: object = {};
  keys: any[] = [];
  values: any[] = [];
  toggleButton = true;

  ngOnInit(): void {
    const user = localStorage.getItem('username');
    if (typeof user == 'string') {
      this.username = user;
      this.getUserDetails(user);
    }
  }

  getUserDetails(username: string) {
    this.taskService.getUserDetails(username).then((res) => {
      this.userData = res;
      this.keys = Object.keys(this.userData);
      this.values = Object.values(this.userData);
      for (let i in this.keys) {
        this.userDetails.addControl(
          this.keys[i],
          new FormControl(this.values[i])
        );
      }
      console.log('form : ', this.userDetails.value);
      console.log('user data : ', this.userData);
    });
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
    return this.userDetails.value;
  }
}
