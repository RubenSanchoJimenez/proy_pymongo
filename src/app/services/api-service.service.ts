import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://02v9jt74-8000.uks1.devtunnels.ms';

  constructor(private http: HttpClient) { }

  getData(filters: { brand?: string; condition?: string; availability?: string; [key: string]: any }): Observable<any> {
    let params = new HttpParams();
  
    // Añade solo los filtros que estén definidos
    if (filters.brand) {
      params = params.set('brand', filters.brand);
    }
    if (filters.condition) {
      params = params.set('condition', filters.condition);
    }
    if (filters.availability) {
      params = params.set('availability', filters.availability);
    }
  
    // Añade filtros adicionales dinámicamente, si existen
    Object.keys(filters).forEach(key => {
      if (key !== 'brand' && key !== 'condition' && key !== 'availability' && filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    console.log(this.http.get<any>(`${this.apiUrl}/filter/`, { params }))
  
    return this.http.get<any>(`${this.apiUrl}/filter/`, { params });
  }
  

  getColors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_colors/`);
  }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_brands/`);
  }

  getAvailability(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_availability/`);
  }

  getConditions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_conditions/`);
  }

  getAttributes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_attributes/`);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/read_documents/`);
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


  /*

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

  */
}