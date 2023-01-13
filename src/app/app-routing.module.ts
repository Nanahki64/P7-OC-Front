import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { PostCommentComponent } from './shared/components/post-comment/post-comment.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'post-comment/:id', component: PostCommentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
