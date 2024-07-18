import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFavMovieComponent } from '../add-fav-movie/add-fav-movie.component';
import { RemoveFavMovieComponent } from '../remove-fav-movie/remove-fav-movie.component';
import { MyflixService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() favoriteMovies: any[] = [];
  favoriteMovieTitles: any[] = []; // New array to store favorite movie details

  @Input() userData: any = {
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
  };
  user: any = {};

  constructor(
    public dialog: MatDialog,
    public fetchApiData: MyflixService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe(
        (result: any) => {
          this.userData.username = result.Username;
          this.userData.email = result.Email;
          this.userData.birthday = result.Birthday;
          this.favoriteMovies = result.FavoriteMovie || []; // Correct property name
          this.loadFavoriteMovies();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((allMovies: any[]) => {
      this.favoriteMovieTitles = allMovies.filter((movie) =>
        this.favoriteMovies.includes(movie._id)
      );
    });
  }

  openRemoveFavMovieComponent(movie: any): void {
    this.dialog.open(RemoveFavMovieComponent, {
      width: '500px',
      data: { movie },
    });
  }

  isFavorite(movie: any): boolean {
    // Checks if a movie's ID is in the favoriteMovies array
    return this.favoriteMovies.includes(movie._id);
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
      this.loadFavoriteMovies(); // Refresh favorite movies
    });
  }

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
