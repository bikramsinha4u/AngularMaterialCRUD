import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Confirmation } from './custom-classes/confirmation';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { }

  confirmDialog(confirmation: Confirmation): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '25%',
      data: confirmation
    });

    return dialogRef.afterClosed();
  }

  showSnackBarMessage(message: string, duration: number = 3000) {
    this.snackBar.open(message, undefined, { duration: duration, horizontalPosition: "right", verticalPosition: "top" });
  }
}
