import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { ModifyingPostComponent } from './shared/modifying-post/modifying-post.component';
import { PostCommentComponent } from './shared/post-comment/post-comment.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'post-comment/:id', component: PostCommentComponent },
  { path: 'modify-post/:id', component: ModifyingPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
