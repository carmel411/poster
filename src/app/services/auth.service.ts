import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import {
  BehaviorSubject,
  Observable,
  throwError
} from 'rxjs';
import {
  SwalService
} from './swal.service';
import {
  SpinnerService
} from './spinner.service';
import {
  Router
} from '@angular/router';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  environment
} from '../../environments/environment';
import {
  HttpHeaders
} from '@angular/common/http';
import {
  User
} from 'src/moduls/user';
import {
  UsersComponent
} from '../users/users.component';
import {
  HttpErrorResponse
} from "@angular/common/http";
import {
  catchError,
  retry
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;


  userId: string = "";
  userToken: string = "";
  currentUser = new BehaviorSubject < object > ({});
  allUsersData = new BehaviorSubject < any > ([]);


  constructor(private http: HttpClient, private swal: SwalService, private spinner: SpinnerService, private router: Router, private cookie: CookieService) {}


  register(name: string, email: string, password: string) {
    this.spinner.setStatus(true);
    const headers = {
      'content-type': 'application/json'
    }
    const userInfo = {
      'name': name,
      'email': email,
      'password': password,
      'userStatus': 0
    };
    const body = JSON.stringify(userInfo);

    this.http.post < any > (`${this.API_URL}users`, body, {
      'headers': headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.userId = data._id;
        this.swal.alertWithSuccess("נרשמת בהצלחה")
        this.login(email, password, false);

      },
      error: error => {
        this.spinner.setStatus(false);
        this.swal.alertWithWarning("תקלה בהרשמה", error.error)
      }
    })
  }

  login(email: string, password: string, rememberMe: boolean) {
    this.spinner.setStatus(true);
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      responseType: 'text'
    }
    const userInfo = {
      'email': email,
      'password': password
    };
    const body = JSON.stringify(userInfo);

    this.http.post < any > (`${this.API_URL}auth`, body, {
      'headers': headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.userToken = data.token;
        sessionStorage.setItem('access-token', this.userToken)

        this.swal.alertWithSuccess("ברוך הבא")
        if (rememberMe == true) {
          localStorage.setItem('remember-email', email)
        }
        if (rememberMe == true) {
          localStorage.setItem('remember-password', password)
        }
        this.getUserData();



        this.router.navigate(['/home']);
      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("Login Error", error.error)
        } else {
          this.swal.alertWithWarning("Login Error", error.message)
        }
        console.error('There was an error!', error);
      }
    })
  }



  rememberMeLogin() {
    const rememberMeEmail = localStorage.getItem('remember-email');
    const rememberMePassword = localStorage.getItem('remember-password');
    if (rememberMeEmail && rememberMePassword) {
      this.login(rememberMeEmail, rememberMePassword, true)
    };
  }

  forgetPassword(emailAddress: string) {
    this.spinner.setStatus(true);
    const headers = {
      'content-type': 'application/json'
    }
    const body = {
      "email": emailAddress
    }

    this.http.post < any > (`${this.API_URL}users/forget`, body, {
      'headers': headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.swal.alertWithSuccess("סיסמתך אופסה ונשלחה לדואר האלקטרוני שהזנת")
      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("האיפוס נכשל", error.error)
        } else {
          this.swal.alertWithWarning("האיפוס נכשל", error.message)
        }
      }
    })
  }

  logout() {
    localStorage.clear()
    sessionStorage.clear()
    this.currentUser.next({});

    this.router.navigate(['/home'])
  }

  getUserData(): void {
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    this.http.get < object > (`${this.API_URL}users/me`, {
      headers
    }).subscribe({
      next: data => {
        this.currentUser.next(data);
      },
      error: error => {
        let errorString = JSON.stringify(error)
        this.swal.alertWithWarning("תקלה בקבלת מידע המשתמש ", error);
      }
    })
  }




  updateUserData(name: string, email: string, phone: string, password: string, password2: string, avatar: string) {
    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    const userInfo = {
      'name': name,
      'email': email,
      'phone': phone,
      'password': password,
      'password2': password2,
      'avatar': avatar
    };
    this.http.patch < any > (`${this.API_URL}users/update`, userInfo, {
      headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.userId = data._id;
        this.swal.alertWithSuccess("הפרופיל עודכן")
        this.getUserData()

      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("Register Error", error.error)
        } else {
          this.swal.alertWithWarning("Register Error", error.message)
        }
        console.error('There was an error!', error.error);
      }
    })
  }

  updateUserStatus(id: string, newStatus: number) {
    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    const body = {
      'id': id,
      'newStatus': newStatus
    };
    this.http.patch < any > (`${this.API_URL}users/status`, body, {
      headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.getAllusers()

      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("Register Error", error.error)
        } else {
          this.swal.alertWithWarning("Register Error", error.message)
        }
        console.error('There was an error!', error.error);
      }
    })
  }

  updateUserfavorites(posts: Array < string > ): Promise < any > {
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    const body = posts;
    return this.http.patch < any > (`${this.API_URL}users/posts`, body, {
      headers
    }).toPromise()

  }



  getAllusers(): void {
    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    this.http.get < any > (`${this.API_URL}users/allusers`, {
        headers
      })
      .subscribe({
        next: data => {
          this.spinner.setStatus(false);
          this.allUsersData.next(data)
        },
        error: error => {
          this.spinner.setStatus(false);
          this.swal.alertWithWarning("רשימת משתמשים אינה זמינה", "")
        }
      })
  }

  newlogin(email: string, password: string, rememberMe: boolean): Observable < any > {
    // this.spinner.setStatus(true);
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      responseType: 'text'
    }
    const userInfo = {
      'email': email,
      'password': password
    };
    const body = JSON.stringify(userInfo);

    return this.http.post < any > (`${this.API_URL}auth`, body, {
      'headers': headers
    }).pipe(

      catchError(this.handleError)


    );
  }

  newnewlogin(email: string, password: string, rememberMe: boolean) {
    this.newlogin(email, password, rememberMe).subscribe(
      data => {
        // this.spinner.setStatus(false);
        this.userToken = data.token;
        sessionStorage.setItem('access-token', this.userToken)

        this.swal.alertWithSuccess("ברוך הבא")
        if (rememberMe == true) {
          localStorage.setItem('remember-email', email)
        }
        if (rememberMe == true) {
          localStorage.setItem('remember-password', password)
        }
        this.getUserData();
        this.router.navigate(['/home']);
      }


    )

  }


  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
