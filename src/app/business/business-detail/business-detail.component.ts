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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
      this.service
        .updateBusiness(this.businessForm.value.id, this.businessForm.value)
        .subscribe(() => {
          this.navigateToRoot();
        });
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
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }

  customMask(rawValue: string): string {
    let maskedValue = rawValue.replace(/\D/g, ''); // Remove all non-digit characters
    if (maskedValue.length > 12) {
      maskedValue = maskedValue.slice(0, 12) + '-' + maskedValue.slice(12);
    }
    return maskedValue;
  }
}
