import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  favoriteMovies: string[] = []; // stores movie IDs
  @Input() userData: any = {
    username: '',
    favoriteMovies: [],
  };

  @ViewChild(ProfileComponent) profileComponent!: ProfileComponent; //gets a reference to profile component so that it can call methods and properties of it

  constructor(public fetchApiData: MyflixService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUserData().then(() => {
      this.loadFavoriteMovies();
    });
    this.getMovies();
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

  fetchUserData(): Promise<void> {
    //does not set favorite movies until user data is loaded
    return new Promise<void>((resolve, reject) => {
      const username = localStorage.getItem('username');
      if (username) {
        this.fetchApiData.getUser(username).subscribe(
          (result: any) => {
            this.userData.favoriteMovies = result.FavoriteMovie || []; // Correct property name
            localStorage.setItem(
              'favoriteMovies',
              JSON.stringify(this.userData.favoriteMovies)
            );
            resolve();
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
      } else {
        resolve(); // In case there is no username in localStorage
      }
    });
  }

  loadFavoriteMovies(): void {
    this.favoriteMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  }

  isFavorite(movie: any): boolean {
    // Checks if a movie's ID is in the favoriteMovies array
    return this.favoriteMovies.includes(movie._id);
  }

  addToFavorites(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie).subscribe((res: any) => {
      this.favoriteMovies.push(movie._id); // Save only the movie ID
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies)
      );
    });
  }

  removeFromFavorites(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie).subscribe((res: any) => {
      this.favoriteMovies = this.favoriteMovies.filter(
        (favMovieId) => favMovieId !== movie._id
      );
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies)
      );
    });
  }
}
