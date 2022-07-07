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
  toggleNavbar = true;
  userData: any = {}
avatar :string = ""
userName: any

  ngOnInit(): void {
    

if(sessionStorage.getItem("access-token")){
  this.auth.getUserData();
}else{
  this.auth.rememberMeLogin();
}
this.auth.currentUser.subscribe((val)=>{
  this.userData = (val)
  this.avatar = this.userData.avatar
})


  }
  transformStringToImage(){
    if(this.avatar!=""){return this.sanitizer.bypassSecurityTrustResourceUrl(this.avatar)}else{return ""};
}

  logoutClick(){
    this.auth.logout()
  }




}
