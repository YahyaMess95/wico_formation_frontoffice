import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private http: HttpClient) {}
  private activeSectionSubject = new Subject<string>();
  activeSection$ = this.activeSectionSubject.asObservable();

  setActiveSection(section: string) {
    this.activeSectionSubject.next(section);
  }

  getAllSessions(page: number, pageSize: number) {
    const url = `${environment.SessionsUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }
  getOneFormation(formationId: any) {
    const url = environment.oneFormationUrl + `/${formationId}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  getPhoto(fileId: string): Observable<any> {
    // Check if FileReader is available (meaning the code is running in a browser environment)
    if (typeof FileReader !== 'undefined') {
      return new Observable((observer) => {
        this.http
          .get(environment.photoUrl + `/${fileId}`, {
            responseType: 'blob',
          })
          .subscribe(
            (blob: Blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                observer.next(reader.result);
                observer.complete();
              };
              reader.onerror = (error) => {
                observer.error(error);
              };
              reader.readAsDataURL(blob);
            },
            (error) => {
              observer.error(error);
            }
          );
      });
    } else {
      // If FileReader is not available, handle the error gracefully
      return throwError('FileReader is not available in this environment');
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof Error) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      errorMessage = `Error: ${error.error}`;
    } else if (error.error && error.error.message) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
