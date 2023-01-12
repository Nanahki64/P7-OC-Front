import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModifyingPostService {
  private modifyPostUrl = environment.apiUrl + '/api/post/'; 

  constructor(private http: HttpClient) { }
  modifyPost(form: FormGroup, postId: string) {
    let formdata = new FormData();
    formdata.append('image' ,form.get('image')!.value);
    formdata.append('title', form.get('title')!.value);
    formdata.append('content', form.get('content')!.value);
    
    return this.http.put<any>(this.modifyPostUrl + postId, formdata);
  }
}
