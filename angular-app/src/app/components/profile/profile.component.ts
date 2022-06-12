import { AuthService } from './../auth/auth.service';
import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.pipe(take(1)).subscribe((user) => this.user = user);
  }

}
