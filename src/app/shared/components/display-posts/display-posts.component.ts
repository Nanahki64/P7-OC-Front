import { Component, OnInit, Input } from '@angular/core';
import { DisplayPostsService } from '../../service/display-posts.service';
import { PostCommentService } from '../../service/post-comment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModifyingPostComponent } from '../modifying-post/modifying-post.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.scss']
})
export class DisplayPostsComponent implements OnInit {

  // Permet de récupérer les données des post injecté depuis landingPage.
  @Input() post!: any;

  postlikes!: number;
  postComment!: number;
  isAdminOrAuthor: boolean = false;
  isLiked!: boolean;
  
  constructor(private displayPostService: DisplayPostsService, private postCommentService: PostCommentService,private router: Router, private authService: AuthService, private matDialog: MatDialog) { }
  
  ngOnInit(): void {
    // Permet de récupérer le nombre de like par post ainsi que l'état du like.
    this.displayPostService.getLikes(this.post.id).subscribe((likes) => {
      this.postlikes = likes.count;
      this.isLiked = likes.alreadyLiked;
    });
    // Permet de récupérer le nombre de commentaire par post.
    this.postCommentService.getPostComment(this.post.id).subscribe((comment) => {
      this.postComment = comment.count;
    });
    this.isAdminOrIsAuthor();
    // Permet de récupérer la mise à jour du nombre de commentaire lorsqu'il est actualisé depuis post-comment.
    this.postCommentService.receiveUpdateCommentNumber().subscribe(() => {
      this.postCommentService.getPostComment(this.post.id).subscribe((comment) => {
        this.postComment = comment.count;
      });
    });
  }
  
  /**
   * Permet d'ajouter ou de supprimer un like.
   */
  postLike() {
    if(!this.isLiked) {     
      this.displayPostService.addLike(this.post.id, 1).subscribe((likeData) => {
        this.postlikes = likeData.count;
        this.isLiked = likeData.alreadyLiked;
      });
    } else {
      this.displayPostService.deleteLike(this.post.id).subscribe((likeData) => {
        this.postlikes = likeData.count;
        this.isLiked = likeData.alreadyLiked;
      });
    }
  }
  
  /**
   * Permet de supprimer un post.
   */
  deletPost() {
    this.displayPostService.sendDeletePostUpdate(this.post.id);
  }
  
  /**
   * Permet de créer un commentaire.
   */
  createComment() {
    this.router.navigate(['/post-comment/' + this.post.id]);
  }

  /**
   * Permet de vérifier le role de l'utilisateur connecté.
   */
  isAdminOrIsAuthor() {
    let userId = this.authService.getUserId();
    let role = this.authService.getRole();
    
    if(this.post.authorId === userId || role == true) {
      this.isAdminOrAuthor = true;
    } else {
      this.isAdminOrAuthor = false;
    }
  }
  
  /**
   * Permet d'ouvrir le modal pour modifier un post.
   */
  onOpenDialogClickModify() {
    this.matDialog.open(ModifyingPostComponent, {
      data: this.post.id,
    });
  }

  /**
   * Permet d'ouvrir le modal des commentaires.
   */
  onOpenDialogClickComment() {
    this.matDialog.open(PostCommentComponent, {
      data: this.post.id,
    });
  }
}
