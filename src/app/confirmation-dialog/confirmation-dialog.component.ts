import { Component, OnInit, Inject, Input, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Confirmation {
    title: string;
    message: string;
    button: {
        ok: string,
        cancel: string
    }
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
    @Input() confirmation: Confirmation;
    @Output() confirm = new EventEmitter<boolean>();
    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Confirmation) {
    }

    ngOnInit() { }
}