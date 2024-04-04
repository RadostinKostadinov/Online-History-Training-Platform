import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewProfilesService {
  private allStudentsBehSub = new BehaviorSubject({});
  private studentBehSub = new BehaviorSubject({});

  students = this.allStudentsBehSub.asObservable();
  student = this.studentBehSub.asObservable();

  constructor(private http: HttpClient) { }

  getAllStudents() {
    this.http.get(`${environment.backendUrl}users/get/all-students`).pipe(take(1)).subscribe((students: any) => {
      this.allStudentsBehSub.next(students);
    });
  }

  setStudent(student: any) {
    this.studentBehSub.next(student);
  }
}
