import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css'],
})
export class ConfirmBoxComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public question: any
  ) {}

  ngOnInit(): void {
    console.log(this.question);
    
  }

  onAction(action: boolean) {
    this.dialogRef.close(action);
  }
}
