import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-tc',
  templateUrl: './display-tc.component.html',
  styleUrls: ['./display-tc.component.css'],
})
export class DisplayTcComponent implements OnInit {
  @Input() tc: any;
  @Output() choose = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.tc);
  }

  loadTC(event: Event) {
    event.preventDefault();
    this.choose.emit({ tcId: this.tc._id, ptcBlankId: this.tc.ptcBlank._id });
  }
}
