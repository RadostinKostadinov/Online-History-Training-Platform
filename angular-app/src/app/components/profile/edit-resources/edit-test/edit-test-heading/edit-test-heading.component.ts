import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-edit-test-heading',
  templateUrl: './edit-test-heading.component.html',
  styleUrls: ['./edit-test-heading.component.css']
})
export class EditTestHeadingComponent implements OnInit {
  @Input() test: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  savePTCBlank(event: MouseEvent) {
    event.preventDefault();
  }
}
