import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompetitionsTestsServiceService {
  private openedCompetitions = new BehaviorSubject([]);
  private openedTests = new BehaviorSubject([]);
  private chosen = new BehaviorSubject([]);

  openedCompetitions$ = this.openedCompetitions.asObservable();
  openedTests$ = this.openedTests.asObservable();
  chosen$ = this.chosen.asObservable();

  user: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  loadOpenedCompetitions(forClass: string = '12Б', userId: string = '') {
    this.http
      .get(`${environment.backendUrl}competitions/opened/${forClass}/${userId}`)
      .pipe(take(1))
      .subscribe((res: any) => this.openedCompetitions.next(res));
  }

  loadOpenedTests(forClass: string = '12Б', userId: string = '') {
    this.http
      .get(`${environment.backendUrl}tests/opened/${forClass}/${userId}`)
      .pipe(take(1))
      .subscribe((res: any) => this.openedTests.next(res));
  }

  setChosen(ptcBlankId: string) {
    this.http
      .get(`${environment.backendUrl}tests/get-for-solving/${ptcBlankId}`)
      .subscribe((res: any) => this.chosen.next(res));
  }
}
