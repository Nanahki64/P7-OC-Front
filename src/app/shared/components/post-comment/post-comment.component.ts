import { Component, OnInit } from '@angular/core';
import { DisplayPostsService } from '../../service/display-posts.service';
import { PostCommentService } from '../../service/post-comment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  postlikes!: number;
  commentForm!: FormGroup;
  submitted = false;
  isLiked!: boolean;

  firstName!: string;
  lastName!: string;
  content!: string;
  imageUrl!: string;
  postTitle!: string;

  comments = [];

  constructor(private displayPostService: DisplayPostsService, private formBuilder: FormBuilder, private postCommentService: PostCommentService, private matDialogRef: MatDialogRef<PostCommentComponent>, @Inject(MAT_DIALOG_DATA) public postId: any) { }

  ngOnInit(): void {
    this.displayPostService.getOnePost(this.postId).subscribe((d) => {
      this.relatePostData(d);
    });
    this.postCommentService.getPostComment(this.postId).subscribe((d) => {
      this.comments = d.comments;
    });
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  relatePostData(data: any) {
    this.firstName = data.post.author.firstName;
    this.lastName = data.post.author.lastName;
    this.content = data.post.content;
    this.imageUrl = data.post.imageUrl;
    this.postTitle = data.post.title;
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.postId);
  }

  onSubmit() {
    this.postCommentService.createComment(this.commentForm.controls['comment'].value, this.postId);
  }
}
