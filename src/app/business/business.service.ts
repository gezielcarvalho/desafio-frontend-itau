import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBusiness } from './business.model';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiUrl = environment.apiUrl + '/businesses';

  constructor(private http: HttpClient) {}

  getBusinesses(): Observable<IBusiness[]> {
    return this.http
      .get<IBusiness[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getBusiness(id: string): Observable<IBusiness> {
    return this.http
      .get<IBusiness>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBusiness(business: IBusiness): Observable<IBusiness> {
    return this.http
      .post<IBusiness>(this.apiUrl, business)
      .pipe(catchError(this.handleError));
  }

  updateBusiness(id: string, business: IBusiness): Observable<IBusiness> {
    return this.http
      .put<IBusiness>(`${this.apiUrl}/${id}`, business)
      .pipe(catchError(this.handleError));
  }

  deleteBusiness(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
