import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditResourcesService } from '../edit-resources.service';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-competition',
  templateUrl: './choose-competition.component.html',
  styleUrls: ['./choose-competition.component.css'],
})
export class ChooseCompetitionComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;

  lesson: any;
  competitions: any;
  newCompetitionId: any;
  currentCompetitions: any[] = [];

  constructor(
    private http: HttpClient,
    private ers: EditResourcesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe(
      (lesson: any) => {
        this.lesson = lesson;
        this.updateCompetitionsList();
      }
    );
  }

  updateCompetitionsList() {
    this.http
      .get(
        `${environment.backendUrl}lessons/get-competitions/${this.lesson._id}`
      )
      .pipe(take(1))
      .subscribe((competitions: any) => {
        this.competitions = competitions;
        this.currentCompetitions = [];
        this.competitions.forEach((competition: any) => {
          this.currentCompetitions.push(competition._id);
        });
      });
  }

  onChooseCompetition(event: any, competitionId: string) {
    event.preventDefault();
    this.ers.getCompetition(competitionId);
    this.router.navigate(['/profile/edit-competition']);
  }

  addNewCompetition(event: any) {
    const newCompetitionName = (<any>document.getElementById('new-test-input'))
      ?.value;
    this.http
      .post(`${environment.backendUrl}competitions`, {
        name: newCompetitionName,
        type: 'competition',
      })
      .pipe(take(1))
      .subscribe((res: any) => {
        this.newCompetitionId = res.competitionId;
        this.currentCompetitions.push(this.newCompetitionId);
        this.http
          .patch(`${environment.backendUrl}lessons/update/${this.lesson._id}`, {
            competitions: this.currentCompetitions,
          })
          .pipe(take(1))
          .subscribe(() => {
            this.updateCompetitionsList();
          });
      });
  }

  ngOnDestroy() {
    this.lessonSubscription?.unsubscribe();
  }
}
