// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { MyflixService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Component for the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User data to be bound to the form.
   * @type {{ Username: string, Password: string, Email: string, Birthday: string }}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - Service for API calls.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service for displaying notifications.
   */
  constructor(
    public fetchApiData: MyflixService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Sends the form inputs to the backend for user registration.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('Successfully registered', 'OK', {
          duration: 2000,
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
