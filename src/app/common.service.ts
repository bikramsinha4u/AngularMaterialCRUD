import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material';
import { Confirmation, ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog) { }

  confirmDialog(confirmation: Confirmation): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '25%',
      data: confirmation
    });

    return dialogRef.afterClosed();
  }
}
