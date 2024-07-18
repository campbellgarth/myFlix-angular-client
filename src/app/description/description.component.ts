import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
/**
 * Component responsible for displaying movie description information in a dialog.
 */
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  /**
   * Creates an instance of DescriptionComponent.
   * @param dialogRef Reference to the dialog opened with this component
   * @param data Data injected into the dialog, containing the movie description
   */
  constructor(
    public dialogRef: MatDialogRef<DescriptionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { description: string }
  ) {}
  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {}
}
