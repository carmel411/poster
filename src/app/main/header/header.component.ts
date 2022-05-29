import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private mail: MailService, private spinner: SpinnerService) { }
userData: {} ={}
userloggedin:boolean = false

  ngOnInit(): void {
this.auth.rememberMeLogin();
// TODO למחוק דוגמא לשליחת דואל
// this.mail.sendMAil(['26carmel@gmail.com','hedvat62@gmail.com'],'נושא ראשון','הדינג','פסקה א')
// TODO למחוק דוגמא לאיפוס סיסמא
// this.auth.forgetPassword("26carmel@gmail.com");

if(sessionStorage.getItem("access-token")){
  this.auth.ifUserLogin.next(true);
  this.auth.getUserData();
}else{this.auth.ifUserLogin.next(false)}

this.auth.ifUserLogin.subscribe((val)=>{
  this.userloggedin = (val)
  })

  }

  logoutClick(){
    console.log("logout")
    this.auth.logout()
  }




}
