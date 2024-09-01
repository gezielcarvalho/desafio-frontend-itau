import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBusiness } from '../business.model';
import { BusinessService } from '../business.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [BusinessService],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private service: BusinessService,
    private fb: FormBuilder
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
      cnpj: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  businessForm: FormGroup;
  record = signal<IBusiness | null>(null);

  onSubmit() {
    if (this.businessForm.valid) {
      // Handle form submission
    }
  }

  resetForm() {
    this.businessForm.reset();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const rowId = params.get('id');
      // Fetch the row data using the rowId
      this.fetchRowData(rowId);
    });
  }

  fetchRowData(rowId: string | null) {
    console.log('Row ID:', rowId);
    this.service.getBusiness(Number(rowId)).subscribe((data: IBusiness) => {
      this.record.set(data);
      this.businessForm.patchValue(data);
    });
    // Implement your logic to fetch the row data using the rowId
  }
}
