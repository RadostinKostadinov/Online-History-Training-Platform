import { AuthService } from './../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { exhaustMap, map, take, tap, Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { environment } from 'src/environments/environment';


interface unapprovedUser {
  firstName?: string;
  surName?: string;
  lastName?: string;
  class?: string;
  number?: string;
  _id: string;
}

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.css']
})
export class RegisterRequestsComponent implements OnInit {

  unapprovedUsers: unapprovedUser[] = [];
  usersToShow: unapprovedUser[] = [];
  pageNumber: number = 0;
  usersPerPage: number = 5;
  maxPageNumber: number = Math.ceil(this.unapprovedUsers.length / this.usersPerPage);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUnapprovedUsers().pipe(take(1)).subscribe({
      next: (users) => {
        this.unapprovedUsers = users;
        this.maxPageNumber = Math.floor(this.unapprovedUsers.length / this.usersPerPage);
        this.updateUnapprovedUsersTable();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  approveUser(_id: string) {
    this.http.post(`${environment.backendUrl}users/post/register-requests/${_id}`, {}).subscribe(resData => {
      this.unapprovedUsers = this.unapprovedUsers.filter((value, index, arr) => {
        return value._id != _id;
      })

      this.maxPageNumber = Math.floor(this.unapprovedUsers.length / this.usersPerPage);
      this.updateUnapprovedUsersTable();
    });
  }

  getUnapprovedUsers() {
    return this.http.get<unapprovedUser[]>(`${environment.backendUrl}users/get/register-requests`);
  };

  previousPage() {
    if (this.pageNumber > 0) {
      --this.pageNumber;
    };
    this.updateUnapprovedUsersTable();

  }

  nextPage() {
    if (this.pageNumber < this.maxPageNumber) {
      ++this.pageNumber;
    };

    this.updateUnapprovedUsersTable();
  }

  updateUnapprovedUsersTable() {
    if (this.pageNumber * this.usersPerPage + this.usersPerPage > this.unapprovedUsers.length) {
      this.usersToShow = this.unapprovedUsers.slice(this.pageNumber * this.usersPerPage);
    } else {
      this.usersToShow = this.unapprovedUsers.slice(this.pageNumber * this.usersPerPage, this.pageNumber * this.usersPerPage + this.usersPerPage);
    }
  }
}


