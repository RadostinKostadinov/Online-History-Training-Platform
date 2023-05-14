import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditTestService } from '../../edit-test/edit-test.service';
import { Subscription } from 'rxjs';
import * as Yup from 'yup';

@Component({
  selector: 'app-multiple-text-question',
  templateUrl: './multiple-text-question.component.html',
  styleUrls: ['./multiple-text-question.component.css'],
})
export class MultipleTextQuestionComponent implements OnInit, OnDestroy {
  @Input() question: any;
  @Output() removeQ = new EventEmitter<string>();
  questionStatusSub?: Subscription;

  public questionGroup: FormGroup;
  constructor(public fb: FormBuilder, private ets: EditTestService) {
    this.questionGroup = this.fb.group({
      itemName: '',
      itemDisplayType: '',
      itemDate: '',
      question: '',
      answer0: '',
      answer1: '',
      answer2: '',
      answer3: '',
      correctAnswer: '',
      points: '',
    });

    this.questionStatusSub = this.ets
      .questionsStatus()
      .subscribe(async (status) => {
        const updatedQuestion = Object.assign({}, this.questionGroup.value);
        updatedQuestion.answers = [
          updatedQuestion.answer0,
          updatedQuestion.answer1,
          updatedQuestion.answer2,
          updatedQuestion.answer3,
        ];
        delete updatedQuestion.answer0;
        delete updatedQuestion.answer1;
        delete updatedQuestion.answer2;
        delete updatedQuestion.answer3;
        Object.assign(this.question, updatedQuestion);
      });
  }

  ngOnInit(): void {
    this.questionGroup.patchValue({
      itemName: this.question.itemName,
      itemDisplayType: this.question.itemDisplayType,
      itemDate: this.question.itemDate,
      question: this.question.question,
      answer0: this.question.answers[0],
      answer1: this.question.answers[1],
      answer2: this.question.answers[2],
      answer3: this.question.answers[3],
      correctAnswer: this.question.correctAnswer,
      points: this.question.points,
    });
  }

  ngOnDestroy(): void {
    this.questionStatusSub?.unsubscribe();
  }

  onRemove() {
    this.removeQ.emit(this.question.questionIndex);
  }
}
