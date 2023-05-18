import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EctServiceService {
  private _currentType: string = 'competitions';
  private _currentTc: any = {};
  private _currentSolutions: any = [];
  private _currentSolution: any = {};

  private currentType = new BehaviorSubject<string>(this._currentType);
  currentType$ = this.currentType.asObservable();

  private currentTc = new BehaviorSubject<any>(this._currentTc);
  currentTc$ = this.currentTc.asObservable();

  private currentSolutions = new BehaviorSubject<any>(this._currentSolutions);
  currentSolutions$ = this.currentSolutions.asObservable();

  private currentSolution = new BehaviorSubject<any>(this._currentSolution);
  currentSolution$ = this.currentSolution.asObservable();

  constructor(private http: HttpClient) {}

  // SERVICE VARIABLES
  setCurrentType(type: string) {
    this._currentType = type;
    this.currentType.next(this._currentType);
  }

  setCurrentTc(tc: any) {
    this._currentTc = tc;
    this.currentTc.next(this._currentTc);
    this._currentSolutions = [];

    this._currentTc.solutions.forEach((solutionId: any) => {
      this.http
        .get(`${environment.backendUrl}tests/get-solved/${solutionId}`)
        .subscribe((solution: any) => {
          this._currentSolutions.push(solution);
          this.currentSolutions.next(this._currentSolutions);
        });
    });
  }

  setCurrentSolution(solution: any) {
    this._currentSolution = solution;
    this._currentSolution.lessonName = this._currentTc.lessonName;
    this.currentSolution.next(this._currentSolution);
  }

  // API CALLS
  toggleTC(body: any): Observable<any> {
    switch (body.type) {
      case 'tests':
        console.log('here');
        return this.http.post(`${environment.backendUrl}tests/opened/`, body);
      case 'competitions':
        return this.http.post(
          `${environment.backendUrl}competitions/opened/`,
          body
        );
      default:
        return new Observable();
    }
  }

  getOpenedTCs(forClass = '12Б') {
    return this.http.get(
      `${environment.backendUrl}${this._currentType}/opened/all/${forClass}`
    );
  }
}
