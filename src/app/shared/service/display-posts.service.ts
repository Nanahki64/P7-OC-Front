import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayPostsService {
  private retrievePostUrl = environment.apiUrl + '/api/post';
  private getOnePostUrl = environment.apiUrl + '/api/post/';
  private deletePostUrl = environment.apiUrl + '/api/post/';

  private retrieveLikesUrl = environment.apiUrl + '/api/likes/';
  private addLikeUrl = environment.apiUrl + '/api/likes/';
  private deleteLikeUrl = environment.apiUrl + '/api/likes/';

  private getPostCommentUrl = environment.apiUrl + '/api/comment/post';
  private createCommentUrl = environment.apiUrl + '/api/comment/';

  private displayPostUpdate = new Subject<boolean>();
  private deletePostUpdate = new Subject<string>();

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>(this.retrievePostUrl);
  }

  getOnePost(id: string) {
    return this.http.get<any>(this.getOnePostUrl + id);
  }

  getLikes(id: string) {
    return this.http.get<any>(this.retrieveLikesUrl + id);
  }

  addLike(postId: string, likeType: number) {
    return this.http.post<any>(this.addLikeUrl, {
      postId: postId,
      likeType: likeType
    });
  }

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

  deletePost(postId: string) {
    return this.http.delete(this.deletePostUrl + postId);
  }

  getPostComment(postId: string) {
    return this.http.post<any>(this.getPostCommentUrl, {
      postId: postId
    });
  }

  createComment(comment: string, postId: string) {
    return this.http.post<any>(this.createCommentUrl, {
      comment: comment,
      id: postId,
    }).subscribe();
  }

  sendDisplayPostUpdate() {
    this.displayPostUpdate.next(true);
  }

  receiveDisplayPostUpdate(): Observable<boolean> {
    return this.displayPostUpdate.asObservable();
  }

  sendDeletePostUpdate(posts: string) {
    this.deletePostUpdate.next(posts);
  }

  receiveDeletePostUpdate(): Observable<string> {
    return this.deletePostUpdate.asObservable();
  }
}
