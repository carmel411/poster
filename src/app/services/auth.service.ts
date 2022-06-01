import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwalService } from './swal.service';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL= environment.API_URL;


  userId:string ="";
  userToken:string = "foobar";
  ifUserLogin = new BehaviorSubject<boolean>(false);  
  currentUser = new BehaviorSubject<object>({});

  constructor(private http: HttpClient, private swal: SwalService, private spinner: SpinnerService, private router: Router, private cookie: CookieService) { }


  register(name: string, email: string, password: string){
    this.spinner.setStatus(true);
    const headers = { 'content-type': 'application/json'}  
    const userInfo = {'name': name, 'email': email, 'password': password, 'admin': false};
    const body=JSON.stringify(userInfo);
    console.log(userInfo);
    console.log(body);
     
    this.http.post<any>(`${this.API_URL}users`,body,{'headers':headers}).subscribe({
        next: data => {
            this.spinner.setStatus(false);
            this.userId = data._id;
            this.swal.alertWithSuccess("CONGRATULATIONS! you are registered!")
            console.log(this.userId)
            this.login(email,password,false);

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

  login(email: string, password: string, rememberMe: boolean){
    this.spinner.setStatus(true);
    const headers = { 'content-type': 'application/json'}  
    const userInfo = {'email': email, 'password': password};
    const body=JSON.stringify(userInfo);
    console.log(userInfo);
    console.log(body);
     
    this.http.post<any>(`${this.API_URL}auth`,body,{'headers':headers}).subscribe({
        next: data => {
            this.spinner.setStatus(false);
            this.userToken = data.token;
            console.log(data);
            this.userId = data.user_id;
            sessionStorage.setItem('access-token', this.userToken)
            sessionStorage.setItem('user_id', this.userId)

            this.swal.alertWithSuccess("Login Success")
            // console.log(this.userToken);
            if (rememberMe == true){localStorage.setItem('remember-email', email)}
            if (rememberMe == true){localStorage.setItem('remember-password', password)}
            this.ifUserLogin.next(true);
            this.getUserData();
            
            

            this.router.navigate(['/home']);
        },
        error: error => {
          this.spinner.setStatus(false);
          if (typeof error.error == 'string'){
            this.swal.alertWithWarning("Login Error",error.error)
          }else{
            this.swal.alertWithWarning("Login Error",error.message)
          } 
          console.error('There was an error!', error.error );
        }
    })
  }

rememberMeLogin(){
const rememberMeEmail = localStorage.getItem('remember-email');
const rememberMePassword = localStorage.getItem('remember-password');
if(rememberMeEmail && rememberMePassword){this.login(rememberMeEmail,rememberMePassword,true)}
;
}

forgetPassword(emailAddress:string){
  this.spinner.setStatus(true);
  const headers = { 'content-type': 'application/json'}  
  const body = {"email": emailAddress}
   
  this.http.post<any>(`${this.API_URL}users/forget`,body,{'headers':headers}).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.swal.alertWithSuccess("סיסמתך אופסה ונשלחה לדואר האלקטרוני שהזנת")
        // console.log(data);
          // this.sendPassword(emailAddress);
      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string'){
          this.swal.alertWithWarning("האיפוס נכשל",error.error)
        }else{
          this.swal.alertWithWarning("האיפוס נכשל",error.message)
        } 
      }
  })
}

logout(){
  localStorage.clear()
  sessionStorage.clear()
  this.ifUserLogin.next(false);
  this.currentUser.next({});

  this.router.navigate(['/home'])
}

getUserData(): void{
  this.spinner.setStatus(true);
  let token: string = sessionStorage.getItem('access-token')!
  const headers = new HttpHeaders().set('x-auth-token',token)
  this.http.get<object>(`${this.API_URL}users/me`, {headers} ).subscribe({
    next: data => {
        this.spinner.setStatus(false);
        this.currentUser.next(data);
        console.log(data)
    },
    error: error => {
      this.spinner.setStatus(false);
      console.error('error get user data', error.error );
    }
})
}

 
updateUserData(name:string, email:string, phone:string, password:string, password2:string, avatar:string){
  this.spinner.setStatus(true);
  let token: string = sessionStorage.getItem('access-token')!
  const headers = new HttpHeaders().set('x-auth-token',token)
  const userInfo = {'name': name, 'email': email, 'phone':phone, 'password': password, 'password2': password2, 'avatar': avatar};
  // const body=JSON.stringify(userInfo);
  console.log(userInfo);
  // console.log(body);
   
  this.http.patch<any>(`${this.API_URL}users/update`,userInfo,{headers}).subscribe({
      next: data => {
          this.spinner.setStatus(false);
          this.userId = data._id;
          this.swal.alertWithSuccess("CONGRATULATIONS! you are registered!")
          console.log(this.userId)
          this.login(email,password,false);

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


// ifUserLogin():boolean{
//   if (sessionStorage.getItem('access-token')){
//     return true
//   }else{return false}
// }


}
