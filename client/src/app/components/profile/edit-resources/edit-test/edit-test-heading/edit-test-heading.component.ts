import { Component, Input, OnInit } from '@angular/core';
import { EditTestService } from '../edit-test.service';

@Component({
  selector: 'app-edit-test-heading',
  templateUrl: './edit-test-heading.component.html',
  styleUrls: ['./edit-test-heading.component.css'],
})
export class EditTestHeadingComponent implements OnInit {
  @Input() test: any = {};

  constructor(private ets: EditTestService) {}

  ngOnInit(): void {}

  savePTCBlank(event: MouseEvent) {
    event.preventDefault();
    this.ets.updateQuestions();
    console.log(this.test);
    this.ets.saveTest();
  }
}
