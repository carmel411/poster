import { Component, OnInit,ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { SwalService } from '../services/swal.service';
import { NgForm } from '@angular/forms';
import * as pdf from 'easypdf-io';

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
 
// downloadPDF() {
//     var data = this.getSampleData();
//     easypdf.create(data, function(result) {
//         easypdf.download('sample.pdf', result.pdf);
//         //	you can download like this as well:
//         //	easypdf.download();
//         //	easypdf.download('sample.pdf');
//     });
// }


getSampleData() {
  var html = '<p>Hello world!</p>';

  return {
      // Base64 encode html
      html: btoa(html),
      background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
      settings: {
          // "margin-top": 25, // Default to 25
          // "margin-right": 25, // Default to 25
          // "margin-left": 25, // Default to 25
          // "margin-bottom": 25, // Default to 25
          // "format": "Letter" // Defaults to A4
      }
  };
}

}