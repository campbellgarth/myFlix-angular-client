import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/**
 * Component responsible for displaying the add favorite movie dialog.
 */
@Component({
  selector: 'app-add-fav-movie',
  templateUrl: './add-fav-movie.component.html',
  styleUrls: ['./add-fav-movie.component.scss'],
})
export class AddFavMovieComponent {
  /**
   * Creates an instance of AddFavMovieComponent.
   * @param dialogRef Reference to the dialog opened with this component
   * @param data Data injected into the dialog, containing the movie information
   */
  constructor(
    public dialogRef: MatDialogRef<AddFavMovieComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: any }
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
