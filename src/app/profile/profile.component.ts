import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';
import { MyflixService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() favoriteMovies: any[] = [];
  @Output() favoriteChanged = new EventEmitter<void>(); //listens for changes to favoriteMovies

  @Input() userData: any = {
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
  };
  user: any = {};

  constructor(public dialog: MatDialog, public fetchApiData: MyflixService) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
    this.fetchUserData();
  }

  fetchUserData(): void {
    const username = localStorage.getItem('username');
    this.fetchApiData.getUser(username).subscribe((result: any) => {
      result.username = result.user.username;
      result.email = result.user.email;
      result.dateOfBirth = result.user.dateOfBirth;
    });
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

  removeFromFavorites(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie).subscribe((res: any) => {
      this.favoriteMovies = this.favoriteMovies.filter(
        (favMovie) => favMovie._id !== movie._id
      );
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies)
      );
    });
  }
}
