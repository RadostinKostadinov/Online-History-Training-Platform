import { Component, OnInit, Input } from '@angular/core';
import { EditCompetitionService } from '../edit-competition.service';

@Component({
  selector: 'app-edit-competition-heading',
  templateUrl: './edit-competition-heading.component.html',
  styleUrls: ['./edit-competition-heading.component.css'],
})
export class EditCompetitionHeadingComponent implements OnInit {
  @Input() competition: any = {};

  constructor(private ecs: EditCompetitionService) {}

  ngOnInit(): void {}

  savePTCBlank(event: MouseEvent) {
    event.preventDefault();
    this.ecs.updateQuestions();
    this.ecs.saveCompetition();
  }
}
