import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditCompetitionService {
  private questionStatus = new Subject<any>();
  private competitionStatus = new Subject<any>();

  constructor(private http: HttpClient) {}

  updateQuestions() {
    this.questionStatus.next('pushToTest');
  }

  saveCompetition() {
    this.competitionStatus.next('saveText');
  }

  questionsStatus(): Observable<any> {
    return this.questionStatus.asObservable();
  }

  competitionsStatus(): Observable<any> {
    return this.competitionStatus.asObservable();
  }

  updateCompetition(competitionId: string, body: object) {
    return this.http.put(
      `${environment.backendUrl}competitions/${competitionId}`,
      body
    );
  }
}
