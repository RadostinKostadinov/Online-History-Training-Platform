import { ViewProfilesService } from './../view-profiles/view-profiles.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  studentSub?: Subscription;

  student: any;
  solvedPTCs: any[] = [];

  ptcsToShow: any[] = [];
  pageNumber: number = 0;
  ptcsPerPage: number = 2;
  maxPageNumber: number = 0;

  displayedPTC: any;

  constructor(private vpService: ViewProfilesService) {}

  ngOnInit(): void {
    this.studentSub = this.vpService.student.subscribe((student: any) => {
      this.student = student;
      console.log(this.student);
      this.solvedPTCs = this.student.solvedPTCs.map((solvedPTC: any) => {
        if (solvedPTC.type == 'practice') {
          solvedPTC.typeSymbol = 'У';
        }
        if (solvedPTC.type == 'competition') {
          solvedPTC.typeSymbol = 'С';
        }
        if (solvedPTC.type == 'test') {
          solvedPTC.typeSymbol = 'К';
        }

        const creationDate = new Date(solvedPTC.createdAt);

        solvedPTC.date = `${creationDate.getFullYear()}-${this.checkTime(
          creationDate.getMonth() + 1
        )}-${this.checkTime(creationDate.getDate())} ${this.checkTime(
          creationDate.getHours()
        )}:${this.checkTime(creationDate.getMinutes())}`;

        return solvedPTC;
      });
      this.maxPageNumber = Math.ceil(this.solvedPTCs.length / this.ptcsPerPage);
      this.updateTable();
    });
  }

  viewBlank(event: any, blankId: string) {
    event.preventDefault();
    this.displayedPTC = this.solvedPTCs.find((ptcBlank) => {
      if (blankId == ptcBlank._id) return ptcBlank;
    });

    setTimeout(() => {
      document
        .getElementById('pagination-buttons')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
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
    if (
      this.pageNumber * this.ptcsPerPage + this.ptcsPerPage >
      this.solvedPTCs.length
    ) {
      this.ptcsToShow = this.solvedPTCs.slice(
        this.pageNumber * this.ptcsPerPage
      );
    } else {
      this.ptcsToShow = this.solvedPTCs.slice(
        this.pageNumber * this.ptcsPerPage,
        this.pageNumber * this.ptcsPerPage + this.ptcsPerPage
      );
    }
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
  }

  checkTime(i: number) {
    return i < 10 ? '0' + i : i;
  }
}
