import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
// import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class authguardService implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.ifUserLogin){return true}
        else{this.router.navigate(['/home'])
        return false}
        }
       
    }

