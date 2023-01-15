import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
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
  userId: any;
  role: any;

  constructor(private formBuilder: FormBuilder, private postCommentService: PostCommentService, private matDialogRef: MatDialogRef<PostCommentComponent>, @Inject(MAT_DIALOG_DATA) public postId: any, private authService: AuthService) { }

  ngOnInit(): void {
    // Permet de récupérer les commentaires des posts.
    this.postCommentService.getPostComment(this.postId).subscribe((postComment) => {
      this.comments = postComment.comments;
    });
    // Initialisation du formulaire commentForm.
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
    // Permet de récupérer le userId de l'utilisateur.
    this.userId = this.authService.getUserId();
    // Permet de récupérer le role de l'utilisateur.
    this.role = this.authService.getRole();
  }

  /**
   * Permet de supprimer un commentaire.
   */
  deleteComment(authorId: string, commentId: string) {
    if(authorId == this.userId || this.role) {
      this.postCommentService.deleteComment(commentId).subscribe(() => {
        this.postCommentService.getPostComment(this.postId).subscribe((d) => {
          this.comments = d.comments;
          this.postCommentService.sendUpdateCommentNumber();
        });
      });
    }
  }

  /**
   * Permet d'envoyer le formulaire au back ou de renvoyer une erreur et d'envoyer la mise à jour du nombre de commentaire à display-posts.
   */
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
