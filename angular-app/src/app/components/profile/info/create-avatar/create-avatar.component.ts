import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { take, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-avatar',
  templateUrl: './create-avatar.component.html',
  styleUrls: ['./create-avatar.component.css'],
})
export class CreateAvatarComponent implements OnInit {
  userSub?: Subscription;

  image: any = { name: '' };
  avatarName: string = '';
  avatarYears: string = '';
  avatarDescription: string = '';

  user: any;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
    this.userSub = this.authService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  createAvatar() {
    if (
      this.image.name === '' ||
      this.avatarName === '' ||
      this.avatarYears === '' ||
      this.avatarDescription === ''
    ) {
      return alert('Моля, попълнете всички полета.');
    }

    const newAvatar = {
      owner: this.user._id,
      image: this.image.name,
      name: this.avatarName,
      years: this.avatarYears,
      description: this.avatarDescription,
    };

    this.http
      .post(`${environment.backendUrl}avatars/create`, newAvatar)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/profile/info']);
        },
        error: (err: any) => {
          alert(err.message);
        },
      });
  }

  onImageUpload(event: any) {
    const file = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('uploadedImage', file, file.name);

    this.http
      .post(`${environment.backendUrl}upload/image`, fd)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.getImage(res.fileName).subscribe({
            next: (x: any) => {
              this.image.name = res.fileName;
              this.image.value = x.changingThisBreaksApplicationSecurity;
            },
            error: (error: any) => {},
          });
        },
        error: (error: any) => {},
      });
  }

  onImageDelete(event: MouseEvent) {
    this.image.name = '';
    this.image.value = '';
  }

  getImage(imageName: string): any {
    const url = `${environment.backendUrl}upload/image/get/${imageName}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((x) => {
        const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
      })
    );
  }
}
