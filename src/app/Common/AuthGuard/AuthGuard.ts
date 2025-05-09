import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from '../Services/AuthGuard.services';
import { AuthService } from '../../Pages/Services/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verificar se o usuário está logado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/entrar']);
      return false;
    }

    // Verificar se a rota requer permissões específicas
    const requiredPermission = route.data['requiredPermission'] as string;
    if (!requiredPermission) {
      return true; // Se não há permissão requerida, permite o acesso
    }

    // Verificar se o usuário tem a permissão necessária
    if (!this.authService.hasPermission(requiredPermission)) {
      this.router.navigate(['/acesso-negado']);
      return false;
    }

    return true;
  }
  

  async logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/entrar']);
  }

}
