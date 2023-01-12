import { Component, OnInit } from '@angular/core';
import { DisplayPostsService } from '../../service/display-posts.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  posts: Array<Object> = [];

  constructor(private displayPostService: DisplayPostsService) { }

  ngOnInit(): void {
    this.displayPostService.getPosts().subscribe((postsData) => {
      this.posts = postsData.posts;
    });
    this.displayPostService.receiveDisplayPostUpdate().subscribe((displayPostToUpdate) => {
      if(displayPostToUpdate) {
        this.displayPostService.getPosts().subscribe((post) => {
          this.posts = post.posts;
        });
      }
    });
    this.displayPostService.receiveDeletePostUpdate().subscribe((displayPostToUpdate) => {
      this.displayPostService.deletePost(displayPostToUpdate).subscribe(() => {
        this.displayPostService.getPosts().subscribe((post) => {
          console.log('this',this.posts, 'post',post.posts);
          this.posts = post.posts;
        });
      });
    });
  }
}
