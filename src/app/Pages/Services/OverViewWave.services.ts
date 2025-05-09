import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface WaveDashboardData {
  allocatedBoxes: {
    total: number;
    separated: number;
    pending: number;
  };
  expectedSkus: {
    total: number;
    separated: number;
    pending: number;
  };
  allocatedShipments: number;
  activeOperators: number;
  shipmentTypes: Array<{
    type: string;
    value: string;
  }>;
  operatorActivities: Array<{
    type: string;
    value: string;
  }>;
  readRejection: {
    totalRejected: number;
    treated: number;
    pending: number;
  };
  excessRejection: {
    total: number;
    notExpected: number;
    excess: number;
    fullRamp: number;
  };
  productivity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OverViewWaveService {
  private apiUrl = `${_config.apiUrl}waveoverview`;
  private dashboardData = new BehaviorSubject<WaveDashboardData>({
    allocatedBoxes: {
      total: 0,
      separated: 0,
      pending: 0
    },
    expectedSkus: {
      total: 0,
      separated: 0,
      pending: 0
    },
    allocatedShipments: 0,
    activeOperators: 0,
    shipmentTypes: [],
    operatorActivities: [],
    readRejection: {
      totalRejected: 0,
      treated: 0,
      pending: 0
    },
    excessRejection: {
      total: 0,
      notExpected: 0,
      excess: 0,
      fullRamp: 0
    },
    productivity: 0
  });

  constructor(private http: HttpClient) {
    this.fetchDashboardData();
  }

  getDashboardData(): Observable<WaveDashboardData> {
    return this.dashboardData.asObservable();
  }

  updateDashboardData(newData: WaveDashboardData) {
    this.dashboardData.next(newData);
  }

  fetchDashboardData() {
    this.http.get<WaveDashboardData>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.dashboardData.next(data);
        },
        error: (error) => {
          console.error('Error fetching dashboard data:', error);
        }
      });
  }

  refreshDashboardData(): Observable<WaveDashboardData> {
    return this.http.get<WaveDashboardData>(this.apiUrl);
  }
}
