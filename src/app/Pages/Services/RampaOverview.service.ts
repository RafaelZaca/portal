import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface RampaData {
  number: string;
  embarque: string;
  cliente: string;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class RampaOverviewService {
  private apiUrl = `${_config.apiUrl}rampaoverview`;

  constructor(private http: HttpClient) { }

  getRampasData(): Observable<RampaData[]> {
    return this.http.get<RampaData[]>(this.apiUrl);
  }
}
