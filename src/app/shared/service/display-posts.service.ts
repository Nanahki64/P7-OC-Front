import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisplayPostsService {
  private retrievePostUrl = environment.apiUrl + '/api/post';
  private retrieveLikesUrl = environment.apiUrl + '/api/likes/';
  private addLikeUrl = environment.apiUrl + '/api/likes/';
  private deleteLikeUrl = environment.apiUrl + '/api/likes/';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>(this.retrievePostUrl);
  }

  getLikes(id: string) {
    return this.http.get<any>(this.retrieveLikesUrl + id);
  }

  addLike(postId: string, likeType: number) {
    return this.http.post<any>(this.addLikeUrl, {
      postId: postId,
      likeType: likeType
    }).subscribe();
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
    return this.http.delete(this.deleteLikeUrl, options).subscribe();
  }
}
