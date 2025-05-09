import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsDialogModel } from '../../../../models/errors-dialog.model';
import { ErrorDialogComponent } from '../../../Common/modal/error-dialog/error-dialog.component';
import { DefaultService } from '../../../Layout/Services/default.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hourlyData = {
    planned: [1583, 1480, 2179, 3006, 0, 1006, 2868, 3393, 2480, 1380, 1684, 0,
      1024, 2668, 2714, 3074, 3322, 1203, 3090, 0, 2389, 2037, 1700, 1630],
    produced: [/* similar array with produced values */],
    rejected: [1, 39, 48, 56, 6, 22, 77, 35, 64, 0, 63, 34, 31, 13, 56, 75, 76, 60, 58, 4, 43, 18, 17, 38],
    capacity: [/* similar array with capacity values */]
  };

  summary = {
    processedBoxes: 46771,
    rejectedBoxes: 756,
    operatingHours: 19.1,
    stoppedHours: 4.9,
    waves: 4,
    shipments: 42
  };
  public showSpinner: boolean = false;
  constructor(
    private _service: DefaultService,
    private _dialog: MatDialog,) { }

  async ngOnInit() {
    try {
      this.showSpinner = true;
    }
    catch (_error: any) {
      this.ThrowError(_error, 'Aviso', 'Erro');
    }
    finally {
      this.showSpinner = false;
    }
  }


  Aviso(_mensagen: string, _titulo: string, _subtitulo: string) {

    let dialogData = new ErrorsDialogModel(_titulo, "info", _subtitulo, _mensagen, false, false, true);

    this._dialog.open(ErrorDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        minWidth: '320px',
        maxWidth: '660px',
        maxHeight: '500px',
        data: dialogData,
        disableClose: false,
      });

  }

  ThrowError(_error: any, _titulo: string, _subtitulo: string) {
    console.log(_error);

    let message = JSON.stringify(_error.error);

    let dialogData = new ErrorsDialogModel(_titulo, "error", _subtitulo, message, false, false, true);

    this._dialog.open(ErrorDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        minWidth: '320px',
        maxWidth: '660px',
        maxHeight: '500px',
        data: dialogData,
        disableClose: false,
      });

  }
}
