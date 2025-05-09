import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { OverviewService, ProductionData, SummaryData } from '../../Services/OverView.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  productionData: ProductionData[] = [];
  summary: SummaryData = {
    processedBoxes: 0,
    rejectedBoxes: 0,
    operatingHours: 0,
    stoppedHours: 0,
    waves: 0,
    shipments: 0
  };

  // Opções do gráfico
  view: [number, number] = [1200, 400];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Hora';
  yAxisLabel: string = 'Quantidade';
  timeline: boolean = false;
  autoScale: boolean = true;

  colorScheme: Color = {
    name: 'production',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2196F3', '#4CAF50', '#FF5722', '#9E9E9E']
  };

  public showSpinner: boolean = false;

  constructor(private overviewService: OverviewService) { }

  @HostListener('window:resize')
  onResize() {
    const container = document.querySelector('.chart-container');
    if (container) {
      this.view = [container.clientWidth, 400];
    }
  }

  async ngOnInit() {
    try {
      this.showSpinner = true;
      const container = document.querySelector('.chart-container');
      if (container) {
        this.view = [container.clientWidth, 400];
      }

      // Carregar dados
      this.overviewService.getProductionData().subscribe((data: ProductionData[]) => {
        this.productionData = data;
      });

      this.overviewService.getSummaryData().subscribe((data: any) => {
        this.summary = data;
      });
    }
    catch (error: any) {
      console.error('Erro ao carregar dados:', error);
    }
    finally {
      this.showSpinner = false;
    }
  }

  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

  onActivate(event: any): void {
    console.log('Activate', event);
  }

  onDeactivate(event: any): void {
    console.log('Deactivate', event);
  }
}
