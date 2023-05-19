import { Component, OnInit, OnDestroy } from '@angular/core';
import { EctServiceService } from '../ect-service.service';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-tc',
  templateUrl: './check-tc.component.html',
  styleUrls: ['./check-tc.component.css'],
})
export class CheckTcComponent implements OnInit, OnDestroy {
  currentTypeSub?: Subscription;

  currentType: any;
  selectedClass: any;

  openedTCs: any[] = [];
  tcsToShow: any[] = [];
  pageNumber: number = 0;
  tcsPerPage: number = 4;
  maxPageNumber: number = Math.ceil(this.openedTCs.length / this.tcsPerPage);

  constructor(private ect: EctServiceService, private router: Router) {
    this.currentTypeSub = ect.currentType$.subscribe((currentType) => {
      this.currentType = currentType;
      this.loadTcs(this.selectedClass);
    });
  }

  ngOnInit(): void {}

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
    if ((this.pageNumber + 1) * this.tcsPerPage > this.openedTCs.length) {
      this.tcsToShow = this.openedTCs.slice(this.pageNumber * this.tcsPerPage);
    } else {
      this.tcsToShow = this.openedTCs.slice(
        this.pageNumber * this.tcsPerPage,
        this.pageNumber * this.tcsPerPage + this.tcsPerPage
      );
    }
  }

  onSelectClass(event: any) {
    event.preventDefault();
    this.loadTcs(event.target.value);
  }

  setType(type: string) {
    this.ect.setCurrentType(type);
  }

  viewTc(id: string) {
    const tc = this.openedTCs.find((tc) => tc._id === id);
    if (tc.solutions.length === 0) {
      return alert('Все още няма решения.');
    }
    this.ect.setCurrentTc(tc);
    this.router.navigate([`profile/competitions/check/${this.currentType}`]);
  }

  loadTcs(forClass: string) {
    this.ect
      .getOpenedTCs(forClass)
      .pipe(take(1))
      .subscribe({
        next: (tcs: any) => {
          this.openedTCs = tcs;
          this.openedTCs.forEach((tc) => {
            tc.parsedDate = new Date(tc.updatedAt).toLocaleString('bg-BG');
          });
          this.openedTCs.sort((a, b) => {
            const t1 = Math.floor(new Date(a.updatedAt).getTime() / 1000);
            const t2 = Math.floor(new Date(b.updatedAt).getTime() / 1000);
            return t2 - t1;
          });
          this.maxPageNumber = Math.ceil(
            this.openedTCs.length / this.tcsPerPage
          );
          this.updateTable();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.currentTypeSub?.unsubscribe();
  }
}
