import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompetitionsTestsServiceService {
  openedCompetitions = new BehaviorSubject([]);
  openedTests = new BehaviorSubject([]);
  chosen = new BehaviorSubject([]);

  openedCompetitions$ = this.openedCompetitions.asObservable();
  openedTests$ = this.openedTests.asObservable();
  chosen$ = this.chosen.asObservable();

  constructor(private http: HttpClient) {}

  loadOpenedCompetitions() {
    // http get all opened competitions
    // call this.openedCompetitions.next([response])
  }

  loadOpenedTests() {}

  setChosen(chosen: any) {
    this.chosen.next(chosen);
  }
}
