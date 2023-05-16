import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CompetitionsTestsServiceService } from '../competitions-tests-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competitions-overview',
  templateUrl: './competitions-overview.component.html',
  styleUrls: ['./competitions-overview.component.css'],
})
export class CompetitionsOverviewComponent implements OnInit, OnDestroy {
  userSub?: Subscription;
  testsSub?: Subscription;
  competitionsSub?: Subscription;

  user: any;
  openedTests: any;
  openedCompetitions: any;

  constructor(
    private authService: AuthService,
    private ctService: CompetitionsTestsServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.testsSub = this.ctService.openedTests$.subscribe((tests) => {
      this.openedTests = tests;
    });

    this.competitionsSub = this.ctService.openedCompetitions$.subscribe(
      (competitions) => {
        this.openedCompetitions = competitions;
      }
    );

    this.ctService.loadOpenedTests(this.user.class);
    this.ctService.loadOpenedCompetitions(this.user.class);
  }

  onChooseTC(event: any) {
    this.ctService.setChosen(event.ptcBlankId);
    this.router.navigate(['/competitions/solve-tc', event.tcId]);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.testsSub?.unsubscribe();
    this.competitionsSub?.unsubscribe();
  }
}
