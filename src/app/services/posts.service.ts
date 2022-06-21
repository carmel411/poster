import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import {
  Observable
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
  environment
} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private API_URL = environment.API_URL;



  constructor(private http: HttpClient, private swal: SwalService, private spinner: SpinnerService, private router: Router) {}


  async getPostByPostId(postId: string): Promise < any > {
    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    return this.http.get < object > (`${this.API_URL}posts/${postId}`, {
        headers
      }).toPromise();
  }

  getPostsBytag(tag: string) {
    return this.http.get < object > (`${this.API_URL}posts/searchtag?tag=${tag}`)
      .toPromise();
  }

  getPostsByQuery(query: string) {
    return this.http.get < object > (`${this.API_URL}posts/searchquery?query=${query}`)
      .toPromise();
  }


  createPost(name: string, postBody: string, author: string, summary: string, tags: Array < string > , imageUrl: string) {
    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    let postInfo = {
      'name': name,
      'postBody': postBody,
      'author': author,
      'summary': summary,
      'tags': tags,
      'postNumber': 'temporary',
      'user_id': "temporary",
      'views': 0
    };
    if(imageUrl!=='' && imageUrl!==null){
      var image = {'imageUrl':imageUrl}
      postInfo = {...postInfo,...image}}

    const body = JSON.stringify(postInfo);
    console.log(postInfo);
    this.http.post < any > (`${this.API_URL}posts`, postInfo, {
      headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.swal.alertWithSuccess("הסיפור הועלה בהצלחה")
        this.router.navigate(['/home']);

      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("תקלה בהעלאת הסיפור", error.error)
        } else {
          this.swal.alertWithWarning("תקלה בהעלאת הסיפור", error.message)
        }
        console.error('There was an error!', error.error);
      }
    })
  }

  updatePost(id: string, name: string, postBody: string, author: string, summary: string, tags: Array < string > , imageUrl: string) {
    

    this.spinner.setStatus(true);
    let token: string = sessionStorage.getItem('access-token') !
      const headers = new HttpHeaders().set('x-auth-token', token)
    let postInfo = {
      'name': name,
      'postBody': postBody,
      'author': author,
      'summary': summary,
      'tags': tags,
    };
    if(imageUrl!=='' && imageUrl!==null){
      var image = {'imageUrl':imageUrl}
      postInfo = {...postInfo,...image}}

    const body = JSON.stringify(postInfo);
    console.log(postInfo);
    
    this.http.put < any > (`${this.API_URL}posts/${id}`, postInfo, {
      headers
    }).subscribe({
      next: data => {
        this.spinner.setStatus(false);
        this.swal.alertWithSuccess("הסיפור עודכו")
        this.router.navigate(['/home']);

      },
      error: error => {
        this.spinner.setStatus(false);
        if (typeof error.error == 'string') {
          this.swal.alertWithWarning("העידכון נכשל", error.error)
        } else {
          this.swal.alertWithWarning("העידכון נכשל", error.message)
        }
        console.error('There was an error!', error.error);
      }
    })
  }





  // getMyPosts(){
  //   this.spinner.setStatus(true);
  //   const headers = {'content-type': 'application/json', 'x-auth-token':}
  //   const token = 
  //   console.log(userInfo);
  //   console.log(body);
  //   this.http.get 
  //   this.http.post<any>(`${this.baseUrl}auth`,body,{'headers':headers}).subscribe({
  //       next: data => {
  //           this.spinner.setStatus(false);
  //           this.userToken = data.token;
  //           this.swal.alertWithSuccess("Login Success")
  //           console.log(this.userToken);
  //           this.router.navigate(['/home']);
  //       },
  //       error: error => {
  //         this.spinner.setStatus(false);
  //         if (typeof error.error == 'string'){
  //           this.swal.alertWithWarning("Login Error",error.error)
  //         }else{
  //           this.swal.alertWithWarning("Login Error",error.message)
  //         } 
  //         console.error('There was an error!', error.error );
  //       }
  //   })
  // }








}
