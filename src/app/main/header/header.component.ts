import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer ,private auth: AuthService, private mail: MailService, private spinner: SpinnerService) { }
userData: any
userloggedin:boolean = false
avatar :string = ""
userName: any

  ngOnInit(): void {
// TODO למחוק דוגמא לשליחת דואל
// this.mail.sendMAil(['26carmel@gmail.com','hedvat62@gmail.com'],'נושא ראשון','הדינג','פסקה א')

if(sessionStorage.getItem("access-token")){
  this.auth.ifUserLogin.next(true);
  this.auth.getUserData();
  this.auth.currentUser.subscribe((val)=>{
    this.userData = (val)
    this.avatar = this.userData.avatar
  })
}else{this.auth.ifUserLogin.next(false)
  this.auth.rememberMeLogin();
}

this.auth.ifUserLogin.subscribe((val)=>{
  this.userloggedin = (val)
  })

  // console.log("*****")
  // console.log(this.auth.ifUserLogin)
  }
  transformStringToImage(){
    if(this.avatar!=""){return this.sanitizer.bypassSecurityTrustResourceUrl(this.avatar)}else{return ""};
}

  logoutClick(){
    console.log("logout")
    this.auth.logout()
  }




}
