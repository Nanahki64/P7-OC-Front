import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  // déclaration des routes du backend.
  private getPostCommentUrl = environment.apiUrl + '/api/comment/post';
  private createCommentUrl = environment.apiUrl + '/api/comment/';
  private deletePostCommentUrl = environment.apiUrl + '/api/comment/';

  // Initialisation du subject updateCommentNumber.
  private updateCommentNumber = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  /**
   * Permet de récupérer les commentaires d'un post.
   */
  getPostComment(postId: string) {
    return this.http.post<any>(this.getPostCommentUrl, {
      postId: postId
    });
  }

  /**
   * Permet de créer un commentaire.
   */
  createComment(comment: string, postId: string) {
    return this.http.post<any>(this.createCommentUrl, {
      comment: comment,
      id: postId,
    });
  }

  /**
   * Permet de supprimer un commentaire.
   */
  deleteComment(commentId: string) {
    return this.http.delete(this.deletePostCommentUrl + commentId);
  }

  /**
   * Permet d'envoyer l'état vrai.
   */
  sendUpdateCommentNumber() {
    this.updateCommentNumber.next(true);
  }

  /**
   * Permet de déclencher une fonction qui met à jour le nombre de commentaires. 
   */
  receiveUpdateCommentNumber(): Observable<boolean> {
    return this.updateCommentNumber.asObservable();
  }
}
