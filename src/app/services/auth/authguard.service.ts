import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class authguardService implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }
    private userData: any={}
    private userStatus: any
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       this.auth.currentUser.subscribe((val)=>{
        this.userData = (val)
        this.userStatus = this.userData.userStatus
      }) 
        if (this.userStatus===undefined){
            this.router.navigate(['/home'])
            return false 
        }
        else{
            
            return true
          }
        }
       
    }

