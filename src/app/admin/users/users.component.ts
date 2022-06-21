import { Component, OnInit, ViewChild, OnDestroy , AfterViewInit} from '@angular/core';
// import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormsModule, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from 'src/moduls/user';
import { RouterLink,Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public spinner: SpinnerService, public swal: SwalService, public auth: AuthService) { }
 
  @ViewChild('checkForm')
  checkForm!: NgForm;
  data: User[] = []
  allCustomers: User[] = []
  forPresentCustomers: User[] = []

  ngOnInit(): void {
  // this.checkForm.form.value.inlineRadioOptions = 'true';
  
this.auth.allUsersData.subscribe((result)=>{this.data=result;
  
  console.log(result)}
  )
  this.auth.getAllusers();  
  }


  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.auth.allUsersData.unsubscribe  }

 
  
  // this.snapshot = this.helper.getAllCustomers(all,status).onSnapshot((querySnapshot) => {
  //     this.spinner.setStatus(false);
  //     this.allCustomers = [];
  //     this.forPresentCustomers = [];
  //     if (querySnapshot)querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, "=>", doc.data());
  //     if (doc.id == null){this.spinner.setStatus(false)} 
  //     var oneCustomer = new Customer(doc.data().fname  , doc.data().lname, doc.data().email, doc.data().phone, doc.data().address, doc.data().notes, doc.data().id, doc.data().status)
  //     this.allCustomers.push(oneCustomer)
  //     })
  //     this.spinner.setStatus(false);
  //     this.forPresentCustomers = this.allCustomers
  //   }
  // )
// }

changeStatus(id:string, currentStatus: number){
  if(currentStatus == 0){
this.swal.question("בטוח שברצונך לאשר הרשאת כתיבה למשתמש?", false, true, "אישור", "ביטול").then((result) => {
    if (result.isConfirmed) {
      this.auth.updateUserStatus(id,1);
  }
  //  else if (result.isDenied) {
  //   Swal.fire(denyButtonText, '', 'info')
  // }
})}
else{this.auth.updateUserStatus(id,0)}
}



// checkPresent(check: NgForm){
//   this.stopSnapshot()
//   console.log(check.form.value.inlineRadioOptions)
//   var status = check.form.value.inlineRadioOptions
//   if (status === "true"){this.getData(false, true)}
//   if (status === "false"){this.getData(false, false)}
//   if (status === "both"){this.getData(true)}
// }

searchQuery(event: any){
  var query = event.target.value
  console.log(query);
  console.log(this.allCustomers)
// console.log(this.helper.searchQuery(this.allCustomers, query));
// if(query){this.forPresentCustomers = this.helper.searchQuery(this.allCustomers, query)}
// else{this.forPresentCustomers = this.allCustomers};

}

stopSnapshot() {
  // if (this.snapshot) {
  //   this.snapshot()
  // }
}



}







