import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-text-question-solve',
  templateUrl: './multiple-text-question-solve.component.html',
  styleUrls: ['./multiple-text-question-solve.component.css'],
})
export class MultipleTextQuestionSolveComponent implements OnInit {
  @Input() question: any;
  @Output() selected = new EventEmitter<any>();

  radioGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.radioGroup = fb.group({
      answer: '',
    });
  }

  ngOnInit(): void {
    if (this.question.answer) {
      this.radioGroup.patchValue({
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
}
