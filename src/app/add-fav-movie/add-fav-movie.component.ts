import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-fav-movie',
  templateUrl: './add-fav-movie.component.html',
  styleUrls: ['./add-fav-movie.component.scss'],
})
export class AddFavMovieComponent {
  constructor(
    public dialogRef: MatDialogRef<AddFavMovieComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: any }
  ) {}

  ngOnInit(): void {}
}
