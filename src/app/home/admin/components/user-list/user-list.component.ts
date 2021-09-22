import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from 'src/app/home/user/components/user/user.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  page = 1;
  tableSize = 8;
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.fetchUser();
  }

  onSearch(user: string) {
    this.adminService.findUser(user).subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { title: 'Edit User', name: user };
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    dialogConfig.disableClose = true;
    this.dialog.open(UserComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(async () => {
      this.fetchUser();
    });
  }

  async deleteUser(user: string) {
    this.adminService.deleteUser(user).subscribe((data) => {
      this.fetchUser();
    });
  }

  async onTableDataChange(event: any) {
    this.page = event;
    this.fetchUser();
  }

  async fetchUser() {
    this.adminService.getAllUser().subscribe((data) => {
      this.users = data;
    });
  }
}
