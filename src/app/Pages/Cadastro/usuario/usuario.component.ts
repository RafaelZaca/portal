import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService, Usuario } from '../../Services/Usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
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
        animate('300ms ease-out')
      ]),
      transition('edicao => lista', [
        animate('300ms ease-out',
          style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'login', 'grupo', 'ativo', 'ultimoAcesso', 'acoes'];
  usuarios: Usuario[] = [];
  grupos: string[] = [];
  form: FormGroup;
  modoEdicao = false;
  slideState = 'lista';
  usuarioEmEdicao: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      senha: ['', []], // Opcional para edição
      grupo: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    this.usuarioService.getGrupos().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  novoUsuario(): void {
    this.form.reset({ ativo: true });
    this.usuarioEmEdicao = null;
    this.form.get('senha')!.setValidators([Validators.required]);
    this.abrirEdicao();
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioEmEdicao = usuario;
    this.form.patchValue(usuario);
    this.form.get('senha')!.clearValidators();
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

    const usuario = this.form.value;
    this.usuarioService.salvarUsuario(usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuário salvo com sucesso', 'Fechar', {
          duration: 3000
        });
        this.carregarDados();
        this.voltarLista();
      },
      error: () => {
        this.snackBar.open('Erro ao salvar usuário', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluirUsuario(id).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.carregarDados();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    if (this.form.get(field)!.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (this.form.get(field)!.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }
}
