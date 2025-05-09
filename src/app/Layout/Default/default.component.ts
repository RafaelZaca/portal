// default.component.ts - Modificar o componente

import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../Services/default.services';
import { Router } from '@angular/router';
import { AuthService } from '../../Pages/Services/Auth.service';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  permission?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public _name!: string;
  public isLoading: boolean = true;
  public menuLoaded: boolean = false;
  activeDropdown: string | null = null;
  activeChild: MenuItem | null = null;
  menuTimeoutId: any = null;
  filteredMenuItems: MenuItem[] = [];

  constructor(
    private _service: DefaultService,
    private authService: AuthService,
    private router: Router
  ) { }

  menuItems: MenuItem[] = [
    {
      label: 'Overview',
      children: [
        { label: 'Período', route: '/overview/overview' },
        { label: 'Wave', route: '/overview/wave' },
        { label: 'Rampas', route: '/overview/rampa' },
        { label: 'Rejeito', route: '/overview/rejeito' }
      ]
    },
    {
      label: 'Operacional',
      children: [
        {
          label: 'Embarque', permission: 'EMBARQUE_VIEW', children: [
            { label: 'Rampa 1', route: '/operacional/embarque/1' },
            { label: 'Rampa 2', route: '/operacional/embarque/2' },
            { label: 'Rampa 3', route: '/operacional/embarque/3' },
            { label: 'Rampa 4', route: '/operacional/embarque/4' },
            { label: 'Rampa 5', route: '/operacional/embarque/5' },
            { label: 'Rampa 6', route: '/operacional/embarque/6' },
            { label: 'Rampa 7', route: '/operacional/embarque/7' },
            { label: 'Rampa 8', route: '/operacional/embarque/8' },
            { label: 'Rampa 9', route: '/operacional/embarque/9' },
            { label: 'Rampa 10', route: '/operacional/embarque/10' },
            { label: 'Rampa 11', route: '/operacional/embarque/11' },
            { label: 'Rampa 12', route: '/operacional/embarque/12' },
          ]
        },
        { label: 'Separação', route: '/operacional/separacao', permission: 'SEPARACAO_VIEW' },
        { label: 'Waves', route: '/operacional/waves', permission: 'WAVES_VIEW' },
        { label: 'Rampas', route: '/operacional/rampa', permission: 'RAMPA_VIEW' },
        { label: 'Triagem Manual', route: '/operacional/manual', permission: 'TRIAGEM_MANUAL_VIEW' }
      ]
    },
    {
      label: 'Relatórios',
      children: [
        { label: 'Customizado', route: '/relatorios/relatorio' }
      ]
    },
    {
      label: 'Cadastros',
      children: [
        { label: 'Usuário', route: '/cadastro/usuario', permission: 'USUARIO_VIEW' },
        { label: 'Grupo', route: '/cadastro/grupo', permission: 'GRUPO_VIEW' },
        { label: 'Pick Request', route: '/cadastro/pickrequest', permission: 'PICKREQUEST_VIEW' }
      ]
    }
  ];


  toggleDropdown(label: string): void {
    if (this.menuTimeoutId) {
      clearTimeout(this.menuTimeoutId);
      this.menuTimeoutId = null;
    }

    if (this.activeDropdown !== label) {
      this.activeDropdown = label;
    }
  }

  isDropdownActive(label: string): boolean {
    return this.activeDropdown === label;
  }

  async ngOnInit() {
    this.isLoading = true;

    // Carregar o nome do usuário
    this._name = localStorage.getItem('username') || '';

    // Verificar se as permissões estão carregadas
    const userPermissions = localStorage.getItem('user_permissions');

    if (!userPermissions) {
      // Se não houver permissões, buscar novamente do servidor
      const userId = localStorage.getItem('userid');
      if (userId) {
        this.authService.fetchUserPermissions(parseInt(userId)).subscribe({
          next: (permissions) => {
            localStorage.setItem('user_permissions', JSON.stringify(permissions));
            this.filterMenuItems();
            this.menuLoaded = true;
            this.isLoading = false;
          },
          error: () => {
            // Se não conseguir carregar as permissões, redirecionar para o login
            this.authService.logout();
            this.router.navigate(['/entrar']);
          }
        });
      } else {
        // Se não houver ID de usuário, redirecionar para o login
        this.authService.logout();
        this.router.navigate(['/entrar']);
      }
    } else {
      // Se as permissões já estiverem carregadas, filtrar o menu
      this.filterMenuItems();
      this.menuLoaded = true;
      this.isLoading = false;
    }
  }

  filterMenuItems() {
    // Criar uma cópia profunda do menuItems original
    const clonedMenuItems = JSON.parse(JSON.stringify(this.menuItems));

    // Filtrar os itens de menu com base nas permissões
    this.filteredMenuItems = this.filterMenuItemsRecursive(clonedMenuItems);
  }


  filterMenuItemsRecursive(items: MenuItem[]): MenuItem[] {
    return items.filter(item => {
      // Verificar permissão do item
      if (item.permission && !this.authService.hasPermission(item.permission)) {
        return false;
      }

      // Processar recursivamente os filhos
      if (item.children) {
        item.children = this.filterMenuItemsRecursive(item.children);

        // Se não tiver nenhum filho com permissão, não exibir o item
        return item.children.length > 0;
      }

      return true;
    });
  }

  setActiveChild(child: MenuItem): void {
    if (this.menuTimeoutId) {
      clearTimeout(this.menuTimeoutId);
      this.menuTimeoutId = null;
    }
    this.activeChild = child;
  }

  clearActiveChild(): void {
    this.menuTimeoutId = setTimeout(() => {
      this.activeChild = null;
      this.menuTimeoutId = null;
    }, 300); // 300ms delay before closing
  }
  startCloseDropdown(): void {
    this.menuTimeoutId = setTimeout(() => {
      this.activeDropdown = null;
      this.activeChild = null;
      this.menuTimeoutId = null;
    }, 300); // 300ms delay before closing
  }

  // Add this method to cancel closing
  cancelCloseDropdown(): void {
    if (this.menuTimeoutId) {
      clearTimeout(this.menuTimeoutId);
      this.menuTimeoutId = null;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/entrar']);
  }
}
