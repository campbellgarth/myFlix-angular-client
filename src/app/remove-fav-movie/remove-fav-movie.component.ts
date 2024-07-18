import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/**
 * Component for the dialog to confirm the removal of a favorite movie.
 */
@Component({
  selector: 'app-remove-fav-movie',
  templateUrl: './remove-fav-movie.component.html',
  styleUrls: ['./remove-fav-movie.component.scss'],
})
export class RemoveFavMovieComponent {
  /**
   * Creates an instance of RemoveFavMovieComponent.
   * @param dialogRef - Reference to the dialog opened.
   * @param data - Data (the movie to be removed) passed to the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<RemoveFavMovieComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: any }
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
