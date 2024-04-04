import { Component, OnInit } from '@angular/core';
import { Subscription, take, map } from 'rxjs';
import { EctServiceService } from '../ect-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-tc-solution',
  templateUrl: './view-tc-solution.component.html',
  styleUrls: ['./view-tc-solution.component.css'],
})
export class ViewTcSolutionComponent implements OnInit {
  solutionSub?: Subscription;

  solution: any = {};

  constructor(
    private ect: EctServiceService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.solutionSub = this.ect.currentSolution$.subscribe((solution: any) => {
      this.solution = solution;
      console.log(this.solution);
      if (this.solution.questions) {
        this.solution.questions.forEach((question: any) => {
          const originalDateString = question.answer.slice(0, 24);
          const regEx =
            /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3])-(0[0-9]|[1-5][0-9])-(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/;
          if (regEx.test(originalDateString)) {
            console.log('here');
            this.http
              .get(
                `${environment.backendUrl}upload/image/get/${question.answer}`,
                { responseType: 'blob' }
              )
              .pipe(
                take(1),
                map((x: any) => {
                  const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
                  return this.sanitizer.bypassSecurityTrustResourceUrl(
                    urlToBlob
                  ); // tell Anuglar to trust this value
                })
              )
              .subscribe((x: any) => {
                question.answer = x.changingThisBreaksApplicationSecurity;
                question.type = 'image';
              });
          }
        });
      }
    });
  }

  ngOnInit(): void {}
}
