import { Component, OnInit } from '@angular/core';
import { DisplayPostsService } from '../service/display-posts.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  post: any;
  postId!: string;
  postlikes!: number;
  commentForm!: FormGroup;
  error = '';
  submitted = false;
  isLiked!: boolean;

  constructor(private displayPostService: DisplayPostsService, private router: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.postId = params['id'];
    });
    this.displayPostService.getOnePost(this.postId).subscribe((d) => {
      this.post = d.post;
      console.log(this.post);
    });
    this.displayPostService.getLikes(this.postId).subscribe((likes) => {
      this.postlikes = likes.likes;
    });
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  postLike() {
    if(!this.isLiked) {
      this.displayPostService.addLike(this.post.id, 1).subscribe((d) => {
        this.postlikes = d.count;
        this.isLiked = d.alreadyLiked;
      });
    } else {
      this.displayPostService.deleteLike(this.post.id).subscribe((d: any) => {
        this.postlikes = d.count;
        this.isLiked = d.alreadyLiked;
      })
    }
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.postId);
  }

  onSubmit() {
    this.displayPostService.createComment(this.commentForm.controls['comment'].value, this.postId);
  }
}
