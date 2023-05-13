import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-competitions-overview',
  templateUrl: './competitions-overview.component.html',
  styleUrls: ['./competitions-overview.component.css']
})
export class CompetitionsOverviewComponent implements OnInit, OnDestroy {
  userSub?: Subscription;

  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
