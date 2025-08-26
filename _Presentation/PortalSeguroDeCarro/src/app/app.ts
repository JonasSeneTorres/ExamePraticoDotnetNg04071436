import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false,
})
export class App {
  protected readonly title = signal('PortalSeguroDeCarro');
  constructor(private dialog: MatDialog) {}
}
