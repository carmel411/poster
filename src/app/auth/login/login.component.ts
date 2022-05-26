import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }
  loginForm={
    email:"",
    password:"",
    rememberMe:""
    }
  registerForm={
    name: "",
    email:"",
    password:""
      }

  ngOnInit(): void {
    }

registerPushed(registerForm: NgForm){
  console.log(registerForm.value)
  this.auth.register(registerForm.value.registerName,registerForm.value.registerEmail,registerForm.value.registerPassword);
}


loginPushed(loginForm: NgForm){
console.log(loginForm.value)
this.auth.login(loginForm.value.loginEmail,loginForm.value.loginPassword,loginForm.value.rememberMe);
}

forgetPasswordPushed(loginForm: NgForm){
this.auth.forgetPassword(loginForm.value.loginEmail)
}

}
