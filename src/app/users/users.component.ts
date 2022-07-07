import { Component, OnInit, ViewChild, OnDestroy , AfterViewInit} from '@angular/core';
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
  
this.auth.allUsersData.subscribe((result)=>{
  this.data=result}
  )
  this.auth.getAllusers();  
  }


  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.auth.allUsersData.unsubscribe  }

 
changeStatus(id:string, currentStatus: number){
  if(currentStatus == 0){
this.swal.question("בטוח שברצונך לאשר הרשאת כתיבה למשתמש?", false, true, "אישור", "ביטול").then((result) => {
    if (result.isConfirmed) {
      this.auth.updateUserStatus(id,1);
  }
 
})}
else{this.auth.updateUserStatus(id,0)}
}



}







