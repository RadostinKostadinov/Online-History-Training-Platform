import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-open-question-solve',
  templateUrl: './open-question-solve.component.html',
  styleUrls: ['./open-question-solve.component.css'],
})
export class OpenQuestionSolveComponent implements OnInit {
  @Input() question: any;
  @Output() selected = new EventEmitter<any>();

  answerGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.answerGroup = this.fb.group({
      answer: '',
    });
  }

  ngOnInit(): void {
    if (this.question.answer) {
      this.answerGroup.patchValue({
        answer: this.question.answer,
      });
    }
  }

  onSelectAnswer(event: any) {
    this.selected.emit({
      questionId: this.question._id,
      selectedAnswer: event.target.value,
    });
  }
}
