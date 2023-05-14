import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EctServiceService {
  private _currentType: string = 'competitions';

  currentType = new BehaviorSubject<string>(this._currentType);
  currentType$ = this.currentType.asObservable();

  constructor(private http: HttpClient) {}

  // SERVICE VARIABLES
  setCurrentType(type: string) {
    this._currentType = type;
    this.currentType.next(this._currentType);
  }

  // API CALLS
  toggleTC(body: any): Observable<any> {
    console.log(body);
    switch (body.type) {
      case 'tests':
        console.log('here');
        return this.http.post(`${environment.backendUrl}tests/opened/`, body);
      case 'competitions':
        return new Observable();
      default:
        return new Observable();
    }
  }
}
