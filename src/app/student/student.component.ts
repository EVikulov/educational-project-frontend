import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@/_models';
import { AuthenticationService, StudentService } from '@/_services';

@Component({ templateUrl: 'students.component.html' })
export class StudentComponent implements OnInit {
  public students = [];
  currentUser: User;
  studentForm = this.fb.group({
    name: ['', Validators.required ],
    email: ['', Validators.required ],
    card_number: ['', Validators.required ],
    group_name: ['', Validators.required ],
    subgroup: [1, Validators.required ],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.setForm();
  }

  ngOnInit() {
    this.getAll();
  }

  updateStudent(id: number) {
    const student = this.studentService
      .getStudent(id)
      .subscribe(data => {
          this.setForm(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => {
      this.getAll();
    })
  }

  onSubmit() {
    const student = {
      name: this.studentForm.controls.name.value,
      email: this.studentForm.controls.email.value,
      group_name: this.studentForm.controls.group_name.value,
      card_number: this.studentForm.controls.card_number.value,
      subgroup: this.studentForm.controls.subgroup.value
    };

    if (this.studentForm.controls.id.value) {
      this.studentService
        .updateStudent(this.studentForm.controls.id.value, student)
        .subscribe(() => {
          this.getAll()
        });
    } else {
      this.studentService.addStudent(student)
        .subscribe(
          data => {
            this.students.push(data);
          },
          error => {
            console.log(error);
          });
    }

    this.setForm();
  }

  private getAll()
  {
    this.studentService.getAll()
      .subscribe(
        data => {
          this.students = data;
        },
        error => {
          console.log(error);
        });
  }

  private setForm(data = null)
  {
    this.studentForm = this.fb.group({
      name: [ (data && data.name) ? data.name : '', Validators.required ],
      email: [ (data && data.email) ? data.email : '', Validators.required ],
      card_number: [(data && data.card_number) ? data.card_number :  '', Validators.required ],
      group_name: [ (data && data.group_name) ? data.group_name : '', Validators.required ],
      subgroup: [(data && data.subgroup) ? data.subgroup : 1, Validators.required ],
      id: [(data && data.id) ? data.id : null]
    });
  }
}