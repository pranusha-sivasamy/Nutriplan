import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivityState } from '../../interfaces/user-activity';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css'],
})
export class UserActivityComponent implements OnInit {
  // @Output() activity_state = new EventEmitter<string>();

  state=ActivityState;

  constructor(private dialogRef: MatDialogRef<UserActivityComponent>) {}

  ngOnInit(): void {}

  onSelect(activity: string) {
    console.log('selected activity ', activity);
    // this.activity_state.emit(activity);
    this.dialogRef.close(activity)
  }
}
