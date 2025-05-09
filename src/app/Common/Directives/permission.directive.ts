// permission.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../../Pages/Services/Auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
  @Input('appPermission') permissionId: string = "";

  constructor(
    private el: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.permissionId) {
      return;
    }

    if (!this.authService.hasPermission(this.permissionId)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
