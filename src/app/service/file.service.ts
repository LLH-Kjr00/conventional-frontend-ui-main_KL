import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  fileExists(url: string): Observable<boolean> {
    return this.http.get(`${url}`, {observe: 'response', responseType: 'text' } )
      .pipe(
        map(response => {
          return response.headers.get('Content-Type') != 'text/html';

        }),
        catchError(error => {
          console.error(error)
          return of(false);
        })
      );
  }
}
