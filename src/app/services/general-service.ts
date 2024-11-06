import { Injectable } from '@angular/core';
import { text } from 'stream/consumers';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getShortErrorMessage(error: string){
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: error,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

  getShortSuccesMessage(success: string){
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: success,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

  getErrorMessage(errorTitle: string, texts: string){
    Swal.fire({
      icon: "error",
      title: errorTitle,
      text: texts,
    });
  }

  getSuccesMessage(successTitle: string, texts: string){
    Swal.fire({
      icon: "success",
      title: successTitle,
      text: texts,
    });
  }
}
