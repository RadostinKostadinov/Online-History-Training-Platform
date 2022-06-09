import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsServiceService {

  private eras = new BehaviorSubject([]);
  private era = new BehaviorSubject({});
  private lesson = new BehaviorSubject({});
  private lessonItem = new BehaviorSubject({});

  currentEras = this.eras.asObservable();
  currentEra = this.era.asObservable();
  currentLesson = this.lesson.asObservable();
  currentLessonItem = this.lessonItem.asObservable();

  constructor(private http: HttpClient) { }

  getEras() {
    this.http.get('http://localhost:3000/eras/get/all').pipe(take(1)).subscribe((eras: any) => {
      this.eras.next(eras);
    });
  }

  getEra(eraId: string) {
    this.currentEras.pipe(take(1)).subscribe({
      next: (eras: any) => {
        eras.find((era: any) => {
          if (era._id == eraId) {
            this.era.next(era);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getLesson(lessonId: string) {
    this.http.get(`http://localhost:3000/lessons/get/${lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson.next(lesson);
    });
  }

  getLessonItem(lessonItemId: string) {
    this.http.get(`http://localhost:3000/lessonItems/get/${lessonItemId}`).pipe(take(1)).subscribe((lessonItem: any) => {
      this.lessonItem.next(lessonItem);
    })
  }
}
