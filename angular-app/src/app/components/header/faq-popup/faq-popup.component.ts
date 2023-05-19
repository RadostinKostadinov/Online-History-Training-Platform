import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-faq-popup',
  templateUrl: './faq-popup.component.html',
  styleUrls: ['./faq-popup.component.css'],
})
export class FaqPopupComponent implements OnInit {
  @Input() isFaqOpened: any;
  @Input() role: any = 'student';

  selected: any = 'student';

  @Output() closeFaq = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  accordionToggle(event: any) {
    let active = document.getElementsByClassName('active-faq');
    for (let y = 0; y < active.length; y++) {
      active[y].classList.toggle('active-faq');
    }
    active = document.getElementsByClassName('active-label');
    for (let y = 0; y < active.length; y++) {
      active[y].classList.toggle('active-label');
    }

    event.target.classList.toggle('active-label');
    event.target.nextElementSibling.classList.toggle('active-faq');
  }

  showTeacherFaq() {
    this.selected = 'teacher';
  }

  showStudentFaq() {
    this.selected = 'student';
  }
}
