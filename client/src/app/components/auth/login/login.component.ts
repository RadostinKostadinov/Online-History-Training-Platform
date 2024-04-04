import { User } from './../user.model';
import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<boolean>();

  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.errorMsg = '';

    if (form.valid === false) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(resData => {
      this.loggedIn.emit(true);
      this.router.navigate(['/']);
    }, errorMessage => {
      this.errorMsg = errorMessage;
    });

    form.reset();
  }
}
