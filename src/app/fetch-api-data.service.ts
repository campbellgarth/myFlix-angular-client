/**
 *MyflixService provides methods to interact with the Myflix API.
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixmovies-72c1f6d2bace.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class MyflixService {
  /**
   * Injects the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http.
   * @param http - The HttpClient instance.
   */
  constructor(private http: HttpClient) {}
  /**
   * Makes the API call for the user registration endpoint.
   * @param userDetails - The details of the user to register.
   * @returns An Observable of the HTTP response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    /**
     * Makes the API call for the user login endpoint.
     * @param userDetails - The details of the user to login.
     * @returns An Observable of the HTTP response.
     */

    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    /**
     * Makes the API call for the get all movies endpoint
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getOneMovie(movieTitle: any): Observable<any> {
    /**
     * Makes the API call for the get one movie by title endpoint.
     * @param movieTitle - The title of the requested movie.
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getDirector(directorName: any): Observable<any> {
    /**
     * Makes the API call for the get director by name endpoint.
     * @param directorName - The name of the requested director.
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getGenre(genreName: any): Observable<any> {
    /**
     * Makes the API call for the get genre by name endpoint.
     * @param genreName - The name of the requested genre.
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getUser(userName: any): Observable<any> {
    /**
     * Makes the API call for the get user by username endpoint.
     * @param userName - The username of the requested user.
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getFavoriteMovies(userName: any, favoriteMovies: any): Observable<any> {
    /**
     * Makes the API call for the get user's favorite movies endpoint.
     * @param userName - The username of the requested user.
     * @param favoriteMovies - The list of favorite movies for that user
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName + '/' + favoriteMovies, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  addFavoriteMovie(movie: any): Observable<any> {
    /**
     * Makes the API call for the add favorite movie endpoint.
     * @param movie - The movie to favorite.
     * @returns An Observable of the HTTP response.
     */
    const userName = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users/' + userName + '/movie/' + movie._id, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteFavoriteMovie(movie: any): Observable<any> {
    /**
     * Makes the API call for the remove favorite movie endpoint.
     * @param movie - The movie to remove from favorites.
     * @returns An Observable of the HTTP response.
     */
    const userName = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movie/' + movie._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  deleteUser(userName: any): Observable<any> {
    /**
     * Makes the API call for the delete user by username endpoint.
     * @param userName - The username of the requested user to delete.
     * @returns An Observable of the HTTP response.
     */
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  updateUser(userData: any): Observable<any> {
    /**
     * Makes the API call for the update user endpoint.
     * @param userData - The new data for the user.
     * @returns An Observable of the HTTP response.
     */
    //api call for update a user endpoint
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Extracts response data from the HTTP response.
   * @param res - The HTTP response
   * @returns The response body or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  /**
   * Handles errors
   * @param error - The HTTP error response.
   * @returns An observable error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
