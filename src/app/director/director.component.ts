import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent {
  constructor(
    public dialogRef: MatDialogRef<DirectorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { director: { Name: string; Bio: string } } //extracts director data passed from movie card component
  ) {}

  ngOnInit(): void {}
}
