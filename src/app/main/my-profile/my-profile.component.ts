import { Component, OnInit, ViewChild } from '@angular/core';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormsModule, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

currentUserData: {}={
      name: "", 
      phone: "", 
      email: "", 
      avatar: ""
}

  constructor(private spinner: SpinnerService, private auth: AuthService,  private route: ActivatedRoute, private swal: SwalService,private _location: Location) { }

  @ViewChild('userForm') updateUserForm?: NgForm;
  
  ngOnInit(): void {
this.fillForm()
  }
 
  fillForm(){
    this.auth.currentUser.subscribe((val)=>{
      this.currentUserData = (val)
      console.log(this.currentUserData)
      })
      const objCurrentUserData = JSON.parse(JSON.stringify(this.currentUserData))
    
     this.updateUserForm?.setValue({
           name: objCurrentUserData.name, 
           phone: objCurrentUserData.phone, 
           email: objCurrentUserData.email, 
           avatar: objCurrentUserData.avatar 
         });
         console.log(objCurrentUserData.name)
    }
     

  // updateUser(){
  //   var thisId = "121434353453534534534"
  //   var user = {
  //     firstName: 'Moshe',
  //     lastName: 'Levi',
  //     address: 'TA'
  //   }
  //   this.spinner.setStatus(true);
  //   this.db.collection("users").doc(thisId).update(user).then((res)=>{
  //     console.log(res)
  //     this.getAllUsers()
  //     // this.alertService.done("Done");
  //     this.spinner.setStatus(false);
  //   }).catch((err)=>{
  //     this.spinner.setStatus(false);
  //     // this.alertService.error('Error',err.message);
  //     console.log(err)
  //   })
  // }


// onSubmit(userForm: NgForm){
//   console.log(userForm.form.value)
//   var customerObj = userForm.form.value
//   customerObj.id = this.customerId;
//   customerObj.status = true;
//   this.helper.saveCustomer(customerObj)
//   this.swal.alertWithSuccess("User save successfully")
//   // TODO: שבשמירה לא ישתנה הסטטוסלחיובי
// }

backClicked() {
  this._location.back();
}

}

