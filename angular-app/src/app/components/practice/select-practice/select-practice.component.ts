import { Subscription } from 'rxjs';
import { PracticeService } from './../practice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-practice',
  templateUrl: './select-practice.component.html',
  styleUrls: ['./select-practice.component.css']
})
export class SelectPracticeComponent implements OnInit, OnDestroy {
  erasSubscription?: Subscription;
  practicesSubscription?: Subscription;

  isPopupVisible: boolean = false;

  eras: any;
  lessons: any;
  practices: any;


  constructor(private practiceService: PracticeService, private router: Router) { }

  ngOnInit(): void {
    this.practiceService.getErasFromDB().subscribe(() => {
      this.erasSubscription = this.practiceService.currentEras.subscribe((res) => {
        this.eras = res;
      });
    });
  }

  onSelectEra(event: any, eraId: string) {
    event.preventDefault();
    this.lessons = this.eras.find((era: any) => {
      if(era._id == eraId) return era;
    });
    this.lessons = this.lessons.lessons;
  }

  onSelectLesson(event: any, lessonId: string) {
    event.preventDefault();
    this.practiceService.getLessonFromDB(lessonId);
    this.practicesSubscription = this.practiceService.currentPractices.subscribe((practices: any) => {
      this.practices = practices.filter((practice: any) => {
        if(practice.isEnabled) return practice;
      });
    });

    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  onSelectPractice(event: any, practiceId: string) {
    event.preventDefault();
    this.practiceService.getPracticeFromDB(practiceId);

    this.router.navigate(['/practice/solve-practice']);
  }

  ngOnDestroy(): void {
      this.erasSubscription?.unsubscribe();
      this.practicesSubscription?.unsubscribe();
  }
}
