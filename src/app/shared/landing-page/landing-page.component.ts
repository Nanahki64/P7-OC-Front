import { Component, OnInit } from '@angular/core';
import { DisplayPostsService } from '../service/display-posts.service';

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
  }

}
