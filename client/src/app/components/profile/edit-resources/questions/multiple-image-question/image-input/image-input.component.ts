import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css'],
})
export class ImageInputComponent implements OnInit {
  @Input() questionGroup?: FormGroup;
  @Input() answerNumber!: number;

  public image: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.image = {
      name: this.questionGroup?.value['answer' + this.answerNumber],
      value: '',
    };

    if (this.image.name != '') {
      this.getImage(this.image.name)
        .pipe(take(1))
        .subscribe({
          next: (x: any) => {
            this.image.value = x.changingThisBreaksApplicationSecurity;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  onImageUpload(event: any) {
    const file = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('uploadedImage', file, file.name);

    this.http
      .post(`${environment.backendUrl}upload/image`, fd)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.getImage(res.fileName).subscribe({
            next: (x: any) => {
              this.image.name = res.fileName;
              this.image.value = x.changingThisBreaksApplicationSecurity;
              this.questionGroup?.patchValue({
                [`answer${this.answerNumber}`]: this.image.name,
              });
            },
            error: (error: any) => {},
          });
        },
        error: (error: any) => {},
      });
  }

  onImageDelete(event: MouseEvent) {
    this.image.name = '';
    this.image.value = '';
    this.questionGroup?.patchValue({
      [`answer${this.answerNumber}`]: this.image.name,
    });
  }

  getImage(imageName: string): any {
    const url = `${environment.backendUrl}upload/image/get/${imageName}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((x) => {
        const urlToBlob = window.URL.createObjectURL(x); // get a URL for the blob
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
      })
    );
  }
}
