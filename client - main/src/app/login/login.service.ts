import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { LoggedIn } from '../models/loggedIn';
import { User } from '../models/user';


@Injectable({
  providedIn: "root",
})



export class LoginService {
  private url = "http://localhost:5200";
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) {
  }


  private adminValue = new BehaviorSubject(false);
  private loginValue = new BehaviorSubject(false);
  adminLogin = this.adminValue.asObservable();
  login = this.loginValue.asObservable();


  private refreshUsers() {
    this.httpClient
      .get<User[]>(`${this.url}/users`)
      .subscribe((users) => {
        this.users$.next(users);
      });
  }

  adminLoginValue(adminValue) {
    this.adminValue.next(adminValue);
  }

  userLoginValue(userValue) {
    this.loginValue.next(userValue);
  }

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }

  validateLogin(user: User) {
    return this.httpClient.post(`${this.url}/users`, user, { responseType: 'text' })
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  createUSer(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/users`, user, { responseType: 'text' });
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/users/${id}`, user, { responseType: 'text' });
  }

  deleteUSer(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/users/${id}`, { responseType: 'text' });
  }
}