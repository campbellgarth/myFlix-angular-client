import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { MyflixService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
//this import is used to redirect users to the movie page after login
import { Router } from '@angular/router';
/**
 * Component for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * User data to be bound to the form.
   * @type {{ Username: string, Password: string, Email: string, Birthday: string }}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - Service for API calls.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service for displaying notifications.
   * @param router - Service for navigating the user to different pages.
   */
  constructor(
    public fetchApiData: MyflixService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Sends the form inputs to the backend for user login.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        this.fetchApiData.getUser(result.user.Username).subscribe({
          next: (userData) => {
            // Store additional user data in localStorage if needed
            localStorage.setItem('username', userData.Username);
            localStorage.setItem('email', userData.Email);
            localStorage.setItem('birthday', userData.Birthday);

            this.dialogRef.close(); // This will close the modal on success!
            this.snackBar.open('Successfully logged in', 'OK', {
              duration: 2000,
            });
            this.router.navigate(['movies']);
          },
          error: (error) => {
            console.error('Error fetching user data:', error);
            this.snackBar.open('Error fetching user data', 'OK', {
              duration: 2000,
            });
          },
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
