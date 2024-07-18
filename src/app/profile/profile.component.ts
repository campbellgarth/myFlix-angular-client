import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';
import { MyflixService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Component for the user's profile page.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  /**
   * Array to store favorite movies as movie IDs.
   */
  @Input() favoriteMovies: any[] = [];
  /**
   * Array to store favorite movie details as movie objects.
   */
  favoriteMovieTitles: any[] = [];
  /**
   * User data object containing username, password, email, and date of birth.
   */
  @Input() userData: any = {
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
  };
  /**
   * User data object.
   */
  user: any = {};
  /**
   * Creates an instance of UserLoginFormComponent.
   * @param dialog - Injected MatDialog service
   * @param fetchApiData - Service for API calls.
   * @param snackBar - Service for displaying notifications.
   */
  constructor(
    public dialog: MatDialog,
    public fetchApiData: MyflixService,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    this.fetchUserData();
  }
  /**
   * Fetches user data from the API.
   */
  fetchUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe(
        (result: any) => {
          this.userData.username = result.Username;
          this.userData.email = result.Email;
          this.userData.birthday = result.Birthday;
          this.favoriteMovies = result.FavoriteMovie || [];
          this.loadFavoriteMovies();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  /**
   * Loads favorite movies from the by getting all movies and then filtering down to those in the favoriteMovies user list
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((allMovies: any[]) => {
      this.favoriteMovieTitles = allMovies.filter(
        (
          movie //filters all movies by those in favoriteMovies but keeps them as objects
        ) => this.favoriteMovies.includes(movie._id)
      );
    });
  }
  /**
   * Opens the dialog to remove a favorite movie.
   * @param movie - The movie to be removed.
   */
  openRemoveFavMovieComponent(movie: any): void {
    this.dialog.open(RemoveFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  /**
   * Checks if a movie ID is in the user's favorites.
   * @param movie - The movie to check.
   * @returns true if the movie is a favorite, false otherwise.
   */
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }
  /**
   * Removes a movie from the user's favorites.
   * @param movie - The movie to be removed.
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
      this.loadFavoriteMovies(); // Refresh favorite movies
    });
  }
  /**
   * Submits the updated user profile to the API.
   */
  onSubmit(): void {
    const updatedUser = {
      Username: this.userData.username,
      Password: this.userData.password,
      Email: this.userData.email,
      Birthday: this.userData.birthday,
    };

    this.fetchApiData.updateUser(updatedUser).subscribe({
      next: (result) => {
        localStorage.setItem('username', result.Username);
        localStorage.setItem('email', result.Email);
        localStorage.setItem('birthday', result.Birthday);

        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('Error updating user profile:', error);
        this.snackBar.open('Error updating profile', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
