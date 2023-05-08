import { EditResourcesService } from './edit-resources.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-resources',
  templateUrl: './edit-resources.component.html',
  styleUrls: ['./edit-resources.component.css']
})
export class EditResourcesComponent implements OnInit {
  states: [string] = ["first-screen"];
  currentState: string = "first-screen";
  eras: any;
  mode: any;
  era: any;
  lesson: any;
  lessonItem: any;
  itemImages = new Map();
  itemVideos = new Map();
  url: any;
  imageSliderStep: any;
  videoSliderStep: any;
  eraLessons: string[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private ers: EditResourcesService) { }

  ngOnInit(): void {
    this.http.get(`${environment.backendUrl}eras/get/all`).pipe(take(1)).subscribe((eras) => {
      this.eras = eras;
    });
  }

  backToPreviousScreen(event: any) {
    event.preventDefault();
    this.states.pop();
    this.currentState = this.states[this.states.length - 1];
  };

  //-------FIRST SCREEN---------------
  onChooseMode(event: any, chosenMode: string) {
    event.preventDefault();
    this.mode = chosenMode;
    this.states.push('second-screen');
    this.currentState = this.states[this.states.length - 1];
  }

  //-------SECOND SCREEN--------------
  onAccordionClick(event: any, className: string) {
    const btnDOMelement = event.target;
    btnDOMelement.classList.toggle(className);
    let panel = <HTMLElement>btnDOMelement.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }

  onChooseLesson(eraId: string, lessonId: string) {
    if (this.mode === "practice") {
      this.ers.getLesson(lessonId);
      this.router.navigate(['/profile/choose-practice']);
    }

    if (this.mode === "tests") {
      this.ers.getLesson(lessonId);
      this.router.navigate(['/profile/choose-test'])
    }

    console.log('AFTER IF');

    this.states.push('third-screen');
    this.currentState = this.states[this.states.length - 1];

    this.era = this.eras.find((era: any) => {
      if (era._id == eraId) return era;
    });

    this.lesson = this.era.lessons.find((lesson: any) => {
      if (lesson._id == lessonId) return lesson;
    })

    this.http.get(`${environment.backendUrl}lessons/get/${this.lesson._id}`).pipe(take(1)).subscribe((lesson: any) => {
      this.lesson = lesson;
    });
  }

