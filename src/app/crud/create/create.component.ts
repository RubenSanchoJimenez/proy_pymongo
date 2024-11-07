import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { GeneralService } from '../../services/general-service';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileContent: any = null;
  selectedFile: File | null = null;

  constructor(private generalService: GeneralService, private apiService: ApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        try {
          this.fileContent = JSON.parse(reader.result as string);
        } catch (e) {
          console.error("El archivo no es un JSON válido.", e);
        }
      };
      reader.readAsText(this.selectedFile);
    }
  }

  setData(): void {
    if (this.fileContent) {
      this.apiService.createDocuments(this.fileContent).subscribe(
        (response: any) => {
          console.log(response);
          this.generalService.getSuccesMessage("Yeaaahh!!", "Documentos subidos correctamente")
        },
        (error) => {
          this.generalService.getShortErrorMessage('Error al subir los documentos');
        }
      );
      console.log(this.fileContent) 
      
      // Reset input
      this.resetFileInput();

    } else {
      this.generalService.getErrorMessage("Oops!!", "Archivo no válido o inexistente")
    }
  }

  resetFileInput(): void {
    this.fileInput.nativeElement.value = "";
    this.fileContent = null;
  }

}
