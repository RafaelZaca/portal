import { Component, OnInit } from '@angular/core';
import { SeparacaoService, SeparacaoInfo } from '../../Services/Separacao.service';

@Component({
  selector: 'app-separacao',
  templateUrl: './separacao.component.html',
  styleUrl: './separacao.component.scss'
})
export class SeparacaoComponent implements OnInit {
  displayedColumns: string[] = [
    'sku',
    'quantidadeEsperada',
    'quantidadeInduzida',
    'percentualInd',
    'quantidadeRecebida',
    'percentualRec',
    'tempoUltimaCaixa',
    'descricao',
    'quantidadeRejeitoFinal',
    'quantidadeRejeitoNoRead',
    'pendente'
  ];

  separacaoInfo: SeparacaoInfo | null = null;

  constructor(private separacaoService: SeparacaoService) { }

  ngOnInit(): void {
    this.loadSeparacaoData();
  }

  loadSeparacaoData(): void {
    this.separacaoService.getSeparacaoData()
      .subscribe(data => {
        this.separacaoInfo = data;
      });
  }

  getRejeitoNoReadTotal(): number {
    return this.separacaoInfo?.rejeitoNoRead || 0;
  }

  getPendentesTotal(): number {
    return this.separacaoInfo?.pendente || 0;
  }
}
