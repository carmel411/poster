import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
this.postService.getPostsBytag("אמונה") .then((data) => {
  console.log(JSON.stringify(data));
})
.catch((error) => {
  console.log("Promise rejected with " + JSON.stringify(error));
});


this.postService.getPostsByQuery("משה").then((data) => {
  console.log(JSON.stringify(data));
})
.catch((error) => {
  console.log("Promise rejected with " + JSON.stringify(error));
}); 

  }

}
