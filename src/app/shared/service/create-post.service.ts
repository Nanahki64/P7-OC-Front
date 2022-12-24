import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  private createPostUrl = environment.apiUrl + '/api/post';

  constructor(private http: HttpClient) { }

  createPost(form: FormGroup) {
    let formdata = new FormData();
    formdata.append('image' ,form.get('image')?.value);
    
    return this.http.post<any>(this.createPostUrl, {
      title: form.controls['title'].value,
      content: form.controls['content'].value,
      image: formdata.get('image')
    });
  }
}
