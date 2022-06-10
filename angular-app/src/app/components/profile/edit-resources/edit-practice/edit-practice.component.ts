import { firstValueFrom, forkJoin, isObservable, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subscription, take } from 'rxjs';
import { EditResourcesService } from './../edit-resources.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-practice',
  templateUrl: './edit-practice.component.html',
  styleUrls: ['./edit-practice.component.css']
})
export class EditPracticeComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  practiceSubscription?: Subscription;

  myObservables: Observable<any>[] = new Array();

  questionsCreated: Observable<any> = of();

  lesson: any;
  practice: any;
  blankIsActive: boolean = false;

  blankQuestionsIds: any[] = [];

  constructor(private ers: EditResourcesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe((lesson: any) => this.lesson = lesson);
    this.practiceSubscription = this.ers.currentPractice.subscribe((practice: any) => {
      this.practice = practice;
      this.blankIsActive = this.practice.isEnabled;
      this.practice.questions.sort((a: any, b: any) => {
        if (a.questionIndex < b.questionIndex) return -1;
        if (a.questionIndex > b.questionIndex) return 1;
        return 0;
      });
    }
    );
  }

  markQuestion(event: any, questionNumber: number) {
    event.preventDefault();

    event.currentTarget.parentElement.parentElement.parentElement.querySelectorAll('.checked').forEach((element: any) => {
      element.classList.toggle('checked');
    });
    event.currentTarget.parentElement.parentElement.parentElement.querySelectorAll('.ep-input-correct-answer').forEach((element: any) => {
      element.classList.toggle('ep-input-correct-answer');
    });

    event.target.classList.toggle("checked");
    const parentDiv = event.target.parentElement;
    parentDiv.querySelector('input').classList.toggle("ep-input-correct-answer");
  }

  savePTCBlank(event: any) {
    event.preventDefault();
    this.blankQuestionsIds = [];
    this.myObservables = [];
    const questionsElArr = document.querySelectorAll('.ep-question');

    if (this.practice.questions.length > 0) {
      this.practice.questions.forEach((question: any) => {
        this.ers.deleteQuestion(question._id).subscribe(() => { });
      });
    }

    let isErrorOccured = false;
    questionsElArr.forEach((questionEl, index, array) => {
      if (isErrorOccured) return;
      let itemName = (<any>questionEl.querySelector('div:nth-of-type(1)'))!.innerText;
      let questionIndex = (<any>questionEl.querySelector('.ep-question-index span'))!.innerText;
      let type = 'multiple-choice-text'; //multiple-choice-text, multiple-choice-image, fill-in-the-blank

      let question;
      try {
        question = (<any>questionEl.querySelector('.ep-question-name'))!.value;
        if (question == '') {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} - Няма условие`);
        }
      } catch (err: any) {
        isErrorOccured = true;
        alert(err.message);
        return;
      }

      let answers;
      try {
        let answ1 = (<any>questionEl.querySelector('.ep-asnwers-wrapper .ep-a1-check')).parentElement.querySelector('input').value;
        if (answ1 == '') {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} Отговор 1 - не е попълнен`);
        }
        let answ2 = (<any>questionEl.querySelector('.ep-asnwers-wrapper .ep-a2-check')).parentElement.querySelector('input').value;
        if (answ2 == '') {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} Отговор 2 - не е попълнен`);
        }
        let answ3 = (<any>questionEl.querySelector('.ep-asnwers-wrapper .ep-a3-check')).parentElement.querySelector('input').value;
        if (answ3 == '') {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} Отговор 3 - не е попълнен`);
        }
        let answ4 = (<any>questionEl.querySelector('.ep-asnwers-wrapper .ep-a4-check')).parentElement.querySelector('input').value;
        if (answ4 == '') {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} Отговор 4 - не е попълнен`);
        }
        answers = [
          answ1,
          answ2,
          answ3,
          answ4
        ]
      } catch (err: any) {
        isErrorOccured = true;
        alert(err.message);
        return;
      }

      let correctAnswer;
      try {
        correctAnswer = (<any>questionEl.querySelector('.ep-question-box > div > div > div > div.checked')).parentElement.querySelector('input').value;
      } catch (err) {
        if (err) {
          isErrorOccured = true;
          alert(`Моля проверете: Въпрос ${questionIndex} - няма маркиран верен отговор.`);
          return;
        }
      }

      let points;
      try {
        points = (<any>questionEl.querySelector('.ep-question-points'))!.value;
        if (points <= 0) {
          throw new Error(`Моля проверете: Въпрос ${questionIndex} - Невалидни точки`);
        }
      } catch (err: any) {
        isErrorOccured = true;
        alert(err.message);
        return;
      }

      const questionObj = {
        type,
        points,
        itemName,
        question,
        answers,
        correctAnswer,
        questionIndex,
      };

      this.myObservables.push(this.createQuestion(questionObj));

    });

    let blankName = (<any>document.querySelector('#ep-name'))!.value;
    if (blankName == '') {
      alert('Невалидно име на упражнението.');
      return;
    }

    let blankCompTime = (<any>document.querySelector('#ep-competition-time'))!.value;
    if (blankCompTime <= 0) {
      alert('Невалидна продължителност на упражнението.');
      return;
    }

    forkJoin(this.myObservables).subscribe((res) => {
      res.forEach((createdQuestion) => {
        this.blankQuestionsIds.push(createdQuestion.questionId);
      })

      const ptcBlank = {
        name: blankName,
        type: 'practice',
        lesson: this.lesson._id,
        questions: this.blankQuestionsIds,
        competitionTime: blankCompTime,
        isEnabled: this.blankIsActive,
      }

      this.http.patch(`http://localhost:3000/practices/update/${this.practice._id}`, ptcBlank).pipe(take(1)).subscribe((res: any) => {
        this.ers.getPractice(res.practiceId);
        alert('Успешно запазено.');
      });
    })

  }

  activatePractice() {
    this.blankIsActive = true;
  }

  disablePractice(){
    this.blankIsActive = false;
  }

  ngOnDestroy(): void {
    this.lessonSubscription?.unsubscribe();
    this.practiceSubscription?.unsubscribe();
  }

  createQuestion(questionObject: Object) {
    return this.http.post('http://localhost:3000/questions/create', questionObject);
  }

}
