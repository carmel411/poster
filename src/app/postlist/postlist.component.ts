import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostsService
} from '../services/posts.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  constructor(private swal: SwalService ,private auth: AuthService, private postService: PostsService, private route: ActivatedRoute, private router: Router) {}

  private sub: any;
  title: string = "לא נמצאו סיפורים"
  allParams: any;
  receivedData: any;
  sortedData: any;
  sortCondition: number = 0;
  favorites:string[] = []
  currentUserData: any;

  

  


  ngOnInit(): void {
if(sessionStorage.getItem("access-token")){
  this.auth.currentUser.subscribe((val)=>{
  this.currentUserData = (val)
  const objCurrentUserData = JSON.parse(JSON.stringify(this.currentUserData))
  this.favorites = objCurrentUserData.posts
this.getData()
})}else{
this.getData()
}
}

  ngOnDestroy(): void {
    this.auth.currentUser.unsubscribe
  }
  
  



getData(){
  this.route.queryParamMap.subscribe((params) => {
    this.allParams = {
      ...params.keys,
      ...params
    }
  
    if (this.allParams.params.tag) {
      this.dataForTag(this.allParams.params.tag)
    }
    if (this.allParams.params.query == "*") {
      this.allData()
    }
    if (this.allParams.params.query == "favorites") {
      this.dataForFavorites();
    }
    if (this.allParams.params.query && this.allParams.params.query !="*" && this.allParams.params.query !="favorites") {
      this.dataForQuery(this.allParams.params.query)
    }
    
  
  });
  
}

  dataForTag(tag: string) {
    this.postService.getPostsBytag(tag).then((data) => {
        this.receivedData = data
        if(data){this.title = tag}
        this.sortData()

      })
      .catch((error) => {
        let errorString = JSON.stringify(error)
        this.swal.alertWithWarning("תקלה בטעינת הנתונים", "" );
      });

  }

  dataForQuery(query: string) {
    this.postService.getPostsByQuery(query).then((data) => {
        this.receivedData = data
        if(data){this.title = ` כל הסיפורים עם '${query}'`}

        this.sortData()

      })
      .catch((error) => {
        let errorString = JSON.stringify(error)
        this.swal.alertWithWarning("תקלה בטעינת הנתונים", "");
      })}

      dataForFavorites() {
        this.postService.getPostsByFavorites().then((data) => {
            this.receivedData = data
            if(data){this.title = 'המועדפים שלי'}
    
            this.sortData()
    
          })
          .catch((error) => {
            let errorString = JSON.stringify(error)
            this.swal.alertWithWarning("תקלה בטעינת המועדפים", "" );
          })}
    

allData(){
this.postService.getAllPosts().then((data) => {
  this.receivedData = data
  if(data){this.title = 'כל הסיפורים'}

  this.sortData()

})
.catch((error) => {
  let errorString = JSON.stringify(error)
  this.swal.alertWithWarning("תקלה בטעינת הנתונים", "" );

})}

sortData(){
  let condition = this.sortCondition
if(condition==0){this.sortedData = this.receivedData}
if(condition==1){this.sortedData = this.receivedData.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1)}
if(condition==2){this.sortedData = this.receivedData.sort((a:any, b:any) => (a.name < b.name) ? 1 : -1)}
if(condition==3){this.sortedData = this.receivedData.sort((a: { _id: string; }, b: { _id: string; }) => a._id.localeCompare(b._id))}
if(condition==4){this.sortedData = this.receivedData.sort((a: { _id: string; }, b: { _id: string; }) => -1* a._id.localeCompare(b._id))}
if(condition==5){this.sortedData = this.receivedData.sort((a: any, b:any) => parseFloat(b.views) - parseFloat(a.views));

}}

setSortCondition(newCondition: number){
  this.sortCondition = newCondition
  this.sortData()
}

setFavorite(postId: string,newStatus: boolean){
  if(newStatus===true){
    this.favorites.push(postId)
    this.auth.updateUserfavorites(this.favorites).then((data) => {
      this.auth.currentUser.next(data)
      
      
    })
    .catch((error) => {
      let errorString = JSON.stringify(error)
      this.swal.alertWithWarning("תקלה בעדכון המועדפים", "" );
    })}
    if(newStatus===false){
      const index = this.favorites.indexOf(postId);
      if (index > -1) {
      this.favorites.splice(index, 1)}
      this.auth.updateUserfavorites(this.favorites).then((data) => {
      this.auth.currentUser.next(data)
      })
      .catch((error) => {
        let errorString = JSON.stringify(error)
        this.swal.alertWithWarning("תקלה בעדכון המועדפים", "" );
      })}

  }

  deletePost(postId:string){
    this.swal.question("בטוח שברצונך למחוק את הסיפור?", false, true, "אישור", "ביטול").then((result) => {
      if (result.isConfirmed) {
        
    this.postService.deletePost(postId).then((data) => {
     this.getData()
  
    })
    .catch((error) => {
      let errorString = JSON.stringify(error)
      this.swal.alertWithWarning("תקלה במחיקת הסיפור", "" );
    })}})
  
  }

}


