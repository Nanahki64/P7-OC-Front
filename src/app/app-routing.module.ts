import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './shared/create-post/create-post.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { PostCommentComponent } from './shared/post-comment/post-comment.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'post-comment/:id', component: PostCommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
