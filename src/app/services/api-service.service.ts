import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/formadev/src/backend/api/api.php';

  constructor(private http: HttpClient) { }

  getData(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { params });
  }

  postData(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data, { params });
  }

  putData(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data, { params });
  }

  deleteData(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${endpoint}`, { params });
  }
}