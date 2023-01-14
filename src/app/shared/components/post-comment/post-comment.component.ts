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
  commentForm!: FormGroup;
  comments = [];
  submitted = false;
  error!: string;

  constructor(private displayPostService: DisplayPostsService, private formBuilder: FormBuilder, private postCommentService: PostCommentService, private matDialogRef: MatDialogRef<PostCommentComponent>, @Inject(MAT_DIALOG_DATA) public postId: any) { }

  ngOnInit(): void {
    this.postCommentService.getPostComment(this.postId).subscribe((d) => {
      this.comments = d.comments;
    });
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  deleteLike() {
    this.displayPostService.deleteLike(this.postId);
  }

  onSubmit() {
    this.submitted = true;
    if(this.commentForm.invalid) {
      this.error = 'Commentaire requis';
    } else {
      this.postCommentService.createComment(this.commentForm.controls['comment'].value, this.postId).subscribe(() => {
        this.postCommentService.getPostComment(this.postId).subscribe((d) => {
          this.comments = d.comments;
          this.postCommentService.sendUpdateCommentNumber();
        });
      });

    }
  }
}
