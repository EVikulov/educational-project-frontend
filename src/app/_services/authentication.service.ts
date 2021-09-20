import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        const user = {email: "admin@projectz.com", password:"password123456"};

        if (email === user.email && password === user.password) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: 1,
                name: "admin project-z",
                email: "admin@projectz.com",
                email_verified_at: null,
                created_at: "2021-02-22 06:04:18",
                updated_at: "2021-02-22 06:04:18"
            }));

            const modelUser = {
                id: 1,
                email: "admin@projectz.com",
                name: "admin project-z",
                password: user.password,
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2xvZ2luIiwiaWF0IjoxNjEzOTczODU4LCJleHAiOjE2MTM5Nzc0NTgsIm5iZiI6MTYxMzk3Mzg1OCwianRpIjoib0U1NkNlZEtLSW11a3lMWiIsInN1YiI6bnVsbCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImlkIjoxLCJuYW1lIjoiYWRtaW4gcHJvamVjdC16IiwiZW1haWwiOiJhZG1pbkBwcm9qZWN0ei5jb20ifQ.NzeiZoXIq4mBwycxoXai8EPLFefGqBmA-cHXmGWfjvk"
            }

            this.currentUserSubject.next(modelUser);

            return user;
        }
        // return this.http.post<any>(`${config.apiUrl}/login`, { email, password })
        //     .pipe(map(response => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(response.user));
        //         this.currentUserSubject.next(response.user);
        //         return response.user;
        //     }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}