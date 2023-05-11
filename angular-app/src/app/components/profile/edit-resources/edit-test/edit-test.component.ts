import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditResourcesService } from '../edit-resources.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  testSubscription?: Subscription;

  lesson: any;
  test: any;

  constructor(private ers: EditResourcesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe((lesson: any) => this.lesson = lesson);
    this.testSubscription = this.ers.currentTest.subscribe((test: any) => {
      this.test = test;
      this.test.questions.sort((a: any, b: any) => {
        if(a.questionIndex < b.questionIndex) return -1;
        if(a.questionIndex > b.questionIndex) return 1;
        return 0;
      });
    });
  }

  savePTCBlank(event: any) {
    event.preventDefault();
    const questionsElArr = document.querySelectorAll('.et-question');

    if(this.test.questions.length > 0) {
      this.test.questions.forEach((question: any) => {
          this.ers.deleteQuestion(question._id);
      });
    }
  }

  ngOnDestroy(): void {
    this.testSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
  }

}
