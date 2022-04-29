import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profiles',
  templateUrl: './edit-profiles.component.html',
  styleUrls: ['./edit-profiles.component.css']
})
export class EditProfilesComponent implements OnInit {

  classSelectSub?: Subscription;
  contactForm: FormGroup = new FormGroup({
    country: new FormControl([]),
  });

  //TODO: To get classes from DB or Env file or Config file
  availableClasses = [
    { id: 1, name: "5А" },
    { id: 2, name: "5Б" },
    { id: 3, name: "6А" },
    { id: 4, name: "6Б" },
    { id: 5, name: "7А" },
    { id: 6, name: "7Б" },
    { id: 7, name: "8А" },
    { id: 8, name: "8Б" },
    { id: 9, name: "9А" },
    { id: 10, name: "9Б" },
    { id: 11, name: "10А" },
    { id: 12, name: "10Б" },
    { id: 13, name: "11А" },
    { id: 14, name: "11Б" },
    { id: 15, name: "12А" },
    { id: 16, name: "12Б" },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: ['5А']
    });

    this.classSelectSub = this.contactForm.get("country")?.valueChanges
      .subscribe(value => {
        this.onClassSelected(value);
      })
  }

  onClassSelected(value: string) {
    console.log('Избран е клас.');
    //TODO: Send req to db and get all students from selected class.
    console.log(value);
  }

  selectClass() {
    console.log("Form Submitted");
    console.log(this.contactForm.value);
  }

  ngOnDestroy(): void {
    this.classSelectSub?.unsubscribe();
  }

}
