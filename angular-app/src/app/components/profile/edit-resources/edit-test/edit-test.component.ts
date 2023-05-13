import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditResourcesService } from '../edit-resources.service';
import { HttpClient } from '@angular/common/http';
import * as Yup from 'yup';
import { EditTestService } from './edit-test.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  testSubscription?: Subscription;
  saveTestSubscirption?: Subscription;

  lesson: any;
  test: any;

  constructor(
    private ers: EditResourcesService,
    private http: HttpClient,
    private ets: EditTestService
  ) {}

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe(
      (lesson: any) => (this.lesson = lesson)
    );

    this.testSubscription = this.ers.currentTest.subscribe((test: any) => {
      this.test = test;
      this.test.questions.sort((a: any, b: any) => {
        if (a.questionIndex < b.questionIndex) return -1;
        if (a.questionIndex > b.questionIndex) return 1;
        return 0;
      });
    });

    this.saveTestSubscirption = this.ets.testsStatus().subscribe((value) => {
      this.savePTCBlank();
    });
  }

  savePTCBlank() {
    try {
      const isTestValid = this.validateTest();
      console.log('isTestValid', isTestValid);
      console.log(this.test);
    } catch (error: any) {
      alert(error.message);
    }
    return;

    const questionsElArr = document.querySelectorAll('.et-question');

    if (this.test.questions.length > 0) {
      this.test.questions.forEach((question: any) => {
        this.ers.deleteQuestion(question._id);
      });
    }
  }

  ngOnDestroy(): void {
    this.testSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
    this.saveTestSubscirption?.unsubscribe();
  }

  validateTest() {
    const questionSchema = Yup.object({
      itemDate: Yup.string().min(3, 'Датата на събитието е задължителна'),
      itemName: Yup.string().min(1, 'Името на събитието е задължително'),
      itemDisplayType: Yup.string().oneOf(
        ['date', 'name'],
        'Изберете типа на показване'
      ),
      question: Yup.string().min(1, 'Въведете въпрос'),
      answers: Yup.array().of(Yup.string().min(1, 'Въведете отговор')),
      correctAnswer: Yup.string().required('Изберете правилен отговор'),
      type: Yup.string()
        .oneOf(['multiple-choice-text', 'multiple-choice-image', 'open'])
        .required(),
      points: Yup.string().min(1, 'Въведете точки'),
      questionIndex: Yup.number().required(),
    });

    const testSchema = Yup.object({
      name: Yup.string().min(1, 'Въведете име на теста').required(),
      isEnabled: Yup.boolean().required(),
      competitionTime: Yup.number().required('Въведете продължителност'),
      lesson: Yup.string(),
      type: Yup.string().oneOf(['practice', 'test', 'competitions']),
      questions: Yup.array().of(questionSchema),
    });

    return testSchema.validateSync(this.test);
  }
}
