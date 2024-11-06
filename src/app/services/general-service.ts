import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }


  //Recuperar los colores
  // URL: http://localhost:8000/read_colors/

  getColors(): Observable<[]> {
    return this.http.get(`${this.apiUrl}/read_colors/`) as Observable<[]>;
  }


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
