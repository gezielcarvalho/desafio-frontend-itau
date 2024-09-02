import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { IBusiness } from '../business.model';
import { BusinessService } from '../business.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../common/confirm-dialog.component';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    DecimalPipe,
    MatSnackBarModule,
    NgClass,
  ],
  providers: [BusinessService],
  templateUrl: './business-list.component.html',
  styleUrl: './business-list.component.scss',
})
export class BusinessListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'name',
    'business',
    'valuation',
    'active',
    'action',
  ];
  dataSource = new MatTableDataSource<IBusiness>([] as IBusiness[]);

  data = signal<IBusiness[]>([] as IBusiness[]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private service: BusinessService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getAll();
  }

  /* Data */
  getAll() {
    this.service
      .getBusinesses()
      .pipe(
        catchError(() => {
          this.snackBar.open('Failed to load businesses', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
          // Silent error response
          return of([]);
        }),
      )
      .subscribe((data: IBusiness[]) => {
        this.data.set(data);
        this.dataSource = new MatTableDataSource(data);
        this.setPaginator();
      });
  }

  /* Lifecycle Hooks */
  ngAfterViewInit() {
    this.setPaginator();
    this.dataSource.sort = this.sort;
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onReadClick(element: any) {
    this.router.navigate(['/business-detail', element.id]);
  }

  addBusiness() {
    console.log('Add business');
    this.router.navigate(['/business-detail/']);
  }

  onRemoveClick(element: IBusiness) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { id: element.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service
          .deleteBusiness(element.id)
          .pipe(
            catchError(() => {
              this.snackBar.open('Failed to delete business', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['error-snackbar'],
              });
              // Silent error response
              return of([]);
            }),
          )
          .subscribe(() => {
            this.snackBar.open('Business deleted successfully', 'Close', {
              duration: 2000,
            });
            this.getAll();
          });
      }
    });
  }
}
