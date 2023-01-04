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
  }

  addLike() {
    this.displayPostService.addLike(this.post.id, 1);
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.post.id);
  }
}
