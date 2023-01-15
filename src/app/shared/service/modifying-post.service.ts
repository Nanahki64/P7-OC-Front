import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModifyingPostService {
  
  // déclaration des routes du backend.
  private modifyPostUrl = environment.apiUrl + '/api/post/'; 

  constructor(private http: HttpClient) { }
  
  /**
   * Permet de modifier un post.
   */
  modifyPost(form: FormGroup, postId: string) {
    let formdata = new FormData();
    formdata.append('image' ,form.get('image')!.value);
    formdata.append('title', form.get('title')!.value);
    formdata.append('content', form.get('content')!.value);
    formdata.append('delete', form.get('delete')!.value);
    
    return this.http.put<any>(this.modifyPostUrl + postId, formdata);
  }
}
