import { Component, OnInit } from '@angular/core';
import { EctServiceService } from '../ect-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css'],
})
export class ChooseComponent implements OnInit {
  constructor(private ect: EctServiceService, private router: Router) {}

  ngOnInit(): void {}

  onToggle(type: string) {
    this.ect.setCurrentType(type);
    this.router.navigate(['/profile/competitions/toggle']);
  }

  onCheck(type: string) {
    this.ect.setCurrentType(type);
    this.router.navigate(['profile/competitions/check']);
  }
}
