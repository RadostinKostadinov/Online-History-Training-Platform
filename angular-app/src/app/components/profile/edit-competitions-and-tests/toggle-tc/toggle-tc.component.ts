import { Component, OnInit } from '@angular/core';
import { LessonsServiceService } from 'src/app/components/lessons/lessons-service.service';
import { Subscription } from 'rxjs';
import { EctServiceService } from '../ect-service.service';

@Component({
  selector: 'app-toggle-tc',
  templateUrl: './toggle-tc.component.html',
  styleUrls: ['./toggle-tc.component.css'],
})
export class ToggleTcComponent implements OnInit {
  erasSubscription?: Subscription;

  eras: any[] = [];
  lessons: any[] = [];
  testsCompetitions: any[] = [];
  selectedClass: any = '';
  selectedTC: string = '';

  selectedType: any = '';

  constructor(
    private lessonService: LessonsServiceService,
    private ect: EctServiceService
  ) {}

  ngOnInit(): void {
    this.lessonService.getEras();
    this.erasSubscription = this.lessonService.currentEras.subscribe(
      (eras: any) => {
        this.eras = eras;
        console.log(this.eras);
      }
    );

    this.ect.currentType.subscribe((selectedType: string) => {
      this.selectedType = selectedType;
    });
  }

  onSelectEra(event: any) {
    event.preventDefault();
    this.lessons = this.eras.find(
      (era) => era.name == event.target.value
    ).lessons;
  }

  onSelectLesson(event: any) {
    event.preventDefault();
    this.testsCompetitions = this.lessons
      .find((lesson) => lesson.name == event.target.value)
      [this.selectedType].filter((blank: any) => blank.isEnabled === true);
  }

  onSelectTC(event: any) {
    event.preventDefault();
    this.selectedTC = event.target.value;
  }

  onSelectClass(event: any) {
    event.preventDefault();
    this.selectedClass = event.target.value;
  }

  onActivate(event: any) {
    event.preventDefault();
    const tc = {
      ptcBlank: this.selectedTC,
      forClass: this.selectedClass,
      isActive: true,
      type: this.selectedType,
    };

    this.ect.toggleTC(tc).subscribe((res) => {
      alert(res.message);
    });
  }

  onDeactivate(event: any) {
    event.preventDefault();

    const tc = {
      ptcBlank: this.selectedTC,
      forClass: this.selectedClass,
      isActive: false,
      type: this.selectedType,
    };

    this.ect.toggleTC(tc).subscribe((res) => {
      alert(res.message);
    });
  }
}
