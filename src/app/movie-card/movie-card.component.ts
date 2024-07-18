import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MyflixService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionComponent } from '../description/description.component';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';
import { ProfileComponent } from '../profile/profile.component';

/**
 * Component responsible for displaying and managing movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to store movie data.
   */
  movies: any[] = [];
  /**
   * Array to store favorite movie IDs.
   */
  favoriteMovies: string[] = [];
  /**
   * User data passed to the component.
   */
  @Input() userData: any = {
    username: '',
    favoriteMovies: [],
  };
  /**
   * Reference to the ProfileComponent.
   */
  @ViewChild(ProfileComponent) profileComponent!: ProfileComponent;

  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData Service for API calls related to movies.
   * @param dialog Angular Material Dialog service for opening dialogs.
   */
  constructor(public fetchApiData: MyflixService, public dialog: MatDialog) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    this.fetchUserData().then(() => {
      this.loadFavoriteMovies();
    });
    this.getMovies();
  }
  /**
   * Reloads favorite movies when the favorite list changes.
   */
  onFavoriteChanged(): void {
    this.loadFavoriteMovies();
  }

  /**
   * Retrieves all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * Opens a dialog displaying director details.
   * @param director The director data to display.
   */
  openDirectorDialog(director: { Name: string; Bio: string }): void {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      data: { director },
    });
  }

  /**
   * Opens a dialog displaying genre details.
   * @param genre The genre data to display.
   */
  openGenreDialog(genre: { Name: string; Description: string }): void {
    this.dialog.open(GenreComponent, {
      width: '500px',
      data: { genre },
    });
  }

  /**
   * Opens a dialog displaying movie description details.
   * @param description The description data to display.
   */
  openDescriptionDialog(description: { Description: string }): void {
    this.dialog.open(DescriptionComponent, {
      width: '500px',
      data: { description },
    });
  }

  /**
   * Opens a dialog displaying successful added movie to favorites.
   * @param movie The movie data to display.
   */
  openAddFavMovieDialog(movie: any): void {
    this.dialog.open(AddFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }
  /**
   * Opens a dialog displaying successful removed movie from favorites.
   * @param movie The movie data to display.
   */
  openRemoveFavMovieDialog(movie: any): void {
    this.dialog.open(RemoveFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }
  /**
   * Fetches user data from the API and updates favorite movies.
   * @returns Promise that resolves when user data is fetched
   */
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
  /**
   * Loads favorite movies from local storage.
   */
  loadFavoriteMovies(): void {
    this.favoriteMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
  }

  /**
   * Checks if a movie is in the favorite movies list.
   * @param movie Movie object to check
   * @returns True if the movie is in the favorite list, otherwise false
   */
  isFavorite(movie: any): boolean {
    // Checks if a movie's ID is in the favoriteMovies array
    return this.favoriteMovies.includes(movie._id);
  }
  /**
   * Adds a movie to the favorite movies list.
   * @param movie Movie object to add to favorites
   */
  addToFavorites(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie).subscribe((res: any) => {
      this.favoriteMovies.push(movie._id); // Save only the movie ID
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(this.favoriteMovies)
      );
    });
  }
  /**
   * Removes a movie from the favorite movies list.
   * @param movie Movie object to remove from favorites
   */
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
