import { Component, OnInit, Input } from '@angular/core';
import { DisplayPostsService } from '../../service/display-posts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.scss']
})
export class DisplayPostsComponent implements OnInit {
  @Input() post!: any;
  postlikes!: number;
  postComment!: number;
  isAdminOrAuthor: boolean = false;
  isLiked!: boolean;

  constructor(private displayPostService: DisplayPostsService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.displayPostService.getLikes(this.post.id).subscribe((likes) => {
      this.postlikes = likes.likes;
    });
    this.displayPostService.getPostComment(this.post.id).subscribe((d) => {
      this.postComment = d.count;
    });
    this.isAdminOrIsAuthor();
  }

  postLike() {
    if(!this.isLiked) {
      this.displayPostService.addLike(this.post.id, 1).subscribe((d) => {
        this.postlikes = d.count;
        this.isLiked = d.alreadyLiked;
      });
    } else {
      this.displayPostService.deleteLike(this.post.id).subscribe((d) => {
        this.postlikes = d.count;
        this.isLiked = d.alreadyLiked;
      });
    }
  }

  deletPost() {
    this.displayPostService.sendDeletePostUpdate(this.post.id);
  }

  createComment() {
    this.router.navigate(['/post-comment/' + this.post.id]);
  }

  modifyPost() {
    this.router.navigate(['/modify-post/' + this.post.id]);
  }

  isAdminOrIsAuthor() {
    let userId = this.authService.getUserId();
    let role = this.authService.getRole();
    
    if(this.post.authorId === userId || role == true) {
      this.isAdminOrAuthor = true;
    } else {
      this.isAdminOrAuthor = false;
    }
  }
}