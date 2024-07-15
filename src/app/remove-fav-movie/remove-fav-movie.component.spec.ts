import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFavMovieComponent } from './remove-fav-movie.component';

describe('RemoveFavMovieComponent', () => {
  let component: RemoveFavMovieComponent;
  let fixture: ComponentFixture<RemoveFavMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveFavMovieComponent]
    });
    fixture = TestBed.createComponent(RemoveFavMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
