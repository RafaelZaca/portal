import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverViewWaveService, WaveDashboardData } from '../../Services/OverViewWave.services';

@Component({
  selector: 'app-overview-wave',
  templateUrl: './overview-wave.component.html',
  styleUrl: './overview-wave.component.scss'
})
export class OverviewWaveComponent implements OnInit, OnDestroy {
  data!: WaveDashboardData;
  private subscription: Subscription = new Subscription();

  constructor(private dashboardService: OverViewWaveService) { }

  ngOnInit() {
    this.subscription = this.dashboardService.getDashboardData()
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProgressWidth(separated: number, total: number): string {
    return `${(separated / total) * 100}%`;
  }
}
