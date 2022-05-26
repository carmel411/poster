import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  alertWithSuccess(title: string){Swal.fire({
    position: 'center',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  })}

  alertWithWarning(title: string , body: string | undefined): void{
    Swal.fire(title, body, 'warning')
  }

  question(title: string, showDenyButton: boolean, showCancelButton: boolean, confirmButtonText: string, denyButtonText: string){
  return Swal.fire({
    title: title,
    showDenyButton: showDenyButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
  })
  }



}
