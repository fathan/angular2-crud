import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  id: number;
  private apiUrl: string = 'http://localhost:3000/users';
  usersChanged = new EventEmitter<Observable<User[]>>();

  constructor(
    private _http: Http
  ) { }

  getUser(): Observable<User[]> {
    return this._http.get(this.apiUrl)
            .map(res => res.json().data)
            .catch(this.handleError);
  }

  getUserById(id: number): Observable<User> {
    return this._http.get(this.apiUrl + '/' +id)
            .map(res => res.json().data)
            .catch(this.handleError);
  }

  postUser(
    post: {
      name: string,
      email: string,
      password_digest: string,
      company_id: number,
      role_id: number
    }): Observable<any> {
    let body = JSON.stringify(post);
    return this._http.post(this.apiUrl, body, { headers: this.Header() })
            .map(res => res.json())
            .catch(this.handleError);
  }

  updateUser(
    post: {
      id: number,
      name: string,
      email: string,
      password_digest: string,
      company_id: number,
      role_id: number
    }
  ) {
    let body = JSON.stringify(post);
    return this._http.put(this.apiUrl + '/' + post.id, body, { headers: this.Header() })
            .map(res => res.json())
            .catch(this.handleError);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(this.apiUrl+ '/' +id)
            .catch(this.handleError);
  }

  private Header(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    let err = error.message || 'Server error';
    console.error('Error!', error);
    return Observable.throw(err);
  }

  private getUrl(id){
    return `${this.apiUrl}/${id}`;
  }
}
