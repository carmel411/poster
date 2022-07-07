import { Component, OnInit, ViewChild } from '@angular/core';
import { async, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormsModule, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import {Location} from '@angular/common';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  constructor(private router: Router,private postService: PostsService ,private spinner: SpinnerService,  private route: ActivatedRoute, private swal: SwalService,private _location: Location) { }

  title: string = ''
  id: string = ''
  
  private sub:any;

  @ViewChild('editPostForm') editPostForm?: NgForm;

 
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id){this.fillForm(this.id);
        this.title = 'עריכת סיפור'}
      else{this.title = 'הוספת סיפור'}

    })
  }
 
  fillForm(id: string){
    let postData: any;
    this.postService.getPostByPostId(id).then((data) => {
      postData = data;
          setTimeout(() => {
            this.editPostForm?.form.patchValue({
                 name: postData.name, 
                 summary: postData.summary, 
                 postBody: postData.postBody, 
                 author: postData.author, 
                 tags: postData.tags.join(', '), 
                 imageUrl: postData.imageUrl, 
                 comments: JSON.stringify(postData.comments)
            
          });  
      
          })
    })
    .catch((error) => {
      let errorString = JSON.stringify(error)
      this.swal.alertWithWarning("תקלה בטעינת הנתונים", errorString );
    });

  

  }
     



onSubmit(editPostForm: NgForm){

  let info = editPostForm.form.value
  let tagsArray = info.tags.split(',').map((tag: string) => tag.trim()) //remove whitespaces
  tagsArray = tagsArray.filter((item: any) => item); //remove empty values from array
  if(this.id){
  let commentsJson = JSON.parse(info.comments)
    this.postService.updatePost(this.id,info.name,info.postBody,info.author,info.summary,tagsArray,info.imageUrl,commentsJson)}
    else{
    this.postService.createPost(info.name,info.postBody,info.author,info.summary,tagsArray,info.imageUrl)}
}





backClicked() {
  this._location.back();
}

}
