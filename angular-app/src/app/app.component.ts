import { Router } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  isAuthenticated: boolean = false;
  isAuthenticatedSubscription?: Subscription;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
      this.authService.autoLogin();
      this.isAuthenticatedSubscription = this.authService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
        if(!this.isAuthenticated) {
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription?.unsubscribe();
  }
}
