import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  private eras = new BehaviorSubject({});
  private lesson = new BehaviorSubject({});
  private practices = new BehaviorSubject({});
  private practice = new BehaviorSubject({});

  currentEras = this.eras.asObservable();
  currentLesson = this.lesson.asObservable();
  currentPractices = this.practices.asObservable();
  currentPractice = this.practice.asObservable();

  constructor(private http: HttpClient) { }

  getErasFromDB() {
    return this.http.get(`${environment.backendUrl}eras/get/all`).pipe(
      map((res: any) => {
        this.eras.next(res);
        return res;
      })
    );
  }

  getLessonFromDB(lessonId: string) {
    this.http.get(`${environment.backendUrl}lessons/get/${lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson.next(lesson);
    });

    this.http.get(`${environment.backendUrl}lessons/get-practices/${lessonId}`).pipe(take(1)).subscribe((practices: any) => {
      this.practices.next(practices);
    });
  }

  getPracticeFromDB(practiceId: string) {
    this.http.get(`${environment.backendUrl}practices/get-for-solving/${practiceId}`).pipe(take(1)).subscribe((practice: any) => {
      this.practice.next(practice);
    });
  }
}
