import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { Subscription, take } from 'rxjs';
import { PracticeService } from '../practice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solve-practice',
  templateUrl: './solve-practice.component.html',
  styleUrls: ['./solve-practice.component.css']
})
export class SolvePracticeComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;
  practiceSubscription?: Subscription;
  userSubscription?: Subscription;

  lesson: any;
  practice: any;
  user: any;
  countdown: any;
  isStarted: boolean = false;
  displayedQuestion: any = '';
  markedQuestions: number = 0;
  totalQuestions: number = 0;
  isSent: boolean = false;

  constructor(private practiceService: PracticeService, private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.lessonSubscription = this.practiceService.currentLesson.subscribe((lesson) => {
      this.lesson = lesson;
    });

    this.practiceSubscription = this.practiceService.currentPractice.subscribe((practice) => {
      this.practice = practice;
      this.totalQuestions = this.practice.questions.length;
    });

    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });

  };

  sendPractice() {
    this.isStarted = false;
    this.isSent = true;
    this.http.post(`${environment.backendUrl}practices/create-solved/${this.practice._id}`, {
      owner: this.user._id,
      type: 'practice',
      lessonName: this.lesson.name,
      practiceName: this.practice.name,
      questions: this.practice.questions.map((question: any) => {
        return {
          order: question.questionIndex,
          content: question.question,
          answer: question.markedAnswer,
          points: question.points
        }
      })
    }).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.user.solvedPTCs.push(res.savedSolvedPractice);

        this.http.patch(`${environment.backendUrl}users/update/${this.user._id}`, {
          solvedPTCs: this.user.solvedPTCs,
          practicesPoints: Number(this.user.practicesPoints) + Number(res.studentPoints)
        }).pipe(take(1)).subscribe({
          next: (res: any) => {
          },
          error: (err) => {
            console.error(err);
          }
        })
      },
      error: (res: any) => {
        alert('Възникна грешка, моля не затваряйте страница и се обърнете към учител.');
      }
    });
  }

  goToHomepage() {
    this.router.navigate(['/']);
  }

  nextQuestion() {
    let newQuestion = this.practice.questions.find((question: any) => {
      let q1 = Number(question.questionIndex);
      let q2 = Number(this.displayedQuestion.questionIndex) + 1;
      if (q1 == q2) {
        return question;
      }
    });

    if (newQuestion) {
      this.displayedQuestion = newQuestion;

      document.querySelectorAll('.checked').forEach((element: any) => {
        element.classList.remove('checked');
      });

      if (this.displayedQuestion.markedAnswer) {
        document.querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)?.classList.add('checked');
      }
    }
  }

  prevQuestion() {
    let newQuestion = this.practice.questions.find((question: any) => {
      let q1 = Number(question.questionIndex);
      let q2 = Number(this.displayedQuestion.questionIndex) + -1;
      if (q1 == q2) {
        return question;
      }
    });

    if (newQuestion) {
      this.displayedQuestion = newQuestion;

      document.querySelectorAll('.checked').forEach((element: any) => {
        element.classList.remove('checked');
      });

      if (this.displayedQuestion.markedAnswer) {
        document.querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)?.classList.add('checked');
      }
    }


  }

  startPractice(event: any) {
    event.preventDefault();
    this.isStarted = true;
    this.timer(this.practice.competitionTime);
  }

  onChooseItem(event: any, questionId: string) {
    event.preventDefault();

    this.displayedQuestion = this.practice.questions.find((question: any) => {
      if (question._id == questionId) return question;
    });

    document.querySelectorAll('.checked').forEach((element: any) => {
      element.classList.remove('checked');
    });

    if (this.displayedQuestion.markedAnswer) {
      document.querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)?.classList.add('checked');
    }
    this.markedQuestions = document.querySelectorAll('.solvep-timeline-checked').length;
  }

  markQuestion(event: any, displayedQuestionId: string, markedAnswer: string, markedAnswerNum: number) {
    event.preventDefault();
    if (!this.displayedQuestion.markedAnswer) {
      this.markedQuestions++;
    }

    event.currentTarget.parentElement.parentElement.parentElement.querySelectorAll('.checked').forEach((element: any) => {
      element.classList.remove('checked');
    });

    event.target.classList.toggle("checked");

    this.practice.questions.find((question: any) => {
      if (question._id == displayedQuestionId) {
        question.markedAnswer = markedAnswer;
        question.markedAnswerNum = markedAnswerNum;
      }
    });

  }

  timer(competitionTime: any) {
    competitionTime = Number(competitionTime) * 60; // minutes to seconds

    this.countdown = setInterval(() => {
      competitionTime = competitionTime - 1;
      if (isNaN(competitionTime)) return;
      let seconds = competitionTime % 60;
      let minutes = Math.floor(competitionTime / 60);

      let secondsToDisplay = seconds < 10 ? `0${seconds}` : seconds;
      let minutesToDisplay = minutes < 10 ? `0${minutes}` : minutes;
      document.getElementById('solvep-minutes-left')!.innerHTML = `${minutesToDisplay}:${secondsToDisplay}`;

      if (minutes == 0 && seconds == 0) {
        this.stopTimer();
        console.log('Time`s up!');
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.countdown);
  }

  ngOnDestroy(): void {
    clearInterval(this.countdown);
  }

}


