import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { CreatePostComponent } from './shared/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayPostsComponent } from './shared/display-posts/display-posts.component';
import { PostCommentComponent } from './shared/post-comment/post-comment.component';
import { ModifyingPostComponent } from './shared/modifying-post/modifying-post.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePostDialogComponent } from './shared/create-post-dialog/create-post-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreatePostComponent,
    DisplayPostsComponent,
    PostCommentComponent,
    ModifyingPostComponent,
    CreatePostDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NoopAnimationsModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
