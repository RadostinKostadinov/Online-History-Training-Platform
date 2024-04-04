import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  student: any;
  teachers: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    this.http
      .get(`${environment.backendUrl}users/get/${studentId}`)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.student = res;
        this.student.classTeacher = this.student.classTeacher._id;
      });

    this.http
      .get(`${environment.backendUrl}users/all/teachers`)
      .pipe(take(1))
      .subscribe((teachers: any) => (this.teachers = teachers));
  }

  ngOnInit(): void {}

  updateProfile() {
    this.http
      .patch(
        `${environment.backendUrl}users/update/${this.student._id}`,
        this.student
      )
      .subscribe((res: any) => {
        console.log(res);
        alert('Успешно обновихте информацията за студента.');
      });
  }
}
