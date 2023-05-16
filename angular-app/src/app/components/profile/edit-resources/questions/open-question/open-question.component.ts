import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditTestService } from '../../edit-test/edit-test.service';
import { EditCompetitionService } from '../../edit-competition/edit-competition.service';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css'],
})
export class OpenQuestionComponent implements OnInit, OnDestroy {
  @Input() question: any;
  @Input() ptcType: any;
  @Output() removeQ = new EventEmitter<string>();

  questionStatusSub?: Subscription;

  public questionGroup: FormGroup;
  constructor(
    public fb: FormBuilder,
    private ets: EditTestService,
    private ecs: EditCompetitionService
  ) {
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
  }

  onRemove() {
    this.removeQ.emit(this.question.questionIndex);
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

    if (this.ptcType === 'test') {
      this.questionStatusSub = this.ets
        .questionsStatus()
        .subscribe((status) => {
          Object.assign(this.question, this.questionGroup.value);
          delete this.question.answer0;
          delete this.question.answer1;
          delete this.question.answer2;
          delete this.question.answer3;
          this.question.answers = [];
        });
    }

    if (this.ptcType === 'competition') {
      this.questionStatusSub = this.ecs
        .questionsStatus()
        .subscribe((status) => {
          Object.assign(this.question, this.questionGroup.value);
          delete this.question.answer0;
          delete this.question.answer1;
          delete this.question.answer2;
          delete this.question.answer3;
          this.question.answers = [];
        });
    }
  }

  ngOnDestroy(): void {
    this.questionStatusSub?.unsubscribe();
  }
}
