import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { MyflixService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
//this import is used to redirect users to the movie page after login
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: MyflixService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log(result);

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
