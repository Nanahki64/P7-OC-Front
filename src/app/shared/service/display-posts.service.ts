import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayPostsService {
  
  // déclaration des routes du backend.
  private retrievePostUrl = environment.apiUrl + '/api/post';
  private getOnePostUrl = environment.apiUrl + '/api/post/';
  private deletePostUrl = environment.apiUrl + '/api/post/';

  private retrieveLikesUrl = environment.apiUrl + '/api/likes/';
  private addLikeUrl = environment.apiUrl + '/api/likes/';
  private deleteLikeUrl = environment.apiUrl + '/api/likes/';

  // Initialisation du subject displayPostUpdate.
  private displayPostUpdate = new Subject<boolean>();
  // Initialisation du subject deletePostUpdate.
  private deletePostUpdate = new Subject<string>();

  constructor(private http: HttpClient) { }

  /**
   * Permet de récupérer les posts.
   */
  getPosts() {
    return this.http.get<any>(this.retrievePostUrl);
  }

  /**
   * Permet de récupérer un post.
   */
  getOnePost(id: string) {
    return this.http.get<any>(this.getOnePostUrl + id);
  }

  /**
   * Permet de récupérer les likes.
   */
  getLikes(id: string) {
    return this.http.get<any>(this.retrieveLikesUrl + id);
  }

  /**
   * Permet d'ajouter un like.
   */
  addLike(postId: string, likeType: number) {
    return this.http.post<any>(this.addLikeUrl, {
      postId: postId,
      likeType: likeType
    });
  }

  /**
   * Permet de supprimer un like.
   */
  deleteLike(postId: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        postId: postId,
      }
    }
    return this.http.delete<any>(this.deleteLikeUrl, options);
  }

  /**
   * Permet de supprimer un post.
   */
  deletePost(postId: string) {
    return this.http.delete(this.deletePostUrl + postId);
  }

  /**
   * Permet d'envoyer l'état vrai.
   */
  sendDisplayPostUpdate() {
    this.displayPostUpdate.next(true);
  }

  /**
   * Permet de déclencher une fonction qui met à jour les posts affiché. 
   */
  receiveDisplayPostUpdate(): Observable<boolean> {
    return this.displayPostUpdate.asObservable();
  }

  /**
   * Permet d'envoyer un postId.
   */
  sendDeletePostUpdate(postId: string) {
    this.deletePostUpdate.next(postId);
  }

  /**
   * Permet de recevoir le postId.
   */
  receiveDeletePostUpdate(): Observable<string> {
    return this.deletePostUpdate.asObservable();
  }
}
