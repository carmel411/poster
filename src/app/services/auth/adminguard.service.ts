import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminguardService {
 
  constructor(   private auth: AuthService,
    private router: Router
) { }
private userData: any={}
private userStatus: any

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   this.auth.currentUser.subscribe((val)=>{
    this.userData = (val)
    this.userStatus = this.userData.userStatus
  }) 
    if (this.userStatus!=2){
        this.router.navigate(['/home'])
        return false 
    }
    else{
        
        return true
      }
    }
   
}

