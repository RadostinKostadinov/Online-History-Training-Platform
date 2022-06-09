import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LessonsServiceService } from '../lessons-service.service';

@Component({
  selector: 'app-select-lesson',
  templateUrl: './select-lesson.component.html',
  styleUrls: ['./select-lesson.component.css']
})
export class SelectLessonComponent implements OnInit, OnDestroy {
  eraSubscription?: Subscription;
  lessonsSubscription?: Subscription;

  era: any;
  lesson: any;

  pageNumber: number = 0;
  lessonsPerPage: number = 4;
  maxPageNumber: number = 0;

  lessonsToShow: any[] = [];

  constructor(private lessonService: LessonsServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.eraSubscription = this.lessonService.currentEra.subscribe((era) => {
      this.era = era;
      this.maxPageNumber = Math.ceil(this.era.lessons.length / this.lessonsPerPage);
      this.updateLessonsTable();
    });
  }

  onLessonSelect(event: any, lessonId: string) {
    event.preventDefault();
    this.lessonService.getLesson(lessonId);

    this.router.navigate(['/lessons/lesson'], { relativeTo: this.route });
  }

  paginationPrevPage() {
    if (this.pageNumber > 0) {
      --this.pageNumber;
    };
    this.updateLessonsTable();
  }

  paginationNextPage() {
    if (this.pageNumber < this.maxPageNumber) {
      ++this.pageNumber;
    };

    this.updateLessonsTable();
  }

  updateLessonsTable() {
    if (this.pageNumber * this.lessonsPerPage + this.lessonsPerPage >= this.era.lessons.length) {
      this.lessonsToShow = this.era.lessons.slice(this.pageNumber * this.lessonsPerPage);
    } else {
      this.lessonsToShow = this.era.lessons.slice(this.pageNumber * this.lessonsPerPage, this.pageNumber * this.lessonsPerPage + this.lessonsPerPage);
    }
  }

  ngOnDestroy(): void {
    this.eraSubscription?.unsubscribe();
  }

}
