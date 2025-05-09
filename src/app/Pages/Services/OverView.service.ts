import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface SeriesItem {
  name: string;
  value: number;
}

export interface ProductionData {
  name: string;
  series: SeriesItem[];
}

export interface SummaryData {
  processedBoxes: number;
  rejectedBoxes: number;
  operatingHours: number;
  stoppedHours: number;
  waves: number;
  shipments: number;
}

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private apiUrl = `${_config.apiUrl}overview`;

  constructor(private http: HttpClient) { }

  getProductionData(): Observable<ProductionData[]> {
    return this.http.get<ProductionData[]>(`${this.apiUrl}/production`);
  }

  getSummaryData(): Observable<SummaryData> {
    return this.http.get<SummaryData>(`${this.apiUrl}/summary`);
  }
}
