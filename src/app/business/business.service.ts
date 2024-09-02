import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBusiness } from './business.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiUrl = environment.apiUrl + '/businesses';

  constructor(private http: HttpClient) {}

  getBusinesses(): Observable<IBusiness[]> {
    return this.http.get<IBusiness[]>(this.apiUrl);
  }

  getBusiness(id: number): Observable<IBusiness> {
    return this.http.get<IBusiness>(`${this.apiUrl}/${id}`);
  }

  createBusiness(business: IBusiness): Observable<IBusiness> {
    return this.http.post<IBusiness>(this.apiUrl, business);
  }

  updateBusiness(id: number, business: IBusiness): Observable<IBusiness> {
    return this.http.put<IBusiness>(`${this.apiUrl}/${id}`, business);
  }

  deleteBusiness(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
