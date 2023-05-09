import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { EditResourcesService } from '../edit-resources.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-test',
  templateUrl: './choose-test.component.html',
  styleUrls: ['./choose-test.component.css']
})
export class ChooseTestComponent implements OnInit {
  lessonSubsciprtion?: Subscription;

  lesson: any;
  tests: any;
  newTestId: any;
  currentTests: any[] = [];

  constructor(private http: HttpClient, private ers: EditResourcesService, private router: Router) { }

  ngOnInit(): void {
    this.lessonSubsciprtion = this.ers.currentLesson.subscribe((lesson: any) => {
      this.lesson = lesson;
      this.updateTestsList();
    });
  }

  updateTestsList() {
    this.http.get(`${environment.backendUrl}lessons/get-tests/${this.lesson._id}`).pipe((take(1))).subscribe((tests: any) => {
      this.tests = tests;
      this.currentTests = [];
      this.tests.forEach((test: any) => {
        this.currentTests.push(test._id);
      })
    })
  }

  onChooseTest(event: any, testId: string) {
    event.preventDefault();
    this.ers.getTest(testId);
    this.router.navigate(['/profile/edit-test']);
  }

  addNewTest(event: any) {
    const newTestName = (<any>document.getElementById('new-test-input'))?.value;
    console.log(newTestName);
    this.http.post(`${environment.backendUrl}tests/`, {
      name: newTestName
    }).pipe(take(1)).subscribe((res: any) => {
      console.log(res);
      this.newTestId = res.testId;
      this.currentTests.push(this.newTestId);
      this.http.patch(`${environment.backendUrl}lessons/update/${this.lesson._id}`, {
        "tests": this.currentTests
      }).pipe(take(1)).subscribe(() => {
        this.updateTestsList();
      })
    });
  }
}
