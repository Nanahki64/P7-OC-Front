import { Component, OnInit } from '@angular/core';
import { DisplayPostsService } from '../../service/display-posts.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // Déclaration du tableau d'objet posts.
  posts: Array<Object> = [];

  constructor(private displayPostService: DisplayPostsService) { }

  ngOnInit(): void {
    // Permet de récupérer les posts.
    this.displayPostService.getPosts().subscribe((postsData) => {
      this.posts = postsData.posts;
    });
    // Permet de rafraichir dynamiquement les posts lors d'une création.
    this.displayPostService.receiveDisplayPostUpdate().subscribe((displayPostToUpdate) => {
      if(displayPostToUpdate) {
        this.displayPostService.getPosts().subscribe((post) => {
          this.posts = post.posts;
        });
      }
    });
    // Permet de rafraichir dynamiquement les posts lors d'une suppression.
    this.displayPostService.receiveDeletePostUpdate().subscribe((displayPostToUpdate) => {
      this.displayPostService.deletePost(displayPostToUpdate).subscribe(() => {
        this.displayPostService.getPosts().subscribe((post) => {
          this.posts = post.posts;
        });
      });
    });
  }
}
