import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {
  @Input() test: any = {};

  public questionForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionType: ['multiple-choice-text']
    })
  }

  ngOnInit(): void {
  }

  onAddQuestion() {
    const newQuestion = {
      itemName: 'Въведете събитие',
      itemDate: 'Въведете дата',
      itemDisplayType: 'name',
      type: this.questionForm.value.questionType,
      questionIndex: this.test.questions.length + 1,
      points: 0,
      question: 'Въведете въпрос',
      answers: ['Отговор 1', 'Отговор 2', 'Отговор 3', 'Отговор 4'],
      correctAnswer: '',
    }
    this.test.questions.push(newQuestion);

    alert('Успешно добавихте нов въпрос.');
    console.table(this.test.questions);
  }
}
