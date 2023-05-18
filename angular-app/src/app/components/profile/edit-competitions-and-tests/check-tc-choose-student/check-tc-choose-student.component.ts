import { Component, OnInit, OnDestroy } from '@angular/core';
import { EctServiceService } from '../ect-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-tc-choose-student',
  templateUrl: './check-tc-choose-student.component.html',
  styleUrls: ['./check-tc-choose-student.component.css'],
})
export class CheckTcChooseStudentComponent implements OnInit, OnDestroy {
  currentSolutionsSub?: Subscription;

  solutions: any = [];

  solutionsToShow: any = [];
  pageNumber: number = 0;
  tcsPerPage: number = 4;
  maxPageNumber: number = Math.ceil(this.solutions.length / this.tcsPerPage);

  constructor(private ect: EctServiceService, private router: Router) {
    this.currentSolutionsSub = this.ect.currentSolutions$.subscribe(
      (solutions: any) => {
        this.solutions = solutions;
        this.solutions.forEach((sol: any) => {
          sol.parsedDate = new Date(sol.createdAt).toLocaleString('bg-BG');
        });
        this.solutions.sort((a: any, b: any) => {
          const t1 = Math.floor(new Date(a.createdAt).getTime() / 1000);
          const t2 = Math.floor(new Date(b.createdAt).getTime() / 1000);
          return t2 - t1;
        });
        this.maxPageNumber = Math.ceil(this.solutions.length / this.tcsPerPage);
        this.updateTable();
      }
    );
  }

  ngOnInit(): void {}

  viewSolution(solution: any) {
    this.ect.setCurrentSolution(solution);
    this.router.navigate(['/profile/competitions/check/solution']);
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
    if ((this.pageNumber + 1) * this.tcsPerPage > this.solutions.length) {
      this.solutionsToShow = this.solutions.slice(
        this.pageNumber * this.tcsPerPage
      );
    } else {
      this.solutionsToShow = this.solutions.slice(
        this.pageNumber * this.tcsPerPage,
        this.pageNumber * this.tcsPerPage + this.tcsPerPage
      );
    }
  }

  ngOnDestroy(): void {
    this.currentSolutionsSub?.unsubscribe();
  }
}
