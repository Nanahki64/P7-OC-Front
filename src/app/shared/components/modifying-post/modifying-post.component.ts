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
  isChecked: boolean = false;

  constructor(private formBuilder: FormBuilder, private modifyingPostService: ModifyingPostService, private displayPostService: DisplayPostsService, private matDialogRef: MatDialogRef<ModifyingPostComponent>, @Inject(MAT_DIALOG_DATA) public postId: any) { }
  
  // Initialisation du formulaire postForm.
  postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    image: [''],
    delete: ['']
  });

  ngOnInit(): void {
    // Permet de récupérer les données d'un post.
    this.displayPostService.getOnePost(this.postId).subscribe((postData) => {
      this.relatePostData(postData);
    });
  }

  /**
   * Permet d'afficher les données du post dans le formulaire.
   */
  relatePostData(postData: any) {
    this.imageUrl = postData.post.imageUrl;
    this.postForm = this.formBuilder.group({
      title: [postData.post.title, [Validators.required]],
      content: [postData.post.content, [Validators.required]],
      image: [postData.post.imageUrl],
      delete: ['']
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
   * Écoute le changement d'état de la checkbox et donne la valeur au formulaire.
   */
  onChange(e: any) {
    this.postForm.get('delete')?.setValue(e.checked);
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
      this.modifyingPostService.modifyPost(this.postForm, this.postId).subscribe(() => {
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
