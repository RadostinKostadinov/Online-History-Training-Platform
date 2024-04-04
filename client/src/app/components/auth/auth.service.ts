import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {

    return this.http.post<any>(`${environment.backendUrl}auth/login`,
      {
        username: username,
        password: password
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.username, resData.token, resData);
        })
      );
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.backendUrl}auth/register`,
      {
        username: user.username,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        surName: user.surName,
        lastName: user.lastName,
        class: user.school_class,
        number: user.number
      }).pipe(
        catchError(this.handleError)
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    let loadedUser = new User(userData.username, userData.token);
    loadedUser = Object.assign(loadedUser, userData);

    if (loadedUser.userToken) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(username: string, token: string, resData: Object) {
    let user = new User(username = username, token = token);
    user = Object.assign(user, resData);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '500 - Проблем със сървъра.'
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorRes.error);
    }

    switch (errorRes.error.message) {
      case 'Грешна парола.':
        errorMessage = 'Грешна парола, моля опитайте отново.';
        break;
      case 'Няма такъв потребител.':
        errorMessage = 'Невалиден потребител, моля опитайте отново.';
        break;
      case 'Профилът все още не е одобрен.':
        errorMessage = 'Профилът все още не е одобрен, обърнете се към учител.'
    }

    return throwError(errorRes.error.message);
  }
}
