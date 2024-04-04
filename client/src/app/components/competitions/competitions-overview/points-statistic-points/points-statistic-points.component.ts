import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-points-statistic-points',
  templateUrl: './points-statistic-points.component.html',
  styleUrls: ['./points-statistic-points.component.css']
})
export class PointsStatisticPointsComponent implements OnInit {
  @Input() points: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

}
