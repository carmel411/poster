import { Component, OnInit,ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';
import { SwalService } from '../services/swal.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  id: string = ''
  private sub:any;
  post = {
    name: "",
    author: "",
    summary: "",
    postBody: "",
    imageUrl: "",
    tags: [],
    comments: [
      {name: "",
      body: ""
      }
    ]
  }



  constructor(private swal: SwalService ,private router: Router,private postService: PostsService ,private spinner: SpinnerService,  private route: ActivatedRoute) { }

  @ViewChild('commentForm') commentForm?: NgForm;
  name = ""
  body = ""
  email = ""
   
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.getPost(this.id);

    })

  }

  getPost(id: string){
    this.spinner.setStatus(true)
    this.postService.getPostByPostId(id).then((data) => {
      this.post = data;
    this.spinner.setStatus(false)

      })
    .catch((error) => {
      let errorString = JSON.stringify(error)
    this.spinner.setStatus(false)

      this.swal.alertWithWarning("תקלה בטעינת הסיפור","");
    });
}


commentPushed(commentForm: NgForm){
let newComment = {"name": commentForm.value.name, "email": commentForm.value.email, "body": commentForm.value.comment}
console.log(newComment)
this.postService.pushComment(this.id,newComment)
window.location.reload()

}
     
}