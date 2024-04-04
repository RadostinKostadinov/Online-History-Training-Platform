import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take, map, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-avatars-check',
  templateUrl: './avatars-check.component.html',
  styleUrls: ['./avatars-check.component.css'],
})
export class AvatarsCheckComponent implements OnInit {
  teacherSub?: Subscription;

  avatars: any;
  teacher: any;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.teacherSub = authService.user.subscribe((user: any) => {
      this.teacher = user;
    });

    this.http
      .get(`${environment.backendUrl}avatars/not-reviewed`)
      .pipe(take(1))
      .subscribe((avatars: any) => {
        this.avatars = avatars;
        this.avatars.forEach((avatar: any) => {
          this.getImage(avatar.image)
            .pipe(take(1))
            .subscribe((x: any) => {
              avatar.displayImage = x.changingThisBreaksApplicationSecurity;
            });
        });
      });
  }

  ngOnInit(): void {}

  unapprove(avatar: any) {
    this.http
      .put(`${environment.backendUrl}avatars/unapprove/${avatar._id}`, {
        teacherId: this.teacher._id,
      })
      .pipe(take(1))
      .subscribe((res) => {
        this.avatars = this.avatars.filter(
          (avatar: any) => avatar._id !== avatar._id
        );
      });
    alert('Отхвърлихте аватар');
  }

  approve(avatar: any) {
    console.log(avatar);
    if (!avatar.points) {
      return alert('Въведете точки');
    } else {
      avatar.judgedBy = this.teacher.firstName + ' ' + this.teacher.lastName;
      this.http
        .put(`${environment.backendUrl}avatars/approve/${avatar._id}`, avatar)
        .pipe(take(1))
        .subscribe((res) => {
          this.avatars = this.avatars.filter(
            (avatar: any) => avatar._id !== avatar._id
          );
        });
      alert('Одобрихте аватар.');
    }
  }

  getImage(imageName: string): any {
    const url = `${environment.backendUrl}upload/image/get/${imageName}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      take(1),
      map((x) => {
        const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tells Anuglar to trust this value
      })
    );
  }
}
