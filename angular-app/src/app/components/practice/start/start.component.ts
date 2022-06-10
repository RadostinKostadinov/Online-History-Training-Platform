import { Subscription } from 'rxjs';
import { PracticeService } from './../practice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  lessonSubscription?: Subscription;

  lesson: any;

  constructor(private practiceService: PracticeService) { }

  ngOnInit(): void {
    this.lessonSubscription = this.practiceService.currentLesson.subscribe((lesson) => {
      this.lesson = lesson;
      console.log(lesson);
    });
  }

}
