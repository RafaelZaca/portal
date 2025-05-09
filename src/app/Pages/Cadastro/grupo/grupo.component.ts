import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrupoService, Grupo, Permissao } from '../../Services/Grupo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.scss',
  animations: [
    trigger('slideAnimation', [
      state('lista', style({
        transform: 'translateX(0)'
      })),
      state('edicao', style({
        transform: 'translateX(0)'
      })),
      transition('lista => edicao', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out')
      ]),
      transition('edicao => lista', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class GrupoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'permissoes', 'usuariosVinculados', 'ativo', 'acoes'];
  grupos: Grupo[] = [];
  permissoes: Permissao[] = [];
  form: FormGroup;
  modoEdicao = false;
  slideState = 'lista';
  grupoEmEdicao: Grupo | null = null;

  constructor(
    private grupoService: GrupoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      permissoes: [[], [Validators.required]],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.grupoService.getGrupos().subscribe((grupos: Grupo[]) => {
      this.grupos = grupos;
    });

    this.grupoService.getPermissoes().subscribe((permissoes: Permissao[]) => {
      this.permissoes = permissoes;
    });
  }

  novoGrupo(): void {
    this.form.reset({ ativo: true });
    this.grupoEmEdicao = null;
    this.abrirEdicao();
  }

  editarGrupo(grupo: Grupo): void {
    this.grupoEmEdicao = grupo;
    this.form.patchValue(grupo);
    this.abrirEdicao();
  }

  abrirEdicao(): void {
    this.modoEdicao = true;
    this.slideState = 'edicao';
  }

  voltarLista(): void {
    this.modoEdicao = false;
    this.slideState = 'lista';
    this.form.reset();
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    const grupo = this.form.value;
    this.grupoService.salvarGrupo(grupo).subscribe({
      next: () => {
        this.snackBar.open('Grupo salvo com sucesso', 'Fechar', {
          duration: 3000
        });
        this.carregarDados();
        this.voltarLista();
      },
      error: () => {
        this.snackBar.open('Erro ao salvar grupo', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
      this.grupoService.excluirGrupo(id).subscribe({
        next: () => {
          this.snackBar.open('Grupo excluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.carregarDados();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir grupo', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  getPermissoesDisplay(permissoes: string[]): string {
    return permissoes
      .map(p => this.permissoes.find(perm => perm.id === p)?.nome)
      .filter(Boolean)
      .join(', ');
  }

  getErrorMessage(field: string): string {
    if (this.form.get(field)!.hasError('required')) {
      return 'Campo obrigatório';
    }
    return '';
  }
}
