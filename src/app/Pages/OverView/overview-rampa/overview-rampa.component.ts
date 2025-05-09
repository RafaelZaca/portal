import { Component, OnInit } from '@angular/core';
import { RampaData, RampaOverviewService } from '../../Services/RampaOverview.service';

@Component({
  selector: 'app-overview-rampa',
  templateUrl: './overview-rampa.component.html',
  styleUrls: ['./overview-rampa.component.scss']
})
export class OverviewRampaComponent implements OnInit {
  rampas: RampaData[] = [];

  constructor(private rampaService: RampaOverviewService) { }

  ngOnInit() {
    this.rampaService.getRampasData()
      .subscribe({
        next: (data: RampaData[]) => {
          this.rampas = data;
        },
        error: (error: any) => {
          console.error('Erro ao carregar dados das rampas:', error);
        }
      });
  }

  // Helper method to calculate stroke-dasharray for the circle
  calculateStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 40; // radius is 40
    return `${(percentage / 100) * circumference} ${circumference}`;
  }
}
