import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  
  // déclaration des routes du backend.
  private createPostUrl = environment.apiUrl + '/api/post';

  constructor(private http: HttpClient) { }

  /**
   * Permet de créer un post.
   */
  createPost(form: FormGroup) {
    let formdata = new FormData();
    formdata.append('image' ,form.get('image')!.value);
    formdata.append('title', form.get('title')!.value);
    formdata.append('content', form.get('content')!.value);
    
    return this.http.post<any>(this.createPostUrl, formdata);
  }
}
