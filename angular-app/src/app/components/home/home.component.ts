import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  user: User | null = {userToken: 'nqma'};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
