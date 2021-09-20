import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/home/user/services/task.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from 'src/app/home/user/components/user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  page = 1;
  tableSize = 8;
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  async ngOnInit() {
    this.fetchUser();
  }

  async onSearch(user: string) {
    this.users = await this.taskService.findUser(user);
  }

  editUser(user: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Edit User', name: user };
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    this.dialog.open(UserComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
    this.fetchUser();
    });
  }

  async deleteUser(user: string) {
    const data = await this.taskService.deleteUser(user);
    this.fetchUser();
  }

  async onTableDataChange(event: any) {
    this.page = event;
    this.fetchUser();
  }

  async fetchUser(){
    this.users = await this.taskService.getAllUser();
  }
}
