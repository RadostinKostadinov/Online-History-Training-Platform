import { Router } from '@angular/router';
import { ViewProfilesService } from './view-profiles.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css']
})
export class ViewProfilesComponent implements OnInit, OnDestroy {
  allStudentsSubs?: Subscription;
  classSelectSub?: Subscription;

  allStudents: any[] = [];

  avClassesForm: FormGroup = new FormGroup({
    avClass: new FormControl([]),
  });

  //TODO: To get classes from DB or Env file or Config file
  availableClasses = [
    { id: 1, name: "5А" },
    { id: 2, name: "5Б" },
    { id: 3, name: "6А" },
    { id: 4, name: "6Б" },
    { id: 5, name: "7А" },
    { id: 6, name: "7Б" },
    { id: 7, name: "8А" },
    { id: 8, name: "8Б" },
    { id: 9, name: "9А" },
    { id: 10, name: "9Б" },
    { id: 11, name: "10А" },
    { id: 12, name: "10Б" },
    { id: 13, name: "11А" },
    { id: 14, name: "11Б" },
    { id: 15, name: "12А" },
    { id: 16, name: "12Б" },
  ];

  currentClass: any[] = [];
  usersToShow: any[] = [];
  pageNumber: number = 0;
  usersPerPage: number = 5;
  maxPageNumber: number = Math.ceil(this.currentClass.length / this.usersPerPage);


  constructor(private vpService: ViewProfilesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.vpService.getAllStudents();
    this.allStudentsSubs = this.vpService.students.subscribe((students: any) => {
      this.allStudents = students.sort((a: any, b: any) => {
        if(a.number < b.number) return -1;
        if(a.number > b.number) return 1;
        return 0;
      });
      this.currentClass = this.allStudents;
      this.maxPageNumber = Math.floor(this.currentClass.length / this.usersPerPage);
      this.updateTable();
    });

    this.avClassesForm = this.fb.group({
      avClass: ['5А']
    });

    this.classSelectSub = this.avClassesForm.get("avClass")?.valueChanges
      .subscribe(value => {
        this.onClassSelected(value);
      })
  }

  viewUser(event: any, selectedId: string) {
    event.preventDefault();
    const selectedStudent = this.allStudents.find((student) => {
      if(student._id == selectedId) return student;
    });
    this.vpService.setStudent(selectedStudent);
    this.router.navigate(['/profile/view-profile']);
  }

  onClassSelected(value: string) {
    this.currentClass = this.allStudents.filter((user) => {
      console.log(user.class, value);
      if(user.class == value) {
        return user;
      }
    });
    console.log(this.currentClass);
    this.maxPageNumber = Math.floor(this.currentClass.length / this.usersPerPage);
    this.updateTable();
  }

  previousPage() {
    if (this.pageNumber > 0) {
      --this.pageNumber;
    };
    this.updateTable();

  }

  nextPage() {
    if (this.pageNumber < this.maxPageNumber) {
      ++this.pageNumber;
    };

    this.updateTable();
  }

  updateTable() {
    if (this.pageNumber * this.usersPerPage + this.usersPerPage > this.currentClass.length) {
      this.usersToShow = this.currentClass.slice(this.pageNumber * this.usersPerPage);
    } else {
      this.usersToShow = this.currentClass.slice(this.pageNumber * this.usersPerPage, this.pageNumber * this.usersPerPage + this.usersPerPage);
    }
  }

  ngOnDestroy(): void {
    this.allStudentsSubs?.unsubscribe();
    this.classSelectSub?.unsubscribe();
  }
}
