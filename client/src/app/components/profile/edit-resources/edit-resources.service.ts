import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditResourcesService {
  private lesson = new BehaviorSubject({});
  private practice = new BehaviorSubject({});
  private test = new BehaviorSubject({});
  private competition = new BehaviorSubject({});

  currentLesson = this.lesson.asObservable();
  currentPractice = this.practice.asObservable();
  currentTest = this.test.asObservable();
  currentCompetition = this.competition.asObservable();

  constructor(private http: HttpClient) {}

  getLesson(lessonId: string) {
    this.http
      .get(`${environment.backendUrl}lessons/get/${lessonId}`)
      .pipe(take(1))
      .subscribe((lesson: any) => {
        this.lesson.next(lesson);
      });
  }

  getPractice(practiceId: string) {
    this.http
      .get(`${environment.backendUrl}practices/get/${practiceId}`)
      .pipe(take(1))
      .subscribe((practice: any) => {
        this.practice.next(practice);
      });
  }

  getTest(testId: string) {
    this.http
      .get(`${environment.backendUrl}tests/${testId}`)
      .pipe(take(1))
      .subscribe((test: any) => {
        this.test.next(test);
      });
  }

  getCompetition(competitionId: string) {
    this.http
      .get(`${environment.backendUrl}competitions/${competitionId}`)
      .pipe(take(1))
      .subscribe((competition: any) => {
        this.competition.next(competition);
      });
  }

  createQuestion(questionObject: Object) {
    return this.http.post(
      `${environment.backendUrl}questions/create`,
      questionObject
    );
  }

  deleteQuestion(questionId: any) {
    return this.http.delete(
      `${environment.backendUrl}questions/delete/${questionId}`
    );
  }
}
