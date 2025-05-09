import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorsDialogModel } from '../../../../models/errors-dialog.model';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent
{
  public icon: string;
  public title: string;
  public name: string;
  public message: string;
  public reload: boolean;
  public back: boolean;
  public close: boolean;

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: ErrorsDialogModel,
    private dialogRef: MatDialogRef<ErrorDialogComponent>,
    private router: Router
  ) 
  {
    this.icon = data.icon;
    this.title = data.title;
    this.name = data.name;
    this.message = data.message;
    this.reload = data.reload;
    this.back = data.back;
    this.close = data.close;
  }

  onVoltar(): void 
  {
    this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(
      () => this.router.navigate(['/Home/Home'])
    );

    this.dialogRef.close();
  }

  onDismiss(): void 
  {
    this.dialogRef.close();
  }
}
