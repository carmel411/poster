import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private post: PostsService,private sanitizer: DomSanitizer ,private auth: AuthService, private mail: MailService, private spinner: SpinnerService) { }
  toggleNavbar = true;
  userData: any = {}
avatar :string = ""
userName: any
tagsList: any

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

ngAfterViewInit(): void {
  this.getTags()
  
}


  async getTags(){
    await this.waitBefore(2000)
    this.post.getTagsList().then(data => this.tagsList = data)
  }

  transformStringToImage(){
    if(this.avatar!=""){return this.sanitizer.bypassSecurityTrustResourceUrl(this.avatar)}else{return ""};
}

  logoutClick(){
    this.auth.logout()
  }

  waitBefore(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  goToTagPage(oneTag: string){
    
    this.router.navigate(
      ['/postlist'],
      { queryParams: { tag: oneTag } }
    )
// TODO בעיה - אם עמוד פוסטליסט פתוח אז אינו מעדכן את הקומפוננטה, וכן בעיה לחצן מועדפים

    // .then(() => {
    //   window.location.reload();
    // });
  }

  goTofavorites(){}

}
