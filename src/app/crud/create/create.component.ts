import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

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

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Leer el archivo
      const reader = new FileReader();
      reader.onload = () => {
        try {
          this.fileContent = JSON.parse(reader.result as string); // Asume JSON válido
        } catch (e) {
          console.error("El archivo no es un JSON válido.", e);
        }
      };
      reader.readAsText(this.selectedFile); // Leer como texto
    }
  }

  setData(): void {
    if (this.fileContent) {
      console.log(this.fileContent) 
      Swal.fire({
        icon: "success",
        title: "Yeaahhh!!!",
        text: "Archivo subido con éxito"
      });

      // Procesa `fileContent` según tus necesidades

      // Reinicia el input
      this.resetFileInput();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Archivo no valido o no existe, pruebe de nuevo"
      });
    }
  }

  resetFileInput(): void {
    this.fileInput.nativeElement.value = ""; // Reinicia el campo input
    this.fileContent = null; // Limpia el contenido para evitar datos obsoletos
  }

}
