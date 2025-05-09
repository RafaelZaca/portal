
import { Component, OnInit } from '@angular/core';
import { RejeitoService, RejeitoItem } from '../../Services/OverViewRejeito.service';

@Component({
  selector: 'app-overview-rejeito',
  templateUrl: './overview-rejeito.component.html',
  styleUrl: './overview-rejeito.component.scss'
})
export class OverviewRejeitoComponent implements OnInit {
  displayedColumns: string[] = [
    'sku',
    'wave',
    'totalRejeito',
    'rampa01',
    'rampa02',
    'rampa03',
    'rampa04',
    'rampa05',
    'rampa06',
    'rampa07',
    'rampa08',
    'rampa09',
    'rampa10',
    'rampa11',
    'rampa12',
    'naoPrevisto',
    'excesso'
  ];

  rejeitoItems: RejeitoItem[] = [];

  constructor(private rejeitoService: RejeitoService) { }

  ngOnInit(): void {
    this.loadRejeitoData();
  }

  loadRejeitoData(): void {
    this.rejeitoService.getRejeitoData()
      .subscribe(data => {
        this.rejeitoItems = data;
      });
  }

  getTotalRejeitos(): number {
    return this.rejeitoItems.reduce((acc, item) => acc + item.totalRejeito, 0);
  }

  getRampaTotalRejeitos(rampaNumber: number): number {
    const rampaKey = `rampa${String(rampaNumber).padStart(2, '0')}` as keyof RejeitoItem;
    return this.rejeitoItems.reduce((acc, item) => acc + (item[rampaKey] as number), 0);
  }

  getTotalNaoPrevisto(): number {
    return this.rejeitoItems.reduce((acc, item) => acc + item.naoPrevisto, 0);
  }

  getTotalExcesso(): number {
    return this.rejeitoItems.reduce((acc, item) => acc + item.excesso, 0);
  }
}
