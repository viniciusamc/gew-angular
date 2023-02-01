import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  save(record: UserModel) {
    return this.http.post<UserModel>(this.apiUrl, record);
  }
}
