import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GeneralService } from '../../services/general-service';
import { ApiService } from '../../services/api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  colors: any[] = [];
  brands: any[] = [];
  availabilitys: any[] = [];
  conditions: any[] = [];
  attributes: any[] = [];
  documents: any[] = [];

  selectedBrand: string = '';
  selectedColor: string = '';
  selectedAvailability: string = '';
  selectedCondition: string = '';
  selectedAttribute: string = '';
  value: string = '';
  totalResults: number = 0;

  constructor(
    private generalService: GeneralService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadColors();
    this.loadBrands();
    this.loadAvailabilitys();
    this.loadConditions();
    this.loadAttributes();
  }

  loadColors(): void {
    this.apiService.getColors().subscribe(
      data => this.colors = data,
      error => console.error('Error al cargar colors:', error)
    );
  }

  loadBrands(): void {
    this.apiService.getBrands().subscribe(
      data => this.brands = data,
      error => console.error('Error al cargar brands:', error)
    );
  }

  loadAvailabilitys(): void {
    this.apiService.getAvailability().subscribe(
      data => this.availabilitys = data,
      error => console.error('Error al cargar availabilitys:', error)
    );
  }

  loadConditions(): void {
    this.apiService.getConditions().subscribe(
      data => this.conditions = data,
      error => console.error('Error al cargar conditions:', error)
    );
  }

  loadAttributes(): void {
    this.apiService.getAttributes().subscribe(
      data => this.attributes = data,
      error => console.error('Error al cargar attributes:', error)
    );
  }

  loadDocuments(): void {
    this.apiService.getDocuments().subscribe(
      data => this.documents = data,
      error => console.error('Error al cargar documents:', error)
    );
  }

  resetFilters(): void {
    this.selectedBrand = '';
    this.selectedColor = '';
    this.selectedAvailability = '';
    this.selectedCondition = '';
    this.selectedAttribute = '';
    this.value = '';
  }

  searchDocuments(): void {
    const filters: { [key: string]: any } = {
      brand: this.selectedBrand,
      condition: this.selectedCondition,
      availability: this.selectedAvailability
    };
  
    if (this.selectedAttribute) {
      filters[this.selectedAttribute] = this.value;
    }

    this.apiService.getData(filters).subscribe(
      (response) => {
        this.documents = response.documents;  // Asume que la respuesta incluye `documents`
        this.totalResults = response.totalResults; // Si la respuesta tiene un total
      },
      (error) => {
        console.error('Error al obtener documentos:', error);
      }
    );
  }

}
