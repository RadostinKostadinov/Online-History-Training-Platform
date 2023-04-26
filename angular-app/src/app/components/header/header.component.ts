import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSub?: Subscription;

  user: any;

  days: any[] = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    setInterval(() => {
      let today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        date = today.getDate(),
        h = this.checkTime(today.getHours()),
        m = this.checkTime(today.getMinutes()),
        s = this.checkTime(today.getSeconds());
      let day = today.getDay();
      if (document.querySelector('.header-time p')) {
        document.querySelector('.header-time p')!.innerHTML = `${year}/${month + 1}/${date} - ${h}:${m}:${s} - ${this.days[day]}`;
      }
    }, 500)
  }

  onLogout() {
    this.authService.logout();
  }

  checkTime(i: number) {
    return (i < 10) ? "0" + i : i;
  }
}

