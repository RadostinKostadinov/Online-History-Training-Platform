import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { EditResourcesService } from '../edit-resources.service';
import { HttpClient } from '@angular/common/http';
import * as Yup from 'yup';
import { EditTestService } from './edit-test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  testSubscription?: Subscription;
  saveTestSubscirption?: Subscription;

  private newQuestions: Observable<any>[] = [];

  lesson: any;
  test: any;
  oldQuestions: any[] = [];
  createdQuestions: any[] = [];

  constructor(
    private ers: EditResourcesService,
    private http: HttpClient,
    private ets: EditTestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe(
      (lesson: any) => (this.lesson = lesson)
    );

    this.testSubscription = this.ers.currentTest.subscribe((test: any) => {
      this.test = test;

      this.test.questions.forEach((question: any) => {
        this.oldQuestions.push(question._id);
      });

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

      this.oldQuestions.forEach((questionId) => {
        this.ers.deleteQuestion(questionId).subscribe((res) => {});
      });

      this.test.questions.forEach((question: any) => {
        this.newQuestions.push(
          this.ers.createQuestion({
            type: question.type,
            points: question.points,
            itemName: question.itemName,
            itemDate: question.itemDate,
            itemDisplayType: question.itemDisplayType,
            question: question.question,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
            questionIndex: question.questionIndex,
          })
        );
      });

      forkJoin(this.newQuestions).subscribe((res) => {
        res.forEach((question) => {
          this.createdQuestions.push(question.questionId);
        });

        this.ets
          .updateTest(
            this.test._id,
            Object.assign({}, this.test, {
              questions: this.createdQuestions,
              lesson: this.lesson._id,
            })
          )
          .subscribe(async (res: any) => {
            alert(res.message);
            this.router.navigate(['/profile/choose-test']);
          });
      });

      if (this.newQuestions.length === 0) {
        this.ets
          .updateTest(this.test._id, this.test)
          .subscribe(async (res: any) => {
            alert(res.message);
            this.router.navigate(['/profile/choose-test']);
          });
      }
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

  removeQuestion(questionIndex: any) {
    this.test.questions = this.test.questions.filter(
      (question: any) => question.questionIndex != questionIndex
    );
  }
}
