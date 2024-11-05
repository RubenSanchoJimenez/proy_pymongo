import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  constructor(){

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const archivo = input.files[0];

      // Verificar que el archivo sea .json
      if (archivo.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const contenido = JSON.parse(e.target?.result as string);
            console.log("Contenido del archivo JSON:", contenido);
          } catch (error) {
            console.error("El archivo no es un JSON válido.");
          }
        };
        reader.readAsText(archivo);
      } else {
        console.error("Por favor selecciona un archivo .json");
      }
    }
  }

  

}
