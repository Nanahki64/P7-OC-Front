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

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreatePostComponent,
    DisplayPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NoopAnimationsModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
