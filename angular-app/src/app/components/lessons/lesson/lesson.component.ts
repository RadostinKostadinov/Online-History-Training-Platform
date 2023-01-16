import { map, Subscription, take } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonsServiceService } from '../lessons-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit, OnDestroy {
  eraSubscription?: Subscription;
  lessonSubscription?: Subscription;
  lessonItemSubscription?: Subscription;

  era: any;
  lesson: any;
  lessonItem: any;
  lessonItemId: string = '';
  itemImages = new Map();
  itemVideos = new Map();
  videoSliderStep: any;
  imageSliderStep: any;

  constructor(private http: HttpClient, private lessonService: LessonsServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.eraSubscription = this.lessonService.currentEra.subscribe((era) => {
      this.era = era;
    });

    this.lessonSubscription = this.lessonService.currentLesson.subscribe((lesson) => {
      this.lesson = lesson;
    })
  }

  onChooseItem(event: any, itemId: string) {
    event.preventDefault();

    this.lessonService.getLessonItem(itemId);
    this.lessonItemSubscription?.unsubscribe();
    setTimeout(() => {
      this.lessonItemSubscription = this.lessonService.currentLessonItem.subscribe((lessonItem) => {
        this.lessonItem = lessonItem;
        console.log(this.lessonItem.text);

        this.itemVideos = new Map();
        this.lessonItem.videos.forEach((videoUrl: string) => {
          this.itemVideos.set(videoUrl, this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl));
        });

        this.itemImages = new Map();

        this.lessonItem.images.forEach((imageName: string) => {
          this.getImage(imageName).pipe(take(1)).subscribe({
            next: (x: any) => {
              this.itemImages.set(imageName, x);
            }, error: (err: any) => {
              console.error(err);
            }
          })
        })

        setTimeout(() => {
          this.videoSliderStep = 0;
          const videoWrapper: any = document.querySelector('.lesson-videos-wrapper');
          videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 450}px)`;

          this.imageSliderStep = 0;
          const imageWrapper: any = document.querySelector('.lesson-images-wrapper');
          imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 480}px)`;

          let allLearnBtns = document.querySelectorAll('.lesson-grid-item-choose-circle');
          allLearnBtns[allLearnBtns.length - 1].scrollIntoView({ behavior: 'smooth' });
        }, 300);
      })
    }, 300);
  }

  slideLeftImages(event: any) {
    if (this.imageSliderStep > 0) {
      this.imageSliderStep -= 1;
    }
    event.preventDefault();
    const imageWrapper: any = document.querySelector('.lesson-images-wrapper');
    imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 480}px)`;
  }

  slideRightImages(event: any) {
    if (this.imageSliderStep < this.lessonItem.images.length - 1) {
      this.imageSliderStep += 1;
    }

    event.preventDefault();
    const imageWrapper: any = document.querySelector('.lesson-images-wrapper');
    imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 480}px)`;
  }

  slideLeftVideos(event: any) {
    if (this.videoSliderStep > 0) {
      this.videoSliderStep -= 1;
    }
    event.preventDefault();
    const videoWrapper: any = document.querySelector('.lesson-videos-wrapper');
    videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 450}px)`;
  }

  slideRightVideos(event: any) {
    if (this.videoSliderStep < this.lessonItem.videos.length - 2) {
      this.videoSliderStep += 1;
    }
    event.preventDefault();
    const videoWrapper: any = document.querySelector('.lesson-videos-wrapper');
    videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 450}px)`;
  }

  getImage(imageName: string): any {
    const url = `http://localhost:3000/upload/image/get/${imageName}`;
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map((x: any) => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  ngOnDestroy(): void {
    this.eraSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
  }


}
