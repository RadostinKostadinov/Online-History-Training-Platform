import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit, OnDestroy {
  userSub?: Subscription;

  user: any;
  constructor(private authService: AuthService, private router: Router) {
    this.userSub = this.authService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  gotoAvatars() {
    this.router.navigate(['/profile/info/my-avatars']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
