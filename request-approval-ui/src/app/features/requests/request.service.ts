import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateRequest,
  RequestItem
} from '../../core/models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly apiUrl =
    'http://localhost:5027/api/requests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RequestItem[]> {
    return this.http.get<RequestItem[]>(this.apiUrl);
  }

  create(request: CreateRequest): Observable<RequestItem> {
    return this.http.post<RequestItem>(
      this.apiUrl,
      request
    );
  }

  approve(id: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${id}/approve`,
      {}
    );
  }

  reject(id: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${id}/reject`,
      {}
    );
  }
}