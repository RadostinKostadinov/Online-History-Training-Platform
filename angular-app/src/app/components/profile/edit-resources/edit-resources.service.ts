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
    this.http.get(`http://localhost:3000/lessons/get/${lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson.next(lesson);
    });
  }

  getPractice(practiceId: string) {
    this.http.get(`http://localhost:3000/practices/get/${practiceId}`).pipe(take(1)).subscribe((practice: any) => {
      this.practice.next(practice);
    });
  }

  deleteQuestion(questionId: any) {
      return this.http.delete(`http://localhost:3000/questions/delete/${questionId}`);
  }
}
