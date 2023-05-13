import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditTestService {
  private questionStatus = new Subject<any>();
  private testStatus = new Subject<any>();

  constructor() {}

  updateQuestions() {
    this.questionStatus.next('pushToTest');
  }

  saveTest() {
    console.log('saveTest() called...');
    this.testStatus.next('saveText');
  }

  questionsStatus(): Observable<any> {
    return this.questionStatus.asObservable();
  }

  testsStatus(): Observable<any> {
    console.log('testsStatus called...');
    return this.testStatus.asObservable();
  }
}
