import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GeneralService } from '../../services/general-service';
import { ApiService } from '../../services/api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

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
  docUpdate: any;

  selectedBrand: string = '';
  selectedColor: string = '';
  selectedAvailability: string = '';
  selectedCondition: string = '';
  selectedAttribute: string = '';
  value: string = '';
  totalResults: number = 0;

  selectedBrandUpdate: string = '';
  selectedColorUpdate: string = '';
  selectedAvailabilityUpdate: string = '';
  selectedConditionUpdate: string = '';
  

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
      availability: this.selectedAvailability,
      color: this.selectedColor
    };
  
    if (this.selectedAttribute) {
      filters[this.selectedAttribute] = this.value;
    }

    this.apiService.getData(filters).subscribe(
      (response) => {
        this.documents = response;
        console.log(response)
        this.totalResults = response.length;
        this.generalService.getShortSuccesMessage("Consulta realizada")
      },
      (error) => {
        this.generalService.getShortErrorMessage("Error de consulta")
      }
    );
  }

  deleteDocument(idDocument: Number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡El documento se borrará permanentemente!",
      icon: "warning",
      iconColor: '#dc3545',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, ¡Bórralo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteDocument(idDocument).subscribe(
          (response) => {
            this.documents = this.documents.filter(doc => doc.id !== idDocument);
            this.totalResults = this.documents.length;
            this.totalResults = response.length;
            this.generalService.getShortSuccesMessage("Documento borrado")
          },
          (error) => {
            this.generalService.getShortErrorMessage("Error al borrar documento")
          }
        );
      }
    });
  }

  editDocument(idDocument: Number): void {
    this.docUpdate = this.documents.filter(doc => doc.id == idDocument);
    console.log(this.docUpdate)
  }

  saveChanges(idDocument: Number): void {
    if (this.selectedBrandUpdate) {
      this.docUpdate[0].brand = this.selectedBrandUpdate;
    }
  
    if (this.selectedColorUpdate) {
      this.docUpdate[0].color = this.selectedColorUpdate;
    }
  
    if (this.selectedAvailabilityUpdate) {
      this.docUpdate[0].availability = this.selectedAvailabilityUpdate;
    }
  
    if (this.selectedConditionUpdate) {
      this.docUpdate[0].condition = this.selectedConditionUpdate;
    }
    
    delete this.docUpdate[0]._id

    // Llamada al servicio para actualizar el documento
    this.apiService.updateDocument(idDocument, this.docUpdate[0]).subscribe(
      (response: any) => {
        console.log(response);
        console.log(this.docUpdate[0]);
        this.generalService.getShortSuccesMessage('Documento actualizado');
      },
      (error) => {
        this.generalService.getShortErrorMessage('Error al actualizar el documento');
      }
    );

    this.resetUpdates()
  }

  resetUpdates(){
    this.selectedConditionUpdate = ""
    this.selectedAvailabilityUpdate = ""
    this.selectedColorUpdate = ""
    this.selectedBrandUpdate = ""
  }
  

}
