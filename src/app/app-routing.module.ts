import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { PostCommentComponent } from './shared/components/post-comment/post-comment.component';
import { ModifyingPostComponent } from './shared/components/modifying-post/modifying-post.component';

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
