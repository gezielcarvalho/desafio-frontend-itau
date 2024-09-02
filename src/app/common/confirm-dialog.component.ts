import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to delete this item?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="true">Delete</button>
    </div>
  `,
  imports: [MatButtonModule, MatDialogModule], // Add MatDialogModule to the imports array
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
