import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { ConfirmBoxComponent } from 'src/app/home/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  userGoal = this.fb.group({
    goalPerWeek: new FormControl(0.75),
  });

  aptWeight: number = 0;
  weight: number = 0;
  BMI: number = 0;
  status: string = '';
  weeks: number = 0;
  submitted: any;

  async ngOnInit(): Promise<void> {
    this.userService.getAptWeight().subscribe((data) => {
      const value = Object.values(data);
      this.aptWeight = value[0];
      this.weight = value[1];
      this.BMI = value[2];
      this.status = value[3];
      this.onChange();
    });
  }

  onChange() {
    let diff = this.weight - this.aptWeight;
    if (diff < 0) {
      diff = diff * -1;
    }
    this.weeks = Math.ceil(diff / this.userGoal.value.goalPerWeek);
  }

  async updateGoal() {
    if (this.status == 'normal') {
      this.userGoal.setValue({ goalPerWeek: 0 });
    }
    this.submitted = true;
    this.userService
      .updateGoal({ goalPerWeek: this.userGoal.value.goalPerWeek })
      .subscribe((result) => {
        this.router.navigate(['/home/diet/calorie-counter']);
      });
  }

  async canLeave() {
    if (this.submitted) {
      return true;
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        guard: 'shouldBeFilled',
        info: 'Our suggestions will vary depending on your goal. Please set your goal to proceed.',
      };
      dialogConfig.width = '30%';
      dialogConfig.height = '46%';
      dialogConfig.disableClose = true;
      const dialogRef = this.dialog.open(ConfirmBoxComponent, dialogConfig);
      return await dialogRef.afterClosed().toPromise();
    }
  }
}
