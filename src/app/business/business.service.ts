import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBusiness } from './business.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiUrl = 'http://api-url.com/businesses';

  constructor(private http: HttpClient) {}

  getBusinesses(): Observable<IBusiness[]> {
    return this.http.get<IBusiness[]>(this.apiUrl);
  }

  getBusiness(id: number): Observable<IBusiness> {
    return this.http.get<IBusiness>(`${this.apiUrl}/${id}`);
  }
}
