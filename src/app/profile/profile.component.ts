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
  @Output() favoriteChanged = new EventEmitter<void>(); //listens for changes to favoriteMovies

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
    this.loadFavoriteMovies();
    this.fetchUserData();
  }

  fetchUserData(): void {
    const username = localStorage.getItem('username');
    this.fetchApiData.getUser(username).subscribe((result: any) => {
      this.userData.username = result.Username;
      this.userData.email = result.Email;
      this.userData.birthday = result.Birthday;
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
