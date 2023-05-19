import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profiles',
  templateUrl: './edit-profiles.component.html',
  styleUrls: ['./edit-profiles.component.css'],
})
export class EditProfilesComponent implements OnInit, OnDestroy {
  students: any = {};

  studentsToShow: any = [];
  pageNumber: number = 0;
  studentsPerPage: number = 4;
  maxPageNumber: number = Math.ceil(
    this.students.length / this.studentsPerPage
  );

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get(`${environment.backendUrl}users/all/12Б`)
      .subscribe((res: any) => {
        this.students = res.filter((user: any) => user.type === 'student');
        this.maxPageNumber = Math.ceil(
          this.students.length / this.studentsPerPage
        );
      });
  }

  onClassSelected(event: any) {
    this.http
      .get(`${environment.backendUrl}users/all/${event.target.value}`)
      .subscribe((res: any) => {
        this.students = res;
      });
  }

  editProfile(student: any) {
    this.router.navigate([`/profile/edit-profiles/profile/${student._id}`]);
  }

  previousPage() {
    if (this.pageNumber > 0) {
      --this.pageNumber;
    }
    this.updateTable();
  }

  nextPage() {
    if (this.pageNumber < this.maxPageNumber) {
      ++this.pageNumber;
    }

    this.updateTable();
  }

  updateTable() {
    if ((this.pageNumber + 1) * this.studentsPerPage > this.students.length) {
      this.studentsToShow = this.students.slice(
        this.pageNumber * this.studentsPerPage
      );
    } else {
      this.studentsToShow = this.students.slice(
        this.pageNumber * this.studentsPerPage,
        this.pageNumber * this.studentsPerPage + this.studentsPerPage
      );
    }
  }
  ngOnDestroy(): void {}
}
