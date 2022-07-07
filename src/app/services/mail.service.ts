import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwalService } from './swal.service';
import { SpinnerService } from './spinner.service';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient ,private swal: SwalService, private spinner: SpinnerService) {  }
  private API_URL= environment.API_URL;

  sendMAil(addressList:string[],subject: string,heading:string,paragraph1:string,paragraph2?:string){
    this.spinner.setStatus(true);
    const headers = { 'content-type': 'application/json'}  
    const recipientObjectList = this.recipientToObjects(addressList);
    const mailData = {'subject': subject, 'addressList': recipientObjectList,'heading': heading, 'paragraph1': paragraph1, 'paragraph2': paragraph2};
    

    const body=JSON.stringify(mailData);
     
    this.http.post<any>(`${this.API_URL}mails`,body,{'headers':headers}).subscribe({
        next: data => {
            this.spinner.setStatus(false);
            
            this.swal.alertWithSuccess("message sent")
    
        },
        error: error => {
          this.spinner.setStatus(false);
          if (typeof error.error == 'string'){
            this.swal.alertWithWarning("Register Error",error.error)
          }else{
            this.swal.alertWithWarning("Register Error",error.message)
          } 
          console.error('There was an error!', error.error );
        }
    })



  }

  recipientToObjects(arr: string[]) {
    var recipients = [];
    for (var i = 0; i < arr.length; ++i){
      recipients[i] = {"email": arr[i], "name": arr[i]};
    }
    return recipients;
  }



}
