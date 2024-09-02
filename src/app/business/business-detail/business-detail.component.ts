// Angular core modules
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Mask modules
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

// Application-specific components and services
import { BusinessService } from '../business.service';
import { CepComponent } from '../../common/cep/cep.component';
import { IBusiness } from '../business.model';

@Component({
  selector: 'app-business-detail',
  standalone: true,
  imports: [
    CepComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [BusinessService, provideNgxMask()],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.scss',
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
      nomeDaRua: [''],
      bairro: [''],
      estado: [''],
      cidade: [''],
      cnpj: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{12}\d{2}$/)],
      ],
    });
  }

  businessForm: FormGroup;
  record = signal<IBusiness | null>(null);

  /* Event Handlers */
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

  /* Lifecycle Hooks */
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const rowId = params.get('id');
      // Fetch the row data using the rowId
      if (rowId) {
        this.fetchRowData(rowId);
      }
    });
  }

  /* Data */
  fetchRowData(rowId: string | null) {
    this.service.getBusiness(rowId!).subscribe((data: IBusiness) => {
      this.record.set(data);
      this.businessForm.patchValue(data);
    });
  }

  /* Helpers */
  navigateToRoot() {
    this.router.navigate(['/']);
  }
}
