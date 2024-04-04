import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { take, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multiple-image-question-solve',
  templateUrl: './multiple-image-question-solve.component.html',
  styleUrls: ['./multiple-image-question-solve.component.css'],
})
export class MultipleImageQuestionSolveComponent implements OnInit {
  @Input() question: any;
  @Output() selected = new EventEmitter<any>();

  answersGroup: FormGroup;

  images: any[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.answersGroup = this.fb.group({
      answer: '',
    });
  }

  ngOnInit(): void {
    this.question.answers.forEach((imageName: string) => {
      this.getImage(imageName)
        .pipe(take(1))
        .subscribe((x: any) => {
          this.images.push({
            name: imageName,
            value: x.changingThisBreaksApplicationSecurity,
          });
        });
    });

    if (this.question.answer) {
      console.log('inside');
      this.answersGroup.patchValue({
        answer: this.question.answer,
      });
    }
  }

  onSelectAnswer(selectedAnswer: string) {
    this.selected.emit({
      questionId: this.question._id,
      selectedAnswer,
    });
  }

  getImage(imageName: string): any {
    const url = `${environment.backendUrl}upload/image/get/${imageName}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      take(1),
      map((x) => {
        const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tells Anuglar to trust this value
      })
    );
  }
}
