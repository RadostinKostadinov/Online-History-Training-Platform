import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CompetitionsTestsServiceService } from '../../competitions-tests-service.service';
import { AuthService } from 'src/app/components/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solve-tc',
  templateUrl: './solve-tc.component.html',
  styleUrls: ['./solve-tc.component.css'],
})
export class SolveTcComponent implements OnInit, OnDestroy {
  constructor(
    private ctService: CompetitionsTestsServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ptcBlank: any;
  lesson: any;
  user: any;
  countdown: any;
  isStarted: boolean = false;
  displayedQuestion: any = '';
  markedQuestions: number = 0;
  totalQuestions: number = 0;
  isSent: boolean = false;
  tcId: any;

  ngOnInit(): void {
    this.ctService.chosen$.pipe(take(2)).subscribe((ptcBlank: any) => {
      this.ptcBlank = ptcBlank;
      this.lesson = ptcBlank.lesson;
      this.totalQuestions = ptcBlank.questions.length;
    });

    this.authService.user.subscribe((user: any) => {
      this.user = user;
    });

    this.tcId = this.route.snapshot.paramMap.get('tcId');
  }

  sendPractice() {
    this.isStarted = false;
    this.isSent = true;
    this.http
      .post(`${environment.backendUrl}${this.ptcBlank.type}s/create-solved/`, {
        userId: this.user._id,
        tcId: this.tcId,
        ptcBlankId: this.ptcBlank._id,
        solved: {
          owner: this.user._id,
          type: this.ptcBlank.type,
          lesssonName: this.lesson.name,
          name: this.ptcBlank.name,
          questions: this.ptcBlank.questions.map(
            (question: any, index: any) => {
              return {
                order: index,
                content: question.question,
                answer: question.answer,
              };
            }
          ),
        },
      })
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {},
        error: (error: any) => {
          console.log(error.message);
          alert(
            'Възникна грешка, моля не затваряйте страницата и се обърнете към учител.'
          );
        },
      });
  }

  startPractice(event: any) {
    event.preventDefault();
    this.isStarted = true;
    this.timer(this.ptcBlank.competitionTime);
  }

  onChooseItem(event: any, questionId: string) {
    event.preventDefault();

    this.displayedQuestion = this.ptcBlank.questions.find((question: any) => {
      if (question._id == questionId) return question;
    });

    document.querySelectorAll('.checked').forEach((element: any) => {
      element.classList.remove('checked');
    });

    if (this.displayedQuestion.markedAnswer) {
      document
        .querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)
        ?.classList.add('checked');
    }
    this.markedQuestions = document.querySelectorAll(
      '.solvep-timeline-checked'
    ).length;

    setTimeout(() => {
      document
        .getElementById('solvep-question')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  prevQuestion() {
    let newQuestion = this.ptcBlank.questions.find((question: any) => {
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
        document
          .querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)
          ?.classList.add('checked');
      }
    }

    setTimeout(() => {
      document
        .getElementById('solvep-question')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  nextQuestion() {
    let newQuestion = this.ptcBlank.questions.find((question: any) => {
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
        document
          .querySelector(`.ep-check-a${this.displayedQuestion.markedAnswerNum}`)
          ?.classList.add('checked');
      }
    }

    setTimeout(() => {
      document
        .getElementById('solvep-question')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  markQuestion(marked: any) {
    const question = this.ptcBlank.questions.find((q: any) => {
      return q._id == marked.questionId;
    });

    if (!question.answer) {
      this.markedQuestions++;
    }

    question.answer = marked.selectedAnswer;
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
      document.getElementById(
        'solvep-minutes-left'
      )!.innerHTML = `${minutesToDisplay}:${secondsToDisplay}`;

      if (minutes == 0 && seconds == 0) {
        this.stopTimer();
        console.log('Time`s up!');
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.countdown);
  }

  goToHomepage() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    clearInterval(this.countdown);
  }
}
