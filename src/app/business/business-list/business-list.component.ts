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

  constructor(private service: BusinessService, private router: Router) {}
  ngOnInit(): void {
    this.getAll();
  }

  /* Data */
  getAll() {
    this.service.getBusinesses().subscribe((data: IBusiness[]) => {
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

  onRemoveClick(element: any) {
    this.service.deleteBusiness(element.id).subscribe(() => {
      this.getAll();
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
