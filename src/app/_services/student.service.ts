import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '@/_models';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(`${config.apiUrl}/student`)
      .pipe(map(response => {
        return response;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/student/${id}`);
  }

  addStudent(student) {
    return this.http.post(`${config.apiUrl}/student/`, student);
  }

  updateStudent(id, student) {
    return this.http.put(`${config.apiUrl}/student/${id}`, student);
  }

  getStudent(id) {
    return this.http.get(`${config.apiUrl}/student/${id}`);
  }
}