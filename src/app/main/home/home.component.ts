import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostsService, private router: Router) { }
  placeId: string ="" 
  latest: any

  ngOnInit(): void {
    this.postService.getLatestPosts() .then((data) => {
      this.latest = data
    })
    .catch((error) => {
    });
  }

searchPushed(searchVal: string){
  this.router.navigate(
    ['/postlist'],
    { queryParams: { query: searchVal } }
  );
}

}
