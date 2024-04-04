import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { EditResourcesService } from '../edit-resources.service';
import { Router } from '@angular/router';
import * as Yup from 'yup';
import { EditCompetitionService } from './edit-competition.service';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.css'],
})
export class EditCompetitionComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  competitionSubscription?: Subscription;
  saveCompetitionSubscirption?: Subscription;

  private newQuestions: Observable<any>[] = [];

  lesson: any;
  competition: any;
  oldQuestions: any[] = [];
  createdQuestions: any[] = [];

  constructor(
    private ers: EditResourcesService,
    private ets: EditCompetitionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe(
      (lesson: any) => (this.lesson = lesson)
    );

    this.competitionSubscription = this.ers.currentCompetition.subscribe(
      (competition: any) => {
        this.competition = competition;

        this.competition.questions.forEach((question: any) => {
          this.oldQuestions.push(question._id);
        });

        this.competition.questions.sort((a: any, b: any) => {
          if (a.questionIndex < b.questionIndex) return -1;
          if (a.questionIndex > b.questionIndex) return 1;
          return 0;
        });
      }
    );

    this.saveCompetitionSubscirption = this.ets
      .competitionsStatus()
      .subscribe((value) => {
        this.savePTCBlank();
      });
  }

  savePTCBlank() {
    try {
      console.log(this.competition);
      const isCompetitionValid = this.validateCompetition();

      this.oldQuestions.forEach((questionId) => {
        this.ers.deleteQuestion(questionId).subscribe((res) => {});
      });

      this.competition.questions.forEach((question: any) => {
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
          .updateCompetition(
            this.competition._id,
            Object.assign({}, this.competition, {
              questions: this.createdQuestions,
              lesson: this.lesson._id,
            })
          )
          .subscribe(async (res: any) => {
            alert(res.message);
            this.router.navigate(['/profile/choose-competition']);
          });
      });

      if (this.newQuestions.length === 0) {
        this.ets
          .updateCompetition(this.competition._id, this.competition)
          .subscribe(async (res: any) => {
            alert(res.message);
            this.router.navigate(['/profile/choose-competition']);
          });
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  validateCompetition() {
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

    const competitionSchema = Yup.object({
      name: Yup.string().min(1, 'Въведете име на теста').required(),
      isEnabled: Yup.boolean().required(),
      competitionTime: Yup.number().required('Въведете продължителност'),
      lesson: Yup.string(),
      type: Yup.string().oneOf(['practice', 'test', 'competition']),
      questions: Yup.array().of(questionSchema),
    });

    return competitionSchema.validateSync(this.competition);
  }

  removeQuestion(questionIndex: any) {
    this.competition.questions = this.competition.questions.filter(
      (question: any) => question.questionIndex != questionIndex
    );
  }

  ngOnDestroy(): void {
    this.competitionSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
    this.saveCompetitionSubscirption?.unsubscribe();
  }
}
