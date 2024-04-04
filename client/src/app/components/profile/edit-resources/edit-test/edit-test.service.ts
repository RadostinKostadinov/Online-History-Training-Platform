import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditTestService {
  private questionStatus = new Subject<any>();
  private testStatus = new Subject<any>();

  constructor(private http: HttpClient) {}

  updateQuestions() {
    this.questionStatus.next('pushToTest');
  }

  saveTest() {
    this.testStatus.next('saveText');
  }

  questionsStatus(): Observable<any> {
    return this.questionStatus.asObservable();
  }

  testsStatus(): Observable<any> {
    return this.testStatus.asObservable();
  }

  updateTest(testId: string, body: object) {
    return this.http.put(`${environment.backendUrl}tests/${testId}`, body);
  }
}
