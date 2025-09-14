import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly http = inject(HttpClient);

  getBrands(page: number): Observable<any> {
    return this.http.get(`${environment.baseURL}brands?page=${page}`);
  }


  getBrand(ID: string): Observable<any> {
    return this.http.get(`${environment.baseURL}brands/${ID}`);
  }
}