import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBusiness } from '../business.model';
import { BusinessService } from '../business.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  providers: [BusinessService, provideNgxMask()],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private service: BusinessService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.businessForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      business: ['', Validators.required],
      valuation: [
        null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      active: [false],
      cep: ['', Validators.required],
      cnpj: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{12}\d{2}$/)],
      ],
    });
  }

  businessForm: FormGroup;
  record = signal<IBusiness | null>(null);
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.businessForm.valid) {
      // if id is null, then it's a new record
      if (!this.businessForm.value.id) {
        // create a new record without the id
        const { id, ...newRecord } = this.businessForm.value;
        this.service
          .createBusiness(newRecord)
          .subscribe(() => this.navigateToRoot());
      } else {
        this.service
          .updateBusiness(this.businessForm.value.id, this.businessForm.value)
          .subscribe(() => this.navigateToRoot());
      }
    }
  }

  resetForm() {
    this.businessForm.reset();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const rowId = params.get('id');
      // Fetch the row data using the rowId
      if (rowId) {
        this.fetchRowData(rowId);
      }
    });
  }

  fetchRowData(rowId: string | null) {
    console.log('Row ID:', rowId);
    this.service.getBusiness(rowId!).subscribe((data: IBusiness) => {
      this.record.set(data);
      this.businessForm.patchValue(data);
    });
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }
}
