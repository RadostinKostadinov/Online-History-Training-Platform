import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
})
export class TeacherProfileComponent implements OnInit {
  userSub?: Subscription;

  teacher: any;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.user.pipe(take(1)).subscribe((teacher: any) => {
      this.teacher = teacher;
    });
  }

  ngOnInit(): void {}

  saveProfile() {
    this.http
      .patch(
        `${environment.backendUrl}users/update/${this.teacher._id}`,
        this.teacher
      )
      .subscribe((res: any) => {
        console.log(res);
        alert('Информацията е обновена.');
      });
  }
}
