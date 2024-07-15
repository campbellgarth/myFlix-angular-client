import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-fav-movie',
  templateUrl: './remove-fav-movie.component.html',
  styleUrls: ['./remove-fav-movie.component.scss'],
})
export class RemoveFavMovieComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveFavMovieComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: any }
  ) {}

  ngOnInit(): void {}
}
