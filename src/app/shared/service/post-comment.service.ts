import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  private getPostCommentUrl = environment.apiUrl + '/api/comment/post';
  private createCommentUrl = environment.apiUrl + '/api/comment/';

  private updateCommentNumber = new Subject<boolean>();

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
    });
  }

  sendUpdateCommentNumber() {
    this.updateCommentNumber.next(true);
  }

  receiveUpdateCommentNumber(): Observable<boolean> {
    return this.updateCommentNumber.asObservable();
  }
}
