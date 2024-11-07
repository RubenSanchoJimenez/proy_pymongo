import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://02v9jt74-8000.uks1.devtunnels.ms';

  constructor(private http: HttpClient) { }

  getData(filters: { brand?: string; condition?: string; availability?: string; color?: string; [key: string]: any }): Observable<any> {
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
    if (filters.color) {
      params = params.set('color', filters.color)
    }
  
    // Añade filtros adicionales dinámicamente, si existen
    Object.keys(filters).forEach(key => {
      if (key !== 'brand' && key !== 'condition' && key !== 'availability' && filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

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

  deleteDocument(id: Number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/delete_document/${id}/`);
  }

  updateDocument(id: Number, doc: any ): Observable<any> {
    console.log(doc)
    const url = `${this.apiUrl}/update_document/${id}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, doc, { headers });
  }

}