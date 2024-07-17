import { Component, OnInit, ViewChild } from '@angular/core';
import { MyflixService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionComponent } from '../description/description.component';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  @ViewChild(ProfileComponent) profileComponent!: ProfileComponent; //gets a reference to profile component so that it can call methods and properties of it

  constructor(public fetchApiData: MyflixService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
    this.loadFavoriteMovies();
  }

  onFavoriteChanged(): void {
    //reloads favorited movies if the list changes
    this.loadFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openDirectorDialog(director: { Name: string; Bio: string }): void {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      data: { director },
    });
  }

  openGenreDialog(genre: { Name: string; Description: string }): void {
    this.dialog.open(GenreComponent, {
      width: '500px',
      data: { genre },
    });
  }

  openDescriptionDialog(description: { Description: string }): void {
    this.dialog.open(DescriptionComponent, {
      width: '500px',
      data: { description },
    });
  }

  openAddFavMovieDialog(movie: any): void {
    this.dialog.open(AddFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  openRemoveFavMovieDialog(movie: any): void {
    this.dialog.open(RemoveFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  loadFavoriteMovies(): void {
    this.favoriteMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  addToFavorites(movie: any): void {
    if (!this.isFavorite(movie)) {
      this.fetchApiData.addFavoriteMovie(movie).subscribe((res: any) => {
        //if a movie isn't favorited, push to array and set to local storage
        this.favoriteMovies.push(movie);
        localStorage.setItem(
          'favoriteMovies',
          JSON.stringify(this.favoriteMovies)
        );
      });
    } else {
      console.log(`${movie.Title} is already in your favorites!`);
    }
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
