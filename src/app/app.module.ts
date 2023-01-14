import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { CreatePostComponent } from './shared/components/create-post/create-post.component';
import { DisplayPostsComponent } from './shared/components/display-posts/display-posts.component';
import { PostCommentComponent } from './shared/components/post-comment/post-comment.component';
import { ModifyingPostComponent } from './shared/components/modifying-post/modifying-post.component';
import { CreatePostDialogComponent } from './shared/components/create-post-dialog/create-post-dialog.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreatePostComponent,
    DisplayPostsComponent,
    PostCommentComponent,
    ModifyingPostComponent,
    CreatePostDialogComponent,
    HeaderComponent
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
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
