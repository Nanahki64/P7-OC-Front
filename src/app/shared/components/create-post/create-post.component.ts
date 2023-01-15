import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePostService } from 'src/app/shared/service/create-post.service'
import { DisplayPostsService } from '../../service/display-posts.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;
  submitted = false;
  error = '';
  imageSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private createPostService: CreatePostService, private displayPostService: DisplayPostsService, private matDialogRef: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
    // initialisation du formulaire postForm.
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: [''],
    });
  }

  /**
   * Permet de choisir une image et de passer la valeur à postForm.
   */
  onFileSelect(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.postForm.get('image')?.setValue(file);
      this.imageSubmitted = true;
    }
  }

  /**
   * Permet d'envoyer le formulaire au back ou de renvoyer une erreur.
   */
  onSubmit() {
    this.submitted = true;
    if(this.postForm.invalid) {
      this.error = 'Un titre et un contenue ou une image sont requis'
    }
    try {
    this.createPostService.createPost(this.postForm).subscribe(() => {
      this.displayPostService.sendDisplayPostUpdate();
      this.onModalClose();
    });
    } catch {
      this.error = 'Une erreur est survenue.';
    }
  }

  /**
   * Permet de fermer la fenêtre modal.
   */
  onModalClose() {
    this.matDialogRef.close();
  }

}
