import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '@/_models';
import { AuthenticationService, DrugsService } from '@/_services';

@Component({ templateUrl: 'drugs.component.html' })
export class DrugsComponent implements OnInit {
  public drugs = [];
  currentUser: User;
  drugForm = this.fb.group({
    type: ['', Validators.required ],
    name: ['', Validators.required ],
    model: ['', Validators.required ],
    price: ['', Validators.required ],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private DrugsService: DrugsService,
    private fb: FormBuilder
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.setForm();
  }

  ngOnInit() {
    this.getAll();
  }

  updateDrug(id: number) {
    const drug = this.DrugsService
      .getDrug(id)
      .subscribe(data => {
          this.setForm(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteDrug(id: number) {
    this.DrugsService.delete(id).subscribe(() => {
      this.getAll();
    })
  }

  onSubmit() {
    const drug = {
      type: this.drugForm.controls.type.value,
      model: this.drugForm.controls.model.value,
      name: this.drugForm.controls.name.value,
      price: this.drugForm.controls.price.value
    };

    if (this.drugForm.controls.id.value) {
      this.DrugsService
        .updateDrug(this.drugForm.controls.id.value, drug)
        .subscribe(() => {
          this.getAll()
        });
    } else {
      this.DrugsService.addDrug(drug)
        .subscribe(
          data => {
            this.drugs.push(data);
          },
          error => {
            console.log(error);
          });
    }

    this.setForm();
  }

  private getAll()
  {
    this.DrugsService.getAll()
      .subscribe(
        data => {
          this.drugs = data;
        },
        error => {
          console.log(error);
        });
  }

  private setForm(data = null)
  {
    this.drugForm = this.fb.group({
      type: [ (data && data.type) ? data.type : '', Validators.required ],
      name: [ (data && data.name) ? data.name : '', Validators.required ],
      model: [(data && data.model) ? data.model :  '', Validators.required ],
      price: [ (data && data.price) ? data.price : '', Validators.required ],
      id: [(data && data.id) ? data.id : null]
    });
  }
}