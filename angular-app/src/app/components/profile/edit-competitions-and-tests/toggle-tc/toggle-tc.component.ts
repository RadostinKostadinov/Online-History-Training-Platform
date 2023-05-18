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

  tc = {
    ptcBlank: '',
    forClass: '',
    isActive: false,
    type: '',
    eraName: '',
    lessonName: '',
  };

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

    this.ect.currentType$.subscribe((selectedType: string) => {
      this.selectedType = selectedType;
      this.tc.type = selectedType;
    });
  }

  onSelectEra(event: any) {
    event.preventDefault();
    this.tc.eraName = event.target.value;
    this.lessons = this.eras.find(
      (era) => era.name == event.target.value
    ).lessons;
  }

  onSelectLesson(event: any) {
    event.preventDefault();
    this.tc.lessonName = event.target.value;
    this.testsCompetitions = this.lessons
      .find((lesson) => lesson.name == event.target.value)
      [this.selectedType].filter((blank: any) => blank.isEnabled === true);
  }

  onSelectTC(event: any) {
    event.preventDefault();
    this.tc.ptcBlank = event.target.value;
  }

  onSelectClass(event: any) {
    event.preventDefault();
    this.tc.forClass = event.target.value;
  }

  onActivate(event: any) {
    event.preventDefault();
    this.tc.isActive = true;
    this.tc.type = this.selectedType;

    this.ect.toggleTC(this.tc).subscribe((res) => {
      alert(res.message);
    });
  }

  onDeactivate(event: any) {
    event.preventDefault();
    this.tc.isActive = false;

    this.ect.toggleTC(this.tc).subscribe((res) => {
      alert(res.message);
    });
  }
}