  onAddLesson(event: any, eraId: string) {
    this.era = this.eras.find((era: any) => {
      if (era._id == eraId) return era;
    });

    this.eraLessons = [];
    this.era.lessons.forEach((lesson: any) => {
      this.eraLessons.push(lesson._id);
    });

    const newLessonName = (<HTMLInputElement>event.target.parentElement.querySelector('#add-new-lesson-input'))!.value;
    this.http.post(`${environment.backendUrl}lessons/create`, {
      name: newLessonName
    }).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.eraLessons.push(res.lessonId);
        this.http.get(`${environment.backendUrl}lessons/get/${res.lessonId}`).pipe(take(1)).subscribe((lesson: any) => {
          this.lesson = lesson;
          this.http.patch(`${environment.backendUrl}eras/update/${this.era._id}`, {
            lessons: this.eraLessons
          }).pipe(take(1)).subscribe({
            next: (res) => {
              this.http.get(`${environment.backendUrl}eras/get/all`).pipe(take(1)).subscribe((eras) => {
                this.eras = eras;
              });
            },
            error: (err) => {
              console.error(err);
            }
          })
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.states.push('third-screen');
    this.currentState = this.states[this.states.length - 1];
  }

  onDeleteLesson(era: any, lessonId: string) {
    this.http.delete(`${environment.backendUrl}lessons/delete/${lessonId}`).pipe(take(1)).subscribe({
      next: (res) => {
        this.eras.forEach((era: any) => {
          era.lessons = era.lessons.filter((lesson: any) => {
            if(lesson._id != lessonId) return lesson;
          });
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //-------THIRD SCREEN--------------
  onDeleteItem(event: any, lessonItemId: string) {
    event.preventDefault();
    this.http.delete(`${environment.backendUrl}lessonItems/delete/${lessonItemId}`).pipe(take(1)).subscribe({
      next: (res) => {
        this.lesson.items = this.lesson.items.filter((item: any) => {
          if(item._id != lessonItemId) return item;
        })
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onChooseLessonItem(event: any, lessonItemId: string) {
    if (event) {
      event.preventDefault();
    }
    this.states.push('fourth-screen');
    this.currentState = this.states[this.states.length - 1];

    this.itemImages = new Map();
    this.itemVideos = new Map();

    this.http.get(`${environment.backendUrl}lessonItems/get/${lessonItemId}`).pipe(take(1)).subscribe((lessonItem: any) => {

      this.lessonItem = lessonItem;
      if(this.lessonItem.date == undefined) {
        this.lessonItem.date = 'дата';
      }

      this.lessonItem.images.forEach((imageName: string) => {
        this.getImage(imageName).pipe(take(1)).subscribe({
          next: (x: any) => {
            this.itemImages.set(imageName, x.changingThisBreaksApplicationSecurity);
          }, error: (err: any) => {
            console.error(err);
          }
        })
      })

      this.videoSliderStep = 0;
      const videoWrapper: any = document.querySelector('.videos-wrapper');
      videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 330}px)`;
      this.lessonItem.videos.forEach((videoUrl: string) => {
        this.itemVideos.set(videoUrl, this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl));
      });

      this.imageSliderStep = this.lessonItem.images.length - 2;
      const imageWrapper: any = document.querySelector('.images-wrapper');
      imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 330}px)`;
    });
  }

  saveItemsOrder(event: any) {
    event.preventDefault();
    this.lesson.items.forEach((element: any, index: number) => {
      element.order = index;
    });
    this.http.patch(`${environment.backendUrl}lessons/update/${this.lesson._id}`, {
      "items": this.lesson.items
    }).pipe(take(1)).subscribe(() => { });
  }

  //drag&drop, from angular cdk documentation
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  };

  addNewLessonItem(event: any) {
    event.preventDefault();
    let newLessonItemId: string = '';
    let thisLessonItems: string[] = [];

    //get new item name
    const newLessonItemName = (<any>document.getElementById('new-lesson-item-input'))?.value;

    //create new item with this name
    this.http.post(`${environment.backendUrl}lessonItems/create`, {
      name: newLessonItemName
    }).pipe(take(1)).subscribe((res: any) => {
      newLessonItemId = res.savedItemId;

      //get current items in lesson
      this.lesson.items.forEach((item: any) => {
        thisLessonItems.push(item._id);
      });

      //add new item to lesson items and update in DB
      thisLessonItems.push(newLessonItemId);

      this.http.patch(`${environment.backendUrl}lessons/update/${this.lesson._id}`, {
        items: thisLessonItems
      }).pipe(take(1)).subscribe({
        next: (res) => {

          //get updated lesson from DB
          this.http.get(`${environment.backendUrl}lessons/get/${this.lesson._id}`).pipe(take(1)).subscribe((lesson: any) => {
            this.lesson = lesson;
          });

          //open new lesson item
          this.onChooseLessonItem(null, newLessonItemId);
        },
        error: (err) => {
          console.error(err);
        }
      })
    });
  }

  //-------FOURTH SCREEN--------------

  onImageUpload(event: any) {
    const file = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('uploadedImage', file, file.name);

    this.http.post(`${environment.backendUrl}upload/image`, fd).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.getImage(res.fileName).subscribe({
          next: (x: any) => {
            this.lessonItem.images.push(res.fileName);
            this.itemImages.set(res.fileName, x.changingThisBreaksApplicationSecurity);
            this.updateItemImages().pipe(take(1)).subscribe({
              next: () => {
              },
              error: (err: any) => {
              }
            });
          }, error: (err: any) => {
          }
        });
      },
      error: (error) => {
      }
    });
  }

  deleteImage(event: any, imageName: string) {
    event.preventDefault();
    this.itemImages.delete(imageName);
    this.lessonItem.images = this.lessonItem.images.filter((value: string) => {
      return value != imageName;
    });
  }

  //screen fourth, images, slider
  slideLeftImage(event: any) {
    if (this.imageSliderStep > 0) {
      this.imageSliderStep -= 1;
    }
    event.preventDefault();
    const imageWrapper: any = document.querySelector('.images-wrapper');
    imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 330}px)`;
  }
  slideRightImage(event: any) {
    if (this.imageSliderStep < this.lessonItem.images.length - 2) {
      this.imageSliderStep += 1;
    }

    event.preventDefault();
    const imageWrapper: any = document.querySelector('.images-wrapper');
    imageWrapper.style.transform = `translateX(-${this.imageSliderStep * 330}px)`;
  }



  onVideoUpload(event: any) {
    event.preventDefault();
    let newVideoUrl = (<any>document.querySelector('#input-video'))?.value;
    newVideoUrl = newVideoUrl.trim();
    if (newVideoUrl.includes('https://www.youtube.com/')) {
      if (newVideoUrl.includes('https://www.youtube.com/watch?v')) {
        newVideoUrl = newVideoUrl.replace('watch?v=', "embed/");
      }

      this.lessonItem.videos.push(newVideoUrl);
      this.itemVideos.set(newVideoUrl, this.sanitizer.bypassSecurityTrustResourceUrl(newVideoUrl));
    }
  }

  deleteVideo(event: any, videoKey: string) {
    event.preventDefault();
    this.itemVideos.delete(videoKey);
    this.lessonItem.videos = this.lessonItem.videos.filter((value: string) => {
      return value != videoKey;
    });
  }


  slideLeftVideo(event: any) {
    if (this.videoSliderStep > 0) {
      this.videoSliderStep -= 1;
    }
    event.preventDefault();
    const videoWrapper: any = document.querySelector('.videos-wrapper');
    videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 330}px)`;
  }

  slideRightVideo(event: any) {
    if (this.videoSliderStep < this.lessonItem.videos.length - 3) {
      this.videoSliderStep += 1;
    }
    event.preventDefault();
    const videoWrapper: any = document.querySelector('.videos-wrapper');
    videoWrapper.style.transform = `translateX(-${this.videoSliderStep * 330}px)`;
  }

  saveItem(event: any) {
    event.preventDefault();
    this.lessonItem.date = (<any>document.querySelector('.third-screen-lesson-date')).value;
    this.lessonItem.text = (<any>document.querySelector('#lessonItem-text')).value;
    this.lessonItem.interesting = (<any>document.querySelector('#lessonItem-interesting')).value;
    this.lessonItem.images = Array.from(this.itemImages.keys());
    this.lessonItem.videos = Array.from(this.itemVideos.keys());

    this.http.patch(`${environment.backendUrl}lessonItems/update/${this.lessonItem._id}`, this.lessonItem).pipe(take(1)).subscribe({
      next: (res) => {
        alert('УСПЕШНО ОБНОВЕНО!');
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  //-------API CALL FUNCTIONS--------------
  getImage(imageName: string): any {
    const url = `${environment.backendUrl}upload/image/get/${imageName}`;
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  updateItemImages() {
    return this.http.patch(`${environment.backendUrl}lessonItems/update/${this.lessonItem._id}`, {
      "images": this.lessonItem.images
    })
  };
}

