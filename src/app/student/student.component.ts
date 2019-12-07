import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@/_models';
import { AuthenticationService, StudentService } from '@/_services';

@Component({ templateUrl: 'students.component.html' })
export class StudentComponent implements OnInit {
  studentForm = this.fb.group({
    name: [ '', Validators.required ],
    email: [ '', Validators.required ],
    card_number: [ '', Validators.required ],
    group_name: [ '', Validators.required ],
    subgroup: [ 1, Validators.required ]
  });

  public students = [];
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.studentService.getAll()
      .subscribe(
        data => {
          this.students = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id)
      .pipe(first());
  }

  onSubmit() {
    const student = {
      name: this.studentForm.controls.name.value,
      email: this.studentForm.controls.email.value,
      group_name: this.studentForm.controls.group_name.value,
      card_number: this.studentForm.controls.card_number.value,
      subgroup: this.studentForm.controls.subgroup.value
    };

    this.studentService.addStudent(student)
      .subscribe(
        data => {
          this.students.push(data);
        },
        error => {
          console.log(error);
        });
  }
}