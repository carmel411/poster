import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormsModule, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import {Location} from '@angular/common';
import {NgxImageCompressService} from "ngx-image-compress";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy{


  constructor(private router: Router ,private sanitizer:DomSanitizer,private spinner: SpinnerService, private imageCompress: NgxImageCompressService,private auth: AuthService,  private route: ActivatedRoute, private swal: SwalService,private _location: Location) { }

  @ViewChild('updateUserForm') updateUserForm?: NgForm;
  name = ""
  phone = ""
  email = ""
  avatar = ""
imgResult: any
  ngOnInit(): void {
  this.fillForm()

}

ngOnDestroy(): void {
  this.auth.currentUser.unsubscribe
}


  fillForm(){
  
    this.auth.currentUser.subscribe((val)=>{
      const currentUserData = (val)
      const objCurrentUserData = JSON.parse(JSON.stringify(currentUserData))
      setTimeout(() => {
        this.updateUserForm?.form.patchValue({
          updateUserName: objCurrentUserData.name, 
          updateUserPhone: objCurrentUserData.phone, 
          updateUserEmail: objCurrentUserData.email, 
          updateUserPassword: "",
          updateUserPassword2: "", 
          updateUserAvatar: objCurrentUserData.avatar 
          
        });  
        this.imgResult = objCurrentUserData.avatar
    }, );
    
          
    }) 
    }
     
    uploadAvatar(){
      const MAX_MEGABYTE = 0.2;
      this.imageCompress
        .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        .then(
          (result: string) => {
            this.imgResult = result;
            this.updateUserForm?.form.patchValue({
              updateUserAvatar: this.imgResult}) 
          },
          (result: string) => {
            console.error('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
            this.imgResult = result;
          });
    }

    transformStringToImage(){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.imgResult);
  }


    updateUserPushed(updateUserForm: NgForm){
            this.auth.updateUserData(
              updateUserForm.value.updateUserName,
              updateUserForm.value.updateUserEmail, 
              updateUserForm.value.updateUserPhone,
              updateUserForm.value.updateUserPassword,
              updateUserForm.value.updateUserPassword2,
              updateUserForm.value.updateUserAvatar)
              this.router.navigate(['/home']);


    }


backClicked() {
  this._location.back();
}

}

