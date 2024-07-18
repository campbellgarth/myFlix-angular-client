import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/**
 * Component responsible for displaying director information in a dialog.
 */

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent {
  /**
   * Creates an instance of DirectorComponent.
   * @param dialogRef Reference to the dialog opened with this component.
   * @param data Data injected into the dialog, containing director information.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { director: { Name: string; Bio: string } } //extracts director data passed from movie card component
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
