import { Component, OnInit, Input } from '@angular/core';
import { DisplayPostsService } from '../service/display-posts.service';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.scss']
})
export class DisplayPostsComponent implements OnInit {
  @Input() post!: any;
  postlikes!: number;
  constructor(private displayPostService: DisplayPostsService) { }

  ngOnInit(): void {
    this.displayPostService.getLikes(this.post.id).subscribe((likes) => {
      this.postlikes = likes.likes;
    });
    this.displayPostService.getPostComment(this.post.id).subscribe((d) => {
      console.log(d);
    });
  }

  addLike() {
    this.displayPostService.addLike(this.post.id, 1).subscribe((d) => {
      this.postlikes = d.count;
    });
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.post.id);
  }
}
