import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  private getPostCommentUrl = environment.apiUrl + '/api/comment/post';
  private createCommentUrl = environment.apiUrl + '/api/comment/';

  constructor(private http: HttpClient) { }

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
}
