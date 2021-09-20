import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Drug } from '@/_models';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class DrugsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Drug[]>(`${config.apiUrl}/drugcatalogs`)
      .pipe(map(response => {
        return response;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/drugcatalogs/${id}`);
  }

  addDrug(drug) {
    return this.http.post(`${config.apiUrl}/drugcatalogs`, drug);
  }

  updateDrug(id, drug) {
    return this.http.put(`${config.apiUrl}/drugcatalogs/${id}`, drug);
  }

  getDrug(id) {
    return this.http.get(`${config.apiUrl}/drugcatalogs/${id}`);
  }
}