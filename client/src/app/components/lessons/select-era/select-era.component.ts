import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LessonsServiceService } from '../lessons-service.service';

@Component({
  selector: 'app-select-era',
  templateUrl: './select-era.component.html',
  styleUrls: ['./select-era.component.css']
})
export class SelectEraComponent implements OnInit, OnDestroy {
  erasSubscription?: Subscription;

  eras: any;

  constructor(private lessonService: LessonsServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.lessonService.getEras();
    this.erasSubscription = this.lessonService.currentEras.subscribe((eras) => this.eras = eras);
  }

  onEraSelect(event: any, eraId: string) {
    event.preventDefault();
    this.lessonService.getEra(eraId);
    this.router.navigate(['/lessons/select-lesson'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.erasSubscription?.unsubscribe();
  }
}
