import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {

    return this.http.post<any>('http://localhost:3000/auth/login',
      {
        username: username,
        password: password
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.username, resData.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post('http://localhost:3000/auth/register',
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
    const userData: {username: string; token: string;} = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.username, userData.token);

    if(loadedUser.userToken){
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username = username, token = token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '500 - Проблем със сървъра.'
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }

    console.log(errorRes.error.message);
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

    return throwError(errorMessage);
  }
}
