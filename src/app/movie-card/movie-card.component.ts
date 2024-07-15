import { Component, OnInit } from '@angular/core';
import { MyflixService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionComponent } from '../description/description.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(public fetchApiData: MyflixService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  //passes director data onto director component
  openDirectorDialog(director: { Name: string; Bio: string }): void {
    //dialog opens when login button is clicked
    this.dialog.open(DirectorComponent, {
      // Assigning the dialog a width
      width: '500px',
      data: { director },
    });
  }
  //passes genre data onto genre component
  openGenreDialog(genre: { Name: string; Description: string }): void {
    //dialog opens when login button is clicked
    this.dialog.open(GenreComponent, {
      // Assigning the dialog a width
      width: '500px',
      data: { genre },
    });
  }
  //passes description data onto description component
  openDescriptionDialog(description: { Description: string }): void {
    //dialog opens when login button is clicked
    this.dialog.open(DescriptionComponent, {
      // Assigning the dialog a width
      width: '500px',
      data: { description },
    });
  }
}
