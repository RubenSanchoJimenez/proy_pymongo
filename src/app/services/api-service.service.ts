import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://02v9jt74-8000.uks1.devtunnels.ms';

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

  /*
  getColors(): Observable<[]> {
    return this.http.get(`${this.apiUrl}/read_colors/`) as Observable<[]>;
  }
  */

  //URLs:
  // read_attributes/
  // read_availability/
  // read_brands/
  // read_colors/
  // read_conditions/
  // read_documents/
  // filter
  // Ejemplo de filter: http://localhost:8000/filter/?brand=ZARA&condition=NewCondition&availability=InStock
}