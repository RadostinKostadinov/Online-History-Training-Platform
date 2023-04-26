import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { EditResourcesService } from './../edit-resources.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choose-practice',
  templateUrl: './choose-practice.component.html',
  styleUrls: ['./choose-practice.component.css']
})
export class ChoosePracticeComponent implements OnInit, OnDestroy {
  lessonSubscription?: Subscription;

  lesson: any;
  practices: any;
  newPracticeId: any;
  currentPractices: any[] = [];

  constructor(private http: HttpClient, private ers: EditResourcesService, private router: Router) { }

  ngOnInit(): void {
    this.lessonSubscription = this.ers.currentLesson.subscribe((lesson: any) => {
      this.lesson = lesson
      this.updatePracticesList();
    });
  }

  onChoosePractice(event: any, practiceId: string) {
    event.preventDefault();
    this.ers.getPractice(practiceId);
    this.router.navigate(['/profile/edit-practice']);
  }

  addNewPractice(event: any) {
    const newPracticeName = (<any>document.getElementById('new-practice-input'))?.value;
    this.http.post('https://rk-diplomna-api.herokuapp.com/practices/create', {
      name: newPracticeName
    }).pipe(take(1)).subscribe((res: any) => {
      this.newPracticeId = res.practiceId;
      this.currentPractices.push(this.newPracticeId);
      this.http.patch(`https://rk-diplomna-api.herokuapp.com/lessons/update/${this.lesson._id}`, {
        "practices": this.currentPractices
      }).pipe(take(1)).subscribe(() => {
        this.updatePracticesList();
      });
    });
  }


  ngOnDestroy(): void {
    this.lessonSubscription?.unsubscribe();
  }

  updatePracticesList() {
    this.http.get(`https://rk-diplomna-api.herokuapp.com/lessons/get-practices/${this.lesson._id}`).pipe(take(1)).subscribe((practices: any) => {
      this.practices = practices;
      this.currentPractices = [];
      this.practices.forEach((practice: any) => {
        this.currentPractices.push(practice._id);
      })
    })
  }
}
