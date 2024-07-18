import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/**
 * Component responsible for displaying genre information in a dialog.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  /**
   * Creates an instance of GenreComponent.
   * @param dialogRef Reference to the dialog opened with this component
   * @param data Data injected into the dialog, containing genre information
   */
  constructor(
    public dialogRef: MatDialogRef<GenreComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { genre: { Name: string; Description: string } } //extracts genre data passed from movie card component
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
