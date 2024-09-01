import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DecimalPipe, NgClass } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { IBusiness } from '../business.model';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    DecimalPipe,
    NgClass,
  ],
  providers: [BusinessService],
  templateUrl: './business-list.component.html',
  styleUrl: './business-list.component.scss',
})
export class BusinessListComponent implements AfterViewInit {
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

  constructor(private service: BusinessService, private router: Router) {}

  /* Data */
  getAll() {
    this.service.getBusinesses().subscribe((data: IBusiness[]) => {
      this.data.set(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

  /* Lifecycle Hooks */
  ngAfterViewInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onActionClick(element: any) {
    console.log('Action clicked for:', element);
    this.router.navigate(['/business-detail', element.id]);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
