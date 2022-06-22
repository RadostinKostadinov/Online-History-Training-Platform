import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg: string = '';
  isRegSuccessful: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    this.errorMsg = '';

    if(form.valid === false) {
      return;
    }

    this.authService.register(form.value).subscribe({
    next: (resData) => {
      this.isRegSuccessful = true;
      form.reset();
    },
    error: (errorMessage) => {
      this.errorMsg = errorMessage;
    }
  });;

  }
}
