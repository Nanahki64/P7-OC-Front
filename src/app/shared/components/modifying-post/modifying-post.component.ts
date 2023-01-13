import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModifyingPostService } from '../../service/modifying-post.service';
import { DisplayPostsService } from '../../service/display-posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modifying-post',
  templateUrl: './modifying-post.component.html',
  styleUrls: ['./modifying-post.component.scss']
})
export class ModifyingPostComponent implements OnInit {
  
  submitted = false;
  error = '';
  post: any;
  imageUrl!: string;
  imageSubmitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private modifyingPostService: ModifyingPostService, private displayPostService: DisplayPostsService, private matDialogRef: MatDialogRef<ModifyingPostComponent>, @Inject(MAT_DIALOG_DATA) public postId: any) { }
  
  postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    image: [''],
  });

  ngOnInit(): void {
    this.displayPostService.getOnePost(this.postId).subscribe((data) => {
      this.relatePostData(data);
    });
  }

  relatePostData(data: any) {
    this.imageUrl = data.post.imageUrl;
    this.postForm = this.formBuilder.group({
      title: [data.post.title, [Validators.required]],
      content: [data.post.content, [Validators.required]],
      image: [data.post.imageUrl],
    });
  }
  
  onFileSelect(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.postForm.get('image')?.setValue(file);
      this.imageSubmitted = true;
    }
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.postForm.invalid) {
      this.error = 'Un titre et un contenue ou une image sont requis'
    }
    try {
      this.modifyingPostService.modifyPost(this.postForm, this.postId).subscribe(() => {
        this.displayPostService.sendDisplayPostUpdate();
        this.onModalClose();
      });
    } catch {
      this.error = 'Une erreur est survenue.';
    }
  }

  onModalClose() {
    this.matDialogRef.close();
  }
  
}
