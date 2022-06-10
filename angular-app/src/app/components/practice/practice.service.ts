import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  private eras = new BehaviorSubject({});
  private lesson = new BehaviorSubject({});

  currentEras = this.eras.asObservable();
  currentLesson = this.lesson.asObservable();

  constructor(private http: HttpClient) { }

  getErasFromDB() {
    return this.http.get('http://localhost:3000/eras/get/all').pipe(
      map((res: any) => {
        this.eras.next(res);
        return res;
      })
    );
  }

  getLessonFromDB(lessonId: string) {
    this.http.get(`http://localhost:3000/lessons/get/${lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson.next(lesson);
    });

    //get practices for that lesson
  }
}
