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

  addLike() {
    this.displayPostService.addLike(this.postId, 1).subscribe((d) => {
      this.postlikes = d.count;
    });
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.postId);
  }

  onSubmit() {
    this.displayPostService.createComment(this.commentForm.controls['comment'].value, this.postId);
  }
}
