import { Router } from '@angular/router';
import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Subscription, map, take } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  user: User | any = { userToken: 'nqma' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: any) => {
      this.user = user;
      this.getImage(user.avatar.image)
        .pipe(take(1))
        .subscribe((x: any) => {
          this.user.avatar.displayImage =
            x.changingThisBreaksApplicationSecurity;
        });
      this.isAuthenticated = !!user;
      if (this.isAuthenticated && this.user?.type == 'teacher') {
        this.router.navigate(['/profile']);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
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
