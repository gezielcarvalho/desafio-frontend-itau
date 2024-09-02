// Angular core modules
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material modules
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// RxJS modules
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Application-specific components and services
import { BusinessService } from '../business.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog.component';
import { IBusiness } from '../business.model';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    DecimalPipe,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
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

  addBusiness() {
    console.log('Add business');
    this.router.navigate(['/business-detail/']);
  }
  /* Lifecycle Hooks */
  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit() {
    this.setPaginator();
    this.dataSource.sort = this.sort;
  }

  /* Helpers */
  setPaginator() {
    this.dataSource.paginator = this.paginator;
  }

  /* Event Handlers */
  onReadClick(element: any) {
    this.router.navigate(['/business-detail', element.id]);
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
