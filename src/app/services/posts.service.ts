import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwalService } from './swal.service';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private API_URL= environment.API_URL;



  constructor(private http: HttpClient ,private swal: SwalService, private spinner: SpinnerService, private router: Router) { }


// getMyPosts(){
//   this.spinner.setStatus(true);
//   const headers = {'content-type': 'application/json', 'x-auth-token':}
//   const token = 
//   console.log(userInfo);
//   console.log(body);
//   this.http.get 
//   this.http.post<any>(`${this.baseUrl}auth`,body,{'headers':headers}).subscribe({
//       next: data => {
//           this.spinner.setStatus(false);
//           this.userToken = data.token;
//           this.swal.alertWithSuccess("Login Success")
//           console.log(this.userToken);
//           this.router.navigate(['/home']);
//       },
//       error: error => {
//         this.spinner.setStatus(false);
//         if (typeof error.error == 'string'){
//           this.swal.alertWithWarning("Login Error",error.error)
//         }else{
//           this.swal.alertWithWarning("Login Error",error.message)
//         } 
//         console.error('There was an error!', error.error );
//       }
//   })
// }








}