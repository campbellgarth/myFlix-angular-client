import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavMovieComponent } from './add-fav-movie.component';

describe('AddFavMovieComponent', () => {
  let component: AddFavMovieComponent;
  let fixture: ComponentFixture<AddFavMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFavMovieComponent]
    });
    fixture = TestBed.createComponent(AddFavMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
