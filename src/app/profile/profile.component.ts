import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() favoriteMovies: any[] = [];
  @Output() favoriteChanged = new EventEmitter<void>(); //listens for changes to favoriteMovies

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    this.favoriteMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  }

  openAddFavMovieComponent(movie: any): void {
    this.dialog.open(AddFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  openRemoveFavMovieComponent(movie: any): void {
    this.dialog.open(RemoveFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  isFavorite(movie: any): boolean {
    //checks if a movie is a favoriteMovie
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  addToFavorites(movie: any): void {
    if (!this.isFavorite(movie)) {
      //if a movie isn't favorited, push to array and set to local storage
      this.favoriteMovies.push(movie);
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies)
      );
      this.favoriteChanged.emit(); //trigger the listener that favoriteMovies has changed
    } else {
      console.log(`${movie.Title} is already in your favorites!`);
    }
  }

  removeFromFavorites(movie: any): void {
    //filter out chosen movie from favoriteMovies array and reset local storage
    this.favoriteMovies = this.favoriteMovies.filter(
      (favMovie) => favMovie._id !== movie._id
    );
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    this.favoriteChanged.emit(); //trigger listener that favoriteMovies has changed
  }
}
