import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Subscription, take, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-avatars',
  templateUrl: './my-avatars.component.html',
  styleUrls: ['./my-avatars.component.css'],
})
export class MyAvatarsComponent implements OnInit, OnDestroy {
  userSub?: Subscription;

  user: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.userSub = this.authService.user.subscribe((user: any) => {
      this.user = user;
      if (this.user.avatars) {
        this.user.avatars = this.user.avatars.filter(
          (avatar: any) => avatar.isReviewed
        );
        this.user.avatars.forEach((avatar: any) => {
          avatar.parsedDate = new Date(avatar.createdAt).toLocaleDateString(
            'bg-BG'
          );
          this.getImage(avatar.image)
            .pipe(take(1))
            .subscribe((x: any) => {
              avatar.displayImage = x.changingThisBreaksApplicationSecurity;
            });
        });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  useAvatar(avatarId: string) {
    this.http
      .post(`${environment.backendUrl}avatars/set/${avatarId}`, {
        userId: this.user._id,
      })
      .subscribe((res: any) => {
        this.user.avatar = res.avatar;
        this.authService.user.next(this.user);
        localStorage.setItem('userData', JSON.stringify(this.user));
        alert('Аватарът е сменен.');
      });
  }

  createAvatar() {
    this.router.navigate(['profile/info/create-avatar']);
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
