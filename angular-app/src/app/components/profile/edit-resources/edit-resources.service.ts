import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditResourcesService {
  private lesson = new BehaviorSubject({});
  private practice = new BehaviorSubject({});

  currentLesson = this.lesson.asObservable();
  currentPractice = this.practice.asObservable();

  constructor(private http: HttpClient) { }

  getLesson(lessonId: string) {
    this.http.get(`https://rk-diplomna-api.herokuapp.com/lessons/get/${lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson.next(lesson);
    });
  }

  getPractice(practiceId: string) {
    this.http.get(`https://rk-diplomna-api.herokuapp.com/practices/get/${practiceId}`).pipe(take(1)).subscribe((practice: any) => {
      this.practice.next(practice);
    });
  }

  deleteQuestion(questionId: any) {
      return this.http.delete(`https://rk-diplomna-api.herokuapp.com/questions/delete/${questionId}`);
  }
}
